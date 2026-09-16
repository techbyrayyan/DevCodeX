import { notFound } from 'next/navigation';
import { services } from '@/data/servicesData';
import ServiceDetailClient from './ServiceDetailClient';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams?.slug);
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${service.title} Services`,
    description: service.shortDescription || service.description,
    keywords: [service.title, ...(service.technologies || []), ...(service.features || []), 'DevCodeX'],
    alternates: {
      canonical: `https://devcodex.com/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} Services | DevCodeX`,
      description: service.shortDescription || service.description,
      url: `https://devcodex.com/services/${service.slug}`,
      images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} Services | DevCodeX`,
      description: service.shortDescription || service.description,
    },
  };
}

export default async function ServicePage({ params }) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams?.slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description || service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'DevCodeX',
      url: 'https://devcodex.com',
    },
    areaServed: 'Worldwide',
    url: `https://devcodex.com/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}
