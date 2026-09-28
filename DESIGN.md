---
name: Mitul Bhatia Portfolio
description: A warm editorial engineering folio with mood-reactive path fields.
colors:
  paper: "#F3E9DA"
  paper-raised: "#EADFC8"
  ink: "#2B1D14"
  ink-muted: "#6B5744"
  amber: "#A8672E"
  accent-ink: "#945B29"
  rule: "#CDBC9D"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(4.4rem, 10vw, 7.5rem)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "0.75rem, 0.8125rem, 1rem, 1.1rem, 1.25rem, 1.625rem, 2rem, 2.8rem, 3rem, 4rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.5rem, 0.5625rem, 0.625rem, 0.6875rem, 0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  action-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  action-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  paper-panel:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Mitul Bhatia Portfolio

## Overview

**Creative North Star: "The Living Systems Folio"**

The portfolio reads like an engineering folio prepared for another engineer to inspect: tactile paper, decisive ink, real labels, and enough whitespace for evidence to lead. Its memorable layer is a family of mood-reactive path fields—derived from technical signal routes and folded paper diagrams—that connect the existing concierge to the whole interface.

The assistant may change tone and the folio may shift paper, ink, and accent with mood. Facts on the page never change with mood—only how the room feels and how the concierge speaks.

**Delight thesis:** The portfolio notebook feels like a useful editorial margin note. It stays visually quiet, answers only from the portfolio, and lets the real portrait and project evidence remain the focal points.

**Key Characteristics:**

- Editorial scale with technical precision.
- Sharp rectangles and thin ink rules.
- Paper grain as the primary atmospheric effect.
- Eight mood themes on one square, editorial system (ambient through fan).
- A compact right rail on desktop and bottom dock on mobile.

## Colors

Each induced mood sets registered color tokens in `globals.css`. Paper, ink, muted, accent, accent-ink, and rules interpolate together over 320ms. `--accent` is for fills and rules (at least 3:1 on that mood's paper). `--accent-ink` is for accent text (at least 4.5:1). Components consume those variables, so the page recolors as one surface.

| Mood | Paper | Ink | Accent | Path character |
|------|-------|-----|--------|----------------|
| Ambient | `#F3E9DA` | `#2B1D14` | `#A8672E` | Sparse drift |
| Focused | `#E6E0D4` | `#16120E` | `#7A3E1C` | Tighter grid |
| Charting | `#E3DDD0` | `#2C332C` | `#6B5344` | Diagonal rules |
| Arriving | `#F6E4D0` | `#2B1D14` | `#C56A28` | Converge to dock |
| Guarded | `#E8E2D6` | `#1C140F` | `#5C4033` | Minimal paths, strong rules |
| Jealous | `#E6E3D2` | `#2A2416` | `#6A7344` | Asymmetric lines |
| Bragger | `#F4E0C8` | `#2B1D14` | `#B4531A` | Brighter sheet; name scale via `--mood-display` |
| Fan | `#F6E4DA` | `#3A241C` | `#C06F4F` | Soft waves |

**The fact lock.** Mood changes paper and voice, never résumé numbers, project metrics, employers, or links. CGPA, AEGIS latency, and experience lines always come from `profile.ts` and `projects.ts`.

## Typography

Fraunces provides human editorial authority, Inter carries sustained reading, and IBM Plex Mono is reserved for state, measurements, route labels, and code-adjacent information.

**The Mono Has a Job Rule.** Monospace is not decorative technology shorthand.

## Layout

Routes use a centered reading frame with generous margins. The homepage first viewport pairs the large name and positioning statement with a real portrait and concise resume signals. Background paths remain quiet behind the right half. Mobile collapses to one column and keeps the assistant behind a compact safe-area launcher.

## Elevation & Depth

Depth comes from paper tone, thin rules, and one restrained warm shadow for lifted media or dialogs. No glow, blur halo, glass surface, or stacks of card shadows.

## Shapes

Corners stay square. The recurring shape family is rectangles, brackets, nodes, and thin paths. The bot launcher becomes a compact rectangular instrument tab rather than a generic floating chat bubble.

## Components

Buttons use ink/paper inversion and thin borders. Panels use paper or raised paper; most structure comes from shared rules instead of isolated cards. Inputs remain square with an amber focus outline. The existing concierge opens from the page edge, uses Direct, Warm, and Bold tones, and never changes facts or routes.

## Do's and Don'ts

### Do:

- **Do** keep project evidence readable without the bot.
- **Do** use path density and direction to communicate mood.
- **Do** keep animations finite or visibility-bound.
- **Do** reuse the existing structured content and bot API.
- **Do** use the supplied portrait in a respectful editorial crop and keep resume claims synchronized with the source document.

### Don't:

- **Don't** add gradients, glow, glass, neon, or a second purple “AI” palette; mood hues stay within the eight theme sets above.
- **Don't** stack path animation on top of the current Three.js atmosphere.
- **Don't** retain a custom cursor, magnetic effect, or animated bot as competing global signatures.
- **Don't** invent terminal-style labels or performance claims.
