# JEDeye Landing Page: Implementation Tasks — Demo Section Addendum

> **Generated:** January 7, 2026  
> **Source:** SPEC.md Addendum (Demo Section)  
> **Extends:** TASKS.md (January 6, 2026)  
> **Starting Task Number:** TASK-044

---

## Phase 11: Demo Section Implementation

### TASK-044: Install react-compare-slider Dependency
**Status:** [X]  
**Depends On:** TASK-001  
**Spec Reference:** SPEC.md Addendum Section 1.1

**Objective:** Install the react-compare-slider package for the video comparison UI.

**Instructions:**
1. Run `npm install react-compare-slider`
2. Verify installation in package.json
3. Test import works: `import { ReactCompareSlider } from 'react-compare-slider'`

**Acceptance Criteria:**
- [ ] `react-compare-slider` listed in dependencies (version ^3.x)
- [ ] No peer dependency warnings
- [ ] Import statement compiles without errors

**Files to Modify:**
- `package.json`
- `package-lock.json`

---

### TASK-045: Create Segmentation Configuration File
**Status:** [X]  
**Depends On:** TASK-002  
**Spec Reference:** SPEC.md Addendum Section 2.1

**Objective:** Create the configuration file defining all 14 segmentation classes with colors and categories.

**Instructions:**
1. Create `src/config/segmentation.ts`
2. Define `SegmentationClass` interface with id, name, hexColor, category, visible
3. Export `segmentationClasses` array with all 14 classes (copy exact colors from spec)
4. Export `visibleClasses` helper (filters visible: true)
5. Export `classesByCategory` helper object

**Acceptance Criteria:**
- [ ] Interface `SegmentationClass` is typed correctly
- [ ] All 14 classes defined with exact hex colors from spec
- [ ] Classes 0 and 13 have `visible: false`
- [ ] `visibleClasses` returns 12 items
- [ ] `classesByCategory` groups correctly (anatomy: 8, structures: 2, instruments: 2)
- [ ] File exports are importable from `@/config/segmentation`

**Files to Create:**
- `src/config/segmentation.ts`

---

### TASK-046: Add Demo Content to Content Configuration
**Status:** [X]  
**Depends On:** TASK-008  
**Spec Reference:** SPEC.md Addendum Section 2.2

**Objective:** Add demo section content to the existing content configuration file.

**Instructions:**
1. Open `src/config/content.ts`
2. Add `demoContent` export with:
   - heading: "See It In Action"
   - intro: (copy from spec)
   - legendTitle: "Segmentation Key"
   - labels.original: "Original Endoscopy"
   - labels.segmentation: "AI Segmentation"
   - fallback.loadError: (copy from spec)
   - fallback.autoplayBlocked: "Tap to play demo"

**Acceptance Criteria:**
- [ ] `demoContent` exportable from `@/config/content`
- [ ] All text matches spec exactly
- [ ] TypeScript compiles without errors

**Files to Modify:**
- `src/config/content.ts`

---

### TASK-047: Create useVideoSync Hook
**Status:** [X]  
**Depends On:** TASK-011, TASK-044  
**Spec Reference:** SPEC.md Addendum Section 3.1

**Objective:** Create the custom hook for synchronizing two video elements.

**Instructions:**
1. Create `src/hooks/useVideoSync.ts`
2. Implement the hook per the spec:
   - Accept masterRef, slaveRef, options (syncThreshold, enabled)
   - Use `requestAnimationFrame` for sync loop (NOT timeupdate)
   - Handle play, pause, seeked, ended events
   - Handle buffering (pause both when one buffers)
   - Return isPlaying, isSynced, error, play, pause, restart
3. Default sync threshold: 0.05 (50ms)
4. Mark as client component

**Acceptance Criteria:**
- [ ] Hook compiles without TypeScript errors
- [ ] Uses `requestAnimationFrame` for sync checking
- [ ] Sync threshold defaults to 50ms
- [ ] Cleans up event listeners on unmount
- [ ] Handles all video events (play, pause, seeked, ended, waiting)
- [ ] Exposes play/pause/restart control functions

**Files to Create:**
- `src/hooks/useVideoSync.ts`

**Files to Modify:**
- `src/hooks/index.ts` (add export)

---

### TASK-048: Create VideoComparisonSlider Component
**Status:** [X]  
**Depends On:** TASK-044, TASK-047, TASK-046  
**Spec Reference:** SPEC.md Addendum Section 3.2

**Objective:** Create the video comparison slider component using react-compare-slider.

**Instructions:**
1. Create `src/components/demo/VideoComparisonSlider.tsx`
2. Mark as client component
3. Implement per spec:
   - Use ReactCompareSlider as base
   - Two video elements (master and slave)
   - Use useVideoSync hook for synchronization
   - Intersection Observer for viewport detection
   - Start position at 35%
   - Custom handle with arrows (48px, primary color)
   - Video labels at top corners
   - Loading state with poster and spinner
   - Error state with fallback message
   - Autoplay blocked state with play button
   - Reduced motion: show static poster
4. Video attributes: muted, loop, playsInline, preload (conditional)
5. Handle onPositionChange to track user interaction

**Acceptance Criteria:**
- [ ] Slider renders with two videos side by side
- [ ] Videos are synchronized (visually in sync)
- [ ] Slider starts at ~35% position
- [ ] Custom handle is visible and styled per spec (48px, primary color)
- [ ] Labels show "Original Endoscopy" and "AI Segmentation"
- [ ] Videos autoplay when section enters viewport
- [ ] Videos pause when section leaves viewport
- [ ] Loading state shows poster + spinner
- [ ] Error state shows fallback message
- [ ] Autoplay blocked shows play button overlay
- [ ] Reduced motion shows static poster only
- [ ] Keyboard accessible (Tab + Arrow keys)

**Files to Create:**
- `src/components/demo/VideoComparisonSlider.tsx`

---

### TASK-049: Create SegmentationLegend Component
**Status:** [X]  
**Depends On:** TASK-045, TASK-046  
**Spec Reference:** SPEC.md Addendum Section 3.3

**Objective:** Create the color legend component for segmentation classes.

**Instructions:**
1. Create `src/components/demo/SegmentationLegend.tsx`
2. Import visibleClasses from segmentation config
3. Import legendTitle from content config
4. Render responsive grid: 4 cols (lg), 3 cols (sm), 2 cols (mobile)
5. Each item: color swatch (20px) + text label
6. Color swatch has aria-hidden="true"
7. Style with background-alt, rounded corners

**Acceptance Criteria:**
- [ ] Displays all 12 visible classes
- [ ] Grid is responsive (4/3/2 columns)
- [ ] Color swatches match hex codes exactly
- [ ] Text labels are readable
- [ ] Accessible (color swatches decorative, text provides meaning)

**Files to Create:**
- `src/components/demo/SegmentationLegend.tsx`

---

### TASK-050: Create Demo Components Index Export
**Status:** [X]  
**Depends On:** TASK-048, TASK-049  
**Spec Reference:** SPEC.md Addendum Section 1.2

**Objective:** Create barrel export for demo components.

**Instructions:**
1. Create `src/components/demo/index.ts`
2. Re-export VideoComparisonSlider and SegmentationLegend

**Acceptance Criteria:**
- [ ] Both components importable from `@/components/demo`

**Files to Create:**
- `src/components/demo/index.ts`

---

### TASK-051: Create Demo Section Component
**Status:** [X]  
**Depends On:** TASK-012, TASK-050  
**Spec Reference:** SPEC.md Addendum Section 3.4

**Objective:** Create the Demo section container component.

**Instructions:**
1. Create `src/components/sections/Demo.tsx`
2. Use SectionWrapper with id="demo" and background="gray"
3. Add centered heading (h2) and intro paragraph
4. Render VideoComparisonSlider
5. Render SegmentationLegend below slider
6. Use content from demoContent config

**Acceptance Criteria:**
- [ ] Section has id="demo" for anchor linking
- [ ] Background is alternate (gray)
- [ ] Heading is h2: "See It In Action"
- [ ] Intro text displays below heading
- [ ] VideoComparisonSlider renders
- [ ] SegmentationLegend renders below slider
- [ ] Section animates on viewport entry (via SectionWrapper)

**Files to Create:**
- `src/components/sections/Demo.tsx`

**Files to Modify:**
- `src/components/sections/index.ts` (add Demo export)

---

### TASK-052: Update Page with Demo Section
**Status:** [X]  
**Depends On:** TASK-034, TASK-051  
**Spec Reference:** SPEC.md Addendum Section 1.3

**Objective:** Add the Demo section to the main page between About and Solutions.

**Instructions:**
1. Open `src/app/page.tsx`
2. Import Demo from `@/components/sections`
3. Add Demo component between About and Solutions:
```
   Hero
   About
   Demo    ← INSERT HERE
   Solutions
   HowItWorks
   Waitlist
   Contact
```

**Acceptance Criteria:**
- [ ] Demo section appears after About
- [ ] Demo section appears before Solutions
- [ ] Smooth scroll to #demo works
- [ ] No build errors

**Files to Modify:**
- `src/app/page.tsx`

---

### TASK-053: Update Navigation with Demo Link
**Status:** [X]  
**Depends On:** TASK-008, TASK-052  
**Spec Reference:** SPEC.md Addendum Section 1.4

**Objective:** Add "Demo" link to navigation between "About" and "Solutions".

**Instructions:**
1. Open `src/config/site.ts`
2. Update navLinks array to include Demo:
```typescript
   navLinks: [
     { label: 'About', href: '#about' },
     { label: 'Demo', href: '#demo' },        // NEW
     { label: 'Solutions', href: '#solutions' },
     { label: 'How It Works', href: '#how-it-works' },
     { label: 'Contact', href: '#contact' },
   ],
```
3. Verify Header and MobileNav automatically pick up the new link

**Acceptance Criteria:**
- [ ] "Demo" link appears in desktop navigation
- [ ] "Demo" link appears in mobile navigation
- [ ] Clicking "Demo" scrolls to #demo section
- [ ] Link order: About → Demo → Solutions → How It Works → Contact

**Files to Modify:**
- `src/config/site.ts`

---

### TASK-054: Create Video Asset Directory and Placeholders
**Status:** [X]  
**Depends On:** TASK-002  
**Spec Reference:** SPEC.md Addendum Section 4

**Objective:** Set up the video assets directory structure with placeholder files.

**Instructions:**
1. Create `public/videos/` directory
2. Create placeholder files (can be empty or minimal):
   - `public/videos/surgical-original.webm`
   - `public/videos/surgical-original.mp4`
   - `public/videos/surgical-segmentation.webm`
   - `public/videos/surgical-segmentation.mp4`
   - `public/videos/demo-poster.jpg`
3. Create `public/videos/README.md` with:
   - Video requirements (resolution, duration, frame rate)
   - FFmpeg encoding commands from spec
   - Target file sizes
   - Note that placeholders need to be replaced with real videos

**Acceptance Criteria:**
- [ ] `public/videos/` directory exists
- [ ] All placeholder files exist (even if empty/minimal)
- [ ] README.md documents encoding requirements
- [ ] Component doesn't crash when loading placeholders

**Files to Create:**
- `public/videos/README.md`
- `public/videos/surgical-original.webm` (placeholder)
- `public/videos/surgical-original.mp4` (placeholder)
- `public/videos/surgical-segmentation.webm` (placeholder)
- `public/videos/surgical-segmentation.mp4` (placeholder)
- `public/videos/demo-poster.jpg` (placeholder or sample image)

---

### TASK-055: Implement Slider Animation Hint
**Status:** [X]  
**Depends On:** TASK-048  
**Spec Reference:** REQ-DEMO-006 (Initial Animation Hint)

**Objective:** Add subtle animation to slider handle on first viewport entry.

**Instructions:**
1. Update VideoComparisonSlider.tsx
2. Track `hasAnimated` state (persistent within session)
3. On first viewport entry:
   - Apply gentle pulse animation to handle arrows
   - Animation duration: 2-3 seconds
   - Stop animation immediately on user interaction
4. Respect prefers-reduced-motion (skip animation)
5. Animation only runs once per page session

**Acceptance Criteria:**
- [ ] Handle arrows pulse/wiggle on first viewport entry
- [ ] Animation stops after 2-3 seconds
- [ ] Animation stops immediately on slider interaction
- [ ] Animation respects prefers-reduced-motion
- [ ] Animation only happens once per session

**Files to Modify:**
- `src/components/demo/VideoComparisonSlider.tsx`

---

### TASK-056: Test Video Synchronization
**Status:** [X]  
**Depends On:** TASK-048, TASK-054  
**Spec Reference:** REQ-DEMO-003, PERF-DEMO-003

**Objective:** Verify video synchronization works correctly across scenarios.

**Instructions:**
1. Replace placeholder videos with actual test videos (or use any two matching-length videos)
2. Test scenarios:
   - Videos start synchronized
   - Videos stay synchronized during playback
   - Rapid slider dragging doesn't cause desync
   - Tab inactive → active resync works
   - Loop restart maintains sync
   - One video buffering pauses both
3. Verify sync drift stays under 50ms
4. Test on Chrome, Firefox, Safari, Edge

**Acceptance Criteria:**
- [ ] Videos remain synchronized (drift < 50ms) during normal playback
- [ ] Videos resync correctly after loop restart
- [ ] Videos resync correctly after tab becomes active
- [ ] No visual glitching during rapid slider movement
- [ ] Works in all major browsers

**Files to Modify:**
- None (testing task)

---

### TASK-057: Mobile Testing for Demo Section
**Status:** [X]  
**Depends On:** TASK-048, TASK-049, TASK-051  
**Spec Reference:** MOBILE-001 through MOBILE-004

**Objective:** Verify demo section works correctly on mobile devices.

**Instructions:**
1. Test on iOS Safari (real device or simulator)
2. Test on Android Chrome (real device or emulator)
3. Verify:
   - Touch/drag slider works smoothly
   - Videos play inline (not fullscreen)
   - Autoplay works (with muted videos)
   - Legend is readable and columns adjust
   - Slider handle meets 44px touch target
   - No scroll conflicts during slider drag
4. Fix any issues found

**Acceptance Criteria:**
- [ ] Touch drag works on iOS Safari
- [ ] Touch drag works on Android Chrome
- [ ] Videos play inline on iOS (not fullscreen)
- [ ] Legend is readable on small screens
- [ ] Slider handle is easily tappable (≥44px)
- [ ] Page scroll doesn't interfere with slider drag

**Files to Modify:**
- Various components as needed based on findings

---

### TASK-058: Accessibility Audit for Demo Section
**Status:** [X]  
**Depends On:** TASK-048, TASK-049, TASK-051  
**Spec Reference:** ACC-DEMO-001 through ACC-DEMO-006

**Objective:** Verify demo section meets accessibility requirements.

**Instructions:**
1. Test keyboard navigation:
   - Tab focuses slider handle
   - Arrow keys move slider position
   - Focus state is visible
2. Test with screen reader:
   - Slider has accessible name
   - Legend items are announced correctly
3. Test reduced motion:
   - Enable prefers-reduced-motion
   - Verify static poster shows instead of video
   - Verify no animations on handle
4. Verify color is not sole identifier (legend has text)

**Acceptance Criteria:**
- [ ] Slider is keyboard accessible
- [ ] Arrow keys adjust slider position when focused
- [ ] Focus state is visible on handle
- [ ] ARIA label present on slider
- [ ] Reduced motion shows static poster
- [ ] Legend text provides meaning (not just color)

**Files to Modify:**
- Various components as needed based on findings

---

## Summary of New Tasks

| Task | Description | Depends On |
|------|-------------|------------|
| TASK-044 | Install react-compare-slider | TASK-001 |
| TASK-045 | Create segmentation config | TASK-002 |
| TASK-046 | Add demo content to config | TASK-008 |
| TASK-047 | Create useVideoSync hook | TASK-011, TASK-044 |
| TASK-048 | Create VideoComparisonSlider | TASK-044, TASK-047, TASK-046 |
| TASK-049 | Create SegmentationLegend | TASK-045, TASK-046 |
| TASK-050 | Create demo components index | TASK-048, TASK-049 |
| TASK-051 | Create Demo section | TASK-012, TASK-050 |
| TASK-052 | Update page with Demo section | TASK-034, TASK-051 |
| TASK-053 | Update navigation with Demo link | TASK-008, TASK-052 |
| TASK-054 | Create video asset directory | TASK-002 |
| TASK-055 | Implement slider animation hint | TASK-048 |
| TASK-056 | Test video synchronization | TASK-048, TASK-054 |
| TASK-057 | Mobile testing | TASK-048, TASK-049, TASK-051 |
| TASK-058 | Accessibility audit | TASK-048, TASK-049, TASK-051 |

**New Tasks:** 15  
**Total Tasks (including original 43):** 58

---

## Critical Path for Demo Section
```
TASK-044 (install package)
    ↓
TASK-047 (useVideoSync hook)
    ↓
TASK-045 (segmentation config) + TASK-046 (demo content)
    ↓
TASK-048 (VideoComparisonSlider) + TASK-049 (SegmentationLegend)
    ↓
TASK-050 (demo index)
    ↓
TASK-051 (Demo section)
    ↓
TASK-052 (update page) + TASK-053 (update nav)
    ↓
TASK-054 (video assets) + TASK-055 (animation hint)
    ↓
TASK-056, TASK-057, TASK-058 (testing)
```

---

*End of Tasks Addendum*