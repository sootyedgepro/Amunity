'use client';
import { useMemo, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'supplements', label: 'Supplements' },
  { id: 'gummies', label: 'Gummies & Strips' },
  { id: 'best', label: 'Best Sellers' },
];

const sorts = [
  { id: 'popular', label: 'Popularity' },
  { id: 'price-asc', label: 'Price: low → high' },
  { id: 'price-desc', label: 'Price: high → low' },
  { id: 'new', label: 'New Arrivals' },
];

function ShopInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const cat = sp.get('cat') ?? 'all';
  const [sort, setSort] = useState('popular');

  const setCat = (id: string) => {
    const url = id === 'all' ? '/shop' : `/shop?cat=${id}`;
    router.push(url, { scroll: false });
  };

  const list = useMemo(() => {
    let r = [...products];
    if (cat === 'best') r = r.filter((p) => p.bestSeller);
    else if (cat === 'gummies') r = r.filter((p) => p.category === 'gummies' || p.category === 'strips');
    else if (cat !== 'all') r = r.filter((p) => p.category === cat);
    if (sort === 'price-asc') r.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') r.sort((a, b) => b.price - a.price);
    if (sort === 'new') r.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    if (sort === 'popular') r.sort((a, b) => b.reviewCount - a.reviewCount);
    return r;
  }, [cat, sort]);

  const headline = {
    all: 'Shop AmunitY',
    skincare: 'Skincare',
    supplements: 'Supplements',
    gummies: 'Gummies & Strips',
    best: 'Best Sellers',
  }[cat] ?? 'Shop AmunitY';

  const subhead = {
    all: 'Beauty boosters that brighten and firm. Immunity builders that defend at a cellular level. Filter for what your ritual needs today.',
    skincare: 'Clinical-grade serums, moisturizers, and ancestral formulations, engineered to work on the skin barrier, not against it.',
    supplements: 'Whole-food capsules and adaptogenic blends, daily nutrition that fills the gaps your diet leaves behind.',
    gummies: 'Dissolvable strips and gummies. Beauty, immunity, sleep, and focus, delivered without pills or powders.',
    best: 'The rituals our community keeps reordering. Start here.',
  }[cat] ?? '';

  return (
    <>
      <header className="relative overflow-hidden bg-gradient-to-b from-plum-mist via-plum-soft/30 to-cream py-16">
        <div aria-hidden className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-plum/15 blur-3xl" />
        <div className="container-x relative">
          <span className="chip border-plum/30 bg-cream text-plum-deep">Beauty + Immunity</span>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">
            {cat === 'all' ? (
              <>
                Shop Amunit<span className="italic text-plum">Y</span>
              </>
            ) : (
              headline
            )}
          </h1>
          <p className="mt-3 max-w-xl text-muted">{subhead}</p>
        </div>
      </header>

      <div className="container-x py-12">
        <div className="mb-8 flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setCat(t.id)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  cat === t.id ? 'bg-plum-deep text-cream' : 'border border-ink/15 hover:bg-ink/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm"
          >
            {sorts.map((s) => (
              <option key={s.id} value={s.id}>
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>

        {list.length > 0 ? (
          <ProductGrid products={list} />
        ) : (
          <div className="py-16 text-center text-muted">No products in this filter yet.</div>
        )}
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-x py-24">Loading…</div>}>
      <ShopInner />
    </Suspense>
  );
}
