import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/ui/TopBar";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zivbehar.vercel.app"),
  title: {
    default: "Ziv Behar's Portfolio",
    template: "%s | Ziv Behar",
  },
  description:
    "Electrical and Software Engineering, AI, web, and games. UC Berkeley EECS '27. Engineering the future.",
  applicationName: "Ziv Behar Portfolio",
  authors: [{ name: "Ziv Behar", url: "https://zivbehar.vercel.app" }],
  creator: "Ziv Behar",
  publisher: "Ziv Behar",
  keywords: [
    "Ziv Behar",
    "Portfolio",
    "Software Engineering",
    "Electrical Engineering",
    "UC Berkeley",
    "EECS",
    "AI",
    "Web Development",
    "Game Development",
    "Next.js",
    "React",
    "Three.js",
    "TypeScript",
    "Developer",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Assuming you might have or want one
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ziv Behar's Portfolio",
    title: "Ziv Behar's Portfolio",
    description:
      "Electrical and Software Engineering, AI, web, and games. UC Berkeley EECS '27. Engineering the future.",
    images: [
      {
        url: "/website.png",
        width: 1200,
        height: 630,
        alt: "Ziv Behar's Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziv Behar's Portfolio",
    description:
      "Electrical and Software Engineering, AI, web, and games. UC Berkeley EECS '27. Engineering the future.",
    images: ["/website.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <TopBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
