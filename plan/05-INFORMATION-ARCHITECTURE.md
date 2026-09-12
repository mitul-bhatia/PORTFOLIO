# 05 — Information architecture

Continues: `04-DESIGN-DIRECTION.md`  
Next: `06-AI-CONCIERGE.md`

---

## Route map

| Route | Purpose | Primary modules |
|---|---|---|
| `/` | Act I orientation | HeroStamp, PillarRow, FeaturedCase (AEGIS), SelectedMetrics |
| `/work` | Index of all proof | FlagshipGrid (3), SecondaryList (4) |
| `/work/aegis` | Deep proof | CaseHero, MetricStrip, PipelineSchematic, ProblemStack, Links |
| `/work/flately` | Deep proof | same shell |
| `/work/agrovers` | Deep proof | same shell |
| `/work/creditsense` | Shorter case | CaseHero compact, no fake metrics |
| `/work/loan-classifier` | Shorter case | same |
| `/work/f1-strategy` | Shorter case | same |
| `/work/vulnswarm` | Shorter case | same |
| `/about` | Person + method | Portrait, Bio (corrected CGPA), Method4, Academics, Honors |
| `/skills` | 48-node tree | ClusterFilter, SkillTimeline or SkillGrid |
| `/contact` | Act III close | Direct mail, resume, socials, availability line |

Optional later, not v1: `/lab` for experiments. Do not stub an empty lab.

### Redirects / aliases

- `/projects` → `/work`
- Old hash URLs if any (`/#aegis`) → `/work/aegis`

---

## Shared chrome (every page)

1. `Masthead`
2. `PaperRoot` (Haikei + cream)
3. `ScrollProgress` (thin sienna hairline)
4. `BotDock` (bubble + panel)
5. `FooterFolio`
6. `CustomCursor` (desktop)

---

## Home composition (two screens, not 400vh)

**Screen 1**

- Folio `01 / MITUL`
- Kinetic `MITUL` / `BHATIA`
- Stamp tagline
- One-line positioning from story file
- Primary actions: View work · Ask the notebook (opens bot)

**Screen 2**

- Three PillarCards
- Featured AEGIS plate (metrics at rest, count on view)
- Link: All work → `/work`

No skills dump on Home. No full bio.

---

## Case study template (flagship)

Order is the story:

1. Title + category tag + live/GitHub
2. Problem statement (verbatim)
3. MetricStrip (3 numbers, sliding)
4. PipelineSchematic (5 nodes, Anime.js once per visit)
5. Stack as mono stamps
6. Reflection (verbatim)
7. Next/prev case (modular pager)

Secondary cases skip schematic if nodes were never defined; do not invent nodes.

---

## Navigation labels

Mono, small caps or tracking:

`WORK` · `ABOUT` · `SKILLS` · `CONTACT` · `RESUME`

Bot suggested chips (not extra nav): `AEGIS metrics` · `How to reach Mitul` · `What is AI Studio?`

---

## Content files the app should read

Builder, when coding later, should isolate:

- `content/profile.ts` — identity
- `content/pillars.ts`
- `content/projects/*.ts` — one file per project
- `content/skills.ts`
- `content/bot/knowledge.md` — generated from 02, used as RAG/system corpus

UI and bot **must not** diverge.

Next: the bubbly bot as a first-class product surface — `06-AI-CONCIERGE.md`.
