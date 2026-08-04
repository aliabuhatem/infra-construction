import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/components/admin-panel/ContentProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getContent } from "@/lib/getContent";
import { resolveServices, resolveSectors, type Expertise } from "@/lib/expertise";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-source-sans",
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

// Only the fields the menus render — keeps the catalogue's full copy out of the
// client payload on every page.
const toNavItem = (i: Expertise) => ({ slug: i.slug, num: i.num, title: i.title });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const c = await getContent();

  return (
    <html suppressHydrationWarning
      lang="en"
      className={`${sourceSans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ContentProvider>
          <Navbar
            sectors={resolveSectors(c).map(toNavItem)}
            services={resolveServices(c).map(toNavItem)}
          />
          <main className="flex-1">{children}</main>
          <Footer />
        </ContentProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
