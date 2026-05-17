# Deploy Amunity to Production

Status: **build verified, ready to ship.** Path: Vercel (free hobby tier) + your Namecheap domain.

---

## Step 0 — One-time git setup (if you've never used git on this Mac)

```bash
git config --global user.name  "Your Name"
git config --global user.email "blkprt@icloud.com"
```

---

## Step 1 — Push to GitHub (recommended path)

This gives you auto-deploys on every push and a real source of truth.

```bash
cd ~/Cluade:Turbo/amunity
git init
git add .
git commit -m "Initial Amunity site"
```

Then go to **https://github.com/new**:
- Repo name: `amunity`
- **Private** (recommended — your customer-facing code, but no need to make it public)
- Don't add README/license/gitignore (we already have them)
- Create

GitHub will show you commands. Run the **"push existing repository"** block:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/amunity.git
git branch -M main
git push -u origin main
```

> **Skip-GitHub alternative:** install Vercel CLI and run `npx vercel` from the project. It uploads the build directly. Trade-off: no version history, no auto-deploy on push.

---

## Step 2 — Deploy to Vercel

1. Go to **https://vercel.com/signup** — sign in with GitHub
2. Click **Add New… → Project**
3. Pick the `amunity` repo → **Import**
4. Framework preset auto-detects **Next.js** — leave defaults
5. **Environment Variables**: none required for the site to load. (If you later wire up Shopify/Klaviyo, copy from `.env.example` and add them here.)
6. Click **Deploy**

You'll get a live URL in ~2 minutes, something like `amunity-abc123.vercel.app`. Confirm the site looks right at that URL before touching DNS.

---

## Step 3 — Add your Namecheap domain in Vercel

In your Vercel project:

1. **Settings → Domains**
2. Type `yourdomain.com` → **Add**
3. Vercel will also offer `www.yourdomain.com` — add both. Pick one as the redirect target (recommend redirecting `www` → root, or vice versa — your call).
4. Vercel will show one of two configurations. **Use Option B below** (keep DNS at Namecheap) — it's simpler and you don't have to migrate nameservers.

---

## Step 4 — Point Namecheap DNS at Vercel

1. Log in at **https://www.namecheap.com**
2. **Domain List → Manage** (next to your domain)
3. **Advanced DNS** tab
4. Delete the default "URL Redirect" / parking records that Namecheap added
5. Add these two records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **A Record** | `@` | `76.76.21.21` | Automatic |
| **CNAME Record** | `www` | `cname.vercel-dns.com.` | Automatic |

6. Save

> **Note:** Namecheap may auto-strip the trailing dot on the CNAME — that's fine.

Vercel's domain page will show `Invalid Configuration` for a few minutes, then flip to `Valid Configuration` once DNS propagates. Usually 5–30 minutes; can take up to 24 hrs in rare cases.

---

## Step 5 — Verify

Once Vercel shows the domain as valid:

```bash
# Check DNS has propagated
dig yourdomain.com +short            # should return 76.76.21.21
dig www.yourdomain.com +short        # should return Vercel CNAME chain

# Check HTTPS works (Vercel auto-issues a Let's Encrypt cert)
curl -I https://yourdomain.com
```

Open https://yourdomain.com in a browser — the site should load with a valid green-lock cert.

---

## Step 6 — After it's live

- **Auto-deploy is on.** `git push origin main` from your laptop = live in ~90 seconds.
- **Preview deploys** ship from every branch (`git checkout -b feature/x && git push`) — Vercel posts the preview URL on each PR.
- **Custom env vars** (Shopify, Klaviyo, Stripe, etc.) live in **Vercel → Settings → Environment Variables**. Add them, then redeploy.
- **Analytics**: enable Vercel Web Analytics in the project dashboard — one toggle, no code change needed.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Invalid Configuration` for >1 hour in Vercel | Re-check the A record on Namecheap is exactly `76.76.21.21` and the host is `@` (not blank, not your domain) |
| Site loads at `*.vercel.app` but not at your domain | DNS hasn't propagated — wait. Test with `dig` (above) |
| `next: command not found` when running build locally | Use `./node_modules/.bin/next build` (PATH issue, not project) |
| Cert hasn't issued (`https://` errors but `http://` works) | Wait 5 more minutes — Vercel issues the cert *after* DNS validates |
| Want to remove the `www` (or add it) | Vercel → Settings → Domains → click the domain → toggle redirect direction |

---

## Costs

- **Vercel Hobby:** free. Includes the site, preview deploys, HTTPS, and 100 GB bandwidth/mo. Plenty for launch.
- **Namecheap domain:** ~$10–15/yr, already paid.
- **Total to ship: $0 today.**

Upgrade to Vercel Pro ($20/mo) when you need: team members, password-protected previews, advanced analytics, or you cross the bandwidth cap.
