'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting responsive breakpoints via media queries.
 * SSR-safe: returns false during server-side rendering to prevent hydration mismatches.
 *
 * @param query - Media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 */
export function useMediaQuery(query: string): boolean {
    // Initialize to false for SSR safety - prevents hydration mismatch
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        // Create media query list
        const mediaQueryList = window.matchMedia(query);

        // Set initial value on mount (client-side only)
        setMatches(mediaQueryList.matches);

        // Handler for media query changes
        const handleChange = (event: MediaQueryListEvent): void => {
            setMatches(event.matches);
        };

        // Add event listener for changes (handles resize, orientation changes, etc.)
        mediaQueryList.addEventListener('change', handleChange);

        // Cleanup: remove event listener on unmount
        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;
