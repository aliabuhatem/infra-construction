import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/components/admin-panel/ContentProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

// The site font (Myriad Pro) is self-hosted via @font-face in app/globals.css
// and applied through the --font-myriad CSS variable.

export const metadata: Metadata = {
  title: "INFRA Construction",
  description:
    "INFRA Construction is a leading contracting company delivering infrastructure, buildings, energy, water, and industrial projects across the Middle East, Africa, and beyond.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning
      lang="en"
      className="h-full antialiased"
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ContentProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ContentProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
