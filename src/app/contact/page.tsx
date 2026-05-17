import { buildMetadata } from '@/lib/seo';
import { Mail, MessageCircle, Instagram } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Reach the AmunitY team — questions, press, partnerships.',
  path: '/contact',
});

const channels = [
  { icon: Mail, title: 'Customer care', body: 'hello@amunity.com', href: 'mailto:hello@amunity.com' },
  { icon: MessageCircle, title: 'Live chat', body: 'Mon–Fri, 9am–6pm ET', href: '#chat' },
  { icon: Instagram, title: 'Instagram DM', body: '@amunity', href: 'https://instagram.com' },
];

export default function ContactPage() {
  return (
    <div className="container-x py-20">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <span className="chip">Talk to us</span>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">Get in touch.</h1>
          <p className="mt-4 max-w-md text-muted">
            Real humans answer every email — usually within 24 hours, always with care.
          </p>
          <div className="mt-10 space-y-4">
            {channels.map((c) => (
              <a key={c.title} href={c.href} className="card flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blush-soft text-plum-deep">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-muted">{c.body}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form className="card space-y-4 p-8" action="https://formspree.io/f/your-id" method="POST">
          <h2 className="h-display text-3xl">Send us a note</h2>
          <input className="input" name="name" placeholder="Your name" required />
          <input className="input" name="email" type="email" placeholder="Email" required />
          <textarea className="input min-h-[140px] rounded-2xl py-4" name="message" placeholder="How can we help?" required />
          <button type="submit" className="btn-primary w-full">
            Send message
          </button>
          <p className="text-xs text-muted">
            For press / partnerships: <a className="underline" href="mailto:press@amunity.com">press@amunity.com</a>
          </p>
        </form>
      </div>
    </div>
  );
}
