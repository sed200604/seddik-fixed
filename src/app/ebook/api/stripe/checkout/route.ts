import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/ebook/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { successUrl, cancelUrl } = body as {
      successUrl?: string;
      cancelUrl?: string;
    };

    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe not configured', url: null },
        { status: 503 }
      );
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const url = await createCheckoutSession({
      priceId,
      successUrl: successUrl || `${origin}/ebook?unlocked=true&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: cancelUrl || `${origin}/ebook#paywall`,
      metadata: {
        product: 'ebook_seat',
        timestamp: new Date().toISOString(),
      },
    });

    if (!url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session', url: null },
        { status: 500 }
      );
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error', url: null },
      { status: 500 }
    );
  }
}
