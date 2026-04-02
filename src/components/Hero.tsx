import { motion, type Easing } from 'framer-motion'

const EASE: Easing = 'easeOut'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: EASE },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00d4ff]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#0066ff]/8 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] grid-overlay" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-accent mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          אוטומציות חכמות ובנייית אתרים לעסקים מתקדמים
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-7xl font-black leading-tight mb-6"
        >
          חסוך זמן.{' '}
          <span className="text-gradient">הכפל הכנסות.</span>
          <br />
          תתקדם עם AI.
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          אנחנו מנגישים לעסקים קטנים ובינוניים את הטכנולוגיות המתקדמות ביותר —
          אוטומציות, בינה מלאכותית ואתרים חכמים — כדי שתוכל להתמקד במה שחשוב
          באמת.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="bg-gradient-accent text-white font-bold px-8 py-3.5 rounded-lg text-base transition-all duration-300 hover:glow-accent hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            קבל ייעוץ חינם
          </a>
          <a
            href="#services"
            className="glass border border-white/20 text-white/80 hover:text-accent hover:border-accent font-semibold px-8 py-3.5 rounded-lg text-base transition-all duration-300 w-full sm:w-auto text-center"
          >
            גלה את השירותים ↓
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: '50+', label: 'לקוחות מרוצים' },
            { value: '200+', label: 'אוטומציות בפעילות' },
            { value: '95%', label: 'חיסכון בזמן' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-gradient">{s.value}</div>
              <div className="text-xs text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs">גלול למטה</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-accent/50 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
