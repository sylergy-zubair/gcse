import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GCSE - Empower Your Learning with RAG-Powered AI",
  description: "Our RAG-based system is trained on verified GCSE papers to ensure every answer, hint, and report reflects real exam standards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

