import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { getProduct, getRelated, products } from '@/data/products';
import { getReviews } from '@/data/reviews';
import { buildMetadata } from '@/lib/seo';
import Rating from '@/components/ui/Rating';
import Accordion from '@/components/ui/Accordion';
import ProductGrid from '@/components/ProductGrid';
import PdpActions from './PdpActions';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = getProduct(params.slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.title}, ${p.tagline}`,
    description: p.shortDescription,
    path: `/products/${p.slug}`,
    image: p.images[0],
  });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const reviews = getReviews(product.id);
  const related = getRelated(product.related);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: product.images,
    brand: { '@type': 'Brand', name: 'AmunitY' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Script id="ld-product" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="container-x py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-blush-soft/30">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img) => (
                  <div key={img} className="relative aspect-square overflow-hidden rounded-xl bg-blush-soft/30">
                    <Image src={img} alt={product.title} fill sizes="120px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted">{product.category}</span>
            <h1 className="h-display mt-2 text-4xl sm:text-5xl">{product.title}</h1>
            <p className="mt-2 text-lg text-muted">{product.tagline}</p>
            <div className="mt-4 flex items-center gap-4">
              <Rating value={product.rating} count={product.reviewCount} />
              <span className="text-xs text-muted">· {product.size}</span>
            </div>

            <p className="mt-6 leading-relaxed text-ink/80">{product.longDescription}</p>

            <PdpActions product={product} />

            <div className="mt-10">
              <Accordion
                items={[
                  {
                    q: 'Ingredients',
                    a: (
                      <ul className="space-y-3">
                        {product.ingredients.map((i) => (
                          <li key={i.name}>
                            <strong className="text-ink">{i.name}</strong>, {i.benefit}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    q: 'How to use',
                    a: (
                      <ol className="list-decimal space-y-2 pl-5">
                        {product.howToUse.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    ),
                  },
                  {
                    q: 'Shipping & returns',
                    a: 'Free US shipping on orders $50+. 60-day money-back guarantee on all products.',
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="mt-24 border-t border-ink/10 pt-16">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="chip">Verified reviews</span>
                <h2 className="h-display mt-3 text-3xl">{product.reviewCount.toLocaleString()} reviews</h2>
              </div>
              <Rating value={product.rating} count={product.reviewCount} />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {reviews.map((r) => (
                <article key={r.id} className="card p-6">
                  <Rating value={r.rating} compact />
                  <h3 className="mt-3 font-serif text-lg">{r.title}</h3>
                  <p className="mt-2 text-sm text-ink/80">{r.body}</p>
                  <p className="mt-4 text-xs text-muted">
                   , {r.author}{r.verified && ' · Verified Buyer'} · {r.date}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="h-display mb-8 text-3xl">You may also love</h2>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </>
  );
}
