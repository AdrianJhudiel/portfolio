import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/lib/site";
import PersonJsonLd from "@/components/seo/PersonJsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const title = "Jhudiel Adrian Artezuela | Full-Stack Developer";
const description =
  "Portfolio of Jhudiel Adrian B. Artezuela — IT graduate and Performance-Based Associate at MetaWatt LLC, building full-stack and backend-leaning software.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  keywords: [
    "Jhudiel Adrian Artezuela",
    "Full-Stack Developer",
    "Backend Developer",
    "NestJS",
    "Spring Boot",
    "Python Django",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title,
    description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body
        className="h-full text-[var(--foreground)]"
        suppressHydrationWarning
      >
        <PersonJsonLd />
        {children}
      </body>
    </html>
  );
}
