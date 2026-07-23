# The Narrative Stack — narrativestack.ai

Working root for the funnel/site project (the go-to-market workshop for The Narrative Edge).
Distinct from the book project at `~/narrative-edge/` and from drrodberger.com.

## Layout
- `site/` — the live, deployed site (publish this folder to Netlify; serves `narrativestack.ai`).
  - `index.html`, `field-guide.html`, `quick-check.html` (the assessment), `assessment-config.js`, `netlify.toml`, `assets/`
  - `paths/` — the six engagement-path subpages (hub + 5), live at `narrativestack.ai/paths/` (unlisted/noindex).
- `reference/` — canonical specs and briefs that govern the build:
  - `The_Assessment_Routing_Spec_V2.docx` (the build manual — five zones, /60 cutoffs)
  - `Assessment_to_Booking_Workflow_V1.docx` (end-to-end funnel: doorway → booked conversation)
  - `The_Narrative_Stack_Quadrant_to_Offering_V2.docx`, `Narrative_Stack_Landing_Page_Blueprint_V3.md`
  - `CLAUDE_CODE_HANDOFF.md` (paths subpages brief), design briefs, schema, sample assessments
- `brand/` — brand style guide v1.2, Five-Bar icons, banners, mockups, branding examples.
- `archive/` — superseded build artifacts (original zips, `narrativestack_extracted/`, the now-deployed `narrativestack-paths/` source).

## Deploy
Netlify site `narrativestack` (siteId `5af39e9c-e7af-46e3-a02c-1f6ed4c3c1df`), API file-digest deploy via curl/python + a user-supplied PAT. Publish the `site/` folder. Local preview: launch config `narrativestack`, port 8099 (serves `site/`).
