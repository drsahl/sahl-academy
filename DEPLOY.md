# SAHL.ie — Deployment Guide

## What You Have

A complete static website ready for deployment, now with **6-language support** (English, Arabic, Ukrainian, Russian, Somali, French):

```
sahl.ie/
├── index.html          # Homepage with central story
├── rights.html         # IPAS rights & medical letter guide
├── services.html       # Support services directory
├── health.html         # Healthcare access guide
├── legal.html          # Legal aid & advocacy
├── about.html          # About the initiative
├── 404.html            # Error page
├── css/
│   └── style.css       # All styling
├── js/
│   ├── i18n.js         # Internationalization engine (6 languages, RTL)
│   └── translations/   # Language files
│       ├── en.json     # English
│       ├── ar.json     # Arabic (RTL)
│       ├── uk.json     # Ukrainian
│       ├── ru.json     # Russian
│       ├── so.json     # Somali
│       └── fr.json     # French
└── DEPLOY.md           # This file
```

## Deploy to Cloudflare Pages (Recommended)

### Option A: Drag-and-Drop (Easiest)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Choose **Upload assets**
4. Drag the entire `sahl.ie/` folder contents (all HTML files + css/ + js/)
5. Cloudflare will give you a `.pages.dev` URL
6. To connect your custom domain (`sahl.ie`):
   - Go to the project **Settings** → **Custom domains**
   - Add `sahl.ie`
   - Follow Cloudflare's DNS instructions

### Option B: Git Integration

1. Push this folder to a GitHub/GitLab repo
2. In Cloudflare Pages, choose **Connect to Git**
3. Select your repo
4. Set build command: (leave empty — it's static HTML)
5. Set build output: `/` (root)
6. Deploy

### Option C: Wrangler CLI

If you have Wrangler installed:

```bash
cd sahl.ie
npx wrangler pages deploy . --project-name=sahl-ie
```

## Domain Setup

Since you own `sahl.ie`:

1. Add the domain to your Cloudflare account (if not already)
2. In Pages project settings, add `sahl.ie` as a custom domain
3. Cloudflare will auto-configure DNS — just approve

## No Build Step Needed

This is pure HTML/CSS/JS. No React, no bundler, no dependencies.
It will load instantly on Cloudflare's global CDN.

The site includes a custom **i18n engine** (`js/i18n.js`) that loads translations dynamically
from `js/translations/*.json`. Language preference is saved in `sessionStorage` — no cookies.
Arabic renders right-to-left (RTL) automatically.

## Google Services (Optional)

If you want to add later:
- **Google Analytics**: Add the tracking script to `<head>` in each page
- **Google Search Console**: Verify via DNS record or HTML file upload

## File Locations

All files are in:
```
/Users/sahlmusa/Documents/kimi/workspace/sahl.ie/
```

Copy this entire folder to deploy.
# Deployed to Cloudflare Pages
Sun Aug 16 11:09:45 IST 2026
