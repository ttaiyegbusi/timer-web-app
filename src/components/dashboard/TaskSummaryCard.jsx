"use client";

import { Card } from "@/components/common/Card";
import { AvatarStack } from "@/components/common/Avatar";
import { PriorityPill } from "@/components/common/Pills";
import KebabMenu from "@/components/common/KebabMenu";
import { Plus, Eye, Copy, Trash2 } from "lucide-react";
import { taskSummaryList } from "@/data/mockData";

export default function TaskSummaryCard() {
  return (
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[20px] font-medium text-text">Task Summary</h3>
        <button className="flex items-center gap-1 text-[15px] text-text-secondary hover:text-text">
          See All <Plus size={16} />
        </button>
      </div>

      <div className="divide-y divide-border-light">
        {taskSummaryList.map((t, i) => (
          <div key={i} className="flex items-center gap-4 py-3">
            <span className="flex-1 truncate text-[16px] text-text">
              {t.name}
            </span>
            <AvatarStack />
            <span className="w-[110px] text-[15px] text-text-secondary">
              {t.dueDate}
            </span>
            <PriorityPill priority={t.priority} />
            <KebabMenu
              header="Action"
              items={[
                { label: "View Task", icon: Eye, highlight: true },
                { label: "Duplicate", icon: Copy },
                { label: "Delete", icon: Trash2, danger: true },
              ]}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
