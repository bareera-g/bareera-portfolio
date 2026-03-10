import { motion } from 'framer-motion'
import { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  onReadMore: (project: Project) => void
}

export default function ProjectCard({ project, featured, onReadMore }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`group relative rounded-xl border border-charcoal/[0.08] bg-beige-50/80 backdrop-blur-sm p-6 hover:border-charcoal/[0.16] transition-all duration-300 ${
        featured ? 'md:col-span-2 md:row-span-2 md:p-8' : ''
      }`}
    >
      {featured && (
        <span className="text-[10px] uppercase tracking-[0.15em] text-terracotta font-semibold mb-3 block">
          Featured
        </span>
      )}

      <h3 className={`font-serif font-semibold text-charcoal-solid ${featured ? 'text-2xl' : 'text-lg'}`}>
        {project.title}
      </h3>

      <p className="mt-2 text-sm text-charcoal-solid/55 leading-relaxed">
        {project.tagline}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 text-[11px] rounded-full border border-charcoal/[0.08] text-charcoal-solid/45 font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-charcoal-solid text-beige-100 hover:bg-charcoal-solid/80 transition-colors"
          >
            View Demo
          </a>
        )}
        <button
          onClick={() => onReadMore(project)}
          className="text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-charcoal/[0.12] text-charcoal-solid/65 hover:border-charcoal/[0.25] hover:text-charcoal-solid transition-colors"
        >
          Read More
        </button>
      </div>
    </motion.article>
  )
}
