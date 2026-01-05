"use client";

import Link from "next/link";

const navLinkClass =
  "text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-white"
        >
          Bareera Gulraiz
        </Link>

        <nav className="flex items-center gap-5">
          <Link href="/projects" className={navLinkClass}>
            Projects
          </Link>
          <a
            href="/Bareera_Gulraiz_Resume.pdf"
            className={navLinkClass}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/bareera-gulraiz/"
            className={navLinkClass}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}
