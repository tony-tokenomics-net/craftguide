# Design System: CraftGuide

## Brand Essence
**Industry:** Gaming / Utility (Minecraft Java Edition Build Companion)
**Archetype:** Creator / Jester
**Personality:** Playful, Authentic, Blocky, Helpful, Game-Native
**Voice:** "We speak like a seasoned Minecraft player helping a friend plan their next epic build. We say things like 'This castle needs 342 stone bricks -- here's every layer.' We never say 'Optimize your construction workflow' or anything that sounds like homework."
**Aesthetic:** Standing inside a Minecraft inventory screen at dusk -- stone-gray panels float over a dirt-textured void, gold text glows like enchantment particles, and every edge is sharp enough to cut glass. The UI feels carved from the same blocks you build with: heavy, tactile, pixelated. Nothing is smooth. Nothing is rounded. Everything clicks into place like blocks on a grid.

## 1. Visual Theme & Atmosphere

Dense and game-authentic. Every surface should feel like a texture ripped from the Minecraft resource pack -- stone panels, dirt backgrounds, oak plank accents. The UI is dark and immersive, like playing at night with torches lighting your base. Information is packed tight in inventory-grid fashion: square cells, pixel-font labels, block-color swatches. Whitespace is deliberate but minimal -- this is a game companion, not a magazine layout. Panels sit on dark backgrounds with hard 2px borders. Text glows with the signature Minecraft drop shadow (dark pixel offset behind every light character). The feeling is: you never left the game. You just opened another menu.

## 2. Color Palette & Roles

### Primary Colors -- Stone & Earth
| Token | Value | Usage |
|-------|-------|-------|
| --color-primary | #8B8B8B | Stone gray -- primary UI panels, default surfaces |
| --color-primary-light | #A0A0A0 | Lighter stone -- hover states on panels |
| --color-primary-dark | #6B6B6B | Darker stone -- pressed states, inset panels |
| --color-primary-50 | #C6C6C6 | Light stone -- disabled surface tint |
| --color-primary-100 | #B0B0B0 | Mid-light stone -- subtle panel backgrounds |

### Secondary Colors -- Gold & Enchantment
| Token | Value | Usage |
|-------|-------|-------|
| --color-secondary | #FFAA00 | Minecraft gold -- highlights, selected tabs, important labels, torch glow |
| --color-secondary-light | #FFCC44 | Lighter gold -- hover on gold elements, star fills |
| --color-secondary-dark | #CC8800 | Darker gold -- pressed gold elements, active tab border |

### Accent Colors -- XP Green & Redstone
| Token | Value | Usage |
|-------|-------|-------|
| --color-accent-xp | #55FF55 | XP green -- progress bars, level indicators, completion states |
| --color-accent-redstone | #FF0000 | Redstone red -- active redstone, wiring highlights |
| --color-accent-redstone-dark | #A81414 | Dark redstone -- redstone block color, destructive action base |
| --color-accent-sky | #7BA4DB | Sky blue -- water accents, informational highlights |
| --color-accent-water | rgba(40, 100, 200, 0.5) | Translucent water blue -- overlay effects, info backgrounds |

### Earth Tones -- Dirt, Wood, Grass
| Token | Value | Usage |
|-------|-------|-------|
| --color-earth-dirt | #866043 | Dirt brown -- background texture base color |
| --color-earth-dirt-dark | #6B4E30 | Dark dirt -- deep background areas, footer |
| --color-earth-dirt-darker | #3C2415 | Darkest dirt -- page base background color |
| --color-earth-oak | #BC9862 | Oak plank -- warm accent panels, card headers |
| --color-earth-spruce | #6B4E30 | Spruce plank -- secondary panel accent |
| --color-earth-grass | #6B8E23 | Grass green -- category highlights, nature/outdoor builds |

### Neutral Colors -- Cobblestone Scale
| Token | Value | Usage |
|-------|-------|-------|
| --color-neutral-0 | #FFFFFF | Pure white -- primary text on dark backgrounds |
| --color-neutral-50 | #F0F0F0 | Near-white -- secondary text, subtle labels |
| --color-neutral-100 | #D8D8D8 | Iron gray -- tertiary text, metadata |
| --color-neutral-200 | #B0B0B0 | Mid gray -- borders on light surfaces |
| --color-neutral-300 | #8B8B8B | Stone gray -- panel backgrounds |
| --color-neutral-400 | #7A7A7A | Cobblestone -- default borders, disabled text |
| --color-neutral-500 | #6B6B6B | Dark cobble -- secondary icons |
| --color-neutral-600 | #555555 | Charcoal -- panel inset shadow color |
| --color-neutral-700 | #3A3A3A | Dark panel -- elevated surface backgrounds |
| --color-neutral-800 | #2A2A2A | Obsidian-adjacent -- deep surface layer |
| --color-neutral-900 | #1A1A1A | Near-black -- page body background |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| --color-success | #55FF55 | XP green -- build complete, saved, favorited |
| --color-success-light | #2D4A2D | Dark green tint -- success message background |
| --color-warning | #FFAA00 | Gold -- missing materials, incomplete builds |
| --color-warning-light | #4A3D1A | Dark gold tint -- warning message background |
| --color-error | #FF0000 | Redstone red -- errors, invalid input, delete confirm |
| --color-error-light | #4A1A1A | Dark red tint -- error message background |
| --color-info | #7BA4DB | Sky blue -- tips, help text, informational |
| --color-info-light | #1A2A4A | Dark blue tint -- info message background |

### Surface & Elevation Colors (Dark Mode Only)
| Token | Value | Usage |
|-------|-------|-------|
| --color-bg-base | #3C2415 | Darkest dirt -- page background |
| --color-bg-surface | #4A3A2A | Dirt panel -- primary card/panel background |
| --color-bg-surface-stone | #555555 | Stone panel -- secondary panels, inputs |
| --color-bg-elevated | #6B6B6B | Elevated stone -- dropdowns, tooltips |
| --color-bg-inventory | #8B8B8B | Inventory gray -- grid cell backgrounds |
| --color-bg-overlay | rgba(0, 0, 0, 0.75) | Dark scrim -- modal/dialog overlay |
| --color-bg-slot | #555555 | Inventory slot -- empty grid cell |
| --color-bg-slot-hover | #6B6B6B | Inventory slot hover -- highlighted cell |
| --color-bg-slot-selected | #3A5A3A | Selected slot -- green tint for active selection |

### Minecraft Text Colors
| Token | Value | Usage |
|-------|-------|-------|
| --color-text-primary | #FFFFFF | White text with shadow -- headings, labels |
| --color-text-secondary | #AAAAAA | Gray text -- descriptions, metadata |
| --color-text-gold | #FFAA00 | Gold text -- highlighted info, counts, names |
| --color-text-green | #55FF55 | Green text -- success messages, XP values |
| --color-text-red | #FF5555 | Light red text -- errors, warnings |
| --color-text-aqua | #55FFFF | Aqua text -- links, interactive labels |
| --color-text-shadow | #3F3F3F | Text shadow color -- offset behind all light text |

> **WCAG Note:** This is a game-themed dark UI. Primary text (#FFFFFF) on surface backgrounds (#4A3A2A) achieves 10.2:1 contrast. Gold text (#FFAA00) on surface backgrounds achieves 6.8:1. Both exceed AA requirements. Secondary text (#AAAAAA) on surfaces achieves 5.1:1, meeting AA. Green text (#55FF55) on dark surfaces achieves 9.4:1.

## 3. Typography Rules

### Font Families
| Role | Font | Fallback Stack | Why This Font |
|------|------|----------------|---------------|
| Display | Press Start 2P | 'Silkscreen', 'Courier New', monospace | The definitive pixel bitmap font on Google Fonts -- its 8x8 grid construction directly echoes Minecraft's own typeface. Every letterform is built on a pixel grid, making it feel native to the game's visual language. |
| Body | Press Start 2P | 'Silkscreen', 'Courier New', monospace | Concordant single-font system -- using one pixel font everywhere maintains the illusion that the entire UI is a Minecraft menu screen. Mixing in a smooth font would instantly break immersion. |
| Mono | Press Start 2P | 'Silkscreen', 'Courier New', monospace | Same family for coordinates, block counts, and technical data. The pixel grid naturally reads as monospace-adjacent, keeping numbers aligned. |

### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
```

### Type Scale (Perfect Fourth 1.333 -- adapted for pixel font legibility)
Pixel fonts must be rendered at integer multiples of their base grid to avoid blurring. Press Start 2P is designed on an 8px grid, so all sizes should be multiples of 8px for crisp rendering. The scale below uses pixel-appropriate sizes.

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| --font-size-display | 32px | 400 | 1.4 | 0.05em | Hero titles, app name "CraftGuide" |
| --font-size-h1 | 24px | 400 | 1.4 | 0.04em | Page titles, build names |
| --font-size-h2 | 16px | 400 | 1.5 | 0.03em | Section headers, tab labels |
| --font-size-h3 | 12px | 400 | 1.5 | 0.02em | Card titles, category names |
| --font-size-body | 10px | 400 | 1.8 | 0.02em | Descriptions, body text, tips |
| --font-size-small | 8px | 400 | 1.8 | 0.03em | Metadata, counts, coordinates |
| --font-size-xs | 8px | 400 | 1.6 | 0.04em | Inventory counts, tiny labels |

> **Note:** Press Start 2P only has weight 400. All hierarchy is achieved through size, color, and text-shadow variation -- not weight. This mirrors Minecraft's own type hierarchy, which uses size and color exclusively.

### Text Rendering
```css
/* Pixel-perfect text rendering -- prevents browser anti-aliasing from smoothing the pixel edges */
font-smooth: never;
-webkit-font-smoothing: none;
-moz-osx-font-smoothing: unset;
image-rendering: pixelated;
```

### Minecraft Text Shadow
Every piece of light text on a dark background must have a pixel-offset shadow, replicating Minecraft's signature text rendering.
```css
/* Standard Minecraft text shadow */
text-shadow: 2px 2px 0px #3F3F3F;

/* Gold/colored text shadow -- shadow color is 25% brightness of text color */
/* White (#FFFFFF) -> shadow #3F3F3F */
/* Gold (#FFAA00) -> shadow #3F2A00 */
/* Green (#55FF55) -> shadow #153F15 */
/* Red (#FF5555) -> shadow #3F1515 */
/* Aqua (#55FFFF) -> shadow #153F3F */
```

### Font Pairing Rationale
This is a purely concordant system: one font family across all roles. In a game-themed UI, typographic variety would shatter the illusion. Press Start 2P carries the entire personality -- it IS the brand. Hierarchy is built through size stepping (32px titles down to 8px metadata), Minecraft's own color-coding system (white for primary, gold for highlights, green for success, red for errors), and the signature pixel text shadow. This mirrors how Minecraft itself handles all text: one font, multiple colors, one shadow style.

## 4. Component Stylings

### Buttons -- Minecraft Stone Button
Minecraft buttons use a beveled 3D illusion: lighter border on top and left, darker border on bottom and right, flat stone-gray fill. No rounded corners. Ever.

| Variant | Background | Text | Border-Top/Left | Border-Bottom/Right | Padding |
|---------|------------|------|-----------------|---------------------|---------|
| Primary (Stone) | #8B8B8B | #FFFFFF with text-shadow | 2px solid #A0A0A0 | 2px solid #555555 | 8px 16px |
| Active (Gold) | #FFAA00 | #FFFFFF with text-shadow | 2px solid #FFCC44 | 2px solid #CC8800 | 8px 16px |
| Danger (Redstone) | #A81414 | #FFFFFF with text-shadow | 2px solid #CC2020 | 2px solid #7A0E0E | 8px 16px |
| Disabled | #6B6B6B | #999999 | 2px solid #7A7A7A | 2px solid #555555 | 8px 16px |

**Button CSS Pattern:**
```css
.mc-button {
  background-color: #8B8B8B;
  color: #FFFFFF;
  text-shadow: 2px 2px 0px #3F3F3F;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  padding: 8px 16px;
  border: none;
  border-top: 2px solid #A0A0A0;
  border-left: 2px solid #A0A0A0;
  border-bottom: 2px solid #555555;
  border-right: 2px solid #555555;
  border-radius: 0;
  cursor: pointer;
  image-rendering: pixelated;
}

.mc-button:hover {
  background-color: #9A9A9A;
  border-top-color: #B0B0B0;
  border-left-color: #B0B0B0;
}

.mc-button:active {
  background-color: #6B6B6B;
  border-top: 2px solid #555555;
  border-left: 2px solid #555555;
  border-bottom: 2px solid #A0A0A0;
  border-right: 2px solid #A0A0A0;
}
```

### Cards -- Stone/Dirt Panels
| Variant | Background | Border | Shadow | Padding |
|---------|------------|--------|--------|---------|
| Stone Panel | #555555 | 2px solid #3A3A3A, inset highlight 2px #6B6B6B top/left | None (beveled borders replace shadows) | 12px |
| Dirt Panel | #4A3A2A | 2px solid #3C2415, inset highlight 2px #5A4A3A top/left | None | 12px |
| Inventory Panel | #8B8B8B | 2px solid #555555 outer, 2px solid #A0A0A0 inner top/left | None | 8px |
| Build Card | #4A3A2A | 2px solid #3C2415 | None | 0px (image flush top, text area 8px padding) |

**Card CSS Pattern:**
```css
.mc-panel {
  background-color: #555555;
  border: 2px solid #3A3A3A;
  border-top-color: #6B6B6B;
  border-left-color: #6B6B6B;
  border-radius: 0;
  padding: 12px;
}
```

### Inputs -- Dark Inset Fields
| State | Background | Border | Text Color |
|-------|------------|--------|------------|
| Default | #2A2A2A | 2px solid #1A1A1A (inset: lighter bottom/right #3A3A3A) | #AAAAAA (placeholder) |
| Focus | #2A2A2A | 2px solid #FFAA00 | #FFFFFF |
| Error | #2A2A2A | 2px solid #FF0000 | #FF5555 |
| Disabled | #3A3A3A | 2px solid #2A2A2A | #555555 |

```css
.mc-input {
  background-color: #2A2A2A;
  color: #FFFFFF;
  text-shadow: 1px 1px 0px #3F3F3F;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  padding: 8px 12px;
  border: 2px solid #1A1A1A;
  border-bottom-color: #3A3A3A;
  border-right-color: #3A3A3A;
  border-radius: 0;
  outline: none;
}

.mc-input:focus {
  border-color: #FFAA00;
}
```

### Navigation -- Creative Inventory Tabs
Tabs styled like Minecraft's creative inventory: selected tab extends above the panel with a connected background, unselected tabs sit slightly below.

| State | Background | Text | Border | Position |
|-------|------------|------|--------|----------|
| Active Tab | #8B8B8B (matches panel) | #FFFFFF | 2px solid matching panel, no bottom border | Extends 4px above panel top edge |
| Inactive Tab | #555555 | #AAAAAA | 2px solid #3A3A3A | Sits 4px below active tab baseline |
| Hover (Inactive) | #6B6B6B | #FFFFFF | 2px solid #555555 | Same position as inactive |

### Inventory Grid -- Block Material List
The signature CraftGuide component. Displays required materials as a grid of square cells mimicking Minecraft's inventory.

| Property | Value |
|----------|-------|
| Cell size | 48px x 48px |
| Cell background | #555555 |
| Cell border | 1px solid #3A3A3A inset (darker top/left, lighter bottom/right) |
| Grid gap | 2px |
| Block color swatch | 32px x 32px centered in cell |
| Count text | 8px, #FFFFFF, positioned bottom-right of cell with text-shadow |
| Hover | Cell background brightens to #6B6B6B |
| Grid container | #8B8B8B background, 4px padding, 2px solid #6B6B6B border |

```css
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(9, 48px); /* Minecraft inventory is 9 wide */
  gap: 2px;
  background: #8B8B8B;
  padding: 4px;
  border: 2px solid #555555;
  border-top-color: #A0A0A0;
  border-left-color: #A0A0A0;
}

.inventory-slot {
  width: 48px;
  height: 48px;
  background: #555555;
  border: 1px solid #3A3A3A;
  border-bottom-color: #6B6B6B;
  border-right-color: #6B6B6B;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inventory-slot .block-swatch {
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
}

.inventory-slot .count {
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  color: #FFFFFF;
  text-shadow: 2px 2px 0px #3F3F3F;
}
```

### Tooltips -- Minecraft Item Tooltip
| Property | Value |
|----------|-------|
| Background | #100010 (Minecraft's purple-black tooltip background) |
| Border | 2px solid #5000A0 (purple gradient border, Minecraft-authentic) |
| Text | #FFFFFF, 10px, text-shadow |
| Item name color | #FFAA00 (gold, like rare items) |
| Description color | #AAAAAA |
| Padding | 6px 8px |
| Max width | 280px |
| Arrow | None (Minecraft tooltips don't have arrows) |

### Layer Slider
| Property | Value |
|----------|-------|
| Track background | #555555, 8px height, 0 border-radius |
| Track border | 1px solid #3A3A3A |
| Thumb | 20px x 20px square, #FFAA00 background, beveled borders (lighter top/left, darker bottom/right) |
| Active track fill | #55FF55 (XP green) |
| Label | Current layer number in 10px pixel font above thumb |

### Progress Bar -- XP Bar
| Property | Value |
|----------|-------|
| Track | #3A3A3A background, 12px height, 0 border-radius, 1px solid #2A2A2A |
| Fill | #55FF55 (XP green), 0 border-radius |
| Label | Percentage or "Layer 5/12" centered in pixel font |

## 5. Layout Principles

### Spacing Scale (4px grid -- dense game UI)
| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 2px | Grid cell gaps, pixel-level adjustments |
| --space-2 | 4px | Inventory grid gaps, tight internal padding |
| --space-3 | 8px | Button padding, card internal padding, icon-label gaps |
| --space-4 | 12px | Panel padding, form field gaps |
| --space-5 | 16px | Section padding, component spacing |
| --space-6 | 24px | Section margins, major component gaps |
| --space-8 | 32px | Page section dividers |
| --space-10 | 48px | Hero padding, major separations |
| --space-12 | 64px | Page-level vertical breathing room |

### Grid System
| Property | Value |
|----------|-------|
| Columns | 12 |
| Gutter | 8px |
| Margin (mobile) | 8px |
| Margin (desktop) | 16px |
| Max content width | 1200px |
| Breakpoints | sm: 480px, md: 768px, lg: 1024px, xl: 1280px |

### Page Layouts

**Home Screen:**
```
+--------------------------------------------------+
|  [CraftGuide logo]    [Search]    [My Builds] [?] |
+--------------------------------------------------+
|  YOUR BUILD COMPANION                              |
|                                                    |
|  [Category Tabs: All | Castles | Farms | Redstone] |
|                                                    |
|  +--------+ +--------+ +--------+ +--------+      |
|  | Build  | | Build  | | Build  | | Build  |      |
|  | Card   | | Card   | | Card   | | Card   |      |
|  | [img]  | | [img]  | | [img]  | | [img]  |      |
|  | Name   | | Name   | | Name   | | Name   |      |
|  | ⛏️x2   | | ⛏️x1   | | ⛏️x3   | | ⛏️x2   |      |
|  +--------+ +--------+ +--------+ +--------+      |
+--------------------------------------------------+
```
- Build cards in responsive grid: 4 columns desktop, 3 tablet, 2 mobile
- Category tabs styled as Minecraft creative inventory tabs
- Search bar styled as dark inset input with gold focus border

**Build Detail (Desktop):**
```
+--------------------------------------------------+
|  [< Back]  Build Name              [♥] [Share]    |
+--------------------------------------------------+
|                          |                         |
|   3D Viewer              |  [Instructions]         |
|   (60% width)            |  [Materials] [Tips]     |
|                          |  +-----------------+    |
|   [Orbit/Zoom controls]  |  | Tab content     |    |
|                          |  |                 |    |
|   Layer: [====|====]     |  | Inventory grid  |    |
|          Layer 5/12      |  | or step list    |    |
|                          |  +-----------------+    |
+--------------------------------------------------+
```
- 3D viewer takes 60% left, info panel 40% right
- Tab navigation for Instructions / Materials / Tips
- Layer slider below 3D viewer

**Build Detail (Mobile):**
```
+------------------------+
|  [<] Build Name   [♥]  |
+------------------------+
|                        |
|   3D Viewer            |
|   (full width)         |
|                        |
|   Layer: [====|====]   |
+------------------------+
|  [Instructions]        |
|  [Materials] [Tips]    |
|  +------------------+  |
|  | Tab content      |  |
|  |                  |  |
|  +------------------+  |
+------------------------+
```

### Whitespace Rules
- Minimum 8px between any two interactive elements (touch target clearance)
- Panel internal padding: 12px (stone panels), 8px (inventory containers)
- Section-to-section vertical spacing: 24px minimum
- No content touches the viewport edge: minimum 8px margin on mobile
- Build card grid gap: 8px (tight, game-authentic)
- Pixel fonts need more line-height than smooth fonts: minimum 1.6 for body text

## 6. Borders & Shadows

### Border System -- Beveled, Not Shadowed
Minecraft uses beveled borders (lighter top/left, darker bottom/right) to create depth instead of CSS box-shadows. This system follows that convention.

| Token | Value | Usage |
|-------|-------|-------|
| --border-width-default | 2px | Standard panel/button borders |
| --border-width-thin | 1px | Inventory cell borders, subtle dividers |
| --border-width-thick | 3px | Focus states, emphasis borders |
| --border-color-highlight | #A0A0A0 | Top/left beveled edge (light catches) |
| --border-color-shadow | #555555 | Bottom/right beveled edge (shadow) |
| --border-color-panel | #3A3A3A | Standard panel outline |
| --border-color-dark | #1A1A1A | Inset input borders, deep shadows |
| --border-color-gold | #FFAA00 | Focus rings, selected state borders |
| --border-color-tooltip | #5000A0 | Tooltip purple border |

### Shadow System -- Text Shadow Only
Traditional box-shadows are not used in this design system. All depth is achieved through beveled borders (see above). The only shadows are Minecraft-style text shadows.

| Token | Value | Usage |
|-------|-------|-------|
| --text-shadow-default | 2px 2px 0px #3F3F3F | Standard white text on dark backgrounds |
| --text-shadow-gold | 2px 2px 0px #3F2A00 | Gold (#FFAA00) text |
| --text-shadow-green | 2px 2px 0px #153F15 | Green (#55FF55) text |
| --text-shadow-red | 2px 2px 0px #3F1515 | Red (#FF5555) text |
| --text-shadow-aqua | 2px 2px 0px #153F3F | Aqua (#55FFFF) text |
| --text-shadow-none | none | Text on light backgrounds or disabled text |

### Elevation via Background Color (No Box Shadows)
| Level | Background | Border Treatment | Usage |
|-------|------------|-----------------|-------|
| Z0 (base) | #3C2415 | None | Page background |
| Z1 (surface) | #4A3A2A | 2px beveled | Cards, primary panels |
| Z2 (raised) | #555555 | 2px beveled | Stone panels, inputs |
| Z3 (elevated) | #6B6B6B | 2px beveled | Dropdowns, tooltips |
| Z4 (overlay) | #8B8B8B | 2px beveled, thicker | Modals, dialogs |

### Border Radius Convention
| Token | Value | Usage |
|-------|-------|-------|
| --radius-none | 0px | Everything. All components. No exceptions. |

> **Minecraft is made of cubes. So is CraftGuide.** There are zero rounded corners in this design system. Not on buttons. Not on cards. Not on inputs. Not on avatars. Not on progress bars. Not on anything. If it has a `border-radius` greater than `0`, it does not belong in this UI.

## 7. Interaction States

### State Transitions -- Snappy, Not Smooth
Minecraft UI has no easing curves. States change instantly. The pixel aesthetic demands hard cuts, not gentle fades. The **only exception** is the 3D viewer, which uses smooth orbit/zoom for usability.

| State | Visual Change | Transition |
|-------|---------------|------------|
| Hover (buttons) | Background lightens one step, highlight borders brighten | **Instant** (0ms, no transition) |
| Active/Pressed (buttons) | Borders invert (shadow becomes highlight, highlight becomes shadow), background darkens | **Instant** |
| Focus | 3px solid #FFAA00 outline (gold), no offset | **Instant** |
| Disabled | 50% opacity, cursor: not-allowed, desaturated colors | None |
| Loading | Pixel-art animation (spinning pickaxe or pulsing block), no smooth spinners | Frame-stepped (CSS steps() timing) |
| Selected (inventory slot) | Background changes to #3A5A3A (green tint), 2px gold border | **Instant** |
| Favorited (heart) | Pixel heart fills from outline to solid red #FF5555 | **Instant** |

### 3D Viewer Interactions (Exception: Smooth)
| Interaction | Behavior | Transition |
|-------------|----------|------------|
| Orbit (click-drag) | Rotate camera around build center | 60fps smooth, momentum-based |
| Zoom (scroll/pinch) | Camera moves in/out | Smooth, clamped min/max |
| Layer filter (slider) | Show/hide layers from top down | Instant layer visibility toggle |
| Block hover | Highlighted block outline, tooltip with block name | Instant highlight, tooltip at cursor |
| Reset view | Return to default camera angle | 300ms ease-out (the only eased animation) |

### Hover Feedback Pattern
```css
/* Standard Minecraft-style hover -- NO transitions */
.mc-interactive {
  transition: none;
}

.mc-interactive:hover {
  /* Lighten background one step */
  /* Brighten highlight borders */
  /* Change is instant */
}

/* 3D viewer exception */
.viewer-3d {
  transition: transform 0.3s ease-out;
}
```

## 8. Imagery & Photography

### Style Direction
**Treatment:** Pixel Art / Game-Authentic Renders
**Lighting:** Minecraft-style ambient -- flat lighting with simple directional shadows (no global illumination)
**Mood:** Fun, inspiring, "I want to build that"
**Color:** Minecraft palette-faithful -- block colors should match in-game values
**Subjects:** Minecraft builds (isometric or perspective renders), block textures, game UI elements
**Composition:** Isometric 3/4 view for build previews, straight-on for UI textures

### Build Preview Images
| Property | Value |
|----------|-------|
| Style | Isometric or slight perspective render of the Minecraft build |
| Background | Transparent or simple gradient (sky blue #7BA4DB to white) |
| Lighting | Simple directional, matching Minecraft's in-game lighting |
| Resolution | 480x480px (1:1 square) for card thumbnails, 960x540px (16:9) for detail hero |
| Format | PNG with transparency for compositing, WebP for production |
| Rendering | Voxel-style with visible block grid -- NOT smooth/realistic 3D |

### UI Texture Tiles
| Texture | Base Color | Usage | Tile Size |
|---------|------------|-------|-----------|
| Dirt | #866043 | Page backgrounds, dark panels | 64x64px, repeating |
| Stone | #8B8B8B | Button faces, standard panels | 64x64px, repeating |
| Cobblestone | #7A7A7A | Secondary panels, borders | 64x64px, repeating |
| Oak Planks | #BC9862 | Warm accent panels, headers | 64x64px, repeating |
| Dark Oak Planks | #3E2912 | Footer, deep backgrounds | 64x64px, repeating |
| Obsidian | #0F0A18 | Modal overlays, darkest surfaces | 64x64px, repeating |

> **Textures are optional enhancement.** The design works with flat colors alone. Textures (if used) should be subtle, low-opacity overlays on the flat color -- not full-saturation game textures that make text unreadable. Recommended: 10-20% opacity texture overlay on flat background color.

### AI Image Generation Prompt Template
> Pixel art isometric Minecraft build, [SUBJECT DESCRIPTION], constructed from visible cubic voxel blocks. Minecraft color palette: stone gray #8B8B8B, oak plank #BC9862, cobblestone #7A7A7A, dirt brown #866043. Simple directional lighting from upper-left. Transparent background or gradient sky (#7BA4DB to white). Clean block edges, no anti-aliasing, pixel-perfect rendering. Game-authentic aesthetic, NOT realistic 3D. Resolution: 960x540px. --ar 16:9

### Aspect Ratios
| Context | Ratio | Resolution |
|---------|-------|------------|
| Build card thumbnail | 1:1 | 480x480px |
| Build detail hero | 16:9 | 960x540px |
| 3D viewer container | 4:3 | Responsive (fills container) |
| OG/share image | 1.91:1 | 1200x630px |
| Mobile build preview | 16:9 | 720x405px |

## 9. Iconography

### Category Icons
| Category | Icon | Unicode/Emoji |
|----------|------|---------------|
| All Builds | Grid of 4 blocks | Custom pixel art |
| Castles & Forts | Crossed swords | U+2694 |
| Houses & Villages | House/door | Custom pixel art |
| Farms & Gardens | Wheat/plant | Custom pixel art |
| Vehicles & Ships | Ship | U+1F6A2 |
| Redstone & Machines | Lightning bolt | U+26A1 |
| Bridges & Structures | Bridge arch | Custom pixel art |
| Pixel Art | Paint palette | Custom pixel art |
| Survival Builds | Shield | Custom pixel art |

### Difficulty Icons
| Level | Display | Meaning |
|-------|---------|---------|
| Easy | One pickaxe | Simple builds, few materials, 1-2 layers |
| Medium | Two pickaxes | Moderate complexity, multiple block types |
| Hard | Three pickaxes | Complex builds, redstone, many layers |

### Icon Style
| Property | Value |
|----------|-------|
| Style | Pixel art, 16x16 or 32x32 base grid |
| Stroke | None (filled pixel shapes) |
| Corner style | Square (0px radius, pixel grid) |
| Size scale | 16px (inline), 24px (navigation), 32px (category headers), 48px (feature icons) |
| Default color | #AAAAAA (inactive), #FFFFFF (active), #FFAA00 (highlighted) |
| Rendering | `image-rendering: pixelated` -- prevents browser smoothing |

### Pixel Heart (Favorite)
```
/* 16x16 pixel heart grid -- render as CSS or inline SVG */
Outline:  #555555 (unfavorited)
Filled:   #FF5555 (favorited)
Shadow:   2px 2px #3F1515 (when filled)
```

## 10. Design Principles

### Do
- **Stay in-game:** Every UI element should feel like it belongs inside Minecraft's menu system. If it looks like it came from a different app, redesign it.
- **Use beveled borders for depth:** Lighter top/left, darker bottom/right. This is how Minecraft creates the illusion of 3D buttons and panels without drop shadows.
- **Keep transitions instant:** State changes (hover, press, select) happen in one frame. Pixel art does not ease. The only exception is the 3D viewer.
- **Make block colors accurate:** When showing materials, use the actual Minecraft block colors. A stone brick that looks blue will confuse players.
- **Respect the pixel grid:** All text sizes should be multiples of the font's base grid. All spacing should land on the 4px grid. Pixel fonts blur at non-integer scales.
- **Use Minecraft's color-coding:** White for normal text, gold for important items, green for success/XP, red for danger, aqua for links. Players already know this language.
- **Make the inventory grid feel real:** 9-wide columns, square cells, count in bottom-right, block swatch centered. If a Minecraft player doesn't immediately recognize it as an inventory, iterate.
- **Keep it fun and encouraging:** This is a tool for a 13-year-old to plan cool builds. Language should be enthusiastic, not instructional. "Epic Castle" not "Structure #47."

### Don't
- **Never round corners:** Zero border-radius on everything. A rounded button in this UI is like a smooth block in Minecraft -- it doesn't exist and it shouldn't.
- **Never use smooth fonts:** No sans-serif, no serif, no handwriting fonts. Everything is Press Start 2P or it's wrong. The pixel font IS the brand.
- **Never use CSS transitions on UI elements:** No `transition: all 0.3s ease`. Hover states snap. Press states snap. Selection states snap. Smooth animations belong to corporate SaaS, not game UIs.
- **Never use drop shadows:** `box-shadow` is banned. Depth comes from beveled borders and background color stepping. This is Minecraft's visual language.
- **Never make it feel like homework:** No formal language, no corporate UX patterns (breadcrumbs, hamburger menus, "dashboard" terminology). This is a game companion. Use game language: "builds," "materials," "layers," "crafting."
- **Never break immersion with stock UI components:** Default browser checkboxes, radio buttons, selects, and scrollbars should all be restyled or hidden. An unstyled `<select>` dropdown will instantly break the Minecraft illusion.
- **Never use smooth/realistic 3D rendering for previews:** Build previews should look voxel/blocky. Smooth meshes, realistic lighting, and anti-aliased edges break the game-authentic feel.
- **Never put pixel font text below 8px:** Press Start 2P becomes unreadable below 8px. If the information needs to be smaller, consider hiding it behind a tooltip instead.

## Appendix A: Block Color Reference Map

Complete color map for rendering Minecraft blocks as solid-color cubes in the 3D viewer. These values approximate the dominant color of each block's texture.

### Building Blocks
| Block ID | Color | Hex/RGBA |
|----------|-------|----------|
| stone | Stone Gray | #8B8B8B |
| cobblestone | Dark Stone | #7A7A7A |
| stone_bricks | Brick Gray | #7D7D7D |
| mossy_stone_bricks | Mossy Gray-Green | #6B7D5E |
| brick | Terracotta Red | #966A5B |
| nether_bricks | Dark Nether Purple | #2D1520 |
| obsidian | Deep Void Purple | #0F0A18 |
| iron_block | Bright Iron | #D8D8D8 |
| gold_block | Rich Gold | #F8D64E |
| sand | Warm Sand | #DBD3A0 |
| glass | Translucent Pale Blue | rgba(200, 230, 255, 0.3) |

### Wood Variants
| Block ID | Color | Hex |
|----------|-------|-----|
| oak_planks | Warm Oak | #BC9862 |
| spruce_planks | Dark Spruce | #6B4E30 |
| birch_planks | Light Birch | #C5B77B |
| dark_oak_planks | Dark Mahogany | #3E2912 |
| oak_log | Log Brown | #6B5433 |
| oak_door | Door Brown | #8B6F47 |
| oak_fence | Fence Oak | #BC9862 |
| chest | Chest Brown | #A0692B |

### Natural Blocks
| Block ID | Color | Hex |
|----------|-------|-----|
| grass_block | Grass Green | #6B8E23 |
| dirt | Dirt Brown | #866043 |
| water | Translucent Deep Blue | rgba(40, 100, 200, 0.5) |
| lava | Molten Orange | #CF4A0C |

### Redstone & Mechanical
| Block ID | Color | Hex |
|----------|-------|-----|
| redstone_block | Dark Redstone | #A81414 |
| redstone_dust | Bright Red | #FF0000 |
| tnt | TNT Red | #DB2B00 |
| piston | Piston Tan | #9E8B63 |
| sticky_piston | Sticky Green | #6B9E3B |
| hopper | Dark Iron | #4A4A4A |
| dispenser | Dispenser Gray | #8B8B8B |

### Utility & Decorative
| Block ID | Color | Hex |
|----------|-------|-----|
| torch | Torch Flame Gold | #FFAA00 |
| glowstone | Amber Glow | #AB8432 |
| wool_white | Soft White | #E8E8E8 |
| wool_red | Wool Red | #A12722 |

## Appendix B: CSS Custom Properties Summary

```css
:root {
  /* === TYPOGRAPHY === */
  --font-family-primary: 'Press Start 2P', 'Silkscreen', 'Courier New', monospace;
  --font-size-display: 32px;
  --font-size-h1: 24px;
  --font-size-h2: 16px;
  --font-size-h3: 12px;
  --font-size-body: 10px;
  --font-size-small: 8px;
  --font-size-xs: 8px;

  /* === PRIMARY COLORS === */
  --color-primary: #8B8B8B;
  --color-primary-light: #A0A0A0;
  --color-primary-dark: #6B6B6B;
  --color-primary-50: #C6C6C6;
  --color-primary-100: #B0B0B0;

  /* === SECONDARY COLORS === */
  --color-secondary: #FFAA00;
  --color-secondary-light: #FFCC44;
  --color-secondary-dark: #CC8800;

  /* === ACCENT COLORS === */
  --color-accent-xp: #55FF55;
  --color-accent-redstone: #FF0000;
  --color-accent-redstone-dark: #A81414;
  --color-accent-sky: #7BA4DB;

  /* === EARTH TONES === */
  --color-earth-dirt: #866043;
  --color-earth-dirt-dark: #6B4E30;
  --color-earth-dirt-darker: #3C2415;
  --color-earth-oak: #BC9862;
  --color-earth-spruce: #6B4E30;
  --color-earth-grass: #6B8E23;

  /* === NEUTRALS === */
  --color-neutral-0: #FFFFFF;
  --color-neutral-50: #F0F0F0;
  --color-neutral-100: #D8D8D8;
  --color-neutral-200: #B0B0B0;
  --color-neutral-300: #8B8B8B;
  --color-neutral-400: #7A7A7A;
  --color-neutral-500: #6B6B6B;
  --color-neutral-600: #555555;
  --color-neutral-700: #3A3A3A;
  --color-neutral-800: #2A2A2A;
  --color-neutral-900: #1A1A1A;

  /* === SEMANTIC === */
  --color-success: #55FF55;
  --color-success-light: #2D4A2D;
  --color-warning: #FFAA00;
  --color-warning-light: #4A3D1A;
  --color-error: #FF0000;
  --color-error-light: #4A1A1A;
  --color-info: #7BA4DB;
  --color-info-light: #1A2A4A;

  /* === SURFACES === */
  --color-bg-base: #3C2415;
  --color-bg-surface: #4A3A2A;
  --color-bg-surface-stone: #555555;
  --color-bg-elevated: #6B6B6B;
  --color-bg-inventory: #8B8B8B;
  --color-bg-overlay: rgba(0, 0, 0, 0.75);
  --color-bg-slot: #555555;
  --color-bg-slot-hover: #6B6B6B;
  --color-bg-slot-selected: #3A5A3A;

  /* === TEXT === */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #AAAAAA;
  --color-text-gold: #FFAA00;
  --color-text-green: #55FF55;
  --color-text-red: #FF5555;
  --color-text-aqua: #55FFFF;
  --color-text-shadow: #3F3F3F;

  /* === TEXT SHADOWS === */
  --text-shadow-default: 2px 2px 0px #3F3F3F;
  --text-shadow-gold: 2px 2px 0px #3F2A00;
  --text-shadow-green: 2px 2px 0px #153F15;
  --text-shadow-red: 2px 2px 0px #3F1515;
  --text-shadow-aqua: 2px 2px 0px #153F3F;

  /* === BORDERS === */
  --border-width-default: 2px;
  --border-width-thin: 1px;
  --border-width-thick: 3px;
  --border-color-highlight: #A0A0A0;
  --border-color-shadow: #555555;
  --border-color-panel: #3A3A3A;
  --border-color-dark: #1A1A1A;
  --border-color-gold: #FFAA00;
  --border-color-tooltip: #5000A0;

  /* === SPACING === */
  --space-1: 2px;
  --space-2: 4px;
  --space-3: 8px;
  --space-4: 12px;
  --space-5: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 48px;
  --space-12: 64px;

  /* === RADIUS === */
  --radius-none: 0px;
  /* That's it. That's the whole radius system. */

  /* === SIZING === */
  --inventory-cell-size: 48px;
  --inventory-swatch-size: 32px;
  --inventory-columns: 9;
  --slider-track-height: 8px;
  --slider-thumb-size: 20px;
}
```
