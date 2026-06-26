import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // In a real production app, this could insert into a Supabase table 
    // or an analytics service like PostHog / Mixpanel.
    // For now, we log it so it appears in Vercel logs to measure blocker rates.
    console.log('--- TRACKING EVENT ---');
    console.log(JSON.stringify({
      ...body,
      ip: req.headers.get('x-forwarded-for') || req.headers.get('remote_addr'),
      time: new Date().toISOString()
    }));
    console.log('----------------------');

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
