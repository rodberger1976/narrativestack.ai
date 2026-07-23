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

## Appendix: The Trust(ed) Co-Author deck — presentation-tier reference

The keynote deck (Canva design DAHJ8B1MBPE, "The Trust(ed) Co-Author — CultureCon Webinar") is the validated reference for the **presentation tier**, where Azure leads and headlines run large on dark slides. **Handle it with care.** It shows the brand's voice, framework language, and visual signatures — pull those. It does **not** show how the website should look: do **not** copy its Azure intensity, its dark-slide headline scale, or its slide-to-slide rhythm onto narrativestack.ai, which is a reading surface. Use the deck for *vocabulary and substance*, not *slide energy*.

**Note the title:** it is **The Trust(ed) Co-Author** — the parenthetical is intentional. Read it both ways: *Trust* (what the work is about) and *Trusted* (what the work has to earn). The "(ed)" is the educator's role. Preserve the parenthetical styling wherever the methodology is named in full.

### Framework vocabulary, as phrased on the validated surface

Use these exactly. Do not invent variants.

- **The Authorship Declaration** — "Most of us are living inside stories we never chose to author. They were handed to us." The opening move.
- **Authored vs. Assigned** — "An authored story is one you have examined, claimed, and chosen to live inside. An assigned story is one that was handed to you." Most professional lives, and most companies, are built almost entirely out of assigned stories.
- **Police Report vs. Kitchen Table** — the two registers of telling: facts versus genuine storytelling. Leaders need both, and need to know when each is called for.
- **Source · Examine · Author** — the three-step practice. Source the real story (get past prepared answers), examine it (which stories are authored, which assigned, where the story costs you), author it (shape it into something deployable in the moment).
- **The Four Pillars** — Resonance, Legibility, Coherence, Conviction. The dimensions a story is read against.
- **The Four Quadrants** — Passions, Personal, Pursuits, Professional. The map of who a leader is beyond title and role. (Passions: what you would do for free, the most-starved quadrant. Personal: inner life and identity, the chapter the team rarely sees. Pursuits: what you are building or becoming. Professional: where most leaders are most fluent.)
- **The Knockout Questions** — five questions, each at the intersection of one quadrant and one pillar, designed to get past prepared answers. "The questions are mine. The stories are already inside you." Designed to be carried home, not answered in the room.
- **The Business Card Question** — "If I removed your title, your company name, and every credential after your name, what story would you tell about who you are and why you do this work?"
- **Trust migration** — "Trust did not evaporate. It migrated." Trust now lives in proximity, not in position. "The we has become me."

### Sourced statistics (use with attribution, one per surface)

- **70%** — people unwilling or hesitant to trust someone whose values or worldview differ from their own. *Source: 2026 Edelman Trust Barometer, ~34,000 respondents across 28 countries.* Edelman calls it insularity.
- **20%** — global employee engagement, lowest reading since 2020; manager engagement down 9 points since 2022. *Source: Gallup 2026 State of the Global Workplace.*
- **46%** — CHROs ranking leadership and manager development as their #1 priority for 2026. *Source: SHRM 2026 CHRO Priorities Report.*

### Pull quotes available for the site (human-voice moments — Coral permitted)

- "In a trust recession, story is the asset class that holds when all others fall."
- "Trust now lives in proximity, not in position."
- "The we has become me."

These are the studio's own words from the validated deck. On the website they sit in the human-voice register, so a Coral treatment is appropriate where one is used — sparingly, as the warmth reserve.

---

*Narrative Stack · Claude Design System Brief · Companion to Brand & Style Guide v1.2*
