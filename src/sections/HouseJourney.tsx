import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RoomScene from '../components/RoomScene'
import { projects } from '../data/projects'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface RoomConfig {
  type: 'entryway' | 'window' | 'desk' | 'living'
  label: string
  title: string
  projectIndex?: number
}

const rooms: RoomConfig[] = [
  { type: 'entryway', label: 'Home 1', title: 'Learning to adapt.' },
  { type: 'window', label: 'Home 3', title: 'Learning to observe.', projectIndex: 0 },
  { type: 'desk', label: 'Home 6', title: 'Learning to build systems.', projectIndex: 1 },
  { type: 'living', label: 'Home 9', title: 'Learning to build belonging.', projectIndex: 2 },
]

export default function HouseJourney() {
  return (
    <section aria-label="House journey through growth phases">
      {rooms.map((room, i) => (
        <RoomSection key={room.type} room={room} index={i} />
      ))}
    </section>
  )
}

function RoomSection({ room, index }: { room: RoomConfig; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.75, 1],
    reduced ? [1, 1, 1, 1] : [0, 1, 1, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    reduced ? [0, 0, 0, 0] : [50, 0, 0, -20]
  )

  const hasProject = room.projectIndex !== undefined
  const project = hasProject ? projects[room.projectIndex!] : null

  const roomFade = useTransform(
    scrollYProgress,
    [0.55, 0.78],
    reduced || !hasProject ? [1, 1] : [1, 0]
  )
  const cardFade = useTransform(
    scrollYProgress,
    [0.6, 0.82],
    reduced || !hasProject ? [0, 0] : [0, 1]
  )
  const cardScale = useTransform(
    scrollYProgress,
    [0.6, 0.82],
    reduced || !hasProject ? [1, 1] : [0.9, 1]
  )
  const cardY = useTransform(
    scrollYProgress,
    [0.6, 0.82],
    reduced || !hasProject ? [0, 0] : [30, 0]
  )

  return (
    <div
      ref={ref}
      className="min-h-[110vh] relative flex items-center justify-center py-16 sm:py-24"
    >
      <motion.div style={{ opacity, y }} className="w-full max-w-4xl mx-auto px-6 relative">
        {/* Room artwork + text */}
        <motion.div style={{ opacity: roomFade }}>
          <div className="text-center mb-6 sm:mb-10">
            <motion.span
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="inline-block text-[11px] uppercase tracking-[0.2em] text-terracotta/60 font-semibold"
            >
              {room.label}
            </motion.span>
            <motion.h2
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="mt-2 font-serif text-xl sm:text-2xl md:text-3xl text-charcoal-solid/65"
            >
              {room.title}
            </motion.h2>
          </div>

          <RoomScene type={room.type} scrollProgress={scrollYProgress} />
        </motion.div>

        {/* Morph-in project card */}
        {project && (
          <motion.div
            style={{ opacity: cardFade, scale: cardScale, y: cardY }}
            className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none"
          >
            <div className="w-full max-w-sm sm:max-w-md rounded-xl border border-charcoal/[0.1] bg-beige-50/95 backdrop-blur-md p-6 sm:p-7 shadow-lg pointer-events-auto">
              <span className="text-[10px] uppercase tracking-[0.15em] text-dusty/80 font-semibold">
                Project Preview
              </span>
              <h3 className="mt-2.5 font-serif text-xl font-semibold text-charcoal-solid">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal-solid/55 leading-relaxed">
                {project.tagline}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] rounded-full border border-charcoal/[0.08] text-charcoal-solid/45 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href="#projects"
                className="mt-4 inline-block text-xs font-semibold text-terracotta/70 hover:text-terracotta transition-colors"
              >
                See all projects &darr;
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
