'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$5k - $15k',
    service: 'Web Development',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const whatsappNumber = '923239724377';
    const message = `*New Project Inquiry - DevCodeX*\n\n` +
      `*Client Name:* ${formData.name}\n` +
      `*Email Address:* ${formData.email}\n` +
      `*Company:* ${formData.company || 'Not Specified'}\n` +
      `*Budget Range:* ${formData.budget}\n` +
      `*Service Required:* ${formData.service}\n\n` +
      `*Project Scope & Requirements:*\n${formData.message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    setWhatsappLink(url);

    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };
  const inputStyle = { backgroundColor: '#050505', border: '1px solid #27272a', color: '#ffffff' };
  const iconBoxStyle = { backgroundColor: '#050505', border: '1px solid #27272a', color: '#3b82f6' };

  return (
    <PageTransition>
      <div className="space-y-20 pb-24 font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>
        
        {/* Contact Hero */}
        <section className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
              + INITIATE DISCOVERY
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
              style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
            >
              Let&apos;s Engineer Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Breakthrough</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#a1a1aa' }}>
              Fill out the inquiry form below or email us directly. We respond within 4 hours with technical scope feedback.
            </motion.p>
          </motion.div>
        </section>

        {/* Form & Direct Contact Details */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            
            {/* Left: Contact Info & Guarantees */}
            <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-8">
              <div className="hover-card rounded-2xl p-8 space-y-6" style={cardStyle}>
                <h3
                  className="text-xl font-bold"
                  style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                >
                  Direct Communication
                </h3>
                
                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg flex items-center justify-center" style={iconBoxStyle}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block uppercase font-mono" style={{ color: '#a1a1aa' }}>General Inquiries</span>
                      <span className="font-bold text-sm" style={{ color: '#ffffff' }}>hello@devcodex.com</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg flex items-center justify-center" style={iconBoxStyle}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block uppercase font-mono" style={{ color: '#a1a1aa' }}>Direct Phone / WhatsApp</span>
                      <span className="font-bold text-sm" style={{ color: '#ffffff' }}>+92 323 9724377</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg flex items-center justify-center" style={iconBoxStyle}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block uppercase font-mono" style={{ color: '#a1a1aa' }}>HQ Office</span>
                      <span className="font-bold text-sm" style={{ color: '#ffffff' }}>Lahore, Pakistan</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLAs & Guarantees Card */}
              <div className="hover-card rounded-2xl p-8 space-y-4" style={cardStyle}>
                <h4
                  className="text-sm font-bold uppercase tracking-wider font-mono"
                  style={{ color: '#ffffff' }}
                >
                  Our Client Commitment
                </h4>
                <div className="space-y-3 text-xs" style={{ color: '#a1a1aa' }}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0" style={{ color: '#3b82f6' }} />
                    <span>Instant WhatsApp Delivery & 4-Hour Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: '#3b82f6' }} />
                    <span>Strict Mutual NDA Safeguards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#3b82f6' }} />
                    <span>100% Code &amp; Asset Ownership</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={fadeInUp} className="lg:col-span-7 rounded-2xl p-8 sm:p-10 hover-glow" style={cardStyle}>
              {formSubmitted ? (
                <div className="text-center py-12 space-y-5">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ backgroundColor: '#050505', border: '1px solid #25D366', color: '#25D366' }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                    >
                      Inquiry Sent to WhatsApp!
                    </h3>
                    <p className="text-sm max-w-md mx-auto" style={{ color: '#a1a1aa' }}>
                      Your inquiry details have been formatted and dispatched to our official WhatsApp (+92 323 9724377).
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    {whatsappLink && (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-interactive inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer"
                        style={{ backgroundColor: '#25D366', color: '#ffffff' }}
                      >
                        <span>Open WhatsApp Again</span>
                        <Send className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="btn-interactive inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium cursor-pointer"
                      style={{ backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #27272a' }}
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                  >
                    Project Inquiry Form
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase" style={{ color: '#a1a1aa' }}>Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                        style={inputStyle}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase" style={{ color: '#a1a1aa' }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase" style={{ color: '#a1a1aa' }}>Company Name</label>
                      <input
                        type="text"
                        placeholder="Vance Dynamics"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                        style={inputStyle}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase" style={{ color: '#a1a1aa' }}>Target Service</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                        style={inputStyle}
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="AI & Automation">AI & Automation</option>
                        <option value="Custom Web App">Custom SaaS Web App</option>
                        <option value="E-Commerce">E-Commerce Storefront</option>
                        <option value="UI/UX Design">UI/UX & Design Systems</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase" style={{ color: '#a1a1aa' }}>Project Scope & Details *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Briefly describe your product goals, timeline, and key requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                      style={inputStyle}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-interactive w-full font-medium text-sm py-4 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: '#ffffff', color: '#000000' }}
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}

