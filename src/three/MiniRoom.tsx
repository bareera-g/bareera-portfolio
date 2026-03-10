import * as THREE from 'three'

export default function MiniRoom() {
  return (
    <group position={[0, -0.49, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]} receiveShadow>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial color="#E5DCCE" />
      </mesh>

      <Desk position={[0.28, 0, -0.18]} />
      <Chair position={[0.28, 0, 0.08]} />

      {/* Circular rug accent */}
      <mesh position={[-0.18, 0.006, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 24]} />
        <meshStandardMaterial color="#C4836A" transparent opacity={0.18} />
      </mesh>

      {/* Small bookshelf against back wall */}
      <group position={[-0.5, 0.1, -0.32]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.2, 0.08]} />
          <meshStandardMaterial color="#C4A882" />
        </mesh>
        {/* Shelf dividers */}
        <mesh position={[0, -0.03, 0]}>
          <boxGeometry args={[0.062, 0.003, 0.082]} />
          <meshStandardMaterial color="#B89872" />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.062, 0.003, 0.082]} />
          <meshStandardMaterial color="#B89872" />
        </mesh>
      </group>

      {/* Small plant */}
      <group position={[0.5, 0, -0.3]}>
        <mesh position={[0, 0.025, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.025, 0.05, 8]} />
          <meshStandardMaterial color="#C4A882" />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.025, 8, 6]} />
          <meshStandardMaterial color="#A8B5A0" />
        </mesh>
      </group>

      {/* Tiny window sketch on back wall */}
      <WindowSketch position={[0, 0.2, -0.49]} />
    </group>
  )
}

function Desk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Desktop */}
      <mesh position={[0, 0.13, 0]} castShadow>
        <boxGeometry args={[0.26, 0.012, 0.16]} />
        <meshStandardMaterial color="#B89872" />
      </mesh>
      {/* Legs */}
      {([[-1, 1], [1, 1], [1, -1], [-1, -1]] as const).map(([sx, sz], i) => (
        <mesh key={i} position={[sx * 0.1, 0.06, sz * 0.06]}>
          <boxGeometry args={[0.01, 0.12, 0.01]} />
          <meshStandardMaterial color="#B89872" />
        </mesh>
      ))}
      {/* Tiny laptop */}
      <mesh position={[0, 0.143, 0]} castShadow>
        <boxGeometry args={[0.08, 0.004, 0.055]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Laptop screen */}
      <mesh position={[0, 0.175, -0.03]} rotation={[0.25, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.055, 0.003]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}

function Chair({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.055, 0]} castShadow>
        <boxGeometry args={[0.08, 0.007, 0.08]} />
        <meshStandardMaterial color="#A8B5A0" />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.1, -0.035]} castShadow>
        <boxGeometry args={[0.08, 0.09, 0.007]} />
        <meshStandardMaterial color="#A8B5A0" />
      </mesh>
      {/* Legs */}
      {([[-1, 1], [1, 1], [1, -1], [-1, -1]] as const).map(([sx, sz], i) => (
        <mesh key={i} position={[sx * 0.03, 0.024, sz * 0.03]}>
          <boxGeometry args={[0.006, 0.048, 0.006]} />
          <meshStandardMaterial color="#8EA090" />
        </mesh>
      ))}
    </group>
  )
}

function WindowSketch({ position }: { position: [number, number, number] }) {
  const verts = new Float32Array([
    -0.06, -0.04, 0, 0.06, -0.04, 0,
    0.06, -0.04, 0, 0.06, 0.04, 0,
    0.06, 0.04, 0, -0.06, 0.04, 0,
    -0.06, 0.04, 0, -0.06, -0.04, 0,
    0, -0.04, 0, 0, 0.04, 0,
    -0.06, 0, 0, 0.06, 0, 0,
  ])
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))

  return (
    <lineSegments position={position} geometry={geo}>
      <lineBasicMaterial color="#1E1E1E" transparent opacity={0.1} />
    </lineSegments>
  )
}
