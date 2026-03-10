import { type ReactNode } from 'react'
import { motion, useTransform, MotionValue } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface RoomSceneProps {
  type: 'entryway' | 'window' | 'desk' | 'living'
  scrollProgress: MotionValue<number>
}

export default function RoomScene({ type, scrollProgress }: RoomSceneProps) {
  const reduced = useReducedMotion()

  const p1 = useTransform(scrollProgress, [0, 1], reduced ? [0, 0] : [12, -12])
  const p2 = useTransform(scrollProgress, [0, 1], reduced ? [0, 0] : [6, -15])
  const p3 = useTransform(scrollProgress, [0, 1], reduced ? [0, 0] : [9, -9])

  const rooms: Record<string, ReactNode> = {
    entryway: <EntrywayRoom p1={p1} p2={p2} p3={p3} />,
    window: <WindowRoom p1={p1} p2={p2} p3={p3} />,
    desk: <DeskRoom p1={p1} p2={p2} p3={p3} />,
    living: <LivingRoom p1={p1} p2={p2} p3={p3} />,
  }

  return <div className="w-full max-w-md mx-auto">{rooms[type]}</div>
}

interface RoomSVGProps {
  p1: MotionValue<number>
  p2: MotionValue<number>
  p3: MotionValue<number>
}

const S = 'rgba(30,30,30,0.55)'
const W = 1.5
const FILL = 'rgba(30,30,30,0.03)'

function EntrywayRoom({ p1, p2, p3 }: RoomSVGProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-auto">
      <rect x="30" y="20" width="340" height="260" stroke={S} strokeWidth={W} rx="2" />
      <line x1="30" y1="240" x2="370" y2="240" stroke={S} strokeWidth={0.8} opacity={0.35} />

      {/* Door */}
      <motion.g style={{ y: p1 }}>
        <rect x="155" y="110" width="90" height="130" stroke={S} strokeWidth={W} rx="2" />
        <rect x="155" y="110" width="90" height="130" fill={FILL} rx="2" />
        <circle cx="232" cy="180" r="3.5" stroke={S} strokeWidth={1.2} />
        <path d="M155 110 Q200 100 245 110" stroke={S} strokeWidth={0.8} opacity={0.3} />
      </motion.g>

      {/* Coat rack */}
      <motion.g style={{ y: p2 }}>
        <line x1="80" y1="75" x2="80" y2="240" stroke={S} strokeWidth={W} />
        <circle cx="80" cy="70" r="4" stroke={S} strokeWidth={1.2} />
        <line x1="64" y1="95" x2="96" y2="95" stroke={S} strokeWidth={W} strokeLinecap="round" />
        <line x1="67" y1="115" x2="93" y2="115" stroke={S} strokeWidth={W} strokeLinecap="round" />
        <line x1="70" y1="135" x2="90" y2="135" stroke={S} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      </motion.g>

      {/* Moving boxes */}
      <motion.g style={{ y: p3 }}>
        <rect x="280" y="185" width="55" height="55" stroke={S} strokeWidth={W} rx="1" />
        <rect x="280" y="185" width="55" height="55" fill={FILL} rx="1" />
        <line x1="280" y1="212" x2="335" y2="212" stroke={S} strokeWidth={0.6} opacity={0.4} />
        <rect x="292" y="152" width="42" height="38" stroke={S} strokeWidth={W} rx="1" />
        <rect x="292" y="152" width="42" height="38" fill={FILL} rx="1" />
        <line x1="304" y1="152" x2="304" y2="190" stroke={S} strokeWidth={0.5} opacity={0.3} />
        <line x1="322" y1="152" x2="322" y2="190" stroke={S} strokeWidth={0.5} opacity={0.3} />
      </motion.g>

      {/* Welcome mat */}
      <rect x="170" y="242" width="60" height="8" stroke={S} strokeWidth={0.8} rx="1" opacity={0.3} />
    </svg>
  )
}

function WindowRoom({ p1, p2, p3 }: RoomSVGProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-auto">
      <rect x="30" y="20" width="340" height="260" stroke={S} strokeWidth={W} rx="2" />
      <line x1="30" y1="240" x2="370" y2="240" stroke={S} strokeWidth={0.8} opacity={0.35} />

      {/* Window */}
      <motion.g style={{ y: p1 }}>
        <rect x="110" y="50" width="180" height="130" stroke={S} strokeWidth={W} rx="2" />
        <line x1="200" y1="50" x2="200" y2="180" stroke={S} strokeWidth={0.8} />
        <line x1="110" y1="115" x2="290" y2="115" stroke={S} strokeWidth={0.8} />
        <line x1="100" y1="180" x2="300" y2="180" stroke={S} strokeWidth={2} strokeLinecap="round" />
        {/* Light rays through window */}
        <line x1="150" y1="180" x2="130" y2="240" stroke={S} strokeWidth={0.3} opacity={0.15} />
        <line x1="200" y1="180" x2="200" y2="240" stroke={S} strokeWidth={0.3} opacity={0.15} />
        <line x1="250" y1="180" x2="270" y2="240" stroke={S} strokeWidth={0.3} opacity={0.15} />
      </motion.g>

      {/* Plant on sill */}
      <motion.g style={{ y: p2 }}>
        <rect x="245" y="160" width="26" height="20" stroke={S} strokeWidth={W} rx="3" />
        <rect x="245" y="160" width="26" height="20" fill={FILL} rx="3" />
        <path d="M258 160 C258 148 264 142 266 132" stroke={S} strokeWidth={1.2} strokeLinecap="round" />
        <path d="M258 152 C264 147 270 150 274 143" stroke={S} strokeWidth={1.2} strokeLinecap="round" />
        <path d="M258 155 C252 150 246 153 242 147" stroke={S} strokeWidth={1.2} strokeLinecap="round" />
        <ellipse cx="266" cy="130" rx="5" ry="3" stroke={S} strokeWidth={0.8} opacity={0.4} />
        <ellipse cx="274" cy="141" rx="4" ry="2.5" stroke={S} strokeWidth={0.8} opacity={0.4} />
        <ellipse cx="242" cy="145" rx="4" ry="2.5" stroke={S} strokeWidth={0.8} opacity={0.4} />
      </motion.g>

      {/* Curtains */}
      <motion.g style={{ y: p3 }}>
        <path d="M100 45 Q104 80 100 115 Q96 150 100 185" stroke={S} strokeWidth={0.8} opacity={0.4} />
        <path d="M96 45 Q100 70 96 95" stroke={S} strokeWidth={0.6} opacity={0.25} />
        <path d="M300 45 Q296 80 300 115 Q304 150 300 185" stroke={S} strokeWidth={0.8} opacity={0.4} />
        <path d="M304 45 Q300 70 304 95" stroke={S} strokeWidth={0.6} opacity={0.25} />
      </motion.g>

      {/* Small rug */}
      <ellipse cx="200" cy="235" rx="50" ry="8" stroke={S} strokeWidth={0.6} opacity={0.25} />
    </svg>
  )
}

function DeskRoom({ p1, p2, p3 }: RoomSVGProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-auto">
      <rect x="30" y="20" width="340" height="260" stroke={S} strokeWidth={W} rx="2" />
      <line x1="30" y1="240" x2="370" y2="240" stroke={S} strokeWidth={0.8} opacity={0.35} />

      {/* Desk */}
      <motion.g style={{ y: p1 }}>
        <rect x="90" y="165" width="220" height="10" stroke={S} strokeWidth={W} rx="1" />
        <rect x="90" y="165" width="220" height="10" fill={FILL} rx="1" />
        <line x1="108" y1="175" x2="108" y2="240" stroke={S} strokeWidth={W} />
        <line x1="292" y1="175" x2="292" y2="240" stroke={S} strokeWidth={W} />
        {/* Drawer */}
        <rect x="265" y="177" width="27" height="22" stroke={S} strokeWidth={1} rx="1" />
        <line x1="275" y1="188" x2="285" y2="188" stroke={S} strokeWidth={0.8} strokeLinecap="round" />
      </motion.g>

      {/* Laptop */}
      <motion.g style={{ y: p2 }}>
        <rect x="155" y="120" width="90" height="45" stroke={S} strokeWidth={W} rx="3" />
        <rect x="155" y="120" width="90" height="45" fill={FILL} rx="3" />
        <rect x="145" y="165" width="110" height="5" stroke={S} strokeWidth={W} rx="1" />
        {/* Screen glare */}
        <line x1="168" y1="132" x2="195" y2="132" stroke={S} strokeWidth={0.4} opacity={0.2} />
        <line x1="168" y1="138" x2="210" y2="138" stroke={S} strokeWidth={0.4} opacity={0.15} />
        <line x1="168" y1="144" x2="185" y2="144" stroke={S} strokeWidth={0.4} opacity={0.1} />
      </motion.g>

      {/* Desk lamp */}
      <motion.g style={{ y: p3 }}>
        <circle cx="80" cy="168" r="6" stroke={S} strokeWidth={1} opacity={0.4} />
        <line x1="80" y1="162" x2="80" y2="110" stroke={S} strokeWidth={W} />
        <line x1="80" y1="110" x2="60" y2="85" stroke={S} strokeWidth={W} strokeLinecap="round" />
        <path d="M48 85 Q55 78 68 82 L62 95 Q55 90 50 94 Z" stroke={S} strokeWidth={1} />
        {/* Lamp glow */}
        <ellipse cx="56" cy="100" rx="18" ry="6" stroke={S} strokeWidth={0.3} opacity={0.1} />
      </motion.g>

      {/* Bookshelf on wall */}
      <rect x="310" y="50" width="45" height="100" stroke={S} strokeWidth={1} rx="1" opacity={0.4} />
      <line x1="310" y1="75" x2="355" y2="75" stroke={S} strokeWidth={0.6} opacity={0.3} />
      <line x1="310" y1="100" x2="355" y2="100" stroke={S} strokeWidth={0.6} opacity={0.3} />
      <line x1="310" y1="125" x2="355" y2="125" stroke={S} strokeWidth={0.6} opacity={0.3} />
      {/* Books */}
      <rect x="315" y="55" width="6" height="18" stroke={S} strokeWidth={0.5} opacity={0.3} rx="0.5" />
      <rect x="323" y="58" width="5" height="15" stroke={S} strokeWidth={0.5} opacity={0.3} rx="0.5" />
      <rect x="330" y="56" width="7" height="17" stroke={S} strokeWidth={0.5} opacity={0.3} rx="0.5" />
      <rect x="315" y="80" width="8" height="18" stroke={S} strokeWidth={0.5} opacity={0.3} rx="0.5" />
      <rect x="325" y="82" width="6" height="16" stroke={S} strokeWidth={0.5} opacity={0.3} rx="0.5" />
    </svg>
  )
}

function LivingRoom({ p1, p2, p3 }: RoomSVGProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-auto">
      <rect x="30" y="20" width="340" height="260" stroke={S} strokeWidth={W} rx="2" />
      <line x1="30" y1="240" x2="370" y2="240" stroke={S} strokeWidth={0.8} opacity={0.35} />

      {/* Couch */}
      <motion.g style={{ y: p1 }}>
        <rect x="75" y="170" width="190" height="55" stroke={S} strokeWidth={W} rx="8" />
        <rect x="75" y="170" width="190" height="55" fill={FILL} rx="8" />
        {/* Armrests */}
        <rect x="65" y="160" width="22" height="70" stroke={S} strokeWidth={W} rx="5" />
        <rect x="253" y="160" width="22" height="70" stroke={S} strokeWidth={W} rx="5" />
        {/* Cushion dividers */}
        <line x1="136" y1="175" x2="136" y2="220" stroke={S} strokeWidth={0.6} opacity={0.25} />
        <line x1="204" y1="175" x2="204" y2="220" stroke={S} strokeWidth={0.6} opacity={0.25} />
        {/* Back cushions */}
        <path d="M90 170 Q110 155 136 170" stroke={S} strokeWidth={0.6} opacity={0.3} />
        <path d="M136 170 Q165 155 204 170" stroke={S} strokeWidth={0.6} opacity={0.3} />
        <path d="M204 170 Q235 155 252 170" stroke={S} strokeWidth={0.6} opacity={0.3} />
        {/* Throw pillow */}
        <ellipse cx="105" cy="185" rx="14" ry="10" stroke={S} strokeWidth={0.8} opacity={0.35} />
      </motion.g>

      {/* Floor lamp */}
      <motion.g style={{ y: p2 }}>
        <line x1="320" y1="240" x2="320" y2="78" stroke={S} strokeWidth={W} />
        <ellipse cx="320" cy="72" rx="22" ry="14" stroke={S} strokeWidth={W} />
        <line x1="308" y1="240" x2="332" y2="240" stroke={S} strokeWidth={2} strokeLinecap="round" />
        {/* Light glow */}
        <ellipse cx="320" cy="90" rx="30" ry="8" stroke={S} strokeWidth={0.3} opacity={0.08} />
      </motion.g>

      {/* Coffee table */}
      <motion.g style={{ y: p3 }}>
        <rect x="125" y="235" width="90" height="6" stroke={S} strokeWidth={W} rx="1" />
        <rect x="125" y="235" width="90" height="6" fill={FILL} rx="1" />
        <line x1="138" y1="241" x2="138" y2="256" stroke={S} strokeWidth={1.2} />
        <line x1="202" y1="241" x2="202" y2="256" stroke={S} strokeWidth={1.2} />
        {/* Book + mug on table */}
        <rect x="152" y="228" width="28" height="7" stroke={S} strokeWidth={0.7} rx="0.5" opacity={0.45} />
        <ellipse cx="192" cy="232" rx="6" ry="4" stroke={S} strokeWidth={0.7} opacity={0.45} />
      </motion.g>

      {/* Wall art / frame */}
      <rect x="130" y="50" width="80" height="60" stroke={S} strokeWidth={0.8} rx="1" opacity={0.3} />
      <rect x="135" y="55" width="70" height="50" stroke={S} strokeWidth={0.4} rx="0.5" opacity={0.15} />

      {/* Rug */}
      <ellipse cx="170" cy="252" rx="80" ry="12" stroke={S} strokeWidth={0.5} opacity={0.2} />
    </svg>
  )
}
