import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const recipientEmail = "sed200604@gmail.com";
    
    const emailPayload = {
      "نوع الطلب": data.subject || "تسجيل جديد في GO LLC",
      "الاسم الكامل": data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'غير محدد',
      "رقم الهاتف": data.phone || 'غير محدد',
      "الولاية": data.wilaya || 'غير محدد',
      "اسم الشركة": data.llcName || 'غير محدد',
      "قطاع النشاط": data.sector || 'غير محدد',
      _subject: data._subject || "🎉 تسجيل جديد في GO LLC!",
      _captcha: "false",
      _template: "table"
    };

    // 1. Save to Supabase (Instant Database Record)
    try {
      await supabase.from('inline_booking_leads').insert({
        first_name: data.name || data.firstName || 'غير محدد',
        last_name: data.lastName || '',
        phone_number: data.phone || '',
        sector: data.wilaya || data.sector || '',
        llc_name: data.subject || data.llcName || 'AI Course'
      });
    } catch (dbErr) {
      console.warn('Supabase insert notice:', dbErr);
    }

    // 2. Google Apps Script Webhook
    const sheetsUrl = process.env.WORKSHOP_SHEETS_URL;
    if (sheetsUrl) {
      try {
        await fetch(sheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            ...emailPayload
          }),
        });
      } catch (sheetErr) {
        console.warn('Google Sheets notice:', sheetErr);
      }
    }

    // 3. FormSubmit.co Endpoint
    try {
      await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });
    } catch (fsErr) {
      console.warn('FormSubmit notice:', fsErr);
    }

    // 4. Web3Forms Endpoint (Direct Free Delivery)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '232d9c49-6e3e-4d40-b6f1-e3740e53a79d', // Web3Forms public API service key
          to_email: recipientEmail,
          email: recipientEmail,
          subject: data._subject || "🎉 تسجيل جديد في دورة الذكاء الاصطناعي!",
          from_name: "GO LLC AI Course",
          message: `تسجيل جديد:
الاسم واللقب: ${emailPayload["الاسم الكامل"]}
رقم الهاتف: ${emailPayload["رقم الهاتف"]}
الولاية: ${emailPayload["الولاية"]}
نوع الطلب: ${emailPayload["نوع الطلب"]}`
        })
      });
    } catch (w3Err) {
      console.warn('Web3Forms notice:', w3Err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in email-notify route:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
