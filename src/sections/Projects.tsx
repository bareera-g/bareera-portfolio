import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects, Project } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-solid">
            Projects
          </h2>
          <p className="mt-3 text-sm text-charcoal-solid/45 max-w-lg leading-relaxed">
            Systems, full-stack applications, and data-driven builds — clean architecture,
            reliability, and measurable impact.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onReadMore={setSelected} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
