import { NextResponse } from 'next/server';
import { stripe, siteUrl } from '@/lib/stripe';
import type { CartLine } from '@/types';

export async function POST(req: Request) {
  try {
    const { lines } = (await req.json()) as { lines: CartLine[] };
    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: 'Empty cart' }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ checkoutUrl: '/cart?status=demo' });
    }

    const base = siteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lines.map((l) => ({
        quantity: l.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(l.price * 100),
          product_data: {
            name: l.title + (l.subscription ? ', Subscribe & Save' : ''),
            images: l.image.startsWith('http') ? [l.image] : [`${base}${l.image}`],
            metadata: { productId: l.productId, slug: l.slug, subscription: String(l.subscription) },
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free shipping (orders $50+)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 595, currency: 'usd' },
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      success_url: `${base}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cart/canceled`,
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
