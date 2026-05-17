'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { cn } from '@/lib/cn';
import SearchOverlay from './SearchOverlay';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?cat=skincare', label: 'Skincare' },
  { href: '/shop?cat=supplements', label: 'Supplements' },
  { href: '/shop?cat=gummies', label: 'Gummies & Strips' },
  { href: '/science', label: 'Science' },
  { href: '/about', label: 'Our Story' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const itemCount = useCart((s) => s.itemCount());
  const toggleCart = useCart((s) => s.toggle);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-plum-deep via-plum to-plum-deep py-2 text-center text-xs tracking-wide text-cream">
        Beauty + Immunity, in one ritual · Free shipping over $50 · 60-day guarantee
      </div>
      <header
        className={cn(
          'fixed left-0 right-0 z-40 transition-all duration-300',
          scrolled ? 'top-0 bg-cream/90 shadow-soft backdrop-blur-md' : 'top-8 bg-cream/0'
        )}
      >
        <nav className="container-x flex h-16 items-center justify-between">
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="font-serif text-2xl font-semibold tracking-tight text-plum-deep">
            Amunit<span className="italic text-plum">Y</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-ink transition-colors hover:text-plum-deep"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="rounded-full p-2 hover:bg-ink/5"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => toggleCart(true)}
              aria-label="Open cart"
              className="relative rounded-full p-2 hover:bg-ink/5"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ink">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-ink/10 bg-cream lg:hidden">
            <ul className="container-x flex flex-col py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
