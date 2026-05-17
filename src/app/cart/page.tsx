'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/store/cartStore';

export default function CartPage() {
  const { lines, remove, update, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="h-display text-5xl">Your bag is empty.</h1>
        <p className="mt-4 text-muted">Build a ritual — your skin will thank you.</p>
        <Link href="/shop" className="btn-primary mt-8">
          Shop the collection
        </Link>
      </div>
    );
  }

  const beginCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lines }),
    });
    const data = await res.json();
    if (data.checkoutUrl) window.location.href = data.checkoutUrl;
  };

  return (
    <div className="container-x py-16">
      <h1 className="h-display text-5xl">Your Bag</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
        <ul className="space-y-4">
          {lines.map((l) => (
            <li key={l.productId + l.subscription} className="card flex gap-5 p-5">
              <Image src={l.image} alt={l.title} width={120} height={120} className="h-28 w-28 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <Link href={`/products/${l.slug}`} className="font-serif text-xl">
                  {l.title}
                </Link>
                {l.subscription && (
                  <span className="mt-1 inline-block w-fit rounded-full bg-plum-mist px-2.5 py-0.5 text-[10px] font-medium text-plum-deep">
                    Subscribe & Save
                  </span>
                )}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-ink/10 px-3 py-1.5">
                    <button onClick={() => update(l.productId, l.quantity - 1)} aria-label="Decrease">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm">{l.quantity}</span>
                    <button onClick={() => update(l.productId, l.quantity + 1)} aria-label="Increase">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">${(l.price * l.quantity).toFixed(2)}</span>
                    <button onClick={() => remove(l.productId)} aria-label="Remove">
                      <Trash2 className="h-4 w-4 text-muted" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="card h-fit p-6">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-medium">${subtotal().toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="font-medium">{subtotal() >= 50 ? 'Free' : '$5.95'}</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3">
              <dt className="font-medium">Total</dt>
              <dd className="font-serif text-xl">
                ${(subtotal() + (subtotal() >= 50 ? 0 : 5.95)).toFixed(2)}
              </dd>
            </div>
          </dl>
          <button onClick={beginCheckout} className="btn-primary mt-6 w-full">
            Checkout securely
          </button>
          <p className="mt-3 text-center text-xs text-muted">60-day money-back guarantee.</p>
        </aside>
      </div>
    </div>
  );
}
