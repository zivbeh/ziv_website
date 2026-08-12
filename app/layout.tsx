import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteIntro } from "@/components/ui/SiteIntro";
import { Analytics } from "@vercel/analytics/react";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zivbehar.vercel.app"),
  title: {
    default: "Ziv Behar",
    template: "%s | Ziv Behar",
  },
  description:
    "UC Berkeley EECS Honors ’27. Products, research, and systems from campus tools to on-device ML.",
  applicationName: "Ziv Behar",
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
    "Next.js",
    "React",
    "TypeScript",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico?v=4", sizes: "any" },
      { url: "/favicon-16x16.png?v=4", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png?v=4", type: "image/png", sizes: "32x32" },
      { url: "/icon.png?v=4", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png?v=4",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ziv Behar",
    title: "Ziv Behar",
    description:
      "UC Berkeley EECS Honors ’27. Products, research, and systems from campus tools to on-device ML.",
    images: [
      {
        url: "/website.png",
        width: 1200,
        height: 630,
        alt: "Ziv Behar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziv Behar",
    description:
      "UC Berkeley EECS Honors ’27. Products, research, and systems from campus tools to on-device ML.",
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
      <body
        className={`${fraunces.variable} ${spaceGrotesk.variable} bg-black text-white antialiased`}
        suppressHydrationWarning
      >
        <Script id="site-intro-boot" strategy="beforeInteractive">
          {`(function(){try{var q=location.search;if(/[?&]skipIntro=1/.test(q))return;var p=location.pathname;if(p==="/"||p===""){document.documentElement.dataset.intro="pending";}}catch(e){}})();`}
        </Script>
        <SiteIntro />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
