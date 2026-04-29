# Tactile Nostalgia Message Portal

## Product Overview

**The Pitch:** A digital postal service that resurrects the intimate, physical joy of sending and receiving letters. Users craft, seal, and discover heartfelt messages disguised as tangible analog artifacts.

**For:** Romantics, long-distance friends, and nostalgia seekers who crave the emotional weight of a handwritten letter in a digital space.

**Device:** desktop

**Design Direction:** Analog warmth meets digital interactivity. Think heavy linen paper, smudged typewriter ink, deckled edges, and the satisfying friction of tearing open a sealed envelope.

**Inspired by:** Felt (card sending), Slowly (letter writing app)

---

## Screens

- **Landing Page:** Introduces the portal with a sprawling, messy writer's desk.
- **Compose Message:** A blank piece of textured stationery for drafting the letter.
- **Seal & Send:** Envelope customization with vintage stamps and wax seals.
- **The Dead Letter Office (Gallery):** A chaotic, beautiful corkboard of public letters.
- **Read Message:** The physical-digital unsealing experience.

---

## Key Flows

**Sending a Letter:** User crafts and seals a message.

1. User is on Landing Page -> sees scattered letters and "Draft a Letter" wax seal button.
2. User clicks "Draft a Letter" -> transitions to Compose Message.
3. User fills To, From, and Message, clicks "Fold & Seal".
4. User selects a vintage stamp on the Seal & Send screen, clicks "Drop in Mailbox".
5. Letter is dispatched to the Dead Letter Office.

**Discovering a Message:** User opens a public letter.

1. User is on The Dead Letter Office -> sees a grid of sealed envelopes.
2. User clicks an envelope -> transitions to Read Message.
3. User drags the cursor to "tear" the top edge of the envelope.
4. Letter slides out, revealing the handwritten content.

---

<details>
<summary>Design System</summary>

## Color Palette

- **Primary:** `#B24A40` - Faded wax seal red. Buttons, primary CTAs.
- **Background:** `#F4EEDD` - Aged parchment. Main canvas.
- **Surface:** `#E8DEC3` - Kraft paper envelopes, layered cards.
- **Text:** `#2A2626` - Faded typewriter ink black.
- **Muted:** `#8C8273` - Smudged graphite. Secondary text, borders, postmarks.
- **Accent:** `#6B705C` - Vintage olive green. Highlights, selected stamps.

## Typography

- **Headings:** `Special Elite`, 400, 32-48px (Typewriter texture)
- **Body/UI Elements:** `Courier Prime`, 400, 16px (Clean typewriter)
- **Handwritten Messages:** `Zeyada`, 400, 24px (Messy cursive)
- **Small text:** `Courier Prime`, 400, 12px
- **Buttons:** `Special Elite`, 400, 16px, uppercase tracking 2px

**Style notes:** Avoid perfect straight lines. Use CSS `filter: url(#wavy)` for subtle deckled edges. Elements cast harsh, offset `#2A2626` shadows (e.g., `4px 4px 0px #2A2626`) mimicking a flash photograph of a desk. Use SVG noise filters for paper grain.

## Design Tokens

```css
:root {
  --color-primary: #B24A40;
  --color-background: #F4EEDD;
  --color-surface: #E8DEC3;
  --color-text: #2A2626;
  --color-muted: #8C8273;
  --font-typewriter: 'Special Elite', monospace;
  --font-ui: 'Courier Prime', monospace;
  --font-hand: 'Zeyada', cursive;
  --radius-rough: 2px;
  --shadow-hard: 6px 6px 0px rgba(42, 38, 38, 0.85);
  --noise-texture: url('assets/noise.svg');
}
```

</details>

---

<details>
<summary>Screen Specifications</summary>

### Landing Page

**Purpose:** Set the analog mood and guide users to write or read.

**Layout:** Full-viewport desk background. Scattered envelopes (links to gallery) acting as a messy navigation. Central focus point is a blank notepad.

**Key Elements:**
- **Desk Background:** Seamless wood grain or dark linen, heavily textured via CSS overlay.
- **Primary CTA ("Draft a Letter"):** Blank notepad paper, skewed 3 degrees, `var(--shadow-hard)`. Hover lifts the paper.
- **Secondary CTA ("Read the Mail"):** Stack of tied envelopes, bottom right corner.

**States:**
- **Loading:** Typewriter cursor blinking in the center.

**Components:**
- **Nav Item (Paper):** 200x250px, `#F4EEDD`, skewed borders, `Special Elite`.

**Interactions:**
- **Hover CTA:** Paper rotation resets to 0 degrees, shadow extends to `8px 8px`.

### Compose Message

**Purpose:** Writing the actual note.

**Layout:** Centered single sheet of paper with input fields. No header/footer. Immersive writing zone.

**Key Elements:**
- **Paper Canvas:** 600x800px, `#F4EEDD` background with horizontal blue ruling lines (`border-bottom: 1px solid #8C8273`).
- **To/From Fields:** Top of page. Invisible `input`, uses `Zeyada` font, 24px.
- **Message Field:** Invisible `textarea` overlapping the ruled lines. `line-height` perfectly matches ruling spacing (32px).
- **"Fold Letter" Button:** `#B24A40` background, positioned bottom right, overlapping the paper edge.

**States:**
- **Empty:** "Who is this for?" placeholder in `Courier Prime` 14px.

**Interactions:**
- **Focus Field:** Blinking cursor, slight ink-bleed glow (`text-shadow: 0 0 2px rgba(42, 38, 38, 0.5)`).

### Seal & Send

**Purpose:** Customizing the physical artifact before dispatch.

**Layout:** Split screen. Left: Folded envelope. Right: Drawer of stamps and seals.

**Key Elements:**
- **Envelope Canvas:** 500x300px rectangle, `#E8DEC3`. Distinct CSS borders simulating folded flaps (`border-top: 150px solid rgba(0,0,0,0.05)`).
- **Stamp Drawer:** Grid of 6 vintage SVG stamps.
- **Send Action:** Wax seal graphic centered on envelope flaps.

**Components:**
- **Stamp:** 80x100px, perforated edges (using CSS `radial-gradient` masking), various muted colors.

**Interactions:**
- **Drag Stamp:** User drags stamp from drawer to top-right of envelope.
- **Click Wax Seal:** Melts and stamps down (scale 1.5 -> 1.0, adds `var(--shadow-hard)`). Triggers dispatch sequence.

### The Dead Letter Office

**Purpose:** Browsing messages from strangers.

**Layout:** Masonry grid of varying sized envelopes on a corkboard texture.

**Key Elements:**
- **Envelopes:** Various skew angles (-4 to 4 degrees). Show "To" and "From" names scribbled on the front.
- **Postmarks:** Randomly placed SVG circles with faded `#2A2626` over envelopes to indicate "processed" mail.

**States:**
- **Empty:** Single pinned note: "The postman hasn't arrived yet."
- **Loading:** Envelopes floating down from top of screen.

**Interactions:**
- **Hover Envelope:** Postmark rotates slightly, envelope scales to 1.05.
- **Click Envelope:** Opens Read Message screen via crossfade.

### Read Message

**Purpose:** The tactile reveal and reading of a letter.

**Layout:** Centered closed envelope.

**Key Elements:**
- **Sealed Envelope:** 600x400px.
- **Tear Strip:** A dashed line across the top edge. "Tear here to open" instruction in `Courier Prime` 12px.
- **The Letter:** Hidden inside.

**Interactions:**
- **Drag Tear Strip:** User clicks and drags left-to-right. A canvas overlay creates a ripped paper edge effect following the cursor.
- **Release (Opened):** Envelope flap falls open. Letter slides up out of the envelope 200px.
- **Click Letter:** Letter scales up to fill view, displaying the handwritten `Zeyada` text.

</details>

---

<details>
<summary>Build Guide</summary>

**Stack:** HTML + Tailwind CSS v3

**Build Order:**
1. **Compose Message:** Establishes the core typography, paper textures, and input handling. This is the heart of the app.
2. **Read Message:** Forces implementation of the tearing interaction early, which is the technical risk.
3. **Seal & Send:** Builds on the paper visual system to create the envelope mechanics.
4. **The Dead Letter Office:** Grid implementation.
5. **Landing Page:** Glues flows together.

</details>