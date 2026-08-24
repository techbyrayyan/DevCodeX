'use client';

import { useState, useEffect, useRef } from 'react';
import { companyStats } from '@/data/testimonialsData';

function SingleCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="font-mono text-4xl sm:text-5xl lg:text-6xl font-black cyan-gradient-text tracking-tight">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-12 border-y border-white/10 bg-neutral-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {companyStats.map((stat, index) => (
            <div key={index} className="space-y-2 p-4 rounded-xl glass-card border-none bg-transparent">
              <SingleCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-xs sm:text-sm font-medium text-neutral-400 uppercase tracking-wider font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
