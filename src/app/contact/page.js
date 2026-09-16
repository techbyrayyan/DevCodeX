import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us — Start Your Project With DevCodeX',
  description: 'Get in touch with DevCodeX software agency. Inquire about custom web development, AI automation, or 3D WebGL design. We reply within 4 hours.',
  alternates: {
    canonical: 'https://devcodex.com/contact',
  },
  openGraph: {
    title: 'Contact DevCodeX — Start Your Project',
    description: 'Get in touch with DevCodeX software agency. Inquire about custom web development, AI automation, or 3D WebGL design.',
    url: 'https://devcodex.com/contact',
    images: [{ url: '/devcodex.jpeg', width: 1200, height: 630, alt: 'Contact DevCodeX' }],
  },
};

export default function Page() {
  return <ContactClient />;
}
