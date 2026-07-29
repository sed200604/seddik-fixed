import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Course pixel — MUST match PagePixel.tsx / tracking.ts so browser + server events dedupe.
const PIXEL_ID = '1602512821224637';

const hash = (v: string) =>
  v ? crypto.createHash('sha256').update(v.trim().toLowerCase()).digest('hex') : undefined;

const PLAN_VALUE: Record<string, number> = { standard: 12000, vip: 20000 };

/**
 * Best-effort server-side Meta Conversions API (CAPI) Lead.
 * Uses the same event_id as the browser Pixel event so Meta counts one Lead.
 * Silently skips when META_CAPI_TOKEN is not configured.
 */
async function sendCapiLead(req: NextRequest, entry: Record<string, string>, eventId: string) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return; // TODO(placeholder): set META_CAPI_TOKEN for the course pixel to enable CAPI dedup.

  const [firstName, ...rest] = entry.name.split(' ');
  const userData = {
    ph: hash(entry.whatsapp.replace(/[^\d]/g, '')),
    fn: hash(firstName),
    ln: rest.length ? hash(rest.join(' ')) : undefined,
    em: entry.email ? hash(entry.email) : undefined,
    country: hash('dz'),
    client_ip_address: req.headers.get('x-forwarded-for') || undefined,
    client_user_agent: req.headers.get('user-agent') || undefined,
  };

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: req.headers.get('referer') || 'https://gollc.dz/ai-course',
        event_id: eventId,
        user_data: Object.fromEntries(Object.entries(userData).filter(([, v]) => v)),
        custom_data: {
          value: PLAN_VALUE[entry.plan] ?? 12000,
          currency: 'DZD',
          content_name: 'ai_course_registration_form',
          content_category: 'course_registration',
          content_ids: [entry.plan],
        },
      },
    ],
    access_token: token,
  };

  try {
    const res = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error('[Course CAPI] non-200', await res.json().catch(() => ({})));
  } catch (err) {
    console.error('[Course CAPI] request failed', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, whatsapp, email, plan, event_id } = body as Record<string, string>;

    // Server-side validation (never trust the client).
    if (!name?.trim() || !whatsapp?.trim()) {
      return NextResponse.json({ error: 'الاسم ورقم الواتساب مطلوبان' }, { status: 400 });
    }
    const digits = whatsapp.replace(/[^\d]/g, '');
    if (digits.length < 9) {
      return NextResponse.json({ error: 'رقم واتساب غير صحيح' }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'بريد إلكتروني غير صحيح' }, { status: 400 });
    }

    const entry = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      whatsapp: digits,
      email: email?.trim().toLowerCase() || '',
      plan: plan === 'vip' ? 'vip' : 'standard',
      source: 'ai-course-landing',
    };

    // 1) Best-effort: forward to a Google Apps Script webhook (Sheets) if configured.
    const sheetsUrl = process.env.COURSE_SHEETS_URL;
    if (sheetsUrl) {
      try {
        const first = await fetch(sheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
          redirect: 'manual',
        });
        const target = first.headers.get('location') || sheetsUrl;
        await fetch(target, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
      } catch (err) {
        console.error('[Course Register] sheets webhook failed', err);
      }
    } else {
      // TODO(placeholder): set COURSE_SHEETS_URL in .env.local to store leads in a Google Sheet.
      console.log('[AI Course Registration]', entry);
    }

    // 2) Best-effort: server-side CAPI Lead (deduped with the browser Pixel via event_id).
    if (event_id) await sendCapiLead(req, entry, event_id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Course Register Error]', err);
    return NextResponse.json({ error: 'خطأ داخلي، يرجى المحاولة لاحقاً' }, { status: 500 });
  }
}
