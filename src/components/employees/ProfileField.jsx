"use client";

import { ChevronDown, Calendar } from "lucide-react";

export default function ProfileField({
  label,
  value,
  editing,
  onChange,
  type = "text", // text | select | date
  options = [],
  placeholder = "",
}) {
  const base =
    "h-[52px] w-full rounded-lg border px-4 text-[16px] text-text outline-none";
  const ro = "border-border bg-white";
  const ed = "border-border bg-white focus:border-primary";

  return (
    <label className="block">
      <span className="mb-1.5 block text-[14px] text-text-secondary">{label}</span>
      {type === "select" ? (
        <div className="relative">
          <select
            disabled={!editing}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            className={`${base} ${editing ? ed : ro} appearance-none ${
              !editing ? "cursor-default" : ""
            }`}
          >
            {value ? null : <option value="">{placeholder || "Select"}</option>}
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
            {value && !options.includes(value) && <option value={value}>{value}</option>}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
          />
        </div>
      ) : type === "date" ? (
        <div className="relative">
          <input
            readOnly={!editing}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={`${base} ${editing ? ed : ro}`}
          />
          <Calendar
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
          />
        </div>
      ) : (
        <input
          readOnly={!editing}
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`${base} ${editing ? ed : ro}`}
        />
      )}
    </label>
  );
}
