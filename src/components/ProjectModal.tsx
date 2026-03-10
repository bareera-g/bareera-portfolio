import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '../data/projects'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()

      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!project) return

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => closeRef.current?.focus(), 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, handleKeyDown])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — case study`}
        >
          <div className="absolute inset-0 bg-charcoal-solid/25 backdrop-blur-sm" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-beige-100 border border-charcoal/[0.08] shadow-2xl p-7 sm:p-9"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-charcoal/[0.06] transition-colors text-charcoal-solid/40 hover:text-charcoal-solid"
              aria-label="Close modal"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <span className="text-[10px] uppercase tracking-[0.15em] text-terracotta/80 font-semibold">
              Case Study
            </span>

            <h2 className="mt-2 text-2xl font-serif font-semibold text-charcoal-solid">
              {project.title}
            </h2>

            <p className="mt-1.5 text-sm text-charcoal-solid/50 leading-relaxed">
              {project.tagline}
            </p>

            <div className="mt-7 space-y-6">
              <ModalSection title="Problem" content={project.problem} />
              <ModalSection title="Solution" content={project.solution} />
              <ModalSection title="My Role" content={project.role} />

              <div>
                <h3 className="text-[11px] uppercase tracking-[0.12em] text-charcoal-solid/35 font-semibold mb-2">
                  Results
                </h3>
                <ul className="space-y-2">
                  {project.results.map((r, i) => (
                    <li key={i} className="text-sm text-charcoal-solid/70 flex items-start gap-2.5 leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-terracotta/50 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 text-[11px] rounded-full border border-charcoal/[0.08] text-charcoal-solid/45 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {(project.links.demo || project.links.github) && (
              <div className="mt-7 flex gap-3 pt-5 border-t border-charcoal/[0.06]">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold px-4 py-2 rounded-lg bg-charcoal-solid text-beige-100 hover:bg-charcoal-solid/80 transition-colors"
                  >
                    View Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold px-4 py-2 rounded-lg border border-charcoal/[0.12] text-charcoal-solid/65 hover:border-charcoal/[0.25] transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ModalSection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.12em] text-charcoal-solid/35 font-semibold mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-charcoal-solid/70 leading-relaxed">{content}</p>
    </div>
  )
}
