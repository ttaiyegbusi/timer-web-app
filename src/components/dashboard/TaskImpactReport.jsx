"use client";

import { Card } from "@/components/common/Card";
import { DateControl } from "@/components/common/Controls";
import { ArrowUpRight } from "lucide-react";

function Gauge({ value = 67 }) {
  // Semicircle gauge: -90deg (left) to +90deg (right) = 180deg sweep.
  const radius = 90;
  const cx = 110;
  const cy = 110;
  const angle = Math.PI * (1 - value / 100); // radians, from left
  const needleLen = 78;
  const nx = cx + needleLen * Math.cos(angle) * -1 * -1; // along arc
  // Build three colored arcs (low/med/high) across the top semicircle.
  const arc = (startPct, endPct, color, width) => {
    const a0 = Math.PI * (1 - startPct / 100);
    const a1 = Math.PI * (1 - endPct / 100);
    const r = radius;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy - r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy - r * Math.sin(a1);
    const large = endPct - startPct > 50 ? 1 : 0;
    return (
      <path
        d={`M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
    );
  };

  return (
    <div className="relative">
      <svg width="220" height="135" viewBox="0 0 220 130">
        {arc(0, 49, "#EAF0FF", 16)}
        {arc(50, 70, "#3B5CF6", 16)}
        {arc(71, 100, "#172762", 16)}
        {/* tick marks */}
        {Array.from({ length: 28 }).map((_, i) => {
          const t = i / 27;
          const a = Math.PI * (1 - t);
          const r1 = 66;
          const r2 = 58;
          return (
            <line
              key={i}
              x1={cx + r1 * Math.cos(a)}
              y1={cy - r1 * Math.sin(a)}
              x2={cx + r2 * Math.cos(a)}
              y2={cy - r2 * Math.sin(a)}
              stroke={t <= value / 100 ? "#3B5CF6" : "#D6DEEF"}
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="absolute inset-x-0 top-[44px] flex flex-col items-center">
        <span className="text-[34px] font-semibold text-text">{value}%</span>
        <span className="mt-1 inline-flex items-center gap-1 rounded-pill bg-success-bg px-2 py-0.5 text-[13px] font-medium text-success">
          20% <ArrowUpRight size={13} />
        </span>
      </div>
    </div>
  );
}

const legend = [
  { label: "Low", range: "10% - 49%", color: "#EAF0FF" },
  { label: "Medium", range: "50% - 70%", color: "#3B5CF6" },
  { label: "High", range: "71% - 100%", color: "#172762" },
];

export default function TaskImpactReport() {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[20px] font-medium text-text">Task Impact Report</h3>
        <DateControl>This Week</DateControl>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full items-start justify-between gap-4">
          <div className="flex flex-col items-center">
            <Gauge value={67} />
            <span className="mt-1 text-[15px] text-text-secondary">
              Medium Impact
            </span>
          </div>

          <div className="flex-1 pt-1">
            <div className="mb-1 flex items-center justify-between text-[14px]">
              <span className="font-medium text-text">67/100</span>
              <span className="text-text-secondary">GOOD</span>
            </div>
            <div className="flex h-2.5 overflow-hidden rounded-pill">
              <span className="flex-1 bg-[#EAF0FF]" />
              <span className="flex-1 bg-[#3B5CF6]" />
              <span className="flex-1 bg-[#172762]" />
            </div>
            <div className="mt-1 flex justify-between text-[12px] text-text-muted">
              <span>0</span>
              <span>30</span>
              <span>60</span>
              <span>100</span>
            </div>

            <div className="mt-4 space-y-2">
              {legend.map((l) => (
                <div
                  key={l.label}
                  className="flex items-center justify-between text-[15px]"
                >
                  <span className="flex items-center gap-2 text-text-secondary">
                    <span
                      className="h-3 w-3 rounded-[3px]"
                      style={{ background: l.color }}
                    />
                    {l.label}
                  </span>
                  <span className="text-text-secondary">{l.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
