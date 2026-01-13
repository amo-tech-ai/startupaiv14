# Wizard Step 1: Basics

## 1. Progress Tracker
| Feature / Screen | Status | % Complete | Priority |
| :--- | :--- | :--- | :--- |
| Basic Info Form | Done | 100% | P0 |
| Industry Categorizer | Done | 100% | P1 |

## 2. Screen Overview
- **Description**: Initial data entry for the startup identity.
- **Purpose**: Establish the core entities.
- **User Goal**: Provide company name and sector.
- **System Goal**: Validate the domain and categorize the industry for later AI context.

## 3. Features
- Input fields for Name, Website, Industry.
- Real-time AI validation of "Startup Name" (is it a name or a description?).

## 4. Content & Data
- **User Inputs**: `name`, `url`, `industry`.
- **Outputs**: Updated `StartupProfile` state.

## 5. Multi-Step PROMPT TASKS
- Uses `extractStartupFromURL` for automation.
- Normalizes industry via `Industry Specialist Agent`.