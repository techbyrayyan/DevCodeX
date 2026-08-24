'use client';

import PageTransition from '@/components/PageTransition';

export default function PrivacyPage() {
  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>
        <h1
          className="text-4xl font-extrabold"
          style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
        >
          Privacy Policy
        </h1>
        <p className="text-xs font-mono" style={{ color: '#3b82f6' }}>Last updated: August 2026</p>

        <div className="rounded-2xl p-8 space-y-6 text-sm leading-relaxed" style={{ ...cardStyle, color: '#a1a1aa' }}>
          <h2
            className="text-xl font-bold"
            style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
          >
            1. Information We Collect
          </h2>
          <p>
            When you submit a project inquiry through our contact form or communicate with DevCodeX, we collect information including your name, corporate email address, company name, project details, and budget parameters.
          </p>

          <h2
            className="text-xl font-bold"
            style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
          >
            2. How We Use Information
          </h2>
          <p>
            Information collected is strictly utilized to respond to project requests, prepare technical proposals, manage client contracts, and maintain secure operational communication. We do NOT sell or distribute your data to third-party ad networks.
          </p>

          <h2
            className="text-xl font-bold"
            style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
          >
            3. Data Security &amp; Hosting
          </h2>
          <p>
            We implement SOC2-standard encryption, SSL protocols, and serverless edge security to prevent unauthorized access. Server data is hosted on Vercel and encrypted cloud databases.
          </p>

          <h2
            className="text-xl font-bold"
            style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
          >
            4. Contact Information
          </h2>
          <p>
            For questions regarding privacy, email us at <a href="mailto:devcodex.agency@gmail.com" className="font-bold hover:underline" style={{ color: '#3b82f6' }}>devcodex.agency@gmail.com</a>.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}

