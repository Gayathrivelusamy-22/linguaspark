import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const getAIModel = (modelName: string = "gemini-3-flash-preview") => {
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will be limited.");
  }
  return ai.models.generateContent.bind(ai.models);
};

export const chatWithBuddy = async (history: { role: string, parts: { text: string }[] }[], message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: "You are Sparky, a friendly, encouraging AI language buddy for English beginners. Keep sentences simple, use emojis, and gently correct mistakes. Focus on making the user feel confident. If the user makes a grammar mistake, gently point it out and suggest the correct way.",
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Buddy error:", error);
    return "Oops! My sparks are flickering. Can you say that again? ⚡";
  }
};
