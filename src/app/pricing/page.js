import PricingClient from './PricingClient';

export const metadata = {
  title: 'Pricing & Investment Plans — Transparent Development Rates',
  description: 'Transparent pricing packages for startup MVPs, scalable web applications, and enterprise AI & cloud transformations. No hidden fees.',
  alternates: {
    canonical: 'https://devcodex.com/pricing',
  },
  openGraph: {
    title: 'DevCodeX Pricing & Plans',
    description: 'Transparent pricing packages for startup MVPs, scalable web applications, and enterprise AI & cloud transformations.',
    url: 'https://devcodex.com/pricing',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: 'DevCodeX Pricing' }],
  },
};

export default function Page() {
  return <PricingClient />;
}
