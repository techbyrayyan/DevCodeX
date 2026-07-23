'use client';
import { useState, useRef, useEffect } from 'react';
import { QrCode, Download, ArrowLeft, Copy, Check, Palette, Link, Type, Wifi, Mail } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

type QRType = 'url' | 'text' | 'email' | 'wifi';

const QR_TYPES: { id: QRType; label: string; icon: React.ElementType; placeholder: string }[] = [
  { id: 'url',   label: 'URL / Link', icon: Link,  placeholder: 'https://example.com' },
  { id: 'text',  label: 'Plain Text', icon: Type,  placeholder: 'Enter any text...' },
  { id: 'email', label: 'Email',      icon: Mail,  placeholder: 'hello@example.com' },
  { id: 'wifi',  label: 'Wi-Fi',      icon: Wifi,  placeholder: 'Network name (SSID)' },
];

const COLORS = [
  { fg: '#1e1b4b', bg: '#ffffff', name: 'Classic' },
  { fg: '#4f46e5', bg: '#eef2ff', name: 'Indigo' },
  { fg: '#059669', bg: '#ecfdf5', name: 'Emerald' },
  { fg: '#dc2626', bg: '#fef2f2', name: 'Red' },
  { fg: '#7c3aed', bg: '#f5f3ff', name: 'Purple' },
  { fg: '#000000', bg: '#fbbf24', name: 'Gold' },
];

export default function QRCodeGeneratorPage() {
  const { goTo } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [qrType, setQrType]   = useState<QRType>('url');
  const [text, setText]         = useState('https://example.com');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiSec, setWifiSec]   = useState('WPA');
  const [size, setSize]         = useState(280);
  const [colorPair, setColorPair] = useState(COLORS[0]);
  const [copied, setCopied]     = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  // Build the data string for the QR code
  const buildQRData = () => {
    if (qrType === 'email') return `mailto:${text}`;
    if (qrType === 'wifi')  return `WIFI:T:${wifiSec};S:${text};P:${wifiPass};;`;
    return text;
  };

  // Draw QR code using qrcode library loaded via CDN-style dynamic import
  const generateQR = async () => {
    const data = buildQRData();
    if (!data.trim() || !canvasRef.current) return;

    try {
      const QRCode = (await import('qrcode')).default;
      await QRCode.toCanvas(canvasRef.current, data, {
        width: size,
        margin: 2,
        color: {
          dark: colorPair.fg,
          light: colorPair.bg,
        },
      });
      setQrDataUrl(canvasRef.current.toDataURL('image/png'));
    } catch (err) {
      console.error('QR generate error:', err);
    }
  };

  useEffect(() => {
    generateQR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, wifiPass, wifiSec, size, colorPair, qrType]);

  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copySVG = async () => {
    if (!qrDataUrl) return;
    await navigator.clipboard.writeText(qrDataUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeType = QR_TYPES.find(t => t.id === qrType)!;

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-8 space-y-4 sm:space-y-6 max-w-[1400px] mx-auto animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo('dashboard')}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-indigo-500/20 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
              QR Code Generator
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Generate beautiful QR codes instantly — 100% free &amp; offline
            </p>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={copySVG}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all text-sm font-medium"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
          <button
            onClick={downloadPNG}
            className="flex-1 sm:flex-none btn-primary py-2.5 px-5 flex items-center justify-center gap-2 text-sm"
          >
            <Download size={16} /> Download
          </button>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 sm:gap-6">

        {/* ── Controls ── */}
        <div className="space-y-4 sm:space-y-5">

          {/* Type Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Content Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QR_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setQrType(t.id); setText(''); }}
                  className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl border-2 transition-all text-sm font-medium ${
                    qrType === t.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <t.icon size={20} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {activeType.label} Details
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1.5">
                {qrType === 'wifi' ? 'Network Name (SSID)' : qrType === 'email' ? 'Email Address' : qrType === 'url' ? 'Website URL' : 'Text Content'}
              </label>
              <input
                type="text"
                className="input-field w-full"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={activeType.placeholder}
              />
            </div>

            {qrType === 'wifi' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1.5">Password</label>
                  <input
                    type="password"
                    className="input-field w-full"
                    value={wifiPass}
                    onChange={e => setWifiPass(e.target.value)}
                    placeholder="Wi-Fi password"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1.5">Security</label>
                  <select
                    className="input-field w-full"
                    value={wifiSec}
                    onChange={e => setWifiSec(e.target.value)}
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Customization */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Palette size={14} /> Customization
            </h2>

            {/* Color Palette */}
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-2">Color Scheme</label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    title={c.name}
                    onClick={() => setColorPair(c)}
                    className={`w-10 h-10 rounded-xl border-2 transition-all flex items-center justify-center text-xs font-bold shadow-sm hover:scale-110 ${
                      colorPair.name === c.name ? 'border-indigo-500 scale-110 ring-2 ring-indigo-400 ring-offset-1' : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: c.bg, color: c.fg }}
                  >
                    QR
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1.5">Selected: <span className="font-medium text-slate-600 dark:text-slate-300">{colorPair.name}</span></p>
            </div>

            {/* Size Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-500">QR Size</label>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{size}px</span>
              </div>
              <input
                type="range" min={150} max={500} step={10} value={size}
                onChange={e => setSize(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Small</span><span>Large</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── QR Preview ── */}
        <div className="lg:sticky lg:top-6 h-max">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col items-center">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider self-start flex items-center gap-2">
              <QrCode size={14} /> Preview
            </h2>

            <div
              className="rounded-2xl p-4 shadow-inner flex items-center justify-center"
              style={{ backgroundColor: colorPair.bg }}
            >
              <canvas
                ref={canvasRef}
                className="rounded-lg max-w-full"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>

            {!text.trim() && (
              <p className="text-xs text-slate-400 text-center">Enter some content above to generate a QR code</p>
            )}

            {text.trim() && (
              <div className="w-full space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 text-center truncate px-2" title={buildQRData()}>
                  {buildQRData().length > 60 ? buildQRData().slice(0, 60) + '...' : buildQRData()}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={copySVG}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all"
                  >
                    {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={downloadPNG}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-all"
                  >
                    <Download size={13} /> PNG
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="mt-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-500/20 space-y-2">
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">💡 Pro Tips</p>
            <ul className="text-xs text-indigo-600/80 dark:text-indigo-300/70 space-y-1 list-disc pl-4">
              <li>Use high-contrast colors for best scan results</li>
              <li>Bigger size = easier to scan from distance</li>
              <li>Wi-Fi QR lets guests connect without typing passwords</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
