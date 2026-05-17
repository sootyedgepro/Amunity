import { Sparkles, Shield, Leaf } from 'lucide-react';
import Reveal from './Reveal';

const pillars = [
  {
    icon: Sparkles,
    accent: 'bg-blush-soft text-plum-deep',
    eyebrow: 'Beauty boosters',
    title: 'Visible glow, not gimmicks.',
    body:
      'Real concentrations of clinical actives — 15% vitamin C, 0.3% retinol, 2.5g marine collagen — at levels proven to brighten, smooth, and firm.',
  },
  {
    icon: Shield,
    accent: 'bg-plum-mist text-plum-deep',
    eyebrow: 'Immunity builders',
    title: 'Defense at a cellular level.',
    body:
      'Black elderberry, zinc, vitamin D3, and probiotic strains that train the immune system the way it was meant to be trained — daily, gently, year-round.',
  },
  {
    icon: Leaf,
    accent: 'bg-gold/20 text-gold-deep',
    eyebrow: 'Inside + Out',
    title: 'A system, not a product.',
    body:
      'Skincare and supplements engineered to compound. Topical brightening meets cellular collagen. Barrier repair meets gut-skin balance. They work harder together.',
  },
];

export default function PillarBenefits() {
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip border-plum/30 bg-plum-mist text-plum-deep">Why AmunitY</span>
          <h2 className="h-display mt-4 text-4xl sm:text-5xl">
            Beauty + Immunity, <span className="italic text-plum">engineered to compound.</span>
          </h2>
          <p className="mt-4 text-muted">
            Most wellness brands sell you one half of the equation. We built the system that does both — at
            clinical concentrations, with clean ingredients.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 120}>
            <div className="card flex h-full flex-col p-8">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${p.accent}`}>
                <p.icon className="h-5 w-5" />
              </div>
              <span className="mt-6 text-[11px] uppercase tracking-[0.25em] text-muted">{p.eyebrow}</span>
              <h3 className="mt-2 font-serif text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
