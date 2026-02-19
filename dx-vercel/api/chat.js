import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, system } = req.body;

  try {
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        systemInstruction: system,
        maxOutputTokens: 2000,
      }
    });

    // Normalize to same shape frontend expects
    res.status(200).json({ content: [{ text: response.text }] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}