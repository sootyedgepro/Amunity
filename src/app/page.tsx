import Link from 'next/link';
import Hero from '@/components/Hero';
import PillarBenefits from '@/components/PillarBenefits';
import ProductGrid from '@/components/ProductGrid';
import PressStrip from '@/components/PressStrip';
import FounderTeaser from '@/components/FounderTeaser';
import EmailCapture from '@/components/EmailCapture';
import InstagramFeed from '@/components/InstagramFeed';
import InsideOutDuo from '@/components/InsideOutDuo';
import Reveal from '@/components/Reveal';
import { products, bestSellers } from '@/data/products';

export default function HomePage() {
  const featured = [...bestSellers(), ...products.filter((p) => !p.bestSeller)].slice(0, 8);

  return (
    <>
      <Hero />
      <PressStrip />
      <PillarBenefits />

      <section className="container-x pb-24">
        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="chip border-plum/30 bg-plum-mist text-plum-deep">Best sellers</span>
              <h2 className="h-display mt-3 text-4xl sm:text-5xl">
                Loved by 50,000+ <span className="italic text-plum">rituals.</span>
              </h2>
            </div>
            <Link href="/shop" className="text-sm font-medium underline-offset-4 hover:underline">
              Shop all →
            </Link>
          </div>
        </Reveal>
        <ProductGrid products={featured} />
      </section>

      <InsideOutDuo />
      <FounderTeaser />
      <EmailCapture />
      <InstagramFeed />
    </>
  );
}
