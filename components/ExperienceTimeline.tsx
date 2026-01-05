import { experience } from "@/lib/experience";

export default function ExperienceTimeline() {
  return (
    <div className="space-y-6">
      {experience.map((item) => (
        <div
          key={item.org + item.role}
          className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950"
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-x-2">
              <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white">
                {item.org}
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                • {item.location}
              </span>
            </div>

            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {item.role}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {item.dates}
            </p>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
