# AGENTS.md

Canonical operating guide for coding agents working on the Dr. Deoksoon Kim Academic Portfolio.

This repository prioritizes stakeholder-aligned content architecture, rigorous typography, accessibility, performance, and restrained academic design over rapid unstyled feature delivery. 

Preserve the core aesthetic: eloquent minimalism, academic weight, public usefulness, and highly legible structure.

## Source of Truth Hierarchy

When instructions conflict, use this order:

1. Current user prompt/request.
2. `DESIGN.md` stakeholder decisions.
3. `AGENTS.md`.
4. Existing repository source code.
5. Current external documentation for Jekyll and Minimal Mistakes.

## Migration Context

This site is a **Minimal Mistakes rebuild** of the existing `d-kim-36.github.io` Hugo/PaperMod site. The aesthetic of d-kim-36.github.io must be preserved — specifically its BC Maroon identity, warm gold secondary, and custom card components. Only the structural framework changes (Hugo → Jekyll/Minimal Mistakes).

The site is built using:
- **Jekyll** (Ruby-based static site generator).
- **Minimal Mistakes** (via `remote_theme` in `_config.yml`).
- **Liquid Templating** (`{% %}` and `{{ }}`).
- **GitHub Pages** deployment pipeline.

Important architectural areas:
- `_config.yml` — The master brain of the site. Controls the sidebar author profile, defaults, and theme variables.
- `_data/navigation.yml` — Controls all global navigation menus.
- `_layouts/` — Custom Tier 2 page templates (e.g., the DK English Data-Driven Hub).
- `_includes/` — Reusable UI components (equivalent to shortcodes), like `gallery-card.html` or `video-card.html`.
- `assets/css/main.scss` — Where we override Minimal Mistakes' default styling via Sass variable overrides and custom component classes.

## The Design System: "Academic Tech"

The full design spec lives in `DESIGN.md`. Agents MUST treat that file as the source of truth for all visual decisions. Summary of critical rules:

1. **Typography:**
   - Headings (`h1`–`h4`): `Merriweather` or `Instrument Serif` — signals academic rigor.
   - Body: `Inter` or `Geist` — clean, modern sans-serif.
   - Never use `Times New Roman`, `Georgia`, or `Garamond` as primary heading fonts.
2. **Color Tokens (from d-kim-36.github.io):**
   - Background: `#FAFAFA` (warm off-white canvas)
   - Cards: `#FFFFFF` (pure white surface for elevation)
   - Primary/BC Maroon: `#8a100b` — headings, active links, section header underlines only
   - Secondary/Gold: `rgb(155, 118, 60)` — metadata and secondary labels
   - Body text: `rgb(31, 41, 55)` — dark slate, never pure black
3. **Cards ("Stripe-like"):**
   - Border: `1px solid rgba(0,0,0,0.06)` — ultra-quiet, never heavy colored borders
   - Radius: `12px`
   - Hover: `transform: translateY(-4px)` + deepened shadow
4. **Layouts:**
   - CSS Grid only. `display: grid; gap: 24px;`. Never `calc(33% - 1rem)` flexbox math.
   - Use `auto-fit minmax(300px, 1fr)` — never a static `repeat(3, 1fr)` grid.

## Agent Execution Rules

1. **Data-Driven Over Hardcoded:** For list-heavy pages (like "Meet the Team" or "Programs"), use YAML Front Matter to store the data, and write a Liquid loop (`{% for item in page.items %}`) in the `_layouts` file to render the UI. Do not write raw HTML grids inside Markdown files.
2. **Component Reuse:** If a UI element (like a card) appears on more than one page, extract it into an `_includes/` file immediately.
3. **Protect Tier 1 Content:** Do not over-engineer standard Markdown pages (`bio.md`, `publications.md`). Let the Minimal Mistakes theme render them naturally.

## Finished Implementation Response Format

Every finished implementation response must include:

```text
Micro-testing (commit: <type(scope): summary>):
- [ ] Build: <command/result or "not run"> (e.g., `bundle exec jekyll build`)
- [ ] Responsive: <viewport(s) checked or "not run">
- [ ] A11y: <checks attempted or "not run">
- [ ] Visual System: Verified no heavy colored borders or hardcoded visual one-offs.
- [ ] Data Logic: Verified Liquid loops render Front Matter data correctly.