import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPost, blogPosts } from '@/data/blog';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = getPost(params.slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, image: p.cover });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="container-x py-16">
      <div className="mx-auto max-w-3xl">
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
          {post.category} · {post.readTime} · {post.date}
        </span>
        <h1 className="h-display mt-4 text-5xl leading-tight sm:text-6xl">{post.title}</h1>
        <p className="mt-5 text-lg text-muted">{post.excerpt}</p>
      </div>

      <div className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl">
        <Image src={post.cover} alt={post.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-5 text-lg leading-relaxed text-ink/85">
        <p>{post.body}</p>
        <p>
          The full editorial is published every other Tuesday, subscribe to The Ritual newsletter to get
          ingredient breakdowns, routine builds, and our research roundup directly.
        </p>
      </div>
    </article>
  );
}
