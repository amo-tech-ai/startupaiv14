# StartupAI Database Diagrams

**Last Updated:** January 13, 2026  
**Purpose:** Visual representation of database structure, relationships, and data flows  

---

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    profiles ||--o{ org_members : "belongs to"
    orgs ||--o{ org_members : "has"
    orgs ||--o{ startups : "owns"
    orgs ||--o{ projects : "owns"
    orgs ||--o{ tasks : "owns"
    
    startups ||--o{ startup_founders : "has"
    startups ||--o{ startup_links : "has"
    startups ||--o{ startup_competitors : "has"
    startups ||--o{ startup_metrics_snapshots : "tracks"
    startups ||--o{ wizard_sessions : "has"
    startups ||--o{ documents : "generates"
    startups ||--o{ projects : "contains"
    startups ||--o{ tasks : "has"
    startups ||--o{ contacts : "tracks"
    
    contacts ||--o{ deals : "leads to"
    deals ||--o{ deal_interactions : "has"
    
    projects ||--o{ tasks : "contains"
```

---

## 2. Data Flow Diagrams

### 2.1 Wizard Data Flow (6 Steps)

```mermaid
flowchart TB
    START([User Starts Wizard]) --> STEP1[Step 1: Context & Founders]
    STEP1 --> GEMINI1[Gemini 3 Flash: Data Extraction]
    GEMINI1 --> STARTUPS_TBL[(startups table)]
    
    STARTUPS_TBL --> STEP2[Step 2: AI Analysis]
    STEP2 --> GEMINI2[Gemini 3 Pro: Readiness Score]
    GEMINI2 --> INSIGHTS_TBL[(ai_insights table)]
    
    INSIGHTS_TBL --> STEP3[Step 3: Business Model]
    STEP3 --> GEMINI3[Gemini 3 Pro: Competitor Research]
    GEMINI3 --> COMPETITORS_TBL[(startup_competitors table)]
    
    COMPETITORS_TBL --> STEP4[Step 4: Metrics]
    STEP4 --> GEMINI4[Gemini 3 Flash: Benchmarking]
    GEMINI4 --> METRICS_TBL[(startup_metrics_snapshots table)]
    
    METRICS_TBL --> STEP5[Step 5: Funding]
    STEP5 --> GEMINI5[Gemini 3 Pro: Strategy]
    
    STEP5 --> STEP6[Step 6: Review]
    STEP6 --> DASHBOARD([Dashboard Unlocked])
```

### 2.2 Dashboard Data Flow

```mermaid
flowchart LR
    USER([User Opens Dashboard]) --> LOAD[Load Startup Data]
    LOAD --> ANALYZE[AI Analyst Agent]
    ANALYZE --> GEMINI[Gemini 3 Pro]
    GEMINI --> INSIGHTS[Right Panel: AI Insights]
    GEMINI --> PRIORITIES[Main Panel: Priorities]
```

### 2.3 CRM Data Flow

```mermaid
flowchart TB
    USER([User in CRM]) --> CONTACTS[View Contacts]
    CONTACTS --> ENRICH[AI Lead Enrichment]
    ENRICH --> GEMINI[Gemini 3 Pro]
    GEMINI --> SCORE[Fit Score Data]
    SCORE --> DISPLAY[CRM Dashboard]
```

---

## 3. AI Data Flow

```mermaid
flowchart TB
    USER_ACTION([User Action]) --> TRIGGER{AI Trigger}
    TRIGGER --> ORCHESTRATOR[AI Orchestrator]
    ORCHESTRATOR --> SELECT_AGENT{Select Agent}
    
    SELECT_AGENT --> ANALYST[Analyst Agent]
    SELECT_AGENT --> RESEARCH[Research Agent]
    
    ANALYST --> GEMINI_PRO[Gemini 3 Pro]
    RESEARCH --> GEMINI_PRO
    
    GEMINI_PRO --> |Google Search| SEARCH[Google Search Grounding]
    SEARCH --> RESPONSE[AI Response]
    
    RESPONSE --> LOG[Log ai_requests]
    RESPONSE --> STORE[Store in ai_insights]
```

---

## 4. Usage Guide

| Diagram | Use Case | Audience |
|---------|----------|----------|
| **ERD** | Understanding table relationships | Developers |
| **Wizard Flow** | Debugging setup sequence | Developers, QA |
| **AI Data Flow** | AI integration & model selection | AI Engineers |

---

**Keep diagrams updated as schema evolves. Use these for onboarding and architecture discussions.**