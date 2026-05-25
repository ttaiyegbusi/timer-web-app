import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { TaskProvider } from "@/components/tasks/TaskStore";

export const metadata = {
  title: "TimeinApp",
  description: "HR & workforce management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TaskProvider>
          <AppShell>{children}</AppShell>
        </TaskProvider>
      </body>
    </html>
  );
}
