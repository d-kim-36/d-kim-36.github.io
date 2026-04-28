# Frontend UI Architecture Snapshot

**Generated:** 2026-04-27  
**Purpose:** Context packet for AI architecture lead (ChatGPT/Codex). Provides enough product, stack, route, component, and design-token context to recommend UI directions and guide frontend architecture decisions — without requiring codebase rediscovery.

**Repos covered:**
- `d-kim-36.github.io` — public brand / professor portfolio / DK English marketing site
- `dk-english-school` — private learning product / student-facing writing education app

Drafty Academy (separate) is excluded.

---

## Table of Contents

1. [Repository Overview](#1-repository-overview)
2. [Route Map / Page Inventory](#2-route-map--page-inventory)
3. [Layout Hierarchy](#3-layout-hierarchy)
4. [Component Inventory](#4-component-inventory)
5. [Design Token / Styling Audit](#5-design-token--styling-audit)
6. [Current UX Skeleton](#6-current-ux-skeleton)
7. [Screenshots](#7-screenshots)
8. [Known Frontend Issues / Design Friction](#8-known-frontend-issues--design-friction)
9. [Suggested Next Design Decision Points](#9-suggested-next-design-decision-points)

---

## 1. Repository Overview

### `d-kim-36.github.io` — Public Brand Site

| Property | Value |
|---|---|
| Framework | Hugo (static site generator) |
| Theme | PaperMod (git submodule at `themes/PaperMod/`) |
| Styling | Hugo asset pipeline; custom CSS in `assets/css/` (12 files); CSS custom properties for all tokens |
| Routing | Hugo content model (`content/` directory → URL paths); no client-side routing |
| Deployment | GitHub Pages at `https://eunha.studio` |
| Build tooling | Hugo only — no Node.js / npm build pipeline |
| Dark mode | Supported via CSS custom property swap (PaperMod toggle) |
| Key frontend dirs | `assets/css/`, `layouts/`, `layouts/partials/`, `layouts/dk-english/`, `layouts/shortcodes/`, `content/` |
| Theme/vendor constraints | PaperMod base layouts provide all page shells; any override must shadow the correct `layouts/_default/` or section-specific file |

**Critical constraint:** The DK English School sub-section (`/dk-english/`) lives inside this repo as a content section with its own Hugo layout type (`dk-english`). It is not a separate deploy — it shares the same build and domain. Style overrides for the DK section are embedded in `layouts/partials/dk-english/subnav.html` as inline `<style>` blocks.

---

### `dk-english-school` — Learning App

| Property | Value |
|---|---|
| Framework | Next.js 16.2 — App Router |
| Language | TypeScript + React 19 |
| Styling | Tailwind CSS v4 (PostCSS plugin); all design tokens defined via `@theme inline` in `app/globals.css`; no separate `tailwind.config.ts` |
| Auth | Clerk (`@clerk/nextjs` v7) — `ClerkProvider` wraps root layout |
| Database | Neon serverless PostgreSQL + Prisma 7 with `@prisma/adapter-neon` |
| AI | Groq (`llama-3.3-70b-versatile` for generation/evaluation; Whisper for transcription) |
| Rich-text editor | Quill 2 |
| Course flowchart | `@xyflow/react` (React Flow v12) |
| Deployment | Vercel |
| App version | 0.23.5 (displayed bottom-right in UI) |
| Key frontend dirs | `app/`, `components/layout/`, `components/phases/`, `components/shared/`, `hooks/`, `lib/ai/`, `app/globals.css` |

---

## 2. Route Map / Page Inventory

### `d-kim-36.github.io`

| Path | Purpose | Layout | Audience |
|---|---|---|---|
| `/` | Profile homepage (image, bio, button grid, social icons) | PaperMod `profile` mode | Public |
| `/bio/` | Full biography page | `single` | Public |
| `/exp/` | Academic experience with TOC | `single` | Public |
| `/teaching/` | Teaching overview | `single` | Public |
| `/pubs/` | Publications list (Books, Journals, Articles, Chapters) with TOC | `single` | Public |
| `/res/` | Research section landing | `list` | Public |
| `/res/AI/` | Research: AI and Multimodality | `single` | Public |
| `/res/L2/` | Research: L2 Reading and Literacy | `single` | Public |
| `/res/STEM/` | Research: STEM Education for Language Learners | `single` | Public |
| `/res/Formative/` | Research: Formative Education | `single` | Public |
| `/res/Instructional/` | Research: Instructional Technology & Teacher Education | `single` | Public |
| `/media/` | Media & interviews (YouTube video card grid) | `list` + `video-card` shortcode | Public |
| `/gallery/` | Photo gallery with LightGallery lightbox | `single` + `gallery-card` shortcode | Public |
| `/archive/` | Posts archive | `archives` | Public |
| `/location/` | Office address + embedded map | `single` | Public |
| `/officehours/` | Office hours schedule | `single` | Public |
| `/dk-english/` | DK English School marketing hub (hero, vision, team/program cards, contact) | `dk-english/list` | Public |
| `/dk-english/teams/` | Staff / teacher team page | `dk-english/teams` | Public |
| `/dk-english/programs/` | Programs page (stub) | `dk-english/single` | Public |
| `/tags/` | Taxonomy tags listing | `terms` | Public |

**Notable:** There is no separate domain or subdomain for the DK English marketing section — it is a Hugo section under the same domain. The DK English hub links outward to the `dk-english-school` app (separate Vercel deploy).

---

### `dk-english-school`

| Path | Purpose | Layout / Shell | Phase | Audience |
|---|---|---|---|---|
| `/sign-in` | Clerk-hosted sign-in | Clerk UI, no app shell | Auth | Public → Student |
| `/sign-up` | Clerk-hosted sign-up | Clerk UI, no app shell | Auth | Public → Student |
| `/` | Dashboard: course catalog, hero lesson card, stats | `DashboardNav` + bento grid | Post-auth | Student |
| `/{courseId}` | Course syllabus: React Flow node graph of lessons | `DashboardNav` + `FlowchartSyllabus` | Post-auth | Student |
| `/{courseId}/{lessonId}` | Active lesson: phased learning engine | `Topbar` + `Sidebar` + phase component | Post-auth | Student |
| `/api/generate` | AI story generation (Groq) | Route handler | Server | Internal |
| `/api/evaluate` | AI writing evaluation + diagnostics (Groq) | Route handler | Server | Internal |
| `/api/generate-bridge` | Bridge question generation (Groq) | Route handler | Server | Internal |
| `/api/transcribe` | Speech-to-text (Groq Whisper) | Route handler | Server | Internal |
| `/api/prewriting-check` | Pre-writing form validation | Route handler | Server | Internal |

**No teacher/admin routes exist yet.** Teacher dashboard is on the roadmap but not implemented.

**Lesson phases** within `/{courseId}/{lessonId}` (managed by `EngineShell.tsx`):

| Phase key | Component | Description |
|---|---|---|
| `theory` | `TheorySlideDeck` | Concept slides with forward/back nav |
| `activation` | `PhaseTopicActivation` | Multi-step pre-writing research form |
| `brainstorm` | `Phase1Brainstorm` | Speech-to-text idea capture → AI story generation |
| `read` | `Phase2ReadAloud` | Sentence-by-sentence read-aloud with word accuracy scoring |
| `xray` | `Phase3XRayGame` | Multiple-choice structure identification game |
| `write` | `Phase4Editor` | Quill editor + AI evaluation + feedback |
| `uncoached` | `PhaseUncoachedEditor` | Diagnostic writing (no coaching; submits to diagnostic evaluator) |
| — | `ReverseXRayReview` | Post-submission diagnostic feedback view (shown after `uncoached`) |

---

## 3. Layout Hierarchy

### `d-kim-36.github.io`

```
layouts/_default/baseof.html            ← root HTML shell
  ├── partials/head.html                 ← CSS pipeline, Figtree font <link>, analytics
  ├── partials/header.html               ← sticky nav bar (logo, menu links, theme toggle)
  ├── block "main"
  │   ├── layouts/_default/single.html      ← standard content page (bio, exp, teaching, pubs, res/*)
  │   ├── layouts/_default/list.html         ← section listing (res, media)
  │   ├── layouts/_default/archives.html     ← archive listing
  │   ├── layouts/_default/search.html       ← search results
  │   ├── layouts/dk-english/list.html       ← DK English hub (hero, vision, team cards, contact)
  │   │   └── partials/dk-english/subnav.html   ← sticky DK sub-nav (embedded CSS, z-index 90)
  │   └── layouts/dk-english/teams.html      ← teams/staff page
  └── partials/footer.html               ← copyright, scroll-to-top, theme toggle script
```

**PaperMod profile mode** (homepage `/`): rendered entirely from `config.yml` params — no separate `content/_index.md` exists. The profile image, title, bio subtitle, social icons, and button grid are config-driven.

**Custom shortcodes:** `gallery-card.html` (image + title + description), `video-card.html` (YouTube iframe + title).

---

### `dk-english-school`

```
app/layout.tsx  (RootLayout)
  └── ClerkProvider
      └── <html class="h-full antialiased" [font vars]>
          └── <body class="min-h-full flex flex-col">
              │
              ├── /sign-in, /sign-up
              │     └── Clerk default UI (no app chrome)
              │
              ├── /   (dashboard)
              │     ├── DashboardNav          ← logo "dk.english" + Clerk UserButton
              │     └── <main> bento grid
              │           ├── Hero card       ← current lesson + progress bar
              │           ├── Stats cards     ← stories written, completion %
              │           └── Course catalog  ← course grid with lesson mini-bars
              │
              ├── /{courseId}
              │     ├── DashboardNav
              │     └── FlowchartSyllabus    ← React Flow node graph (circular progress rings)
              │
              └── /{courseId}/{lessonId}     (EngineShell — 'use client')
                    ├── Topbar               ← phase breadcrumbs + language selector (EN/KO/ZH)
                    ├── Sidebar              ← lesson roadmap, collapsible (486 lines; chevron toggle)
                    └── <main> phase area
                          └── [one phase component at a time]
```

**Key layout notes:**
- No nested `layout.tsx` files under route segments — all layout wrapping is done inside `EngineShell.tsx` itself.
- `Sidebar` has two modes: expanded (full text labels, ~256px) and collapsed (icons only, 64px). Toggle is a chevron on the right edge.
- `Topbar` hides breadcrumbs during `theory`, `activation`, and `uncoached` phases.
- No modal system, no drawer system — all UI is inline in the page flow.
- No global loading skeleton; individual phase components handle their own loading states.
- Version badge (`v0.23.5`) is fixed bottom-right, rendered in root layout, always visible.

---

## 4. Component Inventory

### App Shell / Navigation

| File | Purpose | Props / Dependencies | Notes |
|---|---|---|---|
| `components/layout/DashboardNav.tsx` | Top nav for dashboard/course pages | None (reads Clerk session internally) | 20 lines; very thin |
| `components/layout/Topbar.tsx` | Lesson-page header with phase breadcrumbs + lang selector | `phase`, `phases[]`, `onPhaseClick`, `language`, `onLanguageChange` | Breadcrumbs hidden for theory/activation/uncoached |
| `components/layout/Sidebar.tsx` | Lesson roadmap sidebar, collapsible | `lesson`, `currentPhase`, `progress`, `courseId`, `lessonId` | 486 lines — largest component; handles GenreHub/TopicActivation/standard variants |
| `components/layout/FlowchartSyllabus.tsx` | React Flow course map (lesson node graph) | `lessons[]`, `unlockedLessons[]`, `lessonPhases{}` | Circular progress rings, clickable node links |

### Lesson UI (Phase Components)

| File | Purpose | Notes |
|---|---|---|
| `components/phases/TheorySlideDeck.tsx` | Concept slide navigation | Forward/back, bridge checks interspersed |
| `components/phases/Phase1Brainstorm.tsx` | Speech recording → AI story generation | Calls `/api/generate`; silence detection; typed fallback |
| `components/phases/Phase2ReadAloud.tsx` | Sentence-by-sentence read-aloud scoring | Word accuracy threshold 75%; highlights spoken vs. missed |
| `components/phases/Phase3XRayGame.tsx` | Structure ID multiple-choice game | Color-coded phrase highlights; wrong answer retry |
| `components/phases/Phase4Editor.tsx` | Writing phase with Quill editor + AI evaluation | Calls `/api/evaluate`; draft saved to localStorage |
| `components/phases/PhaseTopicActivation.tsx` | Multi-step pre-writing research form | Persists `PreWritingState`; 5 steps: Rule → Category → Subject → Facts → Notebook |
| `components/phases/PhaseUncoachedEditor.tsx` | Diagnostic writing (no coaching) | Calls `/api/evaluate` with `mode: "diagnostic"`; persists `DiagnosticBaseline` |
| `components/phases/ReverseXRayReview.tsx` | Post-diagnostic feedback with axis highlights | Glow / Grow / Macro highlights on draft; "Back to Course Map" exit |
| `components/phases/GenreHubLesson.tsx` | Genre classification lesson shell | Wraps GenrePuzzleGame; manages bridge/check state |
| `components/phases/GenrePuzzleGame.tsx` | Genre snippet sorting game | Drag/drop or click-to-sort into genre buckets |

### Writing / Editor UI

| Component | Notes |
|---|---|
| `Phase4Editor.tsx` | Quill 2 rich-text editor; skeleton structure prompts shown before writing; TTS speaker for mentor feedback |
| `PhaseUncoachedEditor.tsx` | Same Quill base; diagnostic mode — no hints, no inline suggestions |
| `ReverseXRayReview.tsx` | Read-only draft view with phrase-level highlight overlays |

### Reading / Mentor Text

No standalone `MentorText` or `ReadingPane` component exists yet. `Phase2ReadAloud.tsx` renders sentences from the AI-generated story. Literata is registered as `--font-reading` and the CSS class `.reading-surface, .mentor-text` applies it, but dedicated reading surface components are not yet built.

### Chat / Coaching UI

No chat UI exists. Feedback is delivered as structured phase results (evaluation cards, highlight overlays, slide content). The system is intentionally not a chatbot — see `CONTEXT.md §1`.

### Dashboard / Progress UI

Implemented inline in `app/page.tsx` (server component):
- Bento hero card (current lesson + progress bar)
- Stats row (stories written, course completion %)
- Course catalog grid (tier-colored icons, mini lesson progress bars)
- Phase names: `['Theory', 'Speak', 'Read', 'X-Ray', 'Write', 'Complete']`
- Progress calculation: `phase / 5 * 100`

### Forms / Auth

| Component | Notes |
|---|---|
| `/sign-in/[[...sign-in]]/page.tsx` | Clerk `<SignIn>` component; no custom styling |
| `/sign-up/[[...sign-up]]/page.tsx` | Clerk `<SignUp>` component; no custom styling |
| `components/shared/OnboardingFlow.tsx` | Age entry form; shown when `UserProfile.age` is null |

### Shared Primitives

| File | Purpose | Notes |
|---|---|---|
| `components/shared/LanguageContext.tsx` | i18n context (en/ko/zh); `useLanguage()` + `t()` helper | Used in all phase components |
| `components/shared/SpeechInput.tsx` | Reusable microphone recorder | Silence detection, base64 → `/api/transcribe`; typed fallback |
| `components/shared/Waveform.tsx` | Canvas-based real-time FFT audio waveform | Used in Brainstorm + ReadAloud phases |
| `components/shared/StoryViewer.tsx` | Read-only story display with structure map highlights | Used after generation |
| `components/shared/ResetProgressButton.tsx` | Admin dev tool — clears lesson/course progress | Rendered in course syllabus page |

**No shared button, card, badge, modal, or tab primitives exist.** All interactive elements are styled inline in phase and layout components using Tailwind utility classes directly.

---

## 5. Design Token / Styling Audit

### `dk-english-school` — Tailwind v4 @theme tokens

Defined in `app/globals.css` via `@theme inline`:

```css
/* Fonts */
--font-sans:    var(--font-figtree);      /* body, UI */
--font-reading: var(--font-literata);     /* .reading-surface, .mentor-text */
--font-mono:    var(--font-geist-mono);   /* code, version badge */

/* Brand palette */
--color-brand-bg:           #f5f4f0;     /* page background (cream) */
--color-brand-surface:      #ffffff;     /* card surface */
--color-brand-primary:      #2d6a4f;     /* dark green; buttons, focus rings, CTAs */
--color-brand-primary-dark: #245a42;     /* hover state */
--color-brand-accent:       #52b788;     /* medium green; scrollbar thumb, highlights */
--color-brand-accent-light: #d8f3dc;     /* light green; accent backgrounds */
--color-brand-border:       #e2e0d8;     /* card/section borders */
--color-brand-text:         #1a1a2e;     /* primary text (dark navy) */
--color-brand-muted:        #6b7280;     /* secondary text, version badge */
--color-brand-read-bg:      #fafaf7;     /* reading surface background */
--color-brand-write-bg:     #ffffff;     /* writing editor background */
```

**Loaded fonts (Next.js `next/font/google`):**
- `Figtree` → `--font-figtree` (sans-serif; all UI text)
- `Literata` → `--font-literata` (serif; reading surfaces, mentor text)
- `Geist Mono` → `--font-geist-mono` (monospace; code, version display)

**Dark mode:** Not implemented. No `@media (prefers-color-scheme: dark)` in globals.css. The app is light-only.

**Spacing:** Tailwind default scale; no custom spacing tokens defined. Usage is ad-hoc utility classes.

**Border radius:** Tailwind defaults (`rounded`, `rounded-lg`, `rounded-xl`); no custom radius token.

**Shadows:** Tailwind defaults (`shadow`, `shadow-md`); no custom shadow scale.

**Focus ring:** `outline: 2px solid #2d6a4f; outline-offset: 2px` — hardcoded in globals.css, not a token.

**Animation utilities defined in globals.css:**
- `.animate-waveform` — audio bar pulse
- `.animate-shake` — wrong-answer feedback
- `.animate-float` — idle hover effect

**Tailwind token leakage:** Dashboard (`app/page.tsx`) uses hardcoded Tailwind color classes (`bg-emerald-100`, `bg-blue-100`, `bg-purple-100`) for course tier icons — not using brand tokens.

---

### `d-kim-36.github.io` — Hugo CSS Custom Properties

Defined in `assets/css/core/theme-vars.css`:

```css
/* Light mode */
--primary:   rgb(105, 8, 7);      /* dark burgundy — headings, active nav, section headers */
--secondary: rgb(155, 118, 60);   /* tan/brown — secondary text */
--tertiary:  rgb(214, 214, 214);  /* light gray — borders, code-bg */
--content:   rgb(31, 41, 55);     /* dark charcoal — body text */

/* Dark mode */
--primary:   rgb(218, 218, 219);  /* light gray */
--secondary: rgb(155, 156, 157);  /* medium gray */
--content:   rgb(196, 196, 197);  /* light gray */

/* Links (light) */
color: #000080;        /* navy */
/* Links (dark) */
color: #58a6ff;        /* GitHub blue */

/* Layout */
--nav-width:    1024px;
--main-width:   720px;
--header-height: 44px;
--radius:        8px;
```

**Font:** `Figtree` (Google Fonts, loaded via `<link>` in `partials/head.html`). No serif or mono font.

**Typography scale (`assets/css/common/main.css`):**

| Token | Value |
|---|---|
| Body text | 18px, line-height 1.45 |
| Headings (H1) | 40px, weight 600, −0.03em letter-spacing |
| H2 | 24px |
| H3 | 19px |
| H4/H5 | 15px/14px uppercase gray |
| Entry cards | 15px |
| Header nav | 16px |
| Footer | 13px |

**DK English section overrides** (inline CSS in `partials/dk-english/subnav.html`):

```css
--dk-primary:    rgb(105, 8, 7);   /* same burgundy */
--dk-secondary:  rgb(155, 118, 60);
--dk-light-bg:   #f9f6f2;          /* cream — distinct from main site */
/* Hero: burgundy in light, rgb(80, 6, 5) in dark */
/* Subnav: sticky, 48px, z-index 90 */
```

**Dark mode:** Fully supported via CSS variable swap; PaperMod toggle with persistence.

---

### Brand Alignment Note

The two products use **different primary color identities:**

| Product | Primary | Background | Vibe |
|---|---|---|---|
| Public site (`d-kim-36.github.io`) | Burgundy `#690807` | White / light gray | Academic, warm, formal |
| Learning app (`dk-english-school`) | Forest green `#2d6a4f` | Cream `#f5f4f0` | Educational, calm, nature |

Both use **Figtree** as the sans-serif, which is a point of continuity. Otherwise, the two visual identities are intentionally different — but this is undocumented and may warrant a deliberate brand alignment decision.

---

## 6. Current UX Skeleton

### Public Site (`d-kim-36.github.io`)

**Visitor flow:**
1. Arrives at `eunha.studio/` → profile mode: circular photo, name, role subtitle, bio paragraph, button grid (8 links), social icons (Scholar, YouTube, Newsletter, Location, Office Hours).
2. Main navigation: sticky header, links to Biography / Publications / Experience / Research / Teaching / Media / Gallery / DK School / TLab (external).
3. **CTA into the app:** "DK English School" button in homepage grid → `/dk-english/` → DK English hub page (hero + vision + team cards). From there, a "Register" or similar link would point to the Vercel app. (Current hub page copy and CTA link to the app should be verified at runtime — not confirmed from static analysis.)

---

### Learning App (`dk-english-school`)

**Auth flow:**
1. Unauthenticated user → redirect to `/sign-in` (Clerk default UI, no custom brand styling).
2. First-time user with no age → `OnboardingFlow` age entry form overlays dashboard.
3. Authenticated user with age → dashboard at `/`.

**After login:**
- Dashboard: bento grid with hero lesson card (current in-progress lesson + progress bar), stats (stories written, completion %), course catalog.
- Clicking a course → `/{courseId}` → React Flow flowchart of lesson nodes (circular progress rings, color-coded by unlock/complete state).

**Getting into a lesson:**
- Click a lesson node in the flowchart → `/{courseId}/{lessonId}`.
- Locked lessons show locked state; premium-locked show violet ring.
- Server checks subscription before rendering the lesson.

**Lesson structure (EngineShell phases in order):**
1. **Theory** → `TheorySlideDeck`: concept slides, forward/back, bridge check cards interspersed. No breadcrumbs in Topbar during this phase.
2. **Brainstorm** → `Phase1Brainstorm`: microphone records idea; waveform shown; silence detection triggers transcript; calls `/api/generate` → story returned.
3. **Read** → `Phase2ReadAloud`: story sentences read one-by-one; student reads aloud; word accuracy scored; advances on pass.
4. **X-Ray** → `Phase3XRayGame`: highlighted phrases in story; student selects what each phrase does (topic/support/conclusion); wrong = reaction + retry.
5. **Write** → `Phase4Editor`: Quill editor with skeleton structure prompts; submit → `/api/evaluate` → evaluation card (passed/feedback); TTS reads mentor feedback.
6. **Complete** → lesson marked done; next lessons unlocked; back to course map.

**Diagnostic lesson (Lesson 3) — different flow:**
1. No theory/brainstorm/read/xray.
2. `PhaseTopicActivation`: 5-step pre-writing research form (rule warmup → category → subject → facts → notebook). Persists `PreWritingState`.
3. `PhaseUncoachedEditor`: Quill editor with no coaching. Submit → `/api/evaluate` with `mode: "diagnostic"` → `ReverseXRayReview`.
4. `ReverseXRayReview`: draft with phrase highlights (Glow/Grow/Macro), axis feedback, "Back to Course Map".

**Writing / editor surface:**
- Quill 2 with default toolbar (minimal customization visible from static analysis).
- Draft saved to localStorage (not DB).
- Skeleton structure prompts shown inline before writing begins.

**Feedback / coaching surface:**
- No chat window. Feedback rendered as structured cards after phase evaluation.
- `ReverseXRayReview`: phrase-level highlights directly on draft text.
- `Phase2ReadAloud`: inline word-level highlighting (green = spoken, red = missed).

**Progress surface:**
- Dashboard hero card: current lesson + phase label + progress bar.
- `FlowchartSyllabus`: ring segments per lesson (5 segments = 5 phases).
- `Sidebar`: lesson roadmap with phase checkmarks; collapses to icon strip.

---

## 7. Screenshots

Screenshots require running the dev server and browser automation, which must be explicitly authorized per `dk-english-school/AGENTS.md`. Screenshots were not captured in this session.

**Placeholder structure created at:**

```
d-kim-36.github.io/docs/ui-snapshot/screenshots/
```

**Recommended captures (to be done manually or with `/browser` skill):**

```
screenshots/
  public-site/
    homepage-desktop.png
    homepage-mobile.png
    dk-english-hub-desktop.png
    dk-english-teams.png
    publications-desktop.png

  app/
    sign-in.png
    dashboard-desktop.png
    dashboard-mobile.png
    course-flowchart.png
    lesson-theory.png
    lesson-brainstorm.png
    lesson-readaloud.png
    lesson-xray.png
    lesson-editor-quill.png
    lesson-evaluation-card.png
    reverse-xray-review.png
    sidebar-expanded.png
    sidebar-collapsed.png
```

---

## 8. Known Frontend Issues / Design Friction

### Brand Disconnect
- The public site uses **burgundy + tan** (warm academic). The app uses **forest green + cream** (educational calm). Both use Figtree, but color/feel diverge significantly. There is no shared brand specification document bridging the two.
- The DK English hub (`/dk-english/`) lives on the public site but links to the app — visitors experience a jarring color shift.

### Design Token Leakage
- Dashboard (`app/page.tsx`) uses Tailwind one-off color classes (`bg-emerald-100`, `bg-blue-100`, `bg-purple-100`) for course tier icons instead of brand tokens. This will drift as the catalog grows.
- `ReverseXRayReview` and phase components use hardcoded hex colors for highlight types (Glow/Grow/Macro) not in the token system.

### Component Size and Coupling
- `Sidebar.tsx` is 486 lines — handles three distinct lesson-type variants (standard, GenreHub, TopicActivation) with conditional branches. Difficult to restyle without touching all three paths.
- `EngineShell.tsx` is 500+ lines — phase routing, progress writes, localStorage management, and layout all in one client component.
- No shared primitive library (no Button, Card, Badge, Modal, Tabs). Every component reinvents basic interactive patterns.

### Reading Surface Not Designed
- `--font-reading` (Literata) is defined in globals.css and the CSS class `.reading-surface` exists, but no dedicated reading surface component is built. `Phase2ReadAloud` renders story sentences with basic text styles — no typographic design for readability.

### Editor (Quill) Unstyled
- Quill 2 is initialized with no custom theme or brand styling beyond what globals.css provides. The editor chrome (toolbar, borders, text area) does not match the app's design language.

### Mobile / Tablet Layout
- CONTEXT.md states desktop-first with tablet/mobile as secondary. However, the lesson engine (`Topbar + Sidebar + phase area`) has no documented responsive behavior. The sidebar collapse helps but the overall layout is not designed for tablet.

### Auth / Onboarding Unstyled
- Clerk's default UI is used for sign-in/sign-up with no brand customization. First impression for new students is generic Clerk appearance.

### DK English Subnav CSS Coupling
- The DK English subnav CSS (`layouts/partials/dk-english/subnav.html`) contains an embedded `<style>` block with ~80 lines of CSS, outside the Hugo asset pipeline. Changes here do not benefit from cache-busting or pipeline optimization.

### No Skeleton / Loading States
- No global loading skeleton. Individual phases handle their own loading (spinners, etc.), but consistency is unclear without runtime verification.

### Typography Inconsistency on Public Site
- Article typography (`post-single.css`) has detailed heading scale (H1 40px → H5 14px uppercase). Profile mode and DK English hub pages inherit PaperMod defaults with partial overrides — typographic hierarchy may not be consistent across the site without a full audit.

---

## 9. Suggested Next Design Decision Points

Ordered roughly by impact and dependency:

### 1. Brand Alignment Decision
**Define whether the public site and app share a visual identity or are intentionally separate.** If separate: document the split and give each a name/rationale. If unified: pick a shared palette and Figtree as the common thread. This decision gates everything below.

### 2. Shared Design Token System
Extract a single `design-tokens.md` or `tokens.css` that both repos reference conceptually (Hugo CSS vars + Tailwind v4 `@theme`). Minimum: palette, typography scale, spacing rhythm, radius, shadow levels. Even if the two repos can't share a literal file, they should share a specification.

### 3. Clerk / Auth Screen Branding
Apply `appearance` prop to `<SignIn>` and `<SignUp>` with brand palette and Figtree font. This is a high-visibility first-impression surface with zero effort required.

### 4. Dashboard Redesign
The bento grid is a reasonable skeleton but feels generic. The hero card, stats, and course catalog need hierarchy and intentional visual design — especially as the course catalog grows beyond one entry.

### 5. Lesson Shell Redesign
The `Topbar + Sidebar + main` chrome is the most-used surface in the app. Key questions:
- Should Sidebar be persistent or modal on tablet?
- Should Topbar phase breadcrumbs be redesigned as a stepper or progress bar?
- Should the lesson shell feel different from the dashboard (distinct background, reduced chrome)?

### 6. Reading / Mentor Text Surface
Literata is already loaded but unused in a designed way. The read-aloud and future mentor-text surfaces need a dedicated reading surface component: comfortable line length (~65ch), appropriate font size (18–20px), leading (1.6–1.7), and generous padding.

### 7. Writing Editor Design
Quill needs brand-aligned styling: toolbar design, focus state, line height, font, placeholder treatment. The writing surface (white `brand-write-bg`) should feel distinct from the reading surface.

### 8. Primitive Component Library
Extract at minimum: `<Button>` (primary / secondary / ghost), `<Card>`, `<Badge>`, `<PhaseCard>` (evaluation result container). This will clean up 10+ components that currently reinvent these patterns inline.

### 9. DK English Hub CTA Path
Clarify and design the conversion path: public site profile → DK English hub → app sign-up. The hub page needs a clear, designed CTA pointing to the Vercel app. This is the only currently visible user acquisition funnel.

### 10. Mobile Lesson Layout
Define a responsive strategy for the lesson engine: how Sidebar and Topbar behave at tablet width (768–1024px) and whether mobile (< 768px) is in or out of scope for v1.

---

*End of snapshot. Pass this document to the AI architecture lead along with any runtime screenshots captured from §7.*
