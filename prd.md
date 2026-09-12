# Portfolio V2 — Master PRD & Build Prompt

Generated Sept 2026, for the redesign of `mitulbhatia.dev`.
Section 8 is self-contained — copy just that block into Claude Code / Cursor / any agentic coding tool to kick off the actual build.

---

## 1. The actual brief

The AdaGrad quiz screenshot in your upload batch looks unrelated to this — ignoring it. The real trigger for this doc is: *"every personal portfolio looks the same now."* That's true, and specifically it's true of the exact aesthetic your v1 already nailed — warm parchment, Fraunces serif, burnt-sienna accent, 0px corners, engineering-notebook framing. That look was differentiated eighteen months ago; a decent slice of AI/ML student portfolios now use some version of it.

**The fix isn't a new palette. It's new interaction texture that a templated portfolio can't fake** — because it requires actually understanding your own project internals (schematic diagrams that draw themselves, metrics that count up from real numbers, not stock icons). That's what Sections 3–8 are built around.

## 2. Data contradictions to resolve before an agent touches the repo

Found across your own uploaded docs — pick an answer for each before pasting Section 8 into a coding agent, or it'll guess:

| Conflict | Source A | Source B |
|---|---|---|
| CGPA | Resume: **9.80/10.0** | About-section bio copy: **9.5/10.0** |
| React version | `CLAUDE.md`: React **18** | `MASTER_PORTFOLIO_BLUEPRINT.md`: React **19** |
| Hero implementation | `ARCHITECTURE_CONTEXT.md`: 2D DOM `.parallax-bg/-mid/-fg` layers, calls React Three Fiber "vestigial/unused," no `Scene.tsx` in its component map | `CLAUDE.md` + `PROGRESS.md` Phase 5 ("Massive Pivot: Fully 3D WebGL Story via React Three Fiber"): a live `canvas/Scene.tsx` with a `MovingCamera` |

That last one matters most — these two docs describe two different codebases. My read is `ARCHITECTURE_CONTEXT.md` is a pre-Phase-5 snapshot and the WebGL scene is what's actually live now, but confirm against `package.json`/`src/components/canvas/` before an agent starts "fixing" a scene that either doesn't exist or was deliberately replaced.

## 3. Tool research — what each thing actually is, and its job in this rebuild

| Tool | What it actually is (verified) | Assigned role here |
|---|---|---|
| **Motion Primitives** (`motion-primitives.com`, by Julien Thibeaut / `ibelick`) | Open-source, MIT, 34 copy-paste components — Text Effect, Border Trail, Spotlight, Magnetic, Sliding Number, Scroll Progress, Morphing Dialog, Cursor, Dock, Glow Effect, etc. — built on Motion + Tailwind. Mirrored on 21st.dev. | **Primary interaction-pattern source.** Copy the *logic*, not the look — its default is rounded/soft, yours is 0px/hard. Best fits: `Sliding Number` for your metrics (`<24ms`, `99.8%`, `94.2%`...), `Magnetic` to extend your existing `CustomCursor.tsx`, `Text Effect`/`Spinning Text` for hero kinetic type, `Scroll Progress` to replace the current bar. |
| **Motion.dev** (Framer Motion, now independent + framework-agnostic) | The same library your stack already runs as `framer-motion`. 2026 releases added `oklch`/`color-mix` support and hardware-accelerated `useScroll`. | **Version bump, not a new dependency.** Rename `framer-motion` → `motion` in package.json; `src/lib/motion.ts` keeps working as-is. |
| **Anime.js v4** | Full rewrite (2025), MIT, ~36KB gzipped. Native SVG path morphing / line-drawing, spring physics, its own timeline + stagger API. No ScrollTrigger equivalent. | **One specific job: your `ArchitectureSchematic.tsx` pipeline diagrams.** Anime.js draws SVG lines natively — no GSAP DrawSVG plugin needed — so the AEGIS/Flately/Agrovers node-and-arrow diagrams can "draw themselves in" on scroll-into-view. Do **not** use it for page-level scroll sync — your own `CLAUDE.md` already bans mixing scroll libraries with GSAP+Lenis, and that rule is correct. |
| **Watermelon UI** | Free/open-source React+Tailwind+Radix registry: 600+ components, 100+ animation snippets, full page/dashboard templates, copy-paste. | **Scaffolding accelerant only.** Default look is soft/colorful/rounded — the opposite of your system. Pull structural boilerplate (e.g. a contact-form layout skeleton, a dashboard-style grid for the skills tree), strip all default styling, re-skin with your tokens. |
| **21st.dev** | Community registry ("npm for design engineers"), 12,000+ shadcn/Tailwind/Radix components. Every component ships as an AI-ready prompt — paste it into Claude Code/Cursor/v0 and the agent adapts it to your repo's own theme. Also hosts the official Motion Primitives mirror. | **Fastest low-risk pull for one specific interaction** — search "magnetic button," "scroll progress," "text scramble," copy its install prompt straight into your coding agent. Lower risk than Watermelon UI because the agent reads your Tailwind config and adapts colors itself instead of you doing it by hand. |
| **Haikei** | Free, no-signup generative SVG tool. Generators: blob, wave, blurry-gradient, layered/stacked waves, blob-scatter, low-poly grid ("crumpled paper effect"), scattered circles. | **Use exactly one generator: Low Poly Grid.** It's the only one that's actually on-brand for an editorial/engineering-paper theme. Export one monochrome ink-on-cream SVG to layer with (or replace) the existing `body::before` noise filter in `globals.css`. **Skip blob / wave / gradient generators outright** — they directly violate your own locked rule of *"NO gradients... NO glassmorphism"* in the design system. |
| **Manus** (Monica / Butterfly Effect) | Autonomous general-purpose agent — takes a goal, plans, browses, writes/runs code, and hands back a finished deliverable without step-by-step prompting. Benchmarked around 76% on GAIA in early 2026; explicitly *not* positioned as a specialist coding agent (reviews point to Cursor/Devin for that job instead). | **Not for editing this repo.** If you want to use it at all, keep it to a separate research pass — e.g. "audit 8 competitor AI/ML student portfolios and list what makes each memorable vs forgettable" — and keep the actual code build on Claude Code, which your own `CLAUDE.md` already assumes. |
| **Mobbin** | Paid/freemium library, 1,150+ apps, 530K+ real app screens, 280K+ flows, Figma plugin, prototype-walkthrough mode. I could not open your shared section link — Mobbin blocks unauthenticated/automated requests, so the specific screens you saved aren't visible to me. | **Reference, translated into words, not raw material.** Pull 3–5 concrete screens (a hero reveal, a project case-study detail view, an "about" bio layout) and describe the *structure* in plain language for the build prompt — screens can't be scraped or reproduced, but "modal slides up from bottom with a sticky metrics bar" is exactly the kind of spec line Section 6 below needs. Paste specifics back to me any time and I'll fold them in. |

## 4. Design system — one decision to make explicitly

Two real options — say which one before running Section 8, because they contradict each other:

- **A. Keep "Engineered Editorial" (Concept 1, currently live).** 0px radius everywhere, no shadow but `shadow-notebook`, no gradients. Lowest risk, matches your resume/LinkedIn branding already out in the world.
- **B. Soften toward "Warm Editorial" (Concept 3).** 4–8px radius, soft ambient shadows, overlapping cards. A real departure — it contradicts the *"0px corner radius... non-negotiable"* rule your own `CLAUDE.md` states. Only worth it if actual feedback on v1 was "too cold/sharp," not just "looks templated."

Given the brief is about the *template feeling*, not the palette, Section 8 below assumes **Option A** — new interaction texture on the existing hard-edged system. Swap the token block if you actually want B.

## 5. The three moves that make v2 not-templated

1. **Schematic diagrams that actually draw themselves** — Anime.js line-draw on `ArchitectureSchematic.tsx`, triggered on scroll-into-view. No other AI-student portfolio pipeline diagram does this; most are static PNGs.
2. **Metrics that count up, keyed to real scroll position** — Motion Primitives' `Sliding Number` pattern applied to your actual figures (`<24ms`, `99.8%`, `94.2%`, `+35%`) instead of appearing as static text.
3. **One Haikei-generated, on-brand texture layer** replacing the generic CSS noise filter — subtle enough that it reads as "considered paper stock," not "AI-generated background."

Everything else (fonts, palette, section order, copy) stays as your locked system — the goal is surgical, not a rebuild from zero.

## 6. Section-by-section spec

| Section | Keep | Change |
|---|---|---|
| Hero | 400vh scrollytelling, GSAP+Lenis sync, kinetic `.text-mitul`/`.text-bhatia` split | Swap `Text Effect`/`Spinning Text` pattern (Motion Primitives) into the tagline reveal for a second signature motion beyond the clip-path split |
| About | Bio copy, portrait, CGPA/LeetCode/Codeforces line | Resolve the CGPA conflict (§2) before shipping |
| Pillars | 3-card structure, proof points | No change needed — already differentiated by real proof points, not generic "full-stack developer" copy |
| Projects | `ProjectCard.tsx` schematic/preview tabs | Anime.js line-draw on `ArchitectureSchematic.tsx` nodes (see §5.1); `Sliding Number` on the 3 hard metrics per project (see §5.2) |
| Skills | Filterable vertical timeline, 48 nodes | Optional: pull a Watermelon UI dashboard-grid layout as structural reference if the timeline feels cramped on mobile — re-skin fully |
| Contact | Direct email, resume PDF, socials | Low priority — leave as-is unless you want a Motion Primitives `Magnetic` treatment on the CTA button |

## 7. Before you run this

- [ ] Pick CGPA figure (9.80 vs 9.5)
- [ ] Confirm React 18 vs 19 in `package.json`
- [ ] Confirm whether `canvas/Scene.tsx` (WebGL) is actually live in the current repo
- [ ] Pick Design System Option A or B (§4)
- [ ] (Optional) paste 3–5 real Mobbin screenshots/descriptions if you want §6 sharpened further

---

## 8. THE MASTER BUILD PROMPT — paste this whole block into Claude Code

```
You are working in an existing Next.js 14 (App Router) + TypeScript + Tailwind
portfolio repo for Mitul Bhatia. Read CLAUDE.md, PROGRESS.md, and the current
src/ tree fully before changing anything — this is a v2 refinement pass on a
site that already passed a full bug/design/tech-debt audit (see PROGRESS.md),
NOT a rebuild from scratch. Do not reintroduce anything PROGRESS.md marked
fixed (dead files, ad-hoc shadow values, terminal-log copy, etc).

=== IDENTITY / CONTENT (source of truth — do not invent or alter facts) ===
Name: Mitul Bhatia · AI/CS undergrad, B.Tech Artificial Intelligence, Newton
School of Technology, Rishihood University, Class of 2028 (Sem 5).
Location: Sonipat, Haryana, India. Email: mitul.bhatia2024@nst.rishihood.edu.in
GitHub: github.com/mitul-bhatia · LeetCode 1400+ · Codeforces 900+
CGPA: [RESOLVE — 9.80 per resume vs 9.5 per bio copy, use the one confirmed in §2]
AI Studio cohort member (2025–present) — dedicated GPU cluster access.

Three content pillars (keep proof points verbatim, they're what differentiates
this from generic "full-stack" copy):
1. Agentic Systems — LangGraph/CrewAI multi-agent orchestration, dynamic
   tool-calling, hierarchical planning, vector-DB memory.
2. Applied ML & Data — fine-tuning, hybrid RAG (Qdrant), evaluation via
   Ragas/TruLens.
3. Production Infra — async FastAPI/Redis, Docker/Kubernetes, GPU autoscaling.

Flagship projects (keep exact metrics — these are real, not placeholders):
- AEGIS — multi-agent AI security/guardrail engine. FastAPI, LangChain,
  Semgrep, React, Docker. Guardrail latency <24ms, injection recall 99.8%,
  zero-human intervention 100%. github.com/mitul-bhatia/Aegis
- FLATELY — real-time roommate-matching platform. React 19, Redux Toolkit,
  Express 5, MongoDB Atlas, Socket.IO. Socket sync <45ms, match precision
  94.2%, uptime 99.9%. github.com/mitul-bhatia/flately
- AGROVERS — AI soil/crop intelligence. FastAPI, LangChain, FAISS RAG.
  Rec reliability +35%, retrieval latency <85ms, soil analysis acc. 96.8%.
  github.com/mitul-bhatia/agrovers_wow
- Secondary: CreditSense (RBI lending compliance, LightRAG+Groq), GEN AI Loan
  Approval Classifier (XGBoost+LlamaIndex), F1 Race Strategy Intelligence
  (744K-row Ergast dataset, Tableau), VULNSWARM (LangGraph+ChromaDB CVE triage)

Each flagship project has a 5-node pipeline schematic already defined in
ProjectCard.tsx/ArchitectureSchematic.tsx (ingest → process → decision →
output) — reuse these node definitions, do not redesign the pipelines.

=== LOCKED DESIGN SYSTEM (Option A — "Engineered Editorial") ===
Background #F3E9DA · Ink/text #2B1D14 · Elevated surface #EADFC8 ·
Muted text #6B5744 · Accent (burnt sienna) #A8672E · Border #D9C9AC
Fraunces (display) / Inter (body) / IBM Plex Mono (labels, mono)
0px border-radius everywhere. Only shadow: shadow-notebook (2px 2px 0 #D9C9AC).
Hard rules: NO gradients, NO glassmorphism, NO glow/bloom/neon, NO rounded
pill shapes, one signature interaction per section maximum.
[If Option B was chosen instead: replace this block with Concept 3's tokens —
4–8px radius, soft ambient shadows, tonal layering — from concept3_DESIGN.md]

=== STACK CHANGES FOR V2 ===
1. Rename the `framer-motion` dependency to `motion` (Motion.dev rebrand) —
   same API, keep src/lib/motion.ts as-is, just update the import source and
   package.json.
2. Add `animejs` (v4) as a new, narrowly-scoped dependency — used ONLY inside
   ArchitectureSchematic.tsx for SVG line-draw-in animation of the pipeline
   nodes/arrows on scroll-into-view (use IntersectionObserver, not
   ScrollTrigger, to avoid mixing scroll-sync systems per the existing
   CLAUDE.md rule against mixing GSAP/Lenis with other scroll libraries).
3. Do NOT install Watermelon UI or the Motion Primitives npm package as
   dependencies. Instead, for each of the following, recreate the interaction
   pattern natively in this repo's own token system (0px radius, ink/amber
   palette, no soft shadows):
   - Sliding Number: animated count-up for every hard metric shown in
     ProjectCard.tsx (24ms, 99.8%, 94.2%, +35%, etc.) — triggers once on
     scroll-into-view, counts from 0 to the real value.
   - Magnetic: extend CustomCursor.tsx / ui buttons with a cursor-follow
     attraction effect within ~40px of hover targets.
   - Text Effect / Spinning Text: apply to the hero tagline as a second
     kinetic-type layer alongside the existing clip-path reveal.
   - Scroll Progress: keep the existing ScrollProgress.tsx behavior, just
     confirm the underlying spring/easing matches current Motion version.
4. Generate ONE Haikei "Low Poly Grid" SVG asset (ink-on-cream, monochrome,
   low contrast) and either replace or layer it with the existing body::before
   noise filter in globals.css. Do not add any blob/wave/gradient SVG assets.

=== WHAT NOT TO DO ===
- Do not touch anything on PROGRESS.md's checked-off list without a reason.
- Do not add dark mode, neon, purple/blue gradients, rounded pill buttons.
- Do not introduce a second scroll-hijacking library alongside Lenis+GSAP.
- Do not alter project metrics, links, or bio facts — flag contradictions
  instead of silently picking one (see the CGPA/React-version conflicts noted
  above; ask before assuming).

=== BUILD VERIFICATION ===
After implementing, run `npm run build` and `npm run lint`, confirm 0 errors,
confirm prefers-reduced-motion still disables the Preloader, kinetic type, and
Anime.js line-draw (fall back to instant-visible state), and confirm the
Anime.js addition does not increase total JS bundle by more than ~40KB gzipped
(it's a lightweight 36KB library — if it balloons past that, something's
duplicated).
```

---

*One more note on Mobbin: since the specific board you shared isn't something I can open, everything about "what to borrow" above is written from general knowledge of how Mobbin-indexed products handle hero reveals, case-study modals, and metrics displays — not from your actual saved screens. Send over 3–5 of the actual screenshots whenever you want, and I'll tighten Section 6 to match exactly what you saved.*