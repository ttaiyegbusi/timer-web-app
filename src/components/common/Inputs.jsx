"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function Checkbox({ checked, onChange }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`grid h-5 w-5 place-items-center rounded-[5px] border transition-colors ${
        checked ? "border-primary bg-primary text-white" : "border-border bg-white"
      }`}
    >
      {checked && <Check size={14} />}
    </button>
  );
}

export function CopyableId({ id }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="inline-flex items-center gap-2 text-[16px] text-text">
      {id}
      <button
        aria-label="Copy ID"
        onClick={() => {
          navigator.clipboard?.writeText(id);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className="text-text-muted hover:text-text"
      >
        {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
      </button>
    </span>
  );
}
