# Wizard Step 3: Business Model & Competitors

## 1. Progress Tracker
| Feature / Screen | Status | % Complete | Priority |
| :--- | :--- | :--- | :--- |
| Model Form | Done | 100% | P0 |
| Competitor Analyst Agent | Done | 100% | P1 |
| Moat Analysis Logic | Done | 100% | P0 |

## 2. Screen Overview
- **Description**: Operationalizing the startup.
- **Purpose**: Define how the company makes money and who else is doing it.
- **User Goal**: List competitors and select revenue model.
- **System Goal**: Identify the "Unfair Advantage" (Moat).

## 3. Features
- Competitor list management (Textarea).
- Business Model selector (Dropdown with standard options).
- Real-time AI Moat analysis via `getMoatAnalysis`.

## 4. Content & Data
- **User Inputs**: `competitors`, `revenueModel`.
- **AI Inputs**: Full context including problem/solution.
- **Outputs**: Detailed Moat Analysis (Bullet points).

## 5. Multi-Step PROMPT TASKS
- Uses `getMoatAnalysis` with `googleSearch` grounding and `gemini-3-pro-preview`.
