'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppView } from '@/types';

interface AuthContextValue {
  view: AppView;
  darkMode: boolean;
  isSidebarOpen: boolean;
  selectedLeadId: string | null;
  goTo: (view: AppView) => void;
  goBackToTools: () => void;
  toggleDark: () => void;
  toggleSidebar: () => void;
  openLead: (id: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<AppView>('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Sync with browser history for back/forward navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const initialTool = params.get('tool') as AppView | null;
    if (initialTool) {
      setView(initialTool);
    }

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.view) {
        setView(e.state.view);
      } else {
        const searchParams = new URLSearchParams(window.location.search);
        const toolParam = searchParams.get('tool') as AppView | null;
        if (toolParam) {
          setView(toolParam);
        } else {
          setView('dashboard');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const goTo = (newView: AppView) => {
    setView(newView);
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      if (newView === 'dashboard') {
        currentUrl.searchParams.delete('tool');
      } else {
        currentUrl.searchParams.set('tool', newView);
      }

      if (window.history.state?.view !== newView) {
        window.history.pushState({ view: newView }, '', currentUrl.toString());
      }
    }
  };

  const goBackToTools = () => {
    if (typeof window !== 'undefined' && window.history.state?.view && window.history.state.view !== 'dashboard') {
      window.history.back();
    } else {
      goTo('dashboard');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        view,
        darkMode,
        isSidebarOpen,
        selectedLeadId,
        goTo,
        goBackToTools,
        toggleDark: () => setDarkMode(d => !d),
        toggleSidebar: () => setIsSidebarOpen(s => !s),
        openLead: (id: string) => {
          setSelectedLeadId(id);
          goTo('lead-detail');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

