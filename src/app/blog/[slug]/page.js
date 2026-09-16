import { notFound } from 'next/navigation';
import { blogArticles } from '@/data/blogData';
import BlogDetailClient from './BlogDetailClient';

export async function generateStaticParams() {
  return blogArticles.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const article = blogArticles.find((b) => b.slug === resolvedParams?.slug);
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `https://devcodex.com/blog/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | DevCodeX Blog`,
      description: article.excerpt,
      url: `https://devcodex.com/blog/${article.slug}`,
      type: 'article',
      images: article.coverImage ? [{ url: article.coverImage }] : [{ url: '/devcodex.jpeg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const article = blogArticles.find((b) => b.slug === resolvedParams?.slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage ? `https://devcodex.com${article.coverImage}` : undefined,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'DevCodeX Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DevCodeX',
      logo: {
        '@type': 'ImageObject',
        url: 'https://devcodex.com/logo4.png',
      },
    },
    url: `https://devcodex.com/blog/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogDetailClient article={article} />
    </>
  );
}
