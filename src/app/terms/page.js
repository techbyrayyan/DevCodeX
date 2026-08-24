'use client';

import PageTransition from '@/components/PageTransition';

export default function TermsPage() {
  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>
        <h1
          className="text-4xl font-extrabold"
          style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
        >
          Terms of Service
        </h1>
        <p className="text-xs font-mono" style={{ color: '#3b82f6' }}>Last updated: August 2026</p>

        <div className="rounded-2xl p-8 space-y-6 text-sm leading-relaxed" style={{ ...cardStyle, color: '#a1a1aa' }}>
          <h2
            className="text-xl font-bold"
            style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
          >
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using the DevCodeX website and agency services, you agree to be bound by these Terms of Service and our Master Service Agreements.
          </p>

          <h2
            className="text-xl font-bold"
            style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
          >
            2. Intellectual Property &amp; Code Ownership
          </h2>
          <p>
            Upon full payment of project milestone fees, clients receive 100% full ownership rights to bespoke custom source code, design assets, and database schemas created for their product.
          </p>

          <h2
            className="text-xl font-bold"
            style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
          >
            3. Warranties &amp; SLAs
          </h2>
          <p>
            DevCodeX warrants that delivered software will perform according to agreed technical specifications during the post-launch support window specified in your contract.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}

