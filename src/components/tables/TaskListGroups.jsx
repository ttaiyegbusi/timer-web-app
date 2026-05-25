"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Eye, Copy, Trash2 } from "lucide-react";
import { AvatarStack } from "@/components/common/Avatar";
import { PriorityPill } from "@/components/common/Pills";
import { Checkbox } from "@/components/common/Inputs";
import KebabMenu from "@/components/common/KebabMenu";

function TaskRow({ task }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-4 border-b border-border-light px-4 py-4">
      <Checkbox checked={checked} onChange={setChecked} />
      <span className="flex-1 truncate text-[17px] text-text">{task.name}</span>
      <div className="w-[120px]">
        <AvatarStack />
      </div>
      <span className="w-[130px] text-[16px] text-text-secondary">
        {task.dueDate}
      </span>
      <div className="w-[110px]">
        <PriorityPill priority={task.priority} />
      </div>
      <KebabMenu
        header="Action"
        items={[
          { label: "View Task", icon: Eye, highlight: true },
          { label: "Duplicate", icon: Copy },
          { label: "Delete", icon: Trash2, danger: true },
        ]}
      />
    </div>
  );
}

function TaskGroup({ group }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="flex items-center justify-between bg-subtle px-4 py-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 text-[17px] font-medium text-text"
        >
          {open ? (
            <ChevronDown size={18} className="text-text-secondary" />
          ) : (
            <ChevronRight size={18} className="text-text-secondary" />
          )}
          {group.title}
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-primary px-1.5 text-[13px] font-medium text-white">
            {group.count}
          </span>
        </button>
        <button aria-label="Add task" className="text-text-muted hover:text-text">
          <Plus size={20} />
        </button>
      </div>

      {open && group.tasks.length > 0 && (
        <>
          <div className="flex items-center gap-4 px-4 py-2.5 text-[15px] text-text-secondary">
            <span className="w-5" />
            <span className="flex-1">Task Name</span>
            <span className="w-[120px]">Assignee</span>
            <span className="w-[130px]">Due Date</span>
            <span className="w-[110px]">Priority</span>
            <span className="w-8" />
          </div>
          {group.tasks.map((t, i) => (
            <TaskRow key={i} task={t} />
          ))}
        </>
      )}
    </div>
  );
}

export default function TaskListGroups({ groups }) {
  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <TaskGroup key={g.title} group={g} />
      ))}
    </div>
  );
}
