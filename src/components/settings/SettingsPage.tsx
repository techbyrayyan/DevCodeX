'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useEffect } from 'react';
import { 
  Building2, 
  CreditCard, 
  Sparkles, 
  Database, 
  CheckCircle, 
  AlertTriangle,
  Save,
  RotateCcw,
  Globe,
  Mail,
  User,
  Sliders,
  DollarSign
} from 'lucide-react';

interface CompanyProfile {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  country: string;
}

interface InvoiceDefaults {
  currency: string;
  currencySymbol: string;
  taxRate: number;
  invoicePrefix: string;
  paymentTerms: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'invoice' | 'ai' | 'database'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showStatus, setShowStatus] = useState<string | null>(null);

  // Form states
  const [profile, setProfile] = useState<CompanyProfile>({
    name: 'DevCodex',
    email: 'devcodex.agency@gmail.com',
    phone: '+923238418438',
    website: 'https://devcodex.agency',
    address: 'Suite 404, Tech Park, Karachi, Pakistan',
    country: 'Pakistan',
  });

  const [invoiceDefaults, setInvoiceDefaults] = useState<InvoiceDefaults>({
    currency: 'USD',
    currencySymbol: '$',
    taxRate: 5,
    invoicePrefix: 'DX-INV-',
    paymentTerms: 'Due on Receipt',
  });

  const [customApiKey, setCustomApiKey] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  // Load from localstorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('dx_settings_profile');
    const savedInvoices = localStorage.getItem('dx_settings_invoices');
    const savedApiKey = localStorage.getItem('dx_settings_api_key');

    if (savedProfile) {
      try { setProfile(JSON.parse(savedProfile)); } catch(_) {}
    }
    if (savedInvoices) {
      try { setInvoiceDefaults(JSON.parse(savedInvoices)); } catch(_) {}
    }
    if (savedApiKey) {
      setCustomApiKey(savedApiKey);
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setShowStatus(null);

    setTimeout(() => {
      // Save all states
      localStorage.setItem('dx_settings_profile', JSON.stringify(profile));
      localStorage.setItem('dx_settings_invoices', JSON.stringify(invoiceDefaults));
      if (customApiKey) {
        localStorage.setItem('dx_settings_api_key', customApiKey);
      } else {
        localStorage.removeItem('dx_settings_api_key');
      }

      setIsSaving(false);
      setShowStatus('Settings saved successfully!');
      setTimeout(() => setShowStatus(null), 3000);
    }, 1000);
  };

  const handleResetWorkspace = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }

    // Clear main workspace items
    localStorage.removeItem('ib_invoices');
    localStorage.removeItem('ib_clients');
    localStorage.removeItem('ib_expenses');
    
    setResetMessage('Workspace database cleared. Reloading page...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const currencyList = [
    { code: 'USD', symbol: '$', label: 'US Dollar ($)' },
    { code: 'PKR', symbol: 'Rs', label: 'Pakistani Rupee (Rs)' },
    { code: 'EUR', symbol: '€', label: 'Euro (€)' },
    { code: 'GBP', symbol: '£', label: 'British Pound (£)' },
    { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham (د.إ)' },
    { code: 'SAR', symbol: 'ر.س', label: 'Saudi Riyal (ر.س)' },
    { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar (C$)' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sliders className="text-indigo-500" />
              Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Configure your business details, default invoice styles, and AI settings.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3"
          >
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {/* Global Saved Toast */}
        {showStatus && (
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-500/20 shadow-md">
            <CheckCircle size={18} />
            <p className="text-sm font-semibold">{showStatus}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          
          {/* Settings Tabs Sidebar */}
          <div className="card p-3 flex flex-col gap-1.5 h-fit">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Building2 size={18} />
              Company Profile
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'invoice'
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <CreditCard size={18} />
              Invoice Defaults
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles size={18} />
              Gemini AI Settings
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'database'
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Database size={18} />
              System Databases
            </button>
          </div>

          {/* Settings Tab Content */}
          <div className="card p-6 min-h-[400px]">
            
            {/* 1. PROFILE SECTION */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold">Company Profile</h3>
                  <p className="text-slate-400 text-xs mt-1">This details will serve as the sender details on invoices, quotations and generated business letters.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Company Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value={profile.name}
                      onChange={e => setProfile({ ...profile, name: e.target.value })}
                      placeholder="e.g. Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Business Email</label>
                    <input
                      type="email"
                      className="input-field"
                      value={profile.email}
                      onChange={e => setProfile({ ...profile, email: e.target.value })}
                      placeholder="billing@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      className="input-field"
                      value={profile.phone}
                      onChange={e => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+92 323 1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Website URL</label>
                    <input
                      type="text"
                      className="input-field"
                      value={profile.website}
                      onChange={e => setProfile({ ...profile, website: e.target.value })}
                      placeholder="https://company.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Company Address</label>
                    <textarea
                      rows={3}
                      className="input-field resize-none"
                      value={profile.address}
                      onChange={e => setProfile({ ...profile, address: e.target.value })}
                      placeholder="123 Corporate Blvd, Ste 100..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Country</label>
                    <input
                      type="text"
                      className="input-field"
                      value={profile.country}
                      onChange={e => setProfile({ ...profile, country: e.target.value })}
                      placeholder="e.g. Pakistan"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. INVOICE SECTION */}
            {activeTab === 'invoice' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold">Invoice & Billing Preferences</h3>
                  <p className="text-slate-400 text-xs mt-1">Configure default behaviors, tax models, and prefixes for your billing documents.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Workspace Currency</label>
                    <select
                      className="input-field"
                      value={invoiceDefaults.currency}
                      onChange={e => {
                        const code = e.target.value;
                        const match = currencyList.find(c => c.code === code);
                        setInvoiceDefaults({
                          ...invoiceDefaults,
                          currency: code,
                          currencySymbol: match ? match.symbol : '$'
                        });
                      }}
                    >
                      {currencyList.map(curr => (
                        <option key={curr.code} value={curr.code}>{curr.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Default Tax Rate (%)</label>
                    <input
                      type="number"
                      className="input-field"
                      min={0}
                      max={100}
                      value={invoiceDefaults.taxRate}
                      onChange={e => setInvoiceDefaults({ ...invoiceDefaults, taxRate: Math.max(0, parseFloat(e.target.value) || 0) })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Invoice ID Prefix</label>
                    <input
                      type="text"
                      className="input-field"
                      value={invoiceDefaults.invoicePrefix}
                      onChange={e => setInvoiceDefaults({ ...invoiceDefaults, invoicePrefix: e.target.value })}
                      placeholder="e.g. INV-"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Payment Due Terms</label>
                    <select
                      className="input-field"
                      value={invoiceDefaults.paymentTerms}
                      onChange={e => setInvoiceDefaults({ ...invoiceDefaults, paymentTerms: e.target.value })}
                    >
                      <option value="Due on Receipt">Due on Receipt</option>
                      <option value="Net 15">Net 15 Days</option>
                      <option value="Net 30">Net 30 Days</option>
                      <option value="Net 45">Net 45 Days</option>
                      <option value="Net 60">Net 60 Days</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 3. AI CONFIG SECTION */}
            {activeTab === 'ai' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold">Gemini AI Engine</h3>
                  <p className="text-slate-400 text-xs mt-1">DevCodeX ships with a developer-backed default key. You can substitute your personal API Key below to escape global suite limits.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl flex items-start gap-3">
                    <Sparkles className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-indigo-400">Default Server Key is ACTIVE</p>
                      <p className="text-slate-400 leading-relaxed">No key is required to use AI features. We supply high-speed Gemini Flash endpoints natively. Providing your own key will run generations directly in your workspace scope.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Custom Gemini API Key</label>
                    <input
                      type="password"
                      className="input-field font-mono text-sm tracking-widest"
                      value={customApiKey}
                      onChange={e => setCustomApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                    />
                    <p className="text-[11px] text-slate-500 mt-1.5">Saved locally in your browser cache. Never submitted to our servers.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. DATABASE CLEANING */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold">System Database Maintenance</h3>
                  <p className="text-slate-400 text-xs mt-1">Erase client lists, invoices, and expense sheets stored locally in your browser storage.</p>
                </div>

                <div className="border border-rose-500/20 bg-rose-500/5 p-5 rounded-2xl space-y-4">
                  <div className="flex items-start gap-3 text-rose-500">
                    <AlertTriangle className="shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-sm">Dangerous Area: Data Wiping</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        This action will permanently delete all local invoices, active leads, client profiles, and expense ledger items from this browser cache. This action CANNOT be reversed.
                      </p>
                    </div>
                  </div>

                  {resetMessage && (
                    <div className="bg-amber-500/10 text-amber-500 text-xs px-3 py-2 rounded-lg font-medium border border-amber-500/20">
                      {resetMessage}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleResetWorkspace}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        confirmReset 
                          ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30' 
                          : 'bg-rose-500/10 hover:bg-rose-500/25 text-rose-500'
                      }`}
                    >
                      {confirmReset ? 'Confirm Full Wiping' : 'Wipe Clean Local Database'}
                    </button>
                    {confirmReset && (
                      <button
                        onClick={() => setConfirmReset(false)}
                        className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}