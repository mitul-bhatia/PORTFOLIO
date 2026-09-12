# 14 — Phase 06: Harden and ship

Continues: `13-PHASE-05-AI-BOT.md`  
Next: `15-BUILDER-HANDOFF.md`

---

## Goal

Production on `mitulbhatia.dev`: SEO, a11y, performance, factual freeze.

## Work

1. Metadata per route (title template `Mitul Bhatia — {page}`)
2. OG image; meta description from file 02
3. Sitemap + robots
4. Keyboard: nav, filters, bot trap, Escape
5. Focus styles in sienna/ink, 0px
6. `npm run build` && `npm run lint`
7. Image: portrait and project stills sized, no layout shift
8. Confirm phone not in bot greeting
9. Confirm no API keys in repo
10. Optional: Manus (or human) competitor pass — **notes only**, no last-minute palette swap

## Performance budgets (targets)

- Haikei SVG small; if huge, simplify in Haikei and re-export
- Anime.js scoped import
- Fonts: subset if needed; `font-display: swap` with close fallbacks

## Launch checklist

- [ ] CGPA 9.80 sitewide (grep `9.5` must be empty)
- [ ] All GitHub/live URLs from file 02
- [ ] Resume PDF opens
- [ ] Bot eval set
- [ ] Reduced motion
- [ ] Mobile Home, Work, one case, bot open
- [ ] Favicon / apple touch consistent with ink mark

## After launch (not this corpus)

Content updates happen in `content/`, then rebuild knowledge.md. Visual world stays 04.

Next: the single builder prompt — `15-BUILDER-HANDOFF.md`.
