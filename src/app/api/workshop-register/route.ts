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
    }

    // Send email notification to sed200604@gmail.com
    const emailPayload = {
      "نوع الطلب": "تسجيل جديد في الورشة المجانية",
      "الاسم الكامل": entry.name,
      "البريد الإلكتروني": entry.email,
      "رقم الواتساب": entry.whatsapp || "غير محدد",
      "نوع النشاط": entry.businessType,
      "التاريخ": entry.timestamp,
      _subject: "🎉 تسجيل جديد في الورشة المجانية!",
      _captcha: "false",
      _template: "table"
    };

    try {
      await Promise.all([
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: '232d9c49-6e3e-4d40-b6f1-e3740e53a79d',
            to_email: 'sed200604@gmail.com',
            email: 'sed200604@gmail.com',
            subject: emailPayload._subject,
            from_name: 'GO LLC Workshop',
            message: `تسجيل جديد في الورشة:\nالاسم: ${entry.name}\nالبريد: ${entry.email}\nالواتساب: ${entry.whatsapp}\nنوع النشاط: ${entry.businessType}`
          })
        }),
        fetch('https://formsubmit.co/ajax/sed200604@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(emailPayload)
        })
      ]).catch(console.error);
    } catch (e) {
      console.warn('Workshop email notify notice:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Workshop Register Error]', error);
    return NextResponse.json({ error: 'خطأ داخلي، يرجى المحاولة لاحقاً' }, { status: 500 });
  }
}
