
import { GoogleGenAI } from "@google/genai";
import type { ImageParts } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateImageFromText(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        // We do not set responseModalities for image generation as per SDK examples for this model.
        // We can optionally set imageConfig here (e.g., aspectRatio).
        imageConfig: {
            aspectRatio: "1:1"
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
