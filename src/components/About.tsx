import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const values = [
  {
    num: '01',
    title: 'ממוקד תוצאות',
    desc: 'כל מערכת שאני בונה נמדדת לפי ההשפעה האמיתית על העסק שלך — לא תיאוריה, תוצאות שרואים.',
  },
  {
    num: '02',
    title: 'יחס אישי ומלא',
    desc: 'אתה לא מספר. אני מכיר כל פרויקט לעומק, זמין לשאלות, ומלווה אותך גם אחרי שהמערכת עלתה לאוויר.',
  },
  {
    num: '03',
    title: 'מהירות ואמינות',
    desc: 'מאפס לפתרון עובד תוך ימים ספורים, לא חודשים. מה שאני מבטיח — אני מבצע.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">03 — עליי</span>
          <div className="h-px flex-1 bg-white/8 max-w-xs" />
        </motion.div>

        {/* Top: photo (right) + text (left) */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Right (first in RTL): photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <img
              src="/profile.webp"
              alt="המייסד של WIN SOLUTIONS"
              width={224}
              height={224}
              loading="lazy"
              className="w-56 h-56 rounded-full object-cover object-top"
              style={{ boxShadow: '0 0 0 2px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.15)' }}
            />
          </motion.div>

          {/* Left (second in RTL): text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
              מאחורי כל פרויקט —{' '}
              <span className="text-gradient">אני</span>
            </h2>
            <p className="text-white/85 leading-relaxed mb-5 font-light">
              אין כאן צוות גדול ואין מוקד שמעביר אותך מנציג לנציג. מהשיחה הראשונה
              ועד ההטמעה בשטח — אתה עובד ישירות מולי, ומקבל מענה ממי שבונה את
              המערכת במו ידיו.
            </p>
            <p className="text-white/85 leading-relaxed mb-10 font-light">
              לאורך השנים בניתי עשרות מערכות אוטומציה, לידים ו-AI לעסקים קטנים
              ובינוניים. את כל הניסיון הזה אני מביא לכל פרויקט — כדי להתאים לך
              בדיוק את מה שהעסק צריך, בלי חבילות מדף ובלי בירוקרטיה.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-black font-black text-xs px-7 py-3.5 tracking-wider uppercase transition-all duration-200 hover:bg-white"
            >
              דברו איתי ישירות
              <span>←</span>
            </a>

            <div className="mt-12 pt-8 border-t border-white/8 grid grid-cols-3 gap-6">
              {[
                { n: '3+', label: 'שנות ניסיון' },
                { n: '50+', label: 'פרויקטים שהושלמו' },
                { n: '1:1', label: 'יחס אישי לכל לקוח' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-gradient tracking-tighter">{s.n}</div>
                  <div className="text-[11px] text-white/55 mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom: values — 3 columns full width */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.05]">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
              className="bg-[#05050a] p-8 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="text-4xl font-black text-accent tracking-tighter leading-none mb-4">
                {v.num}
              </div>
              <h4 className="text-white font-bold mb-3 tracking-tight">{v.title}</h4>
              <p className="text-white/80 text-sm leading-relaxed font-light">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
