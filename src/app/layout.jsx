import "./globals.css";
import localFont from "next/font/local";
import AppShell from "@/components/layout/AppShell";
import { TaskProvider } from "@/components/tasks/TaskStore";

const plexSans = localFont({
  src: "./fonts/IBMPlexSans.woff2",
  display: "swap",
  variable: "--font-sans",
  weight: "100 700",
});

export const metadata = {
  title: "TimeinApp",
  description: "HR & workforce management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plexSans.variable}>
      <body>
        <TaskProvider>
          <AppShell>{children}</AppShell>
        </TaskProvider>
      </body>
    </html>
  );
}
