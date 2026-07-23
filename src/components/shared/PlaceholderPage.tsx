import DashboardLayout from './DashboardLayout';
import { Construction } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-[70vh] flex flex-col items-center justify-center text-center p-6"
      >
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-full flex items-center justify-center mb-6">
          <Construction size={40} />
        </div>
        <h1 className="text-3xl font-black mb-4">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          The {title} module is currently under development. 
          We are building something incredibly powerful to help you manage your business. Check back soon!
        </p>
      </motion.div>
    </DashboardLayout>
  );
}
