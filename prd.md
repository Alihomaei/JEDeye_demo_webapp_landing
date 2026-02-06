# JEDeye Landing Page — Product Requirements Document

> **Version**: 2.1 | **Date**: 2026-02-06
> **Repo**: [Alihomaei/JEDeye_demo_webapp_landing](https://github.com/Alihomaei/JEDeye_demo_webapp_landing)
> **Live**: [jedeye.app](https://jedeye.app)

---

## 1. Purpose & Goals

**Primary goal**: Serve as an **investor pitch** landing page that demonstrates JEDeye's technology, vision, and credibility.

**Key objectives**:
- Showcase all 4 AI modules of the full platform (not just what's demo-ready)
- Lead with **technology demos** as the primary proof point
- Build credibility via institutional affiliations (Harvard Medical School, Mass General Brigham)
- Maintain a clear waitlist/contact funnel

---

## 2. Target Audience

| Audience | What they care about |
|----------|---------------------|
| **Investors (primary)** | Vision, technology differentiation, team, market size, traction |
| **Clinical partners** | Safety, accuracy, integration with existing OR equipment |
| **Surgeons** | Practical value, ease of use, demo quality |

---

## 3. Visual Design Direction

**Style**: Clean, bright, professional medical-tech — **as currently deployed on jedeye.app**.

| Property | Value |
|----------|-------|
| Background | White / light gray alternating sections |
| Primary accent | Teal (#0097A7) for CTAs, links, icons |
| Text | Dark charcoal primary, medium gray secondary |
| Cards | Subtle shadows, hover elevation effects |
| Typography | Inter font, hierarchical sizing |
| Motion | Subtle scroll-triggered fade-in-up (respects reduced-motion) |
| Layout | Single-page scroll, responsive mobile-first |

**No changes to the overall visual language** — refine, don't redesign.

---

## 4. Site Structure — Section Order

### Current sections (keep all):
1. **Hero** — Headline, tagline, CTAs
2. **About** — What is JEDeye
3. **Demo** — Interactive video comparison slider
4. **Solutions** — 3 sector cards (OR, Insurance, Education)
5. **How It Works** — 4 AI engine cards
6. **Waitlist** — Email signup
7. **Contact** — Form + sidebar info

### New sections to add:
8. **Partners / Affiliations** — Institutional logo bar
9. **Team / Advisors** — Founder cards with headshots
10. **Roadmap** — Visual timeline of milestones
11. **Pitch Video** — Embedded 8-minute pitch deck video

### Proposed final section order:
```
1. Hero
2. Partners (logo bar — establishes credibility immediately)
3. About
4. Demo (segmentation slider + real-time overwatch + 3D reconstruction + pitch video)
5. Solutions
6. How It Works (expanded to all 4 modules)
7. Roadmap
8. Team
9. Waitlist
10. Contact
```

> **Note**: Final order to be confirmed during implementation — can reorder easily.

---

## 5. Section Specifications

### 5.1 Hero (existing — keep)
- **Badge**: "Coming Soon"
- **Headline**: "3D Surgical Intelligence for the Modern OR"
- **Subheadline**: Current copy about transforming endoscopic video
- **CTAs**: "Join the Waitlist" (primary), "Learn More" (secondary)
- No changes planned unless specified later.

### 5.2 Partners / Affiliations (NEW)
- **Purpose**: Establish institutional credibility early on the page
- **Layout**: Horizontal logo bar, centered, subtle gray background
- **Logos**:
  - Harvard Medical School
  - Mass General Brigham
  - *(Additional logos can be added later)*
- **Style**: Grayscale logos, consistent height (~40-50px), hover to full color (optional)
- **No heading needed** — just a clean row of logos, possibly with a small label like "Affiliated with"

### 5.3 About (existing — keep)
- Current copy about monocular depth estimation and camera compatibility
- **Placeholder**: Product diagram area (dashed border) — to be filled later
- No changes planned unless specified later.

### 5.4 Demo (implemented — 4-tab carousel)
**Layout**: Tabbed carousel with Framer Motion slide transitions and prev/next navigation arrows.

**Tabs** (in order):

| # | Tab Label | Content | Video Asset | Playback |
|---|-----------|---------|-------------|----------|
| 1 | **AI Segmentation** | Dual-video comparison slider (react-compare-slider) with draggable handle + segmentation legend (12 color-coded anatomical/instrument classes) | `surgical-original.mp4/.webm` + `surgical-segmentation.mp4/.webm` | Autoplay, muted, loop, synced |
| 2 | **Real-time Overwatch** | Live instrument detection and annotation during a laparoscopic procedure (stapler annotator output) | `realtime-overwatch.mp4` (H.264, re-encoded from MPEG-4 Part 2) | Autoplay, muted, loop |
| 3 | **3D Reconstruction** | Gaussian splatting 3D digital twin from endoscopic video | `3d-reconstruction.mp4` | Autoplay, muted, loop |
| 4 | **Pitch Video** | 8-minute investor pitch deck overview | `pitch-deck.mp4` | Controls shown, user-initiated playback |

**Implementation details**:
- Tab buttons rendered from `demoContent.slides` array in `src/config/content.ts`
- Carousel logic in `src/components/demo/DemoCarousel.tsx`
- Active tab highlighted with `bg-primary text-white`; inactive tabs use `bg-gray-100`
- Each slide has a description shown below the carousel
- All videos served from `public/videos/`
- Videos requiring browser compatibility are re-encoded to H.264 with `faststart` flag

### 5.5 Solutions (existing — keep)
Three sector cards:
1. **Operating Room Efficiency** — 4 benefits
2. **Insurance & Quality Assurance** — 4 benefits
3. **Education & Training** — 4 benefits

No changes planned unless specified later.

### 5.6 How It Works (existing — expand to full platform)
**Current**: 4 engine cards (Vision, Spatial, Scoring, Interaction)

**Map to white paper's 4 modules** (full platform coverage):

| Current Card | White Paper Module | Coverage |
|-------------|-------------------|----------|
| Vision Engine | Module A — Computer Vision | Segmentation (nnU-Net), Detection (YOLO), Phase Recognition (TCN) |
| Spatial Engine | Module B — 3D Reconstruction | Gaussian Splatting, Body GPS / CT overlay |
| Scoring Engine | Module C — Safety & Performance | Tremor detection, agility scoring, gauze counter |
| Interaction Engine | Module D — Operational Intelligence | Predictive scheduling, risk engine, automated billing |

**Action**: Update card copy to reflect full module capabilities from white paper. Currently the descriptions are brief — expand to show the full scope of each module.

### 5.7 Roadmap (NEW)
- **Purpose**: Show investors the path from MVP to market
- **Layout**: Horizontal timeline (desktop), vertical on mobile
- **Milestones** (from white paper):

| Phase | Label | Description | Status |
|-------|-------|-------------|--------|
| 1 | **MVP Complete** | Core pipeline functional — segmentation, 3D recon, demo ready | Done |
| 2 | **Institutional Data Collection** | 50+ cases per procedure, 200+ hrs annotated video | In Progress |
| 3 | **Clinical Validation** | Multi-site validation studies, performance benchmarking | Upcoming |
| 4 | **FDA 510(k) Submission** | Regulatory clearance as Software as a Medical Device (SaMD) | Planned |
| 5 | **Market Launch** | Commercial deployment to hospital partners | Planned |

- **Style**: Clean timeline with dots/nodes, status indicators (completed/active/upcoming)

### 5.8 Team (NEW)
- **Purpose**: Show the people behind JEDeye — critical for investor confidence
- **Layout**: Horizontal card row (1-3 cards), centered
- **Card content per person**:
  - Headshot photo (circular crop)
  - Name
  - Title / Role
  - Brief credential (e.g., affiliation, degree)
  - Optional: LinkedIn link
- **Data**: `[PLACEHOLDER: founder names, titles, photos TBD]`
- **Style**: Clean white cards, consistent with site design

### 5.9 Waitlist (existing — keep)
- Email signup form (email required; name, org, role optional)
- Honeypot spam protection
- Google Sheets backend
- No changes planned unless specified later.

### 5.10 Contact (existing — keep)
- Contact form: name, email, org, subject, message
- Sidebar: email, phone, address, office hours
- Google Sheets backend
- No changes planned unless specified later.

---

## 6. Current Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 14.2.35 |
| UI | React | 18 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 3.4.1 |
| Animation | Framer Motion | 12.24.7 |
| Forms | react-hook-form + Zod | 7.70 / 4.3.5 |
| Video | react-compare-slider | 3.1.0 |
| Icons | lucide-react | 0.562 |
| Backend | Google Sheets API (googleapis) | 140 |
| Hosting | — | jedeye.app |

---

## 7. API Endpoints

### POST `/api/waitlist`
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | Yes | Valid email |
| name | string | No | Max 100 chars |
| organization | string | No | Max 200 chars |
| role | string | No | Max 100 chars |
| honeypot | string | Yes | Must be empty (spam trap) |

**Backend**: Appends row to Google Sheet (Waitlist tab)
**Rate limit**: 10 req/min per IP

### POST `/api/contact`
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes | Max 100 chars |
| email | string | Yes | Valid email |
| organization | string | No | Max 200 chars |
| subject | string | No | Max 200 chars |
| message | string | Yes | Max 2000 chars |
| honeypot | string | Yes | Must be empty (spam trap) |

**Backend**: Appends row to Google Sheet (Contact tab)
**Rate limit**: 10 req/min per IP

### Environment Variables Required
```
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_SHEET_ID
GOOGLE_SHEET_CONTACT_TAB    (default: "Contact")
GOOGLE_SHEET_WAITLIST_TAB   (default: "Waitlist")
NEXT_PUBLIC_SITE_URL         (default: "https://jedeye.app")
```

---

## 8. Architecture Notes

```
src/
├── app/
│   ├── page.tsx              # Main page — renders all sections in order
│   ├── layout.tsx            # Root layout (Header + Footer wrapper)
│   ├── globals.css           # CSS variables, base styles
│   └── api/
│       ├── contact/route.ts  # Contact form endpoint
│       └── waitlist/route.ts # Waitlist form endpoint
├── components/
│   ├── sections/             # One file per page section
│   ├── demo/                 # VideoComparisonSlider, SegmentationLegend
│   ├── forms/                # WaitlistForm, ContactForm
│   ├── layout/               # Header, Footer, MobileNav
│   ├── shared/               # SectionWrapper, SectorCard, EngineCard
│   └── ui/                   # shadcn/ui primitives (Button, Card, Input, Textarea)
├── config/
│   ├── content.ts            # All section copy (centralized)
│   ├── site.ts               # Site metadata, nav links, external URLs
│   ├── contact.ts            # Contact info (address, phone, email)
│   └── segmentation.ts       # 14 segmentation classes + colors
├── hooks/                    # useScrollTo, useVideoSync, useMediaQuery
├── lib/                      # google-sheets, rate-limit, validations, utils
└── types/                    # TypeScript interfaces
```

**Key patterns**:
- All content lives in `src/config/content.ts` — no hardcoded strings in components
- Sections use `SectionWrapper` for consistent padding, animation, and layout
- `FadeIn` / scroll-triggered animations via Framer Motion `whileInView`
- Accessibility: focus traps, ARIA labels, keyboard nav, reduced-motion support
- Security: honeypot fields, rate limiting, Zod validation

---

## 9. Open Items / Placeholders

| Item | Status | Notes |
|------|--------|-------|
| Founder names, titles, headshots | Done | Team section implemented with 3 founders |
| 3D reconstruction demo video | Done | `public/videos/3d-reconstruction.mp4` |
| Real-time Overwatch demo video | Done | `public/videos/realtime-overwatch.mp4` (H.264 re-encoded) |
| 8-minute pitch deck video | Done | `public/videos/pitch-deck.mp4` |
| Harvard Medical School logo | Done | `public/images/HMS.jpg` |
| Mass General Brigham logo | Done | `public/images/MGB.png` |
| Additional partner logos | TBD | If any beyond HMS + MGB |
| Section-specific copy changes | TBD | Review section-by-section during implementation |
| Product diagram for About section | TBD | Currently a dashed-border placeholder |

---

## 10. Implementation Approach

Work will proceed **section by section**, confirming details with the user at each step:

1. Add Partners/Affiliations logo bar
2. Expand Demo section (tabs or stacked layout for multiple demos)
3. Update How It Works cards with full module descriptions from white paper
4. Add Roadmap timeline section
5. Add Team section
6. Reorder sections in page.tsx to final layout
7. Fill in placeholders as assets become available

**Constraint**: Each implementation step will be scoped to avoid exceeding 50% of the context window. Questions will be asked via `AskUserQuestion` for every detail decision.
