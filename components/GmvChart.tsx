"use client";

import { gmvSeries } from "@/lib/data";

export function GmvChart() {
  const max = Math.max(...gmvSeries.map((d) => d.gmv));
  const width = 720;
  const height = 220;
  const padX = 28;
  const padY = 24;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const stepX = innerW / (gmvSeries.length - 1);

  const points = gmvSeries.map((d, i) => ({
    x: padX + i * stepX,
    y: padY + innerH - (d.gmv / max) * innerH,
    gmv: d.gmv,
    month: d.month,
  }));

  const pathLine = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");
  const pathArea = `${pathLine} L ${padX + innerW} ${padY + innerH} L ${padX} ${
    padY + innerH
  } Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gmv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5018" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ff5018" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {[0.25, 0.5, 0.75, 1].map((p) => (
          <line
            key={p}
            x1={padX}
            x2={padX + innerW}
            y1={padY + innerH * (1 - p)}
            y2={padY + innerH * (1 - p)}
            stroke="#102a43"
            strokeOpacity="0.06"
            strokeDasharray="2,3"
          />
        ))}

        <path d={pathArea} fill="url(#gmv-area)" />
        <path
          d={pathLine}
          fill="none"
          stroke="#ff5018"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={i === points.length - 1 ? 5 : 3}
              fill="#fff"
              stroke="#ff5018"
              strokeWidth="2"
            />
            {i === points.length - 1 && (
              <>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="10"
                  fill="#ff5018"
                  opacity="0.18"
                />
                <text
                  x={p.x - 4}
                  y={p.y - 12}
                  fontSize="11"
                  fontWeight="700"
                  fill="#0a1f3d"
                  textAnchor="end"
                >
                  ${p.gmv}M
                </text>
              </>
            )}
          </g>
        ))}

        {/* X labels */}
        {points.map((p, i) =>
          i % 2 === 0 ? (
            <text
              key={`l-${i}`}
              x={p.x}
              y={height - 6}
              fontSize="10"
              fill="#476d8e"
              textAnchor="middle"
            >
              {p.month}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
}
