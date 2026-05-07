# CLAUDE.md

Behavioral guidelines for agents working on the Dr. Deoksoon Kim portfolio.

**Primary goal:** Migrate `d-kim-36.github.io` (Hugo/PaperMod) to this Jekyll/Minimal Mistakes repo, preserving the site's existing color identity and component aesthetic while adopting Minimal Mistakes' structural framework. Meticulous, careful migration — not a redesign.

**Tradeoff:** These guidelines bias toward caution, elegance, and modularity over speed. For trivial tasks, use judgment.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain about Jekyll/Liquid syntax, ask or verify.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists (e.g., using a built-in Minimal Mistakes feature instead of writing custom CSS), say so. 
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No raw HTML inside Markdown files unless absolutely necessary (use `_includes` instead).
- If you write 100 lines of CSS and it could be solved by overriding one Sass variable in `_variables.scss`, rewrite it.

Ask yourself: "Would a senior architect say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing Liquid templating style.

## 4. Core Product Direction

- **Voice:** First-person academic voice by default.
- **Vibe:** Contemporary, minimalist, highly legible, authoritative. "Notion meets Stripe."
- **Structure:** Lean heavily on the persistent Left Sidebar (Author Profile) for global context. 
- **Modularity:** Separate data (YAML Front Matter) from presentation (Liquid Layouts). 

## 5. Non-Negotiables

- **Never invent** publications, citations, academic history, dates, PDFs, or external links. Use only provided text.
- **Never assume** React, Hugo, or Next.js architecture. This is a Jekyll site.
- **Never use** heavy, highly saturated colored borders or backgrounds for content cards. Always default to white cards on off-white backgrounds with subtle shadows.
- **Never break the Table of Contents.** Ensure standard Markdown headings (`###`) are used in content files so the Jekyll ToC generator can parse them.

## Finished Implementation Format

Every finished implementation response must include the Micro-testing checklist defined in `AGENTS.md`. Do not claim a task is complete if validation was not attempted. Say exactly what was and was not checked