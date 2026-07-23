'use client';
import { useState, useRef, useEffect } from 'react';
import { Download, Plus, Trash2, User, Mail, Phone, Briefcase, GraduationCap, Code, ArrowLeft, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';

// ─── Resume Design Templates ────────────────────────────────────────
type TemplateKey = 'modern' | 'executive' | 'creative' | 'minimal';

const TEMPLATES: { key: TemplateKey; label: string; accent: string; bg: string; sidebar: string; text: string; badge: string }[] = [
  {
    key: 'modern',
    label: 'Modern',
    accent: '#6366f1',
    bg: '#f8f7ff',
    sidebar: '#6366f1',
    text: '#1e1b4b',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  {
    key: 'executive',
    label: 'Executive',
    accent: '#0f172a',
    bg: '#f8fafc',
    sidebar: '#0f172a',
    text: '#0f172a',
    badge: 'bg-slate-100 text-slate-700',
  },
  {
    key: 'creative',
    label: 'Creative',
    accent: '#db2777',
    bg: '#fff0f7',
    sidebar: '#db2777',
    text: '#831843',
    badge: 'bg-pink-100 text-pink-700',
  },
  {
    key: 'minimal',
    label: 'Minimal',
    accent: '#059669',
    bg: '#f0fdf4',
    sidebar: '#059669',
    text: '#064e3b',
    badge: 'bg-emerald-100 text-emerald-700',
  },
];

export default function ResumeBuilderPage() {
  const { goTo } = useAuth();
  const resumeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('modern');
  const [previewScale, setPreviewScale] = useState(0.8);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const padding = 24; // 12px padding on each side
      const targetWidth = containerWidth - padding;
      const newScale = Math.min(1, targetWidth / 794);
      setPreviewScale(newScale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    location: 'San Francisco, CA',
    website: '',
    summary: 'A highly motivated software engineer with 5+ years of experience building scalable web applications. Passionate about AI, cloud architecture, and creating seamless user experiences.',
  });

  const [experience, setExperience] = useState([
    { id: '1', title: 'Senior Developer', company: 'TechNova', start: '2020', end: 'Present', desc: 'Led a team of 5 developers to build a modern SaaS platform.' },
  ]);

  const [education, setEducation] = useState([
    { id: '1', degree: 'B.S. Computer Science', school: 'MIT', year: '2019' },
  ]);

  const [skills, setSkills] = useState('React, Next.js, Node.js, TypeScript, TailwindCSS, MongoDB, AWS');

  const addExperience = () =>
    setExperience([...experience, { id: Date.now().toString(), title: '', company: '', start: '', end: '', desc: '' }]);
  const updateExperience = (id: string, field: string, value: string) =>
    setExperience(experience.map(e => (e.id === id ? { ...e, [field]: value } : e)));
  const removeExperience = (id: string) => setExperience(experience.filter(e => e.id !== id));

  const addEducation = () =>
    setEducation([...education, { id: Date.now().toString(), degree: '', school: '', year: '' }]);
  const updateEducation = (id: string, field: string, value: string) =>
    setEducation(education.map(e => (e.id === id ? { ...e, [field]: value } : e)));
  const removeEducation = (id: string) => setEducation(education.filter(e => e.id !== id));

  const downloadPDF = async () => {
    if (typeof window === 'undefined') return;
    const html2pdf = (await import('html2pdf.js')).default;
    const element = resumeRef.current;
    if (!element) return;
    element.classList.add('exporting-pdf');
    html2pdf().from(element).set({
      margin: [0, 0],
      filename: `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).save().then(() => {
      element.classList.remove('exporting-pdf');
    });
  };

  const tpl = TEMPLATES.find(t => t.key === selectedTemplate)!;

  // ─── Resume Document ─────────────────────────────────────────────
  // ─── Resume Document ─────────────────────────────────────────────
  const ResumeDoc = () => {
    const wrapperStyle = {
      width: '794px',
      minHeight: '1123px',
      backgroundColor: tpl.bg,
      fontFamily: 'Helvetica, Arial, sans-serif',
      color: tpl.text,
      boxSizing: 'border-box' as const,
      display: 'flex',
      flexDirection: 'column' as const,
    };

    if (selectedTemplate === 'modern') {
      return (
        <div ref={resumeRef} style={wrapperStyle}>
          <div style={{ backgroundColor: tpl.sidebar, color: 'white', padding: '36px 48px 28px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <h1 style={{ fontSize: '34px', fontWeight: 'bold', margin: '0 0 6px', letterSpacing: '-0.5px' }}>{personalInfo.name || 'Your Name'}</h1>
              <h2 style={{ fontSize: '16px', fontWeight: '400', margin: '0', opacity: 0.85, letterSpacing: '0.5px' }}>{personalInfo.title || 'Your Title'}</h2>
            </div>
            <div style={{ textAlign: 'right', fontSize: '11px', opacity: 0.85, lineHeight: '1.8' }}>
              {personalInfo.email && <div>✉ {personalInfo.email}</div>}
              {personalInfo.phone && <div>✆ {personalInfo.phone}</div>}
              {personalInfo.location && <div>⊙ {personalInfo.location}</div>}
              {personalInfo.website && <div>🌐 {personalInfo.website}</div>}
            </div>
          </div>
          <div style={{ padding: '36px 48px', flex: 1 }}>
            {personalInfo.summary && (
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: tpl.accent, borderBottom: `2px solid ${tpl.accent}`, paddingBottom: '6px', marginBottom: '12px' }}>Professional Summary</h3>
                <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#374151', whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
              </div>
            )}
            {experience.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: tpl.accent, borderBottom: `2px solid ${tpl.accent}`, paddingBottom: '6px', marginBottom: '16px' }}>Work Experience</h3>
                {experience.map(exp => (
                  <div key={exp.id} style={{ marginBottom: '20px', paddingLeft: '12px', borderLeft: `3px solid ${tpl.accent}20` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{exp.title || 'Job Title'}</h4>
                      <span style={{ fontSize: '11px', color: 'white', backgroundColor: tpl.accent, padding: '2px 8px', borderRadius: '12px', opacity: 0.9 }}>
                        {exp.start}{exp.start || exp.end ? ' – ' : ''}{exp.end}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: tpl.accent, fontWeight: '600', margin: '0 0 6px' }}>{exp.company}</p>
                    <p style={{ fontSize: '12px', lineHeight: '1.65', color: '#4b5563', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.desc}</p>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {education.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: tpl.accent, borderBottom: `2px solid ${tpl.accent}`, paddingBottom: '6px', marginBottom: '14px' }}>Education</h3>
                  {education.map(edu => (
                    <div key={edu.id} style={{ marginBottom: '14px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 2px' }}>{edu.degree || 'Degree'}</h4>
                      <p style={{ fontSize: '12px', color: tpl.accent, margin: '0 0 2px' }}>{edu.school}</p>
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{edu.year}</p>
                    </div>
                  ))}
                </div>
              )}
              {skills && (
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: tpl.accent, borderBottom: `2px solid ${tpl.accent}`, paddingBottom: '6px', marginBottom: '14px' }}>Skills</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skills.split(',').map((skill, i) => (
                      <span key={i} style={{ backgroundColor: `${tpl.accent}18`, color: tpl.accent, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', border: `1px solid ${tpl.accent}30` }}>{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div style={{ height: '8px', backgroundColor: tpl.accent, opacity: 0.3 }} />
        </div>
      );
    } 
    
    if (selectedTemplate === 'executive') {
      return (
        <div ref={resumeRef} style={{ ...wrapperStyle, flexDirection: 'row' }}>
          <div style={{ backgroundColor: tpl.sidebar, color: 'white', width: '280px', padding: '40px 30px', flexShrink: 0 }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px', lineHeight: '1.2' }}>{personalInfo.name || 'Your Name'}</h1>
              <h2 style={{ fontSize: '14px', fontWeight: '500', margin: '0', opacity: 0.9, color: tpl.bg }}>{personalInfo.title || 'Your Title'}</h2>
            </div>
            <div style={{ marginTop: '40px', fontSize: '12px', opacity: 0.9, lineHeight: '2' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px', marginBottom: '16px' }}>Contact</h3>
              {personalInfo.email && <div style={{ display: 'flex', gap: '8px' }}><span>✉</span> <span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span></div>}
              {personalInfo.phone && <div style={{ display: 'flex', gap: '8px' }}><span>✆</span> <span>{personalInfo.phone}</span></div>}
              {personalInfo.location && <div style={{ display: 'flex', gap: '8px' }}><span>⊙</span> <span>{personalInfo.location}</span></div>}
              {personalInfo.website && <div style={{ display: 'flex', gap: '8px' }}><span>🌐</span> <span style={{ wordBreak: 'break-all' }}>{personalInfo.website}</span></div>}
            </div>
            {skills && (
               <div style={{ marginTop: '40px' }}>
                 <h3 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px', marginBottom: '16px' }}>Skills</h3>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.split(',').map((skill, i) => (
                      <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '11px' }}>{skill.trim()}</span>
                    ))}
                  </div>
               </div>
            )}
          </div>
          <div style={{ flex: 1, padding: '40px', backgroundColor: 'white' }}>
            {personalInfo.summary && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: tpl.sidebar, marginBottom: '12px' }}>Profile</h3>
                <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#4b5563', whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
              </div>
            )}
            {experience.length > 0 && (
               <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: tpl.sidebar, marginBottom: '20px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>Experience</h3>
                {experience.map(exp => (
                  <div key={exp.id} style={{ marginBottom: '24px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>{exp.title || 'Job Title'}</h4>
                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                          {exp.start}{exp.start || exp.end ? ' – ' : ''}{exp.end}
                        </span>
                     </div>
                     <p style={{ fontSize: '13px', color: tpl.sidebar, fontWeight: '600', margin: '0 0 8px' }}>{exp.company}</p>
                     <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#475569', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.desc}</p>
                  </div>
                ))}
               </div>
            )}
            {education.length > 0 && (
               <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: tpl.sidebar, marginBottom: '20px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>Education</h3>
                  {education.map(edu => (
                    <div key={edu.id} style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                       <div>
                         <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px', color: '#1e293b' }}>{edu.degree || 'Degree'}</h4>
                         <p style={{ fontSize: '13px', color: tpl.sidebar, margin: 0 }}>{edu.school}</p>
                       </div>
                       <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{edu.year}</span>
                    </div>
                  ))}
               </div>
            )}
          </div>
        </div>
      );
    }
    
    if (selectedTemplate === 'creative') {
       return (
        <div ref={resumeRef} style={{ ...wrapperStyle, padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
             <div style={{ width: '80px', height: '8px', backgroundColor: tpl.accent, margin: '0 auto 20px', borderRadius: '4px' }}></div>
             <h1 style={{ fontSize: '42px', fontWeight: '900', margin: '0 0 10px', color: tpl.text, textTransform: 'uppercase', letterSpacing: '2px' }}>{personalInfo.name || 'Your Name'}</h1>
             <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 20px', color: tpl.accent, letterSpacing: '1px' }}>{personalInfo.title || 'Your Title'}</h2>
             
             <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '12px', color: '#4b5563', fontWeight: '500' }}>
               {personalInfo.email && <span>{personalInfo.email}</span>}
               {personalInfo.phone && <span>• {personalInfo.phone}</span>}
               {personalInfo.location && <span>• {personalInfo.location}</span>}
               {personalInfo.website && <span>• {personalInfo.website}</span>}
             </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '40px' }}>
             <div>
                {personalInfo.summary && (
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: tpl.text, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <span style={{ width: '24px', height: '24px', backgroundColor: tpl.accent, borderRadius: '50%', display: 'inline-block' }}></span>
                       Profile
                    </h3>
                    <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#374151', whiteSpace: 'pre-wrap' }}>{personalInfo.summary}</p>
                  </div>
                )}
                {experience.length > 0 && (
                  <div style={{ marginBottom: '32px' }}>
                     <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: tpl.text, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '24px', height: '24px', backgroundColor: tpl.accent, borderRadius: '50%', display: 'inline-block' }}></span>
                        Experience
                     </h3>
                     <div style={{ borderLeft: `2px solid ${tpl.accent}`, paddingLeft: '24px', marginLeft: '11px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {experience.map(exp => (
                          <div key={exp.id} style={{ position: 'relative' }}>
                             <div style={{ position: 'absolute', left: '-31.5px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'white', border: `3px solid ${tpl.accent}` }}></div>
                             <span style={{ fontSize: '11px', fontWeight: 'bold', color: tpl.accent, display: 'block', marginBottom: '4px' }}>{exp.start}{exp.start || exp.end ? ' – ' : ''}{exp.end}</span>
                             <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 2px', color: tpl.text }}>{exp.title || 'Job Title'}</h4>
                             <p style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', margin: '0 0 10px' }}>{exp.company}</p>
                             <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#4b5563', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.desc}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                )}
             </div>
             <div>
                {skills && (
                  <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: tpl.text, marginBottom: '16px' }}>Expertise</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                       {skills.split(',').map((skill, i) => (
                         <div key={i}>
                           <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>{skill.trim()}</span>
                           <div style={{ width: '100%', height: '6px', backgroundColor: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${Math.random() * 40 + 60}%`, height: '100%', backgroundColor: tpl.accent }}></div>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
                {education.length > 0 && (
                  <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                     <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: tpl.text, marginBottom: '16px' }}>Education</h3>
                     {education.map(edu => (
                       <div key={edu.id} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px', color: tpl.text }}>{edu.degree || 'Degree'}</h4>
                          <p style={{ fontSize: '12px', color: tpl.accent, fontWeight: '600', margin: '0 0 4px' }}>{edu.school}</p>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{edu.year}</p>
                       </div>
                     ))}
                  </div>
                )}
             </div>
          </div>
        </div>
       )
    }

    return (
      <div ref={resumeRef} style={{ ...wrapperStyle, padding: '50px 60px', fontFamily: 'Georgia, serif' }}>
         <div style={{ textAlign: 'center', borderBottom: `1px solid ${tpl.accent}`, paddingBottom: '30px', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'normal', margin: '0 0 10px', color: tpl.text, letterSpacing: '1px' }}>{personalInfo.name || 'Your Name'}</h1>
            {personalInfo.title && <h2 style={{ fontSize: '16px', fontStyle: 'italic', margin: '0 0 16px', color: '#4b5563' }}>{personalInfo.title}</h2>}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: '#374151' }}>
               {personalInfo.email && <span>{personalInfo.email}</span>}
               {personalInfo.phone && <span>| {personalInfo.phone}</span>}
               {personalInfo.location && <span>| {personalInfo.location}</span>}
            </div>
            {personalInfo.website && <div style={{ fontSize: '12px', color: '#374151', marginTop: '8px' }}>{personalInfo.website}</div>}
         </div>
         
         {personalInfo.summary && (
           <div style={{ marginBottom: '30px' }}>
             <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#374151', textAlign: 'center', maxWidth: '600px', margin: '0 auto', fontStyle: 'italic' }}>
                "{personalInfo.summary}"
             </p>
           </div>
         )}
         
         {experience.length > 0 && (
           <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: tpl.text, textAlign: 'center', marginBottom: '24px' }}>Professional Experience</h3>
              {experience.map(exp => (
                 <div key={exp.id} style={{ marginBottom: '24px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: tpl.text, margin: 0 }}>{exp.title} <span style={{ fontWeight: 'normal', color: '#4b5563' }}>at {exp.company}</span></h4>
                      <span style={{ fontSize: '12px', fontStyle: 'italic', color: '#6b7280' }}>
                         {exp.start}{exp.start || exp.end ? ' – ' : ''}{exp.end}
                      </span>
                   </div>
                   <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#4b5563', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.desc}</p>
                 </div>
              ))}
           </div>
         )}
         
         <div style={{ display: 'flex', gap: '40px' }}>
           {education.length > 0 && (
             <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: tpl.text, textAlign: 'center', marginBottom: '20px' }}>Education</h3>
                {education.map(edu => (
                   <div key={edu.id} style={{ marginBottom: '16px', textAlign: 'center' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px', color: tpl.text }}>{edu.degree}</h4>
                      <p style={{ fontSize: '13px', margin: '0 0 4px', color: '#4b5563' }}>{edu.school}</p>
                      <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#6b7280', margin: 0 }}>{edu.year}</p>
                   </div>
                ))}
             </div>
           )}
           {skills && (
              <div style={{ flex: 1 }}>
                 <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: tpl.text, textAlign: 'center', marginBottom: '20px' }}>Skills & Abilities</h3>
                 <div style={{ textAlign: 'center', lineHeight: '1.8' }}>
                    {skills.split(',').map((skill, i) => (
                      <span key={i} style={{ fontSize: '13px', color: '#374151' }}>
                         {skill.trim()}{i < skills.split(',').length - 1 ? ' • ' : ''}
                      </span>
                    ))}
                 </div>
              </div>
           )}
         </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-8 space-y-4 sm:space-y-6 max-w-[1700px] mx-auto animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => goTo('dashboard')}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-indigo-500/20 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 shrink-0"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
              AI Resume Builder
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Create beautiful ATS-friendly resumes with stunning designs
            </p>
          </div>
        </div>
        <button
          onClick={downloadPDF}
          className="btn-primary shrink-0 py-2.5 px-5 sm:py-3 sm:px-6 shadow-indigo-500/25 text-sm sm:text-base w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Export to PDF
        </button>
      </div>

      {/* ── Template Picker ── */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Palette size={16} className="text-indigo-500" />
          <h2 className="font-bold text-sm text-slate-700 dark:text-slate-300">Choose a Design Template</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TEMPLATES.map(t => (
            <button
              key={t.key}
              onClick={() => setSelectedTemplate(t.key)}
              className={`relative rounded-xl border-2 p-3 transition-all text-left overflow-hidden ${
                selectedTemplate === t.key
                  ? 'border-indigo-500 shadow-md shadow-indigo-200 dark:shadow-indigo-900/30'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
              }`}
            >
              {/* Color swatch preview */}
              <div className="w-full h-12 rounded-lg mb-2 flex overflow-hidden">
                <div style={{ backgroundColor: t.sidebar, width: '30%' }} />
                <div style={{ backgroundColor: t.bg, width: '70%' }} className="flex flex-col justify-end p-1.5 gap-1">
                  <div style={{ backgroundColor: t.accent, height: '3px', width: '60%', borderRadius: '2px' }} />
                  <div style={{ backgroundColor: t.accent, height: '2px', width: '40%', borderRadius: '2px', opacity: 0.4 }} />
                  <div style={{ backgroundColor: '#94a3b8', height: '2px', width: '80%', borderRadius: '2px', opacity: 0.3 }} />
                </div>
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.label}</p>
              {selectedTemplate === t.key && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Two Column Layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_700px] gap-4 sm:gap-6 lg:gap-8">

        {/* ── Editor Form ── */}
        <div className="space-y-4 sm:space-y-6">

          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-5"
          >
            <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <User className="text-indigo-500 shrink-0" size={18} /> Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">Full Name</label>
                <input type="text" className="input-field w-full" value={personalInfo.name} onChange={e => setPersonalInfo({ ...personalInfo, name: e.target.value })} placeholder="e.g. Elon Musk" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">Professional Title</label>
                <input type="text" className="input-field w-full" value={personalInfo.title} onChange={e => setPersonalInfo({ ...personalInfo, title: e.target.value })} placeholder="e.g. Product Manager" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">Email Address</label>
                <input type="email" className="input-field w-full" value={personalInfo.email} onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })} placeholder="you@domain.com" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                <input type="text" className="input-field w-full" value={personalInfo.phone} onChange={e => setPersonalInfo({ ...personalInfo, phone: e.target.value })} placeholder="+1 234 567 8900" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">Location</label>
                <input type="text" className="input-field w-full" value={personalInfo.location} onChange={e => setPersonalInfo({ ...personalInfo, location: e.target.value })} placeholder="City, Country" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">Website / LinkedIn</label>
                <input type="text" className="input-field w-full" value={personalInfo.website} onChange={e => setPersonalInfo({ ...personalInfo, website: e.target.value })} placeholder="linkedin.com/in/yourname" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">Professional Summary</label>
                <textarea className="input-field min-h-[90px] w-full resize-none" value={personalInfo.summary} onChange={e => setPersonalInfo({ ...personalInfo, summary: e.target.value })} placeholder="Brief professional summary..." />
              </div>
            </div>
          </motion.div>

          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-5"
          >
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Briefcase className="text-blue-500 shrink-0" size={18} /> Work Experience
              </h2>
              <button onClick={addExperience} className="text-xs sm:text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors shrink-0">
                <Plus size={14} /> Add
              </button>
            </div>
            <AnimatePresence>
              {experience.map((exp) => (
                <motion.div key={exp.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-3 sm:p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl relative space-y-3">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-2.5 right-2.5 text-slate-400 hover:text-red-500 transition-colors p-1 z-10"><Trash2 size={15} /></button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Job Title</label>
                      <input type="text" className="input-field bg-white dark:bg-slate-900 w-full text-sm" value={exp.title} onChange={e => updateExperience(exp.id, 'title', e.target.value)} />
                    </div>
                    <div className="pr-7">
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Company</label>
                      <input type="text" className="input-field bg-white dark:bg-slate-900 w-full text-sm" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Start Date</label>
                      <input type="text" className="input-field bg-white dark:bg-slate-900 w-full text-sm" value={exp.start} onChange={e => updateExperience(exp.id, 'start', e.target.value)} placeholder="e.g. Jan 2020" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">End Date</label>
                      <input type="text" className="input-field bg-white dark:bg-slate-900 w-full text-sm" value={exp.end} onChange={e => updateExperience(exp.id, 'end', e.target.value)} placeholder="e.g. Present" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Description</label>
                      <textarea className="input-field bg-white dark:bg-slate-900 w-full min-h-[70px] text-sm resize-none" value={exp.desc} onChange={e => updateExperience(exp.id, 'desc', e.target.value)} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {experience.length === 0 && <p className="text-slate-400 text-sm text-center py-4">No experience added yet.</p>}
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-5"
          >
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <GraduationCap className="text-green-500 shrink-0" size={18} /> Education
              </h2>
              <button onClick={addEducation} className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1 bg-green-50 hover:bg-green-100 dark:bg-green-500/10 dark:hover:bg-green-500/20 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors shrink-0">
                <Plus size={14} /> Add
              </button>
            </div>
            <AnimatePresence>
              {education.map((edu) => (
                <motion.div key={edu.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-3 sm:p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl relative space-y-3">
                  <button onClick={() => removeEducation(edu.id)} className="absolute top-2.5 right-2.5 text-slate-400 hover:text-red-500 transition-colors p-1 z-10"><Trash2 size={15} /></button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Degree / Course</label>
                      <input type="text" className="input-field bg-white dark:bg-slate-900 w-full text-sm" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                    </div>
                    <div className="pr-7">
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Institution</label>
                      <input type="text" className="input-field bg-white dark:bg-slate-900 w-full text-sm" value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Graduation Year</label>
                      <input type="text" className="input-field bg-white dark:bg-slate-900 w-full text-sm" value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {education.length === 0 && <p className="text-slate-400 text-sm text-center py-4">No education added yet.</p>}
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-5"
          >
            <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Code className="text-orange-500 shrink-0" size={18} /> Skills
            </h2>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">Comma-separated skills</label>
              <input type="text" className="input-field w-full" value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, Node.js, Project Management" />
            </div>
            {/* Skill tag preview */}
            {skills && (
              <div className="flex flex-wrap gap-2 pt-1">
                {skills.split(',').map((skill, i) => (
                  <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold ${tpl.badge}`}>
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Live Preview ── */}
        <div className="xl:sticky xl:top-6 h-max">
          <div className="bg-slate-800 dark:bg-slate-900 p-3 sm:p-5 rounded-2xl border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                Live Preview
              </p>
              <span className="text-xs text-slate-500 font-medium capitalize">{tpl.label} Template</span>
            </div>

            {/* Scrollable preview container */}
            <div ref={containerRef} className="rounded-xl bg-white shadow-inner p-3 flex justify-center" style={{ maxHeight: '820px', overflowY: 'auto' }}>
              <div style={{ 
                width: `${794 * previewScale}px`, 
                height: `${1123 * previewScale}px`, 
                overflow: 'hidden',
                transition: 'width 0.1s, height 0.1s'
              }}>
                <div style={{ 
                  transform: `scale(${previewScale})`, 
                  transformOrigin: 'top left', 
                  width: '794px', 
                  height: '1123px' 
                }}>
                  <ResumeDoc />
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
          width: 794px !important;
          max-width: none !important;
        }
      `}</style>
    </div>
  );
}
