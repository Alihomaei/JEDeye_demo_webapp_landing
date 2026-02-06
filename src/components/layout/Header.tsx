'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { useScrollTo } from '@/hooks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { MobileNav } from './MobileNav';

/**
 * Scroll threshold for header background change (in pixels).
 */
const SCROLL_THRESHOLD = 10;

/**
 * Sticky navigation header with mobile hamburger menu.
 * Transforms background from transparent to white/blur when scrolled.
 * Contains logo, navigation links, CTA button, and mobile menu.
 */
export function Header() {
    // Track scroll position for background change
    const [isScrolled, setIsScrolled] = useState(false);
    // Track mobile menu open state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollTo } = useScrollTo();

    // Listen for scroll events to update header background
    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        };

        // Set initial state
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /**
     * Handle navigation link click - smooth scroll to section.
     */
    const handleNavClick = (href: string): void => {
        console.log('[Header] Nav click triggered with href:', href);
        scrollTo(href);
    };

    /**
     * Handle logo click - scroll to top of page.
     */
    const handleLogoClick = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Handle CTA button click - scroll to waitlist section.
     */
    const handleCtaClick = (): void => {
        console.log('[Header] CTA click triggered');
        scrollTo('waitlist');
    };

    /**
     * Open mobile menu.
     */
    const openMobileMenu = (): void => {
        setIsMobileMenuOpen(true);
    };

    /**
     * Close mobile menu.
     */
    const closeMobileMenu = (): void => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header
                className={cn(
                    // Fixed positioning
                    'fixed top-0 left-0 right-0 z-50',
                    // Height
                    'h-16',
                    // Transition for background change
                    'transition-all duration-300 ease-in-out',
                    // Background state
                    isScrolled
                        ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm'
                        : 'bg-transparent'
                )}
            >
                <div className="mx-auto max-w-container h-full px-4 sm:px-6 lg:px-8">
                    <nav
                        className="flex items-center justify-between h-full"
                        aria-label="Main navigation"
                    >
                        {/* Logo */}
                        <button
                            onClick={handleLogoClick}
                            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                            aria-label="Scroll to top"
                        >
                            <Image
                                src="/images/JEDeye_transparent_logo.png"
                                alt={`${siteConfig.name} Logo`}
                                width={40}
                                height={40}
                                className="h-10 w-auto"
                                priority
                            />
                            <span className={cn(
                                'font-semibold text-xl transition-colors duration-300',
                                isScrolled ? 'text-text-primary' : 'text-text-primary'
                            )}>
                                {siteConfig.name}
                            </span>
                        </button>

                        {/* Navigation Links - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-8">
                            {siteConfig.navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={cn(
                                        'text-sm font-medium transition-colors duration-200',
                                        'hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1',
                                        isScrolled ? 'text-text-secondary' : 'text-text-secondary'
                                    )}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* CTA Button - Hidden on mobile */}
                        <div className="hidden md:block">
                            <Button
                                onClick={handleCtaClick}
                                size="sm"
                                className="font-medium"
                            >
                                Join Waitlist
                            </Button>
                        </div>

                        {/* Mobile hamburger button - visible only on mobile */}
                        <button
                            onClick={openMobileMenu}
                            className={cn(
                                'md:hidden p-2 rounded-md',
                                'hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                                'transition-colors duration-200'
                            )}
                            aria-label="Open menu"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <Menu className="h-6 w-6 text-text-primary" />
                        </button>
                    </nav>
                </div>
            </header>

            {/* Mobile Navigation Menu */}
            <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        </>
    );
}

export default Header;
