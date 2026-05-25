export default function OutlineButton({
  children,
  icon: Icon,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex h-[52px] items-center gap-2 rounded-lg border border-border bg-white px-5 text-[16px] text-text-secondary transition-colors hover:bg-subtle ${className}`}
    >
      {Icon && <Icon size={20} className="text-text-secondary" />}
      <span>{children}</span>
    </button>
  );
}
