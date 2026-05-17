'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchIcon, X } from 'lucide-react';
import { products } from '@/data/products';

const QUICK = [
  { q: 'skincare', label: 'Skincare' },
  { q: 'sleep', label: 'Sleep' },
  { q: 'collagen', label: 'Collagen' },
  { q: 'energy', label: 'Energy' },
  { q: 'gut', label: 'Gut health' },
  { q: 'mushroom', label: 'Mushrooms' },
];

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!open) {
      setQ('');
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.filter((p) => p.bestSeller).slice(0, 6);
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.tagline.toLowerCase().includes(s) ||
          p.shortDescription.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.ingredients.some((i) => i.name.toLowerCase().includes(s) || i.benefit.toLowerCase().includes(s))
      )
      .slice(0, 10);
  }, [q]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="container-x mt-20 max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-3xl bg-cream shadow-lift">
          <div className="flex items-center gap-3 border-b border-ink/10 px-6 py-4">
            <SearchIcon className="h-5 w-5 text-muted" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, ingredients, rituals…"
              className="flex-1 bg-transparent text-lg outline-none placeholder-muted/60"
            />
            <kbd className="hidden rounded-md border border-ink/10 bg-cream px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted sm:block">
              Esc
            </kbd>
            <button onClick={onClose} aria-label="Close search" className="rounded-full p-1 hover:bg-ink/5">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-4">
            {q.trim() === '' && (
              <>
                <p className="px-2 pb-2 text-[11px] uppercase tracking-[0.25em] text-muted">Popular searches</p>
                <div className="mb-3 flex flex-wrap gap-2 px-2">
                  {QUICK.map((qc) => (
                    <button
                      key={qc.q}
                      onClick={() => setQ(qc.q)}
                      className="rounded-full border border-plum/30 bg-plum-mist px-3 py-1 text-xs text-plum-deep transition-colors hover:bg-plum-soft"
                    >
                      {qc.label}
                    </button>
                  ))}
                </div>
                <p className="mt-4 px-2 pb-2 text-[11px] uppercase tracking-[0.25em] text-muted">Best sellers</p>
              </>
            )}

            {results.length === 0 ? (
              <div className="py-10 text-center text-muted">
                No results for &ldquo;{q}&rdquo;. Try <em>skincare</em>, <em>energy</em>, or <em>collagen</em>.
              </div>
            ) : (
              <ul className="grid gap-1">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-plum-mist/60"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-blush-soft/30">
                        <Image src={p.images[0]} alt={p.title} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-base">{p.title}</p>
                        <p className="truncate text-xs text-muted">{p.tagline}</p>
                      </div>
                      <span className="hidden shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted sm:block">
                        {p.category}
                      </span>
                      <span className="shrink-0 text-sm font-medium">${p.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
