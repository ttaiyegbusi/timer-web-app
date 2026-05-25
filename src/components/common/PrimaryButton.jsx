import { Plus } from "lucide-react";

export default function PrimaryButton({
  children,
  icon: Icon = Plus,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-12 items-center gap-2 rounded-pill bg-primary px-6 text-[16px] font-medium text-white transition-colors hover:bg-primary-hover"
    >
      <span>{children}</span>
      {Icon && <Icon size={20} />}
    </button>
  );
}
