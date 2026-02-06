import { z } from 'zod';

// =============================================================================
// Waitlist Form Schema
// =============================================================================

export const waitlistSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    name: z
        .string()
        .max(100, 'Name must be 100 characters or less')
        .optional(),
    organization: z
        .string()
        .max(200, 'Organization must be 200 characters or less')
        .optional(),
    role: z
        .string()
        .max(100, 'Role must be 100 characters or less')
        .optional(),
    honeypot: z
        .string()
        .max(0, 'Submission rejected'), // Must be empty (spam protection)
});

// =============================================================================
// Contact Form Schema
// =============================================================================

export const contactSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(100, 'Name must be 100 characters or less'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    organization: z
        .string()
        .max(200, 'Organization must be 200 characters or less')
        .optional(),
    subject: z
        .string()
        .max(200, 'Subject must be 200 characters or less')
        .optional(),
    message: z
        .string()
        .min(1, 'Message is required')
        .max(2000, 'Message must be 2000 characters or less'),
    honeypot: z
        .string()
        .max(0, 'Submission rejected'), // Must be empty (spam protection)
});

// =============================================================================
// Inferred Types from Schemas
// =============================================================================

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
