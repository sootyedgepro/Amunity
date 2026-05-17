'use client';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { trackEvent, Events } from '@/lib/analytics';

export default function CartDrawer() {
  const { lines, isOpen, toggle, remove, update, subtotal } = useCart();

  const beginCheckout = async () => {
    trackEvent(Events.BeginCheckout, { value: subtotal(), items: lines.length });
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lines }),
    });
    const data = await res.json();
    if (data.checkoutUrl) window.location.href = data.checkoutUrl;
  };

  return (
    <>
      <div
        onClick={() => toggle(false)}
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-lift transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between border-b border-ink/10 p-5">
          <h2 className="font-serif text-xl">Your Cart</h2>
          <button onClick={() => toggle(false)} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-muted">Your cart is empty.</p>
            <Link href="/shop" onClick={() => toggle(false)} className="btn-primary">
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {lines.map((l) => (
                  <li key={l.productId + l.subscription} className="flex gap-4 rounded-2xl bg-white p-3 shadow-soft">
                    <Image src={l.image} alt={l.title} width={80} height={80} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <Link
                          href={`/products/${l.slug}`}
                          onClick={() => toggle(false)}
                          className="font-medium text-ink"
                        >
                          {l.title}
                        </Link>
                        <button onClick={() => remove(l.productId)} aria-label="Remove">
                          <Trash2 className="h-4 w-4 text-muted" />
                        </button>
                      </div>
                      {l.subscription && (
                        <span className="mt-0.5 inline-block w-fit rounded-full bg-plum-mist px-2 py-0.5 text-[10px] font-medium text-plum-deep">
                          Subscribe & Save
                        </span>
                      )}
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-ink/10 px-2 py-1">
                          <button onClick={() => update(l.productId, l.quantity - 1)} aria-label="Decrease">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm">{l.quantity}</span>
                          <button onClick={() => update(l.productId, l.quantity + 1)} aria-label="Increase">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-medium">${(l.price * l.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-ink/10 bg-white p-5">
              <div className="mb-4 flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold">${subtotal().toFixed(2)}</span>
              </div>
              <button onClick={beginCheckout} className="btn-primary w-full">
                Checkout
              </button>
              <p className="mt-3 text-center text-xs text-muted">Shipping and taxes calculated at checkout.</p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
