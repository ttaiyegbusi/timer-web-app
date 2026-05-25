import "./globals.css";
import localFont from "next/font/local";
import AppShell from "@/components/layout/AppShell";
import { TaskProvider } from "@/components/tasks/TaskStore";

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  display: "swap",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata = {
  title: "TimeinApp",
  description: "HR & workforce management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <TaskProvider>
          <AppShell>{children}</AppShell>
        </TaskProvider>
      </body>
    </html>
  );
}
