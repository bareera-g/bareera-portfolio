import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" role="navigation" aria-label="Main navigation">
      <motion.div
        className="h-[2px] bg-terracotta/70 origin-left"
        style={{ width: progressWidth }}
        aria-hidden="true"
      />
      <div className="backdrop-blur-md bg-beige-100/80 border-b border-charcoal/[0.06]">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
          <a
            href="#"
            className="font-serif text-lg font-semibold text-charcoal-solid tracking-tight hover:opacity-70 transition-opacity"
          >
            B.G.
          </a>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-charcoal-solid/55 hover:text-charcoal-solid transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#projects"
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-terracotta/25 text-terracotta hover:bg-terracotta/[0.08] transition-colors"
            >
              Skip story &rarr; Projects
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {mobileOpen ? (
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-charcoal/[0.06] px-5 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-charcoal-solid/65 hover:text-charcoal-solid transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#projects"
              onClick={() => setMobileOpen(false)}
              className="block text-xs font-semibold text-terracotta"
            >
              Skip story &rarr; Projects
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
