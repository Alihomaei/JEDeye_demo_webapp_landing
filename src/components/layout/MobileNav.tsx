'use client';

import { useEffect, useRef, useCallback } from 'react';
import { siteConfig } from '@/config/site';
import { useScrollTo } from '@/hooks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

/**
 * Props for the MobileNav component.
 */
interface MobileNavProps {
    /** Whether the mobile menu is open */
    isOpen: boolean;
    /** Callback to close the menu */
    onClose: () => void;
}

/**
 * Slide-out mobile navigation menu.
 * Features focus trapping, escape key handling, and overlay dismiss.
 * Fully accessible with proper ARIA attributes.
 */
export function MobileNav({ isOpen, onClose }: MobileNavProps): JSX.Element | null {
    const { scrollTo } = useScrollTo();
    const menuRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const lastFocusableRef = useRef<HTMLButtonElement>(null);

    /**
     * Handle navigation link click - scroll to section and close menu.
     */
    const handleNavClick = useCallback((href: string): void => {
        scrollTo(href);
        onClose();
    }, [scrollTo, onClose]);

    /**
     * Handle CTA button click - scroll to waitlist and close menu.
     */
    const handleCtaClick = useCallback((): void => {
        scrollTo('waitlist');
        onClose();
    }, [scrollTo, onClose]);

    /**
     * Handle escape key press to close menu.
     */
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent): void => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    /**
     * Lock body scroll when menu is open.
     */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    /**
     * Focus trap - cycle focus within menu when open.
     */
    useEffect(() => {
        if (!isOpen) return;

        const handleTabKey = (event: KeyboardEvent): void => {
            if (event.key !== 'Tab') return;

            const focusableElements = menuRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (event.shiftKey) {
                // Shift + Tab: if on first element, go to last
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab: if on last element, go to first
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        };

        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
    }, [isOpen]);

    /**
     * Focus first element when menu opens.
     */
    useEffect(() => {
        if (isOpen && firstFocusableRef.current) {
            firstFocusableRef.current.focus();
        }
    }, [isOpen]);

    // Don't render if not open (for performance)
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay - click to close */}
            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Slide-in panel */}
            <div
                ref={menuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                className={cn(
                    'fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw]',
                    'bg-white shadow-xl',
                    'transform transition-transform duration-300 ease-in-out',
                    'md:hidden',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                {/* Close button */}
                <div className="flex justify-end p-4">
                    <button
                        ref={firstFocusableRef}
                        onClick={onClose}
                        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6 text-text-primary" />
                    </button>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col px-6 py-4">
                    {siteConfig.navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className={cn(
                                'py-4 text-left text-lg font-medium text-text-primary',
                                'border-b border-gray-100',
                                'hover:text-primary transition-colors duration-200',
                                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md'
                            )}
                        >
                            {link.label}
                        </button>
                    ))}

                    {/* CTA Button */}
                    <div className="mt-8">
                        <Button
                            ref={lastFocusableRef}
                            onClick={handleCtaClick}
                            className="w-full font-medium"
                            size="lg"
                        >
                            Join Waitlist
                        </Button>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default MobileNav;
