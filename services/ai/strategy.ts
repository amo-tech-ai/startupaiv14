import { Type } from "@google/genai";
import { ai } from "./client";
import { StartupProfile, LeanCanvas, CompetitorAnalysis } from "../../types";

/**
 * Suggests an improved Unique Value Proposition using Gemini 3 Pro's deep reasoning.
 * Focused on Impact, Clarity, and Conciseness.
 */
export const improveUVP = async (profile: StartupProfile, currentCanvas: LeanCanvas): Promise<string> => {
  const prompt = `Act as a world-class startup branding expert and VC partner. 
  Your task is to refine a startup's Unique Value Proposition (UVP) for their pitch materials.

  Context:
  - Startup Name: ${profile.name}
  - Industry: ${profile.industry}
  - Problem Context: ${currentCanvas.problem.join(" | ")}
  - Solution Proposed: ${currentCanvas.solution.join(" | ")}

  Guidelines:
  1. Be extremely concise (ideally 10-15 words).
  2. Focus on the core transformation or benefit for the specific target audience.
  3. Avoid generic buzzwords (e.g., "innovative", "seamless", "next-gen").
  4. Follow the format: "[Benefit] for [Audience]" or a punchy "We help [Audience] [Benefit] by [Action]".

  Return ONLY the suggested UVP string. Do not include quotes, conversational filler, or explanations.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    return response.text?.trim() || currentCanvas.uvp;
  } catch (error) {
    console.error("UVP Improvement Error:", error);
    return currentCanvas.uvp;
  }
};

/**
 * Provides strategic suggestions for any specific Lean Canvas block.
 */
export const getCanvasSuggestions = async (blockName: string, currentContent: string[], profile: StartupProfile): Promise<string[]> => {
  const prompt = `Act as a Lean Startup consultant. 
  Review the "${blockName}" section of a Lean Canvas for ${profile.name} (${profile.industry}).
  Current content: ${currentContent.join(", ")}
  
  Suggest 3 high-impact bullet points to improve or expand this section. 
  Focus on strategic depth, unit economics, and defensibility.
  
  Return as a JSON array of strings.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return currentContent;
  }
};

/**
 * Performs deep competitive intelligence and market gap analysis.
 */
export const getCompetitorIntelligence = async (profile: StartupProfile): Promise<CompetitorAnalysis> => {
  const prompt = `Act as a senior market research analyst. Perform a deep competitive audit for ${profile.name} in the ${profile.industry} sector.
  
  Context:
  - Problem: ${profile.problem}
  - Solution: ${profile.solution}
  - Current Competitors: ${profile.competitors}
  
  Instructions:
  1. Identify the top 3 specific competitors in this space using Search.
  2. For each, analyze their key strengths and critical weaknesses.
  3. Identify 3 distinct "Market Gaps" where ${profile.name} has a strategic opening.
  4. Provide a defensive "Strategic Advice" statement for the board.

  Use Google Search to ensure real-world data accuracy.
  Return the analysis as a JSON object.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            competitors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["name", "strengths", "weaknesses"]
              }
            },
            marketGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
            strategicAdvice: { type: Type.STRING }
          },
          required: ["competitors", "marketGaps", "strategicAdvice"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as CompetitorAnalysis;
  } catch (error) {
    console.error("Competitor Intel Error:", error);
    return {
      competitors: [],
      marketGaps: ["Could not retrieve market gaps."],
      strategicAdvice: "Focus on establishing early product-market fit."
    };
  }
};