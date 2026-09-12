# 09 — Phase 01: Foundation

Continues: `08-MODULAR-SYSTEM.md`  
Next: `10-PHASE-02-SURFACES.md`  
**Do not start Phase 02 until this phase’s exit criteria pass.**

---

## Goal

A running Next.js app that looks like the notebook **before** any clever motion or bot. Cream, type, tokens, routes as empty sheets with titles, content typed from file 02.

## Work

1. Scaffold Next.js App Router + TS + Tailwind
2. Tokens in `globals.css` / Tailwind theme (exact hex from 04)
3. Fraunces / Inter / IBM Plex Mono via `next/font`
4. `PaperRoot` + Haikei SVG generated and dropped in
5. `Masthead` + `FooterFolio` + empty `PageSheet` for every route in 05
6. Port `content/` from `02-SOURCE-OF-TRUTH.md` (CGPA 9.80)
7. Resume + portrait + project stills into `/public/assets` (placeholders if missing)
8. `README` for local env: **no keys required yet**

## Out of scope

Motion primitives, Anime.js, bot API, magnetic cursor, Lenis.

## Exit criteria

- Every route 200s with masthead/footer
- No 9.5 anywhere in `content/`
- Visual: 0px, parchment, Fraunces display on Home title even if static
- `npm run build` clean

## Continuation note for Phase 02

Phase 02 fills the empty sheets. It must not retokenize. If a module needs a new color, stop and ask.

Next: `10-PHASE-02-SURFACES.md`.
