import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const duos = [
  {
    name: 'The Glow Duo',
    pitch: 'Edible collagen meets peptide firming. Skin glows from the cell up.',
    inside: { title: 'Beauty + Collagen Strips', sub: 'Hydrolyzed collagen + biotin', slug: 'beauty-collagen-strips' },
    outside: { title: 'Peptide Moisturizer', sub: 'Matrixyl 3000 + ceramides', slug: 'peptide-moisturizer' },
    image: '/images/products/peptide-moisturizer.png',
    accent: 'from-plum-mist via-plum-soft/40 to-cream',
  },
  {
    name: 'The Defense Duo',
    pitch: 'Whole-food immunity inside. Ancestral nourishment outside. Year-round resilience.',
    inside: { title: 'Fruits and Veggies', sub: '30+ whole-food sources', slug: 'fruits-and-veggies' },
    outside: { title: 'Tallow Cream', sub: 'Vitamins A, D, E, K', slug: 'tallow-cream-lemongrass-lavender' },
    image: '/images/products/tallow-cream-lemongrass-lavender.png',
    accent: 'from-blush-soft via-cream to-plum-mist',
  },
  {
    name: 'The Calm Duo',
    pitch: 'Reishi-rooted nervous system support inside. Lavender ritual outside. Softer days, deeper nights.',
    inside: { title: 'Reishi Calm Drops', sub: 'Adaptogenic stress support', slug: 'reishi-calm-drops' },
    outside: { title: 'Calming Lavender Soap', sub: 'Real lavender + clean oils', slug: 'calming-lavender-soap' },
    image: '/images/products/calming-lavender-soap.png',
    accent: 'from-plum-soft/40 via-cream to-blush-soft',
  },
];

export default function InsideOutDuo() {
  return (
    <section className="bg-gradient-to-b from-cream via-plum-mist/40 to-cream py-24">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip border-plum/30 bg-cream text-plum-deep">The system</span>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl">
              One outside. One inside. <span className="italic text-plum">Always together.</span>
            </h2>
            <p className="mt-4 text-muted">
              Pair a topical with its cellular partner — that's where the compound effect lives. Save 15%
              when you build any duo.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {duos.map((d, i) => (
            <Reveal key={d.name} delay={i * 120}>
              <article className={`card relative h-full overflow-hidden bg-gradient-to-br ${d.accent} p-7`}>
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-cream/60">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>

                <span className="text-[11px] uppercase tracking-[0.3em] text-plum-deep">
                  {d.name}
                </span>
                <h3 className="h-display mt-3 text-2xl text-ink">{d.pitch}</h3>

                <div className="mt-5 grid gap-3">
                  <Link
                    href={`/products/${d.outside.slug}`}
                    className="flex items-center justify-between rounded-2xl bg-cream/90 p-4 transition-colors hover:bg-cream"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted">Outside</p>
                      <p className="font-serif text-base">{d.outside.title}</p>
                      <p className="text-xs text-muted">{d.outside.sub}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-plum" />
                  </Link>
                  <Link
                    href={`/products/${d.inside.slug}`}
                    className="flex items-center justify-between rounded-2xl bg-cream/90 p-4 transition-colors hover:bg-cream"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted">Inside</p>
                      <p className="font-serif text-base">{d.inside.title}</p>
                      <p className="text-xs text-muted">{d.inside.sub}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-plum" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl bg-plum-deep p-8 text-cream sm:flex-row">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-plum-soft">Build a ritual</p>
              <p className="mt-2 font-serif text-2xl">Save 15% on every duo. Cancel anytime.</p>
            </div>
            <Link href="/shop" className="btn-gold whitespace-nowrap">
              Build my ritual
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
