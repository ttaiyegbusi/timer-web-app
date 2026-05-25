"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft, MoreVertical, Paperclip, X, User, Flag, Timer, Info, Tag, Zap,
} from "lucide-react";
import { useTasks } from "@/components/tasks/TaskStore";
import { Avatar } from "@/components/common/Avatar";
import { PriorityPill } from "@/components/common/Pills";
import RichTextEditor from "@/components/tasks/RichTextEditor";

const activity = [
  { name: "Temitope Aiyegbusi", action: "created a Task", time: "Sep 28, 2023 at 18:23" },
  { name: "Alex Luther", action: "made a comment", time: "Sep 28, 2023 at 18:23" },
  { name: "Temitope Aiyegbusi", action: "made a comment", time: "Sep 28, 2023 at 18:23" },
  { name: "Alex Luther", action: "made a comment", time: "Sep 28, 2023 at 18:23" },
];

function PropRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <span className="flex w-[120px] shrink-0 items-center gap-2 text-[15px] text-text-secondary">
        <Icon size={18} />
        {label}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getTask, updateTask, loaded } = useTasks();
  const task = getTask(id);
  const [comment, setComment] = useState("");

  if (!loaded) {
    return <div className="p-10 text-text-secondary">Loading…</div>;
  }
  if (!task) {
    return (
      <div className="p-10">
        <p className="text-text-secondary">Task not found.</p>
        <button onClick={() => router.push("/tasks")} className="mt-3 text-primary hover:underline">
          Back to Task Management
        </button>
      </div>
    );
  }

  // Build initial editor HTML from the stored description.
  const initialHtml = task.descriptionHtml
    ? task.descriptionHtml
    : task.description
    ? `<p>${task.description}</p>`
    : "<p></p>";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px]">
      {/* Center column */}
      <div className="border-r border-border">
        {/* Breadcrumb */}
        <div className="flex h-[72px] items-center gap-3 border-b border-border px-8 text-[16px]">
          <button onClick={() => router.push("/tasks")} className="flex items-center gap-1 text-text hover:text-primary">
            <ChevronLeft size={18} /> Go Back
          </button>
          <span className="text-border">|</span>
          <span className="text-text-secondary">Dashboard</span>
          <span className="text-text-muted">›</span>
          <span className="text-text-secondary">Task Management</span>
          <span className="text-text-muted">›</span>
          <span className="font-medium text-primary">{task.name}</span>
        </div>

        <div className="px-8 py-8">
          <div className="mb-4 flex items-start justify-between">
            <input
              value={task.name}
              onChange={(e) => updateTask(task.id, { name: e.target.value })}
              className="w-full text-[30px] font-semibold text-text outline-none"
            />
            <button className="grid h-8 w-8 place-items-center rounded-md text-text-muted hover:bg-subtle">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-[14px] text-text-secondary">
              <Paperclip size={14} /> Landing Page PRD
              <button><X size={13} /></button>
            </span>
            {task.tags?.map((t) => (
              <span key={t} className="rounded-md bg-subtle px-3 py-1.5 text-[14px] text-text-secondary">
                {t}
              </span>
            ))}
          </div>

          {/* Editor */}
          <RichTextEditor
            content={initialHtml}
            onChange={(html) => updateTask(task.id, { descriptionHtml: html })}
          />
        </div>

        {/* Comments */}
        <div className="border-t border-border px-8 py-6">
          <h3 className="mb-6 flex items-center gap-2 text-[18px] text-text">
            <span className="text-text-secondary">💬</span> Comments
          </h3>
          <div className="flex flex-col items-center py-10">
            <div className="mb-4 grid h-24 w-24 place-items-center rounded-2xl bg-subtle">
              <span className="text-4xl">📦</span>
            </div>
            <p className="text-text-muted">No Comments Yet</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border px-4 py-3">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a Comment"
              className="w-full text-[15px] outline-none placeholder:text-text-muted"
            />
            <button className="text-text-muted hover:text-text">
              <Paperclip size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right properties panel */}
      <aside className="px-8 py-8">
        <h3 className="mb-4 text-[20px] font-medium text-text">Properties</h3>

        <PropRow icon={User} label="Assignee">
          {task.assignees?.length ? (
            <span className="inline-flex items-center gap-2 rounded-pill bg-subtle px-2.5 py-1 text-[15px] text-text">
              <Avatar name={task.assignees[0]} size={24} />
              {task.assignees[0]}
            </span>
          ) : (
            <span className="text-text-muted">Unassigned</span>
          )}
        </PropRow>

        <PropRow icon={Flag} label="Priority">
          <PriorityPill priority={task.priority} />
        </PropRow>

        <PropRow icon={Timer} label="Due Date">
          <span className="text-[15px] text-text">{task.dueDate || "—"}</span>
        </PropRow>

        <PropRow icon={Info} label="Status">
          <span className="text-[15px] text-text">{task.status}</span>
        </PropRow>

        <PropRow icon={Tag} label="Tags">
          <div className="flex flex-wrap gap-2">
            {task.tags?.length ? (
              task.tags.map((t) => (
                <span key={t} className="rounded-md bg-subtle px-2.5 py-1 text-[14px] text-text-secondary">
                  {t}
                </span>
              ))
            ) : (
              <span className="text-text-muted">—</span>
            )}
          </div>
        </PropRow>

        <h3 className="mb-2 mt-8 flex items-center gap-2 text-[20px] font-medium text-text">
          <Zap size={18} className="text-primary" /> Activity
        </h3>
        <div className="space-y-4 border-l border-border-light pl-4">
          {activity.map((a, i) => (
            <div key={i} className="flex gap-3">
              <Avatar name={a.name} size={32} />
              <div>
                <p className="text-[15px] text-text">
                  <span className="font-medium">{a.name}</span>{" "}
                  <span className="text-text-secondary">{a.action}</span>
                </p>
                <p className="text-[13px] text-text-muted">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
