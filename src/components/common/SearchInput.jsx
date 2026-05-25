"use client";

import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}) {
  return (
    <div
      className={`flex h-[52px] items-center gap-3 rounded-lg border border-border bg-white px-4 ${className}`}
    >
      <Search size={20} className="shrink-0 text-text-muted" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[16px] text-text outline-none placeholder:text-text-muted"
      />
    </div>
  );
}
