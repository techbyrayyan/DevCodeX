import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectToDatabase from '@/lib/mongoose';
import Lead from '@/models/Lead';
import companyData from '@/lib/companyData.json';

// Ultra-fast modern Gemini models (ordered by speed and reliability)
const CHAT_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
];

const SYSTEM_PROMPT = `
You are an elite AI Business Consultant and Support Agent for ${companyData.company_name}.
Contact Info: email: ${companyData.contact.email}, whatsapp: ${companyData.contact.whatsapp}

=== KNOWLEDGE BASE (Use this to answer user questions about our services and company) ===
${companyData.knowledge_base.map(q => `Q: ${q.question}\nA: ${q.answer}`).join('\n')}

=== GOALS ===
Your goal is to accurately, concisely, and quickly answer client questions using the Knowledge Base AND qualify the lead by extracting important business information, estimating project size, and guiding them through a professional consultation.
Be engaging, polite, and professional. Keep your replies direct, clear, and prompt. If the user uploads an image, describe and analyze it carefully as part of their project requirements.
Ask only 1 or 2 focused questions at a time.

Important things to discover during the chat (if not already known):
1. Business Name & Industry (e.g. Healthcare, Real Estate, Ecommerce)
2. Project Type (e.g. Website, App, CRM, AI Solution)
3. Budget and Timeline
4. Required Features
5. User's Name and Email (for follow up)

At the end of your response, ALWAYS append a JSON block inside triple backticks like this:
\`\`\`json
{
  "extractedData": {
    "name": "found name or null",
    "email": "found email or null",
    "businessType": "found business type or null",
    "projectType": "found project type or null",
    "budget": "found budget or null",
    "deadline": "found timeline or null",
    "features": ["feature 1", "feature 2"]
  },
  "leadScore": 50
}
\`\`\`
The leadScore should be dynamically generated based on: high budget + clear timeline + email provided = higher score (up to 100). If it's a new interaction, give a baseline of 10. Update the score as you get more info.
`;

function getApiKeys(req: NextRequest, body: any): string[] {
  const headerApiKey = req.headers.get('x-gemini-api-key') || req.headers.get('authorization')?.replace('Bearer ', '');
  const candidates = [
    process.env.GOOGLE_API_KEY,
    process.env.GEMINI_API_KEY,
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    process.env.GOOGLE_API_KEY_2,
    headerApiKey,
    body?.apiKey,
  ];

  const keys: string[] = [];
  for (const k of candidates) {
    const trimmed = k?.trim();
    if (trimmed && !keys.includes(trimmed)) {
      keys.push(trimmed);
    }
  }
  return keys;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { messages, leadId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const keys = getApiKeys(req, body);
    if (keys.length === 0) {
      return NextResponse.json(
        { error: 'Service not configured. Please add your Gemini API Key in .env.local or Settings.' },
        { status: 503 }
      );
    }

    // Format chat history
    const history = messages.slice(0, -1).map((msg: any) => {
      const parts: any[] = [{ text: msg.content || '' }];
      if (msg.image) {
        const base64Data = msg.image.split('base64,')[1] || msg.image;
        const mimeType = msg.image.match(/data:(image\/[a-zA-Z0-9]+);base64,/)?.[1] || "image/jpeg";
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        });
      }
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts,
      };
    });

    const lastMsg = messages[messages.length - 1];
    const userParts: any[] = [{ text: lastMsg.content || "Here is my inquiry." }];
    
    if (lastMsg.image) {
      const base64Data = lastMsg.image.split('base64,')[1] || lastMsg.image;
      const mimeType = lastMsg.image.match(/data:(image\/[a-zA-Z0-9]+);base64,/)?.[1] || "image/jpeg";
      userParts.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      });
    }

    let responseText = '';
    let lastError: any = null;

    // Try keys and fast models
    keyLoop: for (const apiKey of keys) {
      const genAI = new GoogleGenerativeAI(apiKey);

      for (const modelName of CHAT_MODELS) {
        try {
          const model = genAI.getGenerativeModel({ 
            model: modelName,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          });

          const chat = model.startChat({
            history: [
              { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
              { role: 'model', parts: [{ text: "Understood. I will act as the DevCodeX AI Consultant, answering questions accurately and concisely while qualifying leads." }] },
              ...history
            ]
          });

          const result = await chat.sendMessage(userParts);
          const rawText = result.response.text();

          if (rawText && rawText.trim()) {
            responseText = rawText;
            break keyLoop;
          }
        } catch (err: any) {
          lastError = err;
          const errMsg = String(err?.message || '').toLowerCase();
          console.warn(`[AI Chat] Model ${modelName} failed:`, err?.message || err);

          // If auth error, skip to next key
          if (errMsg.includes('api key') || errMsg.includes('401') || errMsg.includes('403')) {
            continue keyLoop;
          }
        }
      }
    }

    if (!responseText) {
      console.error('[AI Chat] All models and keys failed:', lastError);
      return NextResponse.json(
        { error: lastError?.message || 'AI service temporarily unavailable. Please try again.' },
        { status: 500 }
      );
    }

    // Parse the JSON block from responseText
    let extractedData: Record<string, any> = {};
    let leadScore = 10;
    let cleanResponseText = responseText;

    const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/i);
    const fallbackMatch = responseText.match(/(\{[\s\S]*"extractedData"[\s\S]*\})/i);

    let jsonStr = "";
    let matchStr = "";

    if (jsonMatch) {
      jsonStr = jsonMatch[1];
      matchStr = jsonMatch[0];
    } else if (fallbackMatch) {
      jsonStr = fallbackMatch[1];
      matchStr = fallbackMatch[0];
    }

    if (jsonStr) {
      try {
        const parsed = JSON.parse(jsonStr);
        if (parsed.extractedData) {
          extractedData = Object.fromEntries(
            Object.entries(parsed.extractedData).filter(([_, v]) => v !== null && v !== 'null')
          );
        }
        if (typeof parsed.leadScore === 'number') {
          leadScore = parsed.leadScore;
        }
        cleanResponseText = responseText.replace(matchStr, '').trim();
      } catch (e) {
        console.error("Failed to parse JSON from AI", e);
        cleanResponseText = responseText.replace(matchStr, '').trim();
      }
    }

    if (!cleanResponseText) {
      cleanResponseText = responseText;
    }

    // Determine Status
    let status: 'Hot' | 'Warm' | 'Cold' | 'New' | 'Qualified' | 'Proposal Sent' = 'New';
    if (leadScore > 70) status = 'Hot';
    else if (leadScore > 40) status = 'Warm';
    else if (leadScore > 20) status = 'Cold';

    // Update or Create Lead asynchronously without blocking/crashing on DB errors
    let savedLeadId = leadId || null;
    try {
      await connectToDatabase();
      const contentToSave = lastMsg.image ? (lastMsg.content || '') + '\n[Image Uploaded]' : (lastMsg.content || '');

      if (leadId) {
        const currentLead = await Lead.findById(leadId);
        if (currentLead) {
          Object.assign(currentLead, extractedData);
          currentLead.leadScore = leadScore;
          currentLead.status = status;
          currentLead.conversations.push({ role: 'user', content: contentToSave });
          currentLead.conversations.push({ role: 'assistant', content: cleanResponseText });
          await currentLead.save();
          savedLeadId = currentLead._id;
        }
      } else {
        const currentLead = await Lead.create({
          ...extractedData,
          leadScore,
          status,
          conversations: [
            { role: 'user', content: contentToSave },
            { role: 'assistant', content: cleanResponseText }
          ]
        });
        savedLeadId = currentLead._id;
      }
    } catch (dbErr) {
      console.warn('[AI Chat] MongoDB storage skipped or unavailable:', dbErr);
    }

    return NextResponse.json({
      text: cleanResponseText,
      leadId: savedLeadId,
      leadScore,
      extractedData
    });

  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: error.message || 'Error processing request' }, { status: 500 });
  }
}

