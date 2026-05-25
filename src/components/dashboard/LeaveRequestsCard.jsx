"use client";

import { Card } from "@/components/common/Card";
import { Avatar } from "@/components/common/Avatar";
import { LeaveStatusPill } from "@/components/common/Pills";
import { DateControl } from "@/components/common/Controls";
import KebabMenu from "@/components/common/KebabMenu";
import { CircleCheck, CircleX } from "lucide-react";
import { dashboardLeaveRequests } from "@/data/mockData";

function ApproveReject() {
  return (
    <div className="flex items-center gap-2">
      <button className="inline-flex items-center gap-1.5 rounded-pill border border-border px-3 py-1.5 text-[14px] text-text-secondary hover:bg-subtle">
        <CircleCheck size={15} className="text-success" />
        Approve
      </button>
      <button
        aria-label="Reject"
        className="grid h-7 w-7 place-items-center rounded-full text-danger hover:bg-danger-bg"
      >
        <CircleX size={18} />
      </button>
    </div>
  );
}

export default function LeaveRequestsCard() {
  return (
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[20px] font-medium text-text">Leave Requests</h3>
        <div className="flex items-center gap-3">
          <button className="text-[15px] text-text-secondary hover:text-text">
            See All
          </button>
          <DateControl>This Week</DateControl>
        </div>
      </div>

      <div className="divide-y divide-border-light">
        {dashboardLeaveRequests.map((r, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <Avatar name={r.name} size={36} />
            <div className="w-[150px] shrink-0">
              <p className="text-[15px] font-medium text-text">{r.name}</p>
              <p className="text-[13px] text-text-muted">{r.role}</p>
            </div>
            <span className="w-[110px] text-[15px] text-text-secondary">
              {r.leave}
            </span>
            <span className="flex-1 text-[15px] text-text-secondary">
              {r.date}
            </span>
            <div className="w-[130px]">
              {r.status === "Pending" ? (
                <ApproveReject />
              ) : (
                <LeaveStatusPill status={r.status} />
              )}
            </div>
            <KebabMenu items={[{ label: "View details" }]} />
          </div>
        ))}
      </div>
    </Card>
  );
}
