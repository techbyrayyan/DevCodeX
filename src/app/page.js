import HomeClient from './HomeClient';

export const metadata = {
  title: 'DevCodeX — Modern Software Agency & 3D Web Engineering Studio',
  description: 'DevCodeX builds high-performance Next.js web applications, interactive 3D WebGL experiences, AI automation systems, and enterprise digital solutions.',
  alternates: {
    canonical: 'https://devcodex.com',
  },
  openGraph: {
    title: 'DevCodeX — Modern Software Agency & 3D Web Engineering Studio',
    description: 'We Build Digital Solutions That Drive Real Growth. Next.js, 3D WebGL experiences, and AI automation.',
    url: 'https://devcodex.com',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: 'DevCodeX Digital Agency' }],
  },
};

export default function Page() {
  return <HomeClient />;
}
