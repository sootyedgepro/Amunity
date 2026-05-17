import Link from 'next/link';
import Image from 'next/image';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-plum-mist to-blush-soft/60">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-plum/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
      />

      <div className="container-x relative grid items-center gap-12 py-16 md:grid-cols-2 lg:py-24">
        <Reveal className="relative z-10">
          <span className="chip border-plum/30 bg-plum-mist text-plum-deep">
            Beauty boosters · Immunity builders
          </span>
          <h1 className="h-display mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Defend From Within.
            <br />
            <span className="italic text-plum">Glow From Without.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            One ritual. Two outcomes. Clinical-grade skincare on the outside,
            cellular immunity on the inside, formulated to compound, daily.
          </p>

          <ul className="mt-6 grid max-w-md grid-cols-2 gap-3 text-sm">
            {[
              { label: 'Brighter, firmer skin', sub: 'in 14–28 days*' },
              { label: 'Year-round immune defense', sub: 'elderberry + zinc + D3' },
              { label: 'Hair, nails, glow', sub: '2.5g marine collagen' },
              { label: 'Clean, clinical, tested', sub: 'third-party verified' },
            ].map((b) => (
              <li key={b.label} className="rounded-2xl border border-plum/15 bg-cream/70 p-3">
                <p className="font-medium text-ink">{b.label}</p>
                <p className="text-xs text-muted">{b.sub}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="btn-primary">
              Shop the ritual
            </Link>
            <Link href="/science" className="btn-ghost">
              See the science
            </Link>
          </div>
          <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-muted">
            *Self-reported in 14-day clinical user study, n=104
          </p>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-lift">
            <Image
              src="/images/products/watermelon-hydration-moisturizer.png"
              alt="AmunitY Watermelon Hydration Moisturizer"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-6 bottom-8 hidden rounded-2xl bg-cream p-5 shadow-lift md:block">
            <p className="font-serif text-2xl text-plum">93%</p>
            <p className="text-xs text-muted">said skin felt visibly brighter in 14 days*</p>
          </div>
          <div className="absolute -right-4 top-10 hidden rounded-2xl bg-plum-deep p-5 text-cream shadow-lift md:block">
            <p className="font-serif text-2xl text-gold">4.9★</p>
            <p className="text-xs text-cream/70">Avg. across 7,000+ reviews</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
