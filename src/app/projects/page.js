import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Portfolio & Case Studies — Production Web & AI Systems',
  description: 'Browse our portfolio of completed client projects: ChatGPT Clone, DocFind, Motel App, Events Lahore, Ilaj Bil Ghiza, Eatiz Restaurant, and TES Therapy.',
  alternates: {
    canonical: 'https://devcodex.com/projects',
  },
  openGraph: {
    title: 'DevCodeX Portfolio & Case Studies',
    description: 'Browse our portfolio of completed client projects: Next.js web applications, AI platforms, and enterprise solutions.',
    url: 'https://devcodex.com/projects',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: 'DevCodeX Portfolio' }],
  },
};

export default function Page() {
  return <ProjectsClient />;
}
