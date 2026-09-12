# 15 — Builder handoff

Continues: `14-PHASE-06-HARDEN-AND-SHIP.md`  
This is the last file. When Mitul is ready to **code**, paste the block below into a coding agent. The agent must still read `plan/00` through `plan/14`.

---

## How phases map to PRs (suggested)

1. PR: foundation (Phase 01)
2. PR: surfaces (Phase 02)
3. PR: case studies (Phase 03)
4. PR: motion (Phase 04)
5. PR: notebook bot (Phase 05)
6. PR: harden (Phase 06)

Do not squash all six into one agent session if context gets sloppy. Stop at each phase’s exit criteria.

---

## MASTER BUILD PROMPT (v2 modular)

```
You are building mitulbhatia.dev from a PLAN, not from vibe.

READ FIRST, IN ORDER, and do not contradict:
- plan/00-READ-ME-FIRST.md (locked decisions)
- plan/01-STORY.md
- plan/02-SOURCE-OF-TRUTH.md  ← only source of facts
- plan/03-PRODUCT.md
- plan/04-DESIGN-DIRECTION.md ← only source of tokens
- plan/05-INFORMATION-ARCHITECTURE.md
- plan/06-AI-CONCIERGE.md
- plan/07-TOOLING-AND-REFERENCES.md
- plan/08-MODULAR-SYSTEM.md
Then implement ONLY the current phase file Mitul names
(09 through 14). Default if unspecified: Phase 01 only.

LOCKED:
- CGPA 9.80/10.0 everywhere. Never 9.5.
- Option A+: parchment/ink/sienna, 0px radius, shadow-notebook only.
  Modular page shells + one signature motion per surface.
- Bot: grounded + navigate allowlisted routes. No hallucinated jobs/metrics.
- No gradients, glass, glow, neon, pills, dark mode, WebGL hero.
- Haikei: one Low Poly Grid texture.
- Motion.dev for UI; Anime.js v4 ONLY for PipelineSchematic draw-in.
- Watermelon / 21st.dev / Motion Primitives: patterns, restyle to tokens.
- Manus: do not use to edit this repo.
- Never commit API keys. Server env only for the notebook route.

CONTENT: copy identity, pillars, methodology, projects, nodes, metrics,
skills clusters from plan/02. Put them in content/ modules shared by UI and bot.

STACK: Next.js App Router, TypeScript, Tailwind, motion, animejs (phase 04+).

If a fact is missing: say so. Do not invent internships, metrics, or pipeline nodes.

Verify: build + lint clean; grep for 9.5 is empty; reduced-motion fallbacks
in the phases that add motion.
```

---

## What Mitul still brings at build time

- Portrait, resume PDF, project stills, OG image
- Haikei export (or the agent generates a conservative SVG matching 04)
- Server model key in Vercel env when Phase 05 starts (rotate any key that was ever pasted in chat)

---

## Corpus complete

Story, facts, product, design, IA, bot, tools, modules, six phases, handoff.

To change direction: edit **00 locked decisions** first, then cascade. Do not silently patch a phase file against 00.
