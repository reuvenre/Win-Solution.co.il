import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    title: 'בניית אתרים',
    description: 'אתרים מרהיבים, מהירים ומותאמים למובייל — עיצוב מותאם אישית, SEO, ופתרונות Vibe Coding מתקדמים.',
    features: ['עיצוב מדויק לברנד', 'מהיר ומאובטח', 'תוצאות SEO גבוהות'],
    accentClass: 'svc-accent-purple',
    hoverBorder: 'hover:border-purple-400/30',
  },
  {
    title: 'אוטומציות No-Code',
    description: 'תהליכים עסקיים שרצים לבד — ניהול לידים, שליחת מיילים, עדכון גיליונות ועוד. עם Make ו-Zapier.',
    features: ['חיסכון של עשרות שעות בחודש', 'אינטגרציה עם 1000+ אפליקציות', 'ללא צורך בתכנות'],
    accentClass: 'svc-accent-cyan',
    hoverBorder: 'hover:border-cyan-400/30',
  },
  {
    title: 'אוטומציה WhatsApp',
    description: 'מענה אוטומטי ללקוחות, שליחת עדכונים, תזכורות ואישורי פגישות — ישירות לוואטסאפ של הלקוח.',
    features: ['מענה 24/7 ללא עלות נוספת', 'שליחת הודעות המוניות חוקיות', 'חיבור ל-CRM ולמערכות קיימות'],
    accentClass: 'svc-accent-emerald',
    hoverBorder: 'hover:border-emerald-400/30',
  },
  {
    title: 'Airtable CRM',
    description: 'מסד נתונים חכם לניהול לקוחות, עסקאות ופרויקטים — מותאם לעסק שלך, גמיש וקל לתפעול.',
    features: ['תצוגות מותאמות אישית', 'אוטומציות מובנות', 'גישה מכל מכשיר'],
    accentClass: 'svc-accent-yellow',
    hoverBorder: 'hover:border-yellow-400/30',
  },
  {
    title: 'AI Chat Agent',
    description: 'סוכן AI מותאם לעסק שלך — עונה לשאלות לקוחות, מסייע בתמיכה ואוסף מידע, אוטומטית.',
    features: ['ידע מותאם לתחום שלך', 'זמין 24/7 בכל ערוץ', 'מחובר לכלים הקיימים'],
    accentClass: 'svc-accent-indigo',
    hoverBorder: 'hover:border-indigo-400/30',
  },
  {
    title: 'חבילת הכל-באחד',
    description: 'השילוב המנצח: אתר + אוטומציות + CRM + AI — פתרון מלא שמחבר את כל חלקי העסק לכדי מכונה אחת חלקה.',
    features: ['חיסכון משמעותי על חבילה מלאה', 'יישום ותמיכה שוטפת', 'מותאם אישית לעסק'],
    accentClass: 'svc-accent-rose',
    hoverBorder: 'hover:border-rose-400/30',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      className={`group relative card-sharp p-7 cursor-default ${service.hoverBorder} transition-all duration-300`}
    >
      {/* Number */}
      <div className="text-6xl font-black text-white/[0.04] group-hover:text-white/[0.07] transition-colors leading-none mb-5 tracking-tighter select-none">
        {num}
      </div>

      {/* Accent line — animates on hover */}
      <div className={`h-px w-8 group-hover:w-14 transition-all duration-400 mb-5 ${service.accentClass}`} />

      <h3 className="text-base font-bold text-white mb-3 tracking-tight">{service.title}</h3>
      <p className="text-white/45 text-sm leading-relaxed mb-6">{service.description}</p>

      <ul className="space-y-2.5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-xs text-white/55">
            <span className={`w-1 h-1 rounded-full shrink-0 ${service.accentClass}`} />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">01 — השירותים שלנו</span>
            <div className="h-px flex-1 bg-white/8 max-w-xs" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            הכל תחת קורת גג אחת
          </h2>
          <p className="text-white/40 text-base mt-4 max-w-lg font-light">
            מאוטומציות פשוטות ועד פתרונות AI מורכבים — אנחנו מתאימים את הפתרון לצרכים הספציפיים של העסק שלך.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
          {services.map((s, i) => (
            <div key={s.title} className="bg-[#05050a]">
              <ServiceCard service={s} index={i} />
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
          className="mt-px bg-[#05050a] border border-white/[0.05] hover:border-accent/20 transition-all duration-300 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-6 bg-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">ייעוץ ראשוני חינמי</span>
            </div>
            <p className="text-white/50 text-sm max-w-lg">
              לא בטוח מאיפה להתחיל? נשמח להקדיש לך 30 דקות ייעוץ חינמי — נבין את הצרכים שלך ונמליץ על הפתרון המדויק.
            </p>
          </div>
          <a
            href="#scheduling"
            className="shrink-0 bg-accent text-black font-black text-xs px-8 py-3.5 tracking-wider uppercase transition-all duration-200 hover:bg-white whitespace-nowrap"
          >
            קבע פגישה חינם ←
          </a>
        </motion.div>
      </div>
    </section>
  )
}
