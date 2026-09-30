# BigBear Abrasive

Marketing site for BigBear resin bonded grinding discs. Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Deploys to Vercel with no extra configuration.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
```

## Where things live

| What | Where |
| --- | --- |
| Product range (codes, sizes, grain, RPM) | `lib/products.ts` |
| Contact details (email, WhatsApp, phone, address) | `lib/site.ts` |
| Logo | `public/brand/logo-white.png` |
| Disc photos (cut out from the originals) | `public/products/*.webp` |
| Favicon / app icon / social share image | `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.png` |

Pages: `/` (home), `/products`, `/products/[code]` (one per model, prerendered), `/contact` (quote form).

## Before launch

1. **Contact details** — fill in `SITE.contact` in `lib/site.ts`. The quote form is switched off until an email or WhatsApp number is set; it then opens the visitor's email app / WhatsApp with the enquiry filled in.
2. **Site URL** — on Vercel the production URL is picked up automatically. For a custom domain, set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in the Vercel project's environment variables (used for the sitemap and share links).

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo. Framework preset: Next.js (auto-detected). No build settings to change.
3. Deploy. Later pushes to `main` redeploy automatically.

Or from the terminal: `npx vercel` (preview) and `npx vercel --prod`.
