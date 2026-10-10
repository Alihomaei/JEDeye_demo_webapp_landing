import type { Metadata } from 'next';
import { Geist, Inter, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import { SessionProvider } from '@/components/auth/SessionProvider';

const body = Geist({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
const brand = Inter({ subsets: ['latin'], weight: ['700'], display: 'swap', variable: '--font-brand' });
const display = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const description =
  'JEDeye turns standard laparoscopic video into measured surgical intelligence: phase recognition, remaining-time prediction, instrument tracking and a physics-based digital twin, with no new hardware.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jedeye.app'),
  title: { default: 'JEDeye', template: '%s | JEDeye' },
  description,
  openGraph: {
    type: 'website',
    siteName: 'JEDeye',
    title: 'JEDeye — measured surgical intelligence',
    description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JEDeye' }],
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${brand.variable} ${display.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paper focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
