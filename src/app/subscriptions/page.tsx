import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Subscriptions',
  description: 'How AmunitY Subscribe & Save works, 15% off, ship every 30 days, cancel anytime.',
  path: '/subscriptions',
});

export default function SubscriptionsPage() {
  return (
    <div className="container-x py-20">
      <div className="mx-auto max-w-3xl">
        <span className="chip">Subscribe &amp; Save</span>
        <h1 className="h-display mt-4 text-5xl">Make it a ritual.</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/80">
          Wellness compounds. Subscribe to any AmunitY product, get <strong>15% off every order
          forever</strong>, and never run out of the formula your body's starting to depend on.
        </p>

        <section className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { n: '15%', t: 'off every order', b: 'Discount auto-applies, no codes, no expiration.' },
            { n: '30 days', t: 'default cadence', b: 'Or pick 45, 60, or 90 days at checkout.' },
            { n: '0 fees', t: 'to skip or cancel', b: 'Pause, swap, or stop anytime. We mean it.' },
          ].map((c) => (
            <div key={c.n} className="card p-6">
              <div className="font-serif text-3xl text-plum-deep">{c.n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted">{c.t}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{c.b}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="h-display text-3xl">How it works</h2>
          <ol className="space-y-4 text-ink/80">
            <li>
              <strong>1. Pick "Subscribe &amp; Save"</strong> on any product page. Price drops 15%
              instantly.
            </li>
            <li>
              <strong>2. Choose your cadence</strong>, 30, 45, 60, or 90 days. Default is 30.
            </li>
            <li>
              <strong>3. We ship + charge on your schedule.</strong> You'll get a reminder email 3 days
              before each shipment so there are no surprises.
            </li>
            <li>
              <strong>4. Manage from your inbox.</strong> Reply to any reminder to skip the next order,
              change cadence, swap products, or cancel, no portal required.
            </li>
          </ol>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="h-display text-3xl">FAQ</h2>

          <div>
            <h3 className="font-serif text-lg">Can I cancel anytime?</h3>
            <p className="mt-1 text-ink/80">
              Yes. Email <a className="underline" href="mailto:hello@amunity.store">hello@amunity.store</a> or
              reply to any shipping reminder. Cancellations are instant and there is no fee.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg">Can I skip a shipment?</h3>
            <p className="mt-1 text-ink/80">
              Yes, skip individual deliveries without canceling the whole subscription. You stay in
              the 15% rate as long as the subscription is active.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg">Can I swap products mid-subscription?</h3>
            <p className="mt-1 text-ink/80">
              Yes. Swap to any product of equal or lesser value at no extra cost. Upgrades are charged
              the difference at the subscriber rate.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg">When is my card charged?</h3>
            <p className="mt-1 text-ink/80">
              When each order ships, not before. You'll always get a reminder 3 days in advance so
              you can adjust if you need to.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg">Do I get the 15% off on the first order?</h3>
            <p className="mt-1 text-ink/80">
              Yes. The discount applies to your very first subscription order and every order after.
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-plum-mist/40 p-8 text-center">
          <h3 className="h-display text-2xl">Start a ritual today.</h3>
          <p className="mt-2 text-muted">Subscribe to any product and 15% off auto-applies at checkout.</p>
          <Link href="/shop" className="btn-primary mt-6">Shop the collection</Link>
        </section>
      </div>
    </div>
  );
}
