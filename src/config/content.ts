import type { SolutionCardContent, EngineCardContent } from '@/types';

// =============================================================================
// Hero Section Content
// =============================================================================

export const heroContent = {
    badge: 'Coming Soon',
    headline: '3D Surgical Intelligence for the Modern OR',
    subheadline:
        'JEDeye transforms standard endoscopic video into real-time 3D visualization and AI-powered insights—enhancing surgical precision, training, and quality assurance.',
    primaryCta: 'Join the Waitlist',
    secondaryCta: 'Learn More',
} as const;

// =============================================================================
// About Section Content
// =============================================================================

export const aboutContent = {
    heading: 'What is JEDeye?',
    paragraphs: [
        'JEDeye is an AI-enhanced surgical intelligence platform that converts standard 2D endoscopic video into actionable 3D intelligence using advanced Monocular Depth Estimation (MDE) technology.',
        'Unlike traditional systems that require expensive specialized equipment, JEDeye works with your existing endoscopic cameras—delivering spatial awareness, real-time guidance, and comprehensive performance analytics without hardware upgrades.',
    ],
} as const;

// =============================================================================
// Demo Section Content
// =============================================================================

export const demoContent = {
    heading: 'See It In Action',
    intro: "Watch JEDeye's AI transform standard endoscopic video into real-time semantic segmentation. Drag the slider to compare the original footage with AI-identified anatomical structures.",
    legendTitle: 'Segmentation Key',
    labels: {
        original: 'Original Endoscopy',
        segmentation: 'AI Segmentation',
    },
    fallback: {
        loadError:
            'Unable to load demo video. Please check your connection or contact us for a demonstration.',
        autoplayBlocked: 'Tap to play demo',
    },
} as const;

// =============================================================================
// Solutions Section Content
// =============================================================================

export const solutionsContent = {
    heading: 'Who We Serve',
    cards: [
        {
            id: 'or-efficiency',
            icon: 'icon-or',
            title: 'Operating Room Efficiency',
            description:
                'Streamline surgical workflows and reduce OR costs with AI-powered visualization and real-time guidance.',
            benefits: [
                'Reduce OR turnover time with intelligent workflow optimization',
                'Enhance surgeon spatial awareness without specialized equipment',
                'Decrease procedure duration through improved visualization',
                'Lower equipment costs by leveraging existing endoscopic cameras',
            ],
        },
        {
            id: 'insurance-qa',
            icon: 'icon-insurance',
            title: 'Insurance & Quality Assurance',
            description:
                'Objective documentation and scoring for risk management and continuous quality improvement.',
            benefits: [
                'Black box surgical recording for liability protection',
                'Objective skill assessment using validated scoring systems (GOALS)',
                'Automated documentation for quality audits and compliance',
                'Data-driven insights for malpractice risk reduction',
            ],
        },
        {
            id: 'education',
            icon: 'icon-education',
            title: 'Education & Training',
            description:
                'Transform surgical education with AI-powered mentorship and competency tracking.',
            benefits: [
                'EPA-compliant competency assessment and tracking',
                'AI-powered feedback for residents and fellows',
                'Interactive case review with 3D visualization',
                'Automated quiz generation for self-assessment',
            ],
        },
    ] as SolutionCardContent[],
} as const;

// =============================================================================
// How It Works Section Content
// =============================================================================

export const howItWorksContent = {
    heading: 'The Technology',
    subheading:
        'Four AI engines working together to transform surgical video into intelligence.',
    engines: [
        {
            id: 'vision',
            icon: 'icon-vision',
            title: 'Vision Engine',
            description:
                'Processes raw endoscopic video in real-time, identifying anatomical structures, instruments, and surgical actions.',
        },
        {
            id: 'spatial',
            icon: 'icon-spatial',
            title: 'Spatial Engine',
            description:
                'Converts 2D video to 3D using Monocular Depth Estimation, providing surgeons with enhanced spatial awareness.',
        },
        {
            id: 'scoring',
            icon: 'icon-scoring',
            title: 'Scoring Engine',
            description:
                'Evaluates surgical performance using validated metrics like GOALS, providing objective skill assessment.',
        },
        {
            id: 'interaction',
            icon: 'icon-interaction',
            title: 'Interaction Engine',
            description:
                'Delivers real-time feedback, generates educational content, and enables natural language queries about procedures.',
        },
    ] as EngineCardContent[],
} as const;

// =============================================================================
// Waitlist Section Content
// =============================================================================

export const waitlistContent = {
    heading: 'Be the First to Know',
    subheading:
        "Join our waitlist to receive updates on JEDeye's launch and early access opportunities.",
    successMessage: "Thank you! You're on the waitlist.",
    submitButton: 'Join Waitlist',
} as const;

// =============================================================================
// Contact Section Content
// =============================================================================

export const contactContent = {
    heading: 'Get in Touch',
    subheading:
        "Have questions about JEDeye or interested in partnership opportunities? We'd love to hear from you.",
    successMessage: "Message sent! We'll be in touch soon.",
    submitButton: 'Send Message',
} as const;
