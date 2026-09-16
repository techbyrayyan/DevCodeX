import ServicesClient from './ServicesClient';

export const metadata = {
  title: 'Our Services — Full-Stack Web, AI Automation & 3D WebGL',
  description: 'Explore DevCodeX services: Next.js & React development, AI workflows & LLM integration, Figma UI/UX, Node.js backend architecture, and cloud DevOps.',
  alternates: {
    canonical: 'https://devcodex.com/services',
  },
  openGraph: {
    title: 'Engineering & Digital Services | DevCodeX',
    description: 'Explore DevCodeX services: Next.js & React development, AI workflows & LLM integration, Figma UI/UX, Node.js backend architecture, and cloud DevOps.',
    url: 'https://devcodex.com/services',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: 'DevCodeX Services' }],
  },
};

export default function Page() {
  return <ServicesClient />;
}
