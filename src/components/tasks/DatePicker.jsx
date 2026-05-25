"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function formatDue(date) {
  if (!date) return "";
  return `${ordinal(date.getDate())} ${MONTHS_LONG[date.getMonth()]}, ${date.getFullYear()}`;
}

function MonthGrid({ year, month, selected, onPick }) {
  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (d) =>
    selected &&
    selected.getFullYear() === year &&
    selected.getMonth() === month &&
    selected.getDate() === d;

  return (
    <div className="w-[280px]">
      <p className="mb-3 text-[16px] font-medium text-text">
        {MONTHS[month]} {year}
      </p>
      <div className="mb-1 grid grid-cols-7 text-center text-[13px] text-text-muted">
        {DOW.map((d) => (
          <span key={d} className="py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-[14px]">
        {cells.map((d, i) =>
          d === null ? (
            <span key={i} />
          ) : (
            <button
              key={i}
              onClick={() => onPick(new Date(year, month, d))}
              className={`mx-auto grid h-9 w-9 place-items-center rounded-md ${
                isSelected(d)
                  ? "bg-primary font-medium text-white"
                  : "text-text hover:bg-subtle"
              }`}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default function DatePicker({ initial, onSave, onCancel }) {
  const [selected, setSelected] = useState(initial || null);
  // Left month anchor; right month is the following month.
  const base = initial || new Date(2024, 2, 1); // Mar 2024 like the screenshot
  const [view, setView] = useState({ year: base.getFullYear(), month: base.getMonth() });

  const rightMonth = (view.month + 1) % 12;
  const rightYear = view.month === 11 ? view.year + 1 : view.year;

  const shift = (delta) => {
    let m = view.month + delta;
    let y = view.year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setView({ year: y, month: m });
  };

  return (
    <div className="w-[600px] rounded-xl border border-border bg-white p-5 shadow-dropdown">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-[18px] font-medium text-text">Select Due Date</h4>
        <button onClick={onCancel} aria-label="Close" className="text-text-muted hover:text-text">
          <X size={20} />
        </button>
      </div>

      <div className="relative flex gap-8">
        <button
          onClick={() => shift(-1)}
          aria-label="Previous month"
          className="absolute right-8 top-0 text-text-secondary hover:text-text"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => shift(1)}
          aria-label="Next month"
          className="absolute right-0 top-0 text-text-secondary hover:text-text"
        >
          <ChevronRight size={18} />
        </button>

        <MonthGrid year={view.year} month={view.month} selected={selected} onPick={setSelected} />
        <MonthGrid year={rightYear} month={rightMonth} selected={selected} onPick={setSelected} />
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-border px-5 py-2.5 text-[15px] text-text-secondary hover:bg-subtle"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(selected)}
          className="rounded-lg bg-primary px-5 py-2.5 text-[15px] font-medium text-white hover:bg-primary-hover"
        >
          Save Due Date
        </button>
      </div>
    </div>
  );
}
