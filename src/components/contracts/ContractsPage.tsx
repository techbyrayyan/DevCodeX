'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState } from 'react';
import { Download, FileSignature, DollarSign } from 'lucide-react';

const CURRENCIES: Record<string, { symbol: string; name: string }> = {
  USD: { symbol: '$',   name: 'USD – US Dollar' },
  PKR: { symbol: '₨',  name: 'PKR – Pakistani Rupee' },
  EUR: { symbol: '€',  name: 'EUR – Euro' },
  GBP: { symbol: '£',  name: 'GBP – British Pound' },
  AED: { symbol: 'د.إ',name: 'AED – UAE Dirham' },
  SAR: { symbol: '﷼',  name: 'SAR – Saudi Riyal' },
  CAD: { symbol: 'C$', name: 'CAD – Canadian Dollar' },
  AUD: { symbol: 'A$', name: 'AUD – Australian Dollar' },
  INR: { symbol: '₹',  name: 'INR – Indian Rupee' },
  JPY: { symbol: '¥',  name: 'JPY – Japanese Yen' },
};

export default function ContractsPage() {
  const [clientName, setClientName] = useState('Acme Corp');
  const [clientAddress, setClientAddress] = useState('123 Business Rd, Tech City');
  const [providerName, setProviderName] = useState('DevCodeX Agency');
  const [providerAddress, setProviderAddress] = useState('456 Innovation Way, Creative Hub');
  const [projectName, setProjectName] = useState('E-commerce Platform Redesign');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('15,000');
  const [currency, setCurrency] = useState('USD');
  const [terms, setTerms] = useState(`1. Services Rendered
The Provider agrees to provide web development and design services for the Project as described.

2. Payment Terms
The Client agrees to pay the total amount across milestones: 50% upfront, 50% upon completion.

3. Timeline
The project will be completed within 60 days from the date of the upfront payment.

4. Intellectual Property
Upon full payment, all intellectual property rights for the developed software transfer fully to the Client.

5. Confidentiality
Both parties agree to keep all proprietary information confidential during and after the project.`);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('contract-document');
    if (!element) return;
    try {
      const html2pdf = (await import('html2pdf.js' as any)).default as any;
      const opt = {
        margin: 15,
        filename: `${projectName || 'Contract'}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF. Make sure html2pdf.js is installed.');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 print:hidden">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSignature className="text-indigo-600 dark:text-indigo-400" />
            Contract Generator
          </h1>
          <p className="text-slate-500 text-sm">Create, preview, and generate professional contracts instantly.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={handleDownloadPDF}
            className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[70vh]">
        
        {/* Editor Form - Hidden when printing */}
        <div className="card p-6 flex flex-col gap-5 overflow-y-auto print:hidden border border-slate-200 dark:border-slate-800">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-2">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Contract Details</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Project Name</label>
              <input 
                type="text" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Date</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Value</label>
              <div className="flex gap-2">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white text-sm shrink-0"
                >
                  {Object.entries(CURRENCIES).map(([code, c]) => (
                    <option key={code} value={code}>{code} {c.symbol}</option>
                  ))}
                </select>
                <input 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                  placeholder="e.g. 15,000"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4 border p-4 rounded-xl border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/40">
              <h3 className="font-medium text-sm text-slate-900 dark:text-white">Provider Info</h3>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Name / Company</label>
                <input 
                  type="text" 
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Address</label>
                <input 
                  type="text" 
                  value={providerAddress}
                  onChange={(e) => setProviderAddress(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                />
              </div>
            </div>
            
            <div className="space-y-4 border p-4 rounded-xl border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/40">
              <h3 className="font-medium text-sm text-slate-900 dark:text-white">Client Info</h3>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Name / Company</label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Address</label>
                <input 
                  type="text" 
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                />
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Terms & Conditions</label>
            <textarea 
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full h-48 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm leading-relaxed resize-none dark:text-white"
            ></textarea>
          </div>
          
        </div>
        
        {/* Live Document Preview */}
        <div id="contract-document" className="card p-8 lg:p-12 overflow-y-auto bg-white dark:bg-slate-900 shadow-2xl relative border border-slate-200 dark:border-slate-800 print:shadow-none print:border-none print:p-0">
          <div className="max-w-2xl mx-auto font-serif text-slate-800 dark:text-slate-200">
            
            <div className="text-center mb-8 lg:mb-12 border-b-2 border-slate-800 dark:border-slate-600 pb-6 flex flex-col items-center">
              <img src="/logo1.png" alt="DevCodeX" className="h-16 object-contain mb-4" />
              <h1 className="text-2xl lg:text-4xl font-bold uppercase tracking-widest mb-2 text-slate-900 dark:text-white">Service Agreement</h1>
              <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400">Effective Date: {new Date(date).toLocaleDateString()}</p>
            </div>
            
            <div className="mb-8 text-sm lg:text-base leading-relaxed">
              <p className="mb-4">
                This Service Agreement (the &quot;Agreement&quot;) is made and entered into as of <strong>{new Date(date).toLocaleDateString()}</strong>, by and between:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-6 pl-4 border-l-4 border-indigo-100 dark:border-indigo-900/50">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">The Provider</h3>
                  <div className="font-semibold text-lg">{providerName}</div>
                  <div className="text-slate-600 dark:text-slate-400">{providerAddress}</div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">The Client</h3>
                  <div className="font-semibold text-lg">{clientName}</div>
                  <div className="text-slate-600 dark:text-slate-400">{clientAddress}</div>
                </div>
              </div>
              
              <p className="mb-4">
                WHEREAS, the Client desires to retain the services of the Provider for the project titled <strong>&quot;{projectName}&quot;</strong>, and the Provider is willing to perform such services on the terms and conditions set forth in this Agreement.
              </p>
              
              <p className="mb-8 font-medium">
                The total compensation for this engagement shall be <strong>{CURRENCIES[currency]?.symbol}{amount} {currency}</strong>.
              </p>
              
              <h2 className="text-xl font-bold mb-4 mt-8 pb-2 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">Terms and Conditions</h2>
              <div className="whitespace-pre-wrap text-sm lg:text-base text-slate-700 dark:text-slate-300">
                {terms}
              </div>
              
            </div>
            
            <div className="mt-16 pt-8 border-t-2 border-slate-200 dark:border-slate-800">
              <p className="mb-8 text-sm text-slate-600 dark:text-slate-400">IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.</p>
              <div className="flex flex-col sm:flex-row justify-between gap-12">
                <div className="flex-1 text-center sm:text-left">
                  <div className="h-24 flex items-end justify-center sm:justify-start mb-2">
                     <img src="/ceo-signature.png" alt="CEO Signature" className="h-20 object-contain opacity-80 mix-blend-multiply dark:mix-blend-screen" />
                  </div>
                  <div className="border-t border-slate-400 dark:border-slate-600 pt-2">
                    <div className="font-bold text-slate-900 dark:text-white">{providerName}</div>
                    <div className="text-sm text-slate-500">CEO, DevCodeX (Provider)</div>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="h-24 flex items-end mb-2">
                    {/* Empty space for Client Signature */}
                  </div>
                  <div className="border-t border-slate-400 dark:border-slate-600 pt-2">
                    <div className="font-bold text-slate-900 dark:text-white">{clientName}</div>
                    <div className="text-sm text-slate-500">Client Authorized Signature</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .card.print\\:p-0, .card.print\\:p-0 * {
            visibility: visible;
          }
          .card.print\\:p-0 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}} />
    </DashboardLayout>
  );
}