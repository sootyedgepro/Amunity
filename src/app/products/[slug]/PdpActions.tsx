'use client';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/store/cartStore';
import { trackEvent, Events } from '@/lib/analytics';

export default function PdpActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [sub, setSub] = useState(false);
  const add = useCart((s) => s.add);

  const price = sub && product.subscriptionPrice ? product.subscriptionPrice : product.price;

  const handleAdd = () => {
    add({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: product.images[0],
      price,
      quantity: qty,
      subscription: sub,
    });
    trackEvent(Events.AddToCart, { item_id: product.id, value: price * qty, quantity: qty });
  };

  return (
    <div className="mt-8 space-y-5">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-3xl">${price.toFixed(2)}</span>
        {product.compareAtPrice && !sub && (
          <span className="text-base text-muted line-through">${product.compareAtPrice}</span>
        )}
      </div>

      {product.subscriptionPrice && (
        <div className="space-y-2 rounded-2xl border border-plum/25 bg-plum-mist/60 p-1">
          {[
            {
              id: false,
              title: 'One-time',
              sub: `$${product.price.toFixed(2)}`,
            },
            {
              id: true,
              title: 'Subscribe & Save 15%',
              sub: `$${product.subscriptionPrice.toFixed(2)} every 30 days · cancel anytime`,
            },
          ].map((opt) => (
            <button
              key={String(opt.id)}
              onClick={() => setSub(opt.id)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                sub === opt.id ? 'bg-cream shadow-soft' : ''
              }`}
            >
              <div>
                <p className="font-medium">{opt.title}</p>
                <p className="text-xs text-muted">{opt.sub}</p>
              </div>
              <span
                className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                  sub === opt.id ? 'border-plum bg-plum' : 'border-ink/30'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-full border border-ink/15 px-4 py-2.5">
          <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-sm font-medium">{qty}</span>
          <button onClick={() => setQty(qty + 1)} aria-label="Increase">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button onClick={handleAdd} className="btn-primary flex-1">
          Add to bag · ${(price * qty).toFixed(2)}
        </button>
      </div>
    </div>
  );
}
