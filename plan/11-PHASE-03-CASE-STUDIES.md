# 11 — Phase 03: Case studies

Continues: `10-PHASE-02-SURFACES.md`  
Next: `12-PHASE-04-MOTION.md`

---

## Goal

Every project has a URL that encodes **problem → metrics → pipeline → stack → reflection → links**. Flagships use the 5-node schematic as SVG (drawn or static). Secondaries use a compact template with no invented nodes or metrics.

## Work

1. Implement `CaseHero`, `MetricStrip` (static), `PipelineSchematic` (static SVG), `StackStamps`, pager
2. AEGIS, Flately, Agrovers from file 02 node lists **verbatim**
3. Secondary routes with description + stack + GitHub/live
4. Work index plates link correctly
5. Next/prev among flagships; secondaries return to `/work`

## Schematic rules

- Nodes labelled `01`–`05` in IBM Plex Mono
- Edges are straight or 0-radius orthogonal; no candy bezier playground
- This phase: visible immediately (draw-in is Phase 04)

## Exit criteria

- Seven work URLs
- Metrics match file 02 character-for-character where specified
- Live and GitHub buttons work
- No secondary project shows a 5-node diagram unless we later add real nodes

## Continuation note for Phase 04

Phase 04 only **animates** existing DOM/SVG. It must not restyle tokens or rewrite copy.

Next: `12-PHASE-04-MOTION.md`.
