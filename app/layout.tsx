import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/ui/TopBar";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ziv Behar's Portfolio",
  description: "Electrical and Software Engineering, AI, web, and games. UC Berkeley EECS '27. Engineering the future.",
  icons: {
    icon: "/favicon.ico",
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
