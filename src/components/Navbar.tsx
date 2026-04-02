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
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="WIN Solutions" className="h-9 w-9 rounded-full object-cover" />
          <span className="hidden sm:block text-white font-black text-sm tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            WIN SOLUTIONS
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm text-white/50 hover:text-white transition-colors duration-200 group py-1"
              >
                {l.label}
                <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1.5 bg-accent text-black text-xs font-black px-5 py-2.5 tracking-wider uppercase transition-all duration-200 hover:bg-white"
        >
          התחל עכשיו
        </a>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="תפריט"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-white origin-center transition-all"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-px bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-white origin-center transition-all"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block text-white/60 hover:text-accent py-3 text-sm border-b border-white/5 last:border-0 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="#contact"
                  className="block bg-accent text-black text-center font-black text-xs px-5 py-3 tracking-wider uppercase"
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
