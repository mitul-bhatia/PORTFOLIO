# 03 — Product

Continues: `02-SOURCE-OF-TRUTH.md`  
Next: `04-DESIGN-DIRECTION.md`

Durable product truth for this site. Visual world is in 04. Facts are in 02.

---

## Platform

web

## Stack (delegated recommendation, locked for planning)

Next.js (App Router) + TypeScript + Tailwind CSS + Motion (`motion`) + Anime.js v4 (schematics only).

Deploy: Vercel on `mitulbhatia.dev`.

AI concierge: Next.js Route Handler; model provider configured via **server env only**. Knowledge pack is local markdown/JSON derived from file 02.

## Users

**Primary:** Recruiter, hiring manager, or AI-studio engineer with 90 seconds and a noisy tab.

They arrive from LinkedIn, GitHub, or a forwarded URL. They are skeptical of student sites. They want to know if Mitul can ship agentic systems with measured behavior.

**Secondary:** Peer / hackathon teammate looking for stack overlap.

**Tertiary:** Mitul himself, updating content through markdown/JSON without restyling.

## Product purpose

A public portfolio that proves Mitul Bhatia’s work with **auditable pipelines and metrics**, and lets a visitor **ask grounded questions** without leaving the site.

Success:

- A recruiter can name AEGIS’s three metrics after one Home pass.
- A visitor can open one case study and understand the 5-node pipeline.
- The bot can answer “what’s his CGPA?” and “show me Flately” without hallucinating, and navigate to `/work/flately`.
- Lighthouse-quality: no layout jump from fonts, reduced-motion works, build is clean.

## Positioning

Neighboring student sites can copy parchment and Fraunces. They cannot copy:

1. Project-specific SVG schematics that draw the real AEGIS / Flately / Agrovers nodes
2. Count-up metrics tied to those same numbers
3. A bot whose only brain is this corpus (file 02 + case copy), with navigation into modular pages

That triad is the product.

## Capabilities

- Multi-route reading: Home, Work, case studies, About, Skills, Contact
- Persistent masthead, paper texture, custom cursor (optional desktop), bot dock
- Filterable skills clusters
- Resume download
- Grounded Q&A with section/route deep links
- Content authored as structured data so the bot and UI share one source

## Constraints

- No dark mode in v1 of this rebuild
- No invented jobs, internships, or metrics
- Phone number not in the bot’s default greeting
- API keys never in the client bundle or git
- One scroll-smoothing system if any (Lenis + GSAP allowed together as in v1); Anime.js must not become a second scroll hijack
- `prefers-reduced-motion`: instant visible states, no preloader trap, no line-draw requirement

## Voice and brand commitments

Engineered Editorial paper system (tokens in 04). Voice: first-person engineer, exact numbers. Bot: precise lab assistant in a bubbly **visual** shell.

## Evidence the product must carry

Everything in `02-SOURCE-OF-TRUTH.md`. Especially flagship metrics, pipeline nodes, CGPA 9.80, AI Studio, CP ratings, live + GitHub links.

## Accessibility

- Keyboard to all routes, case study tabs, bot panel
- Bot panel labelled, focus trapped when open, Escape closes
- Contrast on parchment/ink/sienna meets body text WCAG AA
- Motion optional

## Open decisions (non-blocking)

- Exact Next.js major (14 vs 15) — builder uses current stable App Router
- Whether Home includes a short (not 400vh) chaptered scroll — Phase 02 default: **two-screen Home**, not 400vh
- Bot model vendor — Phase 05; architecture is provider-agnostic

Next: how it should look and move — `04-DESIGN-DIRECTION.md`.
