'use client';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem('amunity_cookies')) setShow(true);
  }, []);

  const accept = (value: 'all' | 'essential') => {
    localStorage.setItem('amunity_cookies', value);
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl bg-ink p-5 text-cream shadow-lift sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed">
          We use cookies to improve your experience and for analytics. See our{' '}
          <a href="/privacy" className="underline">
            privacy policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => accept('essential')} className="btn border border-cream/30 text-cream hover:bg-cream hover:text-ink">
            Essential only
          </button>
          <button onClick={() => accept('all')} className="btn-gold">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
