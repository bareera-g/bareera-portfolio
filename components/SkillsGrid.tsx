import { skills } from "@/lib/skills";

export default function SkillsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Object.entries(skills).map(([group, items]) => (
        <div
          key={group}
          className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950"
        >
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">
            {group}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((s) => (
              <span
                key={s}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
