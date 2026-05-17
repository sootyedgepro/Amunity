# AmunitY — Brand Style Guide

## 1. Brand essence

| | |
|---|---|
| **Name** | AmunitY |
| **Tagline** | Defend From Within. Glow From Without. |
| **Mission** | Premium, science-backed wellness — skin from the outside in, immunity from the inside out. |
| **Niche** | Health & wellness — skincare + gummies/supplements |
| **Positioning** | The honest, clinical, clean wellness brand for the consumer who reads ingredient labels. |

## 2. Voice & tone

- **Confident, warm, science-forward.** We respect the reader.
- **Short, punchy, benefit-driven.** No fluff, no marketing-speak.
- **Specific.** Name the dose. Name the active. Name the study.
- **No hype.** "Clinically shown" beats "miraculous."

**Sample do/don't:**

| ✅ Do | ❌ Don't |
|---|---|
| "15% L-ascorbic acid + ferulic acid for visibly brighter skin in 14 days." | "Our magical glow-getter unlocks luminous radiance!" |
| "Two gummies, 2.5g hydrolyzed marine collagen." | "The ultimate beauty boost in a delicious gummy." |

## 3. Color palette

| Role | Token | Hex |
|---|---|---|
| Primary deep — Forest | `forest` | `#1B3A2F` |
| Primary mid — Sage | `sage` | `#7A9E7E` |
| Sage soft (washes) | `sage-soft` | `#C8D6CB` |
| Accent — Warm Gold | `gold` | `#D4AF6A` |
| Gold deep | `gold-deep` | `#B8924D` |
| Lavender (skincare hero) | `lavender` | `#C7B8E0` |
| Lavender soft | `lavender-soft` | `#E8DEF5` |
| Background — Cream | `cream` | `#FAF7F2` |
| Text — Charcoal | `ink` | `#1A1A1A` |
| Body text — Muted | `muted` | `#6B6B6B` |

**Usage:**
- Forest = primary CTAs, footer, conviction moments
- Gold = welcome offers, subscribe & save badges, hover accents
- Sage / Lavender = soft section backgrounds, never large CTA blocks

## 4. Typography

- **Headings — Playfair Display** (serif, weights 400/500/600/700)
  - Display: 5xl–7xl, tracking-tight
  - H2: 4xl–5xl
  - H3: 2xl–3xl
- **Body — Inter** (sans, regular)
  - Body: text-base / text-sm
  - Eyebrow / chip / label: text-xs uppercase tracking-widest

CSS variables: `--font-serif`, `--font-sans` (set via `next/font`).

## 5. Spacing & layout

- Container max-width: **1240px** (`max-w-container`)
- Container padding: 20px → 32px → 48px (`px-5 sm:px-8 lg:px-12`)
- Section vertical padding: **py-20 → py-24** (generous whitespace)
- Grid gap default: 24–32px
- Border radius scale: **12px** (chips), **14px** (buttons), **20–28px** (cards/imagery)

## 6. Components

| Component | Token classes |
|---|---|
| `.btn-primary` | Forest fill, cream text, full-radius |
| `.btn-gold` | Gold fill, ink text — for welcome / subscribe upsell |
| `.btn-ghost` | Transparent → ink hover invert |
| `.chip` | Eyebrow label above headlines |
| `.card` | White on cream, soft shadow, lift on hover |
| `.input` | Rounded-full, forest focus ring |

## 7. Imagery rules

- Natural light, warm tones, hands + skin texture > clinical models
- Composition: rule of thirds, generous negative space
- Color match: lean toward sage, lavender, cream backdrops
- Product shots: shadow on cream, never floating without ground
- AVOID: blue-tinted "lab" photography, stock medical imagery, overly polished CGI

## 8. Motion

- Subtle, never theatrical
- Scroll-reveal: 12–16px translateY, 700ms ease-out, threshold 0.15
- Hover states: 200–300ms transitions
- Image hover: 1.05 scale over 500ms
- No bouncy, springy, or attention-grabbing motion

## 9. Accessibility

- All interactive elements: visible focus ring (`focus-visible:ring-2 ring-gold`)
- Color contrast: forest/cream is AA+, gold/ink is AA, never use gold on cream for text
- Skip-to-content link in layout
- All images have meaningful `alt` (or `alt=""` for decorative)
- Form fields have associated labels or `aria-label`

## 10. Legal labels

Required disclaimers on supplement product pages and footer:

> "These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease."
