import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundVideo from '@/components/BackgroundVideo';
import WhatsAppButton from '@/components/WhatsAppButton';
import IntroAnimation from '@/components/IntroAnimation';
import ScrollIndicator from '@/components/ScrollIndicator';
import CustomCursor from '@/components/CustomCursor';

export const metadata = {
  title: 'DevCodeX — Modern Software Agency & 3D Web Engineering Studio',
  description: 'DevCodeX builds high-performance Next.js web applications, interactive 3D WebGL experiences, AI automation systems, and enterprise digital solutions.',
  keywords: ['Software Agency', 'Next.js Development', '3D Web Design', 'Three.js', 'AI Automation', 'E-Commerce', 'DevCodeX'],
  openGraph: {
    title: 'DevCodeX — Complete Premium 3D Agency Website',
    description: 'We Build Digital Solutions That Drive Real Growth',
    url: 'https://devcodex.com',
    siteName: 'DevCodeX',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevCodeX — Complete Premium 3D Agency Website',
    description: 'We Build Digital Solutions That Drive Real Growth',
    images: ['/devcodex.jpeg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col text-white bg-[#050505] relative"
        style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
        suppressHydrationWarning
      >
        <BackgroundVideo />
        <IntroAnimation />
        <ScrollIndicator />
        <CustomCursor />
        <Navbar />
        <main className="flex-grow pt-20 relative z-10">
          {children}
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
