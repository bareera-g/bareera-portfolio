import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import SignatureDraw from '../components/SignatureDraw'

interface SplashProps {
  onComplete: () => void
}

export default function Splash({ onComplete }: SplashProps) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const exitingRef = useRef(false)
  const [exiting, setExiting] = useState(false)

  const finish = useCallback(() => {
    if (exitingRef.current) return
    exitingRef.current = true
    setExiting(true)
    setTimeout(() => onCompleteRef.current(), 700)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#F4EFE6', color: '#1E1E1E' }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
    >
      <SignatureDraw
        name="Bareera Gulraiz"
        onComplete={finish}
        className="px-6"
      />

      {/* Hairline loading bar */}
      <div className="mt-10 w-28 h-px rounded-full overflow-hidden bg-charcoal-solid/[0.05]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: 'rgba(30,30,30,0.15)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <button
        onClick={finish}
        className="absolute bottom-8 text-[9px] text-charcoal-solid/10 hover:text-charcoal-solid/30 transition-colors tracking-[0.2em] uppercase"
      >
        Skip
      </button>
    </motion.div>
  )
}
