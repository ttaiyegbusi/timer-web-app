"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BadgeInfo,
  UserRoundCog,
  Layers,
  Timer,
  Settings,
  ChevronDown,
  Plus,
  User,
  Building2,
  ShieldCheck,
  Shield,
} from "lucide-react";
import { currentUser, departments } from "@/data/mockData";

const mainMenu = [
  { label: "Dashboard & Analytics", href: "/dashboard", icon: Home },
  { label: "Task Management", href: "/tasks", icon: BadgeInfo },
  { label: "Employee Management", href: "/employees", icon: UserRoundCog },
  { label: "Leave Management", href: "/leave", icon: Layers },
  { label: "Attendance Management", href: "/attendance", icon: Timer },
  { label: "Settings", href: "/settings", icon: Settings },
];

// Leave variant drops "Settings" from main menu (it lives under Authorization).
const leaveMainMenu = mainMenu.filter((m) => m.label !== "Settings");

function NavItem({ item, active }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex h-11 items-center gap-3 rounded-lg px-4 text-[15px] transition-colors ${
        active
          ? "bg-white font-medium text-[#3B4252] shadow-soft"
          : "text-text-secondary hover:bg-white/60"
      }`}
    >
      <Icon size={20} strokeWidth={active ? 2 : 1.75} />
      <span>{item.label}</span>
    </Link>
  );
}

function SectionLabel({ children, withPlus }) {
  return (
    <div className="flex items-center justify-between px-4 pb-2 pt-4">
      <div className="flex items-center gap-2">
        {withPlus && <ChevronDown size={16} className="text-text-muted" />}
        <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {children}
        </span>
      </div>
      {withPlus && (
        <button
          aria-label="Add department"
          className="text-text-muted hover:text-text"
        >
          <Plus size={18} />
        </button>
      )}
    </div>
  );
}

function SimpleNavRow({ icon: Icon, label, href = "#" }) {
  return (
    <Link
      href={href}
      className="flex h-11 items-center gap-3 rounded-lg px-4 text-[15px] text-text-secondary hover:bg-white/60"
    >
      <Icon size={20} strokeWidth={1.75} />
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar({ variant = "default" }) {
  const pathname = usePathname();
  const menu = variant === "leave" ? leaveMainMenu : mainMenu;

  const isActive = (href) =>
    href === "/dashboard"
      ? pathname === "/" || pathname?.startsWith("/dashboard")
      : pathname?.startsWith(href);

  const initials = currentUser.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-sidebar lg:flex">
      {/* Logo */}
      <div className="flex h-[80px] items-center gap-2 px-6">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
          <Timer size={18} />
        </span>
        <span className="text-[22px] font-semibold text-primary">TimeinApp</span>
      </div>

      {/* Scrollable nav region */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <SectionLabel>Main Menu</SectionLabel>
        <nav className="flex flex-col gap-1">
          {menu.map((item) => (
            <NavItem key={item.label} item={item} active={isActive(item.href)} />
          ))}
        </nav>

        {variant === "leave" ? (
          <>
            <div className="my-3 border-t border-border-light" />
            <SectionLabel>Users</SectionLabel>
            <nav className="flex flex-col gap-1">
              <SimpleNavRow icon={User} label="Individual" />
              <SimpleNavRow icon={Building2} label="Companies" />
            </nav>

            <div className="my-3 border-t border-border-light" />
            <SectionLabel>Authorization</SectionLabel>
            <nav className="flex flex-col gap-1">
              <SimpleNavRow icon={ShieldCheck} label="Admins" />
              <SimpleNavRow icon={Shield} label="Admin Roles" />
              <SimpleNavRow icon={Settings} label="Settings" href="/settings" />
            </nav>
          </>
        ) : (
          <>
            <div className="my-3 border-t border-border-light" />
            <SectionLabel withPlus>Departments</SectionLabel>
            <nav className="flex flex-col gap-1">
              {departments.map((d) => (
                <div
                  key={d.name}
                  className="flex h-11 items-center gap-3 rounded-lg px-4 text-[15px] text-text-secondary hover:bg-white/60"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: d.color }}
                  />
                  <span>{d.name}</span>
                </div>
              ))}
            </nav>
          </>
        )}
      </div>

      {/* Bottom user card */}
      <div className="p-5">
        <div className="flex h-[68px] items-center gap-3 rounded-lg border border-border bg-white px-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-medium text-primary">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium text-text">
              {currentUser.name}
            </p>
            <p className="truncate text-[13px] text-text-muted">
              {currentUser.email}
            </p>
          </div>
          <ChevronDown size={18} className="text-text-muted" />
        </div>
      </div>
    </aside>
  );
}
