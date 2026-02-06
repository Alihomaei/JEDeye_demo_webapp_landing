'use client';

import { useCallback } from 'react';

/**
 * Header height offset for scroll calculations.
 * Ensures scrolled content isn't hidden behind fixed header.
 */
const HEADER_OFFSET = 64;

/**
 * Custom hook for smooth scrolling to anchor sections.
 * Handles fixed header offset and gracefully ignores missing elements.
 *
 * @returns Object containing scrollTo function
 */
export function useScrollTo(): { scrollTo: (sectionId: string) => void } {
    const scrollTo = useCallback((sectionId: string): void => {
        // Strip leading # if present
        const cleanId = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;

        // Debug logging
        console.log('[useScrollTo] Attempting to scroll to:', cleanId);

        // Find the target element
        const element = document.getElementById(cleanId);

        // Debug logging
        console.log('[useScrollTo] Element found:', element);

        // Gracefully handle missing elements - log and return
        if (!element) {
            console.warn('[useScrollTo] Element not found with id:', cleanId);
            return;
        }

        // Calculate scroll position accounting for fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - HEADER_OFFSET;

        // Perform smooth scroll using native behavior
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }, []);

    return { scrollTo };
}

export default useScrollTo;
