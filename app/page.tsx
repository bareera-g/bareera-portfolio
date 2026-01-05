import Link from "next/link";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsGrid from "@/components/SkillsGrid";
import { projects } from "@/lib/projects";
import { MotionDiv, fadeUp, stagger } from "@/components/Motion";

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <main className="py-12">
      {/* HERO */}
      <MotionDiv
        variants={stagger}
        initial="hidden"
        animate="show"
        className="pb-10"
      >
        <MotionDiv variants={fadeUp}>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            CS & Informatics @ UC Irvine • SWE internships
          </p>
        </MotionDiv>

        <MotionDiv variants={fadeUp} className="mt-4">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Building scalable software at the intersection of data, systems, and
            user experience.
          </h1>
        </MotionDiv>

        <MotionDiv variants={fadeUp} className="mt-5">
          <p className="max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Software Engineering Intern at EdgeLab and Web Engineering Student
            Worker at University Advancement. I build full-stack applications,
            data pipelines, and automation that improve reliability, performance,
            and usability.
          </p>
        </MotionDiv>

        <MotionDiv variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 dark:bg-white dark:text-zinc-950"
          >
            View Projects
          </Link>
          <a
            href="/Bareera_Gulraiz_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
          >
            Download Resume
          </a>
        </MotionDiv>
      </MotionDiv>

      {/* FEATURED PROJECTS */}
      <Section
        title="Featured Projects"
        subtitle="Systems, full-stack applications, and data-driven builds that reflect how I work: clean architecture, reliability, and measurable impact."
      >
        <MotionDiv
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {featured.map((p) => (
            <MotionDiv key={p.slug} variants={fadeUp}>
              <ProjectCard project={p} />
            </MotionDiv>
          ))}
        </MotionDiv>
      </Section>

      {/* EXPERIENCE */}
      <Section
        title="Experience"
        subtitle="Research and campus roles where I shipped real automation, pipelines, and dashboards for stakeholders."
      >
        <ExperienceTimeline />
      </Section>

      {/* SKILLS */}
      <Section
        title="Skills"
        subtitle="A focused set of tools I use regularly across pipelines, full-stack apps, and automation."
      >
        <SkillsGrid />
      </Section>

      {/* CONTACT */}
      <Section
        title="Contact"
        subtitle="Open to SWE internship opportunities where I can build reliable systems and ship features that matter."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:bareera.gulraiz21@gmail.com"
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 dark:bg-white dark:text-zinc-950"
          >
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/bareera-gulraiz/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
          >
            LinkedIn
          </a>
        </div>
      </Section>
    </main>
  );
}
