
# Implementation Plan: Founder Home Dashboard (/app/dashboard)

## 1. Progress Tracker
| Feature / Screen | Status | % Complete | Priority |
| :--- | :--- | :--- | :--- |
| **Three-Panel Shell** | Done | 100% | P0 |
| **Main Panel: NBA Hero Card** | Done | 100% | P0 |
| **Metric Cards (MRR, Users, Burn)**| Done | 100% | P0 |
| **Milestone Progress** | Done | 100% | P1 |
| **AI Insights (Right Panel)** | Done | 100% | P0 |

## 2. Feature & Screen Breakdown

### Feature: Next Best Action (NBA) Hero
- **Purpose**: Strategic focus and decision alignment.
- **User Goal**: Know the #1 priority at a glance.
- **System Goal**: Use Gemini 3 Pro Thinking Mode to weigh profile data vs tasks.
- **Outputs**: High-visibility Stone-900 card with Reason and Urgency.

### Feature: Key Vitals
- **Purpose**: Operational heartbeat.
- **Metrics**: Revenue (MRR), Users, Burn Rate.
- **Styling**: Editorial grid with Stone separators.

## 3. AI Behavior
- **NBA Engine**: Uses `gemini-3-pro-preview` with a thinking budget to avoid "busy work" suggestions.
- **Insight Engine**: Answers the 3-question framework persistent in the Right Panel.
