import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const CARDBOARD = '#C4A882'
const CARDBOARD_SIDE = '#B89872'
const TAPE_COLOR = '#D9CBA8'

function smooth(a: number, b: number, x: number) {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

interface Props {
  progressRef: React.MutableRefObject<number>
}

export default function MovingBox({ progressRef }: Props) {
  const group = useRef<THREE.Group>(null!)
  const flapF = useRef<THREE.Group>(null!)
  const flapB = useRef<THREE.Group>(null!)
  const flapL = useRef<THREE.Group>(null!)
  const flapR = useRef<THREE.Group>(null!)
  const tapeGrp = useRef<THREE.Group>(null!)
  const tapeMat = useRef<THREE.MeshStandardMaterial>(null!)

  const W = 1.4, H = 1.0, D = 1.0
  const hW = W / 2, hH = H / 2, hD = D / 2

  useFrame(({ clock }) => {
    const p = progressRef.current
    const t = clock.elapsedTime

    // Subtle idle float
    const idle = 1 - smooth(0, 0.25, p)
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.8) * 0.02 * idle
      group.current.rotation.y = Math.sin(t * 0.5) * 0.008 * idle
    }

    // Tape peel: 4%–28%
    const tp = smooth(0.04, 0.28, p)
    if (tapeGrp.current) {
      tapeGrp.current.rotation.x = -tp * 0.65
      tapeGrp.current.position.y = hH + 0.018 + tp * 0.22
      tapeGrp.current.position.z = hD * 0.35 + tp * 0.08
    }
    if (tapeMat.current) {
      tapeMat.current.opacity = 0.5 * (1 - tp * 0.85)
    }

    // Flaps open: 22%–62%
    const fp = smooth(0.22, 0.62, p)
    const ang = fp * Math.PI * 0.55
    if (flapF.current) flapF.current.rotation.x = ang
    if (flapB.current) flapB.current.rotation.x = -ang
    if (flapL.current) flapL.current.rotation.z = -ang * 0.92
    if (flapR.current) flapR.current.rotation.z = ang * 0.92
  })

  return (
    <group ref={group}>
      {/* Box body: 5 walls (no top) */}
      <Wall p={[0, -hH, 0]} r={[-Math.PI / 2, 0, 0]} s={[W, D]} c={CARDBOARD} />
      <Wall p={[0, 0, hD]} r={[0, 0, 0]} s={[W, H]} c={CARDBOARD} />
      <Wall p={[0, 0, -hD]} r={[0, Math.PI, 0]} s={[W, H]} c={CARDBOARD} />
      <Wall p={[-hW, 0, 0]} r={[0, -Math.PI / 2, 0]} s={[D, H]} c={CARDBOARD_SIDE} />
      <Wall p={[hW, 0, 0]} r={[0, Math.PI / 2, 0]} s={[D, H]} c={CARDBOARD_SIDE} />

      {/* Front flap */}
      <group position={[0, hH, hD]} ref={flapF}>
        <Flap s={[W - 0.01, hD]} p={[0, 0, -hD / 2]} c={CARDBOARD} />
      </group>

      {/* Back flap */}
      <group position={[0, hH, -hD]} ref={flapB}>
        <Flap s={[W - 0.01, hD]} p={[0, 0, hD / 2]} c={CARDBOARD} />
      </group>

      {/* Left flap */}
      <group position={[-hW, hH, 0]} ref={flapL}>
        <Flap s={[hW, D - 0.01]} p={[hW / 2, 0, 0]} c={CARDBOARD_SIDE} />
      </group>

      {/* Right flap */}
      <group position={[hW, hH, 0]} ref={flapR}>
        <Flap s={[hW, D - 0.01]} p={[-hW / 2, 0, 0]} c={CARDBOARD_SIDE} />
      </group>

      {/* Tape strip */}
      <group position={[0, hH + 0.018, hD * 0.35]} ref={tapeGrp}>
        <mesh position={[0, 0, -D * 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, D * 0.7]} />
          <meshStandardMaterial
            ref={tapeMat}
            color={TAPE_COLOR}
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      {/* Subtle edge lines */}
      <Edges w={W} h={H} d={D} />
    </group>
  )
}

function Wall({
  p, r, s, c,
}: {
  p: [number, number, number]
  r: [number, number, number]
  s: [number, number]
  c: string
}) {
  return (
    <mesh position={p} rotation={r} castShadow receiveShadow>
      <planeGeometry args={s} />
      <meshStandardMaterial color={c} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Flap({
  s, p, c,
}: {
  s: [number, number]
  p: [number, number, number]
  c: string
}) {
  return (
    <mesh position={p} rotation={[-Math.PI / 2, 0, 0]} castShadow>
      <planeGeometry args={s} />
      <meshStandardMaterial color={c} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Edges({ w, h, d }: { w: number; h: number; d: number }) {
  const geo = useMemo(() => {
    const hw = w / 2, hh = h / 2, hd = d / 2
    const v: number[] = []
    const e = (a: number[], b: number[]) => v.push(...a, ...b)
    // bottom
    e([-hw, -hh, -hd], [hw, -hh, -hd])
    e([hw, -hh, -hd], [hw, -hh, hd])
    e([hw, -hh, hd], [-hw, -hh, hd])
    e([-hw, -hh, hd], [-hw, -hh, -hd])
    // top
    e([-hw, hh, -hd], [hw, hh, -hd])
    e([hw, hh, -hd], [hw, hh, hd])
    e([hw, hh, hd], [-hw, hh, hd])
    e([-hw, hh, hd], [-hw, hh, -hd])
    // verticals
    e([-hw, -hh, -hd], [-hw, hh, -hd])
    e([hw, -hh, -hd], [hw, hh, -hd])
    e([hw, -hh, hd], [hw, hh, hd])
    e([-hw, -hh, hd], [-hw, hh, hd])

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3))
    return g
  }, [w, h, d])

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#1E1E1E" transparent opacity={0.07} />
    </lineSegments>
  )
}
