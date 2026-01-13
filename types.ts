
export interface Founder {
  name: string;
  role: string;
  linkedin: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  timezone: string;
  role: string;
  department: string;
  avatarUrl?: string;
  preferences: {
    appearance: 'light' | 'dark' | 'auto';
    aiCopilot: boolean;
    language: string;
  };
}

export interface Interaction {
  id: string;
  date: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  content: string;
}

export interface LeanCanvas {
  problem: string[];
  alternatives: string[];
  solution: string[];
  metrics: string[];
  uvp: string;
  highLevelConcept: string;
  unfairAdvantage: string;
  channels: string[];
  segments: string[];
  earlyAdopters: string[];
  costs: string[];
  revenue: string[];
  fundraisingGoal?: number;
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
  foundedYear?: string;
  headquarters?: string;
  customerSegments?: string[];
  keyFeatures?: string[];
  differentiator?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  leanCanvas?: LeanCanvas;
}

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  category: string;
  dependencies?: string[]; // Array of Task IDs that must be completed first
  contactId?: string; // Link task to a specific contact for follow-ups
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
  interactions?: Interaction[];
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
  // Updated type to include 'lead' and 'partner'
  type: 'investor' | 'customer' | 'lead' | 'partner';
  relevance: number;
  reason: string;
  source: string;
}

export interface AIInsight {
  meaning: string;
  action: string;
  urgency: string;
}

export interface CompetitorItem {
  name: string;
  strengths: string[];
  weaknesses: string[];
}

export interface CompetitorAnalysis {
  competitors: CompetitorItem[];
  marketGaps: string[];
  strategicAdvice: string;
}
