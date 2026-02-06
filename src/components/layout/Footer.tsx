import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { contactInfo } from '@/config/contact';

/**
 * Page footer with navigation links, external links, and institutional information.
 * Responsive layout: multi-column on desktop, stacked on mobile.
 */
export function Footer() {
    // Get current year for copyright notice
    const currentYear = new Date().getFullYear();

    // Build institution affiliation string
    const institutionAffiliation = `${contactInfo.institution.name}, ${contactInfo.institution.affiliations.join(', ')}`;

    return (
        <footer className="glass-footer border-t border-white/20">
            <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
                {/* Main footer content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Logo and tagline */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Image
                                src="/images/JEDeye_transparent_logo.png"
                                alt={`${siteConfig.name} Logo`}
                                width={32}
                                height={32}
                                className="h-8 w-auto"
                            />
                            <span className="font-semibold text-lg text-text-primary">
                                {siteConfig.name}
                            </span>
                        </div>
                        <p className="text-sm text-text-secondary max-w-xs">
                            {siteConfig.tagline}
                        </p>
                    </div>

                    {/* Column 2: Navigation links */}
                    <nav aria-label="Footer navigation">
                        <h3 className="font-semibold text-text-primary mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            {siteConfig.navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Column 3: External links */}
                    <div>
                        <h3 className="font-semibold text-text-primary mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href={siteConfig.externalLinks.nezamiLab}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 inline-flex items-center gap-1"
                                >
                                    Nezami Lab
                                    <svg
                                        className="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                    <span className="sr-only">(opens in new tab)</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={siteConfig.externalLinks.privacyPolicy}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 inline-flex items-center gap-1"
                                >
                                    Privacy Policy
                                    <svg
                                        className="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                    <span className="sr-only">(opens in new tab)</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact info */}
                    <div>
                        <h3 className="font-semibold text-text-primary mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="hover:text-primary transition-colors duration-200"
                                >
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${contactInfo.phone.replace(/[^+\d]/g, '')}`}
                                    className="hover:text-primary transition-colors duration-200"
                                >
                                    {contactInfo.phone}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar: Institution affiliation and copyright */}
                <div className="py-6 border-t border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
                        {/* Institution affiliation */}
                        <p>{institutionAffiliation}</p>

                        {/* Copyright */}
                        <p>
                            © {currentYear} {siteConfig.name}. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
