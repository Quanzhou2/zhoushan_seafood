export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="w-9 h-9"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a1f3d" />
            <stop offset="100%" stopColor="#2d5d94" />
          </linearGradient>
          <linearGradient id="coral-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7438" />
            <stop offset="100%" stopColor="#ff5018" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill="url(#wave-grad)" />
        <path
          d="M6 24 Q 13 18 20 24 T 34 24"
          stroke="#5eaaa8"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M6 28 Q 13 22 20 28 T 34 28"
          stroke="#86ccc1"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M14 14 Q 20 8 26 14 Q 28 18 26 22 Q 24 26 20 24 Q 16 26 14 22 Q 12 18 14 14 Z"
          fill="url(#coral-grad)"
        />
        <circle cx="22" cy="15" r="1" fill="#0a1f3d" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-base font-semibold text-ocean-950 tracking-tight">
          Zhoushan Catch
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-ocean-700/60">
          舟山·捕
        </span>
      </div>
    </div>
  );
}
