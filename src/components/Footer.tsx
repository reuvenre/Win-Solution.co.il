const footerLinks = {
  שירותים: [
    { label: 'בניית אתרים', href: '#services' },
    { label: 'אוטומציות No-Code', href: '#services' },
    { label: 'אוטומציה WhatsApp', href: '#services' },
    { label: 'Airtable CRM', href: '#services' },
    { label: 'AI Chat Agent', href: '#services' },
    { label: 'חבילת הכל-באחד', href: '#services' },
  ],
  חברה: [
    { label: 'אודותינו', href: '#about' },
    { label: 'קביעת פגישה', href: '#scheduling' },
    { label: 'צור קשר', href: '#contact' },
  ],
  'יצירת קשר': [
    { label: 'ייעוץ ראשוני חינם', href: '#scheduling' },
    { label: 'שלח הודעה', href: '#contact' },
    { label: 'וואטסאפ', href: '#contact' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/6 bg-white/[0.01] relative z-10">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-0">

        {/* Main grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <img src="/logo.png" alt="WIN Solutions" className="h-9 w-9 rounded-full object-cover" />
              <span className="text-white font-black text-sm tracking-widest uppercase">WIN SOLUTIONS</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed font-light mb-6">
              מנגישים לעסקים קטנים ובינוניים את הטכנולוגיות המתקדמות ביותר — אוטומציות, AI ואתרים חכמים.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-white/30 text-xs">פעיל ומוכן לעבודה</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-5">{title}</h4>
              <ul className="space-y-3">
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

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/25 text-xs">
          <p>© {year} WIN SOLUTIONS בע״מ. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-5">
            <span className="hover:text-white/50 transition-colors cursor-pointer">מדיניות פרטיות</span>
            <span className="hover:text-white/50 transition-colors cursor-pointer">תנאי שימוש</span>
            <span className="text-white/15">|</span>
            <span>עוצב ופותח בישראל 🇮🇱</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
