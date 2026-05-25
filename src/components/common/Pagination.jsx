"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function SimplePagination({
  totalPages = 30,
  current = 3,
  onChange,
}) {
  const pages = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex items-center justify-center gap-6 py-6">
      <span className="text-[16px] font-medium text-text">
        Page 1 of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange?.(p)}
            className={`grid h-9 w-9 place-items-center rounded-md text-[16px] ${
              p === current
                ? "border border-primary text-primary"
                : "text-text-secondary hover:bg-subtle"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button className="grid h-9 w-9 place-items-center rounded-md border border-border text-text-secondary hover:bg-subtle">
          <ChevronLeft size={18} />
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-md border border-border text-text-secondary hover:bg-subtle">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function FullPagination({
  rowsPerPage = 8,
  total = 500,
  current = 1,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-[15px] text-text-secondary">
      <div className="flex items-center gap-3">
        <span>Rows per Page</span>
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-white px-3 text-text">
          {rowsPerPage}
          <ChevronLeft size={14} className="rotate-[-90deg]" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 hover:bg-subtle">
          <ChevronLeft size={16} /> Prev
        </button>
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            className={`grid h-10 w-10 place-items-center rounded-md ${
              p === current
                ? "bg-subtle font-medium text-text"
                : "hover:bg-subtle"
            }`}
          >
            {p}
          </button>
        ))}
        <span className="px-1">...</span>
        <button className="grid h-10 w-10 place-items-center rounded-md hover:bg-subtle">
          50
        </button>
        <button className="inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 hover:bg-subtle">
          Next <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-text-muted">/</span>
        <span>Go to Page</span>
        <input
          defaultValue={1}
          className="h-10 w-12 rounded-md border border-border px-2 text-center text-text outline-none"
        />
        <button className="inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 hover:bg-subtle">
          Go <ChevronRight size={16} />
        </button>
      </div>

      <span className="text-text-muted">
        Showing 1 - {rowsPerPage} of {total}
      </span>
    </div>
  );
}
