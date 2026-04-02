import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const values = [
  { icon: '🎯', title: 'ממוקדי תוצאות', desc: 'כל פתרון נמדד לפי ההשפעה האמיתית על העסק שלך' },
  { icon: '🚀', title: 'מהירות יישום', desc: 'מאפס לפתרון עובד תוך ימים ספורים, לא חודשים' },
  { icon: '🤝', title: 'שותפות לטווח ארוך', desc: 'אנחנו לא רק ספקים — אנחנו שותפים אסטרטגיים שלך' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">אודותינו</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
              אנחנו מאמינים ש<span className="text-gradient">טכנולוגיה</span> צריכה לעבוד עבורך
            </h2>
            <p className="text-white/60 leading-relaxed mb-6">
              WIN SOLUTIONS נוסדה מתוך אמונה עמוקה שעסקים קטנים ובינוניים מגיעים לאותם
              כלים טכנולוגיים שעומדים לרשות תאגידי הענק — ובמחיר שמתאים להם.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              הצוות שלנו מתמחה בהנגשת פתרונות אוטומציה, בינה מלאכותית ופיתוח
              ווב, תוך מיקוד בתוצאות מדידות וחסכון אמיתי בזמן ובכסף.
            </p>

            <a
              href="#contact"
              className="inline-block bg-gradient-accent text-white font-bold px-7 py-3 rounded-lg transition-all duration-300 hover:glow-accent hover:-translate-y-1"
            >
              בואו נדבר
            </a>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="space-y-4"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass rounded-xl p-5 flex gap-4 items-start hover:border-accent/30 border border-white/10 transition-all duration-300"
              >
                <span className="text-2xl mt-0.5">{v.icon}</span>
                <div>
                  <h4 className="text-white font-bold mb-1">{v.title}</h4>
                  <p className="text-white/55 text-sm">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
