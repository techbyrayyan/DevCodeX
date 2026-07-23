'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useMemo } from 'react';
import { Download, FileJson, AlertCircle, CheckCircle2, RefreshCw, Upload } from 'lucide-react';

const SAMPLE_JSON = `[
  { "name": "Alice", "email": "alice@example.com", "age": 30, "city": "New York" },
  { "name": "Bob", "email": "bob@example.com", "age": 25, "city": "London" },
  { "name": "Carol", "email": "carol@example.com", "age": 35, "city": "Dubai" }
]`;

function flattenObject(obj: any, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce<Record<string, string>>((acc, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], fullKey));
    } else {
      acc[fullKey] = String(obj[key] ?? '');
    }
    return acc;
  }, {});
}

function jsonToCsv(data: any[], delimiter: string, quoteAll: boolean): string {
  const flattened = data.map(row => flattenObject(row));
  const headers = Array.from(new Set(flattened.flatMap(r => Object.keys(r))));
  const escape = (v: string) => {
    const needsQuote = quoteAll || v.includes(delimiter) || v.includes('"') || v.includes('\n');
    if (needsQuote) return `"${v.replace(/"/g, '""')}"`;
    return v;
  };
  const rows = [
    headers.map(escape).join(delimiter),
    ...flattened.map(row => headers.map(h => escape(row[h] ?? '')).join(delimiter)),
  ];
  return rows.join('\n');
}

export default function JsonToCsvPage() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [delimiter, setDelimiter] = useState(',');
  const [quoteAll, setQuoteAll] = useState(false);
  const [filename, setFilename] = useState('data');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!jsonInput.trim()) return { csv: '', error: '', rows: 0, cols: 0 };
    try {
      let parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        if (typeof parsed === 'object' && parsed !== null) parsed = [parsed];
        else return { csv: '', error: 'JSON must be an array of objects or a single object.', rows: 0, cols: 0 };
      }
      if (parsed.length === 0) return { csv: '', error: 'Array is empty.', rows: 0, cols: 0 };
      const csv = jsonToCsv(parsed, delimiter, quoteAll);
      const cols = Object.keys(flattenObject(parsed[0])).length;
      return { csv, error: '', rows: parsed.length, cols };
    } catch (e: any) {
      return { csv: '', error: e.message || 'Invalid JSON', rows: 0, cols: 0 };
    }
  }, [jsonInput, delimiter, quoteAll]);

  const download = () => {
    if (!result.csv) return;
    const blob = new Blob([result.csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${filename || 'data'}.csv`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const copy = async () => {
    if (!result.csv) return;
    await navigator.clipboard.writeText(result.csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setJsonInput(ev.target?.result as string);
    reader.readAsText(file);
  };

  const previewRows = result.csv ? result.csv.split('\n').slice(0, 6) : [];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-teal-100 dark:bg-teal-500/20 rounded-xl text-teal-600 dark:text-teal-400">
                <FileJson size={24} />
              </div>
              JSON to CSV Converter
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Paste JSON, configure options, and download a clean CSV instantly.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={copy} disabled={!result.csv} className="btn-secondary flex items-center gap-2">
              {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <RefreshCw size={16} />}
              {copied ? 'Copied!' : 'Copy CSV'}
            </button>
            <button onClick={download} disabled={!result.csv} className="btn-primary flex items-center gap-2">
              <Download size={16} /> Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* JSON Input */}
          <div className="xl:col-span-3 flex flex-col gap-4">
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">JSON Input</h3>
                <label className="flex items-center gap-1.5 text-xs text-teal-600 cursor-pointer hover:underline">
                  <Upload size={13} /> Upload .json
                  <input type="file" accept=".json,application/json" className="hidden" onChange={handleFile} />
                </label>
              </div>
              <textarea
                className="input-field font-mono text-xs min-h-[320px] resize-y"
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                placeholder="Paste your JSON array here…"
                spellCheck={false}
              />
              {result.error && (
                <div className="mt-2 flex items-start gap-2 text-rose-600 dark:text-rose-400 text-xs bg-rose-50 dark:bg-rose-900/20 p-3 rounded-lg">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" /> {result.error}
                </div>
              )}
              {!result.error && result.csv && (
                <div className="mt-2 flex items-center gap-2 text-emerald-600 text-xs">
                  <CheckCircle2 size={14} /> {result.rows} rows × {result.cols} columns parsed successfully
                </div>
              )}
            </div>

            {/* CSV Preview */}
            {result.csv && (
              <div className="card p-5">
                <h3 className="font-semibold text-sm mb-3">CSV Preview</h3>
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-xs">
                    {previewRows.map((row, ri) => {
                      const cells = row.split(delimiter === ',' ? ',' : delimiter === ';' ? ';' : '\t');
                      return (
                        <tr key={ri} className={ri === 0 ? 'bg-teal-50 dark:bg-teal-900/20 font-semibold' : ri % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/40' : ''}>
                          {cells.map((cell, ci) => (
                            <td key={ci} className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 truncate max-w-[160px]" title={cell}>
                              {cell.replace(/^"|"$/g, '')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </table>
                  {result.rows > 5 && <p className="text-xs text-slate-400 text-center py-2">…and {result.rows - 5} more rows</p>}
                </div>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="xl:col-span-2 space-y-4">
            <div className="card p-5 space-y-4">
              <h3 className="font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-3">Options</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Filename</label>
                <input className="input-field" value={filename} onChange={e => setFilename(e.target.value)} placeholder="data" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Delimiter</label>
                <div className="grid grid-cols-3 gap-2">
                  {[{ label: 'Comma (,)', val: ',' }, { label: 'Semicolon (;)', val: ';' }, { label: 'Tab', val: '\t' }].map(d => (
                    <button key={d.val} onClick={() => setDelimiter(d.val)} className={`py-2 text-xs rounded-xl border font-medium transition-all ${delimiter === d.val ? 'bg-teal-600 text-white border-teal-600' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal-400'}`}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={quoteAll} onChange={e => setQuoteAll(e.target.checked)} className="w-4 h-4 accent-teal-600" />
                <div>
                  <p className="text-sm font-medium">Quote all fields</p>
                  <p className="text-xs text-slate-400">Wrap every value in double quotes</p>
                </div>
              </label>
            </div>

            <div className="card p-4 bg-teal-50 dark:bg-teal-500/5 border-teal-200 dark:border-teal-700/30">
              <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 mb-1">✅ 100% In-Browser</p>
              <p className="text-xs text-slate-500">No data is ever sent to any server. Conversion happens entirely client-side.</p>
            </div>

            <button onClick={() => setJsonInput(SAMPLE_JSON)} className="btn-secondary w-full text-sm">Load Sample Data</button>
            <button onClick={download} disabled={!result.csv} className="btn-primary w-full flex items-center justify-center gap-2">
              <Download size={16} /> Download .csv
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
