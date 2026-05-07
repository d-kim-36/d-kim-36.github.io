# DESIGN.md — Dr. Deoksoon Kim Portfolio

Design system and migration specification for the Jekyll/Minimal Mistakes rebuild of Dr. Kim's portfolio. The **source of aesthetic truth** is the existing `d-kim-36.github.io` Hugo/PaperMod site. The **structural canvas** is Minimal Mistakes. These two must be unified.

---

## 1. Project Vision

Dr. Kim operates at the intersection of multimodal digital literacy, AI-era language acquisition, and EdTech innovation. Her site must convey two identities simultaneously:

- **Academic gravitas** — the authority of a Boston College professor.
- **Modern platform polish** — the precision of a high-end EdTech product.

**Design shorthand:** "Notion meets Stripe, deployed by Vercel." Highly legible, restrained, and confident. Never decorative for its own sake.

---

## 2. Color Palette & Tokens

These values are sourced directly from `d-kim-36.github.io/assets/css/core/theme-vars.css` and must be preserved in the Minimal Mistakes rebuild.

| Token | Value | Role |
|-------|-------|------|
| `--primary` | `rgb(105, 8, 7)` / `#690807` | BC Maroon — headings, active links, primary CTAs |
| `--secondary` | `rgb(155, 118, 60)` / `#9b763c` | Warm gold — metadata, secondary labels |
| `--background` | `#FAFAFA` | Global page canvas — warm off-white, never clinical white |
| `--surface` | `#FFFFFF` | Card/container fill — creates elevation above the canvas |
| `--content` | `rgb(31, 41, 55)` | Primary body text — dark slate, not pure black |
| `--border` | `rgb(238, 238, 238)` | Structural borders |
| `--whisper-border` | `rgba(0, 0, 0, 0.06)` | Ultra-quiet card borders (Stripe-style) |
| `--tertiary` | `rgb(214, 214, 214)` | Disabled states, tertiary UI |

### Accent Usage Rules

The BC Maroon (`#8a100b`) is **strictly a hierarchy and interaction color**. Permitted uses:
- Section header underlines (`.section-header` border-bottom)
- Active navigation links
- Primary CTA buttons
- In-text accent links

**Banned uses of maroon:** card backgrounds, decorative borders, large area fills.

### Dark Mode

The existing dark mode tokens from d-kim-36.github.io must be preserved:
- `--theme`: `rgb(29, 30, 32)`
- `--entry`: `rgb(46, 46, 51)`
- Section headers shift to `#e07070` in dark mode.

---

## 3. Typography

### Font Stack

| Role | Font | Fallback |
|------|------|----------|
| **Headings (h1–h4)** | `Merriweather` or `Instrument Serif` | `Georgia` only as last resort |
| **Body** | `Inter` or `Geist` | `system-ui, sans-serif` |
| **Mono (code, metadata)** | `Geist Mono` or `JetBrains Mono` | `monospace` |

**Rationale:** Serif headings signal academic rigor (Notion-style document authority). Sans-serif body ensures readability at length. The combination avoids both the clinical feel of all-sans and the dated feel of all-serif.

**Banned:** Generic system serifs (`Times New Roman`, `Garamond`, `Palatino`) for headings. `Georgia` is only acceptable as an absolute fallback.

### Scale

| Element | Size |
|---------|------|
| Display/H1 | `clamp(1.75rem, 4vw, 2.5rem)` |
| H2 | `clamp(1.25rem, 3vw, 1.75rem)` |
| Body | `1rem` (min `14px`) |
| Metadata/labels | `0.875rem` |
| Code | `0.8125rem` |

### Type Behavior

- Body line-height: `1.65` (for long research abstracts).
- Max content width: `65ch` on prose-heavy pages.
- Heading letter-spacing: `-0.02em` (slightly tighter than default).

---

## 4. Component System

These component classes are carried over from d-kim-36.github.io and must be implemented identically in the Minimal Mistakes SCSS overrides.

### Content Card

```scss
.content-card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
```

### Content Grid

```scss
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 20px;
}
```

No 3-equal-column static grids (`repeat(3, 1fr)`). Use `auto-fit` with `minmax` so the grid is inherently responsive.

### Section Header

```scss
.section-header {
  color: #8a100b;
  border-bottom: 2px solid #8a100b;
  padding-bottom: 8px;
  font-weight: 700;
  margin-top: 40px;
}
```

### Card Media (16:9 enforced)

```scss
.card-media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
}
.card-media img, .card-media iframe {
  width: 100%; height: 100%;
  object-fit: cover;
}
```

All media thumbnails must use this wrapper. Never let raw `<img>` or `<iframe>` sit unsized in a card.

### Spacing Tokens

| Token | Value |
|-------|-------|
| `--gap` | `24px` |
| `--content-gap` | `20px` |
| `--radius` | `8px` (default UI), `12px` (cards) |
| Section vertical rhythm | `40px` top margin per section |

---

## 5. Layout Principles

### The Two-Tier Strategy

**Tier 1 — Theme-Controlled Pages:** Standard content pages (`bio.md`, `publications.md`, `teaching.md`). Let Minimal Mistakes render these natively via its default single-page layout. Do not inject custom HTML or CSS here.

**Tier 2 — Custom UI Pages:** Specialized hub pages (`media`, `gallery`, `dk-english`). These use custom `_layouts/` files with `.content-grid`/`.content-card` components deployed inside a standard Minimal Mistakes page shell.

### Sidebar

The persistent left-hand Minimal Mistakes author sidebar is the global navigation anchor. Style it with the "Linear" aesthetic:
- No heavy bounding boxes.
- Faint gray dividers between link groups.
- Social links as pill buttons, not naked icons.

### Homepage Split

The landing page uses an asymmetric 60/40 split:
- Left (60%): Name, title, and a scannable bullet-point research manifesto.
- Right (40%): Portrait, subtly rounded corners.

Centered layouts are not permitted for the hero section.

### Grid Rules

- Use `display: grid` for all multi-column layouts.
- Never use `calc(33% - 1rem)` flexbox math.
- All content within `max-width: 1400px`, centered.

---

## 6. Motion & Interaction

- **Hover on cards:** `transform: translateY(-4px)` + deepened shadow. `transition: 0.2s ease`.
- **Hover on links:** Color shift to deeper maroon. `transition: color 0.15s`.
- **Animate only** `transform` and `opacity`. Never animate `top`, `left`, `width`, or `height`.
- No entrance animations on Tier 1 content pages.
- No custom cursors.

---

## 7. Migration Strategy (d-kim-36.github.io → Minimal Mistakes)

### CSS Variable Mapping

| d-kim-36 CSS var | Minimal Mistakes Sass override | Location |
|------------------|-------------------------------|----------|
| `--primary: rgb(105, 8, 7)` | `$link-color: #8a100b` | `_sass/minimal-mistakes/_variables.scss` |
| `--secondary: rgb(155, 118, 60)` | `$muted-text-color: #9b763c` | `_sass/minimal-mistakes/_variables.scss` |
| `--theme: #FFFFFF` | `$background-color: #FAFAFA` | `_sass/minimal-mistakes/_variables.scss` |
| `--content: rgb(31, 41, 55)` | `$text-color: #1F2937` | `_sass/minimal-mistakes/_variables.scss` |
| `--border: rgb(238, 238, 238)` | `$border-color: #EEEEEE` | `_sass/minimal-mistakes/_variables.scss` |

Custom component CSS (`.content-card`, `.content-grid`, `.section-header`, `.card-media`) is copied as-is into `assets/css/main.scss`.

### What Changes in Minimal Mistakes

- Navigation moves from PaperMod's header to `_data/navigation.yml`.
- Author profile is driven by `_config.yml` author block (replaces PaperMod's `params.author`).
- Hugo shortcodes become `_includes/` files.
- Hugo archetypes become Jekyll defaults in `_config.yml`.
- Dark mode is handled by Minimal Mistakes' `dark` skin rather than CSS class toggling.

### What Must Not Change

- The BC Maroon `#8a100b` / `rgb(105, 8, 7)` color identity.
- The warm gold secondary `#9b763c`.
- The `.content-card` hover lift behavior.
- The `.section-header` maroon underline pattern.
- The 16:9 media card enforcement.

---

## 8. Anti-Patterns

- **No** pure black (`#000000`) — use `rgb(31, 41, 55)` or `#1F2937`.
- **No** heavy colored borders or saturated card backgrounds.
- **No** maroon used as a decorative background fill.
- **No** raw HTML grids inside Markdown files — use `_includes/` and Liquid loops.
- **No** `Inter` as the heading font in premium/display contexts — use `Merriweather` or `Instrument Serif`.
- **No** generic system serif stacks (`Times New Roman`, `Georgia`) as primary heading fonts.
- **No** 3-equal-column static grids (`repeat(3, 1fr)`) — use `auto-fit minmax` instead.
- **No** centered hero layouts.
- **No** animating `top`, `left`, `width`, or `height` — only `transform`/`opacity`.
- **No** custom cursors.
- **No** emoji in UI, code comments, or alt text.
- **No** `height: 100vh` — use `min-height: 100dvh`.
- **No** invented publications, citations, dates, or links — use only provided content.
