'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Hero3D from '@/components/Hero3D';
import {
  ArrowRight, Target, Eye, Code2, ShieldCheck,
  Lightbulb, Gem, Handshake, Star,
  Rocket, Users, Globe, Trophy,
  BarChart2, Settings, Send, Shield, Cpu, Layers, ShoppingBag, TrendingUp, Sparkles
} from 'lucide-react';

/* Animation Variants */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
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
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  const servicesData = [
    {
      title: 'Web Development',
      badge: 'Core Service',
      desc: 'High-performance Next.js & React web applications engineered for speed, SEO, and user conversion.',
      features: ['Next.js 15 & React Architecture', 'Server-Side Rendering (SSR)', 'SEO & Core Web Vitals Optimized', 'Responsive Mobile-First UI']
    },
    {
      title: 'AI & Automation',
      badge: 'Advanced Tech',
      desc: 'Autonomous AI agents, automated workflows, and LLM integrations that transform business efficiency.',
      features: ['Custom AI Agents & Chatbots', 'Workflow & API Automations', 'Data Processing Pipelines', 'OpenAI & Claude Integrations']
    },
    {
      title: 'Custom Web Apps',
      badge: 'Enterprise',
      desc: 'Scalable SaaS platforms, admin dashboards, and cloud applications tailored to your business logic.',
      features: ['Multi-tenant SaaS Architecture', 'Real-time Analytics Dashboards', 'Secure Auth & Role Permissions', 'Rest API & GraphQL Backends']
    },
    {
      title: 'E-Commerce Storefronts',
      badge: 'E-Commerce',
      desc: 'Custom headless storefronts designed for maximum conversion rates and seamless checkout flows.',
      features: ['Shopify & Headless Commerce', 'Payment Gateway Integration', 'Inventory Management Systems', 'High-Speed Product Filters']
    },
    {
      title: 'UI/UX & Interactive Design',
      badge: 'Design & Creative',
      desc: 'Sleek dark-themed user interfaces, wireframes, and design systems crafted for prestige brands.',
      features: ['Figma Design Systems', 'User Journey & Wireframing', 'Interactive Prototypes', 'Responsive Layout Patterns']
    },
    {
      title: 'SEO & Growth Strategy',
      badge: 'Marketing',
      desc: 'Data-driven search engine optimization and digital marketing strategies to scale organic traffic.',
      features: ['Technical SEO Audits', 'Keyword Strategy & Content', 'Performance Optimization', 'Conversion Rate Optimization']
    }
  ];

  /* ── Shared inline style constants ── */
  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };
  const innerCardStyle = { backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid #27272a' };
  const sectionBorder = { borderBottom: '1px solid #27272a' };
  const iconBoxStyle = { backgroundColor: '#050505', border: '1px solid #27272a' };

  return (
    <PageTransition>
      <div className="overflow-hidden font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>

        {/* ══ 1. HERO SECTION ════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex items-center pt-12 pb-20" style={sectionBorder}>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

            {/* Left Column: Text, Buttons, Static Stat Counters */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                <span>+ DIGITAL TRANSFORMATION</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
                style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
              >
                We Turn Ideas Into<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500">
                  Powerful Digital Solutions
                </span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp} 
                custom={2}
                className="text-base leading-relaxed max-w-xl" 
                style={{ color: '#a1a1aa' }}
              >
                At DevcodeX, we don&apos;t just write code — we craft digital experiences that help businesses grow, scale and lead in the digital world.
              </motion.p>

              <motion.div variants={fadeInUp} custom={3} className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  href="/contact"
                  className="btn-interactive inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded-full cursor-pointer"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="btn-interactive inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded-full cursor-pointer hover:border-zinc-500"
                  style={{ backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #27272a' }}
                >
                  <span>Our Services</span>
                </Link>
              </motion.div>

              {/* Stats Bar */}
              <motion.div variants={fadeInUp} custom={4} className="pt-8">
                <div className="rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 hover-glow" style={cardStyle}>
                  {[
                    { value: '150+', label: 'Projects Delivered' },
                    { value: '98%',  label: 'Client Satisfaction' },
                    { value: '50+',  label: 'Worldwide Clients' },
                    { value: '3+',   label: 'Years Experience' },
                  ].map((s, idx) => (
                    <div key={s.label} className="text-left group">
                      <p
                        className="text-2xl sm:text-3xl font-extrabold font-mono transition-transform duration-200 group-hover:scale-105"
                        style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                      >
                        {s.value}
                      </p>
                      <p className="text-xs mt-1 leading-tight group-hover:text-white transition-colors" style={{ color: '#a1a1aa' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </motion.div>

            {/* Right Column: 3D Animation with Rotating Content */}
            <motion.div 
              className="lg:col-span-5 flex items-center justify-center w-full min-h-[320px] sm:min-h-[420px] lg:min-h-[500px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Hero3D />
            </motion.div>

          </div>
        </section>


        {/* ══ 2. WHO WE ARE SECTION ════════════════════════════════ */}
        <section className="py-24 relative" style={sectionBorder}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column */}
              <motion.div 
                className="lg:col-span-5 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
                  + WHO WE ARE
                </motion.div>
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl font-extrabold leading-tight"
                  style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                >
                  A Digital Agency That Cares About Your Success
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
                  DevcodeX is a full-service digital agency delivering websites, AI solutions, automation systems and digital marketing services that drive real business results.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
                  Our team of passionate developers, designers and strategists work together to turn your ideas into powerful digital products.
                </motion.p>
                <motion.div variants={fadeInUp} className="pt-2">
                  <Link
                    href="/about"
                    className="btn-interactive inline-flex items-center gap-2 font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full"
                    style={{ backgroundColor: '#ffffff', color: '#000000' }}
                  >
                    <span>Our Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Column - 2x2 Grid with Staggered Motion */}
              <motion.div 
                className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
              >
                {[
                  {
                    icon: Target,
                    title: 'Our Mission',
                    desc: 'To empower businesses with innovative digital solutions that drive growth and success.'
                  },
                  {
                    icon: Eye,
                    title: 'Our Vision',
                    desc: 'To be a global leader in digital innovation, recognized for quality, creativity and impact.'
                  },
                  {
                    icon: Code2,
                    title: 'Our Approach',
                    desc: 'We combine creativity, technology and strategy to build solutions that make a difference.'
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Why Choose Us?',
                    desc: 'We deliver on time, with quality code, transparent communication and long-term support.'
                  }
                ].map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    custom={i}
                    className="hover-card rounded-2xl p-6 space-y-3 cursor-pointer group"
                    style={cardStyle}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:border-blue-500/50 transition-colors" style={iconBoxStyle}>
                      <Icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" style={{ color: '#ffffff' }} />
                    </div>
                    <h3 className="text-base font-bold group-hover:text-white transition-colors" style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}>{title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#a1a1aa' }}>{desc}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>


        {/* ══ 3. SERVICES / OUR EXPERTISE SECTION ══════════════════ */}
        <section className="py-24 relative" style={sectionBorder}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <motion.div 
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
                + OUR EXPERTISE
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold"
                style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
              >
                Services We Provide
              </h2>
            </motion.div>

            {/* Tabbed Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Category Tabs */}
              <div className="lg:col-span-4 space-y-2">
                {servicesData.map((serv, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className="w-full text-left p-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: activeTab === index ? '#121212' : 'transparent',
                      color: activeTab === index ? '#ffffff' : '#a1a1aa',
                      border: activeTab === index ? '1px solid #3b82f6' : '1px solid transparent',
                      transform: activeTab === index ? 'translateX(6px)' : 'none',
                      boxShadow: activeTab === index ? '0 4px 20px -5px rgba(59, 130, 246, 0.2)' : 'none',
                    }}
                  >
                    <span>{serv.title}</span>
                    <span className="text-xs font-mono" style={{ color: activeTab === index ? '#3b82f6' : '#71717a' }}>{serv.badge}</span>
                  </button>
                ))}
              </div>

              {/* Active Service Card with Motion */}
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-8 rounded-2xl p-8 space-y-6 hover-glow" 
                style={cardStyle}
              >
                <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid #27272a' }}>
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2" style={{ color: '#3b82f6' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {servicesData[activeTab].badge}
                  </span>
                  <span className="text-xs font-mono" style={{ color: '#a1a1aa' }}>0{activeTab + 1} / 06</span>
                </div>

                <div className="space-y-3">
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                  >
                    {servicesData[activeTab].title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>{servicesData[activeTab].desc}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider block font-semibold" style={{ color: '#ffffff' }}>Capabilities Included</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesData[activeTab].features.map((feat, fIdx) => (
                      <div 
                        key={fIdx} 
                        className="p-3 rounded-lg flex items-center gap-2 text-xs transition-colors hover:border-zinc-600 hover:text-white" 
                        style={{ ...innerCardStyle, color: '#a1a1aa' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#3b82f6' }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4" style={{ borderTop: '1px solid #27272a' }}>
                  <Link
                    href="/services"
                    className="btn-interactive inline-flex items-center gap-2 text-sm font-bold group"
                    style={{ color: '#ffffff' }}
                  >
                    <span>Explore All Services</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </section>


        {/* ══ 4. OUR VALUES SECTION ════════════════════════════════ */}
        <section className="py-24 relative" style={sectionBorder}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

            <motion.div 
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
                + OUR VALUES
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold"
                style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
              >
                The Principles That Drive Us
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
            >
              {[
                { icon: Lightbulb, title: 'Innovation', desc: 'We embrace new ideas and technologies to solve real world problems.' },
                { icon: Gem,       title: 'Quality',     desc: 'We follow best practices to deliver clean, scalable and reliable solutions.' },
                { icon: Eye,       title: 'Transparency', desc: 'We believe in clear communication and honest partnerships.' },
                { icon: Handshake, title: 'Commitment',  desc: "We are committed to our clients' success and long-term growth." },
                { icon: Star,      title: 'Excellence',  desc: 'We strive for excellence in every line of code and every design we create.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  custom={i}
                  className="hover-card rounded-2xl p-5 space-y-3 cursor-pointer group"
                  style={cardStyle}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:border-blue-500/50 transition-colors" style={iconBoxStyle}>
                    <Icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" style={{ color: '#ffffff' }} />
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-white transition-colors" style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#a1a1aa' }}>{desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>


        {/* ══ 5. OUR PROCESS / JOURNEY SECTION ═════════════════════ */}
        

        {/* ══ 6. WHAT DRIVES US SECTION ════════════════════════════ */}
        <section className="py-24 relative" style={sectionBorder}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column Text */}
              <motion.div 
                className="lg:col-span-6 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
                  + WHAT DRIVES US
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl font-extrabold leading-tight"
                  style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                >
                  Passion. Purpose. Performance.
                </motion.h2>

                <motion.p variants={fadeInUp} className="text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
                  We are driven by the passion to create, the purpose to solve real problems, and the performance to deliver results that matter. At DevcodeX, your success is our mission.
                </motion.p>

                <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { icon: Target,    title: 'Client First',     sub: 'Approach' },
                    { icon: BarChart2, title: 'Result Driven',    sub: 'Solutions' },
                    { icon: Settings,  title: 'Agile & Modern',   sub: 'Methodology' },
                    { icon: Shield,    title: 'Long Term',        sub: 'Partnership' },
                  ].map(({ icon: Icon, title, sub }, i) => (
                    <div
                      key={i}
                      className="hover-card rounded-xl p-4 flex items-center gap-3 cursor-pointer group"
                      style={cardStyle}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors" style={iconBoxStyle}>
                        <Icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" style={{ color: '#ffffff' }} />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight group-hover:text-white transition-colors" style={{ color: '#ffffff' }}>{title}</p>
                        <p className="text-[11px]" style={{ color: '#a1a1aa' }}>{sub}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Column */}
              <motion.div 
                className="lg:col-span-6 rounded-2xl p-8 space-y-6 hover-glow" 
                style={cardStyle}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeInUp}
              >
                <h3
                  className="text-xl font-bold"
                  style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                >
                  Our Engineering Standards
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Code Quality', desc: 'Strict TypeScript, clean component architecture, and automated test coverage.' },
                    { label: 'Performance First', desc: 'Zero-lag page renders, fast server responses, and 95+ Lighthouse benchmark performance.' },
                    { label: 'Dedicated Support', desc: 'Continuous SLA maintenance, proactive security patches, and direct developer communication.' },
                  ].map(({ label, desc }) => (
                    <div 
                      key={label} 
                      className="p-4 rounded-xl space-y-1 transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-900/50" 
                      style={innerCardStyle}
                    >
                      <span className="text-xs font-mono uppercase" style={{ color: '#3b82f6' }}>{label}</span>
                      <p className="text-xs" style={{ color: '#a1a1aa' }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* ══ 7. CTA BANNER SECTION ════════════════════════════════ */}
        <section className="py-24 relative overflow-hidden">
          
          {/* Subtle Ambient Light Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[250px] bg-blue-600/10 rounded-full blur-3xl animate-glow-ambient" />
          </div>

          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div
              className="rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 hover-glow transition-all duration-300"
              style={{ ...cardStyle, border: '1px solid #27272a' }}
            >
              <div className="flex items-center gap-5 text-center md:text-left">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0 animate-float-gentle" style={iconBoxStyle}>
                  <Send className="w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <h3
                    className="text-xl sm:text-2xl font-extrabold"
                    style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                  >
                    Let&apos;s Build Something Amazing Together
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: '#a1a1aa' }}>
                    Have a project in mind? Let&apos;s turn your ideas into reality.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="btn-interactive inline-flex items-center gap-2 font-medium text-xs sm:text-sm px-7 py-3.5 rounded-full cursor-pointer"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}


