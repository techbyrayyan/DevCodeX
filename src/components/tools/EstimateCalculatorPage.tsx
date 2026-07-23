'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useCallback } from 'react';
import { Plus, Trash2, Download, Calculator, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface EstimateItem {
  id: string;
  category: string;
  description: string;
  qty: number;
  unit: string;
  rate: number;
  markup: number;
}

const CATEGORIES = ['Labor', 'Materials', 'Equipment', 'Subcontract', 'Software', 'Design', 'Travel', 'Other'];
const UNITS = ['hrs', 'days', 'units', 'sq ft', 'linear ft', 'each', 'month', 'project'];

const CURRENCIES: Record<string, { symbol: string; name: string; rate: number }> = {
  USD: { symbol: '$', name: 'USD – US Dollar', rate: 1 },
  PKR: { symbol: '₨', name: 'PKR – Pakistani Rupee', rate: 278.5 },
  EUR: { symbol: '€', name: 'EUR – Euro', rate: 0.92 },
  GBP: { symbol: '£', name: 'GBP – British Pound', rate: 0.79 },
  AED: { symbol: 'د.إ', name: 'AED – UAE Dirham', rate: 3.67 },
};

function uid() { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }

export default function EstimateCalculatorPage() {
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [taxRate, setTaxRate] = useState(10);
  const [contingency, setContingency] = useState(5);
  const [notes, setNotes] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const [items, setItems] = useState<EstimateItem[]>([
    { id: uid(), category: 'Labor', description: '', qty: 1, unit: 'hrs', rate: 0, markup: 0 },
  ]);

  const cur = CURRENCIES[currency];
  const fmt = useCallback((v: number) => `${cur.symbol}${(v * cur.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, [cur]);

  const addItem = (cat?: string) => setItems(p => [...p, { id: uid(), category: cat || 'Other', description: '', qty: 1, unit: 'hrs', rate: 0, markup: 0 }]);
  const removeItem = (id: string) => setItems(p => p.filter(i => i.id !== id));
  const updateItem = (id: string, field: keyof EstimateItem, value: any) => setItems(p => p.map(i => i.id === id ? { ...i, [field]: value } : i));

  const itemTotal = (item: EstimateItem) => item.qty * item.rate * (1 + item.markup / 100);
  const subtotal = items.reduce((s, i) => s + itemTotal(i), 0);
  const contingencyAmt = subtotal * (contingency / 100);
  const taxableAmt = subtotal + contingencyAmt;
  const taxAmt = taxableAmt * (taxRate / 100);
  const grandTotal = taxableAmt + taxAmt;

  // Group by category
  const grouped = CATEGORIES.reduce<Record<string, EstimateItem[]>>((acc, cat) => {
    const catItems = items.filter(i => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});
  const otherItems = items.filter(i => !CATEGORIES.includes(i.category));
  if (otherItems.length > 0) grouped['Other'] = otherItems;

  const catTotal = (cat: string) => (grouped[cat] || []).reduce((s, i) => s + itemTotal(i), 0);

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const el = document.getElementById('estimate-pdf-content');
      if (!el) return;
      const html2pdf = (await import('html2pdf.js' as any)).default as any;
      await html2pdf().set({
        margin: 10,
        filename: `estimate_${projectName || 'project'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(el).save();
    } catch (e) { alert('Failed to generate PDF'); }
    finally { setIsDownloading(false); }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-500/20 rounded-xl text-amber-600 dark:text-amber-400">
                <Calculator size={24} />
              </div>
              Estimate Calculator
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Build detailed project estimates with categories, markup & PDF export.</p>
          </div>
          <button onClick={downloadPDF} disabled={isDownloading} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
            {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {isDownloading ? 'Generating…' : 'Download PDF'}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main */}
          <div className="xl:col-span-2 space-y-4">
            {/* Project Info */}
            <div className="card p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Project Name</label>
                <input className="input-field" placeholder="e.g. Website Redesign" value={projectName} onChange={e => setProjectName(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Client Name</label>
                <input className="input-field" placeholder="e.g. Acme Corp" value={clientName} onChange={e => setClientName(e.target.value)} />
              </div>
            </div>

            {/* Items by Category */}
            {Object.keys(grouped).map(cat => (
              <div key={cat} className="card overflow-hidden">
                <div
                  className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-slate-800/50 cursor-pointer select-none border-b border-slate-100 dark:border-slate-800"
                  onClick={() => setCollapsed(p => ({ ...p, [cat]: !p[cat] }))}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                    <span className="font-semibold text-sm">{cat}</span>
                    <span className="text-xs text-slate-400">({grouped[cat].length} item{grouped[cat].length > 1 ? 's' : ''})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-amber-600 dark:text-amber-400">{fmt(catTotal(cat))}</span>
                    {collapsed[cat] ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                  </div>
                </div>

                {!collapsed[cat] && (
                  <div className="p-4 space-y-3">
                    {grouped[cat].map(item => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700">
                        <div className="col-span-12 sm:col-span-4">
                          <input className="input-field !py-1.5 text-sm" placeholder="Description" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} />
                        </div>
                        <div className="col-span-3 sm:col-span-2">
                          <input type="number" min="0" className="input-field !py-1.5 text-sm text-center" placeholder="Qty" value={item.qty} onChange={e => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="col-span-3 sm:col-span-2">
                          <select className="input-field !py-1.5 text-sm" value={item.unit} onChange={e => updateItem(item.id, 'unit', e.target.value)}>
                            {UNITS.map(u => <option key={u}>{u}</option>)}
                          </select>
                        </div>
                        <div className="col-span-3 sm:col-span-2">
                          <input type="number" min="0" className="input-field !py-1.5 text-sm" placeholder="Rate" value={item.rate} onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="col-span-2 sm:col-span-1 text-right">
                          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{fmt(itemTotal(item))}</span>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <button onClick={() => removeItem(item.id)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addItem(cat)} className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium mt-1">
                      <Plus size={14} /> Add {cat} item
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add Category */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => !grouped[c]).map(cat => (
                <button key={cat} onClick={() => addItem(cat)} className="text-xs px-3 py-1.5 rounded-lg border border-dashed border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors flex items-center gap-1">
                  <Plus size={12} /> {cat}
                </button>
              ))}
            </div>

            {/* Notes */}
            <div className="card p-5">
              <label className="block text-sm font-semibold mb-2">Notes / Terms</label>
              <textarea className="input-field min-h-[80px] resize-none text-sm" placeholder="Payment terms, exclusions, assumptions…" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Settings */}
            <div className="card p-5 space-y-4">
              <h3 className="font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-3">Settings</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Currency</label>
                <select className="input-field" value={currency} onChange={e => setCurrency(e.target.value)}>
                  {Object.entries(CURRENCIES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Tax Rate: <span className="text-amber-600 font-bold">{taxRate}%</span></label>
                <input type="range" min={0} max={30} value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-full accent-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Contingency: <span className="text-amber-600 font-bold">{contingency}%</span></label>
                <input type="range" min={0} max={25} value={contingency} onChange={e => setContingency(Number(e.target.value))} className="w-full accent-amber-500" />
              </div>
            </div>

            {/* Summary */}
            <div className="card p-5 space-y-3">
              <h3 className="font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-3">Summary</h3>
              {Object.keys(grouped).map(cat => (
                <div key={cat} className="flex justify-between text-sm">
                  <span className="text-slate-500">{cat}</span>
                  <span className="font-medium">{fmt(catTotal(cat))}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span><span className="font-medium text-slate-800 dark:text-slate-200">{fmt(subtotal)}</span>
                </div>
                {contingency > 0 && <div className="flex justify-between text-sm text-slate-500">
                  <span>Contingency ({contingency}%)</span><span>{fmt(contingencyAmt)}</span>
                </div>}
                {taxRate > 0 && <div className="flex justify-between text-sm text-slate-500">
                  <span>Tax ({taxRate}%)</span><span>{fmt(taxAmt)}</span>
                </div>}
                <div className="flex justify-between text-base font-bold text-amber-600 dark:text-amber-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                  <span>Grand Total</span><span>{fmt(grandTotal)}</span>
                </div>
              </div>
            </div>

            <button onClick={() => addItem()} className="btn-primary w-full flex items-center justify-center gap-2">
              <Plus size={16} /> Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Hidden PDF */}
      <div className="hidden">
        <div id="estimate-pdf-content" style={{ fontFamily: 'Arial, sans-serif', padding: '40px', backgroundColor: '#fff', color: '#1e293b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '3px solid #f59e0b', paddingBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>PROJECT ESTIMATE</h1>
              <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#64748b' }}>{projectName || 'Project Name'}</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', color: '#64748b' }}>
              <p style={{ margin: '2px 0' }}>Date: {new Date().toLocaleDateString()}</p>
              <p style={{ margin: '2px 0' }}>Client: {clientName || 'N/A'}</p>
              <p style={{ margin: '2px 0' }}>Currency: {currency}</p>
            </div>
          </div>
          {Object.keys(grouped).map(cat => (
            <div key={cat} style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px', textTransform: 'uppercase' }}>{cat}</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fef9c3' }}>
                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #fde68a' }}>Description</th>
                    <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #fde68a' }}>Qty</th>
                    <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #fde68a' }}>Unit</th>
                    <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #fde68a' }}>Rate</th>
                    <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #fde68a' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[cat].map((item, idx) => (
                    <tr key={item.id} style={{ backgroundColor: idx % 2 === 0 ? '#fffbeb' : 'white' }}>
                      <td style={{ padding: '7px 8px', borderBottom: '1px solid #f1f5f9' }}>{item.description || '—'}</td>
                      <td style={{ padding: '7px 8px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>{item.qty}</td>
                      <td style={{ padding: '7px 8px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>{item.unit}</td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', borderBottom: '1px solid #f1f5f9' }}>{fmt(item.rate)}</td>
                      <td style={{ padding: '7px 8px', textAlign: 'right', borderBottom: '1px solid #f1f5f9', fontWeight: 500 }}>{fmt(itemTotal(item))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
            <div style={{ minWidth: '260px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px', color: '#64748b' }}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              {contingency > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px', color: '#64748b' }}><span>Contingency ({contingency}%)</span><span>{fmt(contingencyAmt)}</span></div>}
              {taxRate > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px', color: '#64748b' }}><span>Tax ({taxRate}%)</span><span>{fmt(taxAmt)}</span></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '2px solid #f59e0b', fontWeight: 'bold', fontSize: '16px', color: '#f59e0b' }}><span>Grand Total</span><span>{fmt(grandTotal)}</span></div>
            </div>
          </div>
          {notes && <div style={{ marginTop: '30px', padding: '16px', backgroundColor: '#fef9c3', borderRadius: '8px', fontSize: '12px', color: '#64748b' }}><strong>Notes:</strong><br />{notes}</div>}
        </div>
      </div>
    </DashboardLayout>
  );
}
