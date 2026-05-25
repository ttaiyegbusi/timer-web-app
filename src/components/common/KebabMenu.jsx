"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, MoreHorizontal } from "lucide-react";

export default function KebabMenu({ items = [], header, variant = "default" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Row actions"
        onClick={() => setOpen((o) => !o)}
        className={
          variant === "circle"
            ? "grid h-12 w-12 place-items-center rounded-full border border-border bg-white text-text-secondary hover:bg-subtle"
            : "grid h-8 w-8 place-items-center rounded-md text-text-muted hover:bg-subtle"
        }
      >
        {variant === "circle" ? (
          <MoreHorizontal size={20} />
        ) : (
          <MoreVertical size={20} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-1 w-[260px] overflow-hidden rounded-lg border border-border bg-white py-1 shadow-dropdown">
          {header && (
            <div className="bg-subtle px-4 py-2.5 text-[15px] text-text-secondary">
              {header}
            </div>
          )}
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <button
                key={i}
                onClick={() => {
                  it.onClick?.();
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-[16px] hover:bg-subtle ${
                  it.danger ? "text-danger" : "text-text"
                } ${it.highlight ? "bg-subtle" : ""}`}
              >
                {Icon && <Icon size={20} />}
                <span>{it.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
