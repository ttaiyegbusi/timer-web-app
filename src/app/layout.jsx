import "./globals.css";
import AppShell from "@/components/layout/AppShell";

export const metadata = {
  title: "TimeinApp",
  description: "HR & workforce management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
