import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

// Course pixel — MUST match PagePixel.tsx / tracking.ts so browser + server events dedupe.
const PIXEL_ID = '1602512821224637';

const hash = (v: string) =>
  v ? crypto.createHash('sha256').update(v.trim().toLowerCase()).digest('hex') : undefined;

const PLAN_VALUE: Record<string, number> = { standard: 12000, vip: 20000 };

async function sendEmailNotification(entry: {
  name: string;
  whatsapp: string;
  email: string;
  plan: string;
  timestamp: string;
}) {
  const emailPayload = {
    "نوع الطلب": "تسجيل جديد في دورة بناء مواقع بالذكاء الاصطناعي",
    "الاسم الكامل": entry.name,
    "رقم الواتساب": entry.whatsapp,
    "البريد الإلكتروني": entry.email || "غير محدد",
    "نوع العرض": entry.plan === 'vip' ? 'VIP (20,000 دج)' : 'العادي (12,000 دج)',
    "التاريخ": entry.timestamp,
    _subject: "🎉 تسجيل جديد في دورة بناء المواقع بالذكاء الاصطناعي!",
    _captcha: "false",
    _template: "table"
  };

  // 1. Insert into Supabase (Instant DB Backup)
  try {
    await supabase.from('inline_booking_leads').insert({
      first_name: entry.name,
      last_name: '',
      phone_number: entry.whatsapp,
      sector: entry.plan,
      llc_name: `AI Course (${entry.email || 'No email'})`
    });
  } catch (dbErr) {
    console.warn('[Course Register] Supabase insert notice:', dbErr);
  }

  // 2. FormSubmit & Web3Forms
  await Promise.allSettled([
    fetch('https://formsubmit.co/ajax/sed200604@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(emailPayload)
    }),
    fetch('https://formsubmit.co/ajax/abenameur231@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(emailPayload)
    }),
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: '232d9c49-6e3e-4d40-b6f1-e3740e53a79d',
        to_email: 'sed200604@gmail.com',
        email: 'sed200604@gmail.com',
        subject: emailPayload._subject,
        from_name: "GO LLC AI Course",
        message: `تسجيل جديد في دورة بناء المواقع:\nالاسم الكامل: ${entry.name}\nرقم الواتساب: ${entry.whatsapp}\nالبريد الإلكتروني: ${entry.email || 'غير محدد'}\nنوع العرض: ${emailPayload["نوع العرض"]}`
      })
    })
  ]);
}

/**
 * Best-effort server-side Meta Conversions API (CAPI) Lead.
 * Uses the same event_id as the browser Pixel event so Meta counts one Lead.
 * Silently skips when META_CAPI_TOKEN is not configured.
 */
type CapiSignals = { fbp?: string; fbc?: string; eventSourceUrl?: string };

async function sendCapiLead(
  req: NextRequest,
  entry: Record<string, string>,
  eventId: string,
  signals: CapiSignals = {},
) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return; // TODO(placeholder): set META_CAPI_TOKEN for the course pixel to enable CAPI dedup.

  const [firstName, ...rest] = entry.name.split(' ');
  const phoneDigits = entry.whatsapp.replace(/[^\d]/g, '');
  const userData = {
    ph: hash(phoneDigits),
    fn: hash(firstName),
    ln: rest.length ? hash(rest.join(' ')) : undefined,
    em: entry.email ? hash(entry.email) : undefined,
    country: hash('dz'),
    // Stable per-user id — improves match quality alongside event_id dedup.
    external_id: hash(phoneDigits),
    // Raw (NOT hashed) Meta browser identifiers — the key to reliable dedup + attribution.
    fbp: signals.fbp || undefined,
    fbc: signals.fbc || undefined,
    client_ip_address: req.headers.get('x-forwarded-for') || undefined,
    client_user_agent: req.headers.get('user-agent') || undefined,
  };

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url:
          signals.eventSourceUrl || req.headers.get('referer') || 'https://gollc.dz/ai-course',
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
    const { name, whatsapp, email, plan, event_id, fbp, fbc, event_source_url } =
      body as Record<string, string>;

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

    // 2) Send email notification to sed200604@gmail.com
    await sendEmailNotification(entry);

    // 3) Best-effort: server-side CAPI Lead (deduped with the browser Pixel via event_id).
    if (event_id) {
      await sendCapiLead(req, entry, event_id, { fbp, fbc, eventSourceUrl: event_source_url });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Course Register Error]', err);
    return NextResponse.json({ error: 'خطأ داخلي، يرجى المحاولة لاحقاً' }, { status: 500 });
  }
}
