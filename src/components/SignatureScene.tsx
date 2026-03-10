import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

/* ── Animated signature text with left-to-right clip reveal ────── */

function SignatureText({ onRevealComplete }: { onRevealComplete?: () => void }) {
  const textRef = useRef<any>(null)
  const boundsRef = useRef<{
    minX: number
    maxX: number
    minY: number
    maxY: number
  } | null>(null)
  const progressRef = useRef(0)
  const completedRef = useRef(false)
  const [ready, setReady] = useState(false)

  const handleSync = useCallback((mesh: any) => {
    const bb = mesh.textRenderInfo?.blockBounds
    if (!bb || boundsRef.current) return
    boundsRef.current = {
      minX: bb[0],
      minY: bb[1],
      maxX: bb[2],
      maxY: bb[3],
    }
    mesh.clipRect = [bb[0] - 1, bb[1] - 1, bb[0] - 1, bb[3] + 1]
    setReady(true)
  }, [])

  useFrame((_, delta) => {
    const t = textRef.current
    const b = boundsRef.current
    if (!t || !b || !ready) return

    if (progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + delta * 0.5, 1)
      const ease = easeInOutCubic(progressRef.current)
      const revealX = b.minX + (b.maxX - b.minX) * ease
      t.clipRect = [b.minX - 1, b.minY - 1, revealX, b.maxY + 1]
    } else if (!completedRef.current) {
      completedRef.current = true
      t.clipRect = null
      onRevealComplete?.()
    }
  })

  return (
    <Text
      ref={textRef}
      font="/fonts/GreatVibes-Regular.ttf"
      fontSize={1.1}
      color="#9B9590"
      anchorX="center"
      anchorY="middle"
      onSync={handleSync}
      letterSpacing={-0.02}
    >
      Bareera Gulraiz
    </Text>
  )
}

/* ── Ambient floating particles ────────────────────────────────── */

function Particles({ count = 40 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1
    }
    return arr
  }, [count])

  const ref = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#1E1E1E"
        transparent
        opacity={0.1}
        sizeAttenuation
      />
    </points>
  )
}

/* ── Main scene ────────────────────────────────────────────────── */

interface SignatureSceneProps {
  onRevealComplete?: () => void
  reducedMotion?: boolean
}

export default function SignatureScene({
  onRevealComplete,
  reducedMotion = false,
}: SignatureSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion) return
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [reducedMotion])

  useFrame(() => {
    if (reducedMotion) return
    const g = groupRef.current
    if (!g) return
    g.rotation.y = THREE.MathUtils.lerp(
      g.rotation.y,
      mouse.current.x * 0.06,
      0.04,
    )
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      mouse.current.y * 0.03,
      0.04,
    )
  })

  if (reducedMotion) {
    return (
      <>
        <ambientLight intensity={0.6} />
        <Text
          font="/fonts/GreatVibes-Regular.ttf"
          fontSize={1.1}
          color="#9B9590"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.02}
          onSync={() => onRevealComplete?.()}
        >
          Bareera Gulraiz
        </Text>
      </>
    )
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 6]} intensity={0.6} />
      <pointLight position={[-3, 1, 3]} intensity={0.2} color="#C4836A" />

      <group ref={groupRef}>
        <Float speed={1.5} rotationIntensity={0.04} floatIntensity={0.12}>
          <SignatureText onRevealComplete={onRevealComplete} />
        </Float>
      </group>

      <Particles />
    </>
  )
}
