# JEDeye Landing Page: Implementation Tasks

> **Generated:** January 6, 2026  
> **Source:** SPEC.md  
> **Agent:** Spec-Architect (Synthesizer Agent)  
> **For:** Coder Agent (receives SPEC.md + one task at a time)

---

## Task Execution Protocol

**For the Human Orchestrator:**
1. Copy `SPEC.md` into a new Coder Agent session
2. Copy ONE task from this file into the same session
3. Let the Coder implement the task
4. Pass the output to the Judge Agent for verification
5. If APPROVED, move to the next task
6. If REJECTED, provide feedback to Coder and retry

**Task Status Legend:**
- [ ] Not started
- [x] Completed
- [!] Blocked

---

## Phase 1: Project Setup & Infrastructure

### TASK-001: Initialize Next.js Project with TypeScript
**Status:** [X]  
**Depends On:** None  
**Spec Reference:** SPEC.md Section 1.2 (Technology Stack), Section 1.3 (Project Structure)

**Objective:** Create a new Next.js 14 project with TypeScript and App Router.

**Instructions:**
1. Initialize a new Next.js project using `npx create-next-app@14` with the following options:
   - TypeScript: Yes
   - ESLint: Yes
   - Tailwind CSS: Yes
   - `src/` directory: Yes
   - App Router: Yes
   - Import alias: `@/*`
2. Verify the project runs with `npm run dev`
3. Clean up default boilerplate (remove default page content, keep layout structure)

**Acceptance Criteria:**
- [ ] Project runs with `npm run dev` on localhost:3000
- [ ] TypeScript compiles without errors
- [ ] App Router structure in place (`src/app/`)
- [ ] Tailwind CSS is functional
- [ ] Import alias `@/*` resolves to `src/*`

**Files to Create/Modify:**
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.ts`
- `postcss.config.js`
- `src/app/layout.tsx` (cleaned)
- `src/app/page.tsx` (cleaned)
- `src/app/globals.css` (Tailwind imports only)

---

### TASK-002: Create Folder Structure and Base Configuration Files
**Status:** [X]  
**Depends On:** TASK-001  
**Spec Reference:** SPEC.md Section 1.3 (Project Structure)

**Objective:** Set up the complete folder structure and create placeholder files.

**Instructions:**
1. Create all directories as specified in SPEC.md Section 1.3:
   - `src/components/ui/`
   - `src/components/layout/`
   - `src/components/sections/`
   - `src/components/forms/`
   - `src/components/shared/`
   - `src/lib/`
   - `src/config/`
   - `src/types/`
   - `src/hooks/`
   - `public/images/`
2. Create `.env.example` with all environment variables from SPEC.md Section 6.1
3. Add `.env.local` to `.gitignore` if not already present
4. Create `src/lib/utils.ts` with the `cn()` utility function for className merging

**Acceptance Criteria:**
- [ ] All directories from SPEC.md Section 1.3 exist
- [ ] `.env.example` contains all variables from SPEC.md Section 6.1
- [ ] `.env.local` is in `.gitignore`
- [ ] `cn()` utility function is exportable from `@/lib/utils`

**Files to Create:**
- `.env.example`
- `src/lib/utils.ts`
- Directory structure (empty folders with `.gitkeep` if needed)

---

### TASK-003: Configure Tailwind CSS with Design Tokens
**Status:** [X] 
**Depends On:** TASK-001  
**Spec Reference:** SPEC.md Section 9.1 (Tailwind Configuration), Section 9.2 (CSS Variables)

**Objective:** Configure Tailwind with JEDeye's design system colors, typography, and spacing.

**Instructions:**
1. Update `tailwind.config.ts` with the complete configuration from SPEC.md Section 9.1
2. Install `tailwindcss-animate` plugin: `npm install tailwindcss-animate`
3. Update `src/app/globals.css` with CSS variables and base styles from SPEC.md Section 9.2
4. Add Inter font via Next.js font optimization

**Acceptance Criteria:**
- [ ] Custom colors available: `primary`, `primary-dark`, `primary-light`, `background`, `background-alt`, `text-primary`, `text-secondary`, `text-muted`, `success`, `error`, `border`
- [ ] Custom font sizes work: `text-hero-desktop`, `text-hero-mobile`, `text-section-desktop`, `text-section-mobile`
- [ ] Spacing tokens available: `section-desktop`, `section-mobile`
- [ ] `max-w-container` (1200px) is available
- [ ] Inter font loads correctly
- [ ] `prefers-reduced-motion` styles in globals.css
- [ ] Smooth scroll behavior enabled

**Files to Modify:**
- `tailwind.config.ts`
- `src/app/globals.css`
- `src/app/layout.tsx` (add Inter font)

---

### TASK-004: Install and Configure shadcn/ui
**Status:** [X]  
**Depends On:** TASK-003  
**Spec Reference:** SPEC.md Section 1.2 (Technology Stack)

**Objective:** Initialize shadcn/ui and install required base components.

**Instructions:**
1. Initialize shadcn/ui: `npx shadcn-ui@latest init`
   - Style: Default
   - Base color: Slate
   - CSS variables: Yes
   - Tailwind config location: `tailwind.config.ts`
   - Components location: `src/components/ui`
   - Utils location: `src/lib/utils` (already created)
2. Install required components:
   - `npx shadcn-ui@latest add button`
   - `npx shadcn-ui@latest add input`
   - `npx shadcn-ui@latest add textarea`
   - `npx shadcn-ui@latest add card`
3. Verify components render correctly

**Acceptance Criteria:**
- [ ] `components.json` created with correct paths
- [ ] Button component importable from `@/components/ui/button`
- [ ] Input component importable from `@/components/ui/input`
- [ ] Textarea component importable from `@/components/ui/textarea`
- [ ] Card component importable from `@/components/ui/card`
- [ ] Components render without errors

**Files to Create:**
- `components.json`
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/card.tsx`

---

### TASK-005: Install Framer Motion and React Hook Form Dependencies
**Status:** [X]  
**Depends On:** TASK-001  
**Spec Reference:** SPEC.md Section 1.2 (Technology Stack)

**Objective:** Install animation and form handling dependencies.

**Instructions:**
1. Install Framer Motion: `npm install framer-motion`
2. Install React Hook Form: `npm install react-hook-form`
3. Install Zod and resolver: `npm install zod @hookform/resolvers`
4. Verify installations in package.json

**Acceptance Criteria:**
- [ ] `framer-motion` listed in dependencies
- [ ] `react-hook-form` listed in dependencies
- [ ] `zod` listed in dependencies
- [ ] `@hookform/resolvers` listed in dependencies
- [ ] No version conflicts or peer dependency warnings

**Files to Modify:**
- `package.json`
- `package-lock.json`

---

### TASK-006: Create TypeScript Types
**Status:** [X]  
**Depends On:** TASK-002  
**Spec Reference:** SPEC.md Section 2.1 (Form Data Structures), Section 4.2 (Component Props)

**Objective:** Define all TypeScript interfaces and types for the application.

**Instructions:**
1. Create `src/types/index.ts` with:
   - `WaitlistSignup` interface
   - `ContactSubmission` interface
   - `WaitlistFormData` type (form input, includes honeypot)
   - `ContactFormData` type (form input, includes honeypot)
   - `ApiResponse` type for API responses
   - `NavLink` interface for navigation items
   - `SectorCard` interface for solution cards
   - `EngineCard` interface for How It Works cards

**Acceptance Criteria:**
- [ ] All interfaces match SPEC.md Section 2.1 exactly
- [ ] Types are exportable from `@/types`
- [ ] No TypeScript errors
- [ ] Honeypot field included in form types

**Files to Create:**
- `src/types/index.ts`

---

### TASK-007: Create Zod Validation Schemas
**Status:** [X]  
**Depends On:** TASK-005, TASK-006  
**Spec Reference:** SPEC.md Section 2.2 (Validation Schemas)

**Objective:** Create Zod schemas for form validation.

**Instructions:**
1. Create `src/lib/validations.ts` with:
   - `waitlistSchema` with email (required), name (optional, max 100), organization (optional, max 200), role (optional, max 100), honeypot (must be empty string)
   - `contactSchema` with name (required, max 100), email (required), organization (optional, max 200), subject (optional, max 200), message (required, max 2000), honeypot (must be empty string)
2. Export inferred types from schemas

**Acceptance Criteria:**
- [ ] `waitlistSchema` validates correctly (test with valid/invalid data mentally)
- [ ] `contactSchema` validates correctly
- [ ] Honeypot validation: passes if empty, fails if filled
- [ ] Email validation includes proper format check
- [ ] Character limits enforced
- [ ] Schemas exportable from `@/lib/validations`

**Files to Create:**
- `src/lib/validations.ts`

---

### TASK-008: Create Site Configuration Files
**Status:** [X]  
**Depends On:** TASK-002  
**Spec Reference:** SPEC.md Section 5.1 (Site Configuration), Section 5.2 (Contact Information), Section 5.3 (Page Content)

**Objective:** Create configuration files for site metadata, contact info, and page content.

**Instructions:**
1. Create `src/config/site.ts` with site metadata and navigation links (copy from SPEC.md Section 5.1)
2. Create `src/config/contact.ts` with contact information (copy from SPEC.md Section 5.2)
3. Create `src/config/content.ts` with all page content (copy from SPEC.md Section 5.3)

**Acceptance Criteria:**
- [ ] `siteConfig` exportable from `@/config/site`
- [ ] `contactInfo` exportable from `@/config/contact`
- [ ] All content objects exportable from `@/config/content`
- [ ] Navigation links include: About, Solutions, How It Works, Contact
- [ ] All copy matches SPEC.md exactly

**Files to Create:**
- `src/config/site.ts`
- `src/config/contact.ts`
- `src/config/content.ts`

---

## Phase 2: Core Utilities & Hooks

### TASK-009: Create useScrollTo Hook
**Status:** [X]  
**Depends On:** TASK-002  
**Spec Reference:** SPEC.md Section 4.2 (Header behavior)

**Objective:** Create a custom hook for smooth scrolling to anchor sections.

**Instructions:**
1. Create `src/hooks/useScrollTo.ts`
2. Implement a hook that returns a `scrollTo` function
3. Function accepts a section ID (with or without #)
4. Scrolls smoothly to the element with proper offset for fixed header (64px)
5. Handle case where element doesn't exist gracefully

**Acceptance Criteria:**
- [ ] `useScrollTo` hook is exportable
- [ ] `scrollTo('about')` scrolls to element with id="about"
- [ ] `scrollTo('#about')` also works (strips #)
- [ ] Accounts for 64px header offset
- [ ] No errors if element doesn't exist
- [ ] Uses native smooth scroll behavior

**Files to Create:**
- `src/hooks/useScrollTo.ts`

---

### TASK-010: Create useMediaQuery Hook
**Status:** [X]  
**Depends On:** TASK-002  
**Spec Reference:** SPEC.md Section 4.2 (Responsive behavior)

**Objective:** Create a custom hook for detecting responsive breakpoints.

**Instructions:**
1. Create `src/hooks/useMediaQuery.ts`
2. Implement hook that accepts a media query string
3. Returns boolean indicating if query matches
4. Handle SSR (return false initially, update on mount)
5. Clean up event listener on unmount

**Acceptance Criteria:**
- [ ] `useMediaQuery('(min-width: 768px)')` returns true/false correctly
- [ ] No hydration mismatch errors (SSR safe)
- [ ] Updates on window resize
- [ ] Cleans up listener on unmount

**Files to Create:**
- `src/hooks/useMediaQuery.ts`

---

### TASK-011: Create Hooks Index Export
**Status:** [X]  
**Depends On:** TASK-009, TASK-010  
**Spec Reference:** SPEC.md Section 1.3

**Objective:** Create barrel export for hooks.

**Instructions:**
1. Create `src/hooks/index.ts`
2. Re-export all hooks from this file

**Acceptance Criteria:**
- [ ] `useScrollTo` importable from `@/hooks`
- [ ] `useMediaQuery` importable from `@/hooks`

**Files to Create:**
- `src/hooks/index.ts`

---

## Phase 3: Shared Components

### TASK-012: Create SectionWrapper Component
**Status:** [X]  
**Depends On:** TASK-004, TASK-005  
**Spec Reference:** SPEC.md Section 4.2 (SectionWrapper)

**Objective:** Create a reusable section wrapper with consistent spacing and scroll animations.

**Instructions:**
1. Create `src/components/shared/SectionWrapper.tsx`
2. Accept props: `id` (string), `children`, `className` (optional), `background` ('white' | 'gray', default 'white')
3. Wrap content in `<section>` with the provided id
4. Apply consistent vertical padding (section-desktop on lg+, section-mobile on mobile)
5. Apply max-width container and horizontal centering
6. Add Framer Motion animation: fade in and slide up on viewport entry
7. Respect `prefers-reduced-motion` (use `useReducedMotion` from framer-motion)

**Acceptance Criteria:**
- [ ] Component renders a `<section>` element with correct id
- [ ] Background toggles between white and gray-alt
- [ ] Padding is responsive (larger on desktop)
- [ ] Content is centered with max-width container
- [ ] Animation triggers when section enters viewport
- [ ] Animation is disabled when reduced motion is preferred
- [ ] Component is marked as client component (`'use client'`)

**Files to Create:**
- `src/components/shared/SectionWrapper.tsx`

---

### TASK-013: Create SectorCard Component
**Status:** [X]  
**Depends On:** TASK-004  
**Spec Reference:** SPEC.md Section 4.2 (SectorCard)

**Objective:** Create a reusable card component for the Solutions section.

**Instructions:**
1. Create `src/components/shared/SectorCard.tsx`
2. Accept props: `icon` (ReactNode), `title` (string), `description` (string), `benefits` (string[])
3. Use shadcn Card as base
4. Display icon at top, then title, then description, then bullet list of benefits
5. Apply hover effect: elevated shadow, slight translateY(-2px)
6. Ensure equal height in grid layout (flex-grow on content area)

**Acceptance Criteria:**
- [ ] Card renders all props correctly
- [ ] Hover state shows elevated shadow and slight lift
- [ ] Transition is smooth (200ms)
- [ ] Card maintains equal height with siblings in grid
- [ ] Benefits render as a styled list

**Files to Create:**
- `src/components/shared/SectorCard.tsx`

---

### TASK-014: Create EngineCard Component
**Status:** [X]  
**Depends On:** TASK-004  
**Spec Reference:** SPEC.md Section 4.2 (EngineCard)

**Objective:** Create a card component for the How It Works section.

**Instructions:**
1. Create `src/components/shared/EngineCard.tsx`
2. Accept props: `icon` (ReactNode), `title` (string), `description` (string)
3. Simpler than SectorCard (no benefits list)
4. Display icon, title, description in a clean layout
5. Apply subtle hover effect

**Acceptance Criteria:**
- [ ] Card renders icon, title, and description
- [ ] Consistent styling with SectorCard
- [ ] Hover effect is subtle but noticeable
- [ ] Works well in 4-column grid (desktop) and stacked (mobile)

**Files to Create:**
- `src/components/shared/EngineCard.tsx`

---

### TASK-015: Create Shared Components Index Export
**Status:** [X]  
**Depends On:** TASK-012, TASK-013, TASK-014  
**Spec Reference:** SPEC.md Section 1.3

**Objective:** Create barrel export for shared components.

**Instructions:**
1. Create `src/components/shared/index.ts`
2. Re-export all shared components

**Acceptance Criteria:**
- [ ] `SectionWrapper` importable from `@/components/shared`
- [ ] `SectorCard` importable from `@/components/shared`
- [ ] `EngineCard` importable from `@/components/shared`

**Files to Create:**
- `src/components/shared/index.ts`

---

## Phase 4: Layout Components

### TASK-016: Create Header Component
**Status:** [X]  
**Depends On:** TASK-003, TASK-004, TASK-009, TASK-008  
**Spec Reference:** SPEC.md Section 4.2 (Header)

**Objective:** Create the sticky navigation header for desktop.

**Instructions:**
1. Create `src/components/layout/Header.tsx`
2. Mark as client component (`'use client'`)
3. Implement state: `isScrolled` (boolean, true when scrollY > 10)
4. Fixed positioning at top, z-index 50
5. Background transitions: transparent → white/blur when scrolled
6. Contains: Logo (links to #top or /), nav links, CTA button
7. Get nav links from `siteConfig`
8. Logo uses Next.js Image component with JEDeye logo
9. Each nav link uses `useScrollTo` hook
10. CTA button: "Join Waitlist" → scrolls to #waitlist
11. Hide mobile hamburger for now (desktop only in this task)

**Acceptance Criteria:**
- [ ] Header is fixed at top of viewport
- [ ] Background changes on scroll (transparent → white with blur)
- [ ] Logo links to top of page
- [ ] Nav links smooth-scroll to correct sections
- [ ] CTA button scrolls to waitlist section
- [ ] Styled per SPEC.md (64px height, border on scroll)
- [ ] Nav links hidden on mobile (handled in TASK-017)

**Files to Create:**
- `src/components/layout/Header.tsx`

---

### TASK-017: Create MobileNav Component
**Status:** [X]  
**Depends On:** TASK-016  
**Spec Reference:** SPEC.md Section 4.2 (MobileNav)

**Objective:** Create the mobile navigation menu with hamburger toggle.

**Instructions:**
1. Create `src/components/layout/MobileNav.tsx`
2. Props: `isOpen` (boolean), `onClose` (function)
3. Slide-in panel from right side
4. Contains all nav links + CTA button
5. Clicking a link calls `onClose` and scrolls to section
6. Clicking overlay (behind menu) calls `onClose`
7. Escape key calls `onClose`
8. Focus trap: tab cycles within menu when open
9. Proper ARIA attributes: `role="dialog"`, `aria-modal="true"`
10. Update Header component to:
    - Show hamburger button on mobile (<768px)
    - Manage `isMobileMenuOpen` state
    - Render MobileNav conditionally

**Acceptance Criteria:**
- [ ] Hamburger visible only on mobile (<768px)
- [ ] Clicking hamburger opens slide-out menu
- [ ] Menu contains all nav links and CTA
- [ ] Clicking any link closes menu and scrolls
- [ ] Clicking overlay closes menu
- [ ] Escape key closes menu
- [ ] Focus is trapped within open menu
- [ ] Proper accessibility attributes present

**Files to Modify:**
- `src/components/layout/Header.tsx`

**Files to Create:**
- `src/components/layout/MobileNav.tsx`

---

### TASK-018: Create Footer Component
**Status:** [X]  
**Depends On:** TASK-003, TASK-004, TASK-008  
**Spec Reference:** SPEC.md Section 4.1 (Component Hierarchy - Footer)

**Objective:** Create the page footer with links and institutional information.

**Instructions:**
1. Create `src/components/layout/Footer.tsx`
2. Contains:
   - JEDeye logo (smaller version)
   - Navigation links (same as header)
   - External links: Nezami Lab, Privacy Policy
   - Institution affiliation text
   - Copyright notice with current year
3. Responsive layout: multi-column on desktop, stacked on mobile
4. Use contact info from `@/config/contact`
5. Use site config from `@/config/site`

**Acceptance Criteria:**
- [ ] Logo renders correctly
- [ ] All nav links present and functional
- [ ] External links open in new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- [ ] Institution affiliation displayed: "Nezami Lab, Harvard Medical School, Brigham and Women's Hospital"
- [ ] Copyright shows current year dynamically
- [ ] Responsive: stacks nicely on mobile

**Files to Create:**
- `src/components/layout/Footer.tsx`

---

### TASK-019: Create Layout Components Index Export
**Status:** [X]  
**Depends On:** TASK-016, TASK-017, TASK-018  
**Spec Reference:** SPEC.md Section 1.3

**Objective:** Create barrel export for layout components.

**Instructions:**
1. Create `src/components/layout/index.ts`
2. Re-export Header, MobileNav, Footer

**Acceptance Criteria:**
- [ ] All layout components importable from `@/components/layout`

**Files to Create:**
- `src/components/layout/index.ts`

---

## Phase 5: Form Components

### TASK-020: Create WaitlistForm Component
**Status:** [X]  
**Depends On:** TASK-004, TASK-005, TASK-007  
**Spec Reference:** SPEC.md Section 4.2 (WaitlistForm)

**Objective:** Create the waitlist signup form with validation.

**Instructions:**
1. Create `src/components/forms/WaitlistForm.tsx`
2. Mark as client component
3. Use `react-hook-form` with `zodResolver` and `waitlistSchema`
4. Fields:
   - Email (required) - Input component
   - Name (optional) - Input component
   - Organization (optional) - Input component
   - Role (optional) - Input component
   - Honeypot (hidden) - visually hidden input, tabindex=-1
5. Submit button using shadcn Button
6. State: `isSubmitting`, `submitStatus` ('idle' | 'success' | 'error'), `errorMessage`
7. On submit:
   - Set `isSubmitting` true
   - POST to `/api/waitlist`
   - On success: set status to 'success', reset form
   - On error: set status to 'error', set error message, preserve form
8. Display inline validation errors below fields
9. Display success message when status is 'success'
10. Display error message when status is 'error'
11. Use content from `@/config/content` for labels and messages

**Acceptance Criteria:**
- [ ] Form validates email format before submission
- [ ] Required field (email) shows error if empty on submit
- [ ] Optional fields don't show errors when empty
- [ ] Honeypot field is visually hidden but present in DOM
- [ ] Submit button shows loading state when submitting
- [ ] Success message displays on successful submission
- [ ] Error message displays on failed submission
- [ ] Form clears on success
- [ ] Form preserves data on error

**Files to Create:**
- `src/components/forms/WaitlistForm.tsx`

---

### TASK-021: Create ContactForm Component
**Status:** [X]  
**Depends On:** TASK-004, TASK-005, TASK-007  
**Spec Reference:** SPEC.md Section 4.2 (ContactForm)

**Objective:** Create the contact form with validation.

**Instructions:**
1. Create `src/components/forms/ContactForm.tsx`
2. Same structure as WaitlistForm but with different fields:
   - Name (required) - Input
   - Email (required) - Input
   - Organization (optional) - Input
   - Subject (optional) - Input
   - Message (required) - Textarea
   - Honeypot (hidden)
3. Use `contactSchema` for validation
4. POST to `/api/contact`
5. Same success/error handling pattern as WaitlistForm

**Acceptance Criteria:**
- [ ] Name, Email, Message are required
- [ ] Message uses Textarea component
- [ ] Textarea has character limit indicator (optional but nice)
- [ ] All validation, submission, and feedback behavior matches WaitlistForm
- [ ] Form accessible: proper labels, error announcements

**Files to Create:**
- `src/components/forms/ContactForm.tsx`

---

### TASK-022: Create Forms Index Export
**Status:** [X]  
**Depends On:** TASK-020, TASK-021  
**Spec Reference:** SPEC.md Section 1.3

**Objective:** Create barrel export for form components.

**Instructions:**
1. Create `src/components/forms/index.ts`
2. Re-export WaitlistForm, ContactForm

**Acceptance Criteria:**
- [ ] Both forms importable from `@/components/forms`

**Files to Create:**
- `src/components/forms/index.ts`

---

## Phase 6: Page Section Components

### TASK-023: Create Hero Section Component
**Status:** [X]  
**Depends On:** TASK-012, TASK-004, TASK-009, TASK-008  
**Spec Reference:** SPEC.md Section 4.2 (Hero)

**Objective:** Create the hero section with headline, CTAs, and visual.

**Instructions:**
1. Create `src/components/sections/Hero.tsx`
2. Mark as client component (uses scroll hook)
3. Full viewport height (min-h-screen or min-h-[100dvh])
4. Content vertically and horizontally centered
5. Elements:
   - "Coming Soon" badge (styled pill/tag)
   - Headline (h1, hero typography)
   - Subheadline (paragraph)
   - Two CTA buttons: Primary "Join the Waitlist", Secondary "Learn More"
   - Optional: Hero visual/graphic (placeholder for now or gradient background)
6. Primary CTA scrolls to #waitlist
7. Secondary CTA scrolls to #about
8. Use content from `@/config/content`
9. Responsive typography (hero-desktop on lg+, hero-mobile on mobile)

**Acceptance Criteria:**
- [ ] Section is full viewport height
- [ ] Content is centered
- [ ] Badge displays "Coming Soon" prominently
- [ ] Headline uses h1 tag with hero typography
- [ ] Both CTAs scroll to correct sections
- [ ] Responsive: looks good on mobile and desktop
- [ ] Visual element or background present (can be gradient/pattern)

**Files to Create:**
- `src/components/sections/Hero.tsx`

---

### TASK-024: Create About Section Component
**Status:** [X]  
**Depends On:** TASK-012, TASK-008  
**Spec Reference:** SPEC.md Section 4.1 (About)

**Objective:** Create the product overview section.

**Instructions:**
1. Create `src/components/sections/About.tsx`
2. Use SectionWrapper with id="about"
3. Section heading (h2): "What is JEDeye?"
4. Content paragraphs from `@/config/content`
5. Clean, readable layout with proper typography
6. Optional: Placeholder for future diagram/illustration
7. Alternate background color (gray) to distinguish from hero

**Acceptance Criteria:**
- [ ] Section has id="about" for anchor linking
- [ ] Heading is h2 for proper hierarchy
- [ ] Content is readable and well-spaced
- [ ] Uses SectionWrapper for consistent styling and animation
- [ ] Background is alternate (gray)

**Files to Create:**
- `src/components/sections/About.tsx`

---

### TASK-025: Create Solutions Section Component
**Status:** [X]  
**Depends On:** TASK-012, TASK-013, TASK-008  
**Spec Reference:** SPEC.md Section 4.1 (Solutions)

**Objective:** Create the three sector cards section.

**Instructions:**
1. Create `src/components/sections/Solutions.tsx`
2. Use SectionWrapper with id="solutions"
3. Section heading (h2): "Who We Serve"
4. Grid layout: 3 columns on desktop (lg+), 1 column on mobile
5. Map over `solutionsContent.cards` from config
6. Render SectorCard for each card
7. For icons: use placeholder SVG icons or Lucide icons temporarily
8. White background

**Acceptance Criteria:**
- [ ] Section has id="solutions"
- [ ] Three SectorCards render with correct content
- [ ] Grid is responsive (3 cols desktop, 1 col mobile)
- [ ] Cards have equal height
- [ ] Icons display (even if placeholder)

**Files to Create:**
- `src/components/sections/Solutions.tsx`

---

### TASK-026: Create HowItWorks Section Component
**Status:** [X]  
**Depends On:** TASK-012, TASK-014, TASK-008  
**Spec Reference:** SPEC.md Section 4.1 (HowItWorks)

**Objective:** Create the four AI engines explanation section.

**Instructions:**
1. Create `src/components/sections/HowItWorks.tsx`
2. Use SectionWrapper with id="how-it-works"
3. Section heading (h2): "The Technology"
4. Optional subheading
5. Grid layout: 4 columns on desktop (xl+), 2 columns on tablet (md+), 1 column on mobile
6. Map over `howItWorksContent.engines` from config
7. Render EngineCard for each engine
8. Alternate background (gray)

**Acceptance Criteria:**
- [ ] Section has id="how-it-works"
- [ ] Four EngineCards render with correct content
- [ ] Responsive grid (4/2/1 columns at breakpoints)
- [ ] Background is alternate (gray)

**Files to Create:**
- `src/components/sections/HowItWorks.tsx`

---

### TASK-027: Create Waitlist Section Component
**Status:** [X]  
**Depends On:** TASK-012, TASK-020, TASK-008  
**Spec Reference:** SPEC.md Section 4.1 (Waitlist)

**Objective:** Create the waitlist signup section.

**Instructions:**
1. Create `src/components/sections/Waitlist.tsx`
2. Use SectionWrapper with id="waitlist"
3. Section heading (h2): "Be the First to Know"
4. Subheading text
5. Render WaitlistForm component
6. Center the form with appropriate max-width (e.g., max-w-md)
7. White background

**Acceptance Criteria:**
- [ ] Section has id="waitlist"
- [ ] Heading and subheading display
- [ ] WaitlistForm renders and is functional
- [ ] Form is centered and constrained in width
- [ ] Looks good on all screen sizes

**Files to Create:**
- `src/components/sections/Waitlist.tsx`

---

### TASK-028: Create Contact Section Component
**Status:** [X]  
**Depends On:** TASK-012, TASK-021, TASK-008  
**Spec Reference:** SPEC.md Section 4.1 (Contact)

**Objective:** Create the contact section with form and contact information.

**Instructions:**
1. Create `src/components/sections/Contact.tsx`
2. Use SectionWrapper with id="contact"
3. Section heading (h2): "Get in Touch"
4. Two-column layout on desktop: ContactForm (left), Contact Info (right)
5. Stack on mobile: Form first, then Contact Info
6. Contact Info displays:
   - Email (mailto: link)
   - Phone (tel: link)
   - Address
   - Office hours
   - Institution affiliation
   - Optional: Link to Nezami Lab contact page
7. Use `contactInfo` from config
8. Alternate background (gray)

**Acceptance Criteria:**
- [ ] Section has id="contact"
- [ ] Two-column layout on desktop, stacked on mobile
- [ ] ContactForm renders and is functional
- [ ] All contact information displays correctly
- [ ] Email and phone are clickable links
- [ ] Institution affiliation is visible

**Files to Create:**
- `src/components/sections/Contact.tsx`

---

### TASK-029: Create Sections Index Export
**Status:** [X]  
**Depends On:** TASK-023, TASK-024, TASK-025, TASK-026, TASK-027, TASK-028  
**Spec Reference:** SPEC.md Section 1.3

**Objective:** Create barrel export for section components.

**Instructions:**
1. Create `src/components/sections/index.ts`
2. Re-export all section components

**Acceptance Criteria:**
- [ ] All sections importable from `@/components/sections`

**Files to Create:**
- `src/components/sections/index.ts`

---

## Phase 7: API Routes

### TASK-030: Create Google Sheets API Client
**Status:** [X]  
**Depends On:** TASK-002  
**Spec Reference:** SPEC.md Section 3.2 (API Implementation), Section 6.1 (Environment Variables)

**Objective:** Create the Google Sheets API client utility.

**Instructions:**
1. Install googleapis: `npm install googleapis`
2. Create `src/lib/google-sheets.ts`
3. Implement:
   - Authentication using service account credentials from env vars
   - `appendToSheet(sheetName: string, values: string[])` function
   - Proper error handling and logging
4. Use environment variables: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`
5. Handle the newline characters in private key (replace `\\n` with actual newlines)

**Acceptance Criteria:**
- [ ] Google Sheets client authenticates successfully (test manually with valid credentials)
- [ ] `appendToSheet` function accepts sheet name and array of values
- [ ] Function appends a new row to the specified sheet tab
- [ ] Errors are caught and logged appropriately
- [ ] Private key newline handling works correctly

**Files to Create:**
- `src/lib/google-sheets.ts`

**Files to Modify:**
- `package.json` (googleapis dependency)

---

### TASK-031: Create Waitlist API Route
**Status:** [X]  
**Depends On:** TASK-030, TASK-007  
**Spec Reference:** SPEC.md Section 3.2 (POST /api/waitlist)

**Objective:** Create the API route for waitlist form submissions.

**Instructions:**
1. Create `src/app/api/waitlist/route.ts`
2. Implement POST handler:
   - Parse JSON body
   - Validate with `waitlistSchema`
   - Check honeypot field (reject if filled)
   - Generate timestamp (ISO 8601)
   - Call `appendToSheet` with "Waitlist" tab and values
   - Return success response
3. Handle errors:
   - Validation error → 400 with VALIDATION_ERROR
   - Honeypot filled → 400 with SPAM_DETECTED
   - Google Sheets error → 500 with SUBMISSION_FAILED
4. Use response helpers (or define inline)
5. Tab name from env var: `GOOGLE_SHEET_WAITLIST_TAB`

**Acceptance Criteria:**
- [ ] POST /api/waitlist accepts valid JSON body
- [ ] Returns 200 with success message on valid submission
- [ ] Returns 400 with validation error on invalid email
- [ ] Returns 400 with spam error if honeypot filled
- [ ] Returns 500 on Google Sheets API failure
- [ ] Response format matches SPEC.md Section 3.1

**Files to Create:**
- `src/app/api/waitlist/route.ts`

---

### TASK-032: Create Contact API Route
**Status:** [X]  
**Depends On:** TASK-030, TASK-007  
**Spec Reference:** SPEC.md Section 3.2 (POST /api/contact)

**Objective:** Create the API route for contact form submissions.

**Instructions:**
1. Create `src/app/api/contact/route.ts`
2. Same pattern as waitlist route but:
   - Use `contactSchema` for validation
   - Append to "Contact" tab
   - Include all contact fields in row
3. Tab name from env var: `GOOGLE_SHEET_CONTACT_TAB`

**Acceptance Criteria:**
- [ ] POST /api/contact accepts valid JSON body
- [ ] Returns 200 with success message on valid submission
- [ ] Validates name, email, and message as required
- [ ] Response format matches SPEC.md

**Files to Create:**
- `src/app/api/contact/route.ts`

---

### TASK-033: Add Rate Limiting to API Routes
**Status:** [X]  
**Depends On:** TASK-031, TASK-032  
**Spec Reference:** SPEC.md Section 3.2 (Rate limiting), Section 4.2 (SEC-004)

**Objective:** Add simple rate limiting to prevent spam/abuse.

**Instructions:**
1. Create `src/lib/rate-limit.ts`
2. Implement simple in-memory rate limiter:
   - Track requests by IP address
   - Allow 10 requests per minute per IP
   - Reset count after 60 seconds
3. Note: In-memory won't persist across serverless invocations, but provides basic protection
4. Update both API routes to check rate limit before processing
5. Return 429 if rate limit exceeded

**Acceptance Criteria:**
- [ ] Rate limiter tracks requests by IP
- [ ] Returns 429 when limit exceeded
- [ ] Limit is 10 requests/minute
- [ ] Both API routes use rate limiter
- [ ] Rate limit error response matches SPEC.md format

**Files to Create:**
- `src/lib/rate-limit.ts`

**Files to Modify:**
- `src/app/api/waitlist/route.ts`
- `src/app/api/contact/route.ts`

---

## Phase 8: Page Assembly & Metadata

### TASK-034: Assemble Main Page
**Status:** [X]  
**Depends On:** TASK-016, TASK-018, TASK-029  
**Spec Reference:** SPEC.md Section 4.1 (Component Hierarchy)

**Objective:** Assemble all sections into the main landing page.

**Instructions:**
1. Update `src/app/page.tsx`
2. Import and render in order:
   - Hero
   - About
   - Solutions
   - HowItWorks
   - Waitlist
   - Contact
3. No additional wrapper needed (sections handle their own styling)
4. Page should be a server component (no 'use client' at top)

**Acceptance Criteria:**
- [ ] All sections render in correct order
- [ ] Smooth scroll works between sections
- [ ] Page builds without errors
- [ ] No hydration mismatches

**Files to Modify:**
- `src/app/page.tsx`

---

### TASK-035: Configure Root Layout with Header and Footer
**Status:** [X]  
**Depends On:** TASK-016, TASK-018, TASK-003  
**Spec Reference:** SPEC.md Section 4.1, Section 8.1 (Metadata)

**Objective:** Set up root layout with header, footer, and metadata.

**Instructions:**
1. Update `src/app/layout.tsx`
2. Import and configure Inter font from `next/font/google`
3. Add comprehensive metadata object per SPEC.md Section 8.1
4. Add JSON-LD structured data per SPEC.md Section 8.2
5. Render Header before `{children}`
6. Render Footer after `{children}`
7. Add skip to main content link for accessibility

**Acceptance Criteria:**
- [ ] Inter font loads and applies globally
- [ ] Metadata includes title, description, keywords, Open Graph, Twitter cards
- [ ] JSON-LD Organization schema is in the page
- [ ] Header renders on all pages
- [ ] Footer renders on all pages
- [ ] Skip link exists (visually hidden, visible on focus)

**Files to Modify:**
- `src/app/layout.tsx`

---

### TASK-036: Create robots.ts and sitemap.ts
**Status:** [X]  
**Depends On:** TASK-001  
**Spec Reference:** SPEC.md Section 8 (SEO)

**Objective:** Create dynamic robots.txt and sitemap.xml generation.

**Instructions:**
1. Create `src/app/robots.ts` using Next.js metadata API
   - Allow all crawlers
   - Point to sitemap
2. Create `src/app/sitemap.ts` using Next.js metadata API
   - Include main page URL
   - Set appropriate lastModified date

**Acceptance Criteria:**
- [ ] `/robots.txt` returns valid robots file
- [ ] `/sitemap.xml` returns valid sitemap
- [ ] Sitemap includes the main page URL
- [ ] robots.txt references sitemap location

**Files to Create:**
- `src/app/robots.ts`
- `src/app/sitemap.ts`

---

## Phase 9: Assets & Polish

### TASK-037: Add Logo and Placeholder Images
**Status:** [X]  
**Depends On:** TASK-002  
**Spec Reference:** SPEC.md Section 1.3 (public/images/)

**Objective:** Set up image assets directory with logo and placeholders.

**Instructions:**
1. Ensure `public/images/` directory exists
2. Add `JEDeye_transparent_logo.png` (provided by client) to this directory
3. Create placeholder SVG icons for:
   - `icon-or.svg` (OR Efficiency)
   - `icon-insurance.svg` (Insurance/QA)
   - `icon-education.svg` (Education)
   - `icon-vision.svg` (Vision Engine)
   - `icon-spatial.svg` (Spatial Engine)
   - `icon-scoring.svg` (Scoring Engine)
   - `icon-interaction.svg` (Interaction Engine)
4. Create `og-image.png` placeholder (1200x630) or gradient image
5. All icons should be simple, monochrome, and work at 48x48px

**Acceptance Criteria:**
- [ ] Logo file exists at `/images/JEDeye_transparent_logo.png`
- [ ] All sector icons exist and render
- [ ] All engine icons exist and render
- [ ] OG image exists at `/og-image.png`
- [ ] Icons are reasonably styled (can be refined later)

**Files to Create:**
- `public/images/JEDeye_transparent_logo.png` (copy from provided)
- `public/images/icon-or.svg`
- `public/images/icon-insurance.svg`
- `public/images/icon-education.svg`
- `public/images/icon-vision.svg`
- `public/images/icon-spatial.svg`
- `public/images/icon-scoring.svg`
- `public/images/icon-interaction.svg`
- `public/og-image.png`

---

### TASK-038: Update Components to Use Real Icons
**Status:** [X]  
**Depends On:** TASK-037, TASK-025, TASK-026  
**Spec Reference:** SPEC.md Section 4.2

**Objective:** Update section components to use actual SVG icons.

**Instructions:**
1. Update `src/components/sections/Solutions.tsx`:
   - Import icons from `public/images/` using Next.js Image or inline SVG
   - Pass correct icon to each SectorCard
2. Update `src/components/sections/HowItWorks.tsx`:
   - Import icons and pass to EngineCards
3. Ensure icons have appropriate alt text and sizing

**Acceptance Criteria:**
- [ ] Solutions section shows correct icons for each card
- [ ] HowItWorks section shows correct icons for each engine
- [ ] Icons are properly sized (48x48 or similar)
- [ ] Icons have appropriate alt text

**Files to Modify:**
- `src/components/sections/Solutions.tsx`
- `src/components/sections/HowItWorks.tsx`

---

### TASK-039: Add Loading and Error States to Forms
**Status:** [X]  
**Depends On:** TASK-020, TASK-021  
**Spec Reference:** SPEC.md Section 4.2 (Form behavior)

**Objective:** Enhance forms with visual loading states and better error handling.

**Instructions:**
1. Update WaitlistForm:
   - Add loading spinner or animation to submit button when submitting
   - Disable all form inputs while submitting
   - Add aria-busy attribute when submitting
2. Update ContactForm with same enhancements
3. Ensure success message is visually prominent (green background, checkmark icon)
4. Ensure error message is visually prominent (red background, error icon)

**Acceptance Criteria:**
- [ ] Submit button shows loading indicator when submitting
- [ ] Form inputs are disabled during submission
- [ ] Success message is clearly visible with positive styling
- [ ] Error message is clearly visible with error styling
- [ ] Accessible: aria-busy is set appropriately

**Files to Modify:**
- `src/components/forms/WaitlistForm.tsx`
- `src/components/forms/ContactForm.tsx`

---

### TASK-040: Final Accessibility Audit and Fixes
**Status:** [X]  
**Depends On:** TASK-034, TASK-035  
**Spec Reference:** SPEC.md Section 11 (Accessibility Checklist)

**Objective:** Verify and fix accessibility issues.

**Instructions:**
1. Run through SPEC.md Section 11 accessibility checklist
2. Verify:
   - Single h1 in hero
   - Proper heading hierarchy (h1 → h2 → h3)
   - All semantic landmarks present (header, main, section, footer)
   - All interactive elements keyboard accessible
   - Visible focus states on all interactive elements
   - Skip to main content link works
   - Form labels properly associated
   - Images have alt text
   - Color contrast meets 4.5:1 for text
3. Fix any issues found
4. Test with keyboard navigation (Tab through entire page)

**Acceptance Criteria:**
- [ ] All items in SPEC.md Section 11 pass
- [ ] Page is fully navigable by keyboard
- [ ] Focus order is logical
- [ ] Skip link jumps to main content
- [ ] No accessibility errors in browser dev tools

**Files to Modify:**
- Various components as needed based on audit findings

---

## Phase 10: Testing & Documentation

### TASK-041: Create README with Setup Instructions
**Status:** [X]  
**Depends On:** TASK-034  
**Spec Reference:** SPEC.md Section 6 (Environment Configuration)

**Objective:** Create comprehensive README with setup and deployment instructions.

**Instructions:**
1. Create/update `README.md` with:
   - Project description
   - Tech stack overview
   - Prerequisites (Node.js version, etc.)
   - Local development setup steps
   - Environment variables explanation (reference .env.example)
   - Google Sheets setup instructions (from SPEC.md Section 6.2)
   - Build and deployment commands
   - Vercel deployment notes
2. Keep it clear and actionable

**Acceptance Criteria:**
- [ ] README explains what the project is
- [ ] Clear step-by-step setup instructions
- [ ] All environment variables documented
- [ ] Google Sheets setup process explained
- [ ] Deployment instructions included
- [ ] Commands for dev, build, start are listed

**Files to Create/Modify:**
- `README.md`

---

### TASK-042: Verify Production Build
**Status:** [ ]  
**Depends On:** TASK-034, TASK-035, TASK-036  
**Spec Reference:** SPEC.md Section 4.1 (Non-Functional Requirements)

**Objective:** Ensure the application builds and runs correctly for production.

**Instructions:**
1. Run `npm run build` and verify no errors
2. Run `npm run start` and test locally
3. Verify all pages render correctly
4. Test form submissions (if env vars are set)
5. Check for any console errors or warnings
6. Verify no TypeScript errors
7. Verify bundle size is reasonable (<1MB initial load)

**Acceptance Criteria:**
- [ ] `npm run build` completes without errors
- [ ] `npm run start` serves the site correctly
- [ ] All sections render properly
- [ ] No console errors in production build
- [ ] TypeScript compiles cleanly
- [ ] Bundle size is under 1MB

**Files to Modify:**
- None (verification task)

---

### TASK-043: Performance Optimization Check
**Status:** [ ]  
**Depends On:** TASK-042  
**Spec Reference:** SPEC.md Section 4.1 (PERF-001 through PERF-006)

**Objective:** Verify performance meets requirements.

**Instructions:**
1. Run Lighthouse audit on production build
2. Check:
   - Performance score ≥90
   - LCP < 2.5s
   - CLS < 0.1
   - FID < 100ms
3. Verify images are using Next.js Image component with optimization
4. Verify lazy loading is working for below-fold images
5. If scores are low, identify and fix issues:
   - Large images: compress/resize
   - Render-blocking resources: defer/async
   - Layout shifts: set explicit dimensions

**Acceptance Criteria:**
- [ ] Lighthouse Performance score ≥90 on mobile
- [ ] LCP < 2.5 seconds
- [ ] CLS < 0.1
- [ ] All images optimized (WebP, responsive)
- [ ] Below-fold content lazy loads

**Files to Modify:**
- Various as needed based on findings

---

## Phase 11: Authentication & Login Gate

### TASK-059: Add NextAuth.js v5 Login Gate
**Status:** [X]
**Depends On:** TASK-035
**Spec Reference:** N/A (new requirement — investor demo access control)

**Objective:** Gate the landing page behind a login screen for the three co-founders.

**Instructions:**
1. Install `next-auth@beta`
2. Create `src/auth.ts` — Credentials provider with 3 hardcoded users (matching team members), shared password `JEDeye@2025!`, JWT sessions, `authorized` callback for route protection, custom sign-in page `/login`
3. Create `src/middleware.ts` — Export auth as middleware, matcher excludes static assets and auth API routes
4. Create `src/app/api/auth/[...nextauth]/route.ts` — Export GET/POST handlers
5. Create `src/components/auth/SessionProvider.tsx` — Client wrapper for next-auth/react SessionProvider
6. Create `src/components/auth/LoginForm.tsx` — Client component with 3 photo cards (glass-card + teal ring on select), password input, sign-in via `signIn("credentials", { redirect: false })`
7. Create `src/app/login/page.tsx` — Server component with JEDeye logo, glass-light panel, LoginForm
8. Move `src/app/page.tsx` → `src/app/(main)/page.tsx` (route group, URL stays `/`)
9. Create `src/app/(main)/layout.tsx` — Layout with Header + Footer
10. Update `src/app/layout.tsx` — Remove Header/Footer, add SessionProvider wrapper
11. Generate `AUTH_SECRET` via `openssl rand -hex 32`, add to `.env`
12. Generate favicon from JEDeye logo (favicon.ico, icon.png, apple-icon.png)

**Acceptance Criteria:**
- [x] `npm run build` succeeds
- [x] Visit `/` unauthenticated → redirects to `/login`
- [x] Login page shows 3 photo cards over blurred surgical background
- [x] Select card + wrong password → error message
- [x] Select card + `JEDeye@2025!` → redirects to landing page
- [x] Landing page shows normally with Header/Footer
- [x] Visit `/login` while authenticated → redirects to `/`
- [x] Favicon shows JEDeye logo

**Files Created:**
- `src/auth.ts`
- `src/middleware.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/components/auth/SessionProvider.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/app/login/page.tsx`
- `src/app/(main)/layout.tsx`

**Files Modified:**
- `src/app/layout.tsx` (removed Header/Footer, added SessionProvider)
- `src/app/page.tsx` → `src/app/(main)/page.tsx` (moved into route group)
- `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png` (generated from logo)
- `.env` (added AUTH_SECRET)
- `.env.example` (added AUTH_SECRET placeholder)
- `package.json` (added next-auth@beta)

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | TASK-001 to TASK-008 | Project setup, configuration, types |
| 2 | TASK-009 to TASK-011 | Custom hooks |
| 3 | TASK-012 to TASK-015 | Shared components |
| 4 | TASK-016 to TASK-019 | Layout components (Header, Footer, MobileNav) |
| 5 | TASK-020 to TASK-022 | Form components |
| 6 | TASK-023 to TASK-029 | Page section components |
| 7 | TASK-030 to TASK-033 | API routes and Google Sheets integration |
| 8 | TASK-034 to TASK-036 | Page assembly and metadata |
| 9 | TASK-037 to TASK-040 | Assets, polish, accessibility |
| 10 | TASK-041 to TASK-043 | Documentation and verification |
| 11 | TASK-059 | Authentication & login gate |

**Total Tasks:** 44
**Completed:** 42 (TASK-041 and TASK-042 pending)

---

## Critical Path

The following tasks are on the critical path and should be prioritized:

1. **TASK-001** → **TASK-003** → **TASK-004** (Project foundation)
2. **TASK-008** (Content config needed by most components)
3. **TASK-012** (SectionWrapper needed by all sections)
4. **TASK-016** → **TASK-017** (Navigation)
5. **TASK-020** → **TASK-021** (Forms)
6. **TASK-030** → **TASK-031** → **TASK-032** (API routes)
7. **TASK-034** → **TASK-035** (Page assembly)

---

*End of Implementation Tasks*
