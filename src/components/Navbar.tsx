import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'בית', href: '#hero' },
  { label: 'שירותים', href: '#services' },
  { label: 'אודות', href: '#about' },
  { label: 'קביעת פגישה', href: '#scheduling' },
  { label: 'צור קשר', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center">
          <img src="/logo.png" alt="WIN Solutions" className="h-12 w-12 rounded-full object-cover" />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-white/70 hover:text-accent transition-colors duration-200 hover:glow-accent-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-block bg-gradient-accent text-white text-sm font-bold px-5 py-2 rounded-lg transition-all duration-300 hover:glow-accent hover:-translate-y-0.5"
        >
          התחל עכשיו
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="תפריט"
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all" />
          <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all" />
          <span className="block w-6 h-0.5 bg-white transition-all" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-white/10"
          >
            <ul className="flex flex-col p-4 gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block text-white/80 hover:text-accent py-2 text-base transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="block bg-gradient-accent text-white text-center font-bold px-5 py-2.5 rounded-lg mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  התחל עכשיו
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
