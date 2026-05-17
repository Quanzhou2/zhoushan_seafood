"use client";

import { Check, Truck, Snowflake } from "lucide-react";
import type { ColdChainStage } from "@/lib/types";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export function ColdChainTimeline({ stages }: { stages: ColdChainStage[] }) {
  const { locale } = useStore();

  return (
    <div className="relative">
      {stages.map((s, idx) => {
        const isLast = idx === stages.length - 1;
        return (
          <div key={idx} className="relative pb-8 last:pb-0">
            {!isLast && (
              <div
                className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${
                  s.status === "completed"
                    ? "bg-seafoam-400"
                    : s.status === "active"
                    ? "bg-gradient-to-b from-coral-400 to-ocean-200"
                    : "bg-ocean-200"
                }`}
              />
            )}
            <div className="flex gap-4">
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  s.status === "completed"
                    ? "bg-seafoam-500 text-white"
                    : s.status === "active"
                    ? "bg-coral-500 text-white shadow-lg shadow-coral-500/40 animate-pulse"
                    : "bg-white border-2 border-ocean-200 text-ocean-400"
                }`}
              >
                {s.status === "completed" ? (
                  <Check className="w-4 h-4" />
                ) : s.status === "active" ? (
                  <Truck className="w-4 h-4" />
                ) : (
                  <Snowflake className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 -mt-0.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold text-ocean-950">
                      {t(s.stage, locale)}
                    </p>
                    <p className="text-sm text-ocean-700/80 mt-0.5">
                      {t(s.location, locale)}
                    </p>
                  </div>
                  {s.status === "active" && (
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded-full border border-coral-100 whitespace-nowrap">
                      Live now
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-ocean-600/90">
                  <span className="font-mono flex items-center gap-1">
                    <Snowflake className="w-3 h-3 text-seafoam-600" />
                    {s.tempC}°C
                  </span>
                  <span>·</span>
                  <span>{s.durationHours}h</span>
                  <span>·</span>
                  <span className="font-mono">{s.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
