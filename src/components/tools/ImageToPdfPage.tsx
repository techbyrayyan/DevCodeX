'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, ArrowUp, ArrowDown, FileImage, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: string;
  width?: number;
  height?: number;
}

type PageSize = 'A4' | 'A3' | 'Letter' | 'Legal';
type Orientation = 'portrait' | 'landscape';
type FitMode = 'fit' | 'fill' | 'original';

const PAGE_SIZES: Record<PageSize, [number, number]> = {
  A4: [210, 297],
  A3: [297, 420],
  Letter: [215.9, 279.4],
  Legal: [215.9, 355.6],
};

function humanSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function ImageToPdfPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [done, setDone] = useState(false);

  // PDF settings
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [fitMode, setFitMode] = useState<FitMode>('fit');
  const [margin, setMargin] = useState(10);
  const [pdfName, setPdfName] = useState('images-to-pdf');
  const [quality, setQuality] = useState(0.92);
  const [bgColor, setBgColor] = useState('#ffffff');
  
  const [activeTab, setActiveTab] = useState<'image-to-pdf' | 'word-to-pdf' | 'pdf-to-word'>('image-to-pdf');

  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    arr.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const src = e.target?.result as string;
        const img = new window.Image();
        img.onload = () => {
          setImages(prev => [...prev, {
            id: `${Date.now()}-${Math.random()}`,
            file,
            preview: src,
            name: file.name,
            size: humanSize(file.size),
            width: img.naturalWidth,
            height: img.naturalHeight,
          }]);
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    });
    setDone(false);
  }, []);

  const removeImage = (id: string) => setImages(prev => prev.filter(i => i.id !== id));

  const moveImage = (id: string, dir: -1 | 1) => {
    setImages(prev => {
      const idx = prev.findIndex(i => i.id === id);
      if (idx < 0) return prev;
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const convertToPDF = async () => {
    if (images.length === 0) return;
    setIsConverting(true);
    setDone(false);

    try {
      const { jsPDF } = await import('jspdf');
      
      const [pw, ph] = PAGE_SIZES[pageSize];
      const isLandscape = orientation === 'landscape';
      const docW = isLandscape ? ph : pw;
      const docH = isLandscape ? pw : ph;

      const doc = new jsPDF({
        orientation,
        unit: 'mm',
        format: pageSize.toLowerCase() as any,
      });

      for (let i = 0; i < images.length; i++) {
        const imgEntry = images[i];
        if (i > 0) doc.addPage(pageSize.toLowerCase() as any, orientation);

        // Get base64 data
        const imgData = imgEntry.preview;
        const type = imgEntry.file.type === 'image/png' ? 'PNG' : 'JPEG';

        const availW = docW - margin * 2;
        const availH = docH - margin * 2;

        if (fitMode === 'original') {
          // Place at actual size (capped to page)
          const scaleX = availW / ((imgEntry.width ?? availW) * 0.264583);
          const scaleY = availH / ((imgEntry.height ?? availH) * 0.264583);
          const scale = Math.min(1, scaleX, scaleY);
          const w = (imgEntry.width ?? availW) * 0.264583 * scale;
          const h = (imgEntry.height ?? availH) * 0.264583 * scale;
          const x = margin + (availW - w) / 2;
          const y = margin + (availH - h) / 2;

          // Background
          doc.setFillColor(bgColor);
          doc.rect(0, 0, docW, docH, 'F');
          doc.addImage(imgData, type, x, y, w, h, undefined, 'FAST');

        } else if (fitMode === 'fill') {
          // Stretch image to fill the entire page
          doc.setFillColor(bgColor);
          doc.rect(0, 0, docW, docH, 'F');
          doc.addImage(imgData, type, margin, margin, availW, availH, undefined, 'FAST');

        } else {
          // Default: fit proportionally
          const imgW = imgEntry.width ?? 800;
          const imgH = imgEntry.height ?? 600;
          const ratio = imgW / imgH;
          let w = availW;
          let h = w / ratio;
          if (h > availH) { h = availH; w = h * ratio; }
          const x = margin + (availW - w) / 2;
          const y = margin + (availH - h) / 2;

          doc.setFillColor(bgColor);
          doc.rect(0, 0, docW, docH, 'F');
          doc.addImage(imgData, type, x, y, w, h, undefined, 'FAST');
        }
      }

      doc.save(`${pdfName || 'images-to-pdf'}.pdf`);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const processWordToPdf = async (file: File) => {
    try {
      const mammoth = (await import('mammoth')).default || await import('mammoth');
      const html2pdf = (await import('html2pdf.js')).default || await import('html2pdf.js');

      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      let html = result.value;
      if (!html.trim()) {
        const textResult = await mammoth.extractRawText({ arrayBuffer });
        html = `<p>${textResult.value.replace(/\n/g, '<br>')}</p>`;
      }

      const element = document.createElement('div');
      element.innerHTML = html;
      element.style.padding = '20px';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.color = '#000';
      element.style.background = '#fff';
      element.style.fontSize = '12pt';
      element.style.lineHeight = '1.5';

      const opt = {
        margin: 15,
        filename: file.name.replace(/\.[^/.]+$/, '') + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // @ts-ignore
      await (html2pdf().from(element).set(opt).save());
      return true;
    } catch (err) {
      console.error('Word to PDF Error:', err);
      return false;
    }
  };

  const processPdfToWord = async (file: File) => {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const docx = await import('docx');
      const arrayBuffer = await file.arrayBuffer();
      
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n\n';
      }

      const doc = new docx.Document({
        sections: [{
          properties: {},
          children: fullText.split('\n').map(text => 
            new docx.Paragraph({
              children: [new docx.TextRun(text)],
            })
          ),
        }]
      });

      const blob = await docx.Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace(/\.[^/.]+$/, '') + '.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (err) {
      console.error('PDF to Word Error:', err);
      return false;
    }
  };

  const handleConvert = async (file: File, type: 'word-to-pdf' | 'pdf-to-word') => {
    setIsConverting(true);
    setDone(false);
    
    let success = false;
    if (type === 'word-to-pdf') {
      success = await processWordToPdf(file);
    } else {
      success = await processPdfToWord(file);
    }
    
    setIsConverting(false);
    if (success) {
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } else {
      alert('Conversion failed. Please check the file and try again.');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-violet-100 dark:bg-violet-500/20 rounded-xl text-violet-600 dark:text-violet-400">
                <FileImage size={24} />
              </div>
              Document Converter
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Easily convert between images, PDFs, and Word documents directly inside your browser.
            </p>
          </div>
          {(activeTab === 'image-to-pdf') && images.length > 0 && (
            <button
              onClick={convertToPDF}
              disabled={isConverting}
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {isConverting ? <Loader2 size={18} className="animate-spin" /> : done ? <CheckCircle2 size={18} /> : <Download size={18} />}
              {isConverting ? 'Converting…' : done ? 'Downloaded!' : `Convert ${images.length} Image${images.length > 1 ? 's' : ''} to PDF`}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
          <button 
            onClick={() => setActiveTab('image-to-pdf')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'image-to-pdf' ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Image to PDF
          </button>
          <button 
            onClick={() => setActiveTab('word-to-pdf')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'word-to-pdf' ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Word to PDF
          </button>
          <button 
            onClick={() => setActiveTab('pdf-to-word')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'pdf-to-word' ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            PDF to Word
          </button>
        </div>

        {(activeTab === 'image-to-pdf') && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left: Upload + Image list */}
          <div className="xl:col-span-2 flex flex-col gap-4">

            {/* Drop Zone */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 select-none ${
                isDragging
                  ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 scale-[1.01]'
                  : 'border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-500 hover:bg-violet-50/50 dark:hover:bg-violet-500/5'
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={e => { if (e.target.files) addFiles(e.target.files); }}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-500/10 text-violet-500 flex items-center justify-center shadow-inner">
                  <Upload size={28} />
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-800 dark:text-slate-200">
                    Drop images here or <span className="text-violet-600 dark:text-violet-400 underline underline-offset-2">click to browse</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Supports JPG, PNG, WebP, GIF, BMP, AVIF — any image format</p>
                </div>
              </div>
            </div>

            {/* Image List */}
            {images.length > 0 && (
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">
                    <span className="text-violet-600 dark:text-violet-400 font-bold">{images.length}</span> image{images.length > 1 ? 's' : ''} selected
                  </h3>
                  <button
                    onClick={() => { setImages([]); setDone(false); }}
                    className="text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 group"
                    >
                      {/* Thumbnail */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.preview}
                        alt={img.name}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-slate-800 dark:text-slate-200">{img.name}</p>
                        <p className="text-xs text-slate-400">{img.size} {img.width && img.height ? `· ${img.width}×${img.height}` : ''}</p>
                      </div>

                      {/* Page num badge */}
                      <span className="text-xs font-bold px-2 py-1 bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-lg shrink-0">
                        P{idx + 1}
                      </span>

                      {/* Controls */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => moveImage(img.id, -1)}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 disabled:opacity-30 transition-colors"
                          title="Move up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveImage(img.id, 1)}
                          disabled={idx === images.length - 1}
                          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 disabled:opacity-30 transition-colors"
                          title="Move down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          onClick={() => removeImage(img.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {images.length === 0 && (
              <div className="card p-10 text-center text-slate-400 flex flex-col items-center gap-3">
                <ImageIcon size={48} className="opacity-20" />
                <p className="text-sm">No images added yet. Drop some above!</p>
              </div>
            )}
          </div>

          {/* Right: Settings */}
          <div className="flex flex-col gap-4">
            <div className="card p-6 space-y-5">
              <h3 className="font-bold text-base border-b border-slate-100 dark:border-slate-800 pb-3">PDF Settings</h3>

              <div>
                <label className="block text-sm font-medium mb-1.5">File Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={pdfName}
                  onChange={e => setPdfName(e.target.value)}
                  placeholder="my-document"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Page Size</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['A4', 'A3', 'Letter', 'Legal'] as PageSize[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setPageSize(s)}
                      className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                        pageSize === s
                          ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-violet-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Orientation</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['portrait', 'landscape'] as Orientation[]).map(o => (
                    <button
                      key={o}
                      onClick={() => setOrientation(o)}
                      className={`py-2 rounded-xl text-sm font-medium border capitalize transition-all ${
                        orientation === o
                          ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-violet-400'
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Image Fit</label>
                <select
                  className="input-field"
                  value={fitMode}
                  onChange={e => setFitMode(e.target.value as FitMode)}
                >
                  <option value="fit">Fit (proportional, with whitespace)</option>
                  <option value="fill">Fill (stretch to fill page)</option>
                  <option value="original">Original Size (centered)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Margin: <span className="text-violet-600 font-bold">{margin}mm</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={margin}
                  onChange={e => setMargin(Number(e.target.value))}
                  className="w-full accent-violet-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Image Quality: <span className="text-violet-600 font-bold">{Math.round(quality * 100)}%</span>
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={1}
                  step={0.01}
                  value={quality}
                  onChange={e => setQuality(Number(e.target.value))}
                  className="w-full accent-violet-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Page Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={e => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={e => setBgColor(e.target.value)}
                    className="input-field flex-1 font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={convertToPDF}
              disabled={images.length === 0 || isConverting}
              className={`btn-primary py-4 text-base font-bold flex items-center justify-center gap-2 transition-all ${
                done ? 'bg-emerald-600 hover:bg-emerald-700' : ''
              }`}
            >
              {isConverting
                ? <><Loader2 size={20} className="animate-spin" /> Converting…</>
                : done
                ? <><CheckCircle2 size={20} /> Downloaded!</>
                : <><Download size={20} /> Generate PDF</>
              }
            </button>

            {images.length === 0 && (
              <p className="text-center text-xs text-slate-400">Add at least one image to convert</p>
            )}

            {/* Info box */}
            <div className="card p-4 bg-violet-50 dark:bg-violet-500/5 border-violet-200 dark:border-violet-700/30">
              <p className="text-xs text-violet-700 dark:text-violet-400 font-medium mb-1">✅ 100% Private</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Everything runs in your browser. No images are uploaded to any server.</p>
            </div>
          </div>
        </div>
        )}
        
        {activeTab !== 'image-to-pdf' && (
          <div className="card p-12 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-violet-100 dark:bg-violet-500/20 text-violet-500 rounded-2xl flex items-center justify-center mb-6 border border-violet-200 dark:border-violet-800">
              <Upload size={36} />
            </div>
            <h2 className="text-xl font-bold mb-2">Upload File to Convert</h2>
            <p className="text-slate-500 text-sm mb-6 text-center max-w-sm">
              Please select a file from your computer to convert it using our AI-powered conversion engine.
            </p>
            <div className="flex gap-4">
                <label className="btn-primary cursor-pointer">
                  Browse Files
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleConvert(file, activeTab as 'word-to-pdf' | 'pdf-to-word');
                      }
                    }} 
                  />
                </label>
            </div>
            {isConverting && (
               <div className="mt-8 flex items-center gap-2 text-violet-600">
                 <Loader2 size={16} className="animate-spin" /> Converting your document...
               </div>
            )}
            {done && !isConverting && (
               <div className="mt-8 flex items-center gap-2 text-emerald-600">
                 <CheckCircle2 size={16} /> Download complete
               </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
