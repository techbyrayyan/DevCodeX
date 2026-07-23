'use client';
import { useState, useRef, useCallback } from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { Upload, Eraser, Download, RefreshCw, ImageOff, X, Sliders } from 'lucide-react';

// ──────────────────────────────────────────────────────────────────────────────
// Core BG-removal: Edge Flood-Fill (BFS from all 4 edges)
// Works well for images where the background touches the border.
// ──────────────────────────────────────────────────────────────────────────────
function removeBgFloodFill(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  threshold: number,   // colour distance 0-255 for background detection
  feather: number      // 0-10 softness at edges
): Uint8ClampedArray {
  const n = width * height;
  const visited  = new Uint8Array(n);   // 1 = visited
  const isBg     = new Uint8Array(n);   // 1 = background pixel

  // ── Step 1: sample average BG colour from corners (inset to avoid borders) ──
  let rSum = 0, gSum = 0, bSum = 0, cnt = 0;
  const addSample = (x: number, y: number) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const i = (y * width + x) * 4;
    rSum += data[i]; gSum += data[i + 1]; bSum += data[i + 2];
    cnt++;
  };
  const offset = Math.min(3, Math.floor(width / 2), Math.floor(height / 2));
  addSample(offset, offset);
  addSample(width - 1 - offset, offset);
  addSample(offset, height - 1 - offset);
  addSample(width - 1 - offset, height - 1 - offset);
  addSample(Math.floor(width / 2), offset);
  addSample(Math.floor(width / 2), height - 1 - offset);
  addSample(offset, Math.floor(height / 2));
  addSample(width - 1 - offset, Math.floor(height / 2));

  const bgR = cnt > 0 ? rSum / cnt : 255;
  const bgG = cnt > 0 ? gSum / cnt : 255;
  const bgB = cnt > 0 ? bSum / cnt : 255;

  // ── Step 2: Global colour distance check (Non-contiguous) ──
  // This ensures enclosed spaces (like inside the letter 'O') are also removed
  for (let idx = 0; idx < n; idx++) {
    const pi = idx * 4;
    const dr = data[pi]     - bgR;
    const dg = data[pi + 1] - bgG;
    const db = data[pi + 2] - bgB;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    if (dist <= threshold) {
      isBg[idx] = 1;
    }
  }

  // ── Step 3: Apply transparency + optional edge feathering ──
  const output = new Uint8ClampedArray(data);
  for (let idx = 0; idx < n; idx++) {
    if (!isBg[idx]) continue;
    const pi = idx * 4;

    if (feather === 0) {
      output[pi + 3] = 0;
      continue;
    }

    // Count non-background neighbours within feather radius to create soft edge
    let bgNeighbours = 0, total = 0;
    const x = idx % width, y = Math.floor(idx / width);
    for (let dy = -feather; dy <= feather; dy++) {
      for (let dx = -feather; dx <= feather; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        total++;
        if (isBg[ny * width + nx]) bgNeighbours++;
      }
    }
    output[pi + 3] = Math.round((1 - bgNeighbours / total) * 255);
  }
  return output;
}

// ──────────────────────────────────────────────────────────────────────────────
export default function BgRemoverPage() {
  const [original, setOriginal]   = useState<string | null>(null);
  const [result,   setResult]     = useState<string | null>(null);
  const [loading,  setLoading]    = useState(false);
  const [dragging, setDragging]   = useState(false);
  const [fileName, setFileName]   = useState('');
  const [error,    setError]      = useState('');
  const [threshold, setThreshold] = useState(55);   // colour distance 0-255
  const [feather,   setFeather]   = useState(2);    // edge softness 0-10
  const [showOpts,  setShowOpts]  = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please upload a valid image file.'); return; }
    if (file.size > 15 * 1024 * 1024)   { setError('Image too large. Max 15 MB.'); return; }
    setError(''); setResult(null); setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setOriginal(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  // ── Main removal logic ──
  const removeBg = async () => {
    if (!original) return;
    setLoading(true); setError('');
    try {
      // Load the image off-screen
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload  = () => res(i);
        i.onerror = () => rej(new Error('Failed to load image'));
        i.src = original;
      });

      const MAX = 1800; // cap dimensions for performance
      let w = img.naturalWidth, h = img.naturalHeight;
      if (w > MAX || h > MAX) {
        const scale = MAX / Math.max(w, h);
        w = Math.round(w * scale); h = Math.round(h * scale);
      }

      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);

      const imgData = ctx.getImageData(0, 0, w, h);
      // Run flood-fill in a short async break so UI doesn't freeze
      await new Promise(r => setTimeout(r, 0));
      const processed = removeBgFloodFill(imgData.data, w, h, threshold, feather);

      const outData = ctx.createImageData(w, h);
      outData.data.set(processed);
      ctx.putImageData(outData, 0, 0);
      setResult(canvas.toDataURL('image/png'));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Processing failed. Try another image.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setOriginal(null); setResult(null); setFileName(''); setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Eraser size={20} className="text-white" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">AI Background Remover</h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm ml-1">
              Professional, high-precision background extraction. 100% secure, processed entirely on your device.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOpts(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-sm font-medium"
            >
              <Sliders size={16} /> Options
            </button>
            {original && (
              <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-all text-sm font-medium">
                <X size={16} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* ── Options panel ── */}
        {showOpts && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Sliders size={16} className="text-violet-500" /> Fine-tune Settings
            </p>

            {/* Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Background Sensitivity</span>
                <span className="font-bold text-violet-600 dark:text-violet-400">{threshold}</span>
              </div>
              <input type="range" min={10} max={150} value={threshold}
                onChange={e => setThreshold(Number(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer" />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Stricter (less removed)</span><span>Looser (more removed)</span>
              </div>
            </div>

            {/* Feather */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Edge Softness (Feather)</span>
                <span className="font-bold text-violet-600 dark:text-violet-400">{feather}</span>
              </div>
              <input type="range" min={0} max={8} value={feather}
                onChange={e => setFeather(Number(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer" />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Hard edges</span><span>Soft/smooth edges</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 leading-relaxed">
              💡 <strong>Tip:</strong> Increase sensitivity if parts of the background aren't removed. Decrease it if subject colours are being removed too. Re-click "Remove Background" after changing.
            </p>
          </div>
        )}

        {/* ── Upload zone ── */}
        {!original ? (
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-20 text-center cursor-pointer transition-all duration-300 group
              ${dragging
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-500/5'
              }`}
          >
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-500/20 dark:to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload size={36} className="text-violet-500" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-800 dark:text-white">Drop your image here</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">or <span className="text-violet-500 font-semibold">click to browse</span></p>
                <p className="text-xs text-slate-400 mt-3">JPG · PNG · WEBP · BMP · Max 15 MB</p>
              </div>
            </div>
          </div>
        ) : (
          /* ── Preview cards ── */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Original</span>
                <span className="ml-auto text-xs text-slate-400 truncate max-w-[150px]">{fileName}</span>
              </div>
              <div className="p-4 flex items-center justify-center min-h-[300px] bg-slate-50 dark:bg-slate-950/40">
                <img src={original} alt="Original" className="max-h-72 max-w-full object-contain rounded-lg shadow-sm" />
              </div>
            </div>

            {/* Result */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Background Removed</span>
                {result && <span className="ml-auto text-xs font-medium text-emerald-500">✓ Done</span>}
              </div>
              {/* Checkerboard transparency indicator */}
              <div
                className="p-4 flex items-center justify-center min-h-[300px]"
                style={{ backgroundImage: 'repeating-conic-gradient(#cbd5e1 0% 25%, #f8fafc 0% 50%)', backgroundSize: '20px 20px' }}
              >
                {loading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-4 border-violet-200 border-t-violet-500 animate-spin" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse font-medium">
                      Flood-filling background…
                    </p>
                  </div>
                ) : result ? (
                  <img src={result} alt="Result" className="max-h-72 max-w-full object-contain rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <ImageOff size={40} className="opacity-40" />
                    <p className="text-sm">Click &quot;Remove Background&quot; below</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="flex items-center gap-3 px-5 py-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-400 text-sm">
            <X size={16} className="shrink-0" /> {error}
          </div>
        )}

        {/* ── Action buttons ── */}
        {original && (
          <div className="flex flex-wrap gap-4">
            <button
              onClick={removeBg}
              disabled={loading}
              className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading
                ? <><RefreshCw size={18} className="animate-spin" /> Processing…</>
                : <><Eraser size={18} /> Remove Background</>
              }
            </button>

            {result && (
              <a
                href={result}
                download={`${fileName.replace(/\.[^.]+$/, '')}_no_bg.png`}
                className="flex items-center gap-2 px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Download size={18} /> Download PNG
              </a>
            )}
          </div>
        )}

        {/* ── Tip cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { emoji: '🎯', title: 'Best results', desc: 'Works great on product photos, logos, and portraits with solid/uniform backgrounds (white, grey, blue sky, etc.).' },
            { emoji: '⚡', title: 'Fully local', desc: 'Processing runs 100% in your browser via Canvas API. Nothing is uploaded to any server.' },
            { emoji: '🎛️', title: 'Adjust sensitivity', desc: 'Click Options to tune the threshold & feather. If too much or too little is removed, tweak and re-run.' },
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
