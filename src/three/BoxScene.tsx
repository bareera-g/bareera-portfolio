import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import MovingBox from './MovingBox'
import MiniRoom from './MiniRoom'

function smooth(a: number, b: number, x: number) {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

interface Props {
  progressRef: React.MutableRefObject<number>
}

export default function BoxScene({ progressRef }: Props) {
  return (
    <>
      <color attach="background" args={['#F4EFE6']} />
      <fog attach="fog" args={['#F4EFE6', 8, 18]} />

      <ambientLight intensity={0.55} color="#FFF5EB" />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.1}
        color="#FFFAF0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={12}
        shadow-camera-left={-2.5}
        shadow-camera-right={2.5}
        shadow-camera-top={2.5}
        shadow-camera-bottom={-2.5}
        shadow-bias={-0.0008}
      />
      <directionalLight position={[-2, 3, -1]} intensity={0.18} color="#E0E5F0" />

      {/* Ground shadow catcher */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.51, 0]}
        receiveShadow
      >
        <planeGeometry args={[12, 12]} />
        <shadowMaterial transparent opacity={0.06} />
      </mesh>

      <CameraRig progressRef={progressRef} />
      <MovingBox progressRef={progressRef} />
      <MiniRoom />
    </>
  )
}

function CameraRig({ progressRef }: Props) {
  const { camera } = useThree()

  useFrame(() => {
    const p = progressRef.current

    const p1 = smooth(0, 0.5, p)
    const p2 = smooth(0.5, 0.92, p)

    const sx = 0, sy = 1.8, sz = 3.5
    const mx = 0, my = 1.35, mz = 2.0
    const ex = 0, ey = 0.55, ez = 0.12

    let tx: number, ty: number, tz: number
    if (p < 0.5) {
      tx = THREE.MathUtils.lerp(sx, mx, p1)
      ty = THREE.MathUtils.lerp(sy, my, p1)
      tz = THREE.MathUtils.lerp(sz, mz, p1)
    } else {
      tx = THREE.MathUtils.lerp(mx, ex, p2)
      ty = THREE.MathUtils.lerp(my, ey, p2)
      tz = THREE.MathUtils.lerp(mz, ez, p2)
    }

    camera.position.x += (tx - camera.position.x) * 0.1
    camera.position.y += (ty - camera.position.y) * 0.1
    camera.position.z += (tz - camera.position.z) * 0.1

    const lookY = THREE.MathUtils.lerp(-0.05, -0.35, smooth(0, 1, p))
    camera.lookAt(0, lookY, 0)
  })

  return null
}
