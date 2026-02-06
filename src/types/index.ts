import type { ReactNode } from 'react';

// =============================================================================
// Form Data Structures (SPEC.md Section 2.1)
// =============================================================================

/**
 * Data structure for waitlist signups stored in Google Sheets.
 */
export interface WaitlistSignup {
    timestamp: string;      // ISO 8601 format, auto-generated
    email: string;          // Required, valid email
    name?: string;          // Optional, max 100 chars
    organization?: string;  // Optional, max 200 chars
    role?: string;          // Optional, max 100 chars
}

/**
 * Data structure for contact form submissions stored in Google Sheets.
 */
export interface ContactSubmission {
    timestamp: string;      // ISO 8601 format, auto-generated
    name: string;           // Required, max 100 chars
    email: string;          // Required, valid email
    organization?: string;  // Optional, max 200 chars
    subject?: string;       // Optional, max 200 chars
    message: string;        // Required, max 2000 chars
}

/**
 * Form input data for waitlist signup (includes honeypot for spam protection).
 */
export interface WaitlistFormData {
    email: string;
    name?: string;
    organization?: string;
    role?: string;
    honeypot: string;       // Must be empty string (spam protection)
}

/**
 * Form input data for contact form (includes honeypot for spam protection).
 */
export interface ContactFormData {
    name: string;
    email: string;
    organization?: string;
    subject?: string;
    message: string;
    honeypot: string;       // Must be empty string (spam protection)
}

// =============================================================================
// API Types (SPEC.md Section 3.1)
// =============================================================================

/**
 * Standard API response format.
 */
export type ApiResponse = {
    success: boolean;
    message?: string;
    error?: {
        code: string;
        message: string;
    };
};

/**
 * API error codes used across the application.
 */
export type ApiErrorCode =
    | 'VALIDATION_ERROR'
    | 'SPAM_DETECTED'
    | 'RATE_LIMITED'
    | 'SUBMISSION_FAILED';

// =============================================================================
// Navigation Types (SPEC.md Section 5.1)
// =============================================================================

/**
 * Navigation link structure for header/footer.
 */
export interface NavLink {
    label: string;
    href: string;
}

// =============================================================================
// Component Props Types (SPEC.md Section 4.2)
// =============================================================================

/**
 * Props for SectorCard component in Solutions section.
 */
export interface SectorCardProps {
    icon: ReactNode;        // Icon component or image
    title: string;          // Card title (e.g., "OR Efficiency")
    description: string;    // Brief description (2-3 sentences)
    benefits: string[];     // 3-4 bullet points
}

/**
 * Props for EngineCard component in How It Works section.
 */
export interface EngineCardProps {
    icon: ReactNode;        // Icon component or image
    title: string;          // e.g., "Vision Engine"
    description: string;    // What this engine does
}

/**
 * Props for SectionWrapper component.
 */
export interface SectionWrapperProps {
    id: string;                           // Section anchor ID
    children: ReactNode;
    className?: string;
    background?: 'white' | 'gray';        // Alternating backgrounds
}

/**
 * Props for MobileNav component.
 */
export interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

// =============================================================================
// Content Types (for config/content.ts)
// =============================================================================

/**
 * Solution card content structure.
 */
export interface SolutionCardContent {
    id: string;
    icon: string;           // Icon identifier
    title: string;
    description: string;
    benefits: string[];
}

/**
 * Engine card content structure.
 */
export interface EngineCardContent {
    id: string;
    icon: string;           // Icon identifier
    title: string;
    description: string;
}
