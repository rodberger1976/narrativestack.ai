# Narrative Stack — Imagery Color Correction Guide

**Version 1.1 · May 2026 · Companion document to the Style Guide**

This document is the operational guide for color-correcting any incoming imagery to fit the Narrative Stack Y2 palette. Use it whenever you source stock photography, commission illustration, or import existing imagery into the brand system.

---

## The three registers

Every piece of brand imagery must belong to one of three registers. Identify the register first, then apply the appropriate color correction.

### Register 01 — Atmospheric

**Function:** Mood, depth, contemplation, the weight of the work.

**Typical subjects:** Fog, smoke, mist, deep landscapes at dawn or dusk, mountains, water, the lone figure in vast space.

**Color target:** Dark Blue (`#183048`) tonal dominance. Allow natural variation in shadow and highlight, but the overall image should read as living in the brand's deep-blue family.

**Color corrections:**
- Pure black backgrounds → shift toward Dark Blue (`#183048`)
- Warm orange skies → either keep as a Coral spark if narratively meaningful, or desaturate toward Dark Blue if the warmth is incidental
- Generic navy or slate → normalize to Dark Blue (`#183048`)
- Pure white skies or surfaces → soften to Paper (`#FAFAF7`)
- Any green vegetation in landscapes → desaturate significantly toward neutral gray-blue

### Register 02 — Fluid

**Function:** Narrative as flow, the methodology in motion, the sensation of story.

**Typical subjects:** Ribbons, waves, topographic lines, painterly chasms with figures, layered horizontal forms.

**Color target:** Dark Blue + Azure as the primary pair, with Coral introduced sparingly as a single warm thread.

**Color corrections:**
- Red ribbons or red flowing elements → Coral (`#FF7559`)
- Generic blue ribbons → Azure (`#2FC4DD`) if they're meant to read as active/system, or Mid Blue (`#3A6FB0`) if they're carrying flow
- Black ribbons → Dark Blue (`#183048`)
- Multi-color flowing forms → reduce to the three-color system: Dark Blue dominant, Azure secondary, Coral sparingly
- Topographic line patterns → Dark Blue lines on Paper background, or Paper lines on Dark Blue background

### Register 03 — Architectural

**Function:** Systems, frameworks, infrastructure, the methodology as built object.

**Typical subjects:** Network diagrams, node-and-edge structures, circular stacks of books seen from above, layered geometric forms.

**Color target:** Dark Blue dominant with Azure for active/system nodes, Coral for human anchor points.

**Color corrections:**
- Red nodes in network diagrams → Coral (`#FF7559`), reserved for the human anchor or key insight points
- Generic blue nodes → Azure (`#2FC4DD`) for active connections, Dark Blue for structural elements
- Multi-color network diagrams → reduce to: Dark Blue (structure), Azure (active links), Coral (human anchor, used sparingly)
- White backgrounds → Paper (`#FAFAF7`)
- Pure black structural elements → Dark Blue (`#183048`)

---

## Universal color correction rules

Apply these regardless of register:

| Source color | Correct to | Notes |
|--------------|------------|-------|
| Pure red (e.g., `#FF0000`, `#D72638`) | Coral `#FF7559` | The brand has no red. All red shifts to Coral. |
| Bright cyan / teal | Azure `#2FC4DD` | Normalize to the brand's specific cyan. |
| Generic navy | Dark Blue `#183048` | The brand's blue is specific. Don't approximate. |
| Pure white `#FFFFFF` | Paper `#FAFAF7` | The warmth is intentional, never sterile white. |
| Pure black `#000000` | Ink `#0A0A0A` or Dark Blue `#183048` | Use Ink for text, Dark Blue for backgrounds. |
| Bright greens | Desaturate to neutral gray or remove entirely | Green reads as wellness/sustainability and conflicts with brand. |
| Warm browns and ochres | Either neutralize to Graphite `#4A4A4A`, or shift slightly toward Coral if carrying human warmth | Context-dependent. |
| Yellows | Generally remove or shift to Coral. Reserve yellow only for specific exception cases. | Yellow doesn't appear in the v1.1 palette. |

---

## Image types to avoid entirely

No color correction can save these. Source different imagery instead.

- Generic stock photos of businesspeople in office settings
- Group photos of diverse people around tables or in meetings rendered in the friendly op-ed illustration style
- Photographs of hands shaking, gears turning, light bulbs glowing, or other "business idea" clichés
- AI-generated imagery with the visible generative aesthetic (impossible perspectives, hallucinated text, glossy gradients)
- Stock illustrations of stylized humans with disproportionate features (the "Corporate Memphis" style)
- Photographs of Dr. Berger in front of branded backdrops or stage banners — use environmental or speaking-in-context photography only

---

## Process for new imagery

When sourcing or commissioning a new image:

1. **Identify the register.** Is this Atmospheric, Fluid, or Architectural? If it doesn't fit one of the three, it doesn't belong in the brand.
2. **Identify the source colors.** Note what colors dominate and what colors are accent.
3. **Map to the brand palette.** Use the rules above to plan the color shifts.
4. **Apply corrections in your image editor.** Photoshop, Affinity, or any color-correction tool that supports selective color replacement.
5. **Verify against the palette.** The corrected image should read as belonging to the same family as the existing brand surfaces.
6. **Catalog the image.** Add it to `/imagery/[register]/` with a descriptive filename and a note in `/imagery/_catalog.md` about its source, intended use, and corrections applied.

---

## When in doubt

The default answer is: **restraint over flourish, editorial over commercial, system over decoration.** If an image doesn't clearly serve the brand's deeper logic, find a different image.
