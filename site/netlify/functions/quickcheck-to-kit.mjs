/* ============================================================
   quickcheck-to-kit — Netlify Function
   narrativestack.ai · Quick-Check → Kit (v4 API)
   ------------------------------------------------------------
   The ONLY endpoint the Quick-Check posts to. On every submission:

     1. Log the full payload immediately (nothing is lost even if
        every later step fails).
     2. Write a backup copy into the "assessment-completions"
        Netlify Form (durable, visible in the Netlify UI).
     3. For completed assessments: upsert the subscriber in Kit,
        write custom fields, apply tags, enroll in the zone's
        sequence. Every Kit call is wrapped: a failure is logged
        and reported, never thrown, so the email is never lost.

   The Kit API key comes from the KIT_API_KEY environment variable
   set in Netlify (Site settings → Environment variables). It is
   NEVER hardcoded here.
   ============================================================ */

/* ── TUNABLE ZONE CUTOFFS (score out of 60) ────────────────── */
const ZONE_CUTOFFS = [
  { zone: 'at-risk',    min: 0,  max: 19 },
  { zone: 'emerging',   min: 20, max: 31 },
  { zone: 'drift',      min: 32, max: 41 },
  { zone: 'developing', min: 42, max: 51 },
  { zone: 'aligned',    min: 52, max: 60 },
];

/* ── KIT IDs (already created in the Kit account) ──────────── */
const KIT = {
  apiBase: 'https://api.kit.com/v4',
  tags: {
    completed: 21373139,                    // assessment:quick-check-complete
    zone: {
      'at-risk': 21373140,
      'emerging': 21373141,
      'drift': 21373142,
      'developing': 21373143,
      'aligned': 21373144,
    },
    intent: { self: 21373145, org: 21373146 },  // for:self / for:team
    path: {
      debrief: 21373147,
      sprint: 21373148,
      lab: 21373149,
      offsite: 21373150,
      residence: 21373151,
    },
  },
  /* zone → { sequence to enroll, path tag to apply } */
  zoneRouting: {
    'at-risk':    { sequence: 2836406, pathTag: 21373147 },  // path:debrief
    'emerging':   { sequence: 2836407, pathTag: 21373147 },  // path:debrief
    'drift':      { sequence: 2836408, pathTag: 21373148 },  // path:sprint
    'developing': { sequence: 2836409, pathTag: 21373150 },  // path:offsite
    'aligned':    { sequence: 2836410, pathTag: 21373151 },  // path:residence
  },
};

const BACKUP_FORM_NAME = 'assessment-completions';

function zoneForScore(score) {
  const n = Number(score);
  if (!Number.isFinite(n)) return null;
  const hit = ZONE_CUTOFFS.find((z) => n >= z.min && n <= z.max);
  return hit ? hit.zone : (n > 60 ? 'aligned' : 'at-risk');
}

/* Backup capture: write the submission into the Netlify Form so it
   shows up in the Netlify UI alongside historical submissions. */
async function backupToNetlifyForm(payload, siteUrl) {
  if (!siteUrl) return { ok: false, error: 'no-site-url' };
  const flat = { 'form-name': BACKUP_FORM_NAME };
  for (const [k, v] of Object.entries(payload)) {
    flat[k] = v && typeof v === 'object' ? JSON.stringify(v) : v == null ? '' : String(v);
  }
  const body = new URLSearchParams(flat).toString();
  const res = await fetch(siteUrl + '/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  return res.ok ? { ok: true } : { ok: false, error: 'http-' + res.status };
}

async function kitFetch(apiKey, path, body) {
  const res = await fetch(KIT.apiBase + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': apiKey,
    },
    body: JSON.stringify(body),
  });
  let json = null;
  try { json = await res.json(); } catch (_) { /* empty response is fine */ }
  if (!res.ok) {
    const detail = json && json.errors ? JSON.stringify(json.errors) : 'http-' + res.status;
    throw new Error(`${path} → ${detail}`);
  }
  return json;
}

export default async (req) => {
  const respond = (status, obj) =>
    new Response(JSON.stringify(obj), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (req.method !== 'POST') return respond(405, { ok: false, error: 'method-not-allowed' });

  let payload;
  try {
    payload = await req.json();
  } catch (_) {
    return respond(400, { ok: false, error: 'invalid-json' });
  }

  const email = String(payload.email || '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond(400, { ok: false, error: 'invalid-email' });
  }

  /* 1 ── capture first: the log line alone preserves the lead. */
  console.log('[quickcheck-to-kit] received', JSON.stringify(payload));

  /* 2 ── durable backup into the Netlify Form (log + continue on error). */
  const siteUrl = process.env.URL || process.env.DEPLOY_URL || '';
  try {
    const backup = await backupToNetlifyForm(payload, siteUrl);
    if (!backup.ok) console.warn('[quickcheck-to-kit] form backup failed:', backup.error);
  } catch (err) {
    console.warn('[quickcheck-to-kit] form backup failed:', err.message);
  }

  /* Secondary events (Trust(ed) Sessions application, Field Guide notify,
     discount signup) are captured + logged only; Kit enrollment happens
     on the main completion event. */
  const event = payload.event || 'assessment_complete';
  if (event !== 'assessment_complete') {
    return respond(200, { ok: true, captured: true, kit: 'skipped-for-event', event });
  }

  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    console.error('[quickcheck-to-kit] KIT_API_KEY is not set — lead captured, Kit skipped');
    return respond(200, { ok: false, captured: true, error: 'kit-not-configured' });
  }

  const firstName = String(payload.first_name || payload.name || '').trim();
  const intent = payload.intent === 'org' ? 'org' : payload.intent === 'self' ? 'self' : '';
  const score = payload.score != null ? payload.score : payload.total_score;
  const zone = zoneForScore(score);
  const routing = zone ? KIT.zoneRouting[zone] : null;
  const verbatim = String(payload.verbatim || payload.reflection || '').trim();
  const today = new Date().toISOString().slice(0, 10);

  const errors = [];
  let subscriberOk = false;

  /* 3a ── upsert subscriber + custom fields (Kit v4 creates or updates by email). */
  try {
    await kitFetch(apiKey, '/subscribers', {
      email_address: email,
      first_name: firstName || undefined,
      fields: {
        quick_check_score: score != null ? String(score) : '',
        quick_check_verbatim: verbatim,
        quick_check_date: today,
        role: String(payload.role || ''),
        org_size: String(payload.org_size || ''),
        timeframe: String(payload.timeframe || ''),
        lead_source: String(payload.lead_source || ''),
      },
    });
    subscriberOk = true;
  } catch (err) {
    errors.push('subscriber: ' + err.message);
  }

  /* 3b ── tags: completed + zone + intent + path (each independent). */
  const tagIds = [
    KIT.tags.completed,
    zone ? KIT.tags.zone[zone] : null,
    intent ? KIT.tags.intent[intent] : null,
    routing ? routing.pathTag : null,
  ].filter(Boolean);
  for (const tagId of tagIds) {
    try {
      await kitFetch(apiKey, `/tags/${tagId}/subscribers`, { email_address: email });
    } catch (err) {
      errors.push(`tag ${tagId}: ` + err.message);
    }
  }

  /* 3c ── enroll into the zone's sequence. */
  if (routing) {
    try {
      await kitFetch(apiKey, `/sequences/${routing.sequence}/subscribers`, { email_address: email });
    } catch (err) {
      errors.push(`sequence ${routing.sequence}: ` + err.message);
    }
  }

  if (errors.length) console.error('[quickcheck-to-kit] kit errors:', errors.join(' | '));

  /* The lead is always captured; ok reflects whether Kit accepted the subscriber. */
  return respond(200, {
    ok: subscriberOk,
    captured: true,
    zone,
    kit_errors: errors.length ? errors : undefined,
  });
};
