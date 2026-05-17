import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Reveal from '@/components/Reveal';

export const metadata = buildMetadata({
  title: 'Science & Ingredients',
  description: 'The actives we use, the concentrations we use them at, and the studies behind them.',
  path: '/science',
});

const groups = [
  {
    title: 'Skincare actives',
    items: [
      { n: 'Stabilized Vitamin C', b: 'Brightens, fades dark spots, defends against oxidative stress (Dark Spot Serums).' },
      { n: 'Niacinamide', b: 'Evens tone, strengthens barrier, calms reactive skin.' },
      { n: 'Matrixyl 3000 + Argireline', b: 'Peptides that signal collagen synthesis and smooth expression lines (Peptide Moisturizer).' },
      { n: 'Hyaluronic Acid (multi-MW)', b: 'Pulls water into multiple layers — plump, dewy hydration (Watermelon Moisturizer).' },
      { n: 'Grass-Fed Beef Tallow', b: 'Skin-identical fats with vitamins A, D, E, K. Recognized at the cellular level (Tallow Cream).' },
      { n: 'Real Lavender + Lemongrass', b: 'Authentic essential oils — calming aromatherapy and gentle antibacterial action.' },
    ],
  },
  {
    title: 'Supplement & gummy actives',
    items: [
      { n: '30+ Whole-Food Fruits & Vegetables', b: 'Polyphenols, vitamins, and phytonutrients from real produce — not synthetic isolates (Fruits and Veggies).' },
      { n: 'Hydrolyzed Collagen Peptides + Biotin', b: 'Supports skin elasticity, hair density, nail keratin (Beauty + Collagen Strips, Hair Skin Nails Strips).' },
      { n: 'Functional Mushrooms — Reishi, Lion\'s Mane, Cordyceps', b: 'Adaptogenic, nootropic, and immune-supportive (Reishi Drops, Mushroom Focus, Cordyceps Energy).' },
      { n: 'Ginkgo Biloba + Ginseng', b: 'Cerebral circulation and clean adaptogenic energy.' },
      { n: 'Probiotic Blend (5 Billion CFU) + Prebiotics', b: 'Gut-skin-immune axis support, shelf-stable (Probiotic + Metabolism Strips).' },
      { n: 'Melatonin (low-dose) + L-Theanine', b: 'Faster sleep onset, deeper rest, no grogginess (Sleep Strips).' },
      { n: 'Calcium + Magnesium + D3 + K2', b: 'Bone density and joint health, with K2 directing calcium to bone (Bone Support Strips).' },
    ],
  },
];

export default function SciencePage() {
  return (
    <>
      <header className="bg-gradient-to-b from-blush-soft/30 to-cream py-20">
        <div className="container-x">
          <Reveal>
            <span className="chip">The science</span>
            <h1 className="h-display mt-4 max-w-3xl text-5xl leading-tight sm:text-6xl">
              Real concentrations. Real evidence.
            </h1>
            <p className="mt-5 max-w-xl text-muted">
              We publish every active and its dose. Clinical studies linked. No proprietary blends hiding
              underdosed ingredients.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="container-x py-16">
        <div className="grid gap-16 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="h-display text-3xl">{g.title}</h2>
              <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                {g.items.map((i) => (
                  <li key={i.n} className="py-5">
                    <p className="font-medium">{i.n}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{i.b}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-plum-deep p-12 text-cream">
          <h2 className="h-display text-3xl">The gut-skin axis</h2>
          <p className="mt-4 max-w-3xl text-cream/80">
            More than 70% of immune cells live in the gut. The state of your microbiome shapes inflammation,
            barrier integrity, and even how your skin responds to topicals. That's why every AmunitY ritual
            pairs a topical with a cellular companion — they compound.
          </p>
          <Link href="/blog/gut-skin-axis" className="btn-gold mt-8">
            Read the deep-dive
          </Link>
        </div>
      </section>
    </>
  );
}
