'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import type { Product } from '@/types';
import Rating from './ui/Rating';
import { useCart } from '@/store/cartStore';
import { trackEvent, Events } from '@/lib/analytics';

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: product.images[0],
      price: product.price,
      subscription: false,
    });
    trackEvent(Events.AddToCart, { item_id: product.id, value: product.price });
  };

  return (
    <Link href={`/products/${product.slug}`} className="group card block overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-blush-mist">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.bestSeller && (
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink">
              Best Seller
            </span>
          )}
          {product.newArrival && (
            <span className="rounded-full bg-plum px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream">
              New
            </span>
          )}
        </div>
        <button
          onClick={quickAdd}
          aria-label="Quick add"
          className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-cream text-plum-deep opacity-0 shadow-soft transition-all duration-300 hover:bg-plum-deep hover:text-cream group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5">
        <span className="text-[10px] uppercase tracking-widest text-muted">{product.category}</span>
        <h3 className="mt-1 font-serif text-lg text-ink">{product.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted">{product.tagline}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-medium">${product.price}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted line-through">${product.compareAtPrice}</span>
            )}
          </div>
          <Rating value={product.rating} compact />
        </div>
      </div>
    </Link>
  );
}
