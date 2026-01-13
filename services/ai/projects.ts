import { Type } from "@google/genai";
import { ai } from "./client";
import { Project } from "../../types";

/**
 * Analyzes operational project health and risk density.
 */
export const getProjectAnalysis = async (projects: Project[]): Promise<{ health: number, insights: string[] }> => {
  const prompt = `Analyze project health: ${JSON.stringify(projects)}. 
  Return JSON with health score (0-100) and 3 insights.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            health: { type: Type.NUMBER },
            insights: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["health", "insights"]
        }
      }
    });
    return JSON.parse(response.text || '{"health": 100, "insights": []}');
  } catch (error) {
    return { health: 50, insights: ["Project data analysis failed."] };
  }
};
