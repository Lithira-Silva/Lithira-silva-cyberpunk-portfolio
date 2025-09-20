import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lithira Silva - Architect of Tomorrow\'s Code',
  description: 'Full-Stack AI Engineer crafting intelligent systems that scale. 10+ years experience in Node.js, Python, React, TensorFlow, and AI integrations.',
  keywords: [
    'full-stack developer',
    'AI engineer',
    'machine learning',
    'React',
    'Node.js',
    'Python',
    'TensorFlow',
    'Next.js',
    'TypeScript'
  ],
  authors: [{ name: 'Lithira Silva' }],
  creator: 'Lithira Silva',
  publisher: 'Lithira Silva',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lithirasilva.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lithira Silva - Architect of Tomorrow\'s Code',
    description: 'Full-Stack AI Engineer crafting intelligent systems that scale.',
    url: 'https://lithirasilva.dev',
    siteName: 'Lithira Silva Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lithira Silva - Full-Stack AI Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lithira Silva - Architect of Tomorrow\'s Code',
    description: 'Full-Stack AI Engineer crafting intelligent systems that scale.',
    images: ['/og-image.jpg'],
    creator: '@lithirasilva',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Lithira Silva',
              jobTitle: 'Full-Stack AI Engineer',
              description: 'Full-Stack AI Engineer crafting intelligent systems that scale',
              url: 'https://lithirasilva.dev',
              sameAs: [
                'https://github.com/Lithira-Silva',
                'https://linkedin.com/in/lithirasilva',
                'https://twitter.com/lithirasilva',
              ],
              knowsAbout: [
                'Artificial Intelligence',
                'Machine Learning',
                'React',
                'Node.js',
                'Python',
                'TensorFlow',
                'Next.js',
                'TypeScript'
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased bg-black text-white overflow-x-hidden">
        <div id="root">
          {children}
        </div>
        
        {/* Accessibility skip link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-cyan-400 text-black px-4 py-2 font-mono"
        >
          Skip to main content
        </a>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}