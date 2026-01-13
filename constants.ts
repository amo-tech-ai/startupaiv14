import { StartupProfile, UserProfile } from './types';

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
  leanCanvas: {
    problem: ['Freelancers waste 8+ hours/month doing manual bookkeeping', 'High error rate leads to tax penalties', 'Receipts difficult to track in real time'],
    alternatives: ['QuickBooks', 'Excel', 'Manual notebooks'],
    solution: ['AI bookkeeping assistant', 'Auto-categorization', 'AI tax estimator'],
    metrics: ['Monthly Active Users', 'AI Accuracy Rate', 'Retention (D30)'],
    uvp: 'The fastest way for Freelancers to stay tax-ready with zero effort.',
    highLevelConcept: 'Mint.com for freelancers.',
    unfairAdvantage: 'Proprietary AI tax classifier',
    channels: ['TikTok influencer ads', 'YouTube tutorials', 'LinkedIn content'],
    segments: ['Freelancers', 'Creators', 'Remote consultants'],
    earlyAdopters: ['Consultants earning over $80k', 'Digital nomads'],
    costs: ['Cloud compute usage', 'AI inference costs', 'Payroll', 'Customer support'],
    revenue: ['$15/mo subscriptions', 'Premium tax service add-on', 'Affiliate revenue'],
  }
};

export const INITIAL_USER: UserProfile = {
  firstName: 'Alex',
  lastName: 'Founder',
  bio: '',
  email: 'alex@startup.ai',
  timezone: 'Pacific Time (US & Canada)',
  role: 'CEO & Founder',
  department: 'Product Department',
  preferences: {
    appearance: 'light',
    aiCopilot: true,
    language: 'English (United States)',
  },
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