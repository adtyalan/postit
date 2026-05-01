---
name: Tactile Nostalgia
colors:
  surface: '#fff8f6'
  surface-dim: '#f4d3cd'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ee'
  surface-container: '#ffe9e5'
  surface-container-high: '#ffe2dd'
  surface-container-highest: '#fddbd5'
  on-surface: '#291714'
  on-surface-variant: '#5d3f3a'
  inverse-surface: '#402b28'
  inverse-on-surface: '#ffedea'
  outline: '#926f69'
  outline-variant: '#e7bdb6'
  surface-tint: '#bf0900'
  primary: '#b60800'
  on-primary: '#ffffff'
  primary-container: '#de2312'
  on-primary-container: '#fff6f5'
  inverse-primary: '#ffb4a7'
  secondary: '#a93626'
  on-secondary: '#ffffff'
  secondary-container: '#fd735e'
  on-secondary-container: '#6f0902'
  tertiary: '#0058ae'
  on-tertiary: '#ffffff'
  tertiary-container: '#3171c9'
  on-tertiary-container: '#f7f7ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a7'
  on-primary-fixed: '#400100'
  on-primary-fixed-variant: '#920500'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a7'
  on-secondary-fixed: '#400100'
  on-secondary-fixed-variant: '#881e11'
  tertiary-fixed: '#d6e3ff'
  tertiary-fixed-dim: '#aac7ff'
  on-tertiary-fixed: '#001b3e'
  on-tertiary-fixed-variant: '#00468d'
  background: '#fff8f6'
  on-background: '#291714'
  surface-variant: '#fddbd5'
typography:
  display-title:
    fontFamily: Special Elite
    fontSize: 30px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  heading-drawer:
    fontFamily: Special Elite
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: 0.1em
  body-ui:
    fontFamily: Courier Prime
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-stamp:
    fontFamily: Special Elite
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: 0.2em
  micro-caption:
    fontFamily: Courier Prime
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-padding: 2rem
  drawer-width: 384px
  element-gap: 1.5rem
  stack-tight: 0.75rem
  grid-gutter: 1.5rem
---

## Brand & Style
The brand personality is a sophisticated blend of **Tactile Skeuomorphism** and **Neo-Brutalism**. It evokes the sensory experience of physical correspondence—thick paper, heavy ink, and wax seals. The target audience values slow living, intentionality, and analog aesthetics within a digital medium. 

The design style uses "Hard-Brutalist" shadows (6px offsets with high opacity) combined with organic textures and vintage imagery. It avoids the sterile cleanliness of modern SaaS in favor of a "Typewriter & Telegram" aesthetic that feels permanent and personal.

## Colors
The palette is rooted in organic, earthy tones. 
- **Primary (Wax Red):** A bold, saturated red used exclusively for the final action of sealing or critical highlights.
- **Backgrounds:** Utilizes varying shades of "Paper"—off-whites and cream tones that prevent eye strain and provide a textured, non-digital feel.
- **Ink:** Instead of pure black, a deep charcoal-brown (#221210) is used for all text and borders to maintain warmth.
- **Accents:** Muted oranges and ambers represent the physical envelope material.

## Typography
The typography system employs a "mixed-media" approach:
- **Typewriter (Special Elite):** Used for titles, drawer headers, and stamp labels to reinforce the mechanical, printed nature of the interface.
- **Monospace UI (Courier Prime):** Used for instructional text and functional labels to mimic telegram formatting.
- **Serif (Newsreader):** Reserved for long-form content or elegant body text where readability and classic authority are required.

## Layout & Spacing
The layout uses a **Split-Pane Fixed Sidebar** model. 
1. **Canvas Area:** A flexible, centered stage for the primary tactile object (the envelope). It uses a subtle micro-dot background pattern to provide scale.
2. **Stamp Drawer:** A fixed-width (384px) vertical panel for inventory management.
3. **Spacing Rhythm:** Based on a 4px baseline, but heavily reliant on generous whitespace to allow "physical" objects room to breathe. Components are grouped with 12px (stack-tight) or 24px (element-gap) units.

## Elevation & Depth
Depth is expressed through physical simulation rather than soft shadows:
- **Hard Shadows:** Objects "lifted" off the paper use a 6px offset shadow with 85% opacity, creating a brutalist, cut-and-paste aesthetic.
- **Layered Folds:** The envelope uses CSS `clip-path` and varying opacities of its base color to simulate overlapping paper flaps.
- **Inner Depth:** The main canvas uses a large inset shadow (`inset -10px 0 20px rgba(0,0,0,0.03)`) to suggest the drawer is a physical layer sitting on top of the workspace.
- **Glassmorphism:** Used sparingly for functional drop zones (white/20% with backdrop blur) to indicate "slots" waiting to be filled.

## Shapes
The shape language is primarily **Rectilinear with Ornamental Edging**:
- **Base Shapes:** Buttons and containers use a very slight 2px (`0.125rem`) radius, just enough to soften the "paper cut" edges.
- **Stamp Edge:** A custom radial-gradient mask creates the iconic perforated postage stamp edge.
- **Circular Actions:** Functional tools (like the wax seal button) are perfect circles to differentiate "tools" from "content."

## Components
- **Buttons (Primary):** Circular, high-saturation red with a dashed internal border and high-contrast icon. Scale-up on hover, scale-down on active.
- **Stamps (Cards):** Rectangular with a `stamp-edge` border, containing an image with a sepia or desaturated filter. Includes a `Special Elite` label below.
- **Drop Zones:** Dashed borders in `ink-dark` at low opacity, with a subtle backdrop blur.
- **Dividers:** Single-pixel solid lines in `gray-200` or `gray-300`, mimicking the fold lines of a ledger.
- **Input Fields:** Should mimic the look of a typewriter line or a boxed-in ledger cell, utilizing the `Courier Prime` font.