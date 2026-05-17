import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';

export const metadata = buildMetadata({
  title: 'Our Story',
  description: 'Why we built AmunitY, a wellness brand that takes ingredients, sourcing, and your skin barrier seriously.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <header className="relative overflow-hidden bg-gradient-to-b from-plum-mist via-plum-soft/30 to-cream pt-16 pb-12">
        <div aria-hidden className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-plum/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
        <div className="container-x relative">
          <Reveal>
            <span className="chip border-plum/30 bg-cream text-plum-deep">Our story</span>
            <h1 className="h-display mt-4 max-w-3xl text-5xl leading-tight sm:text-6xl">
              We built the line we wished <span className="italic text-plum">existed.</span>
            </h1>
            <p className="mt-5 max-w-xl text-muted">
              Beauty boosters and immunity builders, formulated to compound. No greenwashing. No celebrity gimmicks. Just clinical concentrations and clean ingredients.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="container-x pb-20">
        <Reveal delay={120}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] shadow-lift sm:aspect-[16/10] lg:aspect-[16/9]">
            <Image
              src="/images/about/collage.png"
              alt="The AmunitY collection, skincare, supplements, gummies, and strips arranged with botanicals"
              fill
              priority
              sizes="(min-width: 1024px) 1240px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-muted">
            The full ritual · 21 products, two outcomes
          </p>
        </Reveal>
      </section>

      <section className="container-x grid items-center gap-12 pb-20 md:grid-cols-2">
        <Reveal>
          <h2 className="h-display text-3xl">A letter from the founder</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink/80">
            <p>
              Hi, friend, I'm so glad you're here. If you've ever felt dull, drained, or like a stranger
              in your own skin, you are not alone, and you are exactly where you're meant to be.
            </p>
            <p>
              A few years ago my body started fighting itself. Autoimmune doesn't show up as one symptom -
              it shows up as exhaustion you can't sleep off, skin that won't behave, and a mirror that
              stops feeling like yours. I tried everything. No one connected what was happening on my
              face to what was happening inside my body.
            </p>
            <p>
              I built AmunitY because I refused to accept that <em>tired and dull</em> was my new normal -
              and I know I'm not the only one. Real concentrations. Clean ingredients. Skin from the
              outside, strength from the inside. One ritual.
            </p>
            <p>
              You deserve to feel beautiful in the body you're in. You deserve energy that doesn't crash.
              You deserve to look in the mirror and recognize yourself again. That's why this exists.
            </p>
            <p className="font-serif text-xl text-plum">- Ashley Bowman, Founder</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src="/images/products/peptide-moisturizer.png" alt="Peptide Moisturizer" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src="/images/products/reishi-calm-drops.png" alt="Reishi Calm Drops" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src="/images/products/fruits-and-veggies.png" alt="Fruits and Veggies" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src="/images/products/beauty-collagen-strips.png" alt="Beauty Collagen Strips" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-blush-soft/30">
        <div className="container-x grid gap-10 py-20 md:grid-cols-3">
          {[
            { n: '01', t: 'Sourcing', b: 'Pharmaceutical-grade actives. Suppliers vetted on purity, traceability, and ethics.' },
            { n: '02', t: 'Formulation', b: 'Built with cosmetic chemists and registered dietitians. Real concentrations or we don\'t ship.' },
            { n: '03', t: 'Testing', b: 'Every batch third-party tested for purity and potency. COAs available on request.' },
          ].map((c) => (
            <div key={c.n}>
              <span className="font-serif text-5xl text-gold">{c.n}</span>
              <h3 className="mt-3 font-serif text-2xl">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20 text-center">
        <h2 className="h-display text-4xl">Ready to start the ritual?</h2>
        <Link href="/shop" className="btn-primary mt-8">
          Shop the collection
        </Link>
      </section>
    </>
  );
}
