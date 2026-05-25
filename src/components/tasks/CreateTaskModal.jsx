"use client";

import { useState, useRef, useEffect } from "react";
import {
  X, Info, Flag, User, Timer, Tag, Paperclip, ChevronDown, Search, Check,
} from "lucide-react";
import { useTasks, ASSIGNEE_OPTIONS } from "./TaskStore";
import DatePicker, { formatDue } from "./DatePicker";
import { Avatar } from "@/components/common/Avatar";

const STATUS_OPTIONS = ["Todo", "In Progress", "Pending", "Done"];
const PRIORITY_OPTIONS = ["High", "Low", "Medium"];

function Pill({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-[15px] transition-colors ${
        active
          ? "border-danger/40 bg-danger-bg text-danger"
          : "border-border text-text-secondary hover:bg-subtle"
      }`}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
}

function RadioRow({ label, checked, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[15px] text-text hover:bg-subtle"
    >
      <span className={checked ? "font-medium" : ""}>{label}</span>
      <span
        className={`grid h-4 w-4 place-items-center rounded-full border ${
          checked ? "border-primary" : "border-border"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-primary" />}
      </span>
    </button>
  );
}

export default function CreateTaskModal({ open, onClose }) {
  const { addTask } = useTasks();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const [due, setDue] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagDraft, setTagDraft] = useState("");
  const [openMenu, setOpenMenu] = useState(null); // status|priority|assignee|date|tags
  const [assigneeQuery, setAssigneeQuery] = useState("");

  const popRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (popRef.current && !popRef.current.contains(e.target)) setOpenMenu(null);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!open) return null;

  const reset = () => {
    setName(""); setDescription(""); setStatus("Todo"); setPriority(null);
    setAssignees([]); setDue(null); setTags([]); setTagDraft(""); setOpenMenu(null);
  };

  const handleCreate = () => {
    addTask({
      name,
      description,
      status,
      priority: priority === "Medium" ? "Mid" : priority || "Mid",
      dueDate: due ? formatDue(due) : "",
      assignees,
      tags,
    });
    reset();
    onClose();
  };

  const toggleAssignee = (n) =>
    setAssignees((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );

  const filteredAssignees = ASSIGNEE_OPTIONS.filter((a) =>
    a.toLowerCase().includes(assigneeQuery.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4 pt-[12vh]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[640px] max-w-full rounded-xl bg-white p-6 shadow-dropdown">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[20px] font-medium text-text">Create a Task</h3>
          <button onClick={onClose} aria-label="Close" className="grid h-7 w-7 place-items-center rounded-full text-text-muted hover:bg-subtle">
            <X size={18} />
          </button>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task Name"
          className="w-full text-[28px] font-semibold text-text outline-none placeholder:text-text-muted/50"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a Description"
          rows={2}
          className="mt-2 w-full resize-none text-[16px] text-text-secondary outline-none placeholder:text-text-muted"
        />

        {/* Tag chips, if any */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-md bg-subtle px-2.5 py-1 text-[14px] text-text-secondary">
                {t}
                <button onClick={() => setTags(tags.filter((x) => x !== t))}>
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Pill row */}
        <div className="relative mt-6 flex flex-wrap items-center gap-3" ref={popRef}>
          <Pill icon={Info} label={status} active={openMenu === "status"} onClick={() => setOpenMenu(openMenu === "status" ? null : "status")} />
          <Pill icon={Flag} label={priority || "Priority"} active={!!priority} onClick={() => setOpenMenu(openMenu === "priority" ? null : "priority")} />
          <Pill icon={User} label={assignees.length ? `${assignees.length} Assignee${assignees.length > 1 ? "s" : ""}` : "Assignee"} active={openMenu === "assignee"} onClick={() => setOpenMenu(openMenu === "assignee" ? null : "assignee")} />
          <Pill icon={Timer} label={due ? formatDue(due) : "Due Date"} active={openMenu === "date"} onClick={() => setOpenMenu(openMenu === "date" ? null : "date")} />
          <Pill icon={Tag} label="Tags" active={openMenu === "tags"} onClick={() => setOpenMenu(openMenu === "tags" ? null : "tags")} />

          {/* Status dropdown */}
          {openMenu === "status" && (
            <div className="absolute left-0 top-12 z-10 w-[220px] rounded-lg border border-border bg-white p-1 shadow-dropdown">
              {STATUS_OPTIONS.map((s) => (
                <RadioRow key={s} label={s} checked={status === s} onClick={() => { setStatus(s); setOpenMenu(null); }} />
              ))}
            </div>
          )}

          {/* Priority dropdown */}
          {openMenu === "priority" && (
            <div className="absolute left-24 top-12 z-10 w-[220px] rounded-lg border border-border bg-white p-1 shadow-dropdown">
              {PRIORITY_OPTIONS.map((p) => (
                <RadioRow key={p} label={p} checked={priority === p} onClick={() => { setPriority(p); setOpenMenu(null); }} />
              ))}
            </div>
          )}

          {/* Assignee dropdown */}
          {openMenu === "assignee" && (
            <div className="absolute left-48 top-12 z-10 w-[280px] rounded-lg border border-border bg-white p-2 shadow-dropdown">
              <div className="mb-2 flex items-center gap-2 rounded-md border border-border px-3 py-2">
                <Search size={16} className="text-text-muted" />
                <input
                  value={assigneeQuery}
                  onChange={(e) => setAssigneeQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full text-[14px] outline-none placeholder:text-text-muted"
                />
              </div>
              {filteredAssignees.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleAssignee(a)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left hover:bg-subtle"
                >
                  <span className="flex items-center gap-2 text-[15px] text-text">
                    <Avatar name={a} size={28} />
                    {a}
                  </span>
                  <span className={`grid h-5 w-5 place-items-center rounded-[5px] border ${assignees.includes(a) ? "border-primary bg-primary text-white" : "border-border"}`}>
                    {assignees.includes(a) && <Check size={13} />}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Date picker */}
          {openMenu === "date" && (
            <div className="absolute left-0 top-12 z-20">
              <DatePicker
                initial={due}
                onCancel={() => setOpenMenu(null)}
                onSave={(d) => { setDue(d); setOpenMenu(null); }}
              />
            </div>
          )}

          {/* Tags input */}
          {openMenu === "tags" && (
            <div className="absolute right-0 top-12 z-10 w-[260px] rounded-lg border border-border bg-white p-3 shadow-dropdown">
              <p className="mb-2 text-[14px] text-text-secondary">Add a tag and press Enter</p>
              <input
                value={tagDraft}
                onChange={(e) => setTagDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagDraft.trim()) {
                    if (!tags.includes(tagDraft.trim())) setTags([...tags, tagDraft.trim()]);
                    setTagDraft("");
                  }
                }}
                placeholder="e.g. Design"
                className="w-full rounded-md border border-border px-3 py-2 text-[14px] outline-none focus:border-primary"
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-border-light pt-4">
          <button className="inline-flex items-center gap-2 text-[15px] text-text-secondary hover:text-text">
            <Paperclip size={18} />
            Add Attachment
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="rounded-lg bg-primary px-6 py-2.5 text-[15px] font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
