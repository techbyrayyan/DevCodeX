import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, GoogleGenerativeAIError } from '@google/generative-ai';

// ─────────────────────────────────────────────────────────────────────────────
const MODELS_TO_TRY = [
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash-8b',
] as const;

// Per-request timeout in ms (must fit within Vercel's 60s function limit)
const REQUEST_TIMEOUT_MS = 28_000;

// Max retries per model (only for transient errors, not quota/auth)
const MAX_RETRIES_PER_MODEL = 1;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS: API key pool
// ─────────────────────────────────────────────────────────────────────────────
function getApiKeys(): string[] {
  const candidates = [
    process.env.GOOGLE_API_KEY,
    process.env.GOOGLE_API_KEY_2,
    process.env.GOOGLE_API_KEY_3,
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
  ];
  const seen = new Set<string>();
  const keys: string[] = [];
  for (const k of candidates) {
    const trimmed = k?.trim();
    if (trimmed && !seen.has(trimmed)) {
      seen.add(trimmed);
      keys.push(trimmed);
    }
  }
  return keys;
}

// Round-robin key index — resets on cold start; fine for serverless
let keyRoundRobin = 0;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS: Error classification
// ─────────────────────────────────────────────────────────────────────────────
interface ClassifiedError {
  type: 'QUOTA' | 'AUTH' | 'NOT_FOUND' | 'TIMEOUT' | 'TRANSIENT' | 'UNKNOWN';
  userMessage: string;
  httpStatus: number;
  shouldRetry: boolean;
  shouldSwitchModel: boolean;
  shouldSwitchKey: boolean;
}

function classifyError(err: unknown): ClassifiedError {
  const e = err as any;
  const msg = String(e?.message || e?.toString() || '').toLowerCase();
  const status = Number(e?.status || e?.httpStatus || e?.statusCode || 0);

  // ── Rate limit / quota exhausted ──────────────────────────────────────────
  if (
    status === 429 ||
    msg.includes('429') ||
    msg.includes('quota') ||
    msg.includes('rate limit') ||
    msg.includes('resource_exhausted') ||
    msg.includes('too many requests')
  ) {
    return {
      type: 'QUOTA',
      userMessage: 'API quota exceeded. Please try again later or tomorrow.',
      httpStatus: 429,
      shouldRetry: false,
      shouldSwitchModel: true,  // Try next model on same key first
      shouldSwitchKey: false,  // Don't switch key immediately as it could be model-specific
    };
  }

  // ── Authentication / authorization ────────────────────────────────────────
  if (
    status === 401 || status === 403 ||
    msg.includes('401') || msg.includes('403') ||
    msg.includes('api key') || msg.includes('unauthorized') ||
    msg.includes('forbidden') || msg.includes('invalid key')
  ) {
    return {
      type: 'AUTH',
      userMessage: 'API authentication failed. Please check your API key configuration.',
      httpStatus: 401,
      shouldRetry: false,
      shouldSwitchModel: false,
      shouldSwitchKey: true, // try next key
    };
  }

  // ── Model not found / deprecated ──────────────────────────────────────────
  if (
    status === 404 ||
    msg.includes('404') ||
    msg.includes('not found') ||
    msg.includes('model') && msg.includes('not support') ||
    msg.includes('deprecated')
  ) {
    return {
      type: 'NOT_FOUND',
      userMessage: 'The selected AI model is unavailable. Switching to backup model.',
      httpStatus: 404,
      shouldRetry: false,
      shouldSwitchModel: true, // try next model
      shouldSwitchKey: false,
    };
  }

  // ── Timeout ───────────────────────────────────────────────────────────────
  if (
    msg.includes('timeout') ||
    msg.includes('timed out') ||
    msg === 'request_timeout' ||
    e?.name === 'AbortError'
  ) {
    return {
      type: 'TIMEOUT',
      userMessage: 'The request timed out. Please try again.',
      httpStatus: 504,
      shouldRetry: true,
      shouldSwitchModel: true,
      shouldSwitchKey: false,
    };
  }

  // ── Transient server errors (500, 503, network) ───────────────────────────
  if (
    status >= 500 ||
    msg.includes('500') || msg.includes('503') ||
    msg.includes('internal') || msg.includes('network') ||
    msg.includes('fetch failed') || msg.includes('econnreset') ||
    msg.includes('socket') || msg.includes('service unavailable')
  ) {
    return {
      type: 'TRANSIENT',
      userMessage: 'AI service is temporarily unavailable. Retrying...',
      httpStatus: 503,
      shouldRetry: true,
      shouldSwitchModel: true,
      shouldSwitchKey: false,
    };
  }

  return {
    type: 'UNKNOWN',
    userMessage: 'An unexpected error occurred. Please try again.',
    httpStatus: 500,
    shouldRetry: false,
    shouldSwitchModel: true,
    shouldSwitchKey: false,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS: Prompt builder
// ─────────────────────────────────────────────────────────────────────────────
function buildProposalPrompt(body: Record<string, string>): string {
  const {
    clientName, companyName, website, projectTitle, projectType,
    industry, country, budget, timeline, jobDescription, requirements,
    painPoints, requiredSkills, experienceLevel, proposalTone,
    proposalLength, language, extraInstructions,
  } = body;

  return `You are a Senior Full Stack Engineer, AI Engineer, and SaaS Architect writing a highly professional, advanced, and convincing business proposal.

Context:
- Client Name: ${clientName || 'N/A'}
- Company: ${companyName || 'N/A'}
- Website: ${website || 'N/A'}
- Project Title: ${projectTitle || 'N/A'}
- Project Type: ${projectType || 'Web Development'}
- Industry: ${industry || 'N/A'}
- Country: ${country || 'N/A'}
- Budget: ${budget || 'N/A'}
- Timeline: ${timeline || 'N/A'}
- Job Description: ${jobDescription || 'N/A'}
- Requirements: ${requirements || 'N/A'}
- Pain Points: ${painPoints || 'N/A'}
- Required Skills: ${requiredSkills || 'N/A'}
- Experience Level: ${experienceLevel || 'Expert'}
- Proposal Tone: ${proposalTone || 'Professional'}
- Proposal Length: ${proposalLength || 'Medium'}
- Language: ${language || 'English'}
- Extra Instructions: ${extraInstructions || 'None'}

CRITICAL: Respond ONLY with a valid JSON object. No markdown, no code blocks, no explanations outside the JSON.

The JSON must have exactly these keys with markdown-formatted values:
{
  "executiveSummary": "...",
  "projectUnderstanding": "...",
  "painPoints": "...",
  "recommendedSolution": "...",
  "timelineAndMilestones": "...",
  "budgetJustification": "...",
  "whyChooseMe": "...",
  "closing": "..."
}`.trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE: Single attempt to generate with one key + one model
// ─────────────────────────────────────────────────────────────────────────────
async function attemptGeneration(
  apiKey: string,
  modelName: string,
  prompt: string,
  requestId: string
): Promise<string> {
  console.log(`[Proposal:${requestId}] Attempting → model: ${modelName}`);

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 4096,
    },
  });

  // Race the generation against a hard timeout
  const generatePromise = model.generateContent(prompt);
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('request_timeout')), REQUEST_TIMEOUT_MS)
  );

  const result = await Promise.race([generatePromise, timeoutPromise]);
  const text = result.response.text();

  if (!text || !text.trim()) {
    throw new Error('Empty response from AI model.');
  }

  console.log(`[Proposal:${requestId}] ✅ Success → model: ${modelName} (${text.length} chars)`);
  return text;
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE: Main orchestrator — tries keys × models with proper fallback
// ─────────────────────────────────────────────────────────────────────────────
async function generateProposal(
  keys: string[],
  prompt: string,
  requestId: string
): Promise<string> {
  let lastUserMessage = 'AI service is temporarily unavailable. Please try again later.';

  keyLoop: for (let ki = 0; ki < keys.length; ki++) {
    // Round-robin: spread load across keys
    const keyIdx = (keyRoundRobin + ki) % keys.length;
    const apiKey = keys[keyIdx];

    console.log(`[Proposal:${requestId}] Using API key #${keyIdx + 1} of ${keys.length}`);

    modelLoop: for (const modelName of MODELS_TO_TRY) {
      let retries = 0;

      while (retries <= MAX_RETRIES_PER_MODEL) {
        try {
          const text = await attemptGeneration(apiKey, modelName, prompt, requestId);

          // Advance round-robin for next request
          keyRoundRobin = (keyIdx + 1) % keys.length;
          return text;

        } catch (err: unknown) {
          const classified = classifyError(err);
          const attempt = retries + 1;

          console.warn(
            `[Proposal:${requestId}] ⚠️ Error [${classified.type}] on model ${modelName} attempt ${attempt}:`,
            (err as any)?.message || err
          );

          lastUserMessage = classified.userMessage;

          // Auth error or Quota → try next key immediately
          if (classified.type === 'AUTH' || classified.type === 'QUOTA' || classified.shouldSwitchKey) {
            console.warn(`[Proposal:${requestId}] Switching API key due to ${classified.type}`);
            continue keyLoop; // break model loop → try next key
          }

          // Model not found → skip to next model
          if (classified.shouldSwitchModel && !classified.shouldRetry) {
            continue modelLoop; // break while loop → try next model
          }

          // Transient/timeout → retry once with small backoff
          if (classified.shouldRetry && retries < MAX_RETRIES_PER_MODEL) {
            const backoffMs = 1500 + retries * 1000;
            console.log(`[Proposal:${requestId}] Retrying ${modelName} in ${backoffMs}ms...`);
            await new Promise(r => setTimeout(r, backoffMs));
            retries++;
            continue;
          }

          // No more retries for this model
          continue modelLoop;
        }
      }
    }

    console.warn(`[Proposal:${requestId}] All models failed for key #${keyIdx + 1}. Trying next key.`);
  }

  // All keys × all models exhausted
  throw new Error(lastUserMessage);
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE: Clean & parse AI JSON output (robust to markdown wrapping)
// ─────────────────────────────────────────────────────────────────────────────
function parseProposalJSON(raw: string): Record<string, string> {
  // Strip markdown code fences if present
  let cleaned = raw
    .replace(/^```(?:json)?\s*/im, '')
    .replace(/\s*```\s*$/im, '')
    .trim();

  // Find the outermost { } in case there is preamble text
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.slice(start, end + 1);
  }

  const parsed = JSON.parse(cleaned);

  // Validate required keys exist
  const requiredKeys = [
    'executiveSummary', 'projectUnderstanding', 'painPoints',
    'recommendedSolution', 'timelineAndMilestones', 'budgetJustification',
    'whyChooseMe', 'closing',
  ];

  for (const key of requiredKeys) {
    if (typeof parsed[key] !== 'string') {
      throw new Error(`AI response missing required field: "${key}"`);
    }
  }

  return parsed;
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: POST /api/ai/proposal
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  // Unique ID for request tracing in logs
  const requestId = Math.random().toString(36).slice(2, 8).toUpperCase();
  const startTime = Date.now();

  console.log(`\n[Proposal:${requestId}] ════════ New Request ════════`);

  try {
    // ── 1. Parse & validate request body ──────────────────────────────────────
    let body: Record<string, string>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'Invalid request format.' },
        { status: 400 }
      );
    }

    if (!body.clientName?.trim() && !body.projectTitle?.trim()) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: 'Please provide at least a Client Name or Project Title.' },
        { status: 400 }
      );
    }

    console.log(`[Proposal:${requestId}] Client: "${body.clientName}" | Project: "${body.projectTitle}"`);

    // ── 2. Load API keys ──────────────────────────────────────────────────────
    const keys = getApiKeys();
    if (keys.length === 0) {
      console.error(`[Proposal:${requestId}] ❌ No API keys configured in environment.`);
      return NextResponse.json(
        {
          error: 'NO_API_KEY',
          message: 'Service is not configured. Please add GOOGLE_API_KEY to your environment variables.'
        },
        { status: 503 }
      );
    }

    // ── 3. Build prompt ───────────────────────────────────────────────────────
    const prompt = buildProposalPrompt(body);

    // ── 4. Generate ───────────────────────────────────────────────────────────
    const rawText = await generateProposal(keys, prompt, requestId);

    // ── 5. Parse JSON ─────────────────────────────────────────────────────────
    let proposalData: Record<string, string>;
    try {
      proposalData = parseProposalJSON(rawText);
    } catch (parseErr: any) {
      console.error(
        `[Proposal:${requestId}] ❌ JSON parse failed:`,
        parseErr?.message,
        '\nRaw (first 500 chars):',
        rawText.slice(0, 500)
      );
      return NextResponse.json(
        {
          error: 'PARSE_ERROR',
          message: 'AI returned an unexpected format. Please try again.'
        },
        { status: 502 }
      );
    }

    const elapsed = Date.now() - startTime;
    console.log(`[Proposal:${requestId}] ✅ Complete in ${elapsed}ms`);
    console.log(`[Proposal:${requestId}] ════════════════════════════\n`);

    return NextResponse.json(proposalData);

  } catch (err: any) {
    const elapsed = Date.now() - startTime;
    console.error(`[Proposal:${requestId}] ❌ Fatal error after ${elapsed}ms:`, err?.message || err);
    console.log(`[Proposal:${requestId}] ════════════════════════════\n`);

    // Classify to return the best user-facing message
    const classified = classifyError(err);
    return NextResponse.json(
      {
        error: classified.type,
        message: err?.message?.length < 200
          ? err.message  // Already a friendly message from generateProposal()
          : classified.userMessage
      },
      { status: classified.httpStatus }
    );
  }
}
