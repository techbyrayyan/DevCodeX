import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ─── Latest supported Gemini models (ordered by preference) ───────────────────
const MODELS_TO_TRY = [
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash-8b',
];

const REQUEST_TIMEOUT_MS = 28_000;

// ─── API key pool ──────────────────────────────────────────────────────────────
function getApiKey(): string | undefined {
  return (
    process.env.GOOGLE_API_KEY?.trim() ||
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY_2?.trim()
  );
}

// ─── Error classifier ─────────────────────────────────────────────────────────
function getUserMessage(err: any): { message: string; status: number } {
  const msg = String(err?.message || '').toLowerCase();
  const status = Number(err?.status || 0);

  if (status === 429 || msg.includes('quota') || msg.includes('rate limit') || msg.includes('resource_exhausted')) {
    return { message: 'API quota exceeded. Please try again later.', status: 429 };
  }
  if (status === 401 || status === 403 || msg.includes('api key') || msg.includes('unauthorized')) {
    return { message: 'API authentication error. Please check configuration.', status: 401 };
  }
  if (status === 404 || msg.includes('not found') || msg.includes('deprecated')) {
    return { message: 'AI model unavailable. Switching to backup.', status: 404 };
  }
  if (msg.includes('timeout') || msg === 'request_timeout') {
    return { message: 'Request timed out. Please try again.', status: 504 };
  }
  return { message: 'AI service is temporarily unavailable. Please try again.', status: 500 };
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

    const apiKey = getApiKey();
    if (!apiKey) {
      console.error('[AI] No API key configured in environment variables.');
      return NextResponse.json(
        { error: 'Service not configured. Add GOOGLE_API_KEY to environment variables.' },
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
        const msg = String(err?.message || '').toLowerCase();
        const status = Number(err?.status || 0);

        // Auth errors — don't bother trying other models with same key
        if (status === 401 || status === 403 || msg.includes('api key') || msg.includes('unauthorized')) {
          console.error(`[AI] Auth error on model ${modelName}:`, err.message);
          break;
        }

        // Quota — log and try next model since quota is often model-specific
        if (status === 429 || msg.includes('quota') || msg.includes('rate limit')) {
          console.warn(`[AI] Model ${modelName} hit quota limit, trying next model...`);
          continue;
        }

        // 404 / deprecated — try next model
        if (status === 404 || msg.includes('not found') || msg.includes('deprecated')) {
          console.warn(`[AI] Model ${modelName} not found or deprecated, trying next...`);
          continue;
        }

        // Transient — try next model
        console.warn(`[AI] Model ${modelName} failed (${status || 'network'}), trying next...`);
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
