"use client";

import { Card } from "@/components/common/Card";
import { Avatar } from "@/components/common/Avatar";
import { recentActivities } from "@/data/mockData";

export default function RecentActivities() {
  return (
    <Card>
      <h3 className="mb-2 text-[20px] font-medium text-text">
        Recent Activities
      </h3>
      <div className="divide-y divide-border-light">
        {recentActivities.map((a, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <Avatar name={a.name} size={36} />
            <div className="w-[150px] shrink-0">
              <p className="text-[15px] font-medium text-text">{a.name}</p>
              <p className="text-[13px] text-text-muted">{a.role}</p>
            </div>
            <p className="flex-1 truncate text-[15px] text-text-secondary">
              {a.activity}
            </p>
            <button className="rounded-pill border border-border px-4 py-1.5 text-[14px] text-text-secondary hover:bg-subtle">
              View
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
