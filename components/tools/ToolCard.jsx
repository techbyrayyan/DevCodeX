'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const ToolCard = memo(({ tool, index = 0, viewMode = 'grid', onClick, getColorClasses }) => {
  const Icon = tool.icon || Sparkles;

  const getColors = getColorClasses || ((color) => {
    const map = {
      violet: { text: 'text-violet-600 dark:text-violet-400', lightBg: 'bg-violet-50 dark:bg-violet-500/10', border: 'border-violet-200 dark:border-violet-500/30', hoverBorder: 'hover:border-violet-400 dark:hover:border-violet-500' },
      emerald: { text: 'text-emerald-600 dark:text-emerald-400', lightBg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/30', hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500' },
      blue: { text: 'text-blue-600 dark:text-blue-400', lightBg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/30', hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500' },
      orange: { text: 'text-orange-600 dark:text-orange-400', lightBg: 'bg-orange-50 dark:bg-orange-500/10', border: 'border-orange-200 dark:border-orange-500/30', hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500' },
      rose: { text: 'text-rose-600 dark:text-rose-400', lightBg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-200 dark:border-rose-500/30', hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-500' },
      teal: { text: 'text-teal-600 dark:text-teal-400', lightBg: 'bg-teal-50 dark:bg-teal-500/10', border: 'border-teal-200 dark:border-teal-500/30', hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-500' },
      purple: { text: 'text-purple-600 dark:text-purple-400', lightBg: 'bg-purple-50 dark:bg-purple-500/10', border: 'border-purple-200 dark:border-purple-500/30', hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-500' },
      pink: { text: 'text-pink-600 dark:text-pink-400', lightBg: 'bg-pink-50 dark:bg-pink-500/10', border: 'border-pink-200 dark:border-pink-500/30', hoverBorder: 'hover:border-pink-400 dark:hover:border-pink-500' },
      amber: { text: 'text-amber-600 dark:text-amber-400', lightBg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/30', hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-500' },
      cyan: { text: 'text-cyan-600 dark:text-cyan-400', lightBg: 'bg-cyan-50 dark:bg-cyan-500/10', border: 'border-cyan-200 dark:border-cyan-500/30', hoverBorder: 'hover:border-cyan-400 dark:hover:border-cyan-500' },
      indigo: { text: 'text-indigo-600 dark:text-indigo-400', lightBg: 'bg-indigo-50 dark:bg-indigo-500/10', border: 'border-indigo-200 dark:border-indigo-500/30', hoverBorder: 'hover:border-indigo-400 dark:hover:border-indigo-500' },
    };
    return map[color] || map.blue;
  });

  const colors = getColors(tool.color || 'blue');

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: index * 0.04,
        duration: 0.45,
        ease: 'easeOut',
      },
    },
  };

  const handleClick = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (typeof onClick === 'function') {
      onClick(e, tool);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className={`group relative cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-6 text-left flex ${
        viewMode === 'grid' ? 'flex-col gap-4' : 'flex-row items-center gap-6'
      } transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 ${colors.hoverBorder}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className={`shrink-0 ${viewMode === 'grid' ? 'w-12 h-12 rounded-2xl' : 'w-14 h-14 rounded-2xl'} ${colors.lightBg} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
          <Icon size={22} className={colors.text} />
        </div>
        {tool.badge && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
            {tool.badge}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.label || tool.title || tool.name}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
          {tool.desc || tool.description}
        </p>
      </div>

      <div className={`${viewMode === 'grid' ? 'mt-2 w-full' : 'shrink-0'} py-2.5 px-5 rounded-xl border ${colors.border} flex items-center justify-center gap-2 ${colors.text} font-semibold text-sm transition-all group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB]`}>
        <span>Use Tool</span>
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
});

ToolCard.displayName = 'ToolCard';

export default ToolCard;
