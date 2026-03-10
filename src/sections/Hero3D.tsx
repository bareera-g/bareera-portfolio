import { useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import BoxScene from '../three/BoxScene'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const canvasOpacity = useTransform(scrollYProgress, [0.84, 1], [1, 0])
  const line1Opacity = useTransform(scrollYProgress, [0.04, 0.14, 0.38, 0.52], [0, 1, 1, 0])
  const line2Opacity = useTransform(scrollYProgress, [0.58, 0.72, 0.86, 0.96], [0, 1, 1, 0])
  const scrollHintOp = useTransform(scrollYProgress, [0, 0.06], [1, 0])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v
    if (v > 0.92 && !done) setDone(true)
  })

  const skip = useCallback(() => {
    if (!containerRef.current) return
    const bottom = containerRef.current.getBoundingClientRect().bottom + window.scrollY
    window.scrollTo({ top: bottom - window.innerHeight + 20, behavior: 'smooth' })
  }, [])

  if (reduced) {
    return (
      <section
        id="story"
        className="min-h-screen flex items-center justify-center blueprint-grid px-6"
      >
        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal-solid/80 leading-snug">
            I moved nine times before I was nine.
          </h1>
          <p className="mt-5 font-serif text-lg sm:text-xl text-charcoal-solid/50">
            Now I design systems that help people feel at home.
          </p>
        </div>
      </section>
    )
  }

  return (
    <div ref={containerRef} className="h-[400vh] relative" id="story">
      {/* Fixed 3D canvas layer */}
      <motion.div
        className="fixed inset-0 z-30"
        style={{
          opacity: canvasOpacity,
          pointerEvents: done ? 'none' : 'auto',
          visibility: done ? 'hidden' : 'visible',
        }}
      >
        <Canvas
          camera={{ position: [0, 1.8, 3.5], fov: 42, near: 0.1, far: 50 }}
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <BoxScene progressRef={progressRef} />
        </Canvas>

        {/* Overlay copy */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <div className="text-center max-w-2xl">
            <motion.h1
              style={{ opacity: line1Opacity }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal-solid/85 leading-snug"
            >
              I moved nine times before I was nine.
            </motion.h1>
            <motion.p
              style={{ opacity: line2Opacity }}
              className="mt-5 font-serif text-lg sm:text-xl text-charcoal-solid/55 leading-relaxed"
            >
              Now I design systems that help people feel at home.
            </motion.p>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: scrollHintOp }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div className="w-5 h-9 rounded-full border border-charcoal/[0.18] flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-charcoal/25"
            />
          </div>
          <p className="mt-2 text-[10px] text-charcoal-solid/25 tracking-[0.2em] uppercase text-center font-medium">
            Scroll
          </p>
        </motion.div>
      </motion.div>

      {/* Skip intro button */}
      {!done && (
        <button
          onClick={skip}
          className="fixed top-20 right-5 z-40 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-terracotta/25 text-terracotta hover:bg-terracotta/[0.08] transition-colors backdrop-blur-sm bg-beige-100/60"
        >
          Skip intro &rarr;
        </button>
      )}
    </div>
  )
}
