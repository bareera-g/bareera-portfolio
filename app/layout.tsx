import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bareera Gulraiz | Software Engineering Portfolio",
  description:
    "CS & Informatics @ UC Irvine. Building full-stack apps, data pipelines, and automation with a focus on reliability and user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-950 antialiased dark:bg-zinc-950 dark:text-white">
        <Navbar />
        <div className="mx-auto max-w-6xl px-5">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
