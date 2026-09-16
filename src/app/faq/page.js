import FaqClient from './FaqClient';
import { faqs } from '@/data/faqData';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) — Engineering & Agency FAQs',
  description: 'Find answers to common questions about DevCodeX: project timelines, development stack, pricing structure, IP rights, and post-launch support.',
  alternates: {
    canonical: 'https://devcodex.com/faq',
  },
  openGraph: {
    title: 'DevCodeX FAQs — Answers to Common Questions',
    description: 'Find answers to common questions about DevCodeX: project timelines, development stack, pricing structure, IP rights, and post-launch support.',
    url: 'https://devcodex.com/faq',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: 'DevCodeX FAQ' }],
  },
};

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  );
}
