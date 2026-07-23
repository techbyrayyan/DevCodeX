'use client';
import { useState, useCallback } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { useStore } from '@/lib/useStore';
import { useAuth } from '@/lib/AuthContext';
import { Plus, Trash2, Save, ArrowLeft, User, Calendar, ChevronDown, Check, DollarSign } from 'lucide-react';
import { InvoiceItem, Invoice } from '@/types';

const CURRENCIES: Record<string, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: '$',   rate: 1,     name: 'USD – US Dollar' },
  PKR: { symbol: '₨',  rate: 278.5, name: 'PKR – Pakistani Rupee' },
  EUR: { symbol: '€',  rate: 0.92,  name: 'EUR – Euro' },
  GBP: { symbol: '£',  rate: 0.79,  name: 'GBP – British Pound' },
  AED: { symbol: 'د.إ',rate: 3.67,  name: 'AED – UAE Dirham' },
  SAR: { symbol: '﷼',  rate: 3.75,  name: 'SAR – Saudi Riyal' },
  CAD: { symbol: 'C$', rate: 1.36,  name: 'CAD – Canadian Dollar' },
  AUD: { symbol: 'A$', rate: 1.53,  name: 'AUD – Australian Dollar' },
  INR: { symbol: '₹',  rate: 83.5,  name: 'INR – Indian Rupee' },
  JPY: { symbol: '¥',  rate: 149.5, name: 'JPY – Japanese Yen' },
};

export default function InvoiceCreatePage() {
  const { clients, addInvoice } = useStore();
  const { goTo } = useAuth();

  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', name: '', description: '', qty: 1, price: 0 }
  ]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const fmt = useCallback(
    (amount: number) => {
      const c = CURRENCIES[currency];
      return `${c.symbol}${(amount * c.rate).toFixed(2)}`;
    },
    [currency],
  );

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substr(2, 9), name: '', description: '', qty: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxAmount = (subtotal * tax) / 100;
  const total = subtotal + taxAmount - discount;

  const handleCreate = () => {
    const newInvoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      invoiceNumber,
      clientId: 'manual-entry',
      clientName: 'Manual Entry',
      issueDate,
      dueDate,
      items,
      tax,
      discount,
      total,
      status: 'pending'
    };
    addInvoice(newInvoice);
    goTo('invoices');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => goTo('invoices')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">New Invoice</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-5 md:p-8">
              {/* Invoice Header: Company + Number */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary-gradient flex items-center justify-center text-white font-bold text-lg shrink-0">
                    D
                  </div>
                  <div>
                    <h2 className="font-bold text-base leading-none mb-1">DevCodeX</h2>
                    <p className="text-sm text-slate-400">billing@devcodex.io</p>
                  </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Invoice Number</span>
                  <input
                    className="font-bold text-lg bg-transparent outline-none border-b border-transparent focus:border-indigo-500 w-full sm:w-auto sm:text-right"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Items — mobile: stacked cards, desktop: table */}
              <div className="space-y-4">
                {/* Desktop header */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-3 text-xs font-bold text-slate-400 uppercase px-3">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {items.map((item, idx) => (
                  <div key={item.id} className="group">
                    {/* Mobile card layout */}
                    <div className="sm:hidden bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3 border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Item {idx + 1}</span>
                        {items.length > 1 && (
                          <button onClick={() => removeItem(item.id)} className="text-rose-400 hover:text-rose-600">
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                      <input
                        className="input-field text-sm"
                        placeholder="Service/Product name"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Qty</label>
                          <input
                            type="number"
                            className="input-field text-sm"
                            value={item.qty}
                            onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Unit Price ($)</label>
                          <input
                            type="number"
                            className="input-field text-sm"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <span className="font-bold text-indigo-600">${(item.qty * item.price).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Desktop row layout */}
                    <div className="hidden sm:grid sm:grid-cols-12 gap-3 items-center">
                      <div className="col-span-6">
                        <input
                          className="input-field"
                          placeholder="Service/Product name"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          className="input-field"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          className="input-field"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <span className="font-bold text-sm">${(item.qty * item.price).toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addItem}
                  className="flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:text-indigo-700 mt-2"
                >
                  <Plus size={16} /> Add New Item
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <div className="w-full max-w-xs space-y-3">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-medium">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span>Tax (%)</span>
                    <input
                      type="number"
                      className="w-16 bg-slate-50 dark:bg-slate-800 border-none text-right rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                      value={tax}
                      onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span>Discount ({CURRENCIES[currency].symbol})</span>
                    <input
                      type="number"
                      className="w-20 bg-slate-50 dark:bg-slate-800 border-none text-right rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">{fmt(total)}</span>
                  </div>
                  {/* Currency Selector */}
                  <div className="pt-2">
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Currency</label>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {Object.entries(CURRENCIES).map(([code, c]) => (
                        <option key={code} value={code}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* CEO Signature */}
              <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <div className="text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ceo-signature.png"
                    alt="CEO Signature"
                    className="h-20 object-contain mx-auto mb-1"
                  />
                  <div className="border-t border-slate-400 dark:border-slate-500 pt-2 text-xs text-slate-500 dark:text-slate-400 w-44 text-center">
                    Authorised Signatory<br />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">CEO, DevCodeX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Dates */}
            <div className="card p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-indigo-600" /> Dating & Status
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Issue Date</label>
                  <input type="date" className="input-field" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Due Date</label>
                  <input type="date" className="input-field" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>
            </div>

            <button onClick={handleCreate} className="btn-primary w-full py-4 text-base shadow-xl shadow-indigo-500/20">
              <Save size={20} /> Save Invoice
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
