import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;
if (!key && process.env.NODE_ENV === 'production') {
  console.warn('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(key || 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia',
  typescript: true,
});

export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  );
}
