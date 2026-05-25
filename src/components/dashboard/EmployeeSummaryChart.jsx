"use client";

import { Card } from "@/components/common/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { employeeSummaryBars } from "@/data/mockData";

// Give empty weekdays a faint placeholder bar height like the screenshot.
const chartData = employeeSummaryBars.map((d) => ({
  ...d,
  placeholder: d.present > 0 ? 0 : 60,
}));

function LegendDot({ color, striped, label }) {
  return (
    <span className="flex items-center gap-2 text-[14px] text-text-secondary">
      <span
        className="h-3 w-3 rounded-[3px]"
        style={
          striped
            ? {
                backgroundImage:
                  "repeating-linear-gradient(45deg,#C9D7FB 0 3px,#EAF0FF 3px 6px)",
              }
            : { background: color }
        }
      />
      {label}
    </span>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-white p-3 text-[13px] shadow-dropdown">
      <p className="mb-2 font-medium text-text">Mon 20 Jun, 2025</p>
      <p className="flex items-center justify-between gap-6 text-text-secondary">
        <span className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-[2px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#C9D7FB 0 3px,#EAF0FF 3px 6px)",
            }}
          />
          On Leave
        </span>
        <span className="font-medium text-text">07</span>
      </p>
      <p className="mt-1 flex items-center justify-between gap-6 text-text-secondary">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-primary" />
          Present
        </span>
        <span className="font-medium text-text">33</span>
      </p>
    </div>
  );
}

export default function EmployeeSummaryChart() {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[20px] font-medium text-text">Employee Summary</h3>
        <div className="flex items-center gap-4">
          <LegendDot striped label="On Leave" />
          <LegendDot color="#3B5CF6" label="Present" />
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="35%">
            <CartesianGrid vertical={false} stroke="#EEF1F6" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#87909E", fontSize: 13 }}
            />
            <YAxis
              domain={[0, 70]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#87909E", fontSize: 13 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="placeholder"
              radius={[4, 4, 0, 0]}
              fill="#EEF1F6"
              isAnimationActive={false}
            />
            <Bar dataKey="present" radius={[4, 4, 0, 0]}>
              {chartData.map((d, i) => (
                <Cell key={i} fill={d.present > 0 ? "#3B5CF6" : "transparent"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
