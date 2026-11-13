# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary visitor is a recruiter, hiring manager, or engineer evaluating Mitul Bhatia's work in a short, interruption-prone visit. Peers and collaborators are secondary visitors.

## Product Purpose

This portfolio proves Mitul's engineering work through project-specific systems, metrics, and routes, and lets a visitor ask grounded questions through the existing notebook concierge. Success means the visitor can identify what Mitul builds, inspect a relevant project, and reach him or download his resume without learning the interface.

## Positioning

The portfolio connects auditable project material to a working portfolio concierge whose visual identity changes with its mood while the evidence remains stable.

## Operating Context

Visitors arrive from LinkedIn, GitHub, or a shared link on desktop and mobile. They scan the homepage, open modular Work/About/Skills/Contact routes, inspect case-study evidence, and may ask the bot to navigate or retrieve a known fact.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4. Motion is CSS and SVG with small client components; no animation library.
- Existing routes, content modules, grounded notebook API, and allowlisted navigation remain functional.
- The concierge is already implemented and must be improved in place rather than replaced with a disconnected demo.
- API secrets remain server-only and raw visitor questions are not persisted.
- Project, education, rating, resume, and contact facts come from the repository's structured content.
- The bot may have distinct voices, but factual values and destinations cannot change with mood.

## Brand Commitments

- Signal Lines: the portfolio is drawn as a live route map. Each project is a coloured line, each pipeline stage a station, and runs travel the lines.
- Cool paper white, ink black, and four line colours (red, blue, green, yellow) used as thick rounded strokes and full-bleed fields. Archivo for display and text, Martian Mono for measurements.
- Pip, the concierge, is a visible character with moods and reactions. It responds to sections and pipeline runs, and never gates content.
- Motion is part of the identity: line draws, travelling packets, stations that snap on arrival, scroll reveals. Everything respects reduced motion.
- No dark-neon terminal styling, gradient text, glassmorphism, or decorative monospace. Light is the default ground; dark and yellow appear as full sections.
- The surrounding portfolio stays readable, credible, and first-person. Pip speaks about Mitul in the third person.

## Evidence on Hand

- Profile truth is centralized in `src/content/profile.ts`.
- Projects and metrics are centralized in `src/content/projects.ts`.
- Skills and pillars are centralized in their corresponding content modules.
- The grounded bot corpus exists at `src/content/bot/knowledge.md` and is served through the notebook route handler.
- The resume is available at `public/assets/Mitul_Bhatia_Resume.pdf`.

## Product Principles

- Evidence remains available without opening the bot.
- Mood changes presentation, never truth.
- One authored focal interaction carries each surface.
- Every added visual system replaces an older competing effect.
- Shared structured content prevents the bot and visible portfolio from drifting.

## Accessibility & Inclusion

Target WCAG 2.2 AA. All routes, mood controls, bot actions, and disclosures must support keyboard input, visible focus, reduced motion, readable contrast, and 200% zoom.
