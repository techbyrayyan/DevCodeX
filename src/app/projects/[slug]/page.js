import { notFound } from 'next/navigation';
import { projects } from '@/data/projectsData';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams?.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.description || project.subtitle,
    alternates: {
      canonical: `https://devcodex.com/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | DevCodeX`,
      description: project.description || project.subtitle,
      url: `https://devcodex.com/projects/${project.slug}`,
      images: project.image ? [{ url: project.image }] : [{ url: '/devcodex.jpeg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study | DevCodeX`,
      description: project.description || project.subtitle,
    },
  };
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams?.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
