'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { contactContent } from '@/config/content';
import { cn } from '@/lib/utils';

// =============================================================================
// Constants
// =============================================================================

const MAX_MESSAGE_LENGTH = 2000;

// =============================================================================
// Types
// =============================================================================

type SubmitStatus = 'idle' | 'success' | 'error';

// =============================================================================
// ContactForm Component
// =============================================================================

export function ContactForm() {
    // ---------------------------------------------------------------------------
    // State
    // ---------------------------------------------------------------------------
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // ---------------------------------------------------------------------------
    // Form Setup
    // ---------------------------------------------------------------------------
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            organization: '',
            subject: '',
            message: '',
            honeypot: '',
        },
    });

    // Watch message for character count
    const messageValue = watch('message', '');
    const messageLength = messageValue?.length || 0;

    // ---------------------------------------------------------------------------
    // Handlers
    // ---------------------------------------------------------------------------
    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus('idle');
        setErrorMessage(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus('success');
                reset(); // Clear form on success
            } else {
                setSubmitStatus('error');
                setErrorMessage(
                    result.error?.message || 'Something went wrong. Please try again.'
                );
            }
        } catch {
            setSubmitStatus('error');
            setErrorMessage('Unable to submit. Please try again or email us directly.');
        }
    };

    // ---------------------------------------------------------------------------
    // Render: Success State
    // ---------------------------------------------------------------------------
    if (submitStatus === 'success') {
        return (
            <div className="rounded-lg bg-success/10 border border-success/20 p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                    <svg
                        className="h-8 w-8 text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <p className="text-lg font-medium text-success">
                    {contactContent.successMessage}
                </p>
            </div>
        );
    }

    // ---------------------------------------------------------------------------
    // Render: Form
    // ---------------------------------------------------------------------------
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            aria-busy={isSubmitting}
            aria-describedby={submitStatus === 'error' ? 'contact-form-error' : undefined}
        >
            {/* Error Message Banner */}
            {submitStatus === 'error' && errorMessage && (
                <div
                    id="contact-form-error"
                    className="rounded-lg bg-error/10 border border-error/20 p-4"
                    role="alert"
                >
                    <div className="flex items-center gap-3">
                        <svg
                            className="h-5 w-5 flex-shrink-0 text-error"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <p className="text-sm text-error">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* Name Field (Required) */}
            <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium text-text-primary">
                    Name <span className="text-error">*</span>
                </label>
                <Input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={cn(
                        errors.name && 'border-error focus-visible:ring-error'
                    )}
                    {...register('name')}
                />
                {errors.name && (
                    <p id="contact-name-error" className="text-sm text-error" role="alert">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Email Field (Required) */}
            <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium text-text-primary">
                    Email <span className="text-error">*</span>
                </label>
                <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={cn(
                        errors.email && 'border-error focus-visible:ring-error'
                    )}
                    {...register('email')}
                />
                {errors.email && (
                    <p id="contact-email-error" className="text-sm text-error" role="alert">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Organization Field (Optional) */}
            <div className="space-y-1.5">
                <label htmlFor="contact-organization" className="text-sm font-medium text-text-primary">
                    Organization
                </label>
                <Input
                    id="contact-organization"
                    type="text"
                    placeholder="Your company or institution"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.organization}
                    aria-describedby={errors.organization ? 'contact-organization-error' : undefined}
                    className={cn(
                        errors.organization && 'border-error focus-visible:ring-error'
                    )}
                    {...register('organization')}
                />
                {errors.organization && (
                    <p id="contact-organization-error" className="text-sm text-error" role="alert">
                        {errors.organization.message}
                    </p>
                )}
            </div>

            {/* Subject Field (Optional) */}
            <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-sm font-medium text-text-primary">
                    Subject
                </label>
                <Input
                    id="contact-subject"
                    type="text"
                    placeholder="What is this regarding?"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    className={cn(
                        errors.subject && 'border-error focus-visible:ring-error'
                    )}
                    {...register('subject')}
                />
                {errors.subject && (
                    <p id="contact-subject-error" className="text-sm text-error" role="alert">
                        {errors.subject.message}
                    </p>
                )}
            </div>

            {/* Message Field (Required) */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label htmlFor="contact-message" className="text-sm font-medium text-text-primary">
                        Message <span className="text-error">*</span>
                    </label>
                    <span
                        className={cn(
                            'text-xs',
                            messageLength > MAX_MESSAGE_LENGTH ? 'text-error' : 'text-text-muted'
                        )}
                    >
                        {messageLength}/{MAX_MESSAGE_LENGTH}
                    </span>
                </div>
                <Textarea
                    id="contact-message"
                    placeholder="How can we help you?"
                    rows={5}
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={cn(
                        'resize-none',
                        errors.message && 'border-error focus-visible:ring-error'
                    )}
                    {...register('message')}
                />
                {errors.message && (
                    <p id="contact-message-error" className="text-sm text-error" role="alert">
                        {errors.message.message}
                    </p>
                )}
            </div>

            {/* Honeypot Field (Hidden - Spam Protection) */}
            <div
                className="absolute -left-[9999px] -top-[9999px]"
                aria-hidden="true"
            >
                <label htmlFor="contact-honeypot" className="sr-only">
                    Leave this field empty
                </label>
                <Input
                    id="contact-honeypot"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('honeypot')}
                />
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">
                        <svg
                            className="h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Sending...
                    </span>
                ) : (
                    contactContent.submitButton
                )}
            </Button>
        </form>
    );
}
