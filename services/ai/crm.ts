import { Type } from "@google/genai";
import { ai } from "./client";
import { StartupProfile, DiscoveryResult, Contact } from "../../types";

/**
 * Scouts for potential investors or customers using search grounding.
 */
export const getDiscoveryResults = async (query: string, profile: StartupProfile): Promise<DiscoveryResult[]> => {
  const prompt = `Perform discovery search: "${query}". 
  Context: ${JSON.stringify(profile)}.
  Find 5 entities. Return JSON array.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return [];
  }
};

/**
 * Performs background research on specific entities.
 */
export const getInvestorResearch = async (contact: Contact): Promise<string> => {
  const prompt = `Perform research on ${contact.name} at ${contact.organization}. Use Google Search.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] }
    });
    return response.text || "";
  } catch (error) {
    return "Research unavailable.";
  }
};
