import { useRef, useEffect, useState } from 'react'
import { FIRST_NAME, LAST_NAME, FLOURISH } from './signaturePaths'
import './SignatureDraw.css'

/*
 * ── How to swap in your own custom signature ──────────────────────
 *
 * The path data lives in ./signaturePaths.ts and was generated from
 * the Great Vibes font via:  node scripts/gen-signature.mjs
 *
 * To use a different font or text:
 *  1. Drop a .ttf into scripts/fonts/
 *  2. Edit FONT_PATH and the text strings in scripts/gen-signature.mjs
 *  3. Run:  node scripts/gen-signature.mjs
 *  4. Paste the output into signaturePaths.ts
 *
 * To use a hand-drawn signature instead, export your signature as
 * SVG from Figma / Illustrator / https://yqnn.github.io/svg-path-editor/,
 * then replace FIRST_NAME / LAST_NAME with the d attributes.
 * Update VIEW_BOX if the coordinate system differs.
 */

interface PathConfig {
  id: string
  d: string
  strokeWidth: number
  /** Seconds */
  duration: number
  /** Seconds */
  delay: number
  /** 0–1, defaults to 1 */
  opacity?: number
  /** Whether to show fill after animation */
  showFill?: boolean
}

const VIEW_BOX = '0 0 600 200'

const PATHS: PathConfig[] = [
  {
    id: 'first',
    d: FIRST_NAME,
    strokeWidth: 1.0,
    duration: 1.4,
    delay: 0,
    showFill: true,
  },
  {
    id: 'last',
    d: LAST_NAME,
    strokeWidth: 1.0,
    duration: 1.6,
    delay: 0.8,
    showFill: true,
  },
  {
    id: 'flourish',
    d: FLOURISH,
    strokeWidth: 0.7,
    duration: 0.5,
    delay: 2.0,
    opacity: 0.3,
    showFill: false,
  },
]

interface SignatureDrawProps {
  /** Name used for aria-label (default: "Bareera Gulraiz") */
  name?: string
  /** Extra CSS class on the wrapper */
  className?: string
  /** Fires ~200 ms after the last stroke finishes drawing */
  onComplete?: () => void
}

export default function SignatureDraw({
  name = 'Bareera Gulraiz',
  className = '',
  onComplete,
}: SignatureDrawProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const [drawing, setDrawing] = useState(false)
  const [showFill, setShowFill] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reducedMotion) {
      setShowFill(true)
      onCompleteRef.current?.()
      return
    }

    PATHS.forEach((cfg, i) => {
      const el = pathRefs.current[i]
      if (!el) return
      const len = el.getTotalLength()
      el.style.strokeDasharray = `${len}`
      el.style.strokeDashoffset = `${len}`
      el.style.setProperty('--path-length', `${len}`)
      el.style.setProperty('--draw-duration', `${cfg.duration}s`)
      el.style.setProperty('--draw-delay', `${cfg.delay}s`)
    })

    requestAnimationFrame(() => setDrawing(true))

    const last = PATHS[PATHS.length - 1]
    const totalMs = (last.delay + last.duration) * 1000

    const fillTimer = setTimeout(() => setShowFill(true), totalMs + 200)
    const doneTimer = setTimeout(
      () => onCompleteRef.current?.(),
      totalMs + 400,
    )

    return () => {
      clearTimeout(fillTimer)
      clearTimeout(doneTimer)
    }
  }, [reducedMotion])

  return (
    <div className={`signature-container ${className}`}>
      <svg
        viewBox={VIEW_BOX}
        className="signature-svg"
        role="img"
        aria-label={name}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stroke paths — each draws sequentially via CSS keyframes */}
        {PATHS.map((cfg, i) => (
          <path
            key={cfg.id}
            ref={(el) => {
              pathRefs.current[i] = el
            }}
            d={cfg.d}
            className={[
              'sig-stroke',
              drawing ? 'is-drawing' : '',
              reducedMotion ? 'no-motion' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            fill="none"
            stroke="currentColor"
            strokeWidth={cfg.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={cfg.opacity ?? 1}
          />
        ))}

        {/* Fill layers — fade in after strokes complete for a solid logo reveal */}
        {PATHS.filter((p) => p.showFill).map((cfg) => (
          <path
            key={`${cfg.id}-fill`}
            d={cfg.d}
            className={`sig-fill ${showFill ? 'is-visible' : ''}`}
            fill="currentColor"
            stroke="none"
          />
        ))}
      </svg>
    </div>
  )
}
