import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ------------------------------------------------------------------
// GLOBAL CACHE FOR DISCOVERED MODELS
// ------------------------------------------------------------------
let cachedModelNames: string[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

// ------------------------------------------------------------------
// 1. MODEL DISCOVERY & MANAGER
// ------------------------------------------------------------------
async function discoverModels(apiKey: string): Promise<string[]> {
  const now = Date.now();
  if (cachedModelNames && (now - lastCacheTime < CACHE_TTL)) {
    return cachedModelNames;
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch models: ${res.status}`);
    }
    const data = await res.json();
    if (!data.models || !Array.isArray(data.models)) {
      throw new Error("Invalid models response from Google");
    }

    const validModels = data.models
      .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
      .map((m: any) => m.name.replace('models/', ''));

    const prioritized = [];
    if (validModels.includes('gemini-flash-lite-latest')) prioritized.push('gemini-flash-lite-latest');
    if (validModels.includes('gemini-3.1-flash-lite')) prioritized.push('gemini-3.1-flash-lite');
    if (validModels.includes('gemini-2.0-flash')) prioritized.push('gemini-2.0-flash');
    if (validModels.includes('gemini-1.5-flash-8b')) prioritized.push('gemini-1.5-flash-8b');
    
    for (const model of validModels) {
      if (!prioritized.includes(model) && !model.includes("vision") && !model.includes("embedding")) {
        prioritized.push(model);
      }
    }

    cachedModelNames = prioritized;
    lastCacheTime = now;
    return prioritized;
  } catch (error) {
    console.warn("[Model Discovery] Failed, falling back to safe defaults.", error);
    return ["gemini-flash-lite-latest", "gemini-3.1-flash-lite", "gemini-2.0-flash"];
  }
}

// ------------------------------------------------------------------
// 2. PROMPT BUILDER
// ------------------------------------------------------------------
function buildSystemPrompt(body: any): string {
    const { 
      senderName, senderTitle, senderCompany, senderAddress, senderEmail, senderPhone,
      recipientName, recipientTitle, recipientCompany, recipientAddress,
      letterType, subject, tone, language, keyPoints, extraInstructions
    } = body;

    return `
You are an expert Executive Assistant and Business Consultant specializing in formal communication. Generate a highly polished, professional, and convincing business letter.

Sender Details:
Name: ${senderName || 'N/A'}
Title: ${senderTitle || 'N/A'}
Company: ${senderCompany || 'N/A'}
Address: ${senderAddress || 'N/A'}
Email: ${senderEmail || 'N/A'}
Phone: ${senderPhone || 'N/A'}

Recipient Details:
Name: ${recipientName || 'N/A'}
Title: ${recipientTitle || 'N/A'}
Company: ${recipientCompany || 'N/A'}
Address: ${recipientAddress || 'N/A'}

Letter Specifications:
Type/Purpose: ${letterType || 'Business Communication'}
Subject Line Choice: ${subject || 'Auto-generate a compelling subject line'}
Tone: ${tone || 'Professional'}
Language: ${language || 'English'}
Key Points to cover: ${keyPoints || 'N/A'}
Additional Instructions: ${extraInstructions || 'None'}

Generate a professional letter structure. 
Output the letter strictly as a JSON object with the following keys, containing cleanly formatted elements:
{
  "subject": "The formal subject line, e.g., 'SUBJECT: RESIGNATION FROM SENIOR DEVELOPER ROLE' or 'SUBJECT: INQUIRY ABOUT CORPORATE RATES'",
  "salutation": "Formal salutation, e.g., 'Dear Mr. Smith,' or 'Dear Director,', or 'To Whom It May Concern,'",
  "paragraphs": [
    "Opening paragraph: State the purpose of the letter clearly.",
    "Body paragraph(s): Detail the key points and context in a highly persuasive, structured format.",
    "Closing paragraph: Outline next steps, deadline, or call to actions."
  ],
  "signOff": "Formal sign-off, e.g., 'Sincerely,' or 'Respectfully yours,' or 'Best regards,'",
  "senderSignatureName": "Sender name, e.g., 'John Doe'",
  "senderSignatureTitle": "Sender title and company info, e.g., 'Chief Marketing Officer, Acme Corp'"
}
Format the response as raw JSON without markdown code blocks (\`\`\`json).
    `.trim();
}

// ------------------------------------------------------------------
// 3. ERROR HANDLER
// ------------------------------------------------------------------
function handleApiError(error: any) {
  let status = 500;
  let message = "AI service is temporarily unavailable. Please try again later.";
  
  const errStr = String(error?.message || '').toLowerCase();
  const errStatus = error?.status || 500;

  if (errStr.includes('401') || errStatus === 401 || errStr.includes('api key')) {
    status = 401;
    message = "Unauthorized: Invalid or missing API Key.";
  } else if (errStr.includes('403') || errStatus === 403) {
    status = 403;
    message = "Forbidden: Cannot access this model.";
  } else if (errStr.includes('404') || errStatus === 404) {
    status = 404;
    message = "Not found: The requested AI model is unavailable.";
  } else if (errStr.includes('429') || errStr.includes('quota') || errStatus === 429) {
    status = 429;
    message = "Rate limit or Quota exceeded. Please try again in a few moments.";
  } else if (error?.name === 'AbortError' || errStr.includes('fetch failed') || errStr.includes('timeout')) {
    status = 504;
    message = "Network Error: AI Engine took too long to respond.";
  } else if (error instanceof SyntaxError) {
    status = 500;
    message = "Invalid JSON returned from AI.";
  }

  return NextResponse.json({ error: message, details: error?.message || 'Unknown error' }, { status });
}

// ------------------------------------------------------------------
// 4. MAIN POST HANDLER
// ------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const headerApiKey = req.headers.get('Authorization')?.replace('Bearer ', '') || req.headers.get('X-Gemini-API-Key');
    const apiKey = headerApiKey || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API Key. Please configure it in your Settings page or add it to your .env.local file.' }, { status: 401 });
    }

    const body = await req.json();
    const systemPrompt = buildSystemPrompt(body);
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const availableModels = await discoverModels(apiKey);
    if (!availableModels || availableModels.length === 0) {
      return NextResponse.json({ error: "No compatible AI models found." }, { status: 500 });
    }

    let text = "";
    let finalError = null;
    let selectedModel = "";
    
    // Retry up to 3 models if they are dynamically available.
    const maxRetries = Math.min(3, availableModels.length);
    const retryModels = availableModels.slice(0, maxRetries);
    
    const startTime = Date.now();

    for (let i = 0; i < retryModels.length; i++) {
        const modelName = retryModels[i];
        try {
            console.log(`[AI Letter] Attempt ${i + 1}/${maxRetries} using model: ${modelName}`);
            
            const model = genAI.getGenerativeModel({ model: modelName });
            
            const generatePromise = model.generateContent(systemPrompt);
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Timeout")), 15000);
            });
            
            const result: any = await Promise.race([generatePromise, timeoutPromise]);
            text = result.response.text();
            
            if (text) {
                selectedModel = modelName;
                finalError = null;
                break; 
            } else {
                throw new Error("Empty AI Response");
            }
        } catch (err: any) {
            console.warn(`[AI Letter] Model ${modelName} failed: ${err.message}`);
            finalError = err;
        }
    }

    if (!text && finalError) {
        throw finalError; 
    }

    const duration = Date.now() - startTime;
    console.log(`[AI Letter] Success! Model: ${selectedModel}, Response Time: ${duration}ms`);

    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();

    const parsedData = JSON.parse(text);
    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error("[AI Letter] Global execution failed:", error);
    return handleApiError(error);
  }
}
