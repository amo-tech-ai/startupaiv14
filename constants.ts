
import { StartupProfile } from './types';

export const INITIAL_PROFILE: StartupProfile = {
  name: '',
  url: '',
  tagline: '',
  description: '',
  industry: '',
  founders: [{ name: '', role: '', linkedin: '' }],
  problem: '',
  solution: '',
  competitors: '',
  revenueModel: 'SaaS',
  revenue: 0,
  users: 0,
  growthRate: 0,
  runway: 6,
  fundraisingGoal: 0,
  useOfFunds: [],
  isWizardComplete: false,
};

export const REVENUE_MODELS = [
  'SaaS',
  'Marketplace',
  'E-commerce',
  'Fintech / Transactional',
  'Enterprise License',
  'Advertising',
  'Service / Agency'
];

export const FUNDING_USES = [
  'Product Development',
  'Sales & Marketing',
  'Hiring / Talent',
  'Operations',
  'Customer Support',
  'Legal & IP'
];

export const STONE_PALETTE = {
  bg: 'bg-stone-50',
  surface: 'bg-stone-100',
  border: 'border-stone-200',
  text: 'text-stone-900',
  textMuted: 'text-stone-500',
};

export const STATUS_COLORS = {
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  danger: 'text-rose-600',
};
