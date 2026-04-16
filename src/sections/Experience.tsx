import { motion } from 'framer-motion'

/* ─── data ─── */

interface Role {
  company: string
  title: string
  location: string
  dates: string
  bullets: string[]
}

const roles: Role[] = [
  {
    company: 'Travel and Meetings Society',
    title: 'Backend Engineer (Contract)',
    location: 'Irvine, California',
    dates: 'January 2026 – Present',
    bullets: [
      'Building a backend AI agent to streamline enterprise vendor discovery, evaluation, and pricing workflows, reducing sourcing timelines from 6–10 weeks to under 1 week across complex RFP processes.',
      'Implementing a stateful multi-agent architecture with persistent, auditable decision traces to improve transparency, stakeholder trust, and downstream negotiation leverage.',
      'Partnering with cross-functional stakeholders to translate procurement and finance requirements into scalable backend systems that support measurable cost savings and faster decision-making.',
    ],
  },
  {
    company: 'EdgeLab, UC Irvine',
    title: 'Software Engineering Intern (Image Processing & Automation)',
    location: 'Irvine, California',
    dates: 'February 2024 – Present',
    bullets: [
      'Building Python-based preprocessing pipelines for 700+ pediatric ultrasound images, reducing manual workflows by 40%+.',
      'Implementing feature extraction and anomaly detection with performance and data-quality metrics for downstream analysis.',
      'Refactoring legacy scripts into modular, testable components with unit and integration tests to improve system reliability and maintainability.',
    ],
  },
  {
    company: 'University Advancement & Alumni Relations, UC Irvine',
    title: 'Web Engineering Student Worker',
    location: 'Irvine, California',
    dates: 'September 2024 – September 2025',
    bullets: [
      'Led the redesign of a high-traffic financial aid platform, improving accessibility and usability for 30,000+ students.',
      'Built Python automation tools and ETL pipelines that eliminated 15+ hours of manual reporting work per cycle for operations teams.',
      'Delivered cleaned datasets and analytics dashboards that enabled faster, data-driven decisions for non-technical stakeholders.',
    ],
  },
]

const involvements: Role[] = [
  {
    company: 'Microsoft Shadowship Program',
    title: '',
    location: '',
    dates: '',
    bullets: [
      'Shadowed a Microsoft software engineer to observe end-to-end workflows, code reviews, and cross-team collaboration.',
      'Received mentorship on technical recruiting and career preparation.',
    ],
  },
  {
    company: 'Venture Capital Society, UC Irvine',
    title: 'Technology Intern',
    location: '',
    dates: '',
    bullets: [
      'Built core website features and responsive layouts, increasing event visibility by ~30% and achieving <2-second page load times.',
      'Improved UX consistency and lead capture by resolving cross-browser issues and supporting membership registration workflows.',
    ],
  },
]

const education = {
  school: 'University of California, Irvine',
  degree: 'B.S.',
  expected: 'Expected December 2026',
  coursework:
    'Data Structures, Discrete Mathematics, Multivariable Calculus, Linear Algebra',
}

const skills: { label: string; items: string[] }[] = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'C++', 'JavaScript/TypeScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    label: 'Tools & Frameworks',
    items: [
      'Flask', 'Next.js', 'Angular', 'PostgreSQL', 'Pandas', 'NumPy',
      'OpenCV', 'RESTful APIs', 'ETL Pipelines', 'Git', 'Jupyter', 'VS Code',
    ],
  },
  {
    label: 'Product',
    items: [
      'Stakeholder Research', 'Requirements Definition', 'Product Analytics',
      'Experimentation', 'Cross-Functional Execution', 'Post-Launch Feedback Analysis',
    ],
  },
]

/* ─── animation ─── */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
}

/* ─── component ─── */

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl sm:text-4xl text-charcoal-solid mb-12"
        >
          Experience
        </motion.h2>

        {/* Education */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-12 rounded-xl border border-charcoal/[0.08] bg-beige-50/70 p-5 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="mt-0.5 text-terracotta/50 shrink-0"
            >
              <path d="M10 2L18 7L10 12L2 7L10 2Z" />
              <path d="M4 8.5V14C4 14 6.5 17 10 17C13.5 17 16 14 16 14V8.5" />
              <line x1="18" y1="7" x2="18" y2="14" />
            </svg>
            <div>
              <h3 className="font-serif text-base font-semibold text-charcoal-solid">
                {education.school}
              </h3>
              <p className="text-sm text-charcoal-solid/55 mt-0.5">
                {education.degree} &middot; {education.expected}
              </p>
              <p className="text-xs text-charcoal-solid/40 mt-2 leading-relaxed">
                <span className="font-medium text-charcoal-solid/50">Relevant Coursework:</span>{' '}
                {education.coursework}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-8">
          <div
            className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-charcoal/[0.08]"
            aria-hidden="true"
          />

          {roles.map((role, i) => (
            <motion.div
              key={role.company}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-6 sm:-left-8 top-1.5 w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] rounded-full border-2 border-terracotta/40 bg-beige-100" />
              <h3 className="font-serif text-base sm:text-lg font-semibold text-charcoal-solid">
                {role.company}
              </h3>
              <p className="text-sm text-charcoal-solid/55 mt-0.5">
                {role.title}
                {role.location && <> &middot; {role.location}</>}
              </p>
              <p className="text-xs text-charcoal-solid/35 font-medium mt-0.5">
                {role.dates}
              </p>
              <ul className="mt-3 space-y-2">
                {role.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="text-sm text-charcoal-solid/55 leading-relaxed flex items-start gap-2"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-charcoal/20 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Involvements */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mt-14">
          <h3 className="text-xs uppercase tracking-[0.15em] text-charcoal-solid/35 font-semibold mb-6">
            Other Involvements
          </h3>
          <div className="relative pl-6 sm:pl-8">
            <div
              className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-charcoal/[0.06]"
              aria-hidden="true"
            />
            {involvements.map((role, i) => (
              <motion.div
                key={role.company}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className="relative mb-8 last:mb-0"
              >
                <span className="absolute -left-6 sm:-left-8 top-1.5 w-[13px] h-[13px] sm:w-[15px] sm:h-[15px] rounded-full border-[1.5px] border-dusty/40 bg-beige-100" />
                <h4 className="font-serif text-[15px] font-semibold text-charcoal-solid">
                  {role.company}
                </h4>
                {role.title && (
                  <p className="text-sm text-charcoal-solid/50 mt-0.5">{role.title}</p>
                )}
                <ul className="mt-2.5 space-y-1.5">
                  {role.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="text-sm text-charcoal-solid/50 leading-relaxed flex items-start gap-2"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-charcoal/15 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mt-14">
          <h3 className="text-xs uppercase tracking-[0.15em] text-charcoal-solid/35 font-semibold mb-5">
            Skills
          </h3>
          <div className="space-y-4">
            {skills.map((group) => (
              <div key={group.label}>
                <span className="text-xs font-medium text-charcoal-solid/40 mr-2">
                  {group.label}:
                </span>
                <div className="inline-flex flex-wrap gap-1.5 mt-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-0.5 text-[11px] rounded-full border border-charcoal/[0.08] text-charcoal-solid/50 font-medium bg-beige-50/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
