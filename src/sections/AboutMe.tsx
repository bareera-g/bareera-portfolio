import { motion } from 'framer-motion'

const socials = [
  {
    label: 'Email',
    href: 'mailto:bareera.gulraiz21@gmail.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="1" y="3" width="14" height="10" rx="1.5" />
        <path d="M1 4.5L8 9L15 4.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bareera-gulraiz/',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="1" y="1" width="14" height="14" rx="2" />
        <path d="M5 7V11M5 4.5V4.51M8 11V8.5C8 7.5 8.5 7 9.5 7C10.5 7 11 7.5 11 8.5V11" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/bareera-g',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M6 12.5C3.5 13.3 3.5 11 2.5 10.5M9.5 14V12C9.5 11.2 9.6 10.9 9 10.5C11 10.3 13 9.5 13 6.5C13 5.5 12.6 4.7 12 4C12.1 3.7 12.3 2.7 11.9 2C11.9 2 11.1 1.8 9.5 3C8.5 2.7 7.5 2.7 6.5 3C4.9 1.8 4.1 2 4.1 2C3.7 2.7 3.9 3.7 4 4C3.4 4.7 3 5.5 3 6.5C3 9.5 5 10.3 7 10.5C6.4 10.9 6.5 11.4 6.5 12V14" />
      </svg>
    ),
  },
  {
    label: 'Website',
    href: 'https://bareeragulraiz.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M1.5 8H14.5M8 1.5C6 4 6 12 8 14.5M8 1.5C10 4 10 12 8 14.5" />
      </svg>
    ),
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
}

export default function AboutMe() {
  return (
    <section id="about" className="py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-14 items-start">
          {/* Photo */}
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <div className="relative w-full max-w-[260px] mx-auto md:mx-0 aspect-[3/4] rounded-2xl overflow-hidden bg-beige-200/60 shadow-lg shadow-charcoal/[0.04]">
              <div className="absolute inset-0 flex items-center justify-center text-charcoal-solid/12 font-serif text-lg select-none">
                Photo
              </div>
              <img
                src="/images/bareera.jpg"
                alt="Bareera Gulraiz"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-solid leading-snug">
              Hi, I&rsquo;m Bareera and I like to build!
            </h2>

            <div className="mt-5 space-y-3 text-[15px] text-charcoal-solid/55 leading-relaxed">
              <p>
                I&rsquo;m a builder at heart. From full-stack platforms to data pipelines,
                I care most about shipping systems that are reliable, human-centered, and
                designed to make people feel at home.
              </p>
              <p>
                Moving nine times before I was nine taught me that adaptability isn&rsquo;t
                just a trait, it&rsquo;s a design principle. I bring that flexibility to
                every team and product I work on.
              </p>
              <p>
                Currently studying at UC Irvine and building tools that sit at the
                intersection of engineering, design, and real user needs.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label === 'Email' ? undefined : '_blank'}
                  rel={s.label === 'Email' ? undefined : 'noreferrer'}
                  aria-label={s.label}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg border border-charcoal/[0.1] text-charcoal-solid/55 hover:border-charcoal/[0.22] hover:text-charcoal-solid transition-colors"
                >
                  <span className="opacity-45">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
