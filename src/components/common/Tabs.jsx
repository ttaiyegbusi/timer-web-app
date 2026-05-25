"use client";

export function UnderlineTabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-8 border-b border-border">
      {tabs.map((t) => {
        const label = typeof t === "string" ? t : t.label;
        const Icon = typeof t === "string" ? null : t.icon;
        const isActive = active === label;
        return (
          <button
            key={label}
            onClick={() => onChange?.(label)}
            className={`-mb-px flex items-center gap-2 border-b-2 pb-3 text-[16px] transition-colors ${
              isActive
                ? "border-primary font-medium text-primary"
                : "border-transparent text-text-secondary hover:text-text"
            }`}
          >
            {Icon && <Icon size={20} />}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function PillTabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map((t) => {
        const isActive = active === t;
        return (
          <button
            key={t}
            onClick={() => onChange?.(t)}
            className={`rounded-lg px-4 py-2 text-[16px] transition-colors ${
              isActive
                ? "bg-primary-soft font-medium text-primary"
                : "text-text-secondary hover:bg-subtle"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
