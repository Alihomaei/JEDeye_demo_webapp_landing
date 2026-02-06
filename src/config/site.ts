import type { NavLink } from '@/types';

export const siteConfig = {
    name: 'JEDeye',
    tagline: 'The Operating System for Intelligent Surgery',
    url: 'https://jedeye.ai', // Update with actual domain
    description:
        'JEDeye is a hardware-agnostic, AI-driven SaMD that transforms standard laparoscopic video into real-time 3D intelligence, predictive safety, and automated OR logistics.',

    navLinks: [
        { label: 'About', href: '#about' },
        { label: 'Demo', href: '#demo' },
        { label: 'Solutions', href: '#solutions' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Contact', href: '#contact' },
    ] as NavLink[],

    socialLinks: {
        // Add if provided
        // linkedin: 'https://linkedin.com/company/jedeye',
        // twitter: 'https://twitter.com/jedeye',
    },

    externalLinks: {
        nezamiLab: 'https://nezamilab.bwh.harvard.edu/',
        nezamiLabContact: 'https://nezamilab.bwh.harvard.edu/contact-us/',
        privacyPolicy: '#', // Update with actual policy link
    },
} as const;

export type SiteConfig = typeof siteConfig;
