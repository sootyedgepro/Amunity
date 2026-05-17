import Link from 'next/link';

export const metadata = {
  title: 'Checkout canceled — AmunitY',
  description: 'Your cart is still saved.',
};

export default function CanceledPage() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="h-display text-5xl sm:text-6xl">No worries.</h1>
      <p className="mx-auto mt-5 max-w-xl text-muted">
        Your bag is still saved. Pick up where you left off whenever you're ready.
      </p>
      <div className="mt-10 flex items-center justify-center gap-3">
        <Link href="/cart" className="btn-primary">Back to cart</Link>
        <Link href="/shop" className="btn-ghost">Keep browsing</Link>
      </div>
    </div>
  );
}
