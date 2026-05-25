"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, Plus, Eye, Copy, Trash2 } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { PriorityPill } from "@/components/common/Pills";
import { Checkbox } from "@/components/common/Inputs";
import KebabMenu from "@/components/common/KebabMenu";
import {
  useTasks,
  STATUS_ORDER,
  STATUS_LABEL,
  GROUP_COUNT,
} from "@/components/tasks/TaskStore";

function AssigneeCluster({ assignees = [] }) {
  if (!assignees.length) {
    return <span className="text-[15px] text-text-muted">—</span>;
  }
  const shown = assignees.slice(0, 3);
  const extra = assignees.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((name, i) => (
        <span key={i} className="rounded-full ring-2 ring-white" style={{ marginLeft: i === 0 ? 0 : -10 }}>
          <Avatar name={name} size={32} />
        </span>
      ))}
      {extra > 0 && (
        <span
          className="grid h-8 w-8 place-items-center rounded-full bg-subtle text-[12px] font-medium text-text-secondary ring-2 ring-white"
          style={{ marginLeft: -10 }}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}

function TaskRow({ task }) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 border-b border-border-light px-4 py-4">
      <Checkbox checked={checked} onChange={setChecked} />
      <button
        onClick={() => router.push(`/tasks/${task.id}`)}
        className="flex-1 truncate text-left text-[17px] text-text hover:text-primary"
      >
        {task.name}
      </button>
      <div className="w-[120px]">
        <AssigneeCluster assignees={task.assignees} />
      </div>
      <span className="w-[130px] text-[16px] text-text-secondary">{task.dueDate}</span>
      <div className="w-[110px]">
        <PriorityPill priority={task.priority} />
      </div>
      <KebabMenu
        header="Action"
        items={[
          { label: "View Task", icon: Eye, highlight: true, onClick: () => router.push(`/tasks/${task.id}`) },
          { label: "Duplicate", icon: Copy },
          { label: "Delete", icon: Trash2, danger: true },
        ]}
      />
    </div>
  );
}

function TaskGroup({ title, label, tasks }) {
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
          {label}
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-primary px-1.5 text-[13px] font-medium text-white">
            {GROUP_COUNT}
          </span>
        </button>
        <button aria-label="Add task" className="text-text-muted hover:text-text">
          <Plus size={20} />
        </button>
      </div>

      {open && tasks.length > 0 && (
        <>
          <div className="flex items-center gap-4 px-4 py-2.5 text-[15px] text-text-secondary">
            <span className="w-5" />
            <span className="flex-1">Task Name</span>
            <span className="w-[120px]">Assignee</span>
            <span className="w-[130px]">Due Date</span>
            <span className="w-[110px]">Priority</span>
            <span className="w-8" />
          </div>
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </>
      )}
    </div>
  );
}

export default function TaskListGroups() {
  const { tasks } = useTasks();
  return (
    <div className="space-y-4">
      {STATUS_ORDER.map((status) => (
        <TaskGroup
          key={status}
          title={status}
          label={STATUS_LABEL[status]}
          tasks={tasks.filter((t) => t.status === status)}
        />
      ))}
    </div>
  );
}
