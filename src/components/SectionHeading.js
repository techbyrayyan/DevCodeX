'use client';

export default function SectionHeading({ badge, title, subtitle, center = false }) {
  return (
    <div className={`space-y-4 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {badge && (
        <div className={`text-[#3b82f6] text-xs font-mono font-semibold uppercase tracking-widest ${center ? 'mx-auto' : ''}`}>
          + {badge}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[#a1a1aa] text-base sm:text-lg leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}

