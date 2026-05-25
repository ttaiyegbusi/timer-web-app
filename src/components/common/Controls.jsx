"use client";

import { ListFilter, ChevronDown } from "lucide-react";

export function FilterButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-[52px] items-center gap-2 rounded-lg border border-border bg-white px-5 text-[16px] text-text-secondary hover:bg-subtle"
    >
      <ListFilter size={20} />
      <span>Filter</span>
    </button>
  );
}

export function DateControl({ children }) {
  return (
    <button className="inline-flex h-[52px] items-center gap-2 rounded-lg border border-border bg-white px-5 text-[16px] text-text-secondary hover:bg-subtle">
      <span>{children}</span>
      <ChevronDown size={18} className="text-text-muted" />
    </button>
  );
}
