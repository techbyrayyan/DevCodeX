import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import connectToDatabase from '@/lib/mongoose';
import Lead from '@/models/Lead';
import companyData from '@/lib/companyData.json';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// In-memory cache to reduce repeated search API calls (Requirement 10)
const searchCache = new Map<string, { result: string; timestamp: number }>();

async function performWebSearch(query: string): Promise<string | null> {
  if (searchCache.has(query)) {
    const cached = searchCache.get(query)!;
    // Cache valid for 1 hour
    if (Date.now() - cached.timestamp < 1000 * 60 * 60) {
      console.log(`Using cached search result for: ${query}`);
      return cached.result;
    }
  }

  const apiKey = process.env.SEARCH_API_KEY;
  if (!apiKey) {
    console.warn("SEARCH_API_KEY is not set. Assuming fallback.");
    return null;
  }

  try {
    console.log(`Performing web search for: ${query}`);
    // Using Tavily Search API (or compatible provider)
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, query, search_depth: "basic" }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    if (data && data.results && data.results.length > 0) {
      const res = data.results.map((r: any) => `Title: ${r.title}\nContent: ${r.content}`).join('\n\n');
      searchCache.set(query, { result: res, timestamp: Date.now() });
      return res;
    }
    return "No relevant information found.";
  } catch (error) {
    console.error("Web Search Error:", error);
    return null; // Graceful fallback
  }
}

const SYSTEM_PROMPT = `
You are an elite AI Business Consultant and Support Agent for ${companyData.company_name}.
Contact Info: email: ${companyData.contact.email}, whatsapp: ${companyData.contact.whatsapp}

=== KNOWLEDGE BASE (Use this to answer user questions about our services and company) ===
${companyData.knowledge_base.map(q => `Q: ${q.question}\nA: ${q.answer}`).join('\n')}

=== GOALS ===
Your goal is to accurately answer client questions using the Knowledge Base AND qualify the lead by extracting important business information, estimating project size, and guiding them through a professional consultation.
Be engaging, polite, and advanced/professional. If the user uploads an image, describe and analyze it carefully as part of their project requirements or general inquiry.
Try to ask ONLY 1 OR 2 QUESTIONS AT A TIME so you do not overwhelm the user. Do not give them a huge list to fill out all at once.

Important things to discover during the chat (if not already known):
1. Business Name & Industry (e.g. Healthcare, Real Estate, Ecommerce)
2. Project Type (e.g. Website, App, CRM, AI Solution)
3. Budget and Timeline
4. Required Features
5. User's Name and Email (crucial for follow up)

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
Keep the JSON structured exactly like that so the backend can parse it and update the CRM database.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, leadId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    await connectToDatabase();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash",
      tools: [
        {
          functionDeclarations: [
            {
              name: "search_web",
              description: "Search the internet for up-to-date information, news, weather, prices, sports, or anything not in your knowledge base.",
              parameters: {
                type: SchemaType.OBJECT,
                properties: {
                  query: {
                    type: SchemaType.STRING,
                    description: "The targeted search query, e.g. 'latest news on AI' or 'weather in New York'.",
                  },
                },
                required: ["query"],
              },
            },
          ],
        },
      ]
    });

    // Format chat history
    const history = messages.slice(0, -1).map((msg: any) => {
      const parts: any[] = [{ text: msg.content }];
      if (msg.image) {
        // Remove the data:image/[type];base64, prefix if present
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

    // Start chat
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: "Understood. I will act as the AI console, answer based on the knowledge base, and always return the JSON extraction at the end." }] },
        ...history
      ]
    });

    const lastMsg = messages[messages.length - 1];
    const userParts: any[] = [{ text: lastMsg.content || "Here is an image for you." }];
    
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

    const result = await chat.sendMessage(userParts);
    let responseText = "";

    const response = result.response;
    const functionCalls = response.functionCalls ? response.functionCalls() : [];

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === "search_web" && call.args) {
        const query = (call.args as any).query as string;
        const searchResult = await performWebSearch(query);
        
        // Return search result back to the AI
        const secondResult = await chat.sendMessage([{
          functionResponse: {
            name: "search_web",
            response: {
              content: searchResult || "Cannot reach search API or no results. Please rely on your knowledge base gracefully."
            }
          }
        }]);
        responseText = secondResult.response.text();
      } else {
        responseText = response.text();
      }
    } else {
      responseText = response.text();
    }

    // Parse the JSON block from responseText
    let extractedData = {};
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
          extractedData = Object.fromEntries(Object.entries(parsed.extractedData).filter(([_, v]) => v !== null));
        }
        if (parsed.leadScore) leadScore = parsed.leadScore;
        // Clean the text to send to user
        cleanResponseText = responseText.replace(matchStr, '').trim();
      } catch (e) {
        console.error("Failed to parse JSON from AI", e);
        // Attempt to hide the broken JSON anyway
        cleanResponseText = responseText.replace(matchStr, '').trim();
      }
    }

    // Determine Status
    let status: 'Hot' | 'Warm' | 'Cold' | 'New' | 'Qualified' | 'Proposal Sent' = 'New';
    if (leadScore > 70) status = 'Hot';
    else if (leadScore > 40) status = 'Warm';
    else if (leadScore > 20) status = 'Cold';

    // Update or Create Lead
    let currentLead;
    if (leadId) {
      currentLead = await Lead.findById(leadId);
    }
    
    const contentToSave = lastMsg.image ? lastMsg.content + '\n[Image Uploaded]' : lastMsg.content;

    if (currentLead) {
      // Update
      Object.assign(currentLead, extractedData);
      currentLead.leadScore = leadScore;
      currentLead.status = status;
      currentLead.conversations.push({ role: 'user', content: contentToSave });
      currentLead.conversations.push({ role: 'assistant', content: cleanResponseText });
      await currentLead.save();
    } else {
      // Create
      currentLead = await Lead.create({
        ...extractedData,
        leadScore,
        status,
        conversations: [
          { role: 'user', content: contentToSave },
          { role: 'assistant', content: cleanResponseText }
        ]
      });
    }

    return NextResponse.json({
      text: cleanResponseText,
      leadId: currentLead._id,
      leadScore,
      extractedData
    });

  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: error.message || 'Error processing request' }, { status: 500 });
  }
}
