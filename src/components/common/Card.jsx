export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-border bg-white p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, right }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-[20px] font-medium text-text">{title}</h3>
      {right ? <div className="flex items-center gap-3">{right}</div> : null}
    </div>
  );
}

export function PageContent({ children }) {
  return <div className="px-10 pb-12 pt-8">{children}</div>;
}

export function SectionTitle({ children, right }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-[26px] font-semibold text-text">{children}</h2>
      {right ? <div className="flex items-center gap-3">{right}</div> : null}
    </div>
  );
}
