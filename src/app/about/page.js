import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Us — Modern Software Agency & Engineering Studio',
  description: 'Learn about DevCodeX, our mission, vision, senior engineering team, and our commitment to building high-performance digital products.',
  alternates: {
    canonical: 'https://devcodex.com/about',
  },
  openGraph: {
    title: 'About DevCodeX — Software Engineering Studio & Agency',
    description: 'Learn about DevCodeX, our mission, vision, senior engineering team, and our commitment to building high-performance digital products.',
    url: 'https://devcodex.com/about',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: 'About DevCodeX' }],
  },
};

export default function Page() {
  return <AboutClient />;
}
