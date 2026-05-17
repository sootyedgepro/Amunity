import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Shipping & Returns',
  description: 'How AmunitY ships, our return policy, and timing.',
  path: '/shipping',
});

export default function ShippingPage() {
  return (
    <div className="container-x py-20">
      <div className="mx-auto max-w-3xl">
        <span className="chip">Policies</span>
        <h1 className="h-display mt-4 text-5xl">Shipping & Returns</h1>

        <section className="prose prose-neutral mt-10 max-w-none">
          <h2 className="font-serif text-2xl">Shipping</h2>
          <p className="text-ink/80">
            US orders ship in 1–2 business days via USPS or UPS. Free shipping on orders $50+. International
            shipping (Canada, UK, EU) is calculated at checkout and arrives in 5–14 business days.
          </p>
          <ul className="mt-4 space-y-2 text-ink/80">
            <li>• US Standard (3–5 days): Free over $50, otherwise $5.95</li>
            <li>• US Expedited (2 days): $14.95</li>
            <li>• Canada: $9.95 + duties at customs</li>
            <li>• UK / EU: $14.95 + duties at customs</li>
          </ul>

          <h2 className="mt-12 font-serif text-2xl">Returns</h2>
          <p className="text-ink/80">
            We offer a 60-day money-back guarantee on every product. If you're not completely satisfied,
            email <a className="underline" href="mailto:hello@amunity.com">hello@amunity.com</a> and we'll
            issue a full refund, even on opened items. You don't need to ship products back.
          </p>

          <h2 className="mt-12 font-serif text-2xl">Subscriptions</h2>
          <p className="text-ink/80">
            Subscribe & Save customers receive 15% off and auto-delivery every 30 days. Skip, swap, pause, or
            cancel anytime from your account dashboard.
          </p>
        </section>
      </div>
    </div>
  );
}
