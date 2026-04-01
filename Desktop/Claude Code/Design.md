# Design System Document: The Tactile Nostalgic Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Scrapbook"**

This design system rejects the clinical, "app-like" perfection of modern SaaS interfaces in favor of something visceral, cozy, and profoundly human. We are moving away from the "digital screen" and toward the "physical desk." By blending mid-century editorial layouts with 90s sticker-book playfulness, we create an experience that feels collected rather than engineered.

To break the "template" look, we utilize **Intentional Asymmetry**. Elements should never feel perfectly centered or trapped in a rigid grid. We employ overlapping containers, varied border radii, and "sticker-style" offsets to create a layout that feels like it was hand-placed on a vintage desk. This is high-end nostalgia: sophisticated in its execution, but casual in its soul.

---

## 2. Colors & Surface Philosophy

Our palette is anchored in a "Vintage Paper" foundation, utilizing warm, desaturated tones that reduce eye strain and invite the user into a comfortable space.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Traditional dividers are prohibited.
Structure must be achieved through:
1. **Tonal Shifts:** Placing a `surface-container-low` (#F9F3EA) block against a `surface` (#FFF9F0) background.
2. **Negative Space:** Using the Spacing Scale (specifically `8` or `10`) to let the eye breathe between content clusters.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers.
- **Base Layer:** `surface` (#FFF9F0)
- **Secondary Areas:** `surface-container` (#F3EDE4)
- **Elevated Components:** `surface-container-highest` (#E7E2D9)
By nesting a "Highest" container inside a "Low" container, you create depth without using artificial shadows.

### The "Glass & Gradient" Rule
While the vibe is retro, the execution is premium.
- Use **Glassmorphism** for floating headers or navigation bars: `surface` color at 80% opacity with a `20px` backdrop-blur. This ensures the warm cream background bleeds through, softening the interface.
- **Signature Textures:** Use subtle linear gradients on primary CTAs, transitioning from `primary` (#9B4500) to `primary-container` (#FF8C42). This adds "soul" and a tactile, screen-printed quality.

---

## 3. Typography: The Editorial Voice

The contrast between our chunky, charismatic display faces and our clean, rounded body text creates an "Illustrated Magazine" feel.

* **Display & Headlines (Epilogue):** These are our "Bold Statements." Use `display-lg` for hero moments with tight letter-spacing (-2%). The weight of Epilogue provides the "Bungee/Fredoka" chunky retro feel while maintaining professional architectural integrity.
* **Body & Titles (Plus Jakarta Sans):** Chosen for its friendly, open apertures. It maintains the "rounded" requirement without sacrificing readability at small scales.
* **The Hierarchy Goal:** Headlines should be significantly larger than body text (e.g., a `3.5rem` display vs. a `1rem` body) to create a clear, authoritative editorial rhythm.

---

## 4. Elevation & Depth: The 2D Sticker Look

We achieve depth not through realistic lighting, but through **Graphic Displacement.**

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift.

### Flat Retro Shadows
When an element needs to "pop" (like a Primary Button or a Featured Card), use a **Flat Offset Shadow**:
- **Offset:** `4px 4px` or `8px 8px`
- **Color:** `on-surface` (#1D1B16) at 15% opacity.
- **Blur:** 0px.
This creates the "2D Patch" look requested, making elements feel like thick cardstock or vinyl stickers.

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**: `outline-variant` (#DDC1B3) at 20% opacity. 100% opaque borders are strictly forbidden as they break the soft, nostalgic atmosphere.

---

## 5. Components

### Buttons
* **Primary:** Background `primary-container` (#FF8C42), text `on-primary-container` (#6A2D00). Large `DEFAULT` (1rem) roundness. Apply the Flat Retro Shadow.
* **Secondary:** Background `secondary-container` (#9FEFFE). No shadow.
* **State:** On hover, the Flat Offset Shadow should increase from `4px` to `6px`, and the element should shift `-2px` on both axes to simulate being pressed.

### Cards
* **The Sticker Card:** Use `surface-container-low`. Apply `lg` (2rem) corner radius. Forbid dividers. Separate header and body text using a `3` (1rem) spacing unit.
* **Floating State:** Use Glassmorphism (80% opacity + blur) for cards that appear over hero imagery.

### Input Fields
* **Styling:** Soft `surface-container-highest` background. Instead of a full border, use a thick `2px` bottom border in `primary` (#9B4500) to mimic a vintage form.
* **Focus:** The background shifts to `surface-container-lowest` (pure white) to indicate activity.

### Additional Signature Component: "The Badge"
* For tags or categories, use the `full` roundness (pilled shape) with `tertiary-container` (#D4A407). These should look like physical "patches" sewn onto the interface.

---

## 6. Do's and Don'ts

### Do
* **DO** use "Sticker" placement: Tilt icons or badges by 1-3 degrees occasionally to break the digital grid.
* **DO** use high-contrast spacing: Give elements room to breathe. When in doubt, use more white space than you think you need.
* **DO** use the `primary-fixed-dim` for subtle background accents behind text to highlight keywords.

### Don't
* **DON'T** use pure black (#000000). Always use `on-background` (#1D1B16) to maintain the warmth of the vintage paper.
* **DON'T** use sharp 90-degree corners. Everything must have at least the `sm` (0.5rem) radius to stay "friendly."
* **DON'T** use standard Material Design drop shadows. If it looks like a "glow," it’s wrong for this system. It must look like an "offset."