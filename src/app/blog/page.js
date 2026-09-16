import BlogClient from './BlogClient';

export const metadata = {
  title: 'Engineering Blog & Tech Insights',
  description: 'Read the latest technical articles, engineering tutorials, and architectural insights from the DevCodeX team on Next.js, Three.js, AI, and cloud performance.',
  alternates: {
    canonical: 'https://devcodex.com/blog',
  },
  openGraph: {
    title: 'DevCodeX Engineering Blog & Insights',
    description: 'Read the latest technical articles, engineering tutorials, and architectural insights from DevCodeX.',
    url: 'https://devcodex.com/blog',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: 'DevCodeX Blog' }],
  },
};

export default function Page() {
  return <BlogClient />;
}
