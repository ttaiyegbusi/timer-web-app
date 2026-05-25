export default function TopHeader({ title, right }) {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border px-10">
      <h1 className="text-[22px] font-semibold text-text">{title}</h1>
      {right ? <div className="flex items-center gap-3">{right}</div> : null}
    </header>
  );
}
