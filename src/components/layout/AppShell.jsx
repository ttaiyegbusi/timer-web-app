"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  const pathname = usePathname();
  // Leave Management uses the alternate sidebar (Users / Authorization).
  const variant = pathname?.startsWith("/leave") ? "leave" : "default";

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[280px_1fr]">
      <Sidebar variant={variant} />
      <main className="min-w-0">{children}</main>
    </div>
  );
}
