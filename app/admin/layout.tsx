import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — INFRA Construction",
  description: "Secure admin panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0f1117" }}>
        {children}
      </body>
    </html>
  );
}