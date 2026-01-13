# Wizard Step 2: Problem & Solution

## 1. Progress Tracker
| Feature / Screen | Status | % Complete | Priority |
| :--- | :--- | :--- | :--- |
| Problem/Solution Form | Done | 100% | P0 |
| Narrative Refiner Agent | Done | 100% | P0 |

## 2. Screen Overview
- **Description**: Defining the "Why" and "How" of the business.
- **Purpose**: Capture the core value proposition.
- **User Goal**: Write a draft of the problem and how they fix it.
- **System Goal**: Use AI to transform "Founder-speak" into "Investor-speak".

## 3. Features
- Large text areas for Problem and Solution.
- "Improve with AI" button.
- Comparison UI (Original vs. Refined).

## 4. Content & Data
- **User Inputs**: `problem_draft`, `solution_draft`.
- **AI Inputs**: Drafts + Industry context.
- **Outputs**: Refined narrative via `getWizardSuggestions`.