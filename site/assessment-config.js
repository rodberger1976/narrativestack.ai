/* ============================================================
   ASSESSMENT ROUTING CONFIG  ·  Quick Leadership Assessment
   The Narrative Edge / narrativestack.ai
   ------------------------------------------------------------
   Build spec: "The Assessment Routing Spec V2", Sections 5 & 6.
   Everything here is TUNABLE WITHOUT A REBUILD. Edit the values,
   redeploy the static file, done. The instrument (quick-check.html)
   reads this object and never hard-codes a threshold, tag, or zone.

   The five zones are CANONICAL and LOCKED (Spec §2 / §7). The
   /60 cutoffs below are the locked V2 values; tune min/max only.
   ============================================================ */
window.ASSESSMENT_CONFIG = {
  instrument: 'quick-leadership',          // canonical instrument key
  maxScore: 60,

  /* ── RESULT HANDOFF ENDPOINT (Kit) ──────────────────────────
     The ONLY place the completed result POSTs to: the site's own
     Netlify Function. The function owns all Kit v4 logic — zone
     cutoffs, tag IDs, custom fields, sequence enrollment — and reads
     the Kit API key from the KIT_API_KEY environment variable in
     Netlify (never in this repo). It also writes a backup copy of
     every submission into the "assessment-completions" Netlify Form
     before calling Kit, so a Kit failure never loses the lead.
     Leave '' to run standalone (results render on-page, cache
     locally, nothing sent). Do NOT hardcode a URL in the
     instrument — this is the only wire-point. */
  endpoint: '/.netlify/functions/quickcheck-to-kit',

  /* ── INTENT FORK (first screen after the gate) ──────────────
     "Is this about your own story as a leader, or your
     organization's story?" Stored as intent = 'self' | 'org'.
     Scoring is identical either way; the four story questions
     re-word to match (see storyQuestions below). */
  intent: {
    options: [
      { value: 'self', label: 'My own story' },
      { value: 'org',  label: 'My organization’s story' }
    ]
  },

  /* ── STORY QUESTION WORDING, branched on intent ─────────────
     org = organization voice, self = individual-leader voice. */
  storyQuestions: {
    origin: {
      org:  'I can clearly articulate why my company or team exists and why it matters, in a way that moves people, not just informs them.',
      self: 'I can clearly articulate why I do the work I do and why it matters, in a way that moves people, not just informs them.'
    },
    vision: {
      org:  'I can paint a vivid picture of the future we’re building that people can see and want to be part of.',
      self: 'I can paint a vivid picture of the future I’m working toward that people can see and want to be part of.'
    },
    values: {
      org:  'I have specific stories that illustrate our values. Not principles on a wall, but real moments when we lived them under pressure.',
      self: 'I have specific stories that illustrate the values I lead by. Not principles on a wall, but real moments when I lived them under pressure.'
    },
    transform: {
      org:  'I can tell the story of a specific customer or stakeholder whose life changed because of our work.',
      self: 'I can tell the story of a specific person whose life changed because of my work.'
    }
  },

  /* ── ZONES (the single routing key across instruments + teasers) ──
     Sum the score, then route into the FIRST zone whose [min,max]
     contains the total. tier = canonical T1–T5. label = forward-facing.
     leadsWith = the line the result page opens with (Spec §5 table).
     tag/sequence/video/worksheet/resultPage = wire-points for the
     zone result pages (the Kit function owns the real Kit IDs).
     defaultAnchor = the IP rung paired with this zone before capacity
     flexes it (see anchors + anchorByCapacity below). */
  zones: [
    { key: 'at_risk',    tier: 'T1', label: 'Story At Risk',    min: 0,  max: 19,
      leadsWith: 'Leading on credentials and data. The gap is costing influence now.',
      tag: 'zone-story-at-risk',    sequence: 'seq-story-at-risk',
      video: '', worksheet: '', resultPage: '/paths/narrative-debrief', defaultAnchor: 'book' },

    { key: 'emerging',   tier: 'T2', label: 'Story Emerging',   min: 20, max: 31,
      leadsWith: 'Defaults to the Police Report under pressure. Aware, but fragile.',
      tag: 'zone-story-emerging',   sequence: 'seq-story-emerging',
      video: '', worksheet: '', resultPage: '/paths/narrative-debrief', defaultAnchor: 'book' },

    { key: 'drift',      tier: 'T3', label: 'Story Drift',      min: 32, max: 41,
      leadsWith: 'Go-to stories that work, but no consistent spine.',
      tag: 'zone-story-drift',      sequence: 'seq-story-drift',
      video: '', worksheet: '', resultPage: '/paths/narrative-sprint', defaultAnchor: 'condensed' },

    { key: 'developing', tier: 'T4', label: 'Story Developing', min: 42, max: 51,
      leadsWith: 'Real strengths, ready to codify the full range and deploy it.',
      tag: 'zone-story-developing', sequence: 'seq-story-developing',
      video: '', worksheet: '', resultPage: '/paths/narrative-leadership-lab', defaultAnchor: 'fieldGuide' },

    { key: 'aligned',    tier: 'T5', label: 'Story Aligned',    min: 52, max: 60,
      leadsWith: 'Already using story as a leadership tool. The work is building it in others.',
      tag: 'zone-story-aligned',    sequence: 'seq-story-aligned',
      video: '', worksheet: '', resultPage: '/paths/storyteller-in-residence', defaultAnchor: 'fieldGuide' }
  ],

  /* One shared "completed" tag applied to every finisher, alongside the
     single zone tag above (Spec §6: "one shared completed tag plus one
     zone tag"). */
  sharedCompletedTag: 'quick-leadership-complete',

  /* ── ANCHOR LADDER (Spec §3): three rungs of core IP. The anchor
     flexes by capacity, never by band. URLs/positioning to confirm. */
  anchors: {
    book:       { name: 'The Narrative Edge', kind: 'retail',
                  url: 'https://www.amazon.com/Narrative-Edge-Authentic-Storytelling-Moment/dp/1394331290' },
    condensed:  { name: 'The Edit', kind: 'retail',
                  url: '' },               // title locked ("The Edit"); positioning + URL TBD
    fieldGuide: { name: 'The Field Guide', kind: 'workbook',
                  url: '' }                // publishes this summer; waitlist for now
  },

  /* Capacity decides which rung the reader meets (Spec §3):
     under-funded settle on the retail anchor as a ceiling; funded
     pass through it as an on-ramp. Same IP, different role. */
  anchorByCapacity: { self: 'book', team: 'condensed', org: 'fieldGuide' },

  /* ── PATH ROUTING: zone × capacity → engagement path page ────
     Recommended model, approved 2026-06-11. Maturity (zone) sets the
     message; capacity (self|team|org) sets the depth. The instrument
     picks pathRouting[zone][capacity] and resolves the slug through
     `paths` below, falling back to the zone's resultPage if capacity
     is unknown. The Debrief stays the universal front door (the hub),
     so nothing dead-ends. Maps onto the Trust(ed) Co-Author engagement
     (Offering Architecture V3). */
  paths: {
    debrief:   '/paths/narrative-debrief',
    sprint:    '/paths/narrative-sprint',
    lab:       '/paths/narrative-leadership-lab',
    offsite:   '/paths/advanced-narrative-offsite',
    residence: '/paths/storyteller-in-residence'
  },
  pathRouting: {
    at_risk:    { self: 'debrief', team: 'sprint',  org: 'offsite'   },
    emerging:   { self: 'debrief', team: 'sprint',  org: 'offsite'   },
    drift:      { self: 'lab',     team: 'sprint',  org: 'offsite'   },
    developing: { self: 'lab',     team: 'offsite', org: 'residence' },
    aligned:    { self: 'lab',     team: 'offsite', org: 'residence' }
  },

  /* ── AXIS ONE: objective / ambition (Spec §3). Where they want the
     story to go. Stored separately from tier. NOT a budget question. */
  objective: {
    question: 'Where do you want your story to take you next?',
    options: [
      { value: 'next_room',   label: 'Land the next room: a pitch, a board, a raise' },
      { value: 'lead_team',   label: 'Lead my team with more influence' },
      { value: 'org_culture', label: 'Build a story culture across my organization' },
      { value: 'find_voice',  label: 'Find my own voice again' }
    ]
  },

  /* ── LIGHT QUALIFIERS (Spec §6): role/title is on the gate; org size
     and timeframe are asked here. NEVER a budget field. These feed the
     quiet capacity inference below. */
  qualifiers: {
    orgSize:   { question: 'How big is your organization?',
                 options: ['Independent / just me', '2–10', '11–50', '51–200', '201–1,000', '1,000+'] },
    timeframe: { question: 'When do you want to act on this?',
                 options: ['Now', 'This quarter', 'This year', 'Just exploring'] }
  },

  /* ── AXIS TWO: capacity, inferred quietly from role + org size +
     timeframe (Spec §3). Returns 'self' | 'team' | 'org'. Independent
     of band and of funds. Tune the matchers here. */
  capacity: {
    seniorRolePattern: 'founder|ceo|owner|president|principal|partner|chief|c[a-z]?o\\b|vp|vice\\s*president|head\\b|director',
    largeOrg: ['51–200', '201–1,000', '1,000+'],
    smallOrg: ['Independent / just me', '2–10'],
    nearTerm: ['Now', 'This quarter']
  },

  /* The one open question you read yourself (Spec §5). */
  closingQuestion: {
    eyebrow: 'The Question Behind The Questions',
    title: 'If every title were stripped away, what story would you tell?',
    prompt: 'If every title, credential, and accomplishment were stripped away, what story would you tell about who you are and why you do this work?'
  }
};
