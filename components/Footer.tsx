export default function Footer() {
    return (
      <footer className="border-t border-zinc-200/60 py-10 dark:border-zinc-800/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-zinc-600 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Bareera Gulraiz</p>
          <p className="opacity-80">
            Built with Next.js, TypeScript, Tailwind, and Framer Motion.
          </p>
        </div>
      </footer>
    );
  }
  