
import { GoogleGenAI } from "@google/genai";
import type { ImageParts } from '../types';

export async function generateImageFromText(prompt: string): Promise<string> {
  const API_KEY = process.env.API_KEY;
  
  // Note: We use the standard environment API key for Flash Image.
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1",
            // imageSize is not supported for gemini-2.5-flash-image
        }
      },
    });

    let refusalText = "";

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
      if (part.text) {
        refusalText += part.text;
      }
    }

    if (refusalText) {
        throw new Error(`Generation failed: ${refusalText}`);
    }

    throw new Error('No image data found in the response.');
  } catch (error: any) {
    console.error("Error generating image from text:", error);
    throw new Error(error.message || "Failed to generate image. Please check the console for more details.");
  }
}
