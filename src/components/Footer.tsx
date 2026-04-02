const footerLinks = {
  שירותים: [
    { label: 'בניית אתרים', href: '#services' },
    { label: 'אוטומציות No-Code', href: '#services' },
    { label: 'אוטומציה WhatsApp', href: '#services' },
    { label: 'AI Chat Agent', href: '#services' },
  ],
  חברה: [
    { label: 'אודותינו', href: '#about' },
    { label: 'קביעת פגישה', href: '#scheduling' },
    { label: 'צור קשר', href: '#contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="WIN Solutions" className="h-9 w-9 rounded-full object-cover" />
              <span className="text-white font-black text-sm tracking-widest uppercase">WIN SOLUTIONS</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs font-light">
              מנגישים לעסקים קטנים ובינוניים את הטכנולוגיות המתקדמות ביותר — אוטומציות, AI ואתרים חכמים.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-white/35 text-sm hover:text-accent transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/25 text-xs">
          <p>© {new Date().getFullYear()} WIN SOLUTIONS. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-white/30">פעיל ומוכן לעבודה</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
