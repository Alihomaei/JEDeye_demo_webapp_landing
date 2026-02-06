import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				dark: '#00796B',
  				light: '#B2EBF2',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			text: {
  				primary: '#1E293B',
  				secondary: '#64748B',
  				muted: '#94A3B8'
  			},
  			success: '#10B981',
  			error: '#EF4444',
  			border: 'hsl(var(--border))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'hero-desktop': [
  				'3.5rem',
  				{
  					lineHeight: '1.1',
  					fontWeight: '700'
  				}
  			],
  			'hero-mobile': [
  				'2.25rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			'section-desktop': [
  				'2.25rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '600'
  				}
  			],
  			'section-mobile': [
  				'1.75rem',
  				{
  					lineHeight: '1.3',
  					fontWeight: '600'
  				}
  			]
  		},
  		spacing: {
  			'section-desktop': '6rem',
  			'section-mobile': '3rem'
  		},
  		maxWidth: {
  			container: '1200px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			xl: '0.75rem',
  			'2xl': '1rem',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  		},
  		animation: {
  			'fade-in-up': 'fadeInUp 0.5s ease-out'
  		},
  		keyframes: {
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
