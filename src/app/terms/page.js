import TermsClient from './TermsClient';

export const metadata = {
  title: 'Terms of Service',
  description: 'DevCodeX Terms of Service and contractual terms governing web engineering, intellectual property transfer, and agency client relationships.',
  alternates: {
    canonical: 'https://devcodex.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <TermsClient />;
}
