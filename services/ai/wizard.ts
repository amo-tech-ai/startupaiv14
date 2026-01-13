import { Type } from "@google/genai";
import { ai } from "./client";
import { StartupProfile, Task } from "../../types";

/**
 * Refines founder inputs for investor-ready clarity.
 */
export const getWizardSuggestions = async (field: string, value: string): Promise<string> => {
  if (!value) return "";
  const prompt = `Refine this ${field} to be more investor-ready: "${value}"`;
  try {
    const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
    return response.text || value;
  } catch (error) {
    return value;
  }
};

/**
 * Extracts startup details from a website URL.
 */
export const extractStartupFromURL = async (url: string): Promise<Partial<StartupProfile>> => {
  const prompt = `Extract details for ${url}. Return JSON with name, industry, description.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { tools: [{ googleSearch: {} }], responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return {};
  }
};

/**
 * Performs deep reasoning on startup readiness.
 */
export const analyzeReadiness = async (profile: StartupProfile): Promise<{ score: number, insights: string[], gaps: string[] }> => {
  const prompt = `Analyze readiness for funding: ${JSON.stringify(profile)}. Use Thinking Mode.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 8000 }, responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { score: 50, insights: [], gaps: [] };
  }
};

/**
 * Generates initial roadmap tasks based on profile.
 */
export const generateInitialTasks = async (profile: StartupProfile): Promise<Task[]> => {
  const prompt = `Generate top 5 tasks for: ${JSON.stringify(profile)}`;
  try {
    const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt, config: { responseMimeType: "application/json" } });
    const tasks = JSON.parse(response.text || '[]');
    return tasks.map((t: any, idx: number) => ({ ...t, id: String(idx + 10), completed: false }));
  } catch (error) {
    return [];
  }
};

/**
 * Identifies the competitive moat.
 */
export const getMoatAnalysis = async (profile: StartupProfile): Promise<string> => {
  const prompt = `Identify the "Unfair Advantage" (Moat) for: ${JSON.stringify(profile)}. Use Google Search Grounding.`;
  try {
    const response = await ai.models.generateContent({ 
      model: 'gemini-3-pro-preview', 
      contents: prompt, 
      config: { tools: [{ googleSearch: {} }] } 
    });
    return response.text || "";
  } catch (error) {
    return "";
  }
};

/**
 * Provides high-level fundraising strategy.
 */
export const getFundraisingStrategy = async (profile: StartupProfile): Promise<string> => {
  const prompt = `Provide fundraising strategy for: ${JSON.stringify(profile)}`;
  try {
    const response = await ai.models.generateContent({ 
      model: 'gemini-3-pro-preview', 
      contents: prompt, 
      config: { thinkingConfig: { thinkingBudget: 4000 } } 
    });
    return response.text || "";
  } catch (error) {
    return "";
  }
};
