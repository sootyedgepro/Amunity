'use client';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, payload?: unknown) => void };
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params);
  window.fbq?.('track', event, params);
  window.ttq?.track(event, params);
}

export const Events = {
  ViewItem: 'view_item',
  AddToCart: 'add_to_cart',
  BeginCheckout: 'begin_checkout',
  Purchase: 'purchase',
  Newsletter: 'newsletter_signup',
} as const;
