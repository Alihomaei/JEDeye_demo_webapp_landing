import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// =============================================================================
// Font Configuration
// =============================================================================

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// =============================================================================
// Metadata Configuration (SPEC.md Section 8.1)
// =============================================================================

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jedeye.ai'),
  title: {
    default: 'JEDeye | The Operating System for Intelligent Surgery',
    template: '%s | JEDeye',
  },
  description:
    'JEDeye is a hardware-agnostic, AI-driven SaMD that transforms standard laparoscopic video into real-time 3D intelligence, predictive safety, and automated OR logistics.',
  keywords: [
    'surgical AI',
    'intraoperative intelligence',
    '3D surgical navigation',
    'laparoscopic AI',
    'surgical safety',
    'OR efficiency',
    'software as a medical device',
  ],
  authors: [{ name: 'Nezami Lab', url: 'https://nezamilab.bwh.harvard.edu/' }],
  creator: 'Nezami Lab, Harvard Medical School',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jedeye.ai',
    siteName: 'JEDeye',
    title: 'JEDeye | The Operating System for Intelligent Surgery',
    description:
      'JEDeye is a hardware-agnostic, AI-driven SaMD that transforms standard laparoscopic video into real-time 3D intelligence and automated OR logistics.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JEDeye - The Operating System for Intelligent Surgery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JEDeye | The Operating System for Intelligent Surgery',
    description:
      'JEDeye is a hardware-agnostic, AI-driven SaMD that transforms standard laparoscopic video into real-time 3D intelligence and automated OR logistics.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// =============================================================================
// JSON-LD Structured Data (SPEC.md Section 8.2)
// =============================================================================

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'JEDeye',
  url: 'https://jedeye.ai',
  logo: 'https://jedeye.ai/images/JEDeye_transparent_logo.png',
  description: 'Hardware-agnostic, AI-driven SaMD — the operating system for intelligent surgery',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Nezami Lab',
    url: 'https://nezamilab.bwh.harvard.edu/',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '45 Francis Street, Thorn Building, Room 704A',
    addressLocality: 'Boston',
    addressRegion: 'MA',
    postalCode: '02115',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-617-525-3542',
    email: 'frikhtegarnezami@bwh.harvard.edu',
    contactType: 'customer service',
  },
};

// =============================================================================
// Root Layout Component
// =============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Fixed surgical background image */}
        <div className="page-bg" aria-hidden="true" />

        {/* Skip to main content link (accessibility) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
        >
          Skip to main content
        </a>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main id="main-content">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
