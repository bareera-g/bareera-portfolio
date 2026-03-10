import { motion } from 'framer-motion'

const features = [
  'Multi-user preference collection (Tinder-style swipes)',
  'Blend scoring and shared ranking across roommates',
  'AI insights that explain why people match or mismatch — source-aware, no hallucinations',
]

const stack = ['React', 'TypeScript', 'Python', 'OpenAI API', 'Firebase']

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
}

export default function FeaturedHomeBlend() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-charcoal/[0.08] bg-beige-50/70 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Video */}
            <div className="relative aspect-[4/3] md:aspect-auto bg-beige-200/50">
              <iframe
                src="https://www.youtube.com/embed/5QXJ9ytBe-Y"
                title="HomeBlend demo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] uppercase tracking-[0.15em] text-terracotta font-bold px-2.5 py-1 rounded-full bg-beige-100/90 backdrop-blur-sm border border-terracotta/15">
                  Featured Project
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 sm:p-9 flex flex-col justify-center">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal-solid">
                HomeBlend
              </h2>
              <p className="mt-1.5 font-serif text-base text-charcoal-solid/45 italic">
                A shared space deserves a shared taste.
              </p>

              <div className="mt-5 space-y-2.5 text-sm text-charcoal-solid/55 leading-relaxed">
                <p>
                  Think &ldquo;Spotify Blend for house hunting.&rdquo; HomeBlend lets roommates
                  swipe on homes individually, then merges everyone&rsquo;s preferences into a
                  single ranked list — powered by AI that explains exactly why certain homes
                  are a match or mismatch.
                </p>
                <p>
                  Built at IrvineHacks, it turns the chaos of shared apartment hunting into a
                  collaborative, data-driven experience.
                </p>
              </div>

              <ul className="mt-5 space-y-2">
                {features.map((f) => (
                  <li
                    key={f}
                    className="text-sm text-charcoal-solid/55 flex items-start gap-2"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 shrink-0 text-sage"
                    >
                      <path
                        d="M3 8.5L6.5 12L13 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-[11px] rounded-full border border-charcoal/[0.08] text-charcoal-solid/45 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href="https://github.com/bareera-g/HomeBlend"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-charcoal-solid text-beige-100 hover:bg-charcoal-solid/80 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://devpost.com/software/homeblend?ref_content=my-projects-tab&ref_feature=my_projects"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold px-4 py-2 rounded-lg border border-charcoal/[0.12] text-charcoal-solid/65 hover:border-charcoal/[0.25] hover:text-charcoal-solid transition-colors"
                >
                  Devpost
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
