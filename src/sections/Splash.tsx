import { useRef, useState, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import SignatureScene from '../components/SignatureScene'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SplashProps {
  onComplete: () => void
}

export default function Splash({ onComplete }: SplashProps) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const exitingRef = useRef(false)
  const [exiting, setExiting] = useState(false)
  const reduced = useReducedMotion()

  const finish = useCallback(() => {
    if (exitingRef.current) return
    exitingRef.current = true
    setExiting(true)
    sessionStorage.setItem('portfolio-intro-seen', '1')
    setTimeout(() => onCompleteRef.current(), 700)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(finish, 800)
      return () => clearTimeout(t)
    }
    const safety = setTimeout(finish, 6000)
    return () => clearTimeout(safety)
  }, [reduced, finish])

  const handleRevealComplete = useCallback(() => {
    setTimeout(finish, 600)
  }, [finish])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#F4EFE6' }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="w-full h-64 sm:h-80 md:h-96 max-w-5xl mx-auto px-6">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <SignatureScene
            onRevealComplete={handleRevealComplete}
            reducedMotion={reduced}
          />
        </Canvas>
      </div>

      {/* Loading bar — pinned to bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 h-[2px] rounded-full overflow-hidden bg-charcoal-solid/[0.08]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: 'rgba(30,30,30,0.25)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <button
        onClick={finish}
        className="absolute bottom-7 text-[9px] text-charcoal-solid/10 hover:text-charcoal-solid/30 transition-colors tracking-[0.2em] uppercase"
      >
        Skip
      </button>
    </motion.div>
  )
}
