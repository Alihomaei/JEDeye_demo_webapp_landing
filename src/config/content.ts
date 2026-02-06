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
    intro: "Explore JEDeye's AI capabilities across multiple demos — from real-time segmentation to 3D reconstruction.",
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
    slides: [
        {
            id: 'segmentation',
            label: 'AI Segmentation',
            description: "Drag the slider to compare original endoscopic footage with JEDeye's real-time semantic segmentation, identifying anatomical structures and instruments.",
        },
        {
            id: '3d-reconstruction',
            label: '3D Reconstruction',
            description: 'Watch JEDeye convert standard 2D endoscopic video into a navigable 3D digital twin using Gaussian splatting technology.',
        },
        {
            id: 'pitch-video',
            label: 'Pitch Video',
            description: 'An 8-minute overview of JEDeye — the problem, the technology, and the vision for intelligent surgery.',
        },
    ],
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
            title: 'Computer Vision',
            description:
                'Real-time pixel-level analysis of the surgical field using state-of-the-art deep learning models.',
            capabilities: [
                'Semantic segmentation of anatomy & tools (nnU-Net)',
                'Instrument detection & inventory tracking (YOLO)',
                'Surgical phase recognition & workflow context (TCN)',
            ],
        },
        {
            id: 'spatial',
            icon: 'icon-spatial',
            title: '3D Reconstruction',
            description:
                'Converts standard 2D endoscopic video into a navigable 3D digital twin with pre-op CT overlay.',
            capabilities: [
                'Real-time Gaussian splatting for 3D scene reconstruction',
                '"Body GPS" — CT-to-video registration for deep structure localization',
                'X-ray vision for hidden anatomy (tumors, ducts, vessels)',
            ],
        },
        {
            id: 'scoring',
            icon: 'icon-scoring',
            title: 'Safety & Performance',
            description:
                'Continuous monitoring of surgeon dexterity and patient safety with real-time alerts.',
            capabilities: [
                'Tremor & fatigue detection with safety threshold alerts',
                'Kinematic analysis of instrument path efficiency',
                'Vision-based gauze counter to prevent retained foreign objects',
            ],
        },
        {
            id: 'interaction',
            icon: 'icon-interaction',
            title: 'Operational Intelligence',
            description:
                'Automates OR logistics — from scheduling and risk prediction to billing.',
            capabilities: [
                'Predictive "Time to Close" for OR schedule optimization',
                'Complication risk engine with auto Blood Bank / ICU alerts',
                'Automated consumable-based billing from visual detection',
            ],
        },
    ] as EngineCardContent[],
} as const;

// =============================================================================
// Roadmap Section Content
// =============================================================================

export const roadmapContent = {
    heading: 'Roadmap',
    subheading: 'Our path from MVP to market — building the operating system for intelligent surgery.',
    milestones: [
        {
            id: 'mvp',
            label: 'MVP Complete',
            description: 'Core AI pipeline functional — real-time segmentation, 3D reconstruction, and live demo.',
            status: 'completed' as const,
        },
        {
            id: 'data',
            label: 'Institutional Data Collection',
            description: '50+ cases per procedure type, 200+ hours of annotated surgical video across three procedures.',
            status: 'active' as const,
        },
        {
            id: 'validation',
            label: 'Clinical Validation',
            description: 'Multi-site validation studies and performance benchmarking against existing systems.',
            status: 'upcoming' as const,
        },
        {
            id: 'fda',
            label: 'FDA 510(k) Submission',
            description: 'Regulatory clearance as a Software as a Medical Device (SaMD).',
            status: 'upcoming' as const,
        },
        {
            id: 'launch',
            label: 'Market Launch',
            description: 'Commercial deployment to hospital partners with full platform capabilities.',
            status: 'upcoming' as const,
        },
    ],
} as const;

// =============================================================================
// Team Section Content
// =============================================================================

export const teamContent = {
    heading: 'Our Team',
    subheading: 'Built by surgeons, engineers, and researchers at the intersection of AI and medicine.',
    members: [
        {
            id: 'founder-1',
            name: 'Founder Name',
            title: 'Co-Founder & CEO',
            credential: 'Harvard Medical School',
            image: null as string | null, // Replace with '/images/team/founder-1.jpg' when available
            linkedin: null as string | null,
        },
        {
            id: 'founder-2',
            name: 'Founder Name',
            title: 'Co-Founder & CTO',
            credential: 'Mass General Brigham',
            image: null as string | null,
            linkedin: null as string | null,
        },
        {
            id: 'founder-3',
            name: 'Founder Name',
            title: 'Co-Founder & CSO',
            credential: 'Harvard Medical School',
            image: null as string | null,
            linkedin: null as string | null,
        },
    ],
} as const;

// =============================================================================
// Partners Section Content
// =============================================================================

export const partnersContent = {
    label: 'Affiliated with',
    logos: [
        {
            name: 'Harvard Medical School',
            src: null as string | null, // Replace with '/images/harvard-medical-school-logo.png' when available
            width: 220,
            height: 48,
        },
        {
            name: 'Mass General Brigham',
            src: null as string | null, // Replace with '/images/mass-general-brigham-logo.png' when available
            width: 200,
            height: 48,
        },
    ],
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
