import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata } from '@/lib/seo';
import { blogPosts } from '@/data/blog';

export const metadata = buildMetadata({
  title: 'Journal',
  description: 'Skincare, immunity, and ritual writing from the AmunitY editorial.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="container-x py-20">
      <header className="mb-12">
        <span className="chip">Journal</span>
        <h1 className="h-display mt-4 text-5xl sm:text-6xl">Read & ritualize.</h1>
      </header>

      <div className="grid gap-10 md:grid-cols-3">
        {blogPosts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={p.cover}
                alt={p.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-5">
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
                {p.category} · {p.readTime}
              </span>
              <h3 className="mt-2 font-serif text-2xl leading-tight transition-colors group-hover:text-plum-deep">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
