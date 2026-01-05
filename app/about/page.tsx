import Section from "@/components/Section";

export default function AboutPage() {
  return (
    <main className="py-12">
      <Section
        title="About"
        subtitle="A quick snapshot of what I care about and how I build."
      >
        <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950">
          <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            I’m Bareera — a CS & Informatics student at UC Irvine. I like
            building systems that are reliable, measurable, and cleanly
            engineered. My work spans full-stack applications, data pipelines,
            and automation — and I care a lot about usability and clarity for
            the end user.
          </p>

          <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            Right now I’m focused on software engineering internships where I
            can ship real features, improve performance, and build tools that
            help people make better decisions.
          </p>
        </div>
      </Section>
    </main>
  );
}
