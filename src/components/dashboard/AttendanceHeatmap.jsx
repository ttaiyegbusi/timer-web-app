"use client";

import { Card } from "@/components/common/Card";
import { attendanceHeatmap } from "@/data/mockData";

const stripe =
  "repeating-linear-gradient(45deg,#C9D7FB 0 4px,#EAF0FF 4px 8px)";

function cellStyle(state) {
  if (state === "in") return { background: "#3B5CF6" };
  if (state === "out") return { background: "#172762" };
  if (state === "lunch") return { backgroundImage: stripe };
  return { background: "#F1F4F9" };
}

function LegendDot({ label, state }) {
  return (
    <span className="flex items-center gap-2 text-[14px] text-text-secondary">
      <span className="h-3 w-3 rounded-[3px]" style={cellStyle(state)} />
      {label}
    </span>
  );
}

export default function AttendanceHeatmap() {
  const { times, days, cells } = attendanceHeatmap;
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[20px] font-medium text-text">Avg . Att. Report</h3>
        <div className="flex items-center gap-4">
          <LegendDot label="Lunch" state="lunch" />
          <LegendDot label="Avg . Clock In" state="in" />
          <LegendDot label="Avg . Clock Out" state="out" />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col justify-between py-1 text-right text-[13px] text-text-muted">
          {times.map((t) => (
            <span key={t} className="h-9 leading-9">
              {t}
            </span>
          ))}
        </div>

        <div className="flex-1">
          <div className="space-y-2">
            {cells.map((row, r) => (
              <div key={r} className="grid grid-cols-5 gap-3">
                {row.map((state, c) => (
                  <div
                    key={c}
                    className="h-9 rounded-md"
                    style={cellStyle(state)}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-5 gap-3 text-center text-[13px] text-text-muted">
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
