/* ============================================================
   proximity-to-kit — Netlify Function
   narrativestack.ai · The Proximity Read → Kit (v4 API)
   ------------------------------------------------------------
   The ONLY endpoint the Proximity Read page posts to. The page is
   not scored and has no result screen: it captures four long-form
   answers and queues the lead. The reading itself is written and
   sent by Rod by hand. On every submission:

     1. Log the full payload immediately (nothing is lost even if
        every later step fails).
     2. Write a backup copy into the "proximity-reads" Netlify
        Form (durable, visible in the Netlify UI).
     3. Upsert the subscriber in Kit, write the proximity_* custom
        fields, apply the three tags. Every Kit call is wrapped: a
        failure is logged and reported, never thrown, so the email
        is never lost.

   The Kit API key comes from the KIT_API_KEY environment variable
   set in Netlify (Site settings → Environment variables). It is
   NEVER hardcoded here.
   ============================================================ */

/* ── KIT IDs (already created in the Kit account) ──────────── */
const KIT = {
  apiBase: 'https://api.kit.com/v4',
  tags: [
    21430779,  // assessment:proximity-complete
    21352177,  // src:apollo
    21352187,  // stage:subscribed
  ],
};

const BACKUP_FORM_NAME = 'proximity-reads';

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
  console.log('[proximity-to-kit] received', JSON.stringify(payload));

  /* 2 ── durable backup into the Netlify Form (log + continue on error). */
  const siteUrl = process.env.URL || process.env.DEPLOY_URL || '';
  try {
    const backup = await backupToNetlifyForm(payload, siteUrl);
    if (!backup.ok) console.warn('[proximity-to-kit] form backup failed:', backup.error);
  } catch (err) {
    console.warn('[proximity-to-kit] form backup failed:', err.message);
  }

  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    console.error('[proximity-to-kit] KIT_API_KEY is not set — lead captured, Kit skipped');
    return respond(200, { ok: false, captured: true, error: 'kit-not-configured' });
  }

  const firstName = String(payload.first_name || '').trim();
  const today = new Date().toISOString().slice(0, 10);

  const errors = [];
  let subscriberOk = false;

  /* 3a ── upsert subscriber + custom fields (Kit v4 creates or updates by email). */
  try {
    await kitFetch(apiKey, '/subscribers', {
      email_address: email,
      first_name: firstName || undefined,
      fields: {
        proximity_purpose: String(payload.purpose || ''),
        proximity_scene: String(payload.scene || ''),
        proximity_care: String(payload.care || ''),
        proximity_future: String(payload.future || ''),
        proximity_link: String(payload.link || ''),
        proximity_date: today,
        proximity_reading_status: 'queued',
        lead_source: String(payload.lead_source || ''),
      },
    });
    subscriberOk = true;
  } catch (err) {
    errors.push('subscriber: ' + err.message);
  }

  /* 3b ── tags: proximity-complete + src:apollo + stage:subscribed (each independent). */
  for (const tagId of KIT.tags) {
    try {
      await kitFetch(apiKey, `/tags/${tagId}/subscribers`, { email_address: email });
    } catch (err) {
      errors.push(`tag ${tagId}: ` + err.message);
    }
  }

  if (errors.length) console.error('[proximity-to-kit] kit errors:', errors.join(' | '));

  /* The lead is always captured; ok reflects whether Kit accepted the subscriber. */
  return respond(200, {
    ok: subscriberOk,
    captured: true,
    kit_errors: errors.length ? errors : undefined,
  });
};
