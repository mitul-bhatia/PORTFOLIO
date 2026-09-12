# 08 — Modular system

Continues: `07-TOOLING-AND-REFERENCES.md`  
Next: `09-PHASE-01-FOUNDATION.md`

A builder may **assemble** these modules. A builder may not invent a one-off card that ignores tokens.

---

## Shell modules

| Module | Responsibility |
|---|---|
| `PaperRoot` | Cream bg + Haikei SVG + ink defaults |
| `Masthead` | Identity, routes, resume stamp |
| `FooterFolio` | Folio index, email, copyright year |
| `ScrollProgress` | Top hairline |
| `CustomCursor` | Desktop pointer + magnetic |
| `BotDock` | Launcher + panel + input |
| `PageSheet` | Width, padding, enter transition |
| `MobileNav` | Full-sheet menu, 0px |

## Proof modules

| Module | Inputs (from content/) | Used on |
|---|---|---|
| `HeroStamp` | name, stamp, og tagline | Home |
| `PillarCard` | title, proof, bullets | Home, optionally About |
| `MetricStrip` | 3× {label, value, suffix} | Home featured, flagship cases |
| `PipelineSchematic` | 5 nodes + edges | Flagship cases |
| `ProjectPlate` | title, tag, 3 metrics, href | `/work`, Home featured |
| `CaseHero` | title, tag, problem | Case pages |
| `StackStamps` | string[] | Cases |
| `MethodList` | 4 methodology points | About |
| `PortraitFrame` | image | About |
| `SkillCluster` | cluster + nodes | `/skills` |
| `ContactBlock` | email, socials, resume | `/contact` |
| `NotebookChips` | intents | Bot empty state |

## Rules of composition

1. Modules consume **content objects**, never hardcoded metrics in JSX.
2. Modules do not set new colors. They use CSS variables from 04.
3. Modules expose `asFeatured` / `compact` variants rather than forks.
4. Flagship `ProjectPlate` always shows MetricStrip compact; secondary plates show tag + one-liner only.
5. `PipelineSchematic` refuses to render if `nodes.length !== 5`.

## Motion budget

Each module documents one motion in its header comment when coded. If a page already used its focal moment, nested modules use **fade/in-view only**.

## File map (later)

```
src/app/...                  routes
src/components/shell/...
src/components/proof/...
src/components/notebook/...
src/lib/motion.ts
src/content/...
```

Next: Phase 01 — `09-PHASE-01-FOUNDATION.md`.
