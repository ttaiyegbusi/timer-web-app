"use client";

import { Card } from "@/components/common/Card";
import { DateControl } from "@/components/common/Controls";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// data: [{ name, value, fill, staffs? }]
export default function PieSummaryCard({
  title,
  data,
  control = "This Week",
  showStaffs = false,
}) {
  return (
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[20px] font-medium text-text">{title}</h3>
        <DateControl>{control}</DateControl>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative h-[200px] w-[200px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {data.map((d, i) => (
                  <Cell key={i} fill={d.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* segment value labels overlaid */}
          <span className="pointer-events-none absolute left-[24%] top-[34%] text-[16px] font-medium text-white">
            {data[1]?.value}%
          </span>
          <span className="pointer-events-none absolute right-[20%] top-[26%] rounded-full bg-white px-2 py-0.5 text-[14px] font-medium text-primary shadow-soft">
            {data[0]?.value}%
          </span>
          <span className="pointer-events-none absolute bottom-[28%] left-[44%] text-[16px] font-medium text-white">
            {data[2]?.value}%
          </span>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((d) => (
            <div
              key={d.name}
              className="flex items-center justify-between text-[15px]"
            >
              <span className="flex items-center gap-2 text-text-secondary">
                <span
                  className="h-3 w-3 rounded-[3px]"
                  style={{ background: d.fill }}
                />
                {d.name}
              </span>
              {showStaffs && (
                <span className="text-text-secondary">{d.staffs} Staffs</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
