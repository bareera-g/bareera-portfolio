import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { MotionDiv, fadeUp, stagger } from "@/components/Motion";

export default function ProjectsPage() {
  return (
    <main className="py-12">
      <Section
        title="Projects"
        subtitle="A focused portfolio of systems, pipelines, and full-stack builds."
      >
        <MotionDiv
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-3"
        >
          {projects.map((p) => (
            <MotionDiv key={p.slug} variants={fadeUp}>
              <ProjectCard project={p} />
            </MotionDiv>
          ))}
        </MotionDiv>
      </Section>
    </main>
  );
}
