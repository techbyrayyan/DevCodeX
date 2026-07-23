'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Trash2, FileText, CheckCircle2, MessageSquare, Link2, ExternalLink, Search, FolderOpen, Calendar, ArrowRight } from 'lucide-react';

interface ProjectItem {
  id: string;
  type: 'Proposal' | 'Quotation' | 'Caption' | 'Slug' | 'Invoice';
  title: string;
  date: string;
  localStorageKey: string;
  icon: any;
  color: string;
  bg: string;
  route: string;
}

export default function ProjectsPage() {
  const { goTo } = useAuth();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const items: ProjectItem[] = [];
    
    try {
      const proposals = JSON.parse(localStorage.getItem('proposal_history') || '[]');
      proposals.forEach((p: any) => items.push({ id: p._id, type: 'Proposal', title: p.name || 'Untitled Proposal', date: p.createdAt, localStorageKey: 'proposal_history', icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-500/10', route: 'ai-proposals' }));
    } catch (e) {}

    try {
      const quotes = JSON.parse(localStorage.getItem('quotations_history') || '[]');
      quotes.forEach((q: any) => items.push({ id: q._id, type: 'Quotation', title: q.clientName || 'Untitled Quotation', date: q.createdAt, localStorageKey: 'quotations_history', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10', route: 'quotations' }));
    } catch (e) {}

    try {
      const captions = JSON.parse(localStorage.getItem('captions_history') || '[]');
      captions.forEach((c: any) => items.push({ id: c.id, type: 'Caption', title: c.topic || 'Social Caption', date: c.date, localStorageKey: 'captions_history', icon: MessageSquare, color: 'text-pink-500', bg: 'bg-pink-500/10', route: 'ai-social-caption' }));
    } catch (e) {}

    try {
      const slugs = JSON.parse(localStorage.getItem('slugHistory') || '[]');
      slugs.forEach((s: any) => items.push({ id: s.id, type: 'Slug', title: s.title || 'URL Slug', date: s.date, localStorageKey: 'slugHistory', icon: Link2, color: 'text-cyan-500', bg: 'bg-cyan-500/10', route: 'slug-generator' }));
    } catch (e) {}

    try {
      const invoices = JSON.parse(localStorage.getItem('ib_invoices') || '[]');
      invoices.forEach((inv: any) => items.push({ id: inv.id, type: 'Invoice', title: inv.invoiceNumber || 'Invoice', date: inv.date, localStorageKey: 'ib_invoices', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', route: 'invoices' }));
    } catch (e) {}

    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setProjects(items);
  };

  const handleDelete = (item: ProjectItem) => {
    if (!confirm(`Are you sure you want to delete this ${item.type}?`)) return;
    try {
      const raw = localStorage.getItem(item.localStorageKey) || '[]';
      let data = JSON.parse(raw);
      data = data.filter((x: any) => x._id !== item.id && x.id !== item.id);
      localStorage.setItem(item.localStorageKey, JSON.stringify(data));
      loadProjects(); 
    } catch (e) {
      console.error('Error deleting item', e);
    }
  };

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.type.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Central Hub</h1>
          <p className="text-slate-500 mt-1">Manage all your generated proposals, invoices, and tools in one place.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none text-sm shadow-sm"
          />
        </div>
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item) => (
            <div key={`${item.localStorageKey}-${item.id}`} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${item.bg} ${item.color}`}>
                    {item.type}
                  </span>
                  <button 
                    onClick={() => handleDelete(item)} 
                    className="text-slate-400 hover:text-rose-500 p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" title={item.title}>
                {item.title}
              </h3>
              
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-6">
                <Calendar size={14} />
                <span>{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
                <button
                  onClick={() => goTo(item.route as Parameters<typeof goTo>[0])}
                  className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 py-2.5 rounded-xl transition-colors"
                >
                  <ExternalLink size={16} />
                  Open in Tool
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20">
          <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mb-6">
            <FolderOpen size={32} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No Projects Found</h2>
          <p className="text-slate-500 text-center max-w-md mb-8">
            {searchQuery ? "No projects match your search query." : "You haven't created any items yet. Start using the tools to generate proposals, invoices, and more!"}
          </p>
          {!searchQuery && (
            <button onClick={() => goTo('dashboard')} className="btn-primary flex items-center gap-2">
              Explore Tools <ArrowRight size={18} />
            </button>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}