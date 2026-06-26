import { NextResponse } from 'next/server';
import crypto from 'crypto';

const PIXEL_ID = '4083068931984643';

// Helper to hash data to SHA-256
const hashData = (data: string) => {
  if (!data) return '';
  return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      event_id, 
      first_name, 
      last_name, 
      phone, 
      sector, 
      value, 
      currency,
      page_language,
      device_type,
      session_duration,
      utm_source,
      utm_campaign,
      utm_medium
    } = body;

    const token = process.env.META_CAPI_TOKEN;
    
    if (!token) {
      console.warn('CAPI token missing, skipping CAPI Lead event.');
      return NextResponse.json({ success: false, reason: 'missing_token' }, { status: 500 });
    }

    // Prepare hashed user data
    const userData = {
      ph: phone ? hashData(phone.replace(/[^\d+]/g, '')) : undefined,
      fn: first_name ? hashData(first_name) : undefined,
      ln: last_name ? hashData(last_name) : undefined,
      country: hashData('dz'),
      client_ip_address: req.headers.get('x-forwarded-for') || req.headers.get('remote_addr') || undefined,
      client_user_agent: req.headers.get('user-agent') || undefined,
    };

    // Clean up undefined values
    const cleanedUserData = Object.fromEntries(Object.entries(userData).filter(([_, v]) => v !== undefined));

    const payload = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: req.headers.get('referer') || 'https://gollc.dz',
          event_id: event_id, // For deduplication
          user_data: cleanedUserData,
          custom_data: {
            value: value || 100.00,
            currency: currency || 'USD',
            content_name: 'consultation_booking',
            content_category: 'llc_service',
            sector: sector,
            page_language,
            device_type,
            session_duration,
            utm_source,
            utm_campaign,
            utm_medium
          }
        }
      ]
    };

    const fbRes = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        access_token: token
      })
    });

    const fbData = await fbRes.json();
    
    if (!fbRes.ok) {
      console.error('CAPI Error:', fbData);
      return NextResponse.json({ success: false, error: fbData }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: fbData });

  } catch (err: any) {
    console.error('CAPI Request Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
