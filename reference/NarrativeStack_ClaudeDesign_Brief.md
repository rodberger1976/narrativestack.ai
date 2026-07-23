# Narrative Stack — Claude Design System Brief

**Companion to the Narrative Stack Brand & Style Guide v1.2 · Re-paste at the start of any Claude Design session**

This brief is written for Claude Design, not for you. It translates the v1.2 style guide into directive instructions a design tool can act on. The guide explains *why* the studio works the way it does; this brief tells the tool *what to do* on narrativestack.ai specifically. Keep it alongside the guide, `tokens.json`, and the reference images, and re-upload or re-paste it whenever you start a fresh session.

---

## The one instruction that matters most

narrativestack.ai is a **reading surface**, and on reading surfaces **Azure is disciplined, never the headline.** Azure is the brand's most distinctive color, so a design tool's instinct is to lead with it — large Azure headlines, Azure-filled hero. **Suppress that instinct.** On the web, Azure appears only as a scarce system marker: monospace labels, thin accent rules, side bars, links, small framework tags. Roughly five to ten percent of the surface. The headline and body carry in Paper or Dark Blue. The phrase to hold onto, and to re-paste whenever a revision strays, is: **Azure stays quiet on the web.**

The reference implementation is the Leadership Quick-Check web hero. When in doubt, match it.

---

## System brief (paste this into Claude Design)

narrativestack.ai is the studio face of a methodology developed over twenty years. It is systematic, framework-forward, and editorial. The reference points are publishing — The New Yorker, Monocle, Aeon, Wiley editions — not a SaaS dashboard. Build it to feel like a publishing house that happens to have a method, confident and restrained, never like a startup pitch deck.

This is a reading surface. Azure is disciplined here: it appears only as labels, thin rules, side bars, links, and small framework tags — never as the headline color, never filling the hero. Keep it to roughly five to ten percent of any surface. The dominant surfaces are Dark Blue (#183048) and Paper (#FAFAF7). Body and headlines carry in Paper, Dark Blue, or Ink. The validated web hero is the Quick-Check pattern: Dark Blue background, heavy sans headline in Paper, serif body beneath, a small monospace label in Azure with a short Azure accent rule above it, and a portrait or key image on the right anchored by an Azure side bar.

Headlines on screen-display surfaces (the hero, large mastheads) are heavy geometric sans in Paper. Headlines on editorial surfaces (pull quotes, article headlines, long-form) are serif italic. Body copy is serif on every surface, without exception. Monospace carries section labels, metadata, and framework markers (EVIDENCE · 01, FRAMEWORK · TRUST DYNAMICS).

Coral is the warmth reserve, not a co-equal accent. Use it only where genuine human warmth belongs — a pull quote, a testimonial, the personal note, the contact invitation — and leave it absent elsewhere. It need not appear on a system-heavy page. A single accent per surface is the default; Azure and Coral may coexist only when the composition genuinely calls for both.

No marketing inflation in copy. No gradients, drop shadows, glassmorphism, neon, carousels, modal pop-ups, or exit-intent overlays. Never pure white #FFFFFF; use Paper. Center-aligned long-form body copy is forbidden. Any color outside the token set — any green, yellow, or stray accent — is an orphan to be corrected to Azure or Coral.

---

## Tokens

Hand Claude Design the canonical `tokens.json`. Instruct it: *use only these tokens; treat Azure as surface-tiered and keep it disciplined on this reading surface; do not hardcode any color.*

| Token | Hex | Role on narrativestack.ai |
|---|---|---|
| Dark Blue | `#183048` | Primary brand, dominant background |
| Paper | `#FAFAF7` | Warm light surface. Never pure white. |
| Azure | `#2FC4DD` | **Disciplined** — labels, rules, side bars, links. Never the headline. |
| Coral | `#FF7559` | Warmth reserve — human moments only, used sparingly |
| Ink | `#0A0A0A` | Pure text on light surfaces |
| Graphite | `#4A4A4A` | Secondary / body text |
| Mute | `#888780` | Metadata, monospace section labels |
| Fog | `#E5E5E2` | Dividers, low-weight borders |
| Mid Blue | `#3A6FB0` | Optional bridge tone, Fluid imagery only |
| Mist | `#E8F7FA` | Optional pale azure wash for light surfaces |

Proportion sensibility on this reading surface: roughly 70% dominant surface (Dark Blue or Paper), 20% supporting type colors, 10% active accent. When an accent exceeds about ten percent, it has stopped being an accent.

---

## Typography

- **Hero / screen-display headlines:** heavy geometric sans (GT America / Söhne / Inter), in Paper. This is the Quick-Check pattern.
- **Editorial headlines, pull quotes, long-form:** serif italic (GT Sectra / Tiempos / Source Serif 4).
- **Body:** serif, regular, on every surface, 1.6 line-height, max reading width 680–720px.
- **Labels, metadata, framework tags:** monospace (GT America Mono / JetBrains Mono), all caps, letter-spacing +2, in Mute or Azure.
- The pairing that always holds: **serif body beneath either headline face.** Never mix serif and sans within one headline; never set long-form body in sans.

---

## Layout patterns (the validated signatures)

- **The web hero (Quick-Check pattern):** the reference for any reading-surface hero. Dark Blue field, heavy sans headline in Paper, serif body, Azure label + short rule, Azure side bar on the image. Azure disciplined throughout. *(See reference image: NS_ref_web_hero_quickcheck.png.)*
- **The isometric Stack diagram:** the methodology as stacked architectural blocks, each face labeled with a pillar (Resonance, Legibility, Coherence, Conviction) or quadrant (Passions, Personal, Pursuits, Professional). Azure line work on Dark Blue, with a single Coral human-anchor point. The brand's strongest visual signature — it performs the "narrative stack" name the way the sliced wordmark does typographically. Use it as the anchor visual on methodology-overview surfaces. *(See reference image: NS_ref_isometric_stack_diagram.png.)*
- **The statistic slide:** one large number in display type, a short accent underscore, a serif-italic caption, a small monospace evidence tag with a source line. One statistic per surface.
- **The Knockout Question:** a monospace category tag pairing a quadrant with a pillar, a large serif-italic question as centerpiece, an atmospheric image, a short monospace footer. Dark-surface, human-voice in register, but carries the Azure system tag — a sanctioned exception to single-accent simplicity.

---

## Imagery (three registers)

Every image belongs to one of three registers, color-corrected to the palette (red → Coral, cyan/teal → Azure, navy → Dark Blue, greens removed, pure white → Paper):

- **Atmospheric** — fog, water, landscapes at dawn/dusk, the lone figure in vast space. Mood. For the homepage hero and section openers. Native Dark Blue tones.
- **Fluid** — ribbons, waves, topographic lines, layered horizontal forms. Motion. Dark Blue + Azure primary, Coral sparingly.
- **Architectural** — network diagrams, node-and-edge structures, stacked geometric forms, the wordmark slices. Systems. Dark Blue dominant, Azure for active nodes, Coral for the human anchor.

**Also use** the hand-drawn sketch animations as the editorial signature — they function like New Yorker cartoons, signaling authorship before a word is read.

**Never use:** generic stock photos of businesspeople, handshakes, gears, light bulbs; illustrated groups around tables (op-ed style); three-circle Venn ornaments (retired); AI imagery with the visible generative aesthetic; photos of Dr. Berger in front of branded backdrops.

---

## Navigation & page character

- **Nav:** Methodology, Field Guide, Writing, Studio, Contact. Set in geometric sans, active item in Azure.
- **Content tilts** toward frameworks and systematic deliverables, not personal authority — that is drrodberger.com's job.
- **The return loop:** wherever a visitor wants the person rather than the system, link to drrodberger.com. The studio meets the buyer who wants a method; it hands off to the author face when the buyer wants a human. A link pointing back to the author face may carry Coral.

---

## The drift warning

When you ask Claude Design to "make it pop" or "add energy," it will reach for Azure — an Azure headline, an Azure-filled hero, Azure as the dominant color. **That is the failure mode for this property specifically.** narrativestack.ai is read, not glanced at, and on a reading surface a loud Azure stops being a system marker and becomes noise. Re-paste **Azure stays quiet on the web** whenever a revision pushes Azure into the headline or past ten percent of the surface. The energy on this site comes from editorial confidence and the architectural Stack diagram — not from turning up the accent.

(Note: the opposite is true on slides and keynotes, where Azure *may* lead. If you ever ask Claude Design to build presentation slides rather than the website, that is a presentation surface and this warning is relaxed. The website is a reading surface; keep Azure disciplined here.)

---

*Narrative Stack · Claude Design System Brief · Companion to Brand & Style Guide v1.2*
