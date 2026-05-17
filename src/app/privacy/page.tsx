import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How AmunitY collects, uses, and protects your personal information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="container-x py-20">
      <div className="mx-auto max-w-3xl">
        <span className="chip">Policies</span>
        <h1 className="h-display mt-4 text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted">Last updated: May 17, 2026</p>

        <section className="prose prose-neutral mt-10 max-w-none space-y-6">
          <p className="text-ink/80">
            AmunitY Wellness, Inc. ("AmunitY", "we", "us") respects your privacy. This policy explains
            what we collect when you visit <strong>amunity.store</strong>, how we use it, who we share it
            with, and the rights you have over it.
          </p>

          <h2 className="font-serif text-2xl">What we collect</h2>
          <ul className="space-y-2 text-ink/80">
            <li>• <strong>Order information</strong> — name, email, shipping address, phone, items purchased.</li>
            <li>• <strong>Payment information</strong> — handled entirely by Stripe. We never see or store card numbers; Stripe returns us only a token and the last four digits.</li>
            <li>• <strong>Account / marketing</strong> — email if you sign up for our newsletter or create an account.</li>
            <li>• <strong>Usage data</strong> — pages visited, products viewed, device/browser type, IP address, via standard analytics cookies.</li>
          </ul>

          <h2 className="font-serif text-2xl">How we use it</h2>
          <ul className="space-y-2 text-ink/80">
            <li>• To fulfill and ship your orders.</li>
            <li>• To send order confirmations, shipping notifications, and receipts.</li>
            <li>• To respond to support requests.</li>
            <li>• To send marketing emails — only if you've explicitly opted in. You can unsubscribe from every email.</li>
            <li>• To improve the site (analytics, abandoned-cart recovery, fraud prevention).</li>
          </ul>

          <h2 className="font-serif text-2xl">Who we share it with</h2>
          <p className="text-ink/80">
            We share the minimum necessary data with vetted service providers who help us run the
            business:
          </p>
          <ul className="space-y-2 text-ink/80">
            <li>• <strong>Stripe</strong> — payment processing</li>
            <li>• <strong>Fulfillment partners</strong> — name + shipping address only, to deliver your order</li>
            <li>• <strong>Email & analytics platforms</strong> — Klaviyo, Google Analytics, Meta Pixel (if opted in)</li>
            <li>• <strong>Hosting</strong> — Vercel</li>
          </ul>
          <p className="text-ink/80">
            We do <strong>not</strong> sell your personal information. Period.
          </p>

          <h2 className="font-serif text-2xl">Cookies & tracking</h2>
          <p className="text-ink/80">
            We use cookies to remember your cart, run analytics, and (with your consent) personalize
            marketing. You can decline non-essential cookies via the banner at the bottom of the site.
            Essential cookies (cart, checkout, fraud prevention) cannot be disabled — the site can't
            function without them.
          </p>

          <h2 className="font-serif text-2xl">Your rights</h2>
          <p className="text-ink/80">
            Depending on where you live, you may have the right to access, correct, delete, or export
            your data, and to opt out of certain processing. Specifically:
          </p>
          <ul className="space-y-2 text-ink/80">
            <li>• <strong>California (CCPA/CPRA)</strong> — right to know, delete, correct, and opt out of "sale" or "sharing" (we don't sell).</li>
            <li>• <strong>EU/UK (GDPR)</strong> — right to access, rectification, erasure, restriction, portability, and to object to processing.</li>
            <li>• <strong>All customers</strong> — right to unsubscribe from marketing at any time.</li>
          </ul>
          <p className="text-ink/80">
            Email <a className="underline" href="mailto:privacy@amunity.store">privacy@amunity.store</a> with
            any request — we respond within 30 days.
          </p>

          <h2 className="font-serif text-2xl">Data retention</h2>
          <p className="text-ink/80">
            Order records: kept for 7 years (tax and accounting). Marketing lists: kept until you
            unsubscribe. Analytics: aggregated and retained 26 months. We delete anything older when
            we're no longer legally required to keep it.
          </p>

          <h2 className="font-serif text-2xl">Security</h2>
          <p className="text-ink/80">
            All traffic to amunity.store is encrypted via HTTPS. Payments are tokenized by Stripe.
            Internal access to customer data is restricted to the people who need it to do their job.
          </p>

          <h2 className="font-serif text-2xl">Children</h2>
          <p className="text-ink/80">
            AmunitY is intended for adults 18+. We do not knowingly collect information from children
            under 13.
          </p>

          <h2 className="font-serif text-2xl">Updates</h2>
          <p className="text-ink/80">
            We may update this policy as the product evolves. Material changes will be announced via
            email and a banner on the site.
          </p>

          <h2 className="font-serif text-2xl">Contact</h2>
          <p className="text-ink/80">
            Questions, requests, or concerns:{' '}
            <a className="underline" href="mailto:privacy@amunity.store">privacy@amunity.store</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
