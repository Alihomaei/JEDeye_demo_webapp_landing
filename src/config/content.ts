/**
 * All page copy, metrics and media references. Every number here is traceable to
 * a results file in the JEDeye monorepo (see `source` fields); update the source
 * when you update the number.
 */

export type Clip = {
  /** Basename under /public/media, without extension. */
  id: string;
  /** Intrinsic aspect ratio of the encoded clip, width / height. */
  ratio: number;
  alt: string;
};

export const nav = [
  { href: '#modules', label: 'Modules' },
  { href: '#evidence', label: 'Evidence' },
  { href: '#business', label: 'Business' },
  { href: '#team', label: 'Team' },
] as const;

export const hero = {
  eyebrow: 'Investor review · October 2026',
  brand: 'JEDeye',
  headline: 'Surgical intelligence you can measure.',
  lede:
    'JEDeye reads the laparoscopic video every operating room already produces and turns it into phase recognition, remaining-time prediction, instrument analytics and a physics-based digital twin. No new hardware, no new workflow.',
  primaryCta: { label: 'Request a pilot', href: '#contact' },
  secondaryCta: { label: 'See the evidence', href: '#evidence' },
  clip: {
    id: 'twin_orbit',
    ratio: 960 / 540,
    alt: 'Orbit around the photoreal digital twin of a liver and gallbladder reconstructed from laparoscopic video.',
  } satisfies Clip,
  clipCaption: {
    label: 'Built from video.',
    text: 'The deformable digital twin JEDeye reconstructs from Cholec80 video 75, orbited in real time.',
    source: 'Nico/perception/renders/blender_twin · 2026-10-07',
  },
  facts: [
    { value: '89.2', unit: '%', label: 'phase recognition accuracy', note: 'Cholec80, 32 held-out videos' },
    { value: '4.3', unit: 'min', label: 'remaining-time error (MAE)', note: 'same test set, offline model' },
    { value: '6.3', unit: 'mm', label: 'depth RMSE, zero-shot', note: 'SCARED benchmark' },
  ],
} as const;

export const modules = {
  eyebrow: 'What the system sees',
  heading: 'Six models, one video feed.',
  intro:
    'Each module is trained and tested separately on public surgical datasets, then run together on the same frames. The numbers below are from held-out test videos, not training data.',
  items: [
    {
      n: '01',
      name: 'Segmentation',
      claim: 'Labels anatomy and instruments on every frame.',
      detail:
        'Liver, gallbladder, cystic structures and six tool classes, segmented at video rate. This is the ground layer every other module reads.',
      stat: { value: '0.98', label: 'tool mask mAP50' },
      figure: { src: '/media/fig_seg.webp', ratio: 1720 / 480, alt: 'Three frames with anatomy and instrument segmentation masks.' },
    },
    {
      n: '02',
      name: 'Phase recognition',
      claim: 'Knows which step of the operation is happening.',
      detail:
        'A bidirectional Mamba sequence model over ImageNet features recognises the seven phases of cholecystectomy. The live (causal) variant runs during surgery at 87.1%.',
      stat: { value: '89.2%', label: 'accuracy, +10 pts over the 3D-CNN baseline' },
    },
    {
      n: '03',
      name: 'Remaining time',
      claim: 'Predicts minutes to close, with calibrated uncertainty.',
      detail:
        'Phase-conditioned prediction with an evidential head. Error shrinks to 2.9 min in the middle of the case, where scheduling decisions are made.',
      stat: { value: '4.52 min', label: 'MAE for the live model' },
      figure: { src: '/media/chart_hero_prediction.webp', ratio: 2071 / 871, alt: 'Predicted versus true remaining time over a surgery.' },
    },
    {
      n: '04',
      name: 'Digital twin',
      claim: 'Rebuilds the scene in 3D and simulates tissue physics.',
      detail:
        'Monocular depth, 4D Gaussian splats and a SOFA finite-element liver and gallbladder, driven by the video. 776 frames simulated at 46 fps.',
      stat: { value: '2.65 mm', label: 'Chamfer distance to CT-derived ground truth' },
      clip: { id: 'fourdgs_orbit', ratio: 854 / 480, alt: 'Moving orbit through the 4D Gaussian-splat reconstruction of the scene.' } satisfies Clip,
    },
    {
      n: '05',
      name: 'Instrument tracking',
      claim: 'Tracks tool tips in 2D and lifts them into 3D.',
      detail:
        'Tip trajectories give economy of motion, smoothness and camera handling per phase: the raw material for objective skill scores.',
      stat: { value: '98.5%', label: 'instrument role identified correctly' },
      figure: { src: '/media/tracking_sample.webp', ratio: 2640 / 944, alt: 'A frame with tracked tool tips, their 2D paths and 3D paths.' },
    },
    {
      n: '06',
      name: 'Navigation',
      claim: 'Projects hidden structures onto the surgeon’s view.',
      detail:
        'Registers an organ model to the live scene and draws tumour margins and cut distances on the video. Concept stage: shown with an atlas model, not patient CT.',
      stat: { value: '0.8 mm', label: 'median target displacement over a clip' },
      figure: { src: '/media/surgps_frame.webp', ratio: 1200 / 674, alt: 'Endoscopic view with a projected tumour, margin ring and distance read-out.' },
      concept: true,
    },
  ],
} as const;

export const timeline = {
  eyebrow: 'Live read-out',
  heading: 'One surgery, second by second.',
  intro:
    'Drag through a held-out test case. The top band is the phase the model recognised; the curve is its remaining-time prediction with a 95% band, against what actually happened.',
  dataUrl: '/data/video49_timeline.json',
  source: 'time_predictor · causal model · Cholec80 video 49',
} as const;

export const evidence = {
  eyebrow: 'Evidence',
  heading: 'Inspect the outputs.',
  intro: 'Each panel is a real model output on public surgical video, trimmed and re-encoded for the web. Nothing is staged.',
  tabs: [
    {
      id: 'segmentation',
      label: 'Segmentation',
      title: 'Original against segmented, same frames.',
      text: 'Drag the divider. Frame for frame, the same 15 seconds with the model’s labels drawn on top.',
      source: 'nnU-Net (CholecSeg8k) · Cholec80 video 75 · frames 511–870',
      legend: [
        ['Liver', '#ff7272'],
        ['Gallbladder', '#ffa0a5'],
        ['Fat', '#bab74b'],
        ['Connective tissue', '#ff5500'],
        ['Grasper', '#aaff00'],
        ['L-hook', '#a9ffb8'],
      ],
      kind: 'compare',
      a: { id: 'seg_original', ratio: 854 / 480, alt: 'Original endoscopic video.' } satisfies Clip,
      b: { id: 'seg_segmented', ratio: 854 / 480, alt: 'The same video with segmentation overlays.' } satisfies Clip,
    },
    {
      id: 'twin',
      label: 'Digital twin',
      title: 'Physics that follows the video.',
      text: 'The twin’s liver and gallbladder deform as instruments push on them. The heat-map shows displacement in millimetres.',
      source: 'Nico/perception · SOFA + Unity HDRP · 2026-10-07',
      kind: 'pair',
      a: { id: 'hero_twin_vs_video', ratio: 1440 / 270, alt: 'Laparoscopic video on the left; the twin reconstructed from it on the right.' } satisfies Clip,
      b: { id: 'twin_heatmap', ratio: 1200 / 338, alt: 'Digital twin with a liver displacement heat-map in millimetres.' } satisfies Clip,
    },
    {
      id: 'tracking',
      label: 'Instrument tracking',
      title: 'From pixels to trajectories.',
      text: 'Hook and grasper tips tracked on video, then plotted in 3D. Speed-coloured trails show how economically each tool moves.',
      source: 'ScopeScore · CholecTrack20 videos 71 and 77',
      kind: 'pair',
      a: { id: 'tracking_3d', ratio: 1280 / 496, alt: 'Tracked tool tips beside their live 3D track.' } satisfies Clip,
      b: { id: 'tip_trails', ratio: 854 / 480, alt: 'Speed-coloured instrument tip trail with the per-second speed read-out.' } satisfies Clip,
    },
    {
      id: 'twin3d',
      label: 'Interactive twin',
      title: 'Turn it over yourself.',
      text: 'The liver and gallbladder atlas the twin pipeline registers to each patient, with a grasper and an L-hook. Rotate the organs, zoom in, and drag the instruments around the gallbladder.',
      source: 'Nico/perception/organ_meshes · instrument_models · 0.7 MB, loads on open',
      kind: 'scene',
    },
    {
      id: 'overwatch',
      label: 'Real-time overwatch',
      title: 'Continuous overwatch during the case.',
      text: 'Instrument detection and annotation running on a live laparoscopic procedure, with cost, risk and schedule read-outs alongside the remaining-time estimate.',
      source: 'JEDeye overwatch demo · institutional case',
      kind: 'single',
      a: { id: 'overwatch', ratio: 1280 / 720, alt: 'Live laparoscopic view with a detected stapler outlined and a side panel of cost, risk, remaining time and schedule.' } satisfies Clip,
    },
  ],
} as const;

export const metricsTable = {
  eyebrow: 'Measurements',
  heading: 'Every number, with its test.',
  rows: [
    { module: 'Phase recognition', metric: 'Accuracy (offline / live)', value: '89.2% / 87.1%', test: 'Cholec80, videos 49–80 held out', date: '2026-04' },
    { module: 'Phase recognition', metric: 'Macro F1', value: '0.795', test: 'Same split', date: '2026-04' },
    { module: 'Remaining time', metric: 'MAE (offline / live)', value: '4.28 / 4.52 min', test: 'Same split, 32 videos', date: '2026-04' },
    { module: 'Remaining time', metric: 'MAE at 50–60% progress', value: '2.86 min', test: 'Live model', date: '2026-04' },
    { module: 'Depth', metric: 'AbsRel / RMSE / δ<1.25', value: '0.080 / 6.3 mm / 95%', test: 'SCARED, zero-shot', date: '2026-07' },
    { module: 'Reconstruction', metric: 'Chamfer / F1@5 mm', value: '2.65 mm / 86%', test: 'SCARED', date: '2026-07' },
    { module: 'Digital twin', metric: 'Simulation rate', value: '46 fps', test: '776 frames, SOFA FEM', date: '2026-09' },
    { module: 'Instrument tracking', metric: 'Role correct / tips in box', value: '98.5% / 58%', test: 'CholecTrack20', date: '2026-10' },
    { module: 'Tool segmentation', metric: 'Mask mAP50', value: '0.98–0.99', test: 'Validation frames', date: '2026-10' },
    { module: 'Navigation', metric: 'Landmark error (median)', value: '9 px · 0.23 cm', test: 'Video 75 clip, atlas model', date: '2026-10' },
  ],
  footnote:
    'Offline models see the whole video; live models see only the past, as they would in the OR. Validation-frame metrics come from the training videos and are marked as such.',
} as const;

export const business = {
  eyebrow: 'Business',
  heading: 'Efficiency is the wedge. Assurance is the engine.',
  levers: [
    {
      name: 'Time',
      text: 'Predicted time-to-close feeds the OR board. Five minutes saved per case at $46 per OR minute is about $230K per room per year.',
    },
    {
      name: 'Cost',
      text: 'Instrument and consumable use counted from video, not by hand: automated cost-per-case and supply reporting.',
    },
    {
      name: 'Risk',
      text: 'Objective recording, skill metrics and complication signals. A single prevented bile-duct injury is worth more than a decade of licences.',
    },
  ],
  whyNow: {
    heading: 'Why now',
    items: [
      {
        title: 'Training mandate',
        text: 'By July 2028 the American Board of Surgery requires EPA data for every general-surgery resident. JEDeye generates it from the video.',
      },
      {
        title: 'Insurer-funded recording',
        text: 'Since January 2025 MedPro Group subsidises surgical video recording for liability reduction. Risk managers, not only CIOs, now have a budget line.',
      },
    ],
  },
  roadmap: {
    heading: 'Roadmap',
    items: [
      { when: 'Done', what: 'Core pipeline on public data; TRL 5; peer-reviewed publication', status: 'done' },
      { when: 'Now', what: 'Institutional data collection: 50+ cases per procedure, 200+ annotated hours', status: 'active' },
      { when: 'Next', what: 'Multi-site pilots: residency EPA workflow and OR-efficiency workflow', status: 'next' },
      { when: 'Then', what: 'FDA 510(k) for time-critical safety claims; Phase 1 ships as decision support', status: 'next' },
      { when: 'Launch', what: 'SaaS at $100K per OR per year, sold through risk and quality budgets', status: 'next' },
    ],
  },
} as const;

export const team = {
  eyebrow: 'Team',
  heading: 'Surgeons and engineers in the same lab.',
  members: [
    { name: 'Ali Tavakkoli, MD', role: 'Chief and Professor of Surgery', org: 'Mass General Brigham · Harvard Medical School', image: '/images/team/AT.jpg' },
    { name: 'Farhad R. Nezami, PhD', role: 'Assistant Professor of Surgery', org: 'MIT · Mass General Brigham · Harvard Medical School', image: '/images/team/FRN.webp' },
    { name: 'Ali Homaei, MD, MBA', role: 'Postdoctoral Fellow in Surgery', org: 'Mass General Brigham · Harvard Medical School', image: '/images/team/AH.jpg' },
  ],
  affiliations: [
    { name: 'Harvard Medical School', src: '/images/HMS.jpg', width: 220, height: 48 },
    { name: 'Mass General Brigham', src: '/images/MGB.png', width: 200, height: 48 },
  ],
} as const;

export const closing = {
  waitlist: {
    eyebrow: 'Updates',
    heading: 'Hear when results land.',
    text: 'Occasional notes on new validation results and pilot openings. No marketing cadence.',
    successMessage: 'You are on the list.',
    submitButton: 'Keep me posted',
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Talk to the founders.',
    text: 'Pilots, data partnerships, investment. We reply ourselves.',
    successMessage: 'Sent. We will reply from a personal address.',
    submitButton: 'Send',
  },
} as const;

// Kept for the API routes and forms that still import these names.
export const waitlistContent = closing.waitlist;
export const contactContent = closing.contact;

export const demoContent = {
  labels: { original: 'Original endoscopy', segmentation: 'AI segmentation' },
  fallback: {
    loadError: 'Unable to load the demo video. Check your connection or contact us for a demonstration.',
    autoplayBlocked: 'Tap to play',
  },
} as const;
