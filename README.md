# JEDeye Landing Page

Investor demo landing page for **JEDeye** — the operating system for intelligent surgery. Built with Next.js, React 19, Tailwind CSS, and Framer Motion.

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| UI | React | 19.x |
| Styling | Tailwind CSS | 3.4.x |
| Components | shadcn/ui | Latest |
| Animations | Framer Motion | 12.x |
| Auth | NextAuth.js (Auth.js) | v5 beta |
| Forms | React Hook Form + Zod | 7.x / 4.x |
| Video | react-compare-slider | 3.x |
| Backend | Google Sheets API (googleapis) | 140.x |
| Deployment | Vercel | — |

## Features

- **Login gate** — Three co-founder photo cards + shared password (NextAuth.js v5 Credentials provider)
- **Glassmorphism theme** — Blurred surgical background with glass panels
- **AI demo** — Synchronized dual-video comparison slider (original vs. AI segmentation)
- **Responsive** — Mobile-first with hamburger nav, touch-friendly slider
- **Accessible** — WCAG 2.1 AA, keyboard navigation, reduced-motion support
- **SEO** — Open Graph, Twitter cards, JSON-LD structured data, sitemap

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (background, fonts, SessionProvider)
│   ├── globals.css             # Glass classes, page-bg, Tailwind
│   ├── login/
│   │   └── page.tsx            # Login page (photo cards + password)
│   ├── (main)/
│   │   ├── layout.tsx          # Main layout (Header + Footer)
│   │   └── page.tsx            # Landing page (all sections)
│   └── api/
│       ├── auth/[...nextauth]/route.ts  # NextAuth API route
│       ├── waitlist/route.ts
│       └── contact/route.ts
├── auth.ts                     # NextAuth config (Credentials provider, JWT)
├── middleware.ts                # Route protection (redirects to /login)
├── components/
│   ├── auth/                   # SessionProvider, LoginForm
│   ├── layout/                 # Header, Footer, MobileNav
│   ├── sections/               # Hero, About, Demo, Solutions, etc.
│   ├── demo/                   # VideoComparisonSlider, SegmentationLegend
│   ├── forms/                  # WaitlistForm, ContactForm
│   ├── shared/                 # SectionWrapper, SectorCard, EngineCard
│   ├── motion/                 # FadeIn animation wrapper
│   └── ui/                     # shadcn/ui (Button, Input, etc.)
├── config/
│   ├── content.ts              # All page copy
│   ├── site.ts                 # Nav links, metadata
│   ├── contact.ts              # Contact info
│   └── segmentation.ts         # AI segmentation class colors
├── hooks/                      # useScrollTo, useVideoSync, useMediaQuery, useParallax
├── lib/                        # utils, validations, google-sheets, rate-limit
└── types/                      # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 20 LTS
- npm

### Setup

1. Clone the repository and install dependencies:

```bash
cd demo/webapp/JEDeye_landing_page
npm install
```

2. Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

Required environment variables:

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | NextAuth.js secret (generate with `openssl rand -hex 32`) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google Cloud service account email |
| `GOOGLE_PRIVATE_KEY` | Service account private key (with `\n` line breaks) |
| `GOOGLE_SHEET_ID` | Google Sheets document ID |
| `GOOGLE_SHEET_WAITLIST_TAB` | Waitlist tab name (default: `Waitlist`) |
| `GOOGLE_SHEET_CONTACT_TAB` | Contact tab name (default: `Contact`) |
| `NEXT_PUBLIC_SITE_URL` | Site URL for metadata |

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/login`.

### Authentication

The login page shows three co-founder photo cards. Select a profile and enter the shared password (`JEDeye@2025!`) to access the landing page.

**Login flow:**
1. Any unauthenticated request → redirected to `/login` (via middleware)
2. Select photo card → enter password → Sign In
3. Authenticated users see the full landing page with Header/Footer
4. Visiting `/login` while authenticated → redirected to `/`

### Google Sheets Setup

1. Create a Google Cloud project and enable the Sheets API
2. Create a service account and download the JSON key
3. Create a Google Sheet with two tabs: "Waitlist" and "Contact"
4. Share the sheet with the service account email (Editor access)
5. Add the credentials to `.env`

## Build & Deploy

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

### Vercel Deployment

The app is deployed on Vercel. Environment variables must be set in the Vercel dashboard:

- `AUTH_SECRET` — required for NextAuth.js session encryption
- Google Sheets credentials — for form submissions
- `NEXT_PUBLIC_SITE_URL` — set to your domain (e.g., `https://jedeye.app`)

> **Note:** Do NOT set `NEXTAUTH_URL` — NextAuth.js v5 auto-detects the URL, and setting it manually causes webpack errors.

## Domain

- Production: `jedeye.app` (Squarespace DNS → Vercel)
- DNS records: A record (`@` → Vercel IP) + CNAME (`www` → Vercel DNS)
