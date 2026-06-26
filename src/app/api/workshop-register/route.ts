import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, businessType } = body as Record<string, string>;

    // Server-side validation
    if (!name?.trim() || !email?.trim() || !businessType?.trim()) {
      return NextResponse.json({ error: 'حقول مطلوبة مفقودة' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'بريد إلكتروني غير صحيح' }, { status: 400 });
    }

    const entry = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp?.trim() || '',
      businessType: businessType.trim(),
      source: 'workshop-landing-page',
    };

    // Forward to Google Apps Script webhook if configured
    // Set WORKSHOP_SHEETS_URL in .env.local pointing to your Apps Script web app
    const sheetsUrl = process.env.WORKSHOP_SHEETS_URL;
    if (sheetsUrl) {
      // Google Apps Script returns 302 redirect — follow it manually with POST
      // to avoid the browser default of converting POST→GET on redirect
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
    } else {
      console.log('[Workshop Registration]', entry);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Workshop Register Error]', error);
    return NextResponse.json({ error: 'خطأ داخلي، يرجى المحاولة لاحقاً' }, { status: 500 });
  }
}
