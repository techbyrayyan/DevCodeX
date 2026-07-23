'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Download, Save, CheckCircle2, DollarSign } from 'lucide-react';

interface QuoteItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

const CURRENCIES: Record<string, { symbol: string; name: string; rate: number }> = {
  USD: { symbol: '$',  name: 'USD – US Dollar',     rate: 1 },
  PKR: { symbol: '₨', name: 'PKR – Pakistani Rupee', rate: 278.5 },
  EUR: { symbol: '€', name: 'EUR – Euro',            rate: 0.92 },
  GBP: { symbol: '£', name: 'GBP – British Pound',  rate: 0.79 },
  AED: { symbol: 'د.إ', name: 'AED – UAE Dirham',   rate: 3.67 },
  SAR: { symbol: '﷼',  name: 'SAR – Saudi Riyal',   rate: 3.75 },
  CAD: { symbol: 'C$', name: 'CAD – Canadian Dollar', rate: 1.36 },
  AUD: { symbol: 'A$', name: 'AUD – Australian Dollar', rate: 1.53 },
  INR: { symbol: '₹',  name: 'INR – Indian Rupee',  rate: 83.5 },
  JPY: { symbol: '¥',  name: 'JPY – Japanese Yen',  rate: 149.5 },
};

export default function QuotationsPage() {
  const [companyName, setCompanyName] = useState('');
  const [companyDetails, setCompanyDetails] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientDetails, setClientDetails] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [taxRate, setTaxRate] = useState(10);

  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', name: '', qty: 1, price: 0 }
  ]);

  const [savedQuotes, setSavedQuotes] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quotations_history');
    if (saved) {
      try {
        setSavedQuotes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history');
      }
    }
  }, []);

  const fmt = useCallback(
    (amount: number) => {
      const c = CURRENCIES[currency];
      return `${c.symbol}${(amount * c.rate).toFixed(2)}`;
    },
    [currency],
  );

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), name: '', qty: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const tax = subtotal * (taxRate / 100);
  const grandTotal = subtotal + tax;

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById('quotation-pdf-content');
      if (!element) return;
      const html2pdf = (await import('html2pdf.js' as any)).default as any;
      const opt = {
        margin: 12,
        filename: `quotation_${clientName || 'client'}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const saveQuotation = async () => {
    setIsSaving(true);
    try {
      const payload = {
        _id: Date.now().toString(),
        name: `${clientName || 'Client'} Quotation`,
        companyName,
        companyDetails,
        clientName,
        clientDetails,
        items,
        subtotal,
        tax,
        grandTotal,
        currency,
        createdAt: new Date().toISOString()
      };

      const newHistory = [payload, ...savedQuotes];
      setSavedQuotes(newHistory);
      localStorage.setItem('quotations_history', JSON.stringify(newHistory));

      // Reset form
      setClientName('');
      setClientDetails('');
      setItems([{ id: Date.now().toString(), name: '', qty: 1, price: 0 }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteQuotation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = savedQuotes.filter(q => q._id !== id);
    setSavedQuotes(newHistory);
    localStorage.setItem('quotations_history', JSON.stringify(newHistory));
  };

  const cur = CURRENCIES[currency];

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Quotation Maker</h1>
          <p className="text-slate-500 text-sm">Create, download, and manage your quotes efficiently.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={saveQuotation} disabled={isSaving} className="btn-secondary flex-1 sm:flex-none">
            {isSaving ? 'Saving...' : <><Save size={18} /> Save to Project</>}
          </button>
          <button onClick={downloadPDF} disabled={isDownloading} className="btn-primary flex-1 sm:flex-none">
            {isDownloading ? 'Generating...' : <><Download size={18} /> Download PDF</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">

          {/* Company & Client Info */}
          <div className="card p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3">Company Info</h3>
              <input
                type="text"
                className="input-field mb-3"
                placeholder="Your Company Name"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />
              <textarea
                className="input-field min-h-[100px] resize-none"
                placeholder="Company Address & Contact"
                value={companyDetails}
                onChange={e => setCompanyDetails(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3">Client Info</h3>
              <input
                type="text"
                className="input-field mb-3"
                placeholder="Client Name"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
              />
              <textarea
                className="input-field min-h-[100px] resize-none"
                placeholder="Client Address & Contact"
                value={clientDetails}
                onChange={e => setClientDetails(e.target.value)}
              />
            </div>
          </div>

          {/* Currency & Tax Settings */}
          <div className="card p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-900/10">
            <DollarSign size={20} className="text-indigo-500 shrink-0" />
            <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Currency</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="input-field w-full"
                >
                  {Object.entries(CURRENCIES).map(([code, c]) => (
                    <option key={code} value={code}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-40">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Tax Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="input-field w-full"
                  value={taxRate}
                  onChange={e => setTaxRate(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
              Rate: 1 USD = {cur.rate} {currency}
            </div>
          </div>

          {/* Items Table */}
          <div className="card p-6 border-t-4 border-t-indigo-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Quotation Items</h3>
              <button onClick={addItem} className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 text-sm bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg transition-colors">
                <Plus size={16} /> Add Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 text-sm">
                    <th className="pb-3 font-medium w-[45%]">Item Description</th>
                    <th className="pb-3 font-medium w-[15%]">Qty</th>
                    <th className="pb-3 font-medium w-[20%]">Price (USD)</th>
                    <th className="pb-3 font-medium w-[15%] text-right">Total ({currency})</th>
                    <th className="pb-3 font-medium w-[5%] text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 pr-2">
                        <input
                          type="text"
                          className="input-field !py-2 !rounded-md"
                          placeholder="Item name"
                          value={item.name}
                          onChange={e => updateItem(item.id, 'name', e.target.value)}
                        />
                      </td>
                      <td className="py-3 pr-2">
                        <input
                          type="number"
                          min="1"
                          className="input-field !py-2 !rounded-md text-center"
                          value={item.qty}
                          onChange={e => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                        />
                      </td>
                      <td className="py-3 pr-2">
                        <input
                          type="number"
                          min="0"
                          className="input-field !py-2 !rounded-md"
                          value={item.price}
                          onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td className="py-3 font-medium text-right pr-2">
                        {fmt(item.qty * item.price)}
                      </td>
                      <td className="py-3 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className="text-rose-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-8 border-t border-slate-200 dark:border-slate-800 pt-6">
              <div className="w-full max-w-sm space-y-4">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax ({taxRate}%)</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{fmt(tax)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-indigo-600 dark:text-indigo-400 border-t border-slate-200 dark:border-slate-800 pt-4">
                  <span>Grand Total ({currency})</span>
                  <span>{fmt(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* CEO Signature Section */}
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <div className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ceo-signature.png"
                  alt="CEO Signature"
                  className="h-24 object-contain mx-auto mb-1"
                />
                <div className="border-t border-slate-400 dark:border-slate-500 pt-2 text-xs text-slate-500 dark:text-slate-400 w-44 text-center">
                  Authorised Signatory<br />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">CEO, DevCodeX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Quotes Sidebar */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" />
              Saved Quotes
            </h3>
            <div className="space-y-4 h-[400px] overflow-y-auto pr-2 smooth-scroll">
              {savedQuotes.map(quote => (
                <div key={quote._id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{quote.name || 'Untitled'}</h4>
                    <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {new Date(quote.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <p className="text-xs text-slate-500 line-clamp-1">{quote.clientDetails || 'No address'}</p>
                      {quote.currency && quote.currency !== 'USD' && (
                        <p className="text-xs text-slate-400 mt-1">{quote.currency} selected</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {CURRENCIES[quote.currency || 'USD']?.symbol || '$'}{((quote.grandTotal || 0) * (CURRENCIES[quote.currency || 'USD']?.rate || 1)).toFixed(2)}
                      </p>
                      <button 
                        onClick={(e) => deleteQuotation(quote._id, e)}
                        className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        title="Delete quotation"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {savedQuotes.length === 0 && (
                <div className="text-center text-slate-400 p-6 border border-dashed rounded-xl border-slate-300 dark:border-slate-700">
                  No saved quotations in your project yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden PDF Content */}
      <div className="hidden">
        <div id="quotation-pdf-content" className="bg-white p-10 font-sans text-slate-800" style={{ minWidth: '700px' }}>
          {/* Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-200">
            <div>
              <img src="/logo1.png" alt="Logo" style={{ height: '50px', objectFit: 'contain', marginBottom: '8px' }} />
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#4f46e5', margin: 0 }}>QUOTATION</h1>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', color: '#64748b' }}>
              <p style={{ margin: '2px 0' }}>Date: {new Date().toLocaleDateString()}</p>
              <p style={{ margin: '2px 0' }}>Currency: {currency}</p>
            </div>
          </div>

          {/* From / To */}
          <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>From</p>
              <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px' }}>{companyName || 'N/A'}</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0, whiteSpace: 'pre-wrap' }}>{companyDetails || ''}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>To</p>
              <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px' }}>{clientName || 'N/A'}</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0, whiteSpace: 'pre-wrap' }}>{clientDetails || ''}</p>
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#4f46e5', color: 'white' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Item Description</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600 }}>Qty</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>Unit Price (USD)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>Total ({currency})</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} style={{ backgroundColor: idx % 2 === 0 ? '#f8f8ff' : 'white' }}>
                  <td style={{ padding: '9px 12px', borderBottom: '1px solid #e2e8f0' }}>{item.name || '—'}</td>
                  <td style={{ padding: '9px 12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>{item.qty}</td>
                  <td style={{ padding: '9px 12px', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>${item.price.toFixed(2)}</td>
                  <td style={{ padding: '9px 12px', textAlign: 'right', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>{fmt(item.qty * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
            <div style={{ minWidth: '240px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px', color: '#64748b' }}>
                <span>Subtotal</span><span>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px', color: '#64748b' }}>
                <span>Tax ({taxRate}%)</span><span>{fmt(tax)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '2px solid #4f46e5', marginTop: '8px', fontSize: '16px', fontWeight: 'bold', color: '#4f46e5' }}>
                <span>Grand Total ({currency})</span><span>{fmt(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <img src="/ceo-signature.png" alt="Signature" style={{ height: '80px', objectFit: 'contain', display: 'block', margin: '0 auto 4px' }} />
              <div style={{ borderTop: '1px solid #94a3b8', paddingTop: '6px', fontSize: '11px', color: '#64748b' }}>
                Authorised Signatory<br />
                <strong style={{ color: '#334155' }}>CEO, DevCodeX</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}