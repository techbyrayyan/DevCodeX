import PrivacyClient from './PrivacyClient';

export const metadata = {
  title: 'Privacy Policy',
  description: 'DevCodeX Privacy Policy. Learn how we collect, use, and safeguard your data, client IP, and personal information.',
  alternates: {
    canonical: 'https://devcodex.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PrivacyClient />;
}
