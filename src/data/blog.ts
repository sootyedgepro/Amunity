import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'vitamin-c-actually-works',
    title: 'How Vitamin C Actually Works (And Why Most Brands Get It Wrong)',
    excerpt:
      'Stability, concentration, pH, the three things that decide whether your serum brightens or oxidizes in the bottle.',
    category: 'Skincare Science',
    readTime: '5 min',
    date: '2026-04-22',
    cover: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80',
    body: `Vitamin C is the most studied skincare ingredient on earth, and the most poorly formulated. Here's what to look for...`,
  },
  {
    slug: 'gut-skin-axis',
    title: 'The Gut-Skin Axis: Why Your Probiotics Matter More Than Your Toner',
    excerpt:
      'Inflammation in the gut shows up on the face. The new research linking microbiome health to clear skin.',
    category: 'Wellness',
    readTime: '7 min',
    date: '2026-04-08',
    cover: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1400&q=80',
    body: `The skin-gut connection isn't a wellness trend, it's published science. Here's how to use it...`,
  },
  {
    slug: 'retinol-without-the-rage',
    title: 'Retinol Without the Rage: How to Actually Tolerate It',
    excerpt: 'A dermatologist-built ramp-up plan to get smoother skin without redness, flakes, or quitting after a week.',
    category: 'Routines',
    readTime: '4 min',
    date: '2026-03-30',
    cover: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=80',
    body: `Most retinol failures aren't the ingredient, they're the application strategy. Start here...`,
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
