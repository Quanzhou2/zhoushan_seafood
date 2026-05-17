import type { ReactNode } from "react";

export function PillarCard({
  icon,
  title,
  description,
  index,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div className="relative p-6 rounded-2xl bg-white border border-ocean-100/70 shadow-soft hover:shadow-card transition-shadow group">
      <span className="absolute top-4 right-5 text-[10px] font-mono text-ocean-300 tracking-widest">
        0{index}
      </span>
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-coral-100 to-coral-200 flex items-center justify-center text-coral-700 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-ocean-950 leading-snug">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ocean-800/80 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
