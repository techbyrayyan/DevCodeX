import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundVideo from '@/components/BackgroundVideo';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIConsultantWidget from '@/components/chat/AIConsultantWidget';
import IntroAnimation from '@/components/IntroAnimation';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL('https://devcodex.com'),
  title: {
    default: 'DevCodeX — Modern Software Agency & 3D Web Engineering Studio',
    template: '%s | DevCodeX',
  },
  description: 'DevCodeX builds high-performance Next.js web applications, interactive 3D WebGL experiences, AI automation systems, and enterprise digital solutions.',
  keywords: [
    'Software Agency',
    'Next.js Development',
    '3D Web Design',
    'Three.js',
    'AI Automation',
    'Full Stack Web Development',
    'Software Engineering Studio',
    'DevCodeX',
  ],
  authors: [{ name: 'DevCodeX Team', url: 'https://devcodex.com' }],
  creator: 'DevCodeX',
  publisher: 'DevCodeX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DevCodeX — Modern Software Agency & 3D Web Engineering Studio',
    description: 'We Build Digital Solutions That Drive Real Growth. High-performance Next.js web applications, interactive 3D experiences, and AI automation systems.',
    url: 'https://devcodex.com',
    siteName: 'DevCodeX',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: 'DevCodeX Digital Agency' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevCodeX — Modern Software Agency & 3D Web Engineering Studio',
    description: 'We Build Digital Solutions That Drive Real Growth. High-performance Next.js web applications, interactive 3D experiences, and AI automation systems.',
    images: ['/devcodex.jpeg'],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo4.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo4.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://devcodex.com/#organization',
      name: 'DevCodeX',
      url: 'https://devcodex.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://devcodex.com/logo4.png',
      },
      image: 'https://devcodex.com/devcodex.jpeg',
      description: 'DevCodeX builds high-performance Next.js web applications, interactive 3D WebGL experiences, AI automation systems, and enterprise digital solutions.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+923239724377',
        contactType: 'customer service',
        email: 'devcodex.agency@gmail.com',
        availableLanguage: ['English', 'Urdu'],
      },
      sameAs: [
        'https://github.com/techbyrayyan',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://devcodex.com/#website',
      url: 'https://devcodex.com',
      name: 'DevCodeX',
      publisher: {
        '@id': 'https://devcodex.com/#organization',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://devcodex.com/#service',
      name: 'DevCodeX Digital Agency',
      image: 'https://devcodex.com/devcodex.jpeg',
      url: 'https://devcodex.com',
      telephone: '+923239724377',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PK',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark h-full antialiased ${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col text-white bg-[#050505] relative font-sans"
        suppressHydrationWarning
      >
        <BackgroundVideo />
        <IntroAnimation />
        <Navbar />
        <main className="flex-grow pt-20 relative z-10">
          {children}
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
        <AIConsultantWidget />
        <WhatsAppButton />
      </body>
    </html>
  );
}
