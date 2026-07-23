'use client';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import dynamic from 'next/dynamic';
import HomePage from '@/components/home/HomePage';

// Minimal fast skeleton - just a thin top bar flash, no full-screen spinner
const PageSkeleton = () => (
  <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-950">
    <div className="h-0.5 w-full bg-indigo-500 animate-pulse" />
  </div>
);

const DashboardPage       = dynamic(() => import('@/components/dashboard/DashboardPage'),       { loading: () => <PageSkeleton /> });
const InvoicesPage        = dynamic(() => import('@/components/invoice/InvoicesPage'),          { loading: () => <PageSkeleton /> });
const InvoiceCreatePage   = dynamic(() => import('@/components/invoice/InvoiceCreatePage'),     { loading: () => <PageSkeleton /> });
const ExpensesPage        = dynamic(() => import('@/components/expenses/ExpensesPage'),         { loading: () => <PageSkeleton /> });
const AnalyticsPage       = dynamic(() => import('@/components/analytics/AnalyticsPage'),      { loading: () => <PageSkeleton /> });
const ReportsPage         = dynamic(() => import('@/components/reports/ReportsPage'),           { loading: () => <PageSkeleton /> });
const ProjectsPage        = dynamic(() => import('@/components/projects/ProjectsPage'),         { loading: () => <PageSkeleton /> });
const AIProposalsPage     = dynamic(() => import('@/components/aiproposals/AIProposalsPage'),   { loading: () => <PageSkeleton /> });
const QuotationsPage      = dynamic(() => import('@/components/quotations/QuotationsPage'),     { loading: () => <PageSkeleton /> });
const ContractsPage       = dynamic(() => import('@/components/contracts/ContractsPage'),       { loading: () => <PageSkeleton /> });
const SettingsPage        = dynamic(() => import('@/components/settings/SettingsPage'),         { loading: () => <PageSkeleton /> });
const BgRemoverPage       = dynamic(() => import('@/components/tools/BgRemoverPage'),           { loading: () => <PageSkeleton /> });
const ImageCompressorPage = dynamic(() => import('@/components/tools/ImageCompressorPage'),     { loading: () => <PageSkeleton /> });
const ImageToPdfPage      = dynamic(() => import('@/components/tools/ImageToPdfPage'),          { loading: () => <PageSkeleton /> });
const ResumeBuilderPage   = dynamic(() => import('@/components/tools/ResumeBuilderPage'),       { loading: () => <PageSkeleton /> });
const QRCodeGeneratorPage = dynamic(() => import('@/components/tools/QRCodeGeneratorPage'),     { loading: () => <PageSkeleton /> });
const CSSGradientGeneratorPage = dynamic(() => import('@/components/tools/CSSGradientGeneratorPage'), { loading: () => <PageSkeleton /> });
const BusinessLetterGeneratorPage = dynamic(() => import('@/components/tools/BusinessLetterGeneratorPage'), { loading: () => <PageSkeleton /> });
const EstimateCalculatorPage    = dynamic(() => import('@/components/tools/EstimateCalculatorPage'),    { loading: () => <PageSkeleton /> });
const JsonToCsvPage             = dynamic(() => import('@/components/tools/JsonToCsvPage'),             { loading: () => <PageSkeleton /> });
const MetaTagGeneratorPage      = dynamic(() => import('@/components/tools/MetaTagGeneratorPage'),      { loading: () => <PageSkeleton /> });

const SlugGeneratorPage         = dynamic(() => import('@/components/tools/SlugGeneratorPage'),         { loading: () => <PageSkeleton /> });
const AISocialCaptionPage       = dynamic(() => import('@/components/tools/AISocialCaptionPage'),       { loading: () => <PageSkeleton /> });
const ImageOCRPage              = dynamic(() => import('@/components/tools/ImageOCRPage'),              { loading: () => <PageSkeleton /> });

const AIConsultantWidget  = dynamic(() => import('@/components/chat/AIConsultantWidget'),       { ssr: false });

function AppRouter() {
  const { view } = useAuth();

  switch (view) {
    case 'home':              return <HomePage />;
    case 'dashboard':         return <DashboardPage />;

    case 'invoices':          return <InvoicesPage />;
    case 'invoice-create':    return <InvoiceCreatePage />;
    case 'expenses':          return <ExpensesPage />;
    case 'analytics':         return <AnalyticsPage />;
    case 'reports':           return <ReportsPage />;
    case 'quotations':        return <QuotationsPage />;
    case 'ai-proposals':      return <AIProposalsPage />;
    case 'contracts':         return <ContractsPage />;
    case 'projects':          return <ProjectsPage />;
    case 'settings':          return <SettingsPage />;
    case 'bg-remover':        return <BgRemoverPage />;
    case 'image-compressor':  return <ImageCompressorPage />;
    case 'image-to-pdf':      return <ImageToPdfPage />;
    case 'resume-builder':    return <ResumeBuilderPage />;
    case 'qr-code-generator': return <QRCodeGeneratorPage />;
    case 'css-gradient-generator': return <CSSGradientGeneratorPage />;
    case 'business-letter':   return <BusinessLetterGeneratorPage />;
    case 'estimate-calculator': return <EstimateCalculatorPage />;
    case 'json-to-csv':       return <JsonToCsvPage />;
    case 'meta-tag-generator': return <MetaTagGeneratorPage />;

    case 'slug-generator':    return <SlugGeneratorPage />;
    case 'ai-social-caption': return <AISocialCaptionPage />;
    case 'image-ocr':         return <ImageOCRPage />;
    default:                  return <HomePage />;
  }
}

export default function Page() {
  return (
    <AuthProvider>
      <AppRouter />
      <AIConsultantWidget />
    </AuthProvider>
  );
}
