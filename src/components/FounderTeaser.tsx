import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';

export default function FounderTeaser() {
  return (
    <section className="container-x py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
            <Image
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80"
              alt="Founder portrait"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="chip border-plum/30 bg-plum-mist text-plum-deep">Our story</span>
          <h2 className="h-display mt-4 text-4xl sm:text-5xl">
            Built by women who read <span className="italic text-plum">every label.</span>
          </h2>
          <p className="mt-5 text-muted">
            We started AmunitY because the wellness aisle was confusing, the prestige counter was
            overpriced, and almost no one was tying skin to immunity. So we built the line we
            wished existed — clinical, clean, and connected.
          </p>
          <Link href="/about" className="btn-ghost mt-8">
            Read the founder letter
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
