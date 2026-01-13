# StartupAI System Rules & Invariants

## 🔒 1. Entry Point Integrity (Hard Rule)
- **File**: `index.html`
- **Constraint**: This file is strictly **IMMUTABLE**.
- **Reasoning**: The `index.html` serves as the architectural bootstrapper. It contains the `importmap` configuration and the critical script entry point for `main.tsx`. 
- **Prohibitions**:
    - DO NOT alter the `<script type="importmap">` block.
    - DO NOT add manual `<script>` or `<link>` tags for external libraries.
    - DO NOT change the structure of the `<div id="root">` element.

## 📦 2. Dependency Management
- All dependencies must be resolved via the `importmap` in `index.html`.
- If a new library is required, it must be added to the `importmap` rather than via direct CDN scripts in the HTML body or head.

## 🏗️ 3. Component Architecture
- Maintain the **Three-Panel Layout** across all operational screens.
- Adhere strictly to the **Stone Palette** and typography rules defined in the style guide.
