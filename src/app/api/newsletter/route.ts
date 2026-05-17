import { NextResponse } from 'next/server';
import { subscribeToKlaviyo } from '@/lib/klaviyo';

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (process.env.KLAVIYO_PRIVATE_KEY) {
      await subscribeToKlaviyo(email, source ?? 'site');
    } else {
      console.log('[newsletter] no Klaviyo key, would subscribe:', email);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Subscribe failed' }, { status: 500 });
  }
}
