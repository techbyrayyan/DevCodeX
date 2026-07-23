'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useRef, useCallback } from 'react';
import { ScanText, Upload, X, Copy, Check, Download, Loader2, ImageIcon, Wand2 } from 'lucide-react';

export default function ImageOCRPage() {
  const [image, setImage] = useState<{ src: string; name: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState('eng');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please upload an image file.'); return; }
    setError('');
    setText('');
    const reader = new FileReader();
    reader.onload = e => setImage({ src: e.target?.result as string, name: file.name });
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  // Compress image to ensure payload is under typical 4MB limits
  const compressImage = (src: string, maxDim = 1500): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = src;
    });
  };

  const extractText = async () => {
    if (!image) return;
    setIsProcessing(true);
    setError('');
    setText('');
    try {
      const compressedSrc = await compressImage(image.src);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Extract ALL text from this image exactly as it appears. Return only the extracted text, nothing else. Preserve formatting, line breaks, and structure.',
          imageData: compressedSrc,
          model: 'gemini-1.5-flash',
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Server rejected the image. Please try again.');
        return;
      }
      
      const extracted = data.result || data.text || '';
      if (extracted) { 
        setText(extracted); 
      } else { 
        setError('Could not extract text from this image. Ensure the image has visible text and try again.'); 
      }
    } catch (err: any) {
      console.error('OCR Error:', err);
      if (err?.message?.includes('fetch') || err?.message?.includes('network')) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('OCR processing failed. Please ensure the image is clear and try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${image?.name?.replace(/\.[^.]+$/, '') || 'extracted'}-text.txt`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const LANGS = [
    { code: 'eng', label: 'English' },
    { code: 'ara', label: 'Arabic' },
    { code: 'urd', label: 'Urdu' },
    { code: 'fra', label: 'French' },
    { code: 'deu', label: 'German' },
    { code: 'spa', label: 'Spanish' },
    { code: 'chi_sim', label: 'Chinese (Simplified)' },
    { code: 'jpn', label: 'Japanese' },
    { code: 'rus', label: 'Russian' },
    { code: 'hin', label: 'Hindi' },
  ];

  const wordCount = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
  const charCount = text.length;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-rose-100 dark:bg-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400">
                <ScanText size={24} />
              </div>
              Image to Text (AI OCR)
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Smartly read and extract all text content from any image, screenshot or scanned document using AI.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: Upload */}
          <div className="space-y-4">
            {/* Drop Zone */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => !image && fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all select-none ${image ? 'cursor-default border-rose-200 dark:border-rose-800' : 'cursor-pointer hover:border-rose-400 dark:hover:border-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-900/10'} ${isDragging ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10 scale-[1.01]' : 'border-slate-200 dark:border-slate-700'}`}
            >
              <input ref={fileRef} type="file" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              {!image ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <Upload size={28} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Drop your image here or <span className="text-rose-600 underline underline-offset-2">click to browse</span></p>
                    <p className="text-sm text-slate-400 mt-1">JPG, PNG, WebP, GIF, TIFF, BMP supported</p>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.src} alt="Upload preview" className="max-h-[320px] mx-auto rounded-xl object-contain" />
                  <button
                    onClick={e => { e.stopPropagation(); setImage(null); setText(''); setError(''); }}
                    className="absolute top-2 right-2 p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-md text-slate-600 hover:text-rose-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <p className="text-xs text-slate-400 mt-2 truncate">{image.name}</p>
                </div>
              )}
            </div>

            {/* Language & Extract */}
            <div className="card p-4 flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 w-full sm:w-auto">
                <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Language</label>
                <select className="input-field text-sm" value={lang} onChange={e => setLang(e.target.value)}>
                  {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
              </div>
              <button
                onClick={extractText}
                disabled={!image || isProcessing}
                className="btn-primary flex items-center justify-center gap-2 py-3 px-6 w-full sm:w-auto mt-auto"
              >
                {isProcessing ? <><Loader2 size={18} className="animate-spin" /> Extracting…</> : <><Wand2 size={18} /> Extract Text</>}
              </button>
            </div>

            {/* Tips */}
            <div className="card p-4 bg-rose-50 dark:bg-rose-500/5 border-rose-200 dark:border-rose-700/30 space-y-2">
              <p className="text-xs font-semibold text-rose-700 dark:text-rose-400">💡 Tips for Best Results</p>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 list-disc pl-4">
                <li>Use clear, high-resolution images</li>
                <li>Ensure good contrast between text and background</li>
                <li>Straight, non-rotated text works best</li>
                <li>Select the correct language for better accuracy</li>
              </ul>
            </div>
          </div>

          {/* Right: Output */}
          <div className="space-y-4">
            {isProcessing && (
              <div className="card p-12 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center">
                  <Loader2 size={32} className="animate-spin text-rose-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Extracting text…</p>
                  <p className="text-sm text-slate-400 mt-1">Processing your image with OCR engine</p>
                </div>
              </div>
            )}

            {error && !isProcessing && (
              <div className="card p-4 bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 flex items-start gap-3">
                <X size={18} className="text-rose-500 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p>
              </div>
            )}

            {!isProcessing && !text && !error && (
              <div className="card p-12 text-center flex flex-col items-center gap-4 border-dashed border-2 border-rose-200 dark:border-rose-900">
                <ImageIcon size={48} className="text-rose-200 dark:text-rose-800" />
                <p className="text-slate-400 text-sm">Extracted text will appear here</p>
              </div>
            )}

            {text && !isProcessing && (
              <div className="card p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-sm">Extracted Text</h3>
                    <span className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">{wordCount} words · {charCount} chars</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={copy} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-slate-400" />}
                    </button>
                    <button onClick={downloadTxt} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <Download size={16} className="text-slate-400" />
                    </button>
                  </div>
                </div>
                <textarea
                  className="input-field font-mono text-sm min-h-[360px] resize-y"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  spellCheck={false}
                />
                <div className="flex gap-2">
                  <button onClick={copy} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm">
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                  <button onClick={downloadTxt} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                    <Download size={14} /> Download .txt
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
