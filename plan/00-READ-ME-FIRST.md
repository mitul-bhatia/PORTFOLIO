# Read this first

This folder is the **v2 planning corpus** for `mitulbhatia.dev`.
It is **markdown only**. No application code lives here yet.

`prd.md` at the repo root is **Version 1** of the brief (surgical refinement of an existing single-page site).
This folder is **Version 2 of the plan**: same person, same facts, same Engineered Editorial identity — expanded into a **modular multi-page portfolio** with a grounded AI concierge.

---

## How to use these files

Read in order. Each file **continues** the previous one. Do not skip.

| # | File | Continues from | Job |
|---|---|---|---|
| 00 | This file | — | Reading order, locked decisions, anti-goals |
| 01 | `01-STORY.md` | 00 | Narrative, visitor journey, what “not a template” means |
| 02 | `02-SOURCE-OF-TRUTH.md` | 01 | Every fact from `mydata.md`, contradictions resolved |
| 03 | `03-PRODUCT.md` | 02 | Durable product truth (users, purpose, success) |
| 04 | `04-DESIGN-DIRECTION.md` | 03 | Visual world: Option A+ (parchment/ink + modular shells) |
| 05 | `05-INFORMATION-ARCHITECTURE.md` | 04 | Routes, modules, what lives on which page |
| 06 | `06-AI-CONCIERGE.md` | 05 | Bubbly Q&A bot: knowledge, navigation, safety |
| 07 | `07-TOOLING-AND-REFERENCES.md` | 06 | Watermelon, Manus, Haikei, Motion, Anime.js, 21st.dev |
| 07B | `07B-MOOD-SYSTEM-AND-AGENT-BUILD-PROTOCOL.md` | 07 | Mood system, hand-rolled motion amends 07, Antigravity loop |
| 08 | `08-MODULAR-SYSTEM.md` | 07B | Component modules a builder may assemble, never restyle ad hoc |
| 09 | `09-PHASE-01-FOUNDATION.md` | 08 | Scaffold, tokens, content files, routing shell |
| 10 | `10-PHASE-02-SURFACES.md` | 09 | Home, About, Work index, Contact |
| 11 | `11-PHASE-03-CASE-STUDIES.md` | 10 | Flagship + secondary project pages |
| 12 | `12-PHASE-04-MOTION.md` | 11 | Hand-rolled motion, primitives patterns, SVG draw-in schematics |
| 13 | `13-PHASE-05-AI-BOT.md` | 12 | Ship the concierge against the knowledge pack |
| 14 | `14-PHASE-06-HARDEN-AND-SHIP.md` | 13 | A11y, SEO, performance, reduced motion, launch |
| 15 | `15-BUILDER-HANDOFF.md` | 14 | Single paste-block for a later coding agent |

Source inputs (do not treat as build prompts by themselves):

- `/prd.md` — v1 brief, tool research, locked palette, three non-template moves
- `/mydata.md` — identity, copy, projects, skills, assets

---

## Locked decisions (2026-09-11)

Confirmed with Mitul before writing this corpus:

1. **CGPA is 9.80 / 10.0** everywhere. Never show 9.5.
2. **Visual world is Option A+.** Keep parchment, ink, burnt sienna, 0px corners, no gradients / glass / neon. Allow **modular page shells** and **one richer motion layer per surface**.
3. **AI bot is public, grounded, and navigational.** It answers only from the site knowledge pack and can send visitors to the right route/section. It does not invent credentials or metrics.

Still delegated (builder must not invent; use the recommendations in later files):

- Stack: **Next.js App Router + TypeScript + Tailwind** (same family as v1 / PRD).
- Motion: **Hand-coded native CSS/SVG/rAF motion** (amended in `07B`; Motion.dev and Anime.js dropped in favor of zero runtime dependencies).
- Haikei: **one** Low Poly Grid texture, ink-on-cream.
- Manus: **research only**, never edits this repo.
- Watermelon UI / 21st.dev / Motion Primitives: **patterns and structure**, restyle to tokens. Do not install their default look.

---

## What this corpus is not

- Not a rebuild of the old repo’s bugs or dead files.
- Not permission to add dark mode, purple AI gradients, pill buttons, or a second scroll-hijack library.
- Not permission to store API keys in git or markdown.
- Not code. When a later agent builds, it starts at `15-BUILDER-HANDOFF.md` after reading 00–14.

---

## Continuation contract

If a later file conflicts with an earlier one:

1. Locked decisions in **00** win.
2. Facts in **02** win over copy style.
3. Design tokens in **04** win over a component registry’s defaults.
4. Phase files may add detail; they may not reopen locked decisions.

Next: `01-STORY.md`.
