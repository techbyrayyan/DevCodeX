'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  ArrowLeft, 
  Loader2, 
  RotateCcw,
  Edit3,
  BookOpen,
  Layout,
  Languages
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LetterData {
  subject: string;
  salutation: string;
  paragraphs: string[];
  signOff: string;
  senderSignatureName: string;
  senderSignatureTitle: string;
}

type LetterStyle = 'executive' | 'creative' | 'classic' | 'minimalist';

// Helper to convert images to Base64 to avoid CORS/canvas taint issues in PDF export
async function toBase64(url: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d')!.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(url);
    img.src = url + '?t=' + Date.now();
  });
}

export default function BusinessLetterGeneratorPage() {
  const { goTo, goBackToTools } = useAuth();
  const letterRef = useRef<HTMLDivElement>(null);

  // Editor states
  const [editorMode, setEditorMode] = useState<'form' | 'manual'>('form');
  const [letterStyle, setLetterStyle] = useState<LetterStyle>('executive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sigBase64, setSigBase64] = useState('/ceo-signature.png');
  const [logoBase64, setLogoBase64] = useState('/logo1.png');

  // Form states
  const [letterType, setLetterType] = useState('Business Proposal');
  const [tone, setTone] = useState('Professional');
  const [language, setLanguage] = useState('English');
  const [subjectInput, setSubjectInput] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [extraInstructions, setExtraInstructions] = useState('');
  const [manualText, setManualText] = useState('');

  // Sender / Recipient states
  const [sender, setSender] = useState({ name: '', title: 'CEO', company: 'DevCodeX', email: '', phone: '', address: '' });
  const [recipient, setRecipient] = useState({ name: '', title: '', company: '', address: '' });

  // Letter data (populated after AI generation)
  const [letterData, setLetterData] = useState<LetterData>({
    subject: 'RE: Business Proposal',
    salutation: 'Dear Sir/Madam,',
    paragraphs: [
      'We hope this letter finds you well. We are writing to introduce our services and explore potential opportunities for a mutually beneficial partnership.',
      'Our team specializes in delivering high-quality solutions tailored to meet the specific needs of our clients. We believe our expertise aligns perfectly with your requirements.',
      'We would be delighted to discuss this further at your earliest convenience. Please feel free to reach out to us at any time.',
    ],
    signOff: 'Yours sincerely,',
    senderSignatureName: sender.name || 'Sender Name',
    senderSignatureTitle: sender.title || 'CEO',
  });

  useEffect(() => {
    toBase64('/ceo-signature.png').then(setSigBase64);
    toBase64('/logo1.png').then(setLogoBase64);
  }, []);

  const parseManualText = (text: string) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const salutationIdx = lines.findIndex(l => /^(dear|to whom|hi |hello )/i.test(l));
    // findLastIndex replacement for broader TS target support
    let signOffIdx = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (/^(yours|sincerely|regards|best|warm|respectfully|faithfully)/i.test(lines[i])) { signOffIdx = i; break; }
    }
    const subject = lines[0] || '';
    const salutation = salutationIdx >= 0 ? lines[salutationIdx] : 'Dear Sir/Madam,';
    const bodyStart = Math.max(salutationIdx + 1, 1);
    const bodyEnd = signOffIdx > 0 ? signOffIdx : lines.length;
    const paragraphs = lines.slice(bodyStart, bodyEnd).filter(l => l.length > 0);
    const signOff = signOffIdx >= 0 ? lines[signOffIdx] : 'Yours sincerely,';

    setLetterData(prev => ({
      ...prev,
      subject: subject || prev.subject,
      salutation,
      paragraphs: paragraphs.length > 0 ? paragraphs : prev.paragraphs,
      signOff,
    }));
  };

  // Generate letter using Gemini AI
  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setErrorMsg('');
    try {
      const prompt = `You are a senior business communications expert. Write a ${letterType} letter with the following details:
- Tone: ${tone}
- Language: ${language}
- From: ${sender.name || 'Sender'} (${sender.title || 'Director'}), ${sender.company || 'Company'}
- To: ${recipient.name || 'Recipient'} (${recipient.title || ''}), ${recipient.company || ''}
- Subject: ${subjectInput || 'Auto-generate a professional subject'}
- Key Points to cover: ${keyPoints || 'Standard professional communication'}
- Additional instructions: ${extraInstructions || 'None'}

Return ONLY a raw JSON object (no markdown, no backticks):
{
  "subject": "...",
  "salutation": "...",
  "paragraphs": ["paragraph1", "paragraph2", "paragraph3"],
  "signOff": "...",
  "senderSignatureName": "${sender.name || 'Sender Name'}",
  "senderSignatureTitle": "${sender.title || 'CEO'}"
}`;

      const savedApiKey = typeof window !== 'undefined' ? localStorage.getItem('dx_settings_api_key') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (savedApiKey) headers['X-Gemini-API-Key'] = savedApiKey;

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers,
        body: JSON.stringify({ prompt, model: 'gemini-flash-latest' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'AI generation failed');

      let text = data.result || '';
      text = text.replace(/```json|```/gi, '').trim();
      const parsed = JSON.parse(text);

      setLetterData({
        subject: parsed.subject || letterData.subject,
        salutation: parsed.salutation || letterData.salutation,
        paragraphs: Array.isArray(parsed.paragraphs) ? parsed.paragraphs : letterData.paragraphs,
        signOff: parsed.signOff || letterData.signOff,
        senderSignatureName: parsed.senderSignatureName || sender.name,
        senderSignatureTitle: parsed.senderSignatureTitle || sender.title,
      });
    } catch (e: any) {
      setErrorMsg(e.message || 'AI generation failed. Please check your API key or try again.');
    } finally {
      setIsGenerating(false);
    }
  };



  const downloadPDF = async () => {
    const element = letterRef.current;
    if (!element || isDownloading) return;
    setIsDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 3000,
        removeContainer: true,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.85);
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageW = 210, pageH = 297, margin = 10;
      const usableW = pageW - margin * 2;
      const usableH = pageH - margin * 2;

      const canvasAspect = canvas.height / canvas.width;
      const imgH = usableW * canvasAspect;

      if (imgH <= usableH) {
        pdf.addImage(imgData, 'JPEG', margin, margin, usableW, imgH, undefined, 'FAST');
      } else {
        const pageHeightPx = Math.floor(canvas.width * (usableH / usableW));
        let yOffset = 0, firstPage = true;
        while (yOffset < canvas.height) {
          const sliceH = Math.min(pageHeightPx, canvas.height - yOffset);
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceH;
          sliceCanvas.getContext('2d')!.drawImage(canvas, 0, yOffset, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
          const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.85);
          if (!firstPage) pdf.addPage();
          pdf.addImage(sliceData, 'JPEG', margin, margin, usableW, usableW * (sliceH / canvas.width), undefined, 'FAST');
          yOffset += sliceH;
          firstPage = false;
        }
      }
      pdf.save(`${letterStyle.replace(/\s+/g, '_')}_Letter.pdf`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = async () => {
    const text = [
      letterData.subject,
      '',
      letterData.salutation,
      '',
      ...letterData.paragraphs,
      '',
      letterData.signOff,
      letterData.senderSignatureName,
      letterData.senderSignatureTitle,
    ].join('\n');
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Letterhead Layout Styling classes
  const getStyleCard = () => {
    switch (letterStyle) {
      case 'executive':
        return {
          headerBar: 'h-2 w-full bg-slate-900 absolute top-0 left-0',
          senderCol: 'text-slate-800 text-right',
          logoSpace: 'w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xl mb-2 ml-auto',
          accentBorder: 'border-l-2 border-slate-900 pl-4 py-2 my-6'
        };
      case 'creative':
        return {
          headerBar: 'h-3 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute top-0 left-0',
          senderCol: 'text-indigo-950',
          logoSpace: 'w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mb-2',
          accentBorder: 'border-l-2 border-indigo-500 pl-4 py-2 my-6'
        };
      case 'classic':
        return {
          headerBar: '',
          senderCol: 'text-slate-900 border-b border-slate-200 pb-4 mb-4',
          logoSpace: 'hidden',
          accentBorder: 'py-2 my-6 font-semibold'
        };
      case 'minimalist':
        return {
          headerBar: '',
          senderCol: 'text-slate-600 text-sm italic',
          logoSpace: 'hidden',
          accentBorder: 'pl-4 border-l border-slate-300 py-1 my-5 text-slate-900'
        };
    }
  };

  const styleClasses = getStyleCard();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={goBackToTools}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-indigo-500/20 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 shrink-0"
              title="Go back to dashboard"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                AI Business Letter Generator
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Generate executive-level letters, corporate inquiries, job offers, or proposals in seconds.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={copyToClipboard}
              className="btn-secondary py-2.5 px-4 text-sm flex items-center justify-center gap-2 flex-1 sm:flex-initial"
            >
              {isCopied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              {isCopied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="btn-primary py-2.5 px-5 text-sm flex items-center justify-center gap-2 shadow-indigo-500/20 shadow-md flex-1 sm:flex-initial disabled:opacity-60"
            >
              <Download size={16} />
              {isDownloading ? 'Generating…' : 'Export to PDF'}
            </button>
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="p-4 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl border border-rose-200 dark:border-rose-500/20 text-sm font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Two Column Workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_600px] gap-6">

          {/* LEFT COLUMN: Setup Form & Editor */}
          <div className="space-y-6">

            {/* Mode Selector Tabs */}
            <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl flex gap-1 w-fit">
              <button
                onClick={() => setEditorMode('form')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  editorMode === 'form'
                    ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Sparkles size={14} className={editorMode === 'form' ? 'text-indigo-500' : ''} />
                AI Configuration
              </button>
              <button
                onClick={() => setEditorMode('manual')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  editorMode === 'manual'
                    ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Edit3 size={14} className={editorMode === 'manual' ? 'text-indigo-500' : ''} />
                Editor Mode
              </button>
            </div>

            <AnimatePresence mode="wait">
              {editorMode === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Sender & Recipient Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sender Box */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                      <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">Sender Information</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Your Name (e.g. Qamar Shah)"
                          className="input-field text-sm"
                          value={sender.name}
                          onChange={e => setSender({ ...sender, name: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Your Title (e.g. CEO)"
                          className="input-field text-sm"
                          value={sender.title}
                          onChange={e => setSender({ ...sender, title: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Company (e.g. DevCodex)"
                          className="input-field text-sm"
                          value={sender.company}
                          onChange={e => setSender({ ...sender, company: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Sender Full Address"
                          className="input-field text-sm"
                          value={sender.address}
                          onChange={e => setSender({ ...sender, address: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Recipient Box */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                      <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">Recipient Information</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Contact Name (e.g. John Doe)"
                          className="input-field text-sm"
                          value={recipient.name}
                          onChange={e => setRecipient({ ...recipient, name: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Recipient Title (e.g. Vice President)"
                          className="input-field text-sm"
                          value={recipient.title}
                          onChange={e => setRecipient({ ...recipient, title: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Recipient Company Name"
                          className="input-field text-sm"
                          value={recipient.company}
                          onChange={e => setRecipient({ ...recipient, company: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Recipient Address Details"
                          className="input-field text-sm"
                          value={recipient.address}
                          onChange={e => setRecipient({ ...recipient, address: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Letter Details */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">Letter Configuration</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Letter Purpose</label>
                        <select
                          className="input-field text-sm"
                          value={letterType}
                          onChange={e => setLetterType(e.target.value)}
                        >
                          <option value="Business Proposal">Business Proposal</option>
                          <option value="Job Offer Letter">Job Offer Letter</option>
                          <option value="Formal Resignation">Formal Resignation</option>
                          <option value="Apology Letter">Apology Letter</option>
                          <option value="Sales Pitch Correspondence">Sales Pitch</option>
                          <option value="Information Request">Information Request</option>
                          <option value="Query / Complaint">Query / Complaint</option>
                          <option value="Executive Update">Executive Update</option>
                          <option value="Cover Letter">Cover Letter</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Tone Profile</label>
                        <select
                          className="input-field text-sm"
                          value={tone}
                          onChange={e => setTone(e.target.value)}
                        >
                          <option value="Professional">Professional & Formal</option>
                          <option value="Persuasive">Persuasive / Sales</option>
                          <option value="Assertive">Assertive & Firm</option>
                          <option value="Apologetic">Apologetic & Sympathetic</option>
                          <option value="Friendly">Warm & Cordial</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Language</label>
                        <select
                          className="input-field text-sm"
                          value={language}
                          onChange={e => setLanguage(e.target.value)}
                        >
                          <option value="English">English</option>
                          <option value="Urdu">Urdu (اردو)</option>
                          <option value="Arabic">Arabic (العربية)</option>
                          <option value="Spanish">Spanish (Español)</option>
                          <option value="German">German (Deutsch)</option>
                          <option value="French">French (Français)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Subject Selection (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. INQUIRY ABOUT CORPORATE MARKETING SPACE (Leave blank for AI generation)"
                        className="input-field text-sm"
                        value={subjectInput}
                        onChange={e => setSubjectInput(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 font-bold text-slate-600 dark:text-slate-350">
                        Primary Key Points (Mention what to talk about)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="e.g. Ask them to schedule a meeting next Wednesday. State that we are offering 20% discount on web projects. Mention our successful contract with Wayne Enterprises..."
                        className="input-field text-sm resize-none"
                        value={keyPoints}
                        onChange={e => setKeyPoints(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Custom Context / Tone Details</label>
                      <input
                        type="text"
                        placeholder="e.g. Make it brief, under 250 words total, avoid buzzwords."
                        className="input-field text-sm"
                        value={extraInstructions}
                        onChange={e => setExtraInstructions(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2 transition-all shadow-indigo-600/10 shadow-lg"
                  >
                    {isGenerating ? (
                      <><Loader2 className="animate-spin" size={20} /> Building Business Letter...</>
                    ) : (
                      <><Sparkles size={20} /> Generate Letter with Gemini AI</>
                    )}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">Raw Correspondence Editor</h3>
                    <p className="text-slate-400 text-xs">Directly edit the content below and preview on letterhead</p>
                  </div>
                  <textarea
                    rows={18}
                    className="input-field font-mono text-sm leading-relaxed p-4 h-[440px] resize-none"
                    value={manualText}
                    onChange={e => {
                      setManualText(e.target.value);
                      parseManualText(e.target.value);
                    }}
                  />
                  <div className="text-[11px] text-slate-400 italic">
                    Note: Maintain double spacing between Subject, Salutation, Body, and sign-offs for clean auto-layout structure.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* RIGHT COLUMN: Interactive Letterhead Live Preview */}
          <div className="sticky top-6 h-max">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-inner space-y-4">
              
              {/* Presets / Layout styles */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Layout size={14} /> Letterhead Preset
                </span>
                <div className="flex items-center gap-1.5 bg-slate-200 dark:bg-slate-900/50 p-1 rounded-lg">
                  {(['executive', 'creative', 'classic', 'minimalist'] as LetterStyle[]).map(style => (
                    <button
                      key={style}
                      onClick={() => setLetterStyle(style)}
                      className={`px-2.5 py-1.5 rounded-md text-[10px] sm:text-xs font-bold capitalize transition-all ${
                        letterStyle === style 
                          ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scaled Preview Frame */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 shadow-inner flex justify-center py-6">
                <div
                  className="bg-white shadow-xl font-sans text-slate-800 origin-top text-[14px] leading-relaxed relative"
                  style={{
                    width: '595px', // Standard A4 width in px (scaled)
                    minHeight: '842px', // Standard A4 height in px (scaled)
                    padding: '50px 48px',
                    boxSizing: 'border-box',
                    transform: 'scale(0.9)', 
                    transformOrigin: 'top center',
                    marginBottom: '-84px' // Compensate scaling shift in flex columns
                  }}
                  ref={letterRef}
                >
                  {/* Presets Top Accent Line */}
                  <div className={styleClasses.headerBar} />

                  {/* Letterhead Header row */}
                  <div className="flex justify-between items-start mb-10 pt-4">
                    {/* Logo/Brand side */}
                    <div>
                      {/* Company logo from public folder */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logoBase64}
                        alt="Company Logo"
                        crossOrigin="anonymous"
                        className="h-10 object-contain mb-2"
                        style={{ maxWidth: '120px' }}
                      />
                      <p className="font-bold text-slate-900 text-base">{sender.company || 'Sender Company'}</p>
                      <p className="text-xs text-slate-400">{sender.email}</p>
                      <p className="text-xs text-slate-400">{sender.phone}</p>
                    </div>

                    {/* Sender Address side */}
                    <div className="text-right max-w-[260px]">
                      <p className="text-xs text-slate-500 whitespace-pre-wrap">{sender.address}</p>
                      <p className="text-xs text-slate-400 mt-1">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>

                  {/* Recipient Section */}
                  <div className="mb-8 pt-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">To:</p>
                    <p className="font-bold text-slate-900">{recipient.name}</p>
                    {recipient.title && <p className="text-xs text-slate-500 font-medium">{recipient.title}</p>}
                    {recipient.company && <p className="text-xs text-slate-600 font-semibold">{recipient.company}</p>}
                    <p className="text-xs text-slate-500 mt-1 whitespace-pre-line max-w-[320px]">{recipient.address}</p>
                  </div>

                  {/* Letter Subject */}
                  <div className="mb-6">
                    <p className="font-bold text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-xs">
                      {letterData.subject}
                    </p>
                  </div>

                  {/* Salutation */}
                  <p className="font-medium text-slate-800 mb-4">{letterData.salutation}</p>

                  {/* Body Paragraphs */}
                  <div className="space-y-4 text-slate-700 min-h-[220px]">
                    {letterData.paragraphs.map((para, index) => (
                      <p key={index} className="text-xs leading-relaxed whitespace-pre-wrap text-justify">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Sign-off & Signatures */}
                  <div className="mt-8 pt-4 pb-4">
                    <p className="text-xs text-slate-600 mb-8">{letterData.signOff}</p>
                    
                    <div>
                      {/* CEO Signature image insert */}
                      <div className="h-14 flex items-end mb-1 bg-transparent">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={sigBase64} 
                          alt="CEO Signature" 
                          crossOrigin="anonymous"
                          className="h-12 object-contain opacity-90 mix-blend-multiply" 
                        />
                      </div>
                      <div className="w-40 border-b border-slate-300 mb-1.5" />
                      <p className="text-[10px] text-slate-500 font-semibold">{letterData.senderSignatureTitle}</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      <style jsx global>{`
        .exporting-pdf {
          transform: scale(1) !important;
          margin: 0 !important;
          width: 595px !important;
          max-width: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </DashboardLayout>
  );
}
