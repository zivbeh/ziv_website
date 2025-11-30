import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics",
  description: "Academic background, coursework, and achievements of Ziv Behar at UC Berkeley.",
  openGraph: {
    title: "Academics | Ziv Behar",
    description: "Academic background, coursework, and achievements of Ziv Behar at UC Berkeley.",
  },
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

