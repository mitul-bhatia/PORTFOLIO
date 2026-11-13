---
name: Mitul Bhatia Portfolio
description: A live route map; every project is a coloured line and every pipeline stage a station.
colors:
  paper: "#f1f3f4"
  paper-soft: "#ffffff"
  elevated: "#e3e6e8"
  ink: "#14151a"
  muted: "#54575f"
  rule: "#c5cacd"
  red: "#d8002b"
  red-ink: "#b80025"
  blue: "#0057b8"
  blue-ink: "#004a9e"
  green: "#00843d"
  green-ink: "#006b32"
  yellow: "#ffb81c"
  yellow-ink: "#7a5200"
typography:
  display:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(3.1rem, 8.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 112"
  h1:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 108"
  h2:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)"
    fontWeight: 750
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 106"
  h3:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.3rem, 2vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 104"
  lead:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'kern', 'liga'"
  sign:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.005em"
    fontVariation: "'wdth' 88"
  data:
    fontFamily: "Martian Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontFeature: "'tnum'"
rounded:
  focus: "2px"
  control: "4px"
  media: "6px"
  full: "999px"
spacing:
  track: "10px"
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4rem, 9vw, 7.5rem)"
  wrap: "1280px"
  measure: "66ch"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 1.15rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper-soft}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 1.15rem"
    height: "3rem"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
  button-on-dark-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  segment:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "0 1rem"
    height: "2.75rem"
  segment-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  bullet:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper-soft}"
    rounded: "{rounded.full}"
    size: "2rem"
  bullet-lg:
    rounded: "{rounded.full}"
    size: "3rem"
  bullet-sm:
    rounded: "{rounded.full}"
    size: "1.5rem"
  station:
    backgroundColor: "{colors.paper-soft}"
    rounded: "{rounded.full}"
    size: "30px"
  media-frame:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.media}"
  chat-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "2.75rem"
    padding: "0 0.75rem"
---

# Design System: Mitul Bhatia Portfolio

## Overview

**Creative North Star: "Signal Lines"**

The portfolio is a live route map. Each project is a coloured line, each stage of its real pipeline is a station on that line, and small packets ride the lines while the page is open. The visual language is that of a transit authority's public signage: a cool paper ground, near-black ink, four saturated line colours drawn as thick round-capped strokes, white stations ringed in ink, and a sturdy grotesque that changes width by role. Nothing is decorative that is not also a wayfinding device; a colour on screen always means "this belongs to that line".

The system is flat, ruled, and dense in the way a timetable is dense. Structure comes from 2px ink rules and 1px hairlines, not from boxes or shadows. Sections alternate between the paper ground and two full-bleed fields (ink and yellow), which act as the dark departures board and the terminus. Pip, the concierge robot, is a passenger in this world: it rides each pipeline run from station to station and changes mood as the visitor crosses sections.

It refuses the dark bento developer portfolio and the cream editorial folio it replaced.

**Key Characteristics:**
- Cool paper white ground, ink text, four line colours each with a darker text variant.
- Lines are thick rounded strokes; stations are white circles with a heavy ink ring.
- One variable grotesque (Archivo) whose width axis carries the hierarchy; one mono (Martian Mono) for figures only.
- Ruled rows and boards in place of cards; corners are small (4px, 6px) or fully round.
- Motion is transit motion: lines draw, packets ride, stations snap, runs hop. Everything that loops can be paused.
- On phones the hero keeps a map: the three lines share a vertical trunk and peel off to the right.

## Colors

A neutral cool ground carrying four signage colours at full saturation; colour is never mood, always line identity.

### Primary
- **Signal Red** (`red`, text variant `red-ink`): the AEGIS line and the system's default accent. Primary button hover, active navigation station, text caret, concierge accent. The hero role line is set in `red-ink`.

### Secondary
- **Route Blue** (`blue`, text variant `blue-ink`): the Flately line. Also the default focus ring on paper.
- **Platform Green** (`green`, text variant `green-ink`): the Agrovers line.

### Tertiary
- **Lamp Yellow** (`yellow`, text variant `yellow-ink`): the shared line for every non-flagship project, the text selection colour, the live clock and dates on the ink board, and the full-bleed terminus field behind the closing contact band. Yellow carries ink text, never white.

### Neutral
- **Cool Paper** (`paper`): the page ground and the browser theme colour.
- **Board White** (`paper-soft`): station fills, segment controls, the concierge's bubble and answer slips, row hover.
- **Platform Grey** (`elevated`): scrollbar track and concierge hover fills.
- **Ink** (`ink`): all primary text, structural 2px rules, station rings, primary buttons, and the full-bleed field behind Experience and the footer.
- **Muted Ink** (`muted`): body copy, labels, idle station names.
- **Hairline** (`rule`): 1px dividers inside boards and lists, idle control borders.

### Named Rules
**The Line Owns Its Colour Rule.** A colour is assigned by `lineFor(slug)`: red, blue and green belong to the three flagships; everything else rides yellow. A wrapper sets the line (`line-red`, `line-blue`, `line-green`, `line-yellow`) and children read `--line`, `--line-ink`, `--on-line`. Never pick a line colour by hand for visual variety.

**The Ink Variant Rule.** The line colour fills strokes, bullets and bars. Text on paper in a line's colour always uses that line's `-ink` variant. Text sitting on a line colour uses `--on-line`: white on red, blue and green; ink on yellow.

**The Two Fields Rule.** Only ink and yellow run full-bleed as section grounds. Ink is the board (Experience, footer); yellow is the last stop (contact band). Red, blue and green never become a section background.

**The Focus Follows The Ground Rule.** The focus ring is a 3px solid outline at 3px offset whose colour comes from `--focus`: blue on paper, yellow on the ink field, ink on the yellow field. Any new ground must set `--focus`.

## Typography

**Display Font:** Archivo, variable with the width axis (with 'Helvetica Neue', Arial, sans-serif)
**Body Font:** Archivo at normal width
**Label/Mono Font:** Martian Mono (with ui-monospace, Menlo, monospace)

**Character:** One grotesque doing the whole job of a signage family: wide and heavy for names, normal for reading, narrow and sturdy for station names. The mono appears only where a number, date or time is being read off a board.

### Hierarchy
- **Display** (800, width 112%, clamp(3.1rem, 8.6vw, 6rem), line-height 0.9, -0.035em): the name in the hero, one word per line. Each word rises out of its own baseline on load.
- **H1** (800, width 108%, clamp(2.4rem, 5.6vw, 4.25rem), 0.98): page titles on inner routes, the homepage section title, the contact band's question.
- **H2** (750, width 106%, clamp(1.9rem, 3.6vw, 2.9rem), 1.04): section headings and flagship project names beside a large bullet.
- **H3** (700, width 104%, clamp(1.3rem, 2vw, 1.6rem), 1.15): roles on the board, capability titles, project names in compact rows.
- **Lead** (400, clamp(1.1rem, 1.5vw, 1.3rem), 1.5): the sentence under a heading, held to 34ch to 58ch.
- **Body** (400, 1rem, 1.6, muted): running copy, capped at 66ch.
- **Sign** (600, width 88%, 0.875rem, 1.25): station names, definition terms on the facts board, project tags (in the line's ink variant), capability stops.
- **Data** (Martian Mono, 0.8125rem, tabular figures, -0.01em): tenures, CGPA, stack lists, stage counters, the station clock. Numeric metrics use the mono at clamp(1.05rem, 2.2vw, 1.6rem), weight 600.

### Named Rules
**The Width Is The Hierarchy Rule.** Width narrows as the role gets smaller: 112, 108, 106, 104 for headings, 96 for buttons, 92 for segments, 88 for signs, 82 to 85 for labels inside the map. A new text role picks a point on this scale; it does not introduce another family.

**The Mono Reads Figures Rule.** Martian Mono is for measurements, dates, times and counts. A metric whose value has no digit is set in Archivo extra-bold instead.

**The Sentence Case Rule.** Signs and labels are sentence case at normal tracking. Hierarchy comes from weight and width, not from capitals or letterspacing.

## Layout

A single centred column (max 1280px) with a fluid gutter (clamp(1.25rem, 4vw, 3rem)). Sections breathe at clamp(4rem, 9vw, 7.5rem) top and bottom. Inside, content sits on a 12-column grid from 1024px: text 5 columns against a 7-column figure in the hero and flagship projects (alternating sides), 3/4/5 for the experience board, 4/5/3 for compact project rows.

Structure is ruled, not boxed. A 2px ink rule opens a board or list and closes the masthead, hero and page headers; 1px hairlines separate rows and cells within it. Metrics, the hero facts board, experience entries and secondary projects are all ruled rows. The page ends in the four-lines band (20px, four 5px stripes in red, blue, green, yellow) above the ink footer.

Breakpoints in use: 360px (metrics go from stacked to three across), 640px (run diagrams turn horizontal, the facts board goes two-up, Pip stops tucking to the edge), 1024px (12-column grid, desktop nav, the wide route map, Pip's greeting bubble).

The sticky masthead is 4rem tall; anchors offset by 5.5rem.

### Named Rules
**The Map Survives The Phone Rule.** Below 1024px the hero swaps to a second, purpose-drawn map: the three lines leave the interchange down one vertical trunk and peel off to the right in turn, the first to leave riding the outside edge so no two lines cross, with a thinner 9-unit stroke. It never collapses into a stack of cards.

**The Run Turns With The Screen Rule.** A pipeline run is horizontal from 640px (track across, Pip above it) and vertical below (track down the left, stations as rows, Pip at the right edge). Runs with prose under each stop draw their own segment from stop to stop on phones.

## Elevation & Depth

The page is flat. Depth is conveyed by ground changes (paper, white, ink, yellow), by ink borders, and by the order of ruled rows. No page-level surface casts a shadow, and nothing is blurred or translucent.

The one exception is the concierge, which floats above the page as a separate object: Pip carries a soft drop shadow, and its speech bubble, chat sheet and mood menu share one lift shadow. An active station in a run carries a 6px halo ring in a 35% tint of its line, which is a state mark, not elevation.

### Shadow Vocabulary
- **Concierge lift** (`box-shadow: 0 1px 0 rgb(20 21 26 / 0.06), 0 18px 40px -22px rgb(20 21 26 / 0.35)`): Pip's bubble, chat sheet and mood menu only.
- **Pip ground shadow** (`filter: drop-shadow(0 10px 14px color-mix(in srgb, var(--ink) 18%, transparent))`): the robot itself.
- **Active station halo** (`box-shadow: 0 0 0 6px color-mix(in srgb, var(--line) 35%, transparent)`): the stage a run is currently at.

### Named Rules
**The Only Pip Floats Rule.** Shadows belong to the concierge layer. Page content separates with rules and grounds.

## Shapes

Two shapes do the work: the round-capped stroke and the circle. Lines, tracks and progress fills are fully rounded bars (10px track in runs, 12-unit stroke on the wide map, 8px on capability lists). Stations, line bullets, the masthead mark, navigation markers, the portrait and the live dot are full circles; a station is always white with a heavy ink ring (5px on a 30px run stop, 3.5 on map stations), filling with its line colour when passed and with ink when active.

Rectangles are nearly square. Controls take a 4px radius, media frames 6px, the focus outline 2px. Concierge surfaces (bubble, chat sheet, chips, input) are square-cornered with a 1.5px or 1px ink border. Borders are structural and always ink or hairline: 2px on buttons, media frames and section rules, 1px between rows.

Media frames are ink-backed, 2px ink bordered, and finished with an 8px bar of the project's line colour along the bottom edge. Capability columns open with a 10px top bar in their line colour.

## Components

### Buttons
Solid, square-shouldered, and labelled with a verb.
- **Shape:** 4px radius, 2px ink border, 3rem minimum height, 0 1.15rem padding, Archivo 700 at 0.95rem and width 96%. A trailing arrow icon slides 3px right on hover.
- **Primary:** ink fill, paper text. Hover turns fill and border Signal Red with white text.
- **Secondary:** transparent with ink text; hover inverts to ink fill.
- **On dark / on a line:** border and text take the foreground of the ground (`paper` on ink, `--on-line` on a line colour); hover inverts.
- **Transitions:** colour, background and border over 120ms on the standard ease-out.

### Text links
Bold ink text with a 2px underline in the current line's colour; hover shifts the text to that line's ink variant. Row-level links underline the title in the line colour (4px to 6px thick) on hover instead.

### Segmented choices
Filters, tabs and steppers. 4px radius, 2px hairline border, white fill, muted text, 2.75rem tall, Archivo 650 at width 92%. Hover takes an ink border and ink text; the pressed, selected or current item is solid ink with paper text. Disabled drops to 40% opacity.

### Line bullet
A filled circle in the line colour carrying the line's single letter in Archivo 800, in three sizes (1.5rem, 2rem, 3rem). It always precedes the project name it identifies.

### Route map (signature)
The hero figure: three project lines fanning out of one interchange (a white circle with an 8-unit ink ring, initials inside, and a slow outward pulse). Each line is a whole link to its case study with a 44-unit invisible hit stroke. On load the lines draw in sequence (1100ms, 140ms apart); then two packets (ink dots with a white ring) ride each line on a 7s loop and each station snaps to the line colour at 1.45 scale as a packet arrives, stepping back without a fade. Hovering or focusing one line thickens it (12 to 16) and dims the others to 28%.

### Line run (signature)
A project's pipeline as a track with stations. When it scrolls 55% into view a run travels it one stage every 820ms: the fill extends, the passed station snaps (scale 1.5 to 1 in two steps, 220ms), the active station turns ink with a tinted halo, and Pip hops along above the current stage. A mono status line reports "Stage n of N" and a replay control sits opposite. Server render and reduced motion show the completed run.

### Ruled rows and boards
Metric rows, the hero facts board, the experience board and compact project lists share one construction: a 2px rule above, hairlines between cells or rows, sign-style labels over semibold values, mono for figures. Numeric metrics count up from zero (1100ms) the first time they are seen. On the ink field the same board uses paper rules at reduced opacity and yellow mono for dates and the ticking station clock.

### Navigation
Sticky paper masthead closed by a 2px ink rule. The mark is a station (white circle, 5px ink ring; ring turns red on hover) beside the name. Each link is preceded by a small station marker: hairline ring at rest, ink ring on hover, red-filled with ink ring when current. A scroll progress line in the four line colours grows under the masthead where scroll-driven animation is supported. Below 1024px a labelled Menu button opens a full-width list of large bold links with the same station markers. The pause-motion control sits beside the resume button.

### Inputs
One field exists, in the concierge chat: square corners, 1px ink border, paper fill, 2.75rem tall, muted placeholder, red caret. Focus uses the global ring.

### Pip, the concierge
A robot fixed at the bottom right (88 by 97px, 64 by 70px on phones where it waits half off-screen until it has something to say). It speaks in a white, ink-bordered bubble with a tail, opens a bottom chat sheet over a 30% ink scrim, and answers in bordered slips whose border encodes the source (ink for the record, red for the reading edition, dashed muted for general). Sections brief it through `data-pip-mood`, `data-pip-say` and `data-pip-react`; the section crossing the middle of the viewport wins.

### Motion
- **Tokens:** 120ms, 240ms, 420ms; ease-out `cubic-bezier(0.16, 1, 0.3, 1)` for state and entrances, ease-move `cubic-bezier(0.65, 0, 0.35, 1)` for anything travelling along a line, ease-in for exits.
- **Vocabulary:** line draw, packet ride, station snap (stepped, never faded), run hop, scroll reveal (rise 28px, stagger at 90ms steps, wipe from the left for media), count-up, scroll progress line, hero word rise, page enter, directional slide between work routes.
- **Scroll reveal is gated on `html.js`:** hidden states exist only once script has run, and a 3s failsafe reveals anything still hidden.
- **Two off-switches.** `prefers-reduced-motion` removes draws, packets, snaps, pulses, the progress line and reveals, and shows runs complete. The visitor's pause control sets `html[data-motion='off']`, remembered on the device, and stops everything that loops: packets, the hub pulse, the flowing four-lines band, the run rider, station hits, the live dot and Pip's idle animation.

## Do's and Don'ts

### Do:
- **Do** assign colour through the line: wrap in the project's line class and read `--line`, `--line-ink`, `--on-line`.
- **Do** use the `-ink` variant whenever a line colour is used for text on paper, and ink text on yellow.
- **Do** build lists and facts as ruled rows: 2px ink rule to open, 1px hairlines between.
- **Do** draw stations as white circles with a heavy ink ring, and lines as round-capped bars.
- **Do** keep corners at 4px for controls, 6px for media, or fully round; nothing in between.
- **Do** set `--focus` on any new ground so the 3px ring stays visible.
- **Do** give every new loop a rule under both `prefers-reduced-motion` and `html[data-motion='off']`, and gate every hidden reveal state on `html.js`.
- **Do** keep a real map in the phone hero, using the vertical-trunk geometry.
- **Do** set figures, dates and times in Martian Mono with tabular numerals.

### Don't:
- **Don't** use red, blue or green as a section background, or introduce a fifth line colour.
- **Don't** put white text on yellow, or raw line colours on paper as text.
- **Don't** add shadows, blur or translucent panels to page content; only the concierge floats.
- **Don't** wrap content in rounded cards or tile grids; the board and the ruled row are the containers.
- **Don't** fade a station; arrivals snap in steps.
- **Don't** replace the phone map with stacked cards or hide it.
- **Don't** add a second sans or a serif; vary Archivo's width and weight instead.
- **Don't** return to the cream paper, warm amber and serif display of the discarded folio, or to a dark bento grid.
