# Hosting — Country Sports

Follows the internal *Website Hosting Setup* SOP. No passwords, API tokens or other secrets go in this file.

## Decision (SOP Step 1)

| | |
|---|---|
| Hosting | **Our Railway account** (not the client's hosting) |
| Decided | 2026-10-26 |
| Railway project | `countrysports-website` |
| Production domain | _to be confirmed_ |
| Database | None (static product data lives in `lib/`) |
| CMS | None |

## Build & run

- Framework: Next.js 16 (Node ≥ 20.9)
- Build: `npm run build`
- Start: `npm start` (`next start` listens on Railway's `PORT`)
- `netlify.toml` is left over from an earlier Netlify setup and is not used on Railway.

## Environment variables (set in Railway → Variables, never in Git)

Both are `NEXT_PUBLIC_*`, so they are baked in at **build** time: redeploy after changing them.

| Name | Value |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Shop WhatsApp number, digits only with country code (e.g. `91XXXXXXXXXX`) |
| `NEXT_PUBLIC_SITE_URL` | Production origin, e.g. `https://www.example.com` (no trailing slash). Used for canonical links, Open Graph and the sitemap. |

Deploy access from Claude uses the `RAILWAY_API_TOKEN` environment variable only (SOP Step 4); it is never written into files or chat.

## Launch checklist (SOP Steps 6–8)

- [ ] Railway project created and deploy completes with no build errors
- [ ] Site loads on the Railway URL
- [ ] Environment variables set (WhatsApp buttons open the right number)
- [ ] Custom domain added in Railway and DNS records added at the domain provider
- [ ] DNS propagated, domain resolves
- [ ] HTTPS active; HTTP redirects to HTTPS
- [ ] www / non-www choice made and the other redirects to it
- [ ] Booking form, club enquiry form and string finder open WhatsApp correctly
- [ ] String packet photos and brand logos load
- [ ] Sitemap and canonical links use the production domain, not localhost or the Railway URL
- [ ] Repository connected to Railway (correct branch) — project is not in Git yet
