import { GoogleGenAI } from "@google/genai";

// Initialize with the API Key directly
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, system } = req.body;

  try {
    // 1. Get the model instance (Gemini 1.5 Flash is the 'cheap/fast' choice)
    // We pass the systemInstruction here during initialization
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: system 
    });

    // 2. Map frontend messages to Gemini format
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // 3. Generate content
    const result = await model.generateContent({
      contents,
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7, // Added for clinical variety
      }
    });

    const response = result.response;
    const text = response.text();

    // 4. Return formatted JSON
    res.status(200).json({ 
      content: [{ text: text }] 
    });

  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message });
  }
}