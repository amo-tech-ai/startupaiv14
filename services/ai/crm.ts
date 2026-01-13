import { Type } from "@google/genai";
import { ai } from "./client";
import { StartupProfile, DiscoveryResult, Contact } from "../../types";

/**
 * Scouts for potential investors or customers using search grounding.
 */
export const getDiscoveryResults = async (query: string, profile: StartupProfile): Promise<DiscoveryResult[]> => {
  const stage = profile.revenue > 100000 ? "Series A" : profile.revenue > 10000 ? "Seed" : "Pre-seed";
  
  const prompt = `Act as a venture capital scout. Based on this startup profile, find 5 real-world investors or funds that would be a high-affinity match for their current fundraising effort.
  
  Startup Profile:
  - Name: ${profile.name}
  - Industry: ${profile.industry}
  - Pitch: ${profile.tagline}
  - Context: ${profile.description}
  - Current Stage: ${stage} (MRR: $${profile.revenue})
  - Target Raise: $${profile.fundraisingGoal}
  
  User Intent: "${query}"

  Instructions:
  1. Use Google Search Grounding to find ACTIVE funds/angels.
  2. Evaluate fit based on their typical check size, industry focus, and geography.
  3. Return a JSON array of DiscoveryResult objects.`;

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
    console.error("Discovery Error:", error);
    return [];
  }
};

/**
 * Performs background research on specific entities.
 */
export const getInvestorResearch = async (contact: Contact): Promise<string> => {
  const prompt = `Perform research on ${contact.name} at ${contact.organization}. Use Google Search. 
  Focus on:
  1. Their investment thesis.
  2. Recent investments.
  3. Reputation among founders.
  
  Provide a concise, editorial-style report.`;
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

/**
 * Drafts a personalized outreach memo for an investor.
 */
export const draftOutreachMemo = async (contact: Contact, profile: StartupProfile): Promise<string> => {
  const prompt = `Draft a compelling, professional, and personalized outreach email to ${contact.name} at ${contact.organization}.
  
  Startup Context:
  - Name: ${profile.name}
  - Tagline: ${profile.tagline}
  - Problem: ${profile.problem}
  - Solution: ${profile.solution}
  - Traction: $${profile.revenue} MRR, ${profile.users} users.
  
  Goal: Secure a 15-minute introductory meeting to discuss their potential involvement in our $${profile.fundraisingGoal} round.
  
  Tone: Editorial, architectural, concise, and respectful. No fluff.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 2000 } }
    });
    return response.text || "Draft unavailable.";
  } catch (error) {
    console.error("Outreach Draft Error:", error);
    return "Error generating draft.";
  }
};
