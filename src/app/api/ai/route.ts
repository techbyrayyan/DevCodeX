import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ─── Latest valid Gemini models (ordered by preference) ───────────────────
const MODELS_TO_TRY = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
];



const REQUEST_TIMEOUT_MS = 28_000;

// ─── API key pool ──────────────────────────────────────────────────────────────
function getApiKey(req?: Request, body?: any): string | undefined {
  const headerKey = req?.headers.get('x-gemini-api-key') || req?.headers.get('authorization')?.replace('Bearer ', '');
  return (
    headerKey?.trim() ||
    body?.apiKey?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY_2?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY?.trim()
  );
}

// ─── Auth error classifier ───────────────────────────────────────────────────
function isAuthError(err: any): boolean {
  const msg = String(err?.message || '').toLowerCase();
  const status = Number(err?.status || 0);
  return (
    status === 401 ||
    status === 403 ||
    msg.includes('api key') ||
    msg.includes('api_key') ||
    msg.includes('unauthorized') ||
    msg.includes('forbidden') ||
    msg.includes('invalid api key') ||
    msg.includes('key not valid')
  );
}

// ─── Error classifier ─────────────────────────────────────────────────────────
function getUserMessage(err: any): { message: string; status: number } {
  const msg = String(err?.message || '').toLowerCase();
  const status = Number(err?.status || 0);

  if (isAuthError(err)) {
    return { 
      message: 'Invalid Gemini API key. Please add a valid API Key from Google AI Studio (starting with AIzaSy) in .env.local or Settings.', 
      status: 401 
    };
  }
  if (status === 429 || msg.includes('quota') || msg.includes('rate limit') || msg.includes('resource_exhausted')) {
    return { message: 'API quota exceeded. Please try again later or add another API key in Settings.', status: 429 };
  }
  if (status === 404 || msg.includes('not found') || msg.includes('deprecated')) {
    return { message: 'AI model is currently unavailable. Please try again.', status: 404 };
  }
  if (msg.includes('timeout') || msg === 'request_timeout') {
    return { message: 'Request timed out. Please try again.', status: 504 };
  }
  return { 
    message: err?.message || 'AI service is temporarily unavailable. Please verify your API Key or try again.', 
    status: 500 
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }
    const { prompt, imageData, model: requestedModel } = body;

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }

    const apiKey = getApiKey(req, body);
    if (!apiKey) {
      console.error('[AI] No API key configured in environment variables or headers.');
      return NextResponse.json(
        { error: 'Service not configured. Please add your Gemini API Key in Settings or set GOOGLE_API_KEY in .env.local.' },
        { status: 503 }
      );
    }

    // Build the model list to try — requested model first, then fallbacks
    const normRequested = requestedModel === 'gemini-vision' ? 'gemini-1.5-flash' : requestedModel;
    const modelsToTry: string[] = [];
    if (normRequested && !modelsToTry.includes(normRequested)) modelsToTry.push(normRequested);
    for (const m of MODELS_TO_TRY) {
      if (!modelsToTry.includes(m)) modelsToTry.push(m);
    }

    // Build content parts
    const parts: any[] = [{ text: prompt }];
    if (imageData && imageData.startsWith('data:image/')) {
      const mimeType = imageData.split(';')[0].split(':')[1];
      const base64Data = imageData.split(',')[1];
      parts.push({ inlineData: { data: base64Data, mimeType } });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastErr: any = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`[AI] Trying model: ${modelName}`);
        const aiModel = genAI.getGenerativeModel({ model: modelName });

        const generatePromise = aiModel.generateContent(parts);
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('request_timeout')), REQUEST_TIMEOUT_MS)
        );

        const result: any = await Promise.race([generatePromise, timeoutPromise]);
        const text = result.response.text();

        if (!text?.trim()) throw new Error('Empty AI response.');

        console.log(`[AI] ✅ Success with model: ${modelName}`);
        return NextResponse.json({ result: text });

      } catch (err: any) {
        lastErr = err;
        console.warn(`[AI] Model ${modelName} failed:`, err?.message || err);

        // Auth errors — don't bother trying other models with same key
        if (isAuthError(err)) {
          console.error(`[AI] Auth error detected on model ${modelName}:`, err.message);
          break;
        }

        // Quota — log and try next model since quota can be model-specific
        if (err?.status === 429 || String(err?.message).toLowerCase().includes('quota')) {
          console.warn(`[AI] Model ${modelName} hit quota limit, trying next model...`);
          continue;
        }

        // 404 / deprecated / transient — try next model
        continue;
      }
    }

    const { message, status } = getUserMessage(lastErr);
    console.error('[AI] All models failed:', lastErr?.message || lastErr);
    return NextResponse.json({ error: message }, { status });

  } catch (err: any) {
    console.error('[AI] Unhandled route error:', err?.message || err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

