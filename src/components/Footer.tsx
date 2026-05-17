import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const cols = [
  {
    title: 'Shop',
    links: [
      { href: '/shop?cat=skincare', label: 'Skincare' },
      { href: '/shop?cat=supplements', label: 'Supplements' },
      { href: '/shop?cat=gummies', label: 'Gummies & Strips' },
      { href: '/shop?cat=best', label: 'Best Sellers' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { href: '/science', label: 'Science' },
      { href: '/blog', label: 'Journal' },
      { href: '/about', label: 'Our Story' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/shipping', label: 'Shipping & Returns' },
      { href: '/contact', label: 'Contact' },
      { href: '/subscriptions', label: 'Subscriptions' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-plum-deep text-cream">
      <div className="container-x grid gap-12 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="font-serif text-3xl font-semibold tracking-tight">
            Amunit<span className="italic text-plum-mid">Y</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
            Beauty boosters and immunity builders, engineered to work together. Skin from the outside in.
            Cellular defense from the inside out.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="rounded-full border border-cream/20 p-2 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-cream/80 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-xs text-cream/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} AmunitY Wellness, Inc. All rights reserved.</p>
          <p>Statements not evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
      </div>
    </footer>
  );
}
