import { services } from '@/data/servicesData';
import { projects } from '@/data/projectsData';
import { blogArticles } from '@/data/blogData';

export default function sitemap() {
  const baseUrl = 'https://devcodex.com';

  const now = new Date().toISOString();

  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    { route: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/projects', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
    { route: '/terms', priority: 0.5, changeFrequency: 'yearly' },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes = blogArticles.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
