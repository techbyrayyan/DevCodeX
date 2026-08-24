'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import TeamCard from '@/components/TeamCard';
import { companyValues, workflowSteps, teamMembers } from '@/data/teamData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

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

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function AboutPage() {
  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };
  const innerCardStyle = { backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid #27272a' };

  return (
    <PageTransition>
      <div className="space-y-24 pb-24 font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>
        
        {/* About Hero */}
        <section className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            
            <div className="lg:col-span-7 space-y-6">
              <motion.div variants={fadeInUp} className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
                + ABOUT DEVCODEX
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
                style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
              >
                Building Digital Experiences That <span style={{ color: '#a1a1aa' }}>Matter</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-base leading-relaxed" style={{ color: '#a1a1aa' }}>
                DevCodeX is a premier software development studio and 3D web engineering agency. We bridge the gap between creative interactive design, artificial intelligence, and enterprise-grade code architecture.
              </motion.p>

              <motion.div variants={fadeInUp} className="pt-2 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="btn-interactive inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded-full"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                >
                  <span>Work With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Right Visual Card */}
            <motion.div 
              className="lg:col-span-5 rounded-2xl p-8 space-y-6 hover-card" 
              style={cardStyle}
              variants={fadeInUp}
            >
              <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid #27272a' }}>
                <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: '#3b82f6' }}>
                  Engineering Studio
                </span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
              </div>

              <div className="space-y-4">
                <h3
                  className="text-xl font-bold"
                  style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                >
                  Full-Stack Digital Craftsmen
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#a1a1aa' }}>
                  We craft custom software, high-speed Next.js web applications, and autonomous workflow engines designed for enterprise reliability.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono pt-2" style={{ borderTop: '1px solid #27272a', color: '#a1a1aa' }}>
                <div className="flex justify-between py-1"><span>Founded</span> <span className="font-bold" style={{ color: '#ffffff' }}>2026</span></div>
                <div className="flex justify-between py-1"><span>Global Clients</span> <span className="font-bold" style={{ color: '#ffffff' }}>10+ Worldwide</span></div>
                <div className="flex justify-between py-1"><span>Projects Delivered</span> <span className="font-bold" style={{ color: '#ffffff' }}>40+ Completed</span></div>
              </div>
            </motion.div>

          </motion.div>
        </section>


        {/* Mission & Core Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            badge="Values & Standards"
            title="What Drives Our Work"
            subtitle="We adhere to non-negotiable principles of code quality, visual prestige, and speed."
            center={true}
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {companyValues.map((val, i) => (
              <motion.div key={i} variants={fadeInUp} custom={i} className="hover-card rounded-2xl p-8 space-y-4" style={cardStyle}>
                <h3
                  className="text-xl font-bold flex items-center gap-3"
                  style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                  <span>{val.title}</span>
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
                  {val.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>


        {/* Development Workflow / How We Deliver */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            badge="How We Work"
            title="Our Engineering Workflow"
            subtitle="A structured, transparent development lifecycle designed for predictable delivery and quality."
            center={true}
          />

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {workflowSteps.map((step, i) => (
              <motion.div key={i} variants={fadeInUp} custom={i} className="hover-card rounded-2xl p-6 space-y-4" style={cardStyle}>
                <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid #27272a' }}>
                  <span className="text-2xl font-extrabold font-mono" style={{ color: '#3b82f6' }}>
                    {step.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-500/50" />
                </div>
                <div className="space-y-2">
                  <h4
                    className="text-lg font-bold"
                    style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#a1a1aa' }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>


        {/* Our Team Members (6 Cards) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            badge="Our People"
            title="Our Team Members"
            subtitle="A multidisciplinary team of engineers, designers, and cloud architects building high-impact digital solutions."
            center={true}
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, i) => (
              <motion.div key={member.id || i} variants={fadeInUp} custom={i} className="w-full">
                <TeamCard member={member} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}



