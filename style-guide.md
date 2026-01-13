# StartupAI v14 Style Guide

This document defines the visual language, architectural patterns, and design constraints for **StartupAI v14**. The system prioritizes structural clarity, editorial aesthetics, and a "Founder OS" feel.

---

## 1. Design Philosophy
- **Architectural**: Clean, structured, and deliberate. Every element has a purpose.
- **Editorial**: High-contrast typography and generous whitespace, similar to a premium broadsheet or luxury magazine.
- **AI-Assisted**: AI is a persistent companion (Right Panel) that interprets data rather than obscuring it.

---

## 2. Color Palette
The system uses a strict **Stone** palette. Non-neutral colors are reserved exclusively for status indicators.

### Neutrals (Stone)
| Usage | Tailwind Class | Hex Code (Approx) |
| :--- | :--- | :--- |
| Primary Background | `bg-stone-50` | `#fafaf9` |
| Secondary Background | `bg-stone-100/40` | `#f5f5f4` |
| Border / Dividers | `border-stone-200` | `#e7e5e4` |
| Body Text | `text-stone-600` | `#57534e` |
| Heading / UI Dark | `text-stone-900` | `#1c1917` |
| Muted Labels | `text-stone-400` | `#a8a29e` |

### Status Colors
*Only used for health, priority, or urgency.*
- **Success/Healthy**: `text-emerald-600` / `bg-emerald-500`
- **Warning/Neutral**: `text-amber-600` / `bg-amber-400`
- **Danger/Critical**: `text-rose-600` / `bg-rose-500`

---

## 3. Typography
The system utilizes a dual-font pairing to distinguish between narrative strategy and operational data.

### Headings & Strategy
- **Font**: `Merriweather` (Serif)
- **Usage**: Page titles, section headers, AI-generated executive summaries, and quotes.
- **Scale**:
  - Hero: `text-7xl md:text-[9rem] font-bold tracking-tighter`
  - Page Title: `text-5xl font-serif font-bold`
  - Section: `text-2xl font-serif font-bold`

### UI & Operational Data
- **Font**: `Inter` (Sans-serif)
- **Usage**: Navigation, buttons, form inputs, labels, and tables.
- **Scale**:
  - Labels: `text-[10px] font-bold uppercase tracking-[0.2em]`
  - Body: `text-sm leading-relaxed`

---

## 4. Layout: The Three-Panel System
Every application screen must adhere to the 3-column architecture defined in `ThreePanelLayout.tsx`.

### Left Panel (288px / `w-72`)
- **Purpose**: Navigation, global context, and high-level health metrics.
- **Styling**: `bg-stone-100/40`, border-right.

### Main Panel (Flexible / `max-w-4xl`)
- **Purpose**: The "Work Area." Forms, data tables, and primary content.
- **Styling**: `bg-stone-50`, centered content with `px-12 py-16`.

### Right Panel (320px / `w-80`)
- **Purpose**: AI Intelligence and strategic suggestions.
- **Styling**: `bg-stone-50`, border-left. Always answers three specific questions:
  1. *What does this mean?*
  2. *What should I do next?*
  3. *Why does this matter now?*

---

## 5. Component Patterns

### Buttons
- **Primary**: `bg-stone-900 text-white font-bold uppercase text-xs tracking-[0.3em]`
- **Secondary**: `border border-stone-200 text-stone-900 hover:border-stone-900`
- **Ghost**: `text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300 hover:text-stone-900`

### Metric Cards
- Should use high-contrast borders (`border-stone-200`) or background separation.
- Value should be `font-serif`.
- Trend/Delta should be small, bold, and color-coded by status.

### Tables
- Border-collapse with `stone-200` headers.
- Rows should have a subtle hover state (`hover:bg-stone-50`).
- Text should be `Inter` for readability.

---

## 6. AI Behavior & Tone
AI responses must be:
- **Professional**: Avoiding slang or overly casual markers.
- **Insightful**: Going beyond repeating the data to explaining its implications.
- **Urgent**: Highlighting why an action matters *today*.

---

## 7. Design Restrictions
1. **No Gradients**: Use flat colors or subtle opacity variations.
2. **No Shadows**: Depth is created through borders and whitespace (Architectural).
3. **No Animations**: Except for page entry transitions (e.g., `fade-in slide-in-from-bottom`).
4. **Minimal Icons**: Use geometric shapes (squares, circles) or thin line-art if necessary.
