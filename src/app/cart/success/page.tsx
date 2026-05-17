import Link from 'next/link';
import { Suspense } from 'react';
import ClearCart from './ClearCart';

export const metadata = {
  title: 'Thank you, AmunitY',
  description: 'Your order is confirmed.',
};

export default function SuccessPage() {
  return (
    <div className="container-x py-24 text-center">
      <Suspense fallback={null}>
        <ClearCart />
      </Suspense>
      <span className="chip border-plum/30 bg-cream text-plum-deep">Order confirmed</span>
      <h1 className="h-display mt-4 text-5xl sm:text-6xl">
        Thank you. <span className="italic text-plum">Your ritual is on its way.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-muted">
        We've emailed your receipt. Your order ships in 3–5 business days; you'll get tracking by
        email as soon as it leaves our facility.
      </p>
      <div className="mt-10 flex items-center justify-center gap-3">
        <Link href="/shop" className="btn-primary">Keep shopping</Link>
        <Link href="/" className="btn-ghost">Back home</Link>
      </div>
    </div>
  );
}
