import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: '🌐',
    title: 'בניית אתרים',
    description: 'אתרים מרהיבים, מהירים ומותאמים למובייל — עיצוב מותאם אישית, SEO, ופתרונות Vibe Coding מתקדמים.',
    features: ['עיצוב מדויק לב"ר', 'מהיר ומאובטח', 'תוצאות SEO גבוהות'],
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/20 hover:border-purple-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
  },
  {
    icon: '⚡',
    title: 'אוטומציות No-Code',
    description: 'תהליכים עסקיים שרצים לבד — ניהול לידים, שליחת מיילים, עדכון גיליונות ועוד. עם Make ו-Zapier.',
    features: ['חיסכון של עשרות שעות בחודש', 'אינטגרציה עם 1000+ אפליקציות', 'ללא צורך בתכנות'],
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/20 hover:border-cyan-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]',
  },
  {
    icon: '💬',
    title: 'אוטומציה WhatsApp',
    description: 'מענה אוטומטי ללקוחות, שליחת עדכונים, תזכורות ואישורי פגישות — ישירות לוואטסאפ של הלקוח.',
    features: ['מענה 24/7 ללא עלות נוספת', 'שליחת הודעות המוניות חוקיות', 'חיבור ל-CRM ולמערכות קיימות'],
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/20 hover:border-emerald-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
  },
  {
    icon: '🗄️',
    title: 'Airtable CRM',
    description: 'מסד נתונים חכם לניהול לקוחות, עסקאות ופרויקטים — מותאם לעסק שלך, גמיש וקל לתפעול.',
    features: ['תצוגות מותאמות אישית', 'אוטומציות מובנות', 'גישה מכל מכשיר'],
    color: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/20 hover:border-yellow-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]',
  },
  {
    icon: '🤖',
    title: 'AI Chat Agent',
    description: 'סוכן AI מותאם לעסק שלך — עונה לשאלות לקוחות, מסייע בתמיכה ואוסף מידע, אוטומטית.',
    features: ['ידע מותאם לתחום שלך', 'זמין 24/7 בכל ערוץ', 'מחובר לכלים הקיימים'],
    color: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/20 hover:border-blue-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]',
  },
  {
    icon: '🎯',
    title: 'חבילת הכל-באחד',
    description: 'השילוב המנצח: אתר + אוטומציות + CRM + AI — פתרון מלא שמחבר את כל חלקי העסק לכדי מכונה אחת חלקה.',
    features: ['חיסכון משמעותי על חבילה מלאה', 'יישום ותמיכה שוטפת', 'מותאם אישית לעסק'],
    color: 'from-rose-500/20 to-orange-500/20',
    border: 'border-rose-500/20 hover:border-rose-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
      className={`relative glass rounded-2xl p-8 transition-all duration-300 cursor-default border ${service.border} ${service.glow}`}
    >
      {/* Gradient bg */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-50 pointer-events-none`} />

      <div className="relative z-10">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6">{service.description}</p>
        <ul className="space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-accent text-xs">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">השירותים שלנו</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            הכל תחת קורת גג אחת
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            מאוטומציות פשוטות ועד פתרונות AI מורכבים — אנחנו מתאימים את הפתרון
            לצרכים הספציפיים של העסק שלך.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}

          {/* ייעוץ ראשוני — CTA card spanning full width */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: services.length * 0.15, duration: 0.6, ease: 'easeOut' }}
            className="sm:col-span-2 lg:col-span-3 relative glass rounded-2xl p-8 border border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.12)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <span className="text-5xl">💡</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">ייעוץ ראשוני</h3>
                  <p className="text-white/60 text-sm max-w-lg">
                    לא בטוח מאיפה להתחיל? נשמח להקדיש לך 30 דקות ייעוץ חינמי — נבין את הצרכים
                    שלך ונמליץ על הפתרון המדויק לעסק.
                  </p>
                </div>
              </div>
              <a
                href="#scheduling"
                className="shrink-0 bg-gradient-accent text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:glow-accent hover:-translate-y-1 whitespace-nowrap"
              >
                קבע פגישה חינם ←
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
