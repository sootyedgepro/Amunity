export type ProductCategory = 'skincare' | 'supplements' | 'gummies' | 'strips' | 'bundles';

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  subscriptionPrice?: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  images: string[];
  shortDescription: string;
  longDescription: string;
  ingredients: { name: string; benefit: string }[];
  howToUse: string[];
  size: string;
  rating: number;
  reviewCount: number;
  spocketProductId?: string;
  shopifyVariantId?: string;
  related?: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface CartLine {
  productId: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  subscription: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  cover: string;
  body: string;
}
