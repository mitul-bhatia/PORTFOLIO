# 12 — Phase 04: Motion

Continues: `11-PHASE-03-CASE-STUDIES.md`  
Next: `13-PHASE-05-AI-BOT.md`  
References: `07-TOOLING-AND-REFERENCES.md`

---

## Goal

Add the three PRD moves plus sitewide sheet motion — without a second personality.

## Work (in this order)

1. Add `motion` dependency; centralize in `src/lib/motion.ts`
2. PageSheet enter/exit: short, same everywhere
3. ScrollProgress hairline
4. Home: kinetic name split + **one** Text Effect on tagline
5. MetricStrip → Sliding Number on in-view, once
6. Magnetic on resume, work plates, contact CTA
7. CustomCursor desktop
8. Add `animejs`; PipelineSchematic stroke-draw on IO
9. `prefers-reduced-motion` matrix (below)
10. Optional Lenis **only if** Home still feels harsh; not required

## Reduced motion

| Feature | Fallback |
|---|---|
| Kinetic type | Final stacked title visible |
| Sliding numbers | Final values |
| Anime.js | Full schematic visible |
| Magnetic | None |
| Cursor | Native |
| Page transition | Instant |
| Bot pulse | None |

## Out of scope

Bot streaming animations beyond a simple panel open (Phase 05). WebGL. Spotlight/glow.

## Exit criteria

- One signature motion per surface (file 04 table)
- Bundle: Anime.js not duplicated
- Reduced-motion pass on Home + one case study
- No scroll jank from mixing libraries

## Continuation note for Phase 05

Bot panel may use the same `motion` spring as PageSheet. Do not add Anime.js to the bot.

Next: `13-PHASE-05-AI-BOT.md`.
