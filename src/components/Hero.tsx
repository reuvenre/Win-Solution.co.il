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
  'Make.com', 'Zapier', 'Airtable', 'OpenAI', 'WhatsApp API',
  'React', 'Node.js', 'Webflow', 'n8n', 'Google Workspace',
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,212,255,0.07)_0%,transparent_70%)]" />

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="hero-bg-text font-black text-white leading-none tracking-tighter whitespace-nowrap"
        >
          WIN
        </span>
      </div>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

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
            <div className="h-px w-10 bg-accent shrink-0" />
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
            חסוך זמן.
            <br />
            <span className="text-gradient">הכפל הכנסות.</span>
            <br />
            <span className="text-white/30">תתקדם עם AI.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-base md:text-lg text-white/45 max-w-lg leading-relaxed mb-10 font-light"
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
                <div className="text-[11px] text-white/35 mt-1.5 font-medium tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tech marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 py-3 overflow-hidden bg-white/[0.015]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-14 whitespace-nowrap"
        >
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} className="text-[11px] text-white/20 font-mono tracking-[0.2em] uppercase">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
