"use client";

import { Avatar } from "@/components/common/Avatar";
import { AttendancePill } from "@/components/common/Pills";
import { Checkbox } from "@/components/common/Inputs";
import KebabMenu from "@/components/common/KebabMenu";
import { Download, Eye, Trash2 } from "lucide-react";
import { attendanceRows } from "@/data/mockData";

export default function AttendanceTable({ rows, onRowClick }) {
  const data = rows || attendanceRows;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-tableHeader text-[16px] text-text-secondary">
            <th className="rounded-l-lg px-4 py-3.5 font-medium">
              <Checkbox checked={false} />
            </th>
            <th className="px-4 py-3.5 font-medium">Employee</th>
            <th className="px-4 py-3.5 font-medium">Clock in - Clock Out</th>
            <th className="px-4 py-3.5 font-medium">Overtime</th>
            <th className="px-4 py-3.5 font-medium">Location</th>
            <th className="px-4 py-3.5 font-medium">Status</th>
            <th className="rounded-r-lg px-4 py-3.5 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={r.id || i} className="border-b border-border-light">
              <td className="px-4 py-3.5">
                <Checkbox checked={false} />
              </td>
              <td className="px-4 py-3.5">
                <button
                  onClick={() => onRowClick?.(r)}
                  className="flex items-center gap-3 text-left"
                >
                  <Avatar name={r.name} size={36} />
                  <div>
                    <p className="text-[16px] font-medium text-text hover:text-primary">{r.name}</p>
                    <p className="text-[13px] text-text-muted">{r.role}</p>
                  </div>
                </button>
              </td>
              <td className="px-4 py-3.5 text-[16px] text-text">{r.clock}</td>
              <td className="px-4 py-3.5">
                {r.overtime && r.overtime !== "-" ? (
                  <span className="rounded-md bg-subtle px-2.5 py-1 text-[14px] text-text-secondary">
                    {r.overtime}
                  </span>
                ) : (
                  <span className="text-[16px] text-text-muted">-</span>
                )}
              </td>
              <td className="max-w-[280px] px-4 py-3.5 text-[15px] text-text-secondary">
                {r.location}
              </td>
              <td className="px-4 py-3.5">
                <AttendancePill status={r.status} />
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-1">
                  <button
                    aria-label="Download"
                    className="grid h-8 w-8 place-items-center rounded-md text-text-secondary hover:bg-subtle"
                  >
                    <Download size={18} />
                  </button>
                  <KebabMenu
                    header="Action"
                    items={[
                      { label: "View record", icon: Eye, highlight: true, onClick: () => onRowClick?.(r) },
                      { label: "Remove", icon: Trash2, danger: true },
                    ]}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
