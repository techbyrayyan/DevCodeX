'use client';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { toggleSidebar, isSidebarOpen } = useAuth();
  
  return (
    <div className="flex h-[calc(100vh-81px)] bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <img 
              src="/real1.png" 
              alt="DevCodeX" 
              className="h-8 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center text-white font-bold text-sm shadow-md">
                DX
              </div>
              <span className="font-bold bg-clip-text text-transparent bg-primary-gradient">DevCodeX</span>
            </div>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 p-4 lg:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
