"use client";

import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { LeaveStatusPill } from "@/components/common/Pills";
import { Checkbox, CopyableId } from "@/components/common/Inputs";
import KebabMenu from "@/components/common/KebabMenu";

function ApproveReject() {
  return (
    <div className="flex items-center gap-2">
      <button className="inline-flex items-center gap-1.5 rounded-pill border border-border px-4 py-2 text-[15px] text-text-secondary hover:bg-subtle">
        <CircleCheck size={16} className="text-success" />
        Approve
      </button>
      <button
        aria-label="Reject"
        className="grid h-8 w-8 place-items-center rounded-full text-danger hover:bg-danger-bg"
      >
        <CircleX size={20} />
      </button>
    </div>
  );
}

export default function LeaveRequestsTable({ rows }) {
  const [checked, setChecked] = useState({});
  const toggle = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="text-[16px] text-text-secondary">
            <th className="px-4 py-3.5 font-medium">
              <Checkbox checked={false} />
            </th>
            <th className="px-4 py-3.5 font-medium">Employee ID</th>
            <th className="px-4 py-3.5 font-medium">Employee Details</th>
            <th className="px-4 py-3.5 font-medium">Leave Type</th>
            <th className="px-4 py-3.5 font-medium">Start Date to End Date</th>
            <th className="px-4 py-3.5 font-medium">Duration</th>
            <th className="px-4 py-3.5 font-medium">Status</th>
            <th className="px-4 py-3.5 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border-light">
              <td className="px-4 py-4">
                <Checkbox checked={!!checked[i]} onChange={() => toggle(i)} />
              </td>
              <td className="px-4 py-4">
                <CopyableId id={r.id} />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={r.name} size={38} />
                  <div>
                    <p className="text-[16px] font-medium text-text">{r.name}</p>
                    <p className="text-[14px] text-text-muted">{r.role}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-[16px] text-text">{r.leaveType}</td>
              <td className="px-4 py-4 text-[16px] text-text-secondary">
                {r.dateRange}
              </td>
              <td className="px-4 py-4 text-[16px] text-text">{r.duration}</td>
              <td className="px-4 py-4">
                {r.status === "Pending" ? (
                  <ApproveReject />
                ) : (
                  <LeaveStatusPill status={r.status} />
                )}
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex justify-end">
                  <KebabMenu items={[{ label: "View details" }]} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
