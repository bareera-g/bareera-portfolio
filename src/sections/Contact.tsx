import { motion } from 'framer-motion'

const links = [
  {
    label: 'Email',
    href: 'mailto:bareera.gulraiz21@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="1" y="3" width="14" height="10" rx="1.5" />
        <path d="M1 4.5L8 9L15 4.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bareera-gulraiz/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="1" y="1" width="14" height="14" rx="2" />
        <path d="M5 7V11M5 4.5V4.51M8 11V8.5C8 7.5 8.5 7 9.5 7C10.5 7 11 7.5 11 8.5V11" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/bareera-g',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 12.5C3.5 13.3 3.5 11 2.5 10.5M9.5 14V12C9.5 11.2 9.6 10.9 9 10.5C11 10.3 13 9.5 13 6.5C13 5.5 12.6 4.7 12 4C12.1 3.7 12.3 2.7 11.9 2C11.9 2 11.1 1.8 9.5 3C8.5 2.7 7.5 2.7 6.5 3C4.9 1.8 4.1 2 4.1 2C3.7 2.7 3.9 3.7 4 4C3.4 4.7 3 5.5 3 6.5C3 9.5 5 10.3 7 10.5C6.4 10.9 6.5 11.4 6.5 12V14" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 py-20 sm:py-28 px-5 sm:px-6 border-t border-charcoal/[0.05]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-solid">
            Let&rsquo;s Connect
          </h2>
          <p className="mt-4 text-charcoal-solid/45 max-w-md mx-auto leading-relaxed text-[15px]">
            Open to opportunities where I can build reliable systems and ship features that matter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-charcoal/[0.1] text-charcoal-solid/60 hover:border-charcoal/[0.22] hover:text-charcoal-solid transition-colors cursor-pointer"
            >
              <span className="opacity-50">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 font-serif text-lg text-charcoal-solid/30 italic leading-relaxed"
        >
          The next home isn&rsquo;t a place. It&rsquo;s what I&rsquo;m building next.
        </motion.p>

        <p className="mt-14 text-[11px] text-charcoal-solid/20 tracking-wide">
          &copy; {new Date().getFullYear()} Bareera Gulraiz
        </p>
      </div>
    </section>
  )
}
