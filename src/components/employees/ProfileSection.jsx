"use client";

import { Pencil, Check } from "lucide-react";

export default function ProfileSection({ icon: Icon, title, editing, onToggle, children }) {
  return (
    <div className="rounded-xl border border-border bg-white p-6">
      <div className="mb-5 flex items-center justify-between border-b border-border-light pb-4">
        <h3 className="flex items-center gap-2 text-[18px] font-semibold text-text">
          {Icon && <Icon size={20} className="text-text-secondary" />}
          {title}
        </h3>
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-soft px-4 py-2 text-[15px] font-medium text-primary hover:bg-primary-soft/70"
        >
          {editing ? <Check size={16} /> : <Pencil size={16} />}
          {editing ? "Save" : "Edit"}
        </button>
      </div>
      {children}
    </div>
  );
}
