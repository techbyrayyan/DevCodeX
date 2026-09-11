'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import TeamCard from '@/components/TeamCard';
import { teamMembers } from '@/data/teamData';

/* ── Smooth Scroll & Load Animation Variants ── */
const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.08,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 35, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const teamGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const teamCardItem = {
  hidden: { opacity: 0, y: 45, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="font-sans text-white pb-28 pt-10 sm:pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">

          {/* ══════════════════════════════════════════════════════════
              1. HISTORY OF DEVCODEX
          ══════════════════════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
          >
            {/* Left Column: Heading centered vertically & shifted inward */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-5 space-y-3 pt-6 sm:pt-12 lg:pt-16 pl-0 sm:pl-6 lg:pl-12 xl:pl-16"
            >
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white capitalize"
                style={{ fontFamily: 'var(--font-display), "Outfit", serif' }}
              >
                about
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-zinc-300 tracking-tight leading-snug">
                the story &amp; history of devcodex
              </p>
            </motion.div>

            {/* Right Column: Narrative Content */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-7 space-y-5 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal pt-2 sm:pt-6"
            >
              <p>
                DevCodeX was founded with a singular ambition: to bridge the gap between creative digital design and industrial-grade software engineering. In an industry crowded with slow, template-driven agencies, our founders—a collective of senior cloud architects and developers—set out to build a modern studio committed to custom Next.js architectures, sub-second speeds, and uncompromising code quality.
              </p>
              <p>
                Since our launch in 2022, DevCodeX has grown into a trusted global technology partner, delivering over 150+ high-performance web applications, interactive 3D WebGL experiences, and autonomous AI systems. We work as a dedicated extension of your leadership team, turning ambitious ideas into scalable digital products with zero bloat and 100% full source code ownership.
              </p>
            </motion.div>
          </motion.section>

          {/* Clean Thin Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full border-t border-zinc-800/80 origin-left"
          />

          {/* ══════════════════════════════════════════════════════════
              2. OUR MISSION (PARAGRAPH LEFT, HEADING RIGHT & CENTERED)
          ══════════════════════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={sectionContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
          >
            {/* Left Column: Narrative Content */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-7 order-2 lg:order-1 space-y-5 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal pt-2 sm:pt-6"
            >
              <p>
                Our mission at DevCodeX is to empower startups, visionary founders, and established enterprises to dominate their markets through custom, high-velocity digital solutions. We reject fragile shortcuts, bloated frameworks, and vendor lock-in. Instead, we architect scalable cloud backends, fluid user experiences, and intelligent AI integrations that solve real-world problems and deliver measurable business growth.
              </p>
              <p>
                Every solution we engineer adheres to non-negotiable principles: sub-second page performance, 100% client source code ownership, zero technical debt, and transparent, direct collaboration with senior architects every step of the way.
              </p>
            </motion.div>

            {/* Right Column: Heading centered vertically & shifted inward */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-5 order-1 lg:order-2 space-y-3 pt-6 sm:pt-12 lg:pt-16 pl-0 sm:pl-6 lg:pl-12 xl:pl-16"
            >
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white capitalize"
                style={{ fontFamily: 'var(--font-display), "Outfit", serif' }}
              >
                our mission
              </h2>
              <p className="text-xl sm:text-2xl font-medium text-zinc-300 tracking-tight leading-snug">
                purpose beyond code
              </p>
            </motion.div>
          </motion.section>

          {/* Clean Thin Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full border-t border-zinc-800/80 origin-left"
          />

          {/* ══════════════════════════════════════════════════════════
              3. OUR VISION (HEADING CENTERED VERTICALLY & SHIFTED)
          ══════════════════════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={sectionContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
          >
            {/* Left Column: Heading centered vertically & shifted inward */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-5 space-y-3 pt-6 sm:pt-12 lg:pt-16 pl-0 sm:pl-6 lg:pl-12 xl:pl-16"
            >
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white capitalize"
                style={{ fontFamily: 'var(--font-display), "Outfit", serif' }}
              >
                our vision
              </h2>
              <p className="text-xl sm:text-2xl font-medium text-zinc-300 tracking-tight leading-snug">
                architecting the future web
              </p>
            </motion.div>

            {/* Right Column: Narrative Content */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-7 space-y-5 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal pt-2 sm:pt-6"
            >
              <p>
                Our vision is to stand as the global benchmark in next-generation software development and interactive digital engineering. We believe the future of the web belongs to living, intelligent platforms that seamlessly unite immersive 3D WebGL graphics, autonomous AI agents, and instantaneous edge computing.
              </p>
              <p>
                DevCodeX aims to lead this evolution, inspiring organizations across industries to elevate their digital standards and build resilient, future-ready products that withstand the test of time.
              </p>
            </motion.div>
          </motion.section>

          {/* Clean Thin Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full border-t border-zinc-800/80 origin-left"
          />

          {/* ══════════════════════════════════════════════════════════
              4. OUR TEAM
          ══════════════════════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionContainer}
            className="space-y-12"
          >
            {/* Team Section Title */}
            <motion.div variants={slideUp} className="space-y-2">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white capitalize"
                style={{ fontFamily: 'var(--font-display), "Outfit", serif' }}
              >
                our team
              </h2>
              <p className="text-lg sm:text-xl text-zinc-400 font-normal">
                The engineers, architects, and designers driving innovation at DevCodeX.
              </p>
            </motion.div>

            {/* Staggered Team Cards Grid (matching Home page 3-col width & gap) */}
            <motion.div
              variants={teamGridVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2"
            >
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.id || i}
                  variants={teamCardItem}
                  className="w-full"
                >
                  <TeamCard member={member} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

        </div>
      </div>
    </PageTransition>
  );
}
