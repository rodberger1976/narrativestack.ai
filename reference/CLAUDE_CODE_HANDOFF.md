# Engagement Path Subpages, Claude Code Handoff Brief

**Project:** The Narrative Stack (narrativestack.ai)
**Deliverable:** Six static pages, a hub plus five engagement-path pages, with their image assets.
**Target:** Netlify, served under `narrativestack.ai/paths/`.
**Date:** June 11, 2026

---

## What this is

Five engagement paths come out of the Quick Leadership Assessment: the Narrative Debrief, the Narrative Sprint, the Narrative Leadership Lab, the Advanced Narrative Offsite, and Storyteller in Residence. Each now has its own page that explains what it means to work with Rod through that path. A sixth page, the hub, frames all five together under the headline "Wherever You Land, There Is a Next Step."

Every page is plain HTML with an inline `<style>` block. No build step, no framework, no dependencies. The images live in an `assets/` folder and are referenced by relative path. The pages are designed to drop straight into the existing narrativestack.ai deploy.

---

## File inventory

```
paths/
  index.html                       The hub. Links to all five path pages.
  narrative-debrief.html
  narrative-sprint.html
  narrative-leadership-lab.html
  advanced-narrative-offsite.html
  storyteller-in-residence.html
  assets/
    hub-horizon.jpg                Hub hero band (figure at horizon)
    hub-horizon-hires.png          Full-res source of the above, kept for future use
    debrief-hands.jpg              Debrief hero (two hands, shared light)
    sprint-waves.jpg               Sprint hero (interwoven currents)
    lab-table.jpg                  Lab hero (leaders around a table)
    offsite-mountains.jpg          Offsite hero (mountain ridgelines)
    residence-path.jpg             Residence hero (lit forest path)
  netlify.toml                     Deploy config (headers + pretty URLs)
  _headers                         Fallback header file (use one or the other)
```

The artwork is cut from the Rev 5 CultureCon deck (Canva design DAHK_-ZlY1A), exported at high resolution so it stays sharp on retina screens. `hub-horizon-hires.png` is the uncompressed source for the hub band; the site uses the `.jpg`.

---

## How to deploy

The cleanest path depends on how narrativestack.ai is currently set up. Two scenarios:

### Scenario A, the site is a Git repo connected to Netlify (most likely)

Copy the entire `paths/` folder into the repository so the structure becomes `<site-root>/paths/`. Then handle the config:

- If the repo already has a `netlify.toml` at its root, open it and merge in the `[[headers]]` and `[[redirects]]` blocks from the `paths/netlify.toml` provided here. Do not commit a second `netlify.toml`; Netlify only reads the one at the repo root. Delete the copied `paths/netlify.toml` and `paths/_headers` after merging.
- If the repo has no `netlify.toml`, move the provided one to the repo root and delete `paths/_headers`.

Commit and push. Netlify builds on push and the pages appear at `narrativestack.ai/paths/`.

### Scenario B, drag-and-drop or a standalone deploy

If these pages go up as their own Netlify site or via manual deploy, keep the folder intact. Netlify reads `_headers` and `netlify.toml` from the publish directory root, so put one of them at the top level of whatever you upload. Use `netlify.toml` and delete `_headers`, or the reverse, never both, since they would duplicate the same rule.

---

## Three decisions to make before or at deploy

**1. Visibility.** Every page already carries `<meta name="robots" content="noindex, nofollow">` in its head, and the config adds the same rule as an `X-Robots-Tag` header. This keeps the pages out of search results while they are evaluated. Three ways to run them:

- *Unlisted (recommended to start).* Leave the noindex in place and link each page only from its matching zone result email. A visit then becomes a warmth signal: the person sought out the page. Nothing points to these pages from the public site.
- *Public.* When ready, remove the noindex meta tag from each page and the header rule from the config, then link the five path names on the landing page (the Section 9 engagement list) to their pages.
- *Password-gated.* Netlify offers site-level or role-based password protection on paid plans. This adds friction that mostly filters the merely curious rather than cold leads, so the unlisted route usually gives better intelligence without the gate. Use it only if a hard wall is wanted.

**2. CTA tracking.** Each page's primary button points at `https://narrativestack.ai/#contact`. To learn which path warmed a given lead, append a per-page query string so the destination (Calendly, Kit, or a form) can record it. Suggested values: `?path=debrief`, `?path=sprint`, `?path=lab`, `?path=offsite`, `?path=residence`. This is a one-line edit per page on the `.btn` href, left undone deliberately so the tracking destination is your call.

**3. The contact anchor.** The CTAs and nav assume `narrativestack.ai/#contact` and `narrativestack.ai/#assessment` exist. Confirm those anchors are live on the current landing page. If the assessment lives at a different URL, update the `href` on the nav button and the secondary CTA on each page.

---

## What not to touch

- The four-petal mark in the header is an inline SVG matching the deployed favicon. It needs no external file.
- The pages use Google Fonts (Source Serif 4, Hanken Grotesk, IBM Plex Mono) loaded from the standard Google CDN, same as the rest of the site. No font files to host.
- Colors, type, and spacing follow Narrative Stack Design Tokens v1.2. Azure stays on labels and rules, coral on the kicker, the pull-quote signature, and the one CTA per page. Please keep that discipline if any page is extended.

---

## A note on voice

The body copy follows Rod's editorial standards: no em dashes, active voice, second person, frameworks capitalized, each page closing on a question. If any copy is edited during or after deploy, those rules hold. The five Knockout questions and all pricing stay off these pages by design; do not add either.
