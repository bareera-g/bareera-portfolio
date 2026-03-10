import { motion } from 'framer-motion'

const principles = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M12 3L20 9V21H4V9L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V14H15V21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Adaptability',
    body: "Nine homes taught me that change isn't disruption — it's data. I bring that flexibility to every system I design, building for what shifts rather than what stays.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" />
        <path d="M3 9H21M9 3V21" strokeLinecap="round" />
      </svg>
    ),
    title: 'Systems Thinking',
    body: 'Good software is a living system. I design for the connections between components — the interfaces, the data flows, the failure modes — not just the parts.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20C4 17 7.5 14 12 14C16.5 14 20 17 20 20" strokeLinecap="round" />
      </svg>
    ),
    title: 'User-Centered Design',
    body: 'Every technical decision should trace back to a human need. I build for people first, architecture second, abstractions only when they serve clarity.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-solid">
            Philosophy
          </h2>
          <p className="mt-4 text-charcoal-solid/50 leading-relaxed max-w-lg text-[15px]">
            Moving constantly as a child gave me an unusual skill: the ability to walk into any
            environment, understand its patterns, and build something that belongs.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 sm:gap-8 md:grid-cols-3">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="text-charcoal-solid/30 group-hover:text-terracotta/60 transition-colors duration-300">
                {p.icon}
              </div>
              <h3 className="mt-4 font-serif text-lg font-medium text-charcoal-solid">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal-solid/50 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
