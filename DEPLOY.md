# The Rights Guide — Deployment Guide

## ✅ Current Status: LIVE on GitHub Pages

**Live URL:** https://drsahl.github.io/sahl-academy/

The site is deployed and serving all pages, CSS, JS, and translations.

---

## What You Have

A complete static website with **6-language support** (English, Arabic, Ukrainian, Russian, Somali, French):

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

---

## 🚀 Deployment Options

### Option A: GitHub Pages (Current — Working)

The site is currently live via GitHub Pages, served directly from the `main` branch.

**To connect your custom domain (`education.sahl.ie` or similar):**

1. In your Cloudflare DNS dashboard, add a CNAME record:
   | Type | Name | Value |
   |---|---|---|
   | CNAME | `education` | `drsahl.github.io` |

2. In your GitHub repo → **Settings → Pages → Custom domain**, enter:
   - `education.sahl.ie`

3. GitHub will auto-issue an SSL certificate (takes 5–15 minutes).

### Option B: Cloudflare Pages (Your Preference — Currently Blocked)

Cloudflare Pages direct-upload API is returning 404s for deployments despite showing "success". This appears to be a Cloudflare API-side issue. Two manual workarounds:

#### B1: Cloudflare Dashboard (Drag-and-Drop)
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Choose **Upload assets**
4. Drag the entire `sahl.ie/` folder contents (all HTML files + css/ + js/)
5. Cloudflare will give you a `.pages.dev` URL
6. Add your custom domain in project **Settings → Custom domains**

#### B2: Wrangler CLI
```bash
cd /Users/sahlmusa/Documents/kimi/workspace/sahl.ie
npx wrangler pages deploy . --project-name=sahl-ie
```
*(Requires `wrangler login` with your Cloudflare account.)*

### Option C: Git Integration (Recommended Long-Term)

1. In Cloudflare Pages dashboard, choose **Connect to Git**
2. Select the `drsahl/sahl-academy` repo
3. Set build command: (leave empty — it's static HTML)
4. Set build output: `/` (root)
5. Deploy — Cloudflare will auto-deploy on every `git push`

---

## Domain Setup

Since you own `sahl.ie`:

1. Add the domain to your Cloudflare account (if not already)
2. In Pages project settings, add `education.sahl.ie` as a custom domain
3. Cloudflare will auto-configure DNS — just approve

---

## No Build Step Needed

This is pure HTML/CSS/JS. No React, no bundler, no dependencies.
It will load instantly on any CDN.

The site includes a custom **i18n engine** (`js/i18n.js`) that loads translations dynamically
from `js/translations/*.json`. Language preference is saved in `sessionStorage` — no cookies.
Arabic renders right-to-left (RTL) automatically.

---

## Google Services (Optional)

If you want to add later:
- **Google Analytics**: Add the tracking script to `<head>` in each page
- **Google Search Console**: Verify via DNS record or HTML file upload

---

## File Locations

All files are in:
```
/Users/sahlmusa/Documents/kimi/workspace/sahl.ie/
```

---

## Deployment History

- **Sun Aug 16 11:09 IST 2026** — Initial DEPLOY.md created
- **Sun Aug 16 13:30 IST 2026** — Site enabled on GitHub Pages (https://drsahl.github.io/sahl-academy/)
