import type { Metadata } from 'next';

const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://amunity.com';

export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/images/og-default.jpg',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${site}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'AmunitY',
      images: [{ url: image, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
