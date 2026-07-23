import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevCodeX - Ultimate AI Business Platform',
  description: 'Manage your entire business workflow from one unified platform',
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      {children}
    </div>
  );
}
