import { Type } from "@google/genai";
import { ai } from "./client";
import { StartupProfile, AIInsight, Task } from "../../types";

export interface NBA {
  title: string;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
}

/**
 * Generates three-panel insights for the dashboard.
 */
export const getDashboardInsights = async (profile: StartupProfile): Promise<AIInsight> => {
  const prompt = `Act as a world-class startup strategist. Analyze this profile:
  Startup: ${profile.name} (${profile.industry})
  Revenue: $${profile.revenue}/mo
  Users: ${profile.users}
  Runway: ${profile.runway} months
  Goal: $${profile.fundraisingGoal}
  
  You MUST answer exactly these three questions in a clear, professional tone:
  1. What does this data mean? (Analysis of current state)
  2. What should I do next? (Specific actionable step)
  3. Why does this matter now? (Urgency and context)`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meaning: { type: Type.STRING },
            action: { type: Type.STRING },
            urgency: { type: Type.STRING }
          },
          required: ["meaning", "action", "urgency"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as AIInsight;
  } catch (error) {
    console.error("Dashboard Insights Error:", error);
    return {
      meaning: "Your metrics suggest early-stage traction.",
      action: "Focus on deepening user engagement.",
      urgency: "Market shifts require agile product iteration."
    };
  }
};

/**
 * Orchestrates the "Next Best Action" for the founder.
 */
export const getNextBestAction = async (profile: StartupProfile, tasks: Task[]): Promise<NBA> => {
  const prompt = `Identify the SINGLE most important strategic priority for today.
  Profile: ${JSON.stringify(profile)}
  Backlog: ${JSON.stringify(tasks.filter(t => !t.completed))}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            reason: { type: Type.STRING },
            urgency: { type: Type.STRING, enum: ["high", "medium", "low"] }
          },
          required: ["title", "reason", "urgency"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { 
      title: "Update Investor Pipeline", 
      reason: "Momentum is key in early-stage fundraising.", 
      urgency: "high" 
    };
  }
};
