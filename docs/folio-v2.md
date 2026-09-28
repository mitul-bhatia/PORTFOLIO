# Folio v2: theme, motion and the notebook pet

The Living Systems Folio stays. This spec refines the look, rebuilds motion as one system, and turns the pet into a character.

Section 7 (README CGPA, duplicate résumé, unused plates, phone visibility, handwritten news notes) is hand work, not an agent phase.

## Phase status

- Phase 1: tokens and motion cleanup. Done.
- Phase 2: paper moods and hero. Done.
- Phase 3: pet UI. Done, with changes below.
- Phase 4: brain and flow. Done.

### Where the build departs from this spec (owner's call, Sep 2026)

- The pet is **Pip, a small screen-faced robot**, not a notebook page. It is bigger (112px desktop, 88px phone), sits bottom-right, waves on arrival, blinks, follows the pointer with its eyes, floats, naps after a minute idle, and throws tantrums (poke it five times, or be rude to it).
- **Manual mood picker stays**, in the chat header and on the status line under Pip, with an "Auto: follow the page" option.
- **Say hi first.** The input unlocks after the visitor says hi (or uses "Ask Pip" on a news item).
- **Pip takes you places.** "Take me to AEGIS", "next project", and a guided eight-stop tour walk the visitor to the page, scroll to the section (`data-tour` anchors), and perch on it with a highlight. Content lives in `src/content/pet.ts`.
- Pip has an idle float and short reaction animations (hop, shake, sulk) beyond the blink. All stop under reduced motion.

## 1. Theme

`globals.css` is the only token source. `src/lib/tokens.ts` is deleted.

- `--accent-ink`: text accent, at least 4.5:1 on that mood's paper.
- `--accent`: fills, rules, pet fold and ribbon, at least 3:1.
- `--plate`: `color-mix(in srgb, var(--ink) 94%, black)`.
- `--measure: 66ch` and `--measure-wide: 760px`.
- One shadow: `--shadow-notebook`.
- Mono labels: 11px and 12px only. Phase 2 applies this in components.

Mood colors are registered with `@property` and transition together for 320ms with `--ease-move`. The mood toast and the 8-second decay are gone. Mood changes on route change or an explicit ask (route-derived mood is phase 4).

Path field motifs (phase 2), max opacity 0.30:

| Mood | Motif |
|---|---|
| ambient | plain folio, 4 baseline paths |
| focused | graph paper, 24px grid |
| charting | drafting vellum, diagonals |
| arriving | postmark lines converging on the pet |
| guarded | ledger double-rule in the margin |
| jealous | pencil strike-through marks |
| bragger | light guilloche lattice, no star |
| fan | margin doodle waves |

`/news` keeps the quiet mask. Hero name stays `clamp(4.4rem, 10vw, 7.5rem)`. Phase 2 gives the portrait `max-height: calc(100svh - 64px - 7rem)`.

## 2. Motion

```css
--dur-1: 120ms;
--dur-2: 240ms;
--dur-3: 420ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-move: cubic-bezier(0.65, 0, 0.35, 1);
```

Only `transform`, `opacity`, `clip-path`, `stroke-dashoffset`, and registered color properties may animate.

Signature motions, built in phase 2 unless noted:

- Ink draw on PathField when the mood changes: stroke-dashoffset, `--dur-3` × 2, `--ease-out`, 60ms stagger, once.
- Stamp: opacity 0 to 1, scale 1.04 to 1, 160ms, `--ease-out`.
- Sheet slide: translateX(24px) plus opacity, `--dur-3`, exit 250ms `--ease-in`.
- Wipe reveal: one clip-path variant, `--dur-3`, 60ms stagger, first appearance only.
- Pipeline trace: observer starts the 5 nodes once, 180ms apart, connector uses ink draw.

At most 2 non-hover animations at once. The pet blink is the only idle loop. Thinking ticks loop only while a request is in flight, max 8s.

Reduced motion: opacity fades up to 120ms. No travel, no ink draw, no typewriter, no ticks. `usePrefersReducedMotion` enforces this in JavaScript.

Deleted in phase 1: breathe, glance, brow, star, antenna, CRT, eq-1…7, `.action-ink`, `.assistant-dot`, `animate-ping`, beacon `r` animation, infinite `path-flow` and `node-pulse`, `bot-talk`, mood toast, 8s decay, the drawer's dead `transition-transform`, and `ScrollProgress` except on `/work/[slug]`.

## 3. The pet

A square ink page, dog-ear, bookmark ribbon. SVG `viewBox 0 0 96 110`. Placement, reducer states, first-visit slip, and sheet contents are phase 3. Desktop at 1416px and wider does not dim the page or lock scroll.

## 4. The brain

`classifyLane` runs before the answer. Response shape:

```ts
{ lane, text, citations: {label, href}[], actions, degraded: boolean, mood }
```

Temperatures: record 0.2, edition 0.3, general 0.6. Edition excerpts go in a delimited `<digest>` block. Record answers must only contain numbers and organisation names that appear in the record. Degraded edition lists the top 3 headlines. This is phase 4.

## 5. Flow

Home reading strip, case-study Next block, "Ask the notebook" on news items, footer Contact and résumé. Phase 4.

## Model notes (Sep 2026)

- Default model is `gemini-3.6-flash`; `.env.example` matches. Older models (`gemini-2.5-flash`) return 404 for new users.
- Gemini 3 spends output tokens on thinking. Calls use `thinkingLevel: 'low'` and a 2048-token budget, otherwise short answers come back empty.
- A 503 ("high demand") is retried once. Any other failure backs off (429: 60s, 5xx/network: 30s, other: 10 min) and logs one `[notebook]` line, so Pip answers from the record at once instead of waiting on timeouts.
- The free tier allows 5 requests a minute and a small daily quota. `npm test` paces its live pass 13s apart and fails if fewer than 80% of live calls return text.
