import { Type } from "@google/genai";
import { ai } from "./client";
import { Project, Task } from "../../types";

/**
 * Analyzes operational project health and risk density, providing individual scores.
 */
export const getProjectAnalysis = async (projects: Project[]): Promise<{ globalHealth: number, insights: string[], projectScores: Record<string, number> }> => {
  const prompt = `Analyze the health of the following startup projects:
  ${JSON.stringify(projects)}
  
  Consider:
  1. Task completion progress.
  2. Proximity to deadlines.
  3. Status (active vs stalled).
  
  Return a JSON object with:
  - globalHealth: Overall execution score (0-100).
  - insights: 3 high-level strategic findings.
  - projectScores: A mapping of project IDs to individual health scores (0-100).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            globalHealth: { type: Type.NUMBER },
            insights: { type: Type.ARRAY, items: { type: Type.STRING } },
            projectScores: { 
              type: Type.OBJECT,
              additionalProperties: { type: Type.NUMBER }
            }
          },
          required: ["globalHealth", "insights", "projectScores"]
        }
      }
    });
    return JSON.parse(response.text || '{"globalHealth": 100, "insights": [], "projectScores": {}}');
  } catch (error) {
    console.error("AI Project Analysis Error:", error);
    return { globalHealth: 50, insights: ["Analysis offline."], projectScores: {} };
  }
};

/**
 * Suggests new tasks based on project description and progress.
 */
export const suggestProjectTasks = async (project: Project): Promise<Partial<Task>[]> => {
  const prompt = `Suggest 3 high-impact, actionable tasks for this project:
  Name: ${project.name}
  Description: ${project.description}
  Current Progress: ${project.progress}%
  
  Return a JSON array of tasks with 'title', 'priority' (low/medium/high), and 'category'.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              priority: { type: Type.STRING, enum: ["low", "medium", "high"] },
              category: { type: Type.STRING }
            },
            required: ["title", "priority", "category"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("AI Task Suggestion Error:", error);
    return [];
  }
};
