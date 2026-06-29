import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/components/admin-panel/ContentProvider";

// Single typeface for the whole site. next/font downloads the woff2 files at
// build time and self-hosts them from our own origin (no runtime request to
// Google), injects @font-face with font-display: swap, and adds a
// size-adjusted fallback so layout doesn't shift. We load every weight the UI
// actually uses (400/500/600/700) so the browser never has to synthesize one.
const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
      className={`${ibmPlexSans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ContentProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}