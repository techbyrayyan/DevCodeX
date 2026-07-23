'use client';
import { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, Copy, Check, RotateCcw, Plus, Trash2, Shuffle, Paintbrush } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

type GradientType = 'linear' | 'radial' | 'conic';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

const PRESETS = [
  { name: 'Sunset',       stops: [{ color: '#f97316', position: 0 }, { color: '#ec4899', position: 50 }, { color: '#8b5cf6', position: 100 }], angle: 135, type: 'linear' as GradientType },
  { name: 'Ocean',        stops: [{ color: '#06b6d4', position: 0 }, { color: '#3b82f6', position: 50 }, { color: '#6366f1', position: 100 }], angle: 160, type: 'linear' as GradientType },
  { name: 'Forest',       stops: [{ color: '#22c55e', position: 0 }, { color: '#059669', position: 50 }, { color: '#0d9488', position: 100 }], angle: 120, type: 'linear' as GradientType },
  { name: 'Cherry',       stops: [{ color: '#f43f5e', position: 0 }, { color: '#e11d48', position: 50 }, { color: '#9f1239', position: 100 }], angle: 45,  type: 'linear' as GradientType },
  { name: 'Aurora',       stops: [{ color: '#a78bfa', position: 0 }, { color: '#67e8f9', position: 50 }, { color: '#34d399', position: 100 }], angle: 135, type: 'linear' as GradientType },
  { name: 'Golden Hour',  stops: [{ color: '#fbbf24', position: 0 }, { color: '#f97316', position: 50 }, { color: '#ef4444', position: 100 }], angle: 90,  type: 'linear' as GradientType },
  { name: 'Midnight',     stops: [{ color: '#1e1b4b', position: 0 }, { color: '#312e81', position: 50 }, { color: '#4c1d95', position: 100 }], angle: 180, type: 'linear' as GradientType },
  { name: 'Cotton Candy', stops: [{ color: '#f9a8d4', position: 0 }, { color: '#c4b5fd', position: 50 }, { color: '#93c5fd', position: 100 }], angle: 135, type: 'linear' as GradientType },
  { name: 'Neon Ring',    stops: [{ color: '#06b6d4', position: 0 }, { color: '#d946ef', position: 50 }, { color: '#06b6d4', position: 100 }], angle: 0,   type: 'conic' as GradientType },
  { name: 'Solar Flare',  stops: [{ color: '#fbbf24', position: 0 }, { color: '#ef4444', position: 60 }, { color: '#1e1b4b', position: 100 }], angle: 0,   type: 'radial' as GradientType },
];

let uid = 100;
const makeId = () => String(++uid);

export default function CSSGradientGeneratorPage() {
  const { goTo } = useAuth();

  const [gradientType, setGradientType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: '1', color: '#6366f1', position: 0 },
    { id: '2', color: '#ec4899', position: 50 },
    { id: '3', color: '#f97316', position: 100 },
  ]);
  const [copied, setCopied] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Build the CSS gradient string
  const gradientCSS = useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const colorStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');

    if (gradientType === 'linear') return `linear-gradient(${angle}deg, ${colorStr})`;
    if (gradientType === 'radial') return `radial-gradient(circle, ${colorStr})`;
    return `conic-gradient(from ${angle}deg, ${colorStr})`;
  }, [stops, angle, gradientType]);

  const fullCSS = `background: ${gradientCSS};`;

  const addStop = () => {
    if (stops.length >= 8) return;
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setStops([...stops, { id: makeId(), color: randomColor, position: 50 }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  };

  const updateStop = (id: string, field: 'color' | 'position', value: string | number) => {
    setStops(stops.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const randomize = useCallback(() => {
    const count = 2 + Math.floor(Math.random() * 3);
    const newStops: ColorStop[] = [];
    for (let i = 0; i < count; i++) {
      newStops.push({
        id: makeId(),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
        position: Math.round((i / (count - 1)) * 100),
      });
    }
    setStops(newStops);
    setAngle(Math.floor(Math.random() * 360));
    const types: GradientType[] = ['linear', 'radial', 'conic'];
    setGradientType(types[Math.floor(Math.random() * 3)]);
  }, []);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setStops(preset.stops.map(s => ({ ...s, id: makeId() })));
    setAngle(preset.angle);
    setGradientType(preset.type);
  };

  const copyCSS = async () => {
    await navigator.clipboard.writeText(fullCSS);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  const copyGradient = async () => {
    await navigator.clipboard.writeText(gradientCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-8 space-y-4 sm:space-y-6 max-w-[1500px] mx-auto animate-fade-in">

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
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent leading-tight">
              CSS Gradient Generator
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Create beautiful gradients &amp; copy the CSS instantly
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={randomize} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-purple-400 hover:text-purple-600 transition-all text-sm font-medium">
            <Shuffle size={15} /> Random
          </button>
          <button onClick={copyCSS} className="flex-1 sm:flex-none btn-primary py-2.5 px-5 flex items-center justify-center gap-2 text-sm">
            {copiedCSS ? <Check size={15} className="text-emerald-300" /> : <Copy size={15} />}
            {copiedCSS ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-6">

        {/* ── Preview + Code ── */}
        <div className="space-y-4 sm:space-y-5">

          {/* Large Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Preview</p>
            <div
              className="w-full rounded-2xl transition-all duration-500"
              style={{ background: gradientCSS, minHeight: '260px', aspectRatio: '16/7' }}
            />
          </div>

          {/* CSS Code Block */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">CSS Code</p>
              <button onClick={copyCSS} className="text-xs font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                {copiedCSS ? <Check size={13} /> : <Copy size={13} />}
                {copiedCSS ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
              <span className="text-purple-400">background</span>
              <span className="text-slate-400">: </span>
              <span className="text-emerald-400">{gradientCSS}</span>
              <span className="text-slate-400">;</span>
            </div>
          </div>

          {/* Small Preview Shapes */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Shape Previews</p>
            <div className="flex flex-wrap gap-3">
              <div className="w-20 h-20 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700 transition-all" style={{ background: gradientCSS }} />
              <div className="w-20 h-20 rounded-full shadow-inner border border-slate-200 dark:border-slate-700 transition-all" style={{ background: gradientCSS }} />
              <div className="w-32 h-20 rounded-xl shadow-inner border border-slate-200 dark:border-slate-700 transition-all" style={{ background: gradientCSS }} />
              <div className="flex-1 min-w-[120px] h-20 rounded-xl shadow-inner border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center" style={{ background: gradientCSS }}>
                <span className="text-white font-bold text-sm drop-shadow-md">Button</span>
              </div>
            </div>
          </div>

          {/* Presets */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Paintbrush size={13} /> Presets
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PRESETS.map((preset) => {
                const sortedStops = [...preset.stops].sort((a, b) => a.position - b.position);
                const colorStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
                let bg: string;
                if (preset.type === 'linear') bg = `linear-gradient(${preset.angle}deg, ${colorStr})`;
                else if (preset.type === 'radial') bg = `radial-gradient(circle, ${colorStr})`;
                else bg = `conic-gradient(from ${preset.angle}deg, ${colorStr})`;

                return (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="group relative rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all hover:scale-105"
                  >
                    <div className="h-14 sm:h-16" style={{ background: bg }} />
                    <p className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 py-1.5 text-center bg-white dark:bg-slate-900">{preset.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Controls Panel ── */}
        <div className="lg:sticky lg:top-6 h-max space-y-4 sm:space-y-5">

          {/* Gradient Type */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Gradient Type</p>
            <div className="grid grid-cols-3 gap-2">
              {(['linear', 'radial', 'conic'] as GradientType[]).map(t => (
                <button
                  key={t}
                  onClick={() => setGradientType(t)}
                  className={`py-2.5 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all border-2 ${
                    gradientType === t
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Angle Slider */}
          {(gradientType === 'linear' || gradientType === 'conic') && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {gradientType === 'linear' ? 'Direction' : 'Start Angle'}
                </p>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">{angle}°</span>
              </div>
              <input
                type="range" min={0} max={360} value={angle}
                onChange={e => setAngle(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              {/* Quick angles */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                  <button
                    key={a}
                    onClick={() => setAngle(a)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                      angle === a ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {a}°
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Stops */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Color Stops <span className="text-slate-300 dark:text-slate-600">({stops.length}/8)</span>
              </p>
              <button
                onClick={addStop}
                disabled={stops.length >= 8}
                className="flex items-center gap-1 text-xs font-medium text-indigo-500 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1.5 rounded-lg"
              >
                <Plus size={13} /> Add
              </button>
            </div>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto smooth-scroll pr-1">
              {[...stops].sort((a, b) => a.position - b.position).map((stop) => (
                <div key={stop.id} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  {/* Color picker */}
                  <label className="relative shrink-0 cursor-pointer">
                    <div
                      className="w-9 h-9 rounded-lg border-2 border-white dark:border-slate-700 shadow-md transition-transform hover:scale-110"
                      style={{ backgroundColor: stop.color }}
                    />
                    <input
                      type="color"
                      value={stop.color}
                      onChange={e => updateStop(stop.id, 'color', e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </label>

                  {/* Hex input */}
                  <input
                    type="text"
                    value={stop.color}
                    onChange={e => updateStop(stop.id, 'color', e.target.value)}
                    className="input-field flex-1 text-xs font-mono py-1.5 !px-2.5 min-w-0 uppercase"
                    maxLength={7}
                  />

                  {/* Position slider */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="range" min={0} max={100} value={stop.position}
                      onChange={e => updateStop(stop.id, 'position', Number(e.target.value))}
                      className="w-16 sm:w-20 accent-indigo-500 cursor-pointer"
                    />
                    <span className="text-[10px] font-bold text-slate-400 w-7 text-right">{stop.position}%</span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="p-1 text-slate-300 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Gradient bar visualization */}
            <div
              className="h-3 rounded-full mt-3 border border-slate-200 dark:border-slate-700"
              style={{ background: `linear-gradient(90deg, ${[...stops].sort((a, b) => a.position - b.position).map(s => `${s.color} ${s.position}%`).join(', ')})` }}
            />
          </div>

          {/* Quick Copy Buttons */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Quick Copy</p>
            <button onClick={copyCSS} className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors text-xs font-medium text-slate-600 dark:text-slate-300 group">
              <span className="truncate font-mono">background: ...</span>
              <span className="text-indigo-500 group-hover:text-indigo-600 shrink-0 flex items-center gap-1">
                {copiedCSS ? <Check size={12} /> : <Copy size={12} />}
                {copiedCSS ? 'Done' : 'Copy'}
              </span>
            </button>
            <button onClick={copyGradient} className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors text-xs font-medium text-slate-600 dark:text-slate-300 group">
              <span className="truncate font-mono">gradient value only</span>
              <span className="text-indigo-500 group-hover:text-indigo-600 shrink-0 flex items-center gap-1">
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Done' : 'Copy'}
              </span>
            </button>
          </div>

          {/* Tips */}
          <div className="bg-purple-50 dark:bg-purple-500/10 rounded-2xl p-4 border border-purple-100 dark:border-purple-500/20 space-y-2">
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-400">💡 Tips</p>
            <ul className="text-xs text-purple-600/80 dark:text-purple-300/70 space-y-1 list-disc pl-4">
              <li>Use 2-3 colors for clean gradients</li>
              <li>Try <strong>conic</strong> type for pie-chart-like effects</li>
              <li>Click <strong>Random</strong> for surprise inspiration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
