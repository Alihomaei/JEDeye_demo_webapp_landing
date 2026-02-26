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
    stats: [
        { value: '$46/min', label: 'Average OR operating cost', source: 'Literature synthesis' },
        { value: '$230K', label: 'Potential savings per OR/year', source: 'Based on 5 min/case efficiency gain' },
        { value: '$10.1M', label: 'Single bile duct injury verdict', source: 'Georgia Court of Appeals' },
    ],
    positioning:
        'Most surgical AI is retrospective analytics — dashboards nobody reads. JEDeye delivers real-time assurance: the software upgrade for thousands of legacy endoscopic towers already installed worldwide.',
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
            id: 'realtime-overwatch',
            label: 'Real-time Overwatch',
            description: 'JEDeye\'s real-time surgical overwatch — continuous instrument detection and annotation during a live laparoscopic procedure.',
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
    heading: 'Three Levers of Value',
    subheading: 'Efficiency is the wedge — assurance is the engine. JEDeye delivers ROI across time, cost, and risk.',
    cards: [
        {
            id: 'time',
            icon: 'icon-or',
            title: 'Time',
            description:
                'Predictive scheduling and turnover optimization. Five minutes saved per case at $46/min = $230K per OR per year.',
            benefits: [
                'Predictive "Time to Close" updates the OR schedule board in real-time',
                'Automated phase recognition tracks case progress against historical benchmarks',
                'Turnover prediction reduces idle time between procedures',
                'Works with existing Stryker, Storz, and Olympus stacks — no new hardware',
            ],
        },
        {
            id: 'cost',
            icon: 'icon-insurance',
            title: 'Cost',
            description:
                'Visual supply tracking and automated billing. Every clip, staple, and sponge counted by AI — not by hand.',
            benefits: [
                'YOLO-based instrument detection generates cost reports automatically',
                'Vision-based gauze counter eliminates expensive RFID/barcode sponges',
                'Real-time cost-per-case forecast vs. preference card baseline',
                'Second revenue lever: de-identified benchmarking data for device companies',
            ],
        },
        {
            id: 'risk',
            icon: 'icon-education',
            title: 'Risk',
            description:
                'Complication prediction and training compliance. A single prevented "never event" pays for the platform for years.',
            benefits: [
                'Risk engine predicts hemorrhage probability — auto-alerts Blood Bank and ICU',
                'Surgeon fatigue and tremor detection with real-time safety threshold alerts',
                'Black box surgical recording for objective documentation and liability protection',
                'ABS EPA-compliant competency tracking for residency training programs',
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
// Pipeline Section Content (Under the Hood)
// =============================================================================

export const pipelineContent = {
    heading: 'Under the Hood',
    subheading:
        'Eight specialized AI modules working in concert — from pixel-level perception to real-time 3D surgical intelligence.',
    modules: [
        {
            id: 'pixelsense',
            icon: 'ScanEye',
            title: 'PixelSense',
            description:
                'Real-time pixel-level scene understanding — every structure labeled, every boundary mapped.',
            capabilities: [
                '14-class semantic map (liver, gallbladder, cystic duct, instruments, etc.)',
                'nnU-Net architecture for surgical scenes',
                'Frame-by-frame anatomical awareness',
            ],
        },
        {
            id: 'tiptrace',
            icon: 'Crosshair',
            title: 'TipTrace',
            description:
                'Sub-pixel instrument tip localization and motion path tracking across the surgical field.',
            capabilities: [
                'Keypoint detection of tool tip positions',
                'Temporal trajectory tracing',
                'Kinematic analysis for dexterity scoring',
            ],
        },
        {
            id: 'phasenet',
            icon: 'Brain',
            title: 'PhaseNet',
            description:
                'Automatic recognition of surgical workflow phases from video — the context engine for every downstream module.',
            capabilities: [
                '3D-ResNet-18 on 32-frame temporal clips',
                '7-phase classification (Cholec80)',
                '~80% validation accuracy',
            ],
        },
        {
            id: 'toolwatch',
            icon: 'Wrench',
            title: 'ToolWatch',
            description:
                'Real-time instrument detection and counting — automated inventory from video alone.',
            capabilities: [
                'YOLO-based detection of surgical tools',
                'Instrument presence/absence tracking',
                'Automated supply usage reporting',
            ],
        },
        {
            id: 'anatomymap',
            icon: 'Bone',
            title: 'AnatomyMap',
            description:
                'Patient-specific 3D organ models extracted from pre-operative CT — the anatomical ground truth.',
            capabilities: [
                'CT mesh extraction (liver, gallbladder)',
                'STL/OBJ export for surgical planning',
                'Patient-specific anatomy ready for intra-op overlay',
            ],
        },
        {
            id: 'depthforge',
            icon: 'Box',
            title: 'DepthForge',
            description:
                'Transforms standard 2D endoscopic video into a navigable 3D digital twin using Gaussian splatting.',
            capabilities: [
                'Monocular depth estimation',
                '3D Gaussian Splatting reconstruction',
                'Per-frame point cloud generation',
            ],
        },
        {
            id: 'timesync',
            icon: 'Clock',
            title: 'TimeSync',
            description:
                'Predicts remaining surgery time with calibrated uncertainty — powering OR scheduling in real-time.',
            capabilities: [
                'Mamba SSM + FiLM phase conditioning',
                '3.9 min MAE on Cholec80 test set',
                'Evidential regression for uncertainty',
            ],
        },
        {
            id: 'fusionlayer',
            icon: 'Layers',
            title: 'FusionLayer',
            description:
                'Overlays 3D CT anatomy onto the live 2D surgical video — X-ray vision for hidden structures.',
            capabilities: [
                'Rigid + non-rigid CT-to-video alignment',
                'Per-frame deformation tracking (CPD)',
                'Real-time organ mesh overlay on endoscopic view',
            ],
        },
    ] as EngineCardContent[],
} as const;

// =============================================================================
// Why Now Section Content
// =============================================================================

export const whyNowContent = {
    heading: 'Why Now',
    subheading: 'Two forcing functions are creating a time-sensitive market opening.',
    drivers: [
        {
            id: 'epa',
            title: 'ABS EPA Training Mandate',
            description: 'By July 2028, the American Board of Surgery requires Entrustable Professional Activities (EPA) data for all general surgery residents. Hundreds of thousands of assessments are already being collected nationally — but manual entry is unsustainable at scale.',
            highlight: 'JEDeye automates EPA compliance from surgical video.',
            timeline: '2023: EPAs go live | 2025: National rollout | 2028: Mandatory for board qualification',
        },
        {
            id: 'insurer',
            title: 'Insurer-Subsidized Black Box Adoption',
            description: 'In January 2025, MedPro Group (Berkshire Hathaway) partnered with SST to subsidize surgical video recording for liability reduction. The signal is clear: insurers will pay for surgical risk assurance technology.',
            highlight: 'We sell to risk managers and captives — not just CIOs.',
            timeline: 'Training mandates + insurer subsidies = a time-sensitive opening',
        },
    ],
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
            description: 'Core AI pipeline functional — real-time segmentation, 3D reconstruction, and live demo. TRL 5 validated. Published in Nature Scientific Reports.',
            status: 'completed' as const,
        },
        {
            id: 'data',
            label: 'Institutional Data Collection',
            description: '50+ cases per procedure type, 200+ hours of annotated surgical video across cholecystectomy, appendectomy, and sleeve gastrectomy.',
            status: 'active' as const,
        },
        {
            id: 'pilots',
            label: 'Multi-Site Pilots',
            description: 'Residency program workflow pilot (EPA evidence drafts) and efficiency workflow pilot (turnover prediction). PSO-ready architecture.',
            status: 'upcoming' as const,
        },
        {
            id: 'fda',
            label: 'FDA 510(k) Submission',
            description: 'Phase 1 ships as Clinical Decision Support (no FDA needed). Phase 2 pursues clearance for time-critical safety claims.',
            status: 'upcoming' as const,
        },
        {
            id: 'launch',
            label: 'Market Launch',
            description: 'Commercial deployment at $100K/OR/year SaaS. Insurance-aligned buying path targeting risk managers.',
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
            name: 'Ali Tavakkoli, MD',
            title: 'Chief, Professor of Surgery',
            credential: 'Mass General Brigham, Harvard Medical School',
            image: '/images/team/AT.jpg' as string | null,
            linkedin: null as string | null,
        },
        {
            id: 'founder-2',
            name: 'Farhad R. Nezami, PhD',
            title: 'Assistant Professor of Surgery',
            credential: 'MIT, Mass General Brigham, Harvard Medical School',
            image: '/images/team/FRN.webp' as string | null,
            linkedin: null as string | null,
        },
        {
            id: 'founder-3',
            name: 'Ali Homaei, MD, MBA',
            title: 'Postdoctoral Fellow of Surgery',
            credential: 'Mass General Brigham, Harvard Medical School',
            image: '/images/team/AH.jpg' as string | null,
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
            src: '/images/HMS.jpg' as string | null,
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
