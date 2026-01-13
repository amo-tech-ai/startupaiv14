# Supabase Edge Functions: Technical Documentation

**Last Updated:** January 12, 2026  
**Status:** 🟢 Active  
**Runtime:** Deno (TypeScript)  
**Security:** JWT verification + RLS forced  

---

## 1. Overview
The StartupAI backend logic is decentralized across high-performance **Supabase Edge Functions**. These functions handle sensitive operations (Stripe), long-running AI tasks (Gemini 3), and complex data orchestrations that should not reside on the client.

---

## 2. Core Operational Functions

### `ai-helper`
- **Purpose**: General purpose AI utility for simple chat and context-free Q&A.
- **Model**: Gemini 3 Flash.
- **Auth**: JWT Required.

### `create-checkout`
- **Purpose**: Bridge between the StartupAI app and Stripe Billing.
- **Model**: N/A.
- **Logic**: Creates a session, maps it to the `orgs` table, and returns a secure payment URL.

---

## 3. The Wizard Pipeline (Step-by-Step)

| Function | Step | Model | Primary Logic |
| :--- | :--- | :--- | :--- |
| `wizard-step-1-extract` | 1 | Flash | URL Context: Reads company URL to auto-populate basics. |
| `wizard-step-2-analyze` | 2 | Pro | Thinking + Search: Readiness scoring and gap analysis. |
| `wizard-step-3-business` | 3 | Pro | Search: Competitor landscape and Lean Canvas drafting. |
| `wizard-step-4-traction` | 4 | Flash | Logic: Industry benchmarking of MRR/Users. |
| `wizard-step-5-funding` | 5 | Pro | Thinking: Valuation estimation and capital planning. |
| `wizard-step-6-complete` | 6 | Pro | Content Agent: Generates strategy doc and locks the profile. |

---

## 4. Dashboard & Intelligence

### `dashboard-priorities`
- **Agent**: Orchestrator.
- **Logic**: Reads the `tasks` and `deals` tables. Selects the Top 3 "Next Best Actions."
- **Model**: Gemini 3 Flash.

### `dashboard-insights`
- **Logic**: Context-aware analysis for the Right Panel. Answers: *What does this mean? What next? Why now?*
- **Model**: Gemini 3 Flash.

---

## 5. AI Agent Microservices

### `ai-orchestrator`
The "brain" of complex requests. It determines which specialized agent (Analyst, Research, or Content) should handle the incoming prompt.

### `ai-analyst`
Deep quantitative analysis. Calculates `readiness_score` and `health_score` by running code-execution blocks on metric snapshots.

### `ai-research`
External world discovery. Uses **Google Search Grounding** to verify investor portfolios, market trends, and competitor pivots.

### `ai-content`
The generative engine for long-form artifacts. Responsible for drafting the `Strategy Document` and the `Pitch Deck` slide-by-slide.

---

## 6. Common Development Patterns

### Authentication Wrapper
Every function MUST verify the user's identity before processing data:
```typescript
const authHeader = req.headers.get('Authorization');
const token = authHeader?.replace('Bearer ', '');
const { data: { user }, error } = await supabase.auth.getUser(token);
if (error || !user) throw new Error('Unauthorized');
```

### CORS Protocol
All functions must handle preflight `OPTIONS` requests to allow communication from the browser:
```typescript
if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders });
}
```

### Error Handling
Standardized JSON error responses to ensure the React UI can display meaningful error boundaries:
```typescript
try {
  // ... logic
} catch (err) {
  return new Response(JSON.stringify({ error: err.message }), { 
    status: 400, 
    headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
  });
}
```

---

## 7. Performance & Limits
- **Execution Limit**: 50MB memory, 10s CPU time (Standard Gemini calls).
- **Concurrency**: Handled by Supabase's global edge network.
- **Cold Starts**: Optimized through modular imports and minimal dependency trees.

---

**End of Edge Function Documentation**