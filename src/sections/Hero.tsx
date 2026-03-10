import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const reduced = useReducedMotion()
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (reduced || !pathRef.current) return
    const path = pathRef.current
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 2.8s cubic-bezier(0.65, 0, 0.35, 1)'
      path.style.strokeDashoffset = '0'
    })
  }, [reduced])

  const anim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 } as const,
          animate: { opacity: 1, y: 0 } as const,
          transition: { delay, duration: 0.8, ease: 'easeOut' } as const,
        }

  return (
    <section
      id="story"
      className="relative min-h-screen flex items-center justify-center blueprint-grid overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 py-32 text-center relative z-10">
        {/* Animated house outline */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-44 h-44 sm:w-52 sm:h-52 mb-10"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              ref={pathRef}
              d="M100 25 L175 78 L175 175 L25 175 L25 78 Z
                 M75 175 L75 125 L125 125 L125 175
                 M60 95 L85 95 L85 115 L60 115 Z
                 M115 95 L140 95 L140 115 L115 115 Z
                 M95 25 L95 15 L115 15 L115 55"
              stroke="rgba(30,30,30,0.45)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.h1
          {...anim(1.2)}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal-solid/80 leading-snug max-w-2xl mx-auto"
        >
          I moved nine times before I was nine.
        </motion.h1>

        <motion.p
          {...anim(2.0)}
          className="mt-5 font-serif text-lg sm:text-xl text-charcoal-solid/50 leading-relaxed max-w-xl mx-auto"
        >
          Now I design systems that help people feel at home.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="mt-20"
        >
          <div className="w-5 h-9 mx-auto rounded-full border border-charcoal/[0.18] flex items-start justify-center pt-1.5">
            <motion.div
              animate={reduced ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-charcoal/25"
            />
          </div>
          <p className="mt-3 text-[11px] text-charcoal-solid/25 tracking-[0.2em] uppercase font-medium">
            Scroll to explore
          </p>
        </motion.div>
      </div>
    </section>
  )
}
