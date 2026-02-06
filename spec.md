# JEDeye Landing Page: Technical Specification

> **Generated:** January 7, 2026 (Updated)  
> **Source:** REQUIREMENTS.md + REQUIREMENTS.md Addendum  
> **Agent:** Spec-Architect (Synthesizer Agent)  
> **Next Agent:** Coder (receives this + one task at a time)

---

## 1. System Architecture Overview

### 1.1 Architecture Pattern
**Pattern:** Static Site Generation (SSG) with API Routes
```
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL CDN                              │
│    (Global Edge Network - Static Assets + Serverless Functions) │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS APPLICATION                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    STATIC PAGES (SSG)                    │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │   │
│  │  │  Hero   │ │  About  │ │  Demo   │ │Solutions│ ...   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    API ROUTES (Serverless)               │   │
│  │  ┌─────────────────┐    ┌─────────────────┐             │   │
│  │  │ /api/waitlist   │    │ /api/contact    │             │   │
│  │  └────────┬────────┘    └────────┬────────┘             │   │
│  └───────────┼──────────────────────┼──────────────────────┘   │
└──────────────┼──────────────────────┼──────────────────────────┘
               │                      │
               ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     GOOGLE SHEETS API                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              JEDeye Leads (Single Document)              │   │
│  │  ┌─────────────────┐    ┌─────────────────┐             │   │
│  │  │  Waitlist Tab   │    │   Contact Tab   │             │   │
│  │  └─────────────────┘    └─────────────────┘             │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Runtime | Node.js | 20 LTS | Server runtime for API routes |
| Framework | Next.js (App Router) | 15.x | SSG, API routes, image optimization, middleware |
| Language | TypeScript | 5.x | Type safety, better DX, fewer runtime errors |
| UI | React | 19.x | Component library |
| Styling | Tailwind CSS | 3.4.x | Utility-first styling, design system consistency |
| Components | shadcn/ui | Latest | Accessible, customizable base components |
| Animations | Framer Motion | 12.x | Scroll animations, hover effects, transitions |
| Auth | NextAuth.js (Auth.js) | v5 beta | Credentials login, JWT sessions, middleware protection |
| Forms | React Hook Form | 7.x | Performant form state management |
| Validation | Zod | 4.x | Schema validation for forms and API |
| Video Comparison | react-compare-slider | 3.x | Comparison slider UI with drag/touch/keyboard support |
| Google API | googleapis | 140.x | Google Sheets API integration |
| Deployment | Vercel | — | Zero-config hosting, global CDN, serverless |

### 1.3 Project Structure
```
jedeye-landing/
├── src/
│   ├── auth.ts                     # NextAuth.js v5 config (Credentials, JWT, callbacks)
│   ├── middleware.ts                # Route protection (redirects unauthenticated to /login)
│   ├── app/
│   │   ├── layout.tsx              # Root layout (background, fonts, SessionProvider)
│   │   ├── globals.css             # Global styles, glass classes, Tailwind imports
│   │   ├── favicon.ico             # JEDeye logo favicon
│   │   ├── icon.png                # Browser icon (32x32)
│   │   ├── apple-icon.png          # Apple touch icon (180x180)
│   │   ├── login/
│   │   │   └── page.tsx            # Login page (photo card selection + password)
│   │   ├── (main)/
│   │   │   ├── layout.tsx          # Main layout (Header + Footer, post-login)
│   │   │   └── page.tsx            # Landing page (assembles all sections)
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts    # NextAuth API route (GET + POST)
│   │   │   ├── waitlist/
│   │   │   │   └── route.ts        # POST handler for waitlist signups
│   │   │   └── contact/
│   │   │       └── route.ts        # POST handler for contact form
│   │   ├── robots.ts               # Dynamic robots.txt generation
│   │   └── sitemap.ts              # Dynamic sitemap generation
│   ├── components/
│   │   ├── auth/
│   │   │   ├── SessionProvider.tsx  # Client wrapper for next-auth/react SessionProvider
│   │   │   └── LoginForm.tsx       # Login form with photo cards + password
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── card.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Sticky navigation header
│   │   │   ├── MobileNav.tsx       # Mobile hamburger menu
│   │   │   └── Footer.tsx          # Footer with links and info
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Hero section
│   │   │   ├── Partners.tsx        # HMS + MGB logos
│   │   │   ├── About.tsx           # Product overview
│   │   │   ├── Demo.tsx            # Video comparison demo
│   │   │   ├── Solutions.tsx       # Three value levers
│   │   │   ├── WhyNow.tsx          # Market timing drivers
│   │   │   ├── HowItWorks.tsx      # Four AI modules
│   │   │   ├── Roadmap.tsx         # TRL milestones
│   │   │   ├── Team.tsx            # Co-founder cards
│   │   │   ├── Waitlist.tsx        # Waitlist signup
│   │   │   └── Contact.tsx         # Contact form + info
│   │   ├── demo/
│   │   │   ├── DemoCarousel.tsx    # Multi-slide demo carousel
│   │   │   ├── VideoComparisonSlider.tsx  # Comparison slider with videos
│   │   │   └── SegmentationLegend.tsx     # Interactive color key
│   │   ├── forms/
│   │   │   ├── WaitlistForm.tsx    # Waitlist form with validation
│   │   │   └── ContactForm.tsx     # Contact form with validation
│   │   ├── motion/
│   │   │   └── index.tsx           # FadeIn scroll-triggered animation wrapper
│   │   └── shared/
│   │       ├── SectionWrapper.tsx  # Reusable section container
│   │       ├── SectorCard.tsx      # Card for solutions section
│   │       └── EngineCard.tsx      # Card for How It Works section
│   ├── lib/
│   │   ├── google-sheets.ts        # Google Sheets API client and helpers
│   │   ├── utils.ts                # General utilities (cn function, etc.)
│   │   ├── validations.ts          # Zod schemas for form validation
│   │   └── rate-limit.ts           # Simple rate limiting utility
│   ├── config/
│   │   ├── site.ts                 # Site metadata, navigation links
│   │   ├── content.ts              # Page content (copy, descriptions)
│   │   ├── contact.ts              # Contact information constants
│   │   └── segmentation.ts         # Segmentation class definitions
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   └── hooks/
│       ├── useScrollTo.ts          # Smooth scroll hook
│       ├── useMediaQuery.ts        # Responsive breakpoint hook
│       ├── useVideoSync.ts         # Video synchronization hook
│       ├── useParallax.ts          # Parallax scroll hook
│       └── index.ts                # Barrel export
├── public/
│   ├── images/
│   │   ├── JEDeye_transparent_logo.png
│   │   ├── landing-bg.jpg          # Blurred surgical background (146KB)
│   │   ├── HMS.jpg                 # Harvard Medical School logo
│   │   ├── MGB.png                 # Mass General Brigham logo
│   │   ├── team/
│   │   │   ├── AT.jpg              # Ali Tavakkoli headshot
│   │   │   ├── FRN.webp            # Farhad R. Nezami headshot
│   │   │   └── AH.jpg              # Ali Homaei headshot
│   │   ├── icon-or.svg
│   │   ├── icon-insurance.svg
│   │   ├── icon-education.svg
│   │   ├── icon-vision.svg
│   │   ├── icon-spatial.svg
│   │   ├── icon-scoring.svg
│   │   └── icon-interaction.svg
│   ├── videos/
│   │   └── README.md               # Video encoding instructions
│   └── og-image.png                # Open Graph preview image
├── .env.example                    # Environment variables template
├── .env                            # Local environment variables (gitignored)
├── package.json
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── components.json                 # shadcn/ui configuration
└── README.md
```

---

## 2. Data Schema

### 2.1 Form Data Structures

Since this is a static site with Google Sheets as the backend, there is no traditional database. However, we define the data structures for type safety and validation.

#### Entity: WaitlistSignup
```typescript
// src/types/index.ts
interface WaitlistSignup {
  timestamp: string;      // ISO 8601 format, auto-generated
  email: string;          // Required, valid email
  name?: string;          // Optional, max 100 chars
  organization?: string;  // Optional, max 200 chars
  role?: string;          // Optional, max 100 chars
}
```

**Google Sheet Columns (Waitlist Tab):**
| Column | Header | Data Type |
|--------|--------|-----------|
| A | Timestamp | DateTime string |
| B | Email | String |
| C | Name | String |
| D | Organization | String |
| E | Role | String |

#### Entity: ContactSubmission
```typescript
// src/types/index.ts
interface ContactSubmission {
  timestamp: string;      // ISO 8601 format, auto-generated
  name: string;           // Required, max 100 chars
  email: string;          // Required, valid email
  organization?: string;  // Optional, max 200 chars
  subject?: string;       // Optional, max 200 chars
  message: string;        // Required, max 2000 chars
}
```

**Google Sheet Columns (Contact Tab):**
| Column | Header | Data Type |
|--------|--------|-----------|
| A | Timestamp | DateTime string |
| B | Name | String |
| C | Email | String |
| D | Organization | String |
| E | Subject | String |
| F | Message | String |

### 2.2 Validation Schemas
```typescript
// src/lib/validations.ts
import { z } from 'zod';

export const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().max(100).optional(),
  organization: z.string().max(200).optional(),
  role: z.string().max(100).optional(),
  honeypot: z.string().max(0), // Must be empty (spam protection)
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().max(200).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(1, 'Message is required').max(2000),
  honeypot: z.string().max(0), // Must be empty (spam protection)
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
```

### 2.3 Segmentation Class Definition
```typescript
// src/config/segmentation.ts

export interface SegmentationClass {
  id: number;
  name: string;
  hexColor: string;
  category: 'anatomy' | 'structures' | 'instruments' | 'other';
  visible: boolean; // Whether to show in legend
}

export const segmentationClasses: SegmentationClass[] = [
  { id: 0,  name: 'Black Background',       hexColor: '#7f7f7f', category: 'other',       visible: false },
  { id: 1,  name: 'Abdominal Wall',         hexColor: '#d28c8c', category: 'anatomy',     visible: true },
  { id: 2,  name: 'Liver',                  hexColor: '#ff7272', category: 'anatomy',     visible: true },
  { id: 3,  name: 'Gastrointestinal Tract', hexColor: '#e7469c', category: 'anatomy',     visible: true },
  { id: 4,  name: 'Fat',                    hexColor: '#bab74b', category: 'anatomy',     visible: true },
  { id: 5,  name: 'Grasper',                hexColor: '#aaff00', category: 'instruments', visible: true },
  { id: 6,  name: 'Connective Tissue',      hexColor: '#ff5500', category: 'anatomy',     visible: true },
  { id: 7,  name: 'Blood',                  hexColor: '#ff0000', category: 'structures',  visible: true },
  { id: 8,  name: 'Cystic Duct',            hexColor: '#ffff00', category: 'structures',  visible: true },
  { id: 9,  name: 'L-hook Electrocautery',  hexColor: '#a9ffb8', category: 'instruments', visible: true },
  { id: 10, name: 'Gallbladder',            hexColor: '#ffa0a5', category: 'anatomy',     visible: true },
  { id: 11, name: 'Hepatic Vein',           hexColor: '#003280', category: 'anatomy',     visible: true },
  { id: 12, name: 'Liver Ligament',         hexColor: '#6f4a00', category: 'anatomy',     visible: true },
  { id: 13, name: 'Outline (ignore)',       hexColor: '#ffffff', category: 'other',       visible: false },
];

// Helper to get visible classes only
export const visibleClasses = segmentationClasses.filter(c => c.visible);

// Helper to group by category
export const classesByCategory = {
  anatomy: segmentationClasses.filter(c => c.category === 'anatomy' && c.visible),
  structures: segmentationClasses.filter(c => c.category === 'structures' && c.visible),
  instruments: segmentationClasses.filter(c => c.category === 'instruments' && c.visible),
};
```

---

## 3. API Specification

### 3.1 API Design Standards

- **Base Path:** `/api`
- **Content-Type:** `application/json`
- **Error Format:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```
- **Success Format:**
```json
{
  "success": true,
  "message": "Human-readable success message"
}
```

### 3.2 Endpoints

#### POST /api/waitlist

**Description:** Submit a waitlist signup to Google Sheets.

**Authentication:** Public (no auth required)

**Request Body:**
```json
{
  "email": "string (required) - valid email address",
  "name": "string (optional) - subscriber name, max 100 chars",
  "organization": "string (optional) - company/institution, max 200 chars",
  "role": "string (optional) - job title, max 100 chars",
  "honeypot": "string (required) - must be empty string for spam protection"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Thank you! You're on the waitlist."
}
```

**Error Responses:**
- `400 Bad Request` — Validation failed
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please enter a valid email address"
  }
}
```
- `400 Bad Request` — Spam detected (honeypot filled)
```json
{
  "success": false,
  "error": {
    "code": "SPAM_DETECTED",
    "message": "Submission rejected"
  }
}
```
- `429 Too Many Requests` — Rate limit exceeded
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please try again later."
  }
}
```
- `500 Internal Server Error` — Google Sheets API failure
```json
{
  "success": false,
  "error": {
    "code": "SUBMISSION_FAILED",
    "message": "Unable to submit. Please try again or email us directly."
  }
}
```

**Implementation Notes:**
- Validate input with Zod schema
- Check honeypot field is empty
- Implement simple rate limiting (IP-based, 10 requests/minute)
- Generate timestamp server-side
- Append row to "Waitlist" tab in Google Sheets

---

#### POST /api/contact

**Description:** Submit a contact form message to Google Sheets.

**Authentication:** Public (no auth required)

**Request Body:**
```json
{
  "name": "string (required) - sender name, max 100 chars",
  "email": "string (required) - valid email address",
  "organization": "string (optional) - company/institution, max 200 chars",
  "subject": "string (optional) - message subject, max 200 chars",
  "message": "string (required) - message content, max 2000 chars",
  "honeypot": "string (required) - must be empty string for spam protection"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Message sent! We'll be in touch soon."
}
```

**Error Responses:**
- Same error format as `/api/waitlist`

**Implementation Notes:**
- Same validation and spam protection as waitlist
- Append row to "Contact" tab in Google Sheets

---

## 4. Component Specification

### 4.1 Component Hierarchy
```
App (layout.tsx) — Root: background, fonts, SessionProvider
│
├── /login (login/page.tsx) — Unauthenticated
│   ├── JEDeye Logo
│   ├── Glass Panel
│   └── LoginForm
│       ├── UserCards (3 photo cards with glass-card + teal ring)
│       ├── PasswordInput
│       ├── ErrorMessage
│       └── SubmitButton
│
└── / (main)/layout.tsx + (main)/page.tsx — Authenticated
    ├── Header
    │   ├── Logo (links to #top)
    │   ├── NavLinks (About, Demo, Solutions, How It Works, Contact)
    │   ├── CTAButton ("Join Waitlist")
    │   └── MobileNav
    │       ├── HamburgerButton
    │       └── MobileMenu (slide-out panel)
    ├── Main (page.tsx)
    │   ├── Hero
    │   │   ├── Badge ("Coming Soon")
    │   │   ├── Headline ("The Operating System for Intelligent Surgery")
    │   │   ├── Subheadline ("Intra-operative Brain")
    │   │   ├── PrimaryCTA ("Join the Waitlist")
    │   │   └── SecondaryCTA ("Learn More")
    │   ├── Partners (HMS + MGB logos)
    │   ├── About
    │   ├── Demo
    │   │   ├── DemoCarousel (multi-slide)
    │   │   ├── VideoComparisonSlider
    │   │   └── SegmentationLegend
    │   ├── Solutions (Time / Cost / Risk cards)
    │   ├── WhyNow (EPA mandate + Insurer adoption)
    │   ├── HowItWorks (Eyes / Map / Coach / Manager)
    │   ├── Roadmap (TRL 5 milestones)
    │   ├── Team (3 co-founder cards)
    │   ├── Waitlist (WaitlistForm)
    │   └── Contact (ContactForm + ContactInfo)
    └── Footer

Middleware (src/middleware.ts):
  - Unauthenticated → redirect to /login
  - Authenticated + /login → redirect to /
  - Excludes: _next, images/, videos/, favicon.ico, og-image.png, api/auth
```

### 4.2 Component Definitions

#### Component: Header

**Location:** `src/components/layout/Header.tsx`

**Purpose:** Sticky navigation bar with logo, nav links, and CTA. Transforms to mobile hamburger menu on small screens.

**Props:**
```typescript
interface HeaderProps {
  // No props - uses config/site.ts for navigation items
}
```

**State:**
- `isScrolled: boolean` — Whether page has scrolled past threshold (for background change)
- `isMobileMenuOpen: boolean` — Mobile menu visibility

**Behavior:**
- Fixed position at top of viewport
- Background transitions from transparent to white/blur when `isScrolled`
- On mobile (<768px): Shows hamburger icon, hides nav links
- Logo click scrolls to top
- Nav link click smooth-scrolls to section and closes mobile menu

**Styling:**
- Height: 64px (desktop), 56px (mobile)
- Z-index: 50
- Background: `bg-white/80 backdrop-blur-md` when scrolled
- Border-bottom: `border-b border-gray-200` when scrolled

---

#### Component: MobileNav

**Location:** `src/components/layout/MobileNav.tsx`

**Purpose:** Slide-out mobile navigation menu.

**Props:**
```typescript
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Behavior:**
- Slides in from right side of screen
- Overlay behind menu closes on click
- Focus trapped within menu when open
- Escape key closes menu
- All nav items close menu on click

**Accessibility:**
- `role="dialog"`, `aria-modal="true"`
- Focus trap with `tabindex` management
- Escape key handler

---

#### Component: Hero

**Location:** `src/components/sections/Hero.tsx`

**Purpose:** Full-viewport hero section with value proposition and CTAs.

**Props:**
```typescript
interface HeroProps {
  // No props - uses config/content.ts for copy
}
```

**Content (from config):**
- Badge: "Coming Soon"
- Headline: "3D Surgical Intelligence for the Modern OR"
- Subheadline: "JEDeye transforms standard endoscopic video into real-time 3D visualization and AI-powered insights—enhancing surgical precision, training, and quality assurance."
- Primary CTA: "Join the Waitlist" → scrolls to #waitlist
- Secondary CTA: "Learn More" → scrolls to #about

**Styling:**
- Min-height: 100vh (100dvh for mobile)
- Content vertically centered
- Background: gradient or subtle pattern
- Responsive typography scaling

---

#### Component: Demo

**Location:** `src/components/sections/Demo.tsx`

**Purpose:** Container section for the video comparison slider demonstrating JEDeye's AI capabilities.

**Props:**
```typescript
interface DemoProps {
  // No props - uses config/content.ts for copy
}
```

**Implementation:**
```typescript
// src/components/sections/Demo.tsx
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { VideoComparisonSlider } from '@/components/demo/VideoComparisonSlider';
import { SegmentationLegend } from '@/components/demo/SegmentationLegend';
import { demoContent } from '@/config/content';

export function Demo() {
  return (
    <SectionWrapper id="demo" background="gray">
      <div className="text-center mb-10">
        <h2 className="text-section-mobile lg:text-section-desktop text-text-primary mb-4">
          {demoContent.heading}
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          {demoContent.intro}
        </p>
      </div>
      
      <VideoComparisonSlider />
      <SegmentationLegend />
    </SectionWrapper>
  );
}
```

**Styling:**
- Background: alternate (gray) for visual distinction
- Heading centered with intro text below
- Max-width 2xl for intro paragraph

---

#### Component: useVideoSync Hook

**Location:** `src/hooks/useVideoSync.ts`

**Purpose:** Synchronizes two video elements to maintain frame-accurate playback, handling play/pause/seek/loop events.

**Signature:**
```typescript
interface UseVideoSyncOptions {
  syncThreshold?: number;  // Default: 0.05 (50ms)
  enabled?: boolean;       // Default: true
}

interface UseVideoSyncReturn {
  isPlaying: boolean;
  isSynced: boolean;
  error: Error | null;
  play: () => Promise<void>;
  pause: () => void;
  restart: () => void;
}

function useVideoSync(
  masterRef: RefObject<HTMLVideoElement>,
  slaveRef: RefObject<HTMLVideoElement>,
  options?: UseVideoSyncOptions
): UseVideoSyncReturn;
```

**Implementation:**
```typescript
// src/hooks/useVideoSync.ts
'use client';

import { useEffect, useState, useCallback, RefObject } from 'react';

const DEFAULT_SYNC_THRESHOLD = 0.05; // 50ms

export function useVideoSync(
  masterRef: RefObject<HTMLVideoElement>,
  slaveRef: RefObject<HTMLVideoElement>,
  options: UseVideoSyncOptions = {}
): UseVideoSyncReturn {
  const { syncThreshold = DEFAULT_SYNC_THRESHOLD, enabled = true } = options;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynced, setIsSynced] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;
    
    const master = masterRef.current;
    const slave = slaveRef.current;
    if (!master || !slave) return;

    let animationId: number;

    const syncLoop = () => {
      if (!master || !slave) return;
      
      const drift = Math.abs(master.currentTime - slave.currentTime);
      setIsSynced(drift <= syncThreshold);
      
      if (drift > syncThreshold) {
        slave.currentTime = master.currentTime;
      }
      
      if (!master.paused) {
        animationId = requestAnimationFrame(syncLoop);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      slave.play().catch(setError);
      animationId = requestAnimationFrame(syncLoop);
    };

    const handlePause = () => {
      setIsPlaying(false);
      slave.pause();
      cancelAnimationFrame(animationId);
    };

    const handleSeeked = () => {
      slave.currentTime = master.currentTime;
    };

    const handleEnded = () => {
      if (master.loop) {
        slave.currentTime = 0;
        master.currentTime = 0;
      }
    };

    // Handle buffering: pause both if one buffers
    const handleWaiting = () => {
      slave.pause();
    };

    const handleCanPlay = () => {
      if (!master.paused && slave.paused) {
        slave.play().catch(setError);
      }
    };

    master.addEventListener('play', handlePlay);
    master.addEventListener('pause', handlePause);
    master.addEventListener('seeked', handleSeeked);
    master.addEventListener('ended', handleEnded);
    master.addEventListener('waiting', handleWaiting);
    slave.addEventListener('waiting', () => master.pause());
    slave.addEventListener('canplay', handleCanPlay);

    return () => {
      cancelAnimationFrame(animationId);
      master.removeEventListener('play', handlePlay);
      master.removeEventListener('pause', handlePause);
      master.removeEventListener('seeked', handleSeeked);
      master.removeEventListener('ended', handleEnded);
      master.removeEventListener('waiting', handleWaiting);
    };
  }, [masterRef, slaveRef, syncThreshold, enabled]);

  const play = useCallback(async () => {
    const master = masterRef.current;
    if (master) {
      try {
        await master.play();
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    }
  }, [masterRef]);

  const pause = useCallback(() => {
    masterRef.current?.pause();
  }, [masterRef]);

  const restart = useCallback(() => {
    const master = masterRef.current;
    const slave = slaveRef.current;
    if (master && slave) {
      master.currentTime = 0;
      slave.currentTime = 0;
    }
  }, [masterRef, slaveRef]);

  return { isPlaying, isSynced, error, play, pause, restart };
}
```

**Key Behaviors:**
- Uses `requestAnimationFrame` for sync checking (NOT `timeupdate` event)
- Sync threshold: 50ms maximum drift before correction
- Master/slave relationship: master controls playback, slave follows
- Handles buffering: pauses both videos when either buffers
- Handles loop restart: synchronizes both to time 0

---

#### Component: VideoComparisonSlider

**Location:** `src/components/demo/VideoComparisonSlider.tsx`

**Purpose:** Renders two synchronized videos in a comparison slider using react-compare-slider.

**Props:**
```typescript
interface VideoComparisonSliderProps {
  className?: string;
}
```

**Internal State:**
- `masterRef: RefObject<HTMLVideoElement>` — Original video reference
- `slaveRef: RefObject<HTMLVideoElement>` — Segmentation video reference
- `isInView: boolean` — Whether slider is in viewport
- `isLoading: boolean` — Whether videos are loading
- `hasError: boolean` — Whether video loading failed
- `autoplayBlocked: boolean` — Whether autoplay was blocked by browser
- `hasInteracted: boolean` — Whether user has interacted (for animation hint)

**Implementation:**
```typescript
// src/components/demo/VideoComparisonSlider.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import { useVideoSync } from '@/hooks/useVideoSync';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { demoContent } from '@/config/content';

export function VideoComparisonSlider({ className }: VideoComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const masterRef = useRef<HTMLVideoElement>(null);
  const slaveRef = useRef<HTMLVideoElement>(null);
  
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();
  
  const { isPlaying, play, pause } = useVideoSync(masterRef, slaveRef, {
    enabled: isInView && !prefersReducedMotion,
  });

  // Intersection Observer for viewport detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Play/pause based on viewport
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    if (isInView && !isLoading && !hasError) {
      play().catch(() => setAutoplayBlocked(true));
    } else {
      pause();
    }
  }, [isInView, isLoading, hasError, prefersReducedMotion, play, pause]);

  // Handle video load events
  const handleLoadedData = () => {
    if (masterRef.current?.readyState >= 3 && slaveRef.current?.readyState >= 3) {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Handle manual play button click
  const handlePlayClick = async () => {
    try {
      await play();
      setAutoplayBlocked(false);
    } catch {
      // Still blocked, do nothing
    }
  };

  // Reduced motion: show static poster
  if (prefersReducedMotion) {
    return (
      <div className={cn('relative aspect-video max-w-[900px] mx-auto rounded-xl overflow-hidden shadow-lg', className)}>
        <img
          src="/videos/demo-poster.jpg"
          alt="Comparison of original surgical video and AI segmentation"
          className="w-full h-full object-cover"
        />
        <VideoLabels />
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className={cn('relative aspect-video max-w-[900px] mx-auto rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center', className)}>
        <p className="text-white text-center px-4">{demoContent.fallback.loadError}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('relative max-w-[900px] mx-auto', className)}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900 rounded-xl">
          <img src="/videos/demo-poster.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* Autoplay blocked overlay */}
      {autoplayBlocked && !isLoading && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-xl"
          aria-label="Play demo video"
        >
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <PlayIcon className="w-10 h-10 text-white ml-1" />
          </div>
        </button>
      )}

      <ReactCompareSlider
        className="aspect-video rounded-xl overflow-hidden shadow-lg"
        position={35}
        onPositionChange={() => setHasInteracted(true)}
        handle={<CustomSliderHandle showHint={!hasInteracted && isInView} />}
        itemOne={
          <div className="relative w-full h-full">
            <video
              ref={masterRef}
              muted
              loop
              playsInline
              preload={isInView ? 'auto' : 'none'}
              poster="/videos/demo-poster.jpg"
              onLoadedData={handleLoadedData}
              onError={handleError}
              className="w-full h-full object-cover"
            >
              <source src="/videos/surgical-original.webm" type="video/webm" />
              <source src="/videos/surgical-original.mp4" type="video/mp4" />
            </video>
            <VideoLabel position="left" text={demoContent.labels.original} />
          </div>
        }
        itemTwo={
          <div className="relative w-full h-full">
            <video
              ref={slaveRef}
              muted
              loop
              playsInline
              preload={isInView ? 'auto' : 'none'}
              poster="/videos/demo-poster.jpg"
              onLoadedData={handleLoadedData}
              onError={handleError}
              className="w-full h-full object-cover"
            >
              <source src="/videos/surgical-segmentation.webm" type="video/webm" />
              <source src="/videos/surgical-segmentation.mp4" type="video/mp4" />
            </video>
            <VideoLabel position="right" text={demoContent.labels.segmentation} />
          </div>
        }
      />
    </div>
  );
}

// Subcomponent: Video Label
function VideoLabel({ position, text }: { position: 'left' | 'right'; text: string }) {
  return (
    <span
      className={cn(
        'absolute top-4 px-3 py-1.5 text-sm font-medium text-white bg-black/60 rounded',
        position === 'left' ? 'left-4' : 'right-4'
      )}
    >
      {text}
    </span>
  );
}

// Subcomponent: Video Labels (for static view)
function VideoLabels() {
  return (
    <>
      <VideoLabel position="left" text={demoContent.labels.original} />
      <VideoLabel position="right" text={demoContent.labels.segmentation} />
    </>
  );
}

// Subcomponent: Custom Slider Handle
function CustomSliderHandle({ showHint }: { showHint: boolean }) {
  return (
    <ReactCompareSliderHandle
      buttonStyle={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: '#0097A7',
        border: '3px solid white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'ew-resize',
      }}
      linesStyle={{
        width: 3,
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <div className={cn(
        'flex items-center gap-0.5 text-white',
        showHint && 'animate-pulse'
      )}>
        <ChevronLeftIcon className="w-4 h-4" />
        <ChevronRightIcon className="w-4 h-4" />
      </div>
    </ReactCompareSliderHandle>
  );
}

// Icon components
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
```

**Styling Requirements:**
- Container max-width: 900px, centered
- Aspect ratio: 16:9
- Border radius: 12px (rounded-xl)
- Shadow: shadow-lg
- Slider handle: 48px diameter, primary color (#0097A7), white icons
- Labels: semi-transparent black background, white text, top corners

**Accessibility:**
- Slider is keyboard accessible (Tab + Arrow keys via react-compare-slider)
- ARIA label on slider: "Video comparison slider"
- Focus states visible on handle
- `prefers-reduced-motion`: Show static poster instead

---

#### Component: SegmentationLegend

**Location:** `src/components/demo/SegmentationLegend.tsx`

**Purpose:** Displays color-coded legend for the 12 visible segmentation classes.

**Props:**
```typescript
interface SegmentationLegendProps {
  className?: string;
}
```

**Implementation:**
```typescript
// src/components/demo/SegmentationLegend.tsx
import { visibleClasses } from '@/config/segmentation';
import { demoContent } from '@/config/content';
import { cn } from '@/lib/utils';

export function SegmentationLegend({ className }: SegmentationLegendProps) {
  return (
    <div className={cn('mt-8 max-w-[900px] mx-auto', className)}>
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        {demoContent.legendTitle}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {visibleClasses.map((segClass) => (
          <LegendItem key={segClass.id} name={segClass.name} hexColor={segClass.hexColor} />
        ))}
      </div>
    </div>
  );
}

interface LegendItemProps {
  name: string;
  hexColor: string;
}

function LegendItem({ name, hexColor }: LegendItemProps) {
  return (
    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-background-alt">
      <div
        className="w-5 h-5 rounded flex-shrink-0 border border-border"
        style={{ backgroundColor: hexColor }}
        aria-hidden="true"
      />
      <span className="text-sm text-text-primary truncate">{name}</span>
    </div>
  );
}
```

**Styling Requirements:**
- Grid: 4 columns on lg+, 3 columns on sm+, 2 columns on mobile
- Color swatch: 20px square, rounded corners
- Item container: light background (background-alt), rounded
- Gap between items: 12px

**Accessibility:**
- Color swatch has `aria-hidden="true"` (decorative)
- Text labels provide accessible names
- Sufficient contrast for text

---

#### Component: SectorCard

**Location:** `src/components/shared/SectorCard.tsx`

**Purpose:** Reusable card for displaying sector/solution information.

**Props:**
```typescript
interface SectorCardProps {
  icon: React.ReactNode;      // Icon component or image
  title: string;              // Card title (e.g., "OR Efficiency")
  description: string;        // Brief description (2-3 sentences)
  benefits: string[];         // 3-4 bullet points
}
```

**Styling:**
- Background: white
- Border: 1px solid border color
- Border-radius: 12px
- Shadow: subtle (shadow-sm), elevated on hover (shadow-md)
- Padding: 24px
- Hover: translateY(-2px) transition

---

#### Component: EngineCard

**Location:** `src/components/shared/EngineCard.tsx`

**Purpose:** Card for displaying AI engine information in How It Works section.

**Props:**
```typescript
interface EngineCardProps {
  icon: React.ReactNode;
  title: string;              // e.g., "Vision Engine"
  description: string;        // What this engine does
}
```

---

#### Component: WaitlistForm

**Location:** `src/components/forms/WaitlistForm.tsx`

**Purpose:** Email signup form for waitlist with validation.

**Props:**
```typescript
interface WaitlistFormProps {
  // No props - self-contained with internal state
}
```

**State:**
- Form state managed by `react-hook-form`
- `isSubmitting: boolean`
- `submitStatus: 'idle' | 'success' | 'error'`
- `errorMessage: string | null`

**Form Fields:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | email input | Yes | Valid email format |
| name | text input | No | Max 100 chars |
| organization | text input | No | Max 200 chars |
| role | text input | No | Max 100 chars |
| honeypot | hidden text | — | Must be empty |

**Behavior:**
- Client-side validation via Zod + react-hook-form
- On submit: POST to `/api/waitlist`
- Success: Show success message, clear form
- Error: Show error message, preserve form data
- Loading: Disable button, show spinner

---

#### Component: ContactForm

**Location:** `src/components/forms/ContactForm.tsx`

**Purpose:** Contact form for inquiries with validation.

**Props:** Same pattern as WaitlistForm

**Form Fields:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | text input | Yes | Min 1, max 100 chars |
| email | email input | Yes | Valid email format |
| organization | text input | No | Max 200 chars |
| subject | text input | No | Max 200 chars |
| message | textarea | Yes | Min 1, max 2000 chars |
| honeypot | hidden text | — | Must be empty |

---

#### Component: SectionWrapper

**Location:** `src/components/shared/SectionWrapper.tsx`

**Purpose:** Reusable wrapper for page sections with consistent spacing and scroll animations.

**Props:**
```typescript
interface SectionWrapperProps {
  id: string;                 // Section anchor ID
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray'; // Alternating backgrounds
}
```

**Behavior:**
- Wraps content in `<section>` with proper ID for anchor links
- Applies Framer Motion fade-in/slide-up animation on viewport entry
- Respects `prefers-reduced-motion`

---

## 5. Configuration & Constants

### 5.1 Site Configuration
```typescript
// src/config/site.ts
export const siteConfig = {
  name: 'JEDeye',
  tagline: '3D Surgical Intelligence',
  url: 'https://jedeye.ai', // Update with actual domain
  description: 'JEDeye transforms standard 2D endoscopic video into real-time 3D visualization and AI-powered surgical intelligence.',
  
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Demo', href: '#demo' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ],
  
  socialLinks: {
    // Add if provided
    // linkedin: 'https://linkedin.com/company/jedeye',
    // twitter: 'https://twitter.com/jedeye',
  },
  
  externalLinks: {
    nezamiLab: 'https://nezamilab.bwh.harvard.edu/',
    nezamiLabContact: 'https://nezamilab.bwh.harvard.edu/contact-us/',
    privacyPolicy: '#', // Update with actual policy link
  },
};
```

### 5.2 Contact Information
```typescript
// src/config/contact.ts
export const contactInfo = {
  email: 'frikhtegarnezami@bwh.harvard.edu',
  phone: '(+1) 617-525-3542',
  address: {
    street: '45 Francis Street',
    building: 'Thorn Building, Room 704A',
    city: 'Boston',
    state: 'MA',
    zip: '02115',
    full: '45 Francis Street, Thorn Building, Room 704A, Boston, MA 02115',
  },
  hours: 'Monday–Friday: 9:00 AM – 5:00 PM',
  institution: {
    name: 'Nezami Lab',
    affiliations: ['Harvard Medical School', 'Brigham and Women\'s Hospital'],
  },
};
```

### 5.3 Page Content
```typescript
// src/config/content.ts
export const heroContent = {
  badge: 'Coming Soon',
  headline: '3D Surgical Intelligence for the Modern OR',
  subheadline: 'JEDeye transforms standard endoscopic video into real-time 3D visualization and AI-powered insights—enhancing surgical precision, training, and quality assurance.',
  primaryCta: 'Join the Waitlist',
  secondaryCta: 'Learn More',
};

export const aboutContent = {
  heading: 'What is JEDeye?',
  paragraphs: [
    'JEDeye is an AI-enhanced surgical intelligence platform that converts standard 2D endoscopic video into actionable 3D intelligence using advanced Monocular Depth Estimation (MDE) technology.',
    'Unlike traditional systems that require expensive specialized equipment, JEDeye works with your existing endoscopic cameras—delivering spatial awareness, real-time guidance, and comprehensive performance analytics without hardware upgrades.',
  ],
};

export const demoContent = {
  heading: 'See It In Action',
  intro: 'Watch JEDeye\'s AI transform standard endoscopic video into real-time semantic segmentation. Drag the slider to compare the original footage with AI-identified anatomical structures.',
  legendTitle: 'Segmentation Key',
  labels: {
    original: 'Original Endoscopy',
    segmentation: 'AI Segmentation',
  },
  fallback: {
    loadError: 'Unable to load demo video. Please check your connection or contact us for a demonstration.',
    autoplayBlocked: 'Tap to play demo',
  },
};

export const solutionsContent = {
  heading: 'Who We Serve',
  cards: [
    {
      id: 'or-efficiency',
      icon: 'icon-or',
      title: 'Operating Room Efficiency',
      description: 'Streamline surgical workflows and reduce OR costs with AI-powered visualization and real-time guidance.',
      benefits: [
        'Reduce OR turnover time with intelligent workflow optimization',
        'Enhance surgeon spatial awareness without specialized equipment',
        'Decrease procedure duration through improved visualization',
        'Lower equipment costs by leveraging existing endoscopic cameras',
      ],
    },
    {
      id: 'insurance-qa',
      icon: 'icon-insurance',
      title: 'Insurance & Quality Assurance',
      description: 'Objective documentation and scoring for risk management and continuous quality improvement.',
      benefits: [
        'Black box surgical recording for liability protection',
        'Objective skill assessment using validated scoring systems (GOALS)',
        'Automated documentation for quality audits and compliance',
        'Data-driven insights for malpractice risk reduction',
      ],
    },
    {
      id: 'education',
      icon: 'icon-education',
      title: 'Education & Training',
      description: 'Transform surgical education with AI-powered mentorship and competency tracking.',
      benefits: [
        'EPA-compliant competency assessment and tracking',
        'AI-powered feedback for residents and fellows',
        'Interactive case review with 3D visualization',
        'Automated quiz generation for self-assessment',
      ],
    },
  ],
};

export const howItWorksContent = {
  heading: 'The Technology',
  subheading: 'Four AI engines working together to transform surgical video into intelligence.',
  engines: [
    {
      id: 'vision',
      icon: 'icon-vision',
      title: 'Vision Engine',
      description: 'Processes raw endoscopic video in real-time, identifying anatomical structures, instruments, and surgical actions.',
    },
    {
      id: 'spatial',
      icon: 'icon-spatial',
      title: 'Spatial Engine',
      description: 'Converts 2D video to 3D using Monocular Depth Estimation, providing surgeons with enhanced spatial awareness.',
    },
    {
      id: 'scoring',
      icon: 'icon-scoring',
      title: 'Scoring Engine',
      description: 'Evaluates surgical performance using validated metrics like GOALS, providing objective skill assessment.',
    },
    {
      id: 'interaction',
      icon: 'icon-interaction',
      title: 'Interaction Engine',
      description: 'Delivers real-time feedback, generates educational content, and enables natural language queries about procedures.',
    },
  ],
};

export const waitlistContent = {
  heading: 'Be the First to Know',
  subheading: 'Join our waitlist to receive updates on JEDeye\'s launch and early access opportunities.',
  successMessage: 'Thank you! You\'re on the waitlist.',
  submitButton: 'Join Waitlist',
};

export const contactContent = {
  heading: 'Get in Touch',
  subheading: 'Have questions about JEDeye or interested in partnership opportunities? We\'d love to hear from you.',
  successMessage: 'Message sent! We\'ll be in touch soon.',
  submitButton: 'Send Message',
};
```

---

## 6. Environment Configuration

### 6.1 Environment Variables
```bash
# .env.example

# NextAuth.js v5 — generate with: openssl rand -hex 32
# IMPORTANT: Do NOT set NEXTAUTH_URL — v5 auto-detects, setting it causes webpack errors
AUTH_SECRET="your-auth-secret-here"

# Google Sheets API Configuration
# Create a service account in Google Cloud Console and download the JSON credentials
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project-id.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID="your-google-sheet-id-from-url"

# Sheet Tab Names (must match exactly)
GOOGLE_SHEET_WAITLIST_TAB="Waitlist"
GOOGLE_SHEET_CONTACT_TAB="Contact"

# Site URL (for metadata and sitemap)
NEXT_PUBLIC_SITE_URL="https://jedeye.app"

# Optional: Vercel Analytics
# (No env vars needed - automatically configured on Vercel)
```

### 6.2 Google Sheets Setup Instructions

1. Create a new Google Cloud project at https://console.cloud.google.com/
2. Enable the Google Sheets API
3. Create a Service Account:
   - Go to IAM & Admin > Service Accounts
   - Create new service account
   - Grant no project roles (not needed)
   - Create and download JSON key
4. Create a Google Sheet:
   - Create two tabs: "Waitlist" and "Contact"
   - Add headers to row 1 of each tab (as specified in Section 2.1)
   - Share the sheet with the service account email (Editor access)
5. Extract the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
6. Add environment variables to Vercel (or `.env.local` for development)

---

## 7. Video Asset Specifications

### 7.1 Video File Requirements

| Property | Value |
|----------|-------|
| Duration | ~50 seconds (exact match between both videos) |
| Frame Rate | 30fps (identical between both videos) |
| Resolution | 1280×720 (720p) |
| Aspect Ratio | 16:9 |
| Audio | None (removed) |

### 7.2 Encoding Specifications

**MP4 (H.264) — Fallback:**
```bash
ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level:v 4.1 \
  -b:v 2000k -maxrate 2500k -bufsize 5000k \
  -movflags +faststart -an -pix_fmt yuv420p \
  -vf "scale=1280:720" output.mp4
```

**WebM (VP9) — Primary:**
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 1500k \
  -maxrate 2000k -bufsize 4000k -an \
  -vf "scale=1280:720" output.webm
```

**Poster Frame:**
```bash
ffmpeg -i input.mp4 -ss 00:00:05 -vframes 1 -q:v 2 poster.jpg
```

### 7.3 Target File Sizes

| File | Format | Target Size |
|------|--------|-------------|
| surgical-original.webm | WebM VP9 | 5-8 MB |
| surgical-original.mp4 | MP4 H.264 | 8-12 MB |
| surgical-segmentation.webm | WebM VP9 | 5-8 MB |
| surgical-segmentation.mp4 | MP4 H.264 | 8-12 MB |
| demo-poster.jpg | JPEG | <100 KB |
| **Total** | — | **<50 MB** |

### 7.4 Browser Compatibility

| Browser | Video Format | Notes |
|---------|--------------|-------|
| Chrome 60+ | WebM (VP9) | Primary source |
| Firefox 53+ | WebM (VP9) | Primary source |
| Edge 79+ | WebM (VP9) | Primary source |
| Safari 14+ | MP4 (H.264) | Fallback source |
| iOS Safari 14+ | MP4 (H.264) | Requires `playsinline` attribute |

---

## 8. Error Handling Strategy

### 8.1 Client-Side Error Handling

**Form Validation Errors:**
- Display inline error messages below invalid fields
- Highlight invalid fields with red border
- Clear errors when user starts typing

**API Errors:**
- Display toast notification or inline message
- Preserve form data for retry
- Provide fallback contact method

**Video Errors:**
- Display poster image with loading indicator while buffering
- Show fallback message if videos fail to load
- Show play button if autoplay is blocked

**Network Errors:**
- Detect offline status
- Display "You appear to be offline" message
- Retry logic with exponential backoff (optional)

### 8.2 Server-Side Error Handling
```typescript
// API route error handling pattern
import { NextResponse } from 'next/server';

type ApiResponse = {
  success: boolean;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
};

// Success response helper
function successResponse(message: string): NextResponse<ApiResponse> {
  return NextResponse.json({ success: true, message }, { status: 200 });
}

// Error response helper
function errorResponse(
  code: string,
  message: string,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status }
  );
}

// Usage in API route:
// - Validation error: errorResponse('VALIDATION_ERROR', 'message', 400)
// - Spam detected: errorResponse('SPAM_DETECTED', 'Submission rejected', 400)
// - Rate limited: errorResponse('RATE_LIMITED', 'message', 429)
// - Server error: errorResponse('SUBMISSION_FAILED', 'message', 500)
```

### 8.3 Error Codes

| Code | HTTP Status | Meaning |
|------|-------------|---------|
| VALIDATION_ERROR | 400 | Input validation failed |
| SPAM_DETECTED | 400 | Honeypot field was filled |
| RATE_LIMITED | 429 | Too many requests from IP |
| SUBMISSION_FAILED | 500 | Google Sheets API error |

---

## 9. SEO & Metadata

### 9.1 Page Metadata
```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://jedeye.ai'),
  title: {
    default: 'JEDeye | 3D Surgical Intelligence for the Modern OR',
    template: '%s | JEDeye',
  },
  description: 'JEDeye transforms standard 2D endoscopic video into real-time 3D visualization and AI-powered surgical intelligence. Enhancing surgical precision, training, and quality assurance.',
  keywords: [
    'surgical AI',
    'endoscopic visualization',
    '3D surgery',
    'monocular depth estimation',
    'surgical training',
    'OR efficiency',
    'surgical quality assurance',
  ],
  authors: [{ name: 'Nezami Lab', url: 'https://nezamilab.bwh.harvard.edu/' }],
  creator: 'Nezami Lab, Harvard Medical School',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jedeye.ai',
    siteName: 'JEDeye',
    title: 'JEDeye | 3D Surgical Intelligence for the Modern OR',
    description: 'Transform standard endoscopic video into real-time 3D visualization and AI-powered surgical intelligence.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JEDeye - 3D Surgical Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JEDeye | 3D Surgical Intelligence for the Modern OR',
    description: 'Transform standard endoscopic video into real-time 3D visualization and AI-powered surgical intelligence.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 9.2 Structured Data (JSON-LD)
```typescript
// Add to layout.tsx or page.tsx
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'JEDeye',
  url: 'https://jedeye.ai',
  logo: 'https://jedeye.ai/images/JEDeye_transparent_logo.png',
  description: 'AI-enhanced surgical intelligence platform',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Nezami Lab',
    url: 'https://nezamilab.bwh.harvard.edu/',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '45 Francis Street, Thorn Building, Room 704A',
    addressLocality: 'Boston',
    addressRegion: 'MA',
    postalCode: '02115',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-617-525-3542',
    email: 'frikhtegarnezami@bwh.harvard.edu',
    contactType: 'customer service',
  },
};
```

---

## 10. Styling & Design Tokens

### 10.1 Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0097A7',
          dark: '#00796B',
          light: '#B2EBF2',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F8FAFC',
        },
        text: {
          primary: '#1E293B',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        success: '#10B981',
        error: '#EF4444',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-desktop': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-mobile': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'section-desktop': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'section-mobile': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        'section-desktop': '6rem',
        'section-mobile': '3rem',
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 10.2 CSS Variables (globals.css)
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 187 100% 33%;
    --primary-dark: 174 100% 22%;
    --primary-light: 187 69% 82%;
    --background: 0 0% 100%;
    --background-alt: 210 40% 98%;
    --text-primary: 222 47% 11%;
    --text-secondary: 215 16% 47%;
    --text-muted: 215 16% 65%;
    --success: 160 84% 39%;
    --error: 0 84% 60%;
    --border: 214 32% 91%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-text-primary;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Conventions & Standards

### 11.1 Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files (components) | PascalCase | `SectorCard.tsx` |
| Files (utilities) | camelCase | `googleSheets.ts` |
| Files (config) | camelCase | `site.ts` |
| React components | PascalCase | `WaitlistForm` |
| Functions | camelCase | `submitToGoogleSheets` |
| Variables | camelCase | `isSubmitting` |
| Constants | UPPER_SNAKE_CASE | `MAX_MESSAGE_LENGTH` |
| Types/Interfaces | PascalCase | `WaitlistFormData` |
| CSS classes | kebab-case (Tailwind) | `text-primary` |
| Section IDs | kebab-case | `how-it-works` |

### 11.2 Import Order
```typescript
// 1. React/Next.js imports
import { useState, useEffect } from 'react';
import Image from 'next/image';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

// 3. Internal components
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

// 4. Internal utilities/config
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

// 5. Types
import type { SectorCardProps } from '@/types';
```

### 11.3 Component File Structure
```typescript
// Component file template
'use client'; // Only if using hooks/interactivity

import { useState } from 'react';
import { cn } from '@/lib/utils';

// Types
interface ComponentNameProps {
  prop1: string;
  prop2?: number;
}

// Component
export function ComponentName({ prop1, prop2 = 0 }: ComponentNameProps) {
  // Hooks
  const [state, setState] = useState(false);
  
  // Handlers
  const handleClick = () => {
    setState(true);
  };
  
  // Render
  return (
    <div className={cn('base-styles')}>
      {/* Content */}
    </div>
  );
}
```

---

## 12. Accessibility Checklist

Per WCAG 2.1 Level AA requirements:

### 12.1 Semantic HTML
- [ ] Single `<h1>` in hero section
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] `<header>`, `<main>`, `<section>`, `<footer>` landmarks
- [ ] `<nav>` for navigation regions

### 12.2 Interactive Elements
- [ ] All buttons/links keyboard accessible
- [ ] Visible focus states (outline/ring)
- [ ] Skip to main content link
- [ ] Mobile nav focus trap
- [ ] Video comparison slider keyboard accessible (Tab + Arrow keys)

### 12.3 Forms
- [ ] Labels associated with inputs (`htmlFor`/`id`)
- [ ] Error messages linked with `aria-describedby`
- [ ] Required fields marked with `aria-required`
- [ ] Form validation errors announced

### 12.4 Images & Media
- [ ] Meaningful `alt` text for informational images
- [ ] Empty `alt=""` for decorative images
- [ ] Logo has descriptive alt text
- [ ] Videos respect `prefers-reduced-motion`
- [ ] Fallback content when videos can't load

### 12.5 Color & Contrast
- [ ] 4.5:1 contrast for normal text
- [ ] 3:1 contrast for large text (18px+ or 14px bold)
- [ ] Color not sole means of conveying information
- [ ] Segmentation legend uses text labels, not color alone

### 12.6 Motion
- [ ] `prefers-reduced-motion` respected
- [ ] No auto-playing videos/animations that can't be paused
- [ ] Demo section shows static poster when reduced motion preferred

---

## 13. Non-Functional Requirements

### 13.1 Performance (General)
- **PERF-001:** Page load (Time to Interactive) < 3 seconds on 4G
- **PERF-002:** Lighthouse Performance score ≥ 90
- **PERF-003:** Largest Contentful Paint (LCP) < 2.5 seconds
- **PERF-004:** Cumulative Layout Shift (CLS) < 0.1
- **PERF-005:** First Input Delay (FID) < 100ms
- **PERF-006:** Total bundle size < 500KB (gzipped)

### 13.2 Performance (Demo Section)
- **PERF-DEMO-001:** Videos lazy-load on viewport approach (Intersection Observer)
- **PERF-DEMO-002:** Video playback starts within 2 seconds of section entering viewport (4G)
- **PERF-DEMO-003:** Slider interaction response time <16ms (no perceptible lag)
- **PERF-DEMO-004:** Video preload="none" initially, switches to "auto" when in viewport
- **PERF-DEMO-005:** Poster image displayed while videos load (<100KB)
- **PERF-DEMO-006:** Combined video file size <50MB total

### 13.3 Accessibility (Demo Section)
- **ACC-DEMO-001:** Slider keyboard accessible (Tab to focus, Arrow keys to move)
- **ACC-DEMO-002:** Slider has ARIA label: "Video comparison slider"
- **ACC-DEMO-003:** `prefers-reduced-motion`: Static poster instead of video
- **ACC-DEMO-004:** Legend uses text labels, not color-only identification
- **ACC-DEMO-005:** Focus states visible on slider handle
- **ACC-DEMO-006:** Play button (when autoplay blocked) has accessible label

### 13.4 Mobile Considerations
- **MOBILE-001:** Touch/drag slider works smoothly on iOS and Android
- **MOBILE-002:** Videos play inline on iOS (not fullscreen) via `playsinline`
- **MOBILE-003:** Legend readable and columns adjust on small screens
- **MOBILE-004:** Slider handle meets 44px minimum touch target size
- **MOBILE-005:** No scroll conflicts during slider drag

---

*End of Technical Specification*