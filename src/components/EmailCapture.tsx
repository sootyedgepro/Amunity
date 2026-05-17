'use client';
import { useState } from 'react';
import { trackEvent, Events } from '@/lib/analytics';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage_hero' }),
      });
      if (!res.ok) throw new Error('subscribe failed');
      trackEvent(Events.Newsletter, { method: 'email' });
      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('err');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-plum-deep via-plum to-plum-deep text-cream">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-plum/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="container-x relative grid items-center gap-10 py-20 md:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Welcome to the ritual</span>
          <h2 className="h-display mt-3 text-4xl sm:text-5xl">
            Get 15% off your first <span className="italic text-plum-soft">duo.</span>
          </h2>
          <p className="mt-4 max-w-md text-cream/70">
            Pair a beauty booster with an immunity builder, plus early access to launches, ingredient
            deep-dives, and rituals worth keeping.
          </p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="input flex-1"
          />
          <button type="submit" disabled={status === 'loading'} className="btn-gold">
            {status === 'loading' ? 'Sending…' : status === 'ok' ? 'Sent ✓' : 'Get 15% off'}
          </button>
        </form>
      </div>
    </section>
  );
}
