import Image from 'next/image';

const posts = [
  { src: '/images/products/watermelon-hydration-moisturizer.png', alt: 'Watermelon Hydration Moisturizer' },
  { src: '/images/products/beauty-collagen-strips.png', alt: 'Beauty + Collagen Strips' },
  { src: '/images/products/hair-skin-nails-strips.png', alt: 'Hair Skin Nails Strips' },
  { src: '/images/products/reishi-calm-drops.png', alt: 'Reishi Calm Drops' },
  { src: '/images/products/cordyceps-energy-gummies.png', alt: 'Cordyceps Energy Gummies' },
  { src: '/images/products/mushroom-focus-strips.png', alt: 'Mushroom Focus Strips' },
];

export default function InstagramFeed() {
  return (
    <section className="container-x py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="chip border-plum/30 bg-plum-mist text-plum-deep">@amunity</span>
          <h2 className="h-display mt-3 text-3xl sm:text-4xl">
            Follow the <span className="italic text-plum">ritual.</span>
          </h2>
        </div>
        <a href="https://instagram.com" className="text-sm font-medium underline-offset-4 hover:underline">
          @amunity
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {posts.map((p) => (
          <a
            key={p.src}
            href="https://instagram.com"
            className="group relative aspect-square overflow-hidden rounded-2xl bg-blush-mist"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 16vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-plum-deep/0 transition-colors duration-300 group-hover:bg-plum-deep/20" />
          </a>
        ))}
      </div>
    </section>
  );
}
