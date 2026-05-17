import { buildMetadata } from '@/lib/seo';
import Accordion from '@/components/ui/Accordion';

export const metadata = buildMetadata({
  title: 'FAQ',
  description: 'Common questions about AmunitY products, subscriptions, ingredients, and shipping.',
  path: '/faq',
});

const faqs = [
  { q: 'Are your products clean / non-toxic?', a: 'Yes — every formula is free of parabens, sulfates, phthalates, synthetic fragrance, and artificial dyes. Each batch is third-party tested for purity.' },
  { q: 'Are your supplements safe?', a: 'All supplements are manufactured in cGMP-certified facilities and third-party tested for potency, heavy metals, and microbial contamination. They are not intended to diagnose, treat, cure, or prevent any disease.' },
  { q: 'How does Subscribe & Save work?', a: 'Choose Subscribe & Save on any product to save 15% and get auto-delivered every 30 days. Skip, swap, or cancel anytime from your account.' },
  { q: 'Where do you ship?', a: 'We ship across the US, Canada, UK, and EU. US orders $50+ ship free. International rates calculated at checkout.' },
  { q: 'What is your return policy?', a: '60-day money-back guarantee. If a product isn\'t for you, email hello@amunity.com for a full refund — no questions asked.' },
  { q: 'Are products vegan / cruelty-free?', a: 'All skincare is vegan and cruelty-free. Marine collagen gummies contain hydrolyzed fish-source collagen; all other gummies are vegan.' },
  { q: 'How fast will I see results?', a: 'Most customers notice changes within 2–4 weeks for skincare and 6–8 weeks for supplements. Consistency matters more than dose.' },
];

export default function FaqPage() {
  return (
    <div className="container-x py-20">
      <header className="mb-12 max-w-2xl">
        <span className="chip">Help center</span>
        <h1 className="h-display mt-4 text-5xl sm:text-6xl">FAQ</h1>
        <p className="mt-4 text-muted">
          Can't find what you're looking for? Email{' '}
          <a className="underline" href="mailto:hello@amunity.com">hello@amunity.com</a>.
        </p>
      </header>
      <div className="max-w-3xl">
        <Accordion items={faqs} />
      </div>
    </div>
  );
}
