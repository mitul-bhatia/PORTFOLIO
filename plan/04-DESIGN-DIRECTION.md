# 04 — Design direction

Continues: `03-PRODUCT.md`  
Next: `05-INFORMATION-ARCHITECTURE.md`  
Mode: **Experience** (portfolio) with a **Read** overlay on case studies and a small **Operate** overlay on the bot panel.

---

## Selected world: Engineered Editorial, modular (Option A+)

Keep the locked v1 material language. Change **architecture and interaction**, not the identity.

This is **not** Option B (soft radius, ambient shadows, overlapping candy cards).
This is **not** a Watermelon / 21st.dev default theme.

### Thesis

A bound engineering notebook that has been cut into **signatures** (pages) instead of one infinite roll. Each page is a sheet. Modules are stamped plates on that sheet. The AI concierge is a small round well in the margin — bubbly in silhouette, notebook in surface.

### Tokens (non-negotiable)

| Token | Value |
|---|---|
| Background | `#F3E9DA` |
| Ink | `#2B1D14` |
| Elevated | `#EADFC8` |
| Muted | `#6B5744` |
| Accent | `#A8672E` (burnt sienna) |
| Border | `#D9C9AC` |
| Display | Fraunces |
| Body | Inter |
| Mono / labels | IBM Plex Mono |
| Radius | **0px** on cards, buttons, inputs, images frames |
| Bot launcher | The **only** full circle in the product (the “bubble”). Panel itself is 0px |
| Shadow | `shadow-notebook`: `2px 2px 0 #D9C9AC` only |

### Hard bans

NO gradients, glassmorphism, glow, bloom, neon, purple “AI” palettes, rounded pills, soft UI shadows, blob/wave Haikei backgrounds, stock 3D blobs.

### Texture

One Haikei **Low Poly Grid**, monochrome ink-on-cream, low contrast, tiled or full-bleed under content. Replaces generic CSS noise or layers with it. This is the paper stock.

---

## Layout grammar

- Page = `Sheet`: max width ~1120–1200px, generous side margin, hairline border optional as a page plate
- Masthead: name (Fraunces) left; routes in IBM Plex Mono right; resume as a stamped button
- Footer: email + year + “notebook” folio number (e.g. `04 / WORK`)
- Grid: 12-col on desktop; modules span 4 / 6 / 8 / 12; never masonry chaos
- Mobile: single column, bot launcher bottom-right, masthead collapses to name + menu

## Focal moments per surface (one each)

| Surface | Focal interaction |
|---|---|
| Home | Kinetic split name + tagline text effect |
| Work index | Magnetic project plates |
| Case study | Anime.js schematic draw-in + sliding metrics |
| About | Portrait frame + methodology list reveal |
| Skills | Filter chips (0px) + timeline/cluster transition |
| Contact | Magnetic primary CTA |
| Bot | Bubble morphs into 0px panel; messages stamp in |

## Cursor

Desktop: custom cursor that becomes magnetic near buttons (~40px). Off on touch / reduced motion.

## Pretty, defined

Pretty here means:

- Type size steps that feel editorial (display huge on Home, then disciplined)
- Alignment to a baseline / 8px rhythm
- Ink density: lots of cream, few sienna hits
- Motion that feels like a pen drawing, not a product tour

Next: routes and modules — `05-INFORMATION-ARCHITECTURE.md`.
