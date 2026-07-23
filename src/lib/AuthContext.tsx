'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppView } from '@/types';

interface AuthContextValue {
  view: AppView;
  darkMode: boolean;
  isSidebarOpen: boolean;
  selectedLeadId: string | null;
  goTo: (view: AppView) => void;
  toggleDark: () => void;
  toggleSidebar: () => void;
  openLead: (id: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<AppView>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const openLead = (id: string) => {
    setSelectedLeadId(id);
    setView('lead-detail');
  };

  return (
    <AuthContext.Provider
      value={{
        view,
        darkMode,
        isSidebarOpen,
        selectedLeadId,
        goTo: setView,
        toggleDark: () => setDarkMode(d => !d),
        toggleSidebar: () => setIsSidebarOpen(s => !s),
        openLead,
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
