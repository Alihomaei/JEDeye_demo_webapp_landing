import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: 'oklch(from var(--paper) l c h / <alpha-value>)', 2: 'oklch(from var(--paper-2) l c h / <alpha-value>)', 3: 'oklch(from var(--paper-3) l c h / <alpha-value>)' },
        ink: { DEFAULT: 'oklch(from var(--ink) l c h / <alpha-value>)', 2: 'oklch(from var(--ink-2) l c h / <alpha-value>)', 3: 'oklch(from var(--ink-3) l c h / <alpha-value>)' },
        rule: { DEFAULT: 'var(--rule)', strong: 'var(--rule-strong)' },
        accent: {
          DEFAULT: 'oklch(from var(--accent) l c h / <alpha-value>)',
          strong: 'var(--accent-strong)',
          soft: 'var(--accent-soft)',
          ink: 'var(--accent-ink)',
        },
        ok: 'var(--ok)',
        warn: 'var(--warn)',
        danger: 'var(--danger)',
        // shadcn-compatible aliases used by ui/input, ui/button, ui/textarea
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        muted: { DEFAULT: 'var(--paper-2)', foreground: 'hsl(var(--muted-foreground))' },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        secondary: { DEFAULT: 'var(--paper-2)', foreground: 'var(--ink)' },
        accentui: { DEFAULT: 'var(--paper-2)', foreground: 'var(--ink)' },
        card: { DEFAULT: 'var(--paper)', foreground: 'var(--ink)' },
        error: 'var(--danger)',
        success: 'var(--ok)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Five steps, ≥1.25 ratio; headings fluid, body fixed.
        xs: ['0.75rem', { lineHeight: '1.4' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.45' }],
        h2: ['clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)', { lineHeight: '1.12' }],
        display: ['clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)', { lineHeight: '1.02' }],
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      maxWidth: { measure: 'var(--measure)' },
    },
  },
  plugins: [],
};

export default config;
