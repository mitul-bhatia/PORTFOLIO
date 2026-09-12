# 07 — Tooling and references

Continues: `06-AI-CONCIERGE.md`  
Next: `08-MODULAR-SYSTEM.md`  
Research origin: `/prd.md` §3, reassigned for the **modular multi-page** rebuild.

Copy **logic and structure**. Never copy default look.

---

## Motion Primitives (ibelick)

**Role:** Primary interaction-pattern source.

Use as recipes, re-skinned to 0px / ink / sienna:

| Pattern | Where |
|---|---|
| Sliding Number | MetricStrip on Home featured + every flagship case |
| Magnetic | Masthead resume, Contact CTA, Work plates, Bot chips |
| Text Effect / Spinning Text | Home tagline only (second kinetic layer) |
| Scroll Progress | Global chrome hairline |
| Morphing Dialog | Optional: Work plate → case preview; **do not** steal the bot panel’s job |
| Spotlight | Skip (reads as glow; banned) |
| Dock | Skip (macOS candy; off-brand) |
| Glow Effect | Banned |
| Border Trail | Only if it can be a 1px ink crawl, 0px corners; else skip |
| Cursor | Extend CustomCursor |

**Do not** `npm install` a primitives kit that injects rounded defaults. Port the pattern.

---

## Motion.dev

**Role:** The UI motion runtime.

- Dependency name: `motion` (Framer Motion rebrand)
- Page transitions: short sheet-slide or fade (one language sitewide)
- `useInView` / `useScroll` for metric trigger and progress
- Hardware-friendly; honor `useReducedMotion`

---

## Anime.js v4

**Role:** **Only** SVG pipeline draw-in on `PipelineSchematic`.

- IntersectionObserver to start (not ScrollTrigger)
- Stroke draw + node stamp stagger
- Instant complete on reduced motion
- Do not use for page scroll, Lenis, or bot
- Budget: ~36KB gzip; if the bundle explodes, something is duplicated

---

## Watermelon UI

**Role:** Scaffolding accelerant for **structure**.

Steal:

- Contact form layout skeleton (then likely replace form with mailto + fields optional)
- Dashboard-style **grid** for Skills clusters on wide screens
- Multi-page app shell patterns (sidebar is **wrong**; we use masthead)

Strip: radius, pastel, shadows, rounded inputs.

---

## 21st.dev

**Role:** Fastest way to pull **one** interaction at a time via AI-ready prompt, then restyle.

Good searches when building: magnetic button, scroll progress, text scramble, morphing popover, chat input.

Each pull: paste into the coding agent **with** “tokens from plan/04, 0px, no glow.”

Lower risk than dropping a full Watermelon template.

---

## Haikei

**Role:** One asset.

- Generator: **Low Poly Grid** only
- Colors: cream `#F3E9DA` + ink `#2B1D14` at very low opacity / lightness
- Export SVG → `/public/assets/textures/haikei-lowpoly.svg`
- Skip blob, wave, stacked waves, blurry gradient, scattered candy circles

---

## Manus

**Role:** Offline research agent. **Not a repo editor.**

Allowed jobs (separate session):

- Audit 8 AI/ML student portfolios: memorable vs forgettable
- Collect plain-language structure notes (not screenshots to clone)

Forbidden: opening this repo and “just implementing.”

---

## Explicitly not in the default stack

- React Three Fiber / WebGL hero
- GSAP ScrollTrigger **plus** a second hijack (if GSAP+Lenis return for a Home chapter, Anime.js still IO-only)
- Watermelon/21st as a theme package
- Client-side model keys

---

## Mapping PRD’s three non-template moves → this rebuild

1. Schematics that draw themselves → every **flagship case page** + optional Home featured
2. Metrics that count to real numbers → MetricStrip module, shared
3. Haikei paper stock → `PaperRoot` global

Plus the v2 fourth move:

4. Grounded navigational Notebook bot → file 06

Next: the module catalog — `08-MODULAR-SYSTEM.md`.
