import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Edit project copy here — each entry renders one portfolio card.
const projects = [
  {
    name: 'NEXLIFY',
    category: 'פלטפורמת אתרים חכמים',
    description:
      'פלטפורמה לבניית אתרים ודפי נחיתה ממוקדי המרה — עיצוב מודרני, מהירות טעינה גבוהה וחיבור ישיר למערכות הלידים של העסק.',
    results: ['דפי נחיתה שממירים מבקרים ללידים', 'SEO מובנה מהיום הראשון', 'חיבור אוטומטי ל-CRM ולוואטסאפ'],
    tags: ['React', 'AI', 'SEO'],
    link: 'https://nexlify.win-solutions.co.il/',
    accentClass: 'svc-accent-cyan',
    hoverBorder: 'hover:border-cyan-400/30',
  },
  {
    name: 'CLICKLEAD',
    category: 'מערכת גיוס והפצת לידים',
    description:
      'מערכת שקולטת לידים מקמפיינים, טפסים ורשתות חברתיות — מסננת, מתעדפת ומנתבת אותם אוטומטית לנציג הנכון תוך שניות.',
    results: ['מענה ראשוני ללידים תוך שניות', 'ניתוב חכם לפי מקור ותחום', 'דוחות המרה בזמן אמת'],
    tags: ['Make', 'WhatsApp API', 'Airtable'],
    link: 'https://clicklead.win-solutions.co.il/',
    accentClass: 'svc-accent-purple',
    hoverBorder: 'hover:border-purple-400/30',
  },
  {
    name: 'Real Estate Lead CRM',
    category: 'CRM לנדל״ן',
    description:
      'מערכת CRM ייעודית לשוק הנדל״ן — ניהול לידים, התאמת נכסים ללקוחות, מעקב אחר עסקאות ותזכורות אוטומטיות לכל שלב במשפך.',
    results: ['התאמה חכמה בין לקוחות לנכסים', 'פולו-אפ אוטומטי שלא מפספס אף ליד', 'תמונת מצב מלאה של כל העסקאות'],
    tags: ['Airtable', 'Make', 'אוטומציה'],
    link: 'https://wa-lead-crm.vercel.app/',
    accentClass: 'svc-accent-emerald',
    hoverBorder: 'hover:border-emerald-400/30',
  },
  {
    name: 'LAW OFFICE SYSTEM',
    category: 'מערכת למשרדי עורכי דין',
    description:
      'מערכת לניהול משרד עורכי דין — קליטת פניות מדף הנחיתה ישירות למשרד, תיאום פגישות אוטומטי ומעקב מסודר אחר כל תיק ולקוח.',
    results: ['כל פנייה מגיעה למשרד בזמן אמת', 'תיאום פגישות ללא טלפונים מיותרים', 'ניהול תיקים ולקוחות במקום אחד'],
    tags: ['React', 'Make', 'CRM'],
    link: 'https://law-office-system-drab.vercel.app/',
    accentClass: 'svc-accent-yellow',
    hoverBorder: 'hover:border-yellow-400/30',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      className={`group relative card-sharp p-8 flex flex-col ${project.hoverBorder} transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`h-px w-8 group-hover:w-14 transition-all duration-300 ${project.accentClass}`} />
        <span className="text-white/60 text-[11px] font-bold tracking-[0.2em] uppercase">{project.category}</span>
      </div>

      <h3 className="text-2xl font-black text-white tracking-tight mb-4" dir="ltr" style={{ textAlign: 'right' }}>
        {project.name}
      </h3>

      <p className="text-white/85 text-sm leading-relaxed mb-6">{project.description}</p>

      <ul className="space-y-2.5 mb-8">
        {project.results.map((r) => (
          <li key={r} className="flex items-center gap-2.5 text-xs text-white/85">
            <span className={`w-1 h-1 rounded-full shrink-0 ${project.accentClass}`} />
            {r}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] text-white/60 border border-white/10 px-2.5 py-1 tracking-wider uppercase"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-white/70 text-xs font-bold tracking-widest uppercase hover:text-accent transition-colors whitespace-nowrap"
          >
            צפה במערכת ↗
          </a>
          <a
            href="#contact"
            className="shrink-0 text-accent text-xs font-bold tracking-widest uppercase hover:text-white transition-colors whitespace-nowrap"
          >
            רוצה כזאת? ←
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">02 — הפרויקטים שלנו</span>
            <div className="h-px flex-1 bg-white/8 max-w-xs" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            מערכות שמייצרות לידים
          </h2>
          <p className="text-white/80 text-base mt-4 max-w-lg font-light">
            לא רק מדברים — בונים. אלה מערכות אמיתיות שפיתחנו, שכבר עובדות ומייצרות תוצאות ללקוחות שלנו כל יום.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-white/[0.05]">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className={`bg-[#05050a] ${
                projects.length % 2 === 1 && i === projects.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
