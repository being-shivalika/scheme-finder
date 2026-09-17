import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Initialize the Gemini client
// Note: It automatically picks up GEMINI_API_KEY from process.env
let ai;
try {
  ai = new GoogleGenAI();
} catch (error) {
  console.warn("Failed to initialize Google GenAI client:", error.message);
}

const SYSTEM_INSTRUCTION = `You are Scheme Setu's AI assistant.

Help users understand Indian government schemes, including their benefits, eligibility, required documents, and application process.

Answer clearly and simply.

Do not make up scheme information. If you don't know something or don't have enough information, say so.`;

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      return res.status(500).json({ error: "AI client is not configured on the server." });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI." });
  }
});

export default router;
