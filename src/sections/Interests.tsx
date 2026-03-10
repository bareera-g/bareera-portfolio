import { motion } from 'framer-motion'

const tiles = [
  { label: 'Beach', src: '/images/interests/beach.jpg', color: 'bg-dusty/15' },
  { label: 'Concerts', src: '/images/interests/concerts.jpg', color: 'bg-terracotta/12' },
  { label: 'Traveling', src: '/images/interests/travel.jpg', color: 'bg-dusty/12' },
]

const sports = ['Basketball', 'Badminton']

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
}

export default function Interests() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl sm:text-4xl text-charcoal-solid mb-10"
        >
          Interests
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${tile.color}`}
            >
              {/* Fallback label behind image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-charcoal-solid/10 font-serif text-2xl select-none">
                  {tile.label}
                </span>
              </div>

              <img
                src={tile.src}
                alt={tile.label}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />

              {/* Overlay label */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-solid/40 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-sm font-semibold text-white/90 tracking-wide drop-shadow-sm">
                {tile.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Sports */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 flex items-center gap-2.5"
        >
          <span className="text-xs text-charcoal-solid/35 font-medium">Also:</span>
          {sports.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-charcoal/[0.08] text-charcoal-solid/50 bg-beige-50/60"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-40"
              >
                <circle cx="8" cy="8" r="6" />
                <path d="M5 5L11 11M11 5L5 11" opacity="0.5" />
              </svg>
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
