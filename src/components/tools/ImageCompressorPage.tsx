'use client';
import { useState, useRef, useCallback } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { Upload, ImageDown, Download, X, ArrowRight, Sliders } from 'lucide-react';

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function savings(orig: number, compressed: number) {
  if (!orig) return 0;
  return Math.round(((orig - compressed) / orig) * 100);
}

export default function ImageCompressorPage() {
  const [original, setOriginal] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [processing, setProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    setOriginalSize(file.size);
    setCompressed(null);
    setCompressedSize(0);
    const reader = new FileReader();
    reader.onload = (e) => setOriginal(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const compress = useCallback(async () => {
    if (!original) return;
    setProcessing(true);
    await new Promise(res => setTimeout(res, 300));
    const img = new Image();
    img.src = original;
    await new Promise<void>(res => { img.onload = () => res(); });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    const dataUrl = canvas.toDataURL(format, quality / 100);
    setCompressed(dataUrl);

    // Estimate compressed size from base64
    const base64 = dataUrl.split(',')[1];
    const byteSize = Math.round((base64.length * 3) / 4);
    setCompressedSize(byteSize);
    setProcessing(false);
  }, [original, quality, format]);

  const reset = () => {
    setOriginal(null);
    setCompressed(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadName = fileName.replace(/\.[^.]+$/, '') + '_compressed.' + format.split('/')[1];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <ImageDown size={20} className="text-white" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Image Compressor</h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Compress images in-browser — no uploads, no limits.</p>
          </div>
          {original && (
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 transition-all text-sm font-medium">
              <X size={16} /> Reset
            </button>
          )}
        </div>

        {!original ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-20 text-center cursor-pointer transition-all duration-300 group
              ${dragging
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 hover:border-cyan-400 hover:bg-cyan-50/50 dark:hover:bg-cyan-500/5'
              }`}
          >
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-500/20 dark:to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload size={36} className="text-cyan-500" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-800 dark:text-white">Drop your image here</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">or <span className="text-cyan-500 font-semibold">click to browse</span></p>
                <p className="text-xs text-slate-400 mt-3">Supports JPG, PNG, WEBP</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Controls */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <Sliders size={18} className="text-cyan-500" /> Compression Settings
              </div>

              {/* Quality Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Quality</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{quality}%</span>
                </div>
                <input
                  type="range" min={5} max={100} value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Smaller file</span><span>Higher quality</span>
                </div>
              </div>

              {/* Format */}
              <div className="space-y-2">
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Output Format</span>
                <div className="flex gap-2 flex-wrap">
                  {(['image/jpeg', 'image/webp', 'image/png'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${format === f
                        ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/40'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                        }`}
                    >
                      {f.split('/')[1].toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={compress}
                disabled={processing}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Compressing…</>
                ) : (
                  <><ImageDown size={18} /> Compress Image</>
                )}
              </button>
            </div>

            {/* Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { label: 'Original', src: original, size: originalSize, color: 'amber' },
                { label: 'Compressed', src: compressed, size: compressedSize, color: 'cyan' },
              ].map((panel) => (
                <div key={panel.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className={`px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3`}>
                    <div className={`w-2 h-2 rounded-full ${panel.label === 'Original' ? 'bg-amber-400' : 'bg-cyan-400'}`} />
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{panel.label}</span>
                    {panel.size > 0 && (
                      <span className="ml-auto text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {formatBytes(panel.size)}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center min-h-[220px] bg-slate-50 dark:bg-slate-950/30">
                    {panel.src
                      ? <img ref={panel.label === 'Original' ? imgRef : undefined} src={panel.src} alt={panel.label} className="max-h-52 max-w-full object-contain rounded-lg" />
                      : <div className="text-slate-400 text-sm flex flex-col items-center gap-2"><ImageDown size={32} className="opacity-30" /><span>Result will appear here</span></div>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Stats bar */}
            {compressed && compressedSize > 0 && (
              <div className="flex flex-wrap items-center gap-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{formatBytes(originalSize)}</span>
                  <ArrowRight size={16} className="text-emerald-500" />
                  <span className="text-sm font-bold text-slate-800 dark:text-white">{formatBytes(compressedSize)}</span>
                </div>
                <div className="ml-auto bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-sm px-4 py-1.5 rounded-full">
                  🎉 {savings(originalSize, compressedSize)}% smaller
                </div>
                <a
                  href={compressed}
                  download={downloadName}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Download size={16} /> Download
                </a>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { emoji: '🚀', title: 'WebP = best compression', desc: 'WebP typically gives 30–50% smaller files than JPEG at the same quality.' },
            { emoji: '🔒', title: '100% private', desc: 'Your images never leave your device. Everything runs in-browser.' },
            { emoji: '🎯', title: 'Quality 70–85 is sweet spot', desc: 'Most images look identical at 75% quality but are 3× smaller.' },
          ].map(t => (
            <div key={t.title} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="text-2xl">{t.emoji}</div>
              <p className="font-semibold text-slate-800 dark:text-white text-sm">{t.title}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
