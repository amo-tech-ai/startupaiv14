# StartupAI v14: Product Requirements Document

**Status:** 🟢 Final Draft  
**Version:** 14.0  
**Architect:** Senior Product Architect  

---

## 1. Progress Tracker
| Section | Status | % Complete | Priority |
| :--- | :--- | :--- | :--- |
| Executive Summary | Done | 100% | P0 |
| Core User Flows | Done | 100% | P0 |
| Functional Specs | Done | 100% | P0 |
| AI Strategy & Prompts | Done | 100% | P0 |
| Technical Architecture | Done | 100% | P1 |
| Design & UX Standards | Done | 100% | P1 |

---

## 2. Executive Summary
StartupAI is an **AI-native operating system for founders**. It transforms chaotic ideas into clear strategy, execution plans, and investor-ready artifacts. The platform replaces fragmented tools (Docs, Sheets, CRM, Task Managers) with a unified, architectural system guided by Gemini 3.

### The "Founder OS" Value Prop
- **Clarity over Chaos**: Guided 6-step setup turns intuition into data.
- **Priorities over Procrastination**: AI curates the "Next Best Action" daily.
- **Investor Ready**: Strategy docs and pitch decks generated in minutes, not weeks.

---

## 3. Core Feature Requirements

### 3.1 Startup Wizard (The Genesis)
**Purpose**: Build a comprehensive startup profile to prime the AI engine.
- **Steps**: Basics, Problem/Solution, Business Model, Metrics, Fundraising, Review.
- **AI Integration**: Real-time narrative refinement and market grounding.

### 3.2 Command Center (Dashboard)
**Purpose**: Daily execution and high-level health monitoring.
- **Components**: Top 3 Priorities (NBA), Metric Cards (Revenue, Users, Runway), Milestone Progress.
- **Three-Panel Layout**: Persistent AI Intelligence (Right Panel) interpreting every view.

### 3.3 Relationship CRM
**Purpose**: Investor and customer pipeline management.
- **Components**: Deal Stages (Interested -> Closed), Contact Enrichment, Interaction History.
- **AI Agent**: Suggests follow-ups and researches investor fit.

### 3.4 Strategy & Artifacts (Documents)
**Purpose**: Asset generation for fundraising.
- **Components**: Strategy Document (Locked after Wizard), AI Pitch Deck Generator, Lean Canvas Grid.

---

## 4. Multi-Step AI Prompts (Execution Layer)

### Multi-Step Prompt: The Strategic Orchestrator (Dashboard NBA)
**Step 1 – Context**
- Receives: `StartupProfile`, `TaskList`, `CRM_Deals`, and `MetricSnapshots`.
- Constraints: Must identify the *single* highest-impact task for today.

**Step 2 – Analysis**
- Thinking Mode: Reason through runway vs. burn. If runway < 4 months, prioritize fundraising. If churn is high, prioritize customer discovery. 
- Filter out administrative "busy work".

**Step 3 – Generation**
- Produces: JSON object for the "Next Best Action" card.
- Format: `{"title": "string", "reason": "string", "urgency": "high|med|low", "action_link": "string"}`.

**Step 4 – Validation**
- Verify the action link maps to an existing app route.

### Multi-Step Prompt: Investor Research Agent (CRM)
**Step 1 – Context**
- Receives: `InvestorName`, `FirmURL`, and `StartupIndustry`.
- Constraints: Use `googleSearch` to verify active fund status.

**Step 2 – Analysis**
- Search for the firm's portfolio. Identify if they have invested in a competitor.
- Compare their typical check size to the startup's current fundraising goal.

**Step 3 – Generation**
- Produces: A markdown research report for the Right Panel.
- Includes: "Why they match", "Potential Conflicts", and "Recommended Outreach Angle".

---

## 5. Technical Requirements

### Stack
- **Frontend**: React 19, Vite, Tailwind CSS (Stone Palette).
- **Backend**: Supabase (Postgres, RLS, Edge Functions).
- **AI**: Gemini 3 Pro (Inference), Gemini 3 Flash (Extraction/Formatting).

### Three-Panel Layout Spec
- **Left**: `288px` (Navigation & Health).
- **Main**: Flexible (Work Area).
- **Right**: `320px` (AI Intelligence).

---

## 6. Design & UX Standards

### The "Stone" Aesthetic
- **Colors**: Neutrals only (`stone-50` to `stone-900`). Status colors only for Emerald (Success), Amber (Caution), Rose (Emergency).
- **Typography**: `Merriweather` for strategy/headings, `Inter` for data/UI.
- **Architectural**: 1px borders, generous whitespace, no shadows or gradients.

---

## 7. AI Intelligence Guardrails
Every Right Panel insight must answer:
1. **What does this mean?** (Data interpretation)
2. **What should I do next?** (Actionable instruction)
3. **Why does this matter now?** (Strategic urgency)

---

## 8. Success Metrics
- **Wizard Completion**: < 20 minutes.
- **AI Action Adoption**: > 40% of users complete the suggested "Next Best Action" within 24 hours.
- **Artifact Quality**: Documents require < 10% manual editing before investor submission.

---

## 9. Risks & Gaps
- **Data Freshness**: Investor portfolios change rapidly; AI must re-ground search results weekly.
- **Context Window**: As the startup grows (years of data), AI must prioritize recent metrics over historical ones.
- **CORS/Scraping**: Reading external URLs (Wizard Step 1) may hit rate limits; need text-paste fallbacks.

---

**End of PRD**