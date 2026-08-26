import type { Metadata } from "next";

const DESCRIPTION =
  "Ziv Behar — UC Berkeley EECS Honors ’27. Resume.";

export const metadata: Metadata = {
  title: "Resume",
  description: DESCRIPTION,
  alternates: {
    canonical: "/resume",
    types: {
      "application/pdf": "/CV.pdf",
    },
  },
  openGraph: {
    title: "Ziv Behar — Resume",
    description: DESCRIPTION,
    url: "/resume",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziv Behar — Resume",
    description: DESCRIPTION,
  },
};

export default function ResumePage() {
  return (
    <iframe
      src="/CV.pdf?title=1"
      title="Ziv Behar resume"
      className="fixed inset-0 z-50 h-dvh w-full border-0 bg-neutral-200"
    />
  );
}
