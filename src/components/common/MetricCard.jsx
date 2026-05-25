import { ArrowUp, ArrowDown } from "lucide-react";

export function MetricCard({ label, value, trend, dir, icon, last }) {
  const up = dir === "up";
  return (
    <div
      className={`flex items-start justify-between px-6 py-5 ${
        last ? "" : "border-r border-border"
      }`}
    >
      <div>
        <p className="text-[16px] text-text-secondary">{label}</p>
        <p className="mt-1 text-[30px] font-semibold leading-tight text-text">
          {value}
        </p>
        <p className="mt-2 flex items-center gap-1 text-[14px]">
          <span
            className={`flex items-center gap-0.5 font-medium ${
              up ? "text-success" : "text-danger"
            }`}
          >
            {up ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {trend}%
          </span>
          <span className="text-text-muted">vs last month</span>
        </p>
      </div>
      {icon && (
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-subtle text-text-secondary">
          {icon}
        </span>
      )}
    </div>
  );
}

export function MetricCardGrid({ items }) {
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-border bg-white sm:grid-cols-2 lg:grid-cols-4">
      {items.map((m, i) => (
        <MetricCard
          key={m.label}
          {...m}
          last={(i + 1) % 4 === 0}
        />
      ))}
    </div>
  );
}
