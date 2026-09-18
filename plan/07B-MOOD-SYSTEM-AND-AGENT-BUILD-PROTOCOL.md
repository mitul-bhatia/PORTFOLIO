# 07B — Mood system & agent build protocol

Continues: `07-TOOLING-AND-REFERENCES.md`
Amends: `00-READ-ME-FIRST.md` (locked decisions §Motion), `07-TOOLING-AND-REFERENCES.md` (Motion.dev / Anime.js rows)
Does not renumber: `08-MODULAR-SYSTEM.md` onward — this is an insert, not a replacement of anything already written past this point.

This file exists because two things got asked for that the corpus never pinned down: what "mood-reactive path fields" (named in `DESIGN.md`, never specified) actually *are*, and whether the motion stack locked in `07` still stands. Short version: mood becomes a deterministic byproduct of the bot's own intent classification, and Motion.dev / Anime.js are dropped in favor of hand-rolled motion. Everything else in `00`–`07` stands as written.

---

## 0. Aesthetic ruling (for the record)

The visual world locked in `04-DESIGN-DIRECTION.md` — 0px radius, `2px 2px 0` hard offset shadow, one accent color, visible ink rules, paper texture instead of gradient, explicit ban on glow/glass/soft-UI — already *is* a specific, nameable combination:

| Candidate direction | Fit | Verdict |
|---|---|---|
| **Editorial Design** | Exact match: Fraunces display, folio numbers (`04 / WORK`), reading-frame layout, first-person notebook voice | **Primary identity** |
| **Swiss Design** | Grid discipline, IBM Plex Mono as a typographic *system* (labels, state, measurements) rather than decoration | **Structural grammar** |
| **Neo-Brutalism** (2026 "tactile" form — sharp geometry, crisp hairline-to-medium borders, flat color blocks — not the illegible raw-HTML 1990s kind) | Hard shadow offset, 0px corners, visible structure, one loud accent, no gradients | **Restraint layer** |
| Wabi-Sabi | Paper grain nods at it | Borrow the texture idea only — its core (visible imperfection, asymmetry) fights "engineered precision" |
| Bento Grid | Real utility for `/skills` clusters and the secondary-work index | Layout tactic, not identity |
| Glassmorphism, Neumorphism, Claymorphism, Cybercore, Synthwave, Y2K, Cyberpunk, Scrapbook, Surrealism, Pixel Art, Maximalism, Bohemian, Victorian, Ethereal, Luxury Typography, Conceptual Sketch | Each requires gradient, glow, blur, chrome, or ornament forbidden in `04`'s Hard Bans; several (Y2K, Synthwave, Cyberpunk) signal youth-culture/nightlife rather than the "auditable engineer" positioning this site needs | Rejected |

Do not reopen this. `04` already won this argument; this table just gives it a name for anyone (human or agent) who asks "why does this look brutalist-ish but not gradient-y."

---

## 1. Mood system

### Principle

Mood is **read from the bot, not set by the visitor.** No mood toggle, no ambient randomness. The notebook bot already classifies every incoming question into an intent bucket to pick its grounded answer (see `06-AI-CONCIERGE.md`'s intent table). That same classification step drives the background. One function, two consumers — the bot's reply text, and the ambient path field. Never build a second classifier; that's how the two drift.

### State table

| Mood | Fires on (06's existing intent buckets) | Path field behavior | Window |
|---|---|---|---|
| **Ambient** (default) | No bot open, or idle >20s | Slow drift, low path density, near-invisible amber | Persistent baseline |
| **Focused** | AEGIS / Flately / Agrovers / latency / RAG / skills questions | Tighter grid, more nodes visible, faster measured pulse — reads as "a circuit doing work" | While the bot is answering + 8s after |
| **Charting** | CGPA / academics / methodology / AI Studio | Paths behave like a diagram being sketched — slow directional reveal, not a burst | While the bot is answering + 8s after |
| **Arriving** | Resume / email / hire / contact | Paths bias toward convergence — visually "routing somewhere" | While answering + 8s, or until the visitor reaches `/contact` |
| **Guarded** | Refused / off-topic / rate-limited / error | Pulls back to the sparsest state site-wide | Until the next valid intent |

Every mood **decays to Ambient** after its window closes. No mood is ever sticky, and none of them ever introduce a new hue — this is still the One Signal Rule from `DESIGN.md`, just with an actual mechanism behind the word "mood." The underlying evidence (metric numbers, project colors, proof modules) never moves; only the ambient background layer reads the state.

### Implementation shape

- The bot's response handler sets one value — `document.documentElement.dataset.mood` (or a single CSS custom property `--mood`) — on each classified reply.
- The `PathField` component (§2) is the *only* thing that reads it. No direct coupling between the bot component and the background component — this keeps the "shared structured content" principle from `05` intact: one source of truth, two renderers.
- Default state on first paint, and on any JS failure, is Ambient. Never let a missing classification produce a louder-than-default background.

### Open items — decide before build

- Does **Guarded** need a visually distinct state, or is quiet-and-Ambient enough? (Table above assumes distinct.)
- Does mood persist across a route change while the bot panel stays open, or reset per route?

---

## 2. Hand-coded motion (amends `07`)

`07-TOOLING-AND-REFERENCES.md` currently locks Motion.dev (`motion`) for UI and Anime.js v4 for the schematic draw-in. That's reversed here — not because the reasoning in `07` was wrong, but because the ask has changed: the path field is a bespoke, load-bearing signature piece, and nothing off-the-shelf does this specific job anyway.

| Was (`07`) | Now | Why this is a fair trade |
|---|---|---|
| Motion.dev for panel spring, chip press, page fade, magnetic hover | CSS transitions/keyframes on `transform`/`opacity`, plus one small native `pointermove`-based hook for the two magnetic moments (masthead resume button, contact CTA) | These are genuinely simple interactions; a runtime dependency for them is overhead with no payoff |
| Anime.js v4 for `PipelineSchematic` stroke draw-in | Native SVG `stroke-dasharray`/`stroke-dashoffset` + `IntersectionObserver`, CSS transition (or a ~15-line rAF easing loop for a custom curve) | Same visual result, zero dependency, easier to reason about per-node stagger |
| ~36KB gzip motion budget line | Not applicable — path field + schematic engine are hand-written, mood-aware, and owned outright | The thing templates "cannot copy without understanding the pipelines" now includes the toolchain, not just the look |

`prefers-reduced-motion` handling is unchanged in spirit: every hand-rolled animation freezes on a single settled frame instead of animating. This is easier to guarantee with hand-written code than with a library's own reduced-motion escape hatch.

**Action:** update `00`'s locked-decision table and `07`'s Motion.dev/Anime.js rows to point here before a builder starts Phase 04/05. Don't let two files disagree about the stack.

---

## 3. Agent operating protocol (for Antigravity)

Antigravity already produces task-level "artifacts" and walkthrough docs as it works, and is built around trust/autonomy/feedback as explicit tenets — so the fix isn't a new tracking system, it's pointing that machinery at *verification before generation*, not just after.

### The loop, every session

1. **Audit pass (read-only, first thing, every time).** The agent produces a status artifact — nothing but a table: every route/module from `05-INFORMATION-ARCHITECTURE.md` and `08-MODULAR-SYSTEM.md` marked **Implemented / Partial / Missing / Drifted-from-spec**. Zero code writes in this pass. This is the artifact you actually read before anything else happens.
2. **You confirm the gap list.** Trim it, reorder it, whatever — but nothing gets built off an unconfirmed audit.
3. **Build, phase-locked.** Work `09` → `15` in order, one module at a time. For whichever phase is active, the agent re-opens *that exact phase file*, plus `02-SOURCE-OF-TRUTH.md` and `04-DESIGN-DIRECTION.md`, as direct context immediately before generating — not from memory of earlier turns in the session. This is what stops a stray 9.5 CGPA or a rounded corner sneaking back in three phases later.
4. **Check against `04`'s Hard Bans and `DESIGN.md`'s Do/Don't** as a literal pass/fail list attached to each module's task artifact before it's marked done.
5. **Dependency gate.** Nothing new in `package.json` unless it's named in the amended `07` or explicitly approved by you in chat. This is the actual enforcement mechanism for "stop pulling in third-party packages" — a rule, not a vibe.
6. **Regression check at phase end.** Re-run step 1's audit format as a diff against the previous audit. Scope creep or a silent rewrite shows up immediately instead of three phases later.

### Paste-able session opener

```
Before writing any code this session:
1. Produce a status table of every route/module in 05 and 08:
   Implemented / Partial / Missing / Drifted. No code yet.
2. Wait for my confirmation of the gap list.
3. Once confirmed, work only the current phase file (09-15, in order).
   Re-read that phase file + 02-SOURCE-OF-TRUTH.md + 04-DESIGN-DIRECTION.md
   fresh before generating anything — don't rely on earlier context.
4. Check every new module against 04's Hard Bans and DESIGN.md's Do/Don't
   before marking it done.
5. Do not add any new package.json dependency without naming it here first.
6. At the end of the phase, re-run step 1's table as a diff against the
   start-of-session version.
```

Next: none — this file has no downstream numbered file. `08-MODULAR-SYSTEM.md` and everything after it in your existing corpus continues unaffected.
