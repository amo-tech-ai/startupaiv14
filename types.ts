export interface Founder {
  name: string;
  role: string;
  linkedin: string;
}

export interface StartupProfile {
  name: string;
  url: string;
  tagline: string;
  description: string;
  industry: string;
  founders: Founder[];
  problem: string;
  solution: string;
  competitors: string;
  revenueModel: string;
  revenue: number;
  users: number;
  growthRate: number;
  runway: number;
  fundraisingGoal: number;
  useOfFunds: string[];
  isWizardComplete: boolean;
  readinessScore?: number;
}

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  category: string;
  dependencies?: string[]; // Array of Task IDs that must be completed first
}

export type ContactType = 'investor' | 'customer' | 'partner';
export type DealStage = 'Interested' | 'Meeting' | 'Negotiating' | 'Closed';

export interface Contact {
  id: string;
  name: string;
  organization: string;
  type: ContactType;
  stage: DealStage;
  lastContact: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'stalled' | 'completed';
  progress: number;
  deadline: string;
  description: string;
  healthScore?: number; // AI-generated health score 0-100
}

export interface DiscoveryResult {
  id: string;
  name: string;
  type: 'investor' | 'customer';
  relevance: number;
  reason: string;
  source: string;
}

export interface AIInsight {
  meaning: string;
  action: string;
  urgency: string;
}