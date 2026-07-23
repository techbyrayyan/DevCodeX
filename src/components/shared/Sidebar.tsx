'use client';
import { useAuth } from '@/lib/AuthContext';
import { AppView } from '@/types';
import {
  LayoutDashboard,
  FileText,
  PieChart,
  Moon,
  Sun,
  Plus,
  Sparkles,
  Briefcase,
  FileEdit,
  FolderKanban,
  CreditCard,
  Menu,
  X,
  Settings,
  Eraser,
  ImageDown,
  FileOutput,
  Target,
  FileUser,
  QrCode,
  Paintbrush,
  Calculator,
  FileJson,
  Tag,
  Link2,
  MessageSquare,
  ScanText,
  User
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const { view, goTo, darkMode, toggleDark, isSidebarOpen, toggleSidebar } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'quotations', label: 'Quotations', icon: FileEdit },
    { id: 'ai-proposals', label: 'AI Proposals', icon: Sparkles },
    { id: 'bg-remover', label: 'BG Remover', icon: Eraser },
    { id: 'image-compressor', label: 'Image Compressor', icon: ImageDown },
    { id: 'image-to-pdf', label: 'Image to PDF', icon: FileOutput },
    { id: 'resume-builder',    label: 'Resume Builder',    icon: FileUser },
    { id: 'qr-code-generator', label: 'QR Code Generator', icon: QrCode },
    { id: 'css-gradient-generator', label: 'CSS Gradient', icon: Paintbrush },
    { id: 'business-letter',   label: 'Letter Generator',   icon: FileText },
    { id: 'contracts', label: 'Contracts', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'estimate-calculator', label: 'Estimate Calc', icon: Calculator },
    { id: 'json-to-csv', label: 'JSON to CSV', icon: FileJson },
    { id: 'meta-tag-generator', label: 'Meta Tags', icon: Tag },
    { id: 'slug-generator', label: 'Slug Generator', icon: Link2 },
    { id: 'ai-social-caption', label: 'Social Captions', icon: MessageSquare },
    { id: 'image-ocr', label: 'Image OCR', icon: ScanText },
    { id: 'reports', label: 'Reports', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];


  return (
    <aside className={cn(
      "glass border-r border-slate-200 dark:border-slate-800 h-full flex flex-col z-40 transition-all duration-300",
      "fixed inset-y-0 left-0 lg:relative", // mobile vs desktop positioning
      isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"
    )}>
      <div className="p-4 lg:p-6 pb-4 shrink-0">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <button
          onClick={() => goTo('invoice-create')}
          className={cn(
            "w-full shadow-indigo-500/20 shadow-lg",
            isSidebarOpen ? "btn-primary" : "btn-primary p-2 flex justify-center !px-0"
          )}
          title="Create Invoice"
        >
          <Plus size={18} />
          {isSidebarOpen && <span>Create</span>}
        </button>
      </div>

      <div className={cn("flex-1 overflow-y-auto py-2 pb-4 smooth-scroll", isSidebarOpen ? "px-6" : "px-3")}>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                goTo(item.id as AppView);
                // Auto close on mobile after selection
                if (window.innerWidth < 1024) toggleSidebar();
              }}
              className={cn(
                "w-full flex items-center py-3 rounded-xl transition-all duration-200 group",
                isSidebarOpen ? "px-4 gap-3" : "justify-center px-0",
                view === item.id
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
              )}
              title={item.label}
            >
              <item.icon size={20} className={cn(
                "shrink-0 transition-colors",
                view === item.id ? "text-indigo-600 dark:text-indigo-400" : "group-hover:text-slate-900 dark:group-hover:text-slate-100"
              )} />
              {isSidebarOpen && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className={cn("mt-auto p-4 lg:p-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2 shrink-0 flex flex-col gap-2")}>
        <button
          onClick={toggleDark}
          className={cn(
            "w-full btn-secondary",
            isSidebarOpen ? "justify-start px-4" : "justify-center px-0"
          )}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun size={18} className="shrink-0" /> : <Moon size={18} className="shrink-0" />}
          {isSidebarOpen && <span>{darkMode ? 'Light' : 'Dark'} Mode</span>}
        </button>
      </div>
    </aside>
  );
}
