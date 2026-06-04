import { motion, type Easing } from 'framer-motion'

const EASE: Easing = 'easeOut'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
}

const techStack = [
  { name: 'Make.com',   slug: 'make',        color: '#ff3e00' },
  { name: 'Zapier',     slug: 'zapier',      color: '#ff4a00' },
  { name: 'Airtable',   slug: 'airtable',    color: '#18bfff' },
  { name: 'OpenAI',     slug: null,          color: '#ffffff' },
  { name: 'WhatsApp',   slug: 'whatsapp',    color: '#25d366' },
  { name: 'React',      slug: 'react',       color: '#61dafb' },
  { name: 'Node.js',    slug: 'nodedotjs',   color: '#339933' },
  { name: 'Webflow',    slug: 'webflow',     color: '#146ef5' },
  { name: 'n8n',        slug: 'n8n',         color: '#ea4b71' },
  { name: 'Google',     slug: 'google',      color: '#4285f4' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Logo — left side */}
      <motion.img
        src="/logo.png"
        alt="WIN Solutions"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="absolute hidden lg:block rounded-full object-cover"
        style={{
          width: '340px',
          height: '340px',
          left: '20%',
          top: '33%',
          transform: 'translateY(-50%)',
          boxShadow: '0 0 0 2px rgba(0,212,255,0.3), 0 0 80px rgba(0,212,255,0.12)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
              אוטומציות · AI · פיתוח אתרים
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="hero-headline font-black leading-[0.88] tracking-tighter mb-8 text-white"
          >
            חוסכים זמן.
            <br />
            <span className="text-gradient">מכפילים הכנסות.</span>
            <br />
            <span className="text-white/60">מתקדמים עם AI.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-base md:text-lg text-white/65 max-w-lg leading-relaxed mb-10 font-light"
          >
            אנחנו מנגישים לעסקים קטנים ובינוניים את הטכנולוגיות המתקדמות ביותר —
            אוטומציות, בינה מלאכותית ואתרים חכמים — כדי שתוכל להתמקד במה שחשוב.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-accent text-black font-black text-sm px-8 py-4 tracking-wider uppercase transition-all duration-200 hover:bg-white w-full sm:w-auto"
            >
              קבל ייעוץ חינם
              <span className="group-hover:-translate-x-1 transition-transform duration-200 text-base">←</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/55 hover:text-accent hover:border-accent/60 font-semibold text-sm px-8 py-4 tracking-wide transition-all duration-300 w-full sm:w-auto"
            >
              גלה את השירותים
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-16 pt-8 border-t border-white/8 grid grid-cols-3 gap-8 max-w-xs"
          >
            {[
              { value: '50+', label: 'לקוחות מרוצים' },
              { value: '200+', label: 'אוטומציות' },
              { value: '95%', label: 'חיסכון בזמן' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-black text-accent tracking-tighter leading-none">
                  {s.value}
                </div>
                <div className="text-[11px] text-white/55 mt-1.5 font-medium tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tech marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 py-4 overflow-hidden bg-white/[0.015]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-10 whitespace-nowrap"
        >
          {[...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0">
              {tech.slug ? (
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}`}
                  alt={tech.name}
                  className="h-5 w-5"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement
                    t.style.display = 'none'
                    const dot = document.createElement('span')
                    dot.style.cssText = `display:inline-block;width:8px;height:8px;border-radius:50%;background:${tech.color};opacity:0.7;flex-shrink:0`
                    t.parentNode?.insertBefore(dot, t)
                  }}
                />
              ) : (
                <span style={{ display:'inline-block', width:'8px', height:'8px', borderRadius:'50%', background: tech.color, opacity: 0.8, flexShrink: 0 }} />
              )}
              <span className="text-xs text-white/70 font-medium tracking-[0.12em] uppercase">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
