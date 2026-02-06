import type { SolutionCardContent, EngineCardContent } from '@/types';

// =============================================================================
// Hero Section Content
// =============================================================================

export const heroContent = {
    badge: 'Coming Soon',
    headline: 'JEDeye',
    subheadline_top: 'The Operating System for Intelligent Surgery',
    description:
        'JEDeye is the Intra-operative Brain for laparoscopic surgery — overlaying real-time 3D intelligence, predictive safety, and automated logistics onto the surgical field. No new hardware required.',
    primaryCta: 'Join the Waitlist',
    secondaryCta: 'Learn More',
} as const;

// =============================================================================
// About Section Content
// =============================================================================

export const aboutContent = {
    heading: 'What is JEDeye?',
    paragraphs: [
        'JEDeye is a hardware-agnostic, AI-driven Software as a Medical Device (SaMD) that transforms standard 2D laparoscopic video into a 3D navigational environment with predictive safety and logistical capabilities — delivering Level 4 surgical assistance: Context Awareness, Perception, and Decision Support.',
        'Unlike legacy navigation systems that require proprietary, capital-intensive hardware towers, JEDeye integrates with your existing surgical stacks (Stryker, Storz, Olympus) via a hybrid edge-cloud architecture — bringing real-time intelligence to the OR without hardware upgrades.',
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
            description: "Drag the slider to compare original endoscopic footage with JEDeye's real-time semantic segmentation, identifying anatomical structures (liver, gallbladder, cystic duct) and surgical instruments.",
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
                'Automate OR logistics with AI-powered scheduling, risk prediction, and consumable tracking.',
            benefits: [
                'Predictive "Time to Close" optimizes OR turnover and scheduling',
                'Automated consumable-based billing from visual instrument detection',
                'Vision-based gauze counter eliminates expensive RFID/barcode sponges',
                'Hardware-agnostic — works with Stryker, Storz, and Olympus stacks',
            ],
        },
        {
            id: 'insurance-qa',
            icon: 'icon-insurance',
            title: 'Safety & Risk Management',
            description:
                'Proactive complication prediction and real-time safety monitoring to protect patients and reduce liability.',
            benefits: [
                'Complication risk engine predicts hemorrhage probability in real-time',
                'Auto-alerts Blood Bank and ICU when risk thresholds are exceeded',
                'Surgeon fatigue and tremor detection with safety threshold alerts',
                'Black box surgical recording for objective documentation and audits',
            ],
        },
        {
            id: 'education',
            icon: 'icon-education',
            title: 'Education & Training',
            description:
                'Transform surgical education with 3D digital twins and quantitative performance analytics.',
            benefits: [
                'Kinematic analysis of instrument path efficiency and agility scoring',
                'Interactive case review with navigable 3D reconstructions',
                '"Body GPS" CT overlay for teaching anatomy and surgical planning',
                'Quantitative competency tracking across residents and fellows',
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
        'Four synchronized intelligence modules processing surgical data in real-time.',
    engines: [
        {
            id: 'vision',
            icon: 'icon-vision',
            title: 'The "Eyes"',
            description:
                'Computer Vision — real-time pixel-level analysis of the surgical field using state-of-the-art deep learning models.',
            capabilities: [
                'Semantic segmentation of anatomy & tools (nnU-Net)',
                'Instrument detection & inventory tracking (YOLO)',
                'Surgical phase recognition & workflow context (TCN)',
            ],
        },
        {
            id: 'spatial',
            icon: 'icon-spatial',
            title: 'The "Map"',
            description:
                '3D Reconstruction & Navigation — converts monocular 2D video into a navigable 3D digital twin with pre-op CT overlay.',
            capabilities: [
                'Real-time Gaussian splatting for 3D scene reconstruction',
                '"Body GPS" — CT-to-video registration for deep structure localization',
                '"X-ray vision" for hidden anatomy (tumors, ducts, vessels)',
            ],
        },
        {
            id: 'scoring',
            icon: 'icon-scoring',
            title: 'The "Coach"',
            description:
                'Surgeon Performance & Safety — continuous monitoring of dexterity, fatigue, and foreign object retention.',
            capabilities: [
                'Tremor & fatigue detection with safety threshold alerts',
                'Kinematic analysis of instrument path efficiency & agility scoring',
                'Vision-based gauze counter to prevent retained foreign objects',
            ],
        },
        {
            id: 'interaction',
            icon: 'icon-interaction',
            title: 'The "Manager"',
            description:
                'Operational Intelligence — automates OR logistics from scheduling and risk prediction to billing.',
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
    subheading: 'TRL 5 validated — our path from MVP to market as the operating system for intelligent surgery.',
    milestones: [
        {
            id: 'mvp',
            label: 'MVP Complete',
            description: 'Core AI pipeline functional — real-time segmentation, 3D reconstruction, and live demo. TRL 5 validated.',
            status: 'completed' as const,
        },
        {
            id: 'data',
            label: 'Institutional Data Collection',
            description: '50+ cases per procedure type, 200+ hours of annotated surgical video across cholecystectomy, appendectomy, and sleeve gastrectomy.',
            status: 'active' as const,
        },
        {
            id: 'validation',
            label: 'Clinical Validation',
            description: 'Multi-site validation studies and generalizability testing beyond public datasets.',
            status: 'upcoming' as const,
        },
        {
            id: 'fda',
            label: 'FDA 510(k) Submission',
            description: 'Pre-submission data and regulatory clearance as a Software as a Medical Device (SaMD).',
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
            src: '/images/HMS.png' as string | null,
            width: 220,
            height: 48,
        },
        {
            name: 'Mass General Brigham',
            src: '/images/MGB.png' as string | null,
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
