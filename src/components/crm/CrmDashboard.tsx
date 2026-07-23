'use client';
import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import {
  Users, TrendingUp, DollarSign, Zap, Star, Search, Filter, RefreshCw,
  Target, Clock, Calendar, ChevronDown, Trash2, Eye, MoreVertical, X,
  ArrowUpRight, BarChart3, Mail, Phone, Building2, Briefcase, CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

type LeadStatus = 'Hot' | 'Warm' | 'Cold' | 'New' | 'Qualified' | 'Proposal Sent';

interface Lead {
  _id: string;
  name?: string;
  email?: string;
  companyName?: string;
  businessType?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  leadScore: number;
  status: LeadStatus;
  conversations: any[];
  createdAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; dot: string; bg: string }> = {
  Hot:            { label: 'Hot',           color: 'text-rose-600 dark:text-rose-400',    dot: 'bg-rose-500',    bg: 'bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/20' },
  Warm:           { label: 'Warm',          color: 'text-amber-600 dark:text-amber-400',  dot: 'bg-amber-500',   bg: 'bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20' },
  Cold:           { label: 'Cold',          color: 'text-blue-600 dark:text-blue-400',    dot: 'bg-blue-500',    bg: 'bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20' },
  New:            { label: 'New',           color: 'text-slate-600 dark:text-slate-400',  dot: 'bg-slate-400',   bg: 'bg-slate-50 border-slate-200 dark:bg-slate-500/10 dark:border-slate-500/20' },
  Qualified:      { label: 'Qualified',     color: 'text-violet-600 dark:text-violet-400',dot: 'bg-violet-500',  bg: 'bg-violet-50 border-violet-200 dark:bg-violet-500/10 dark:border-violet-500/20' },
  'Proposal Sent':{ label: 'Proposal Sent', color: 'text-emerald-600 dark:text-emerald-400',dot:'bg-emerald-500',bg: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20' },
};

const ALL_STATUSES: LeadStatus[] = ['New', 'Cold', 'Warm', 'Hot', 'Qualified', 'Proposal Sent'];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-rose-500' : score >= 50 ? 'text-amber-500' : score >= 25 ? 'text-blue-500' : 'text-slate-400';
  const ring  = score >= 80 ? 'border-rose-300' : score >= 50 ? 'border-amber-300' : score >= 25 ? 'border-blue-300' : 'border-slate-200';
  return (
    <div className={`w-10 h-10 rounded-full border-2 ${ring} flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm`}>
      <span className={`text-xs font-bold ${color}`}>{score}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function CrmDashboard() {
  const { openLead } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) setLeads(data.leads);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead permanently?')) return;
    setDeletingId(id);
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      setLeads(prev => prev.filter(l => l._id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    setUpdatingId(id);
    setOpenMenuId(null);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  // Stats
  const totalLeads   = leads.length;
  const hotLeads     = leads.filter(l => l.status === 'Hot').length;
  const avgScore     = Math.round(leads.reduce((a, c) => a + c.leadScore, 0) / (leads.length || 1));
  const qualifiedLeads = leads.filter(l => l.status === 'Qualified' || l.status === 'Proposal Sent').length;

  const filtered = leads.filter(l => {
    const matchSearch =
      (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.projectType || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.companyName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <Target className="text-indigo-600 shrink-0" size={28} />
              CRM &amp; Lead Pipeline
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              AI-qualified leads from your consultant widget · real-time from MongoDB
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >Table</button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'kanban' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >Kanban</button>
            </div>
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Leads',   val: totalLeads,    icon: Users,        color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
            { label: 'Hot Leads',     val: hotLeads,      icon: Zap,          color: 'text-rose-600',   bg: 'bg-rose-50 dark:bg-rose-500/10' },
            { label: 'Avg AI Score',  val: avgScore,      icon: BarChart3,    color: 'text-amber-600',  bg: 'bg-amber-50 dark:bg-amber-500/10' },
            { label: 'In Pipeline',   val: qualifiedLeads,icon: CheckCircle2, color: 'text-emerald-600',bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.bg} ${s.color} shrink-0`}>
                <s.icon size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, project..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['All', ...ALL_STATUSES] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                  statusFilter === s
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-400'
                }`}
              >
                {s}{s !== 'All' && ` (${leads.filter(l => l.status === s).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-16 text-center">
            <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Fetching leads from database...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-16 text-center">
            <Users size={40} className="mx-auto mb-3 text-slate-300" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No leads found</h3>
            <p className="text-slate-500 text-sm">
              {searchTerm || statusFilter !== 'All' ? 'Try adjusting your filters.' : 'Your AI consultant is ready to capture new leads.'}
            </p>
          </div>
        ) : viewMode === 'table' ? (
          <TableView
            leads={filtered}
            updatingId={updatingId}
            deletingId={deletingId}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
            onView={openLead}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <KanbanView leads={filtered} onView={openLead} onStatusChange={handleStatusChange} />
        )}
      </div>
    </DashboardLayout>
  );
}

/* ═══════════════════════════════════════════
   TABLE VIEW
═══════════════════════════════════════════ */
function TableView({ leads, updatingId, deletingId, openMenuId, setOpenMenuId, onView, onDelete, onStatusChange }: {
  leads: Lead[];
  updatingId: string | null;
  deletingId: string | null;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
              {['Lead / Contact', 'Project & Budget', 'AI Score', 'Status', 'Conversations', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {leads.map(lead => (
              <tr
                key={lead._id}
                className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
              >
                {/* Lead */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm shrink-0">
                      {(lead.name || 'A')[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{lead.name || 'Anonymous'}</p>
                      {lead.email && <p className="text-xs text-slate-500 flex items-center gap-1"><Mail size={10} />{lead.email}</p>}
                      {lead.companyName && <p className="text-xs text-slate-400 flex items-center gap-1"><Building2 size={10} />{lead.companyName}</p>}
                    </div>
                  </div>
                </td>

                {/* Project */}
                <td className="px-4 py-3.5">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{lead.projectType || '—'}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {lead.budget && <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">{lead.budget}</span>}
                    {lead.timeline && <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 flex items-center gap-0.5"><Clock size={9}/>{lead.timeline}</span>}
                  </div>
                </td>

                {/* Score */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <ScoreBadge score={lead.leadScore} />
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} className={i < Math.ceil(lead.leadScore / 20) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'} />
                      ))}
                    </div>
                  </div>
                </td>

                {/* Status - clickable dropdown */}
                <td className="px-4 py-3.5">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === `status-${lead._id}` ? null : `status-${lead._id}`)}
                      disabled={updatingId === lead._id}
                      className="flex items-center gap-1 group"
                    >
                      <StatusBadge status={lead.status} />
                      <ChevronDown size={12} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </button>
                    {openMenuId === `status-${lead._id}` && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute z-20 top-full left-0 mt-1 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
                          {ALL_STATUSES.map(s => (
                            <button
                              key={s}
                              onClick={() => onStatusChange(lead._id, s)}
                              className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 ${lead.status === s ? 'text-indigo-600' : 'text-slate-700 dark:text-slate-300'}`}
                            >
                              <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[s].dot}`} />
                              {s}
                              {lead.status === s && <CheckCircle2 size={12} className="ml-auto text-indigo-600" />}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </td>

                {/* Conversations */}
                <td className="px-4 py-3.5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {lead.conversations?.length || 0}
                    <span className="text-xs text-slate-400 font-normal ml-1">msgs</span>
                  </span>
                </td>

                {/* Date */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar size={12} />
                    {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => onView(lead._id)}
                      className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(lead._id)}
                      disabled={deletingId === lead._id}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors disabled:opacity-40"
                      title="Delete Lead"
                    >
                      {deletingId === lead._id ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-xs text-slate-500">
        Showing {leads.length} lead{leads.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   KANBAN VIEW
═══════════════════════════════════════════ */
function KanbanView({ leads, onView, onStatusChange }: {
  leads: Lead[];
  onView: (id: string) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
}) {
  const COLUMNS: LeadStatus[] = ['New', 'Cold', 'Warm', 'Hot', 'Qualified', 'Proposal Sent'];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map(col => {
        const colLeads = leads.filter(l => l.status === col);
        const cfg = STATUS_CONFIG[col];
        return (
          <div key={col} className="min-w-[240px] max-w-[240px] flex flex-col gap-3">
            {/* Column header */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 sticky top-0 shadow-sm">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{col}</span>
              </div>
              <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 w-5 h-5 rounded-full flex items-center justify-center">
                {colLeads.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2">
              {colLeads.length === 0 ? (
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center text-xs text-slate-400">
                  No leads
                </div>
              ) : colLeads.map(lead => (
                <div
                  key={lead._id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                  onClick={() => onView(lead._id)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">
                        {(lead.name || 'A')[0].toUpperCase()}
                      </div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{lead.name || 'Anonymous'}</p>
                    </div>
                    <ScoreBadge score={lead.leadScore} />
                  </div>

                  {lead.projectType && (
                    <div className="flex items-center gap-1 mb-1">
                      <Briefcase size={10} className="text-slate-400 shrink-0" />
                      <span className="text-xs text-slate-500 truncate">{lead.projectType}</span>
                    </div>
                  )}
                  {lead.budget && (
                    <div className="flex items-center gap-1 mb-2">
                      <DollarSign size={10} className="text-slate-400 shrink-0" />
                      <span className="text-xs text-slate-500">{lead.budget}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); onView(lead._id); }}
                      className="text-indigo-500 hover:text-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
