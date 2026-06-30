import { motion } from 'framer-motion'
import { useEffect } from 'react'

const CALENDLY_URL = 'https://calendly.com/win-solutions/meet-with-me-1'

export default function Calendly() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    // NOTE: do NOT set script.crossOrigin — Calendly's CDN only allows
    // Access-Control-Allow-Origin: https://calendly.com, so requesting the
    // widget in CORS mode gets blocked and the inline iframe never renders.
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="scheduling" className="py-24 px-6">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">קביעת פגישה</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            קבע פגישת ייעוץ חינם
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            30 דקות שיכולות לשנות את העסק שלך. בחר זמן שנוח לך ונדבר על
            האפשרויות שמתאימות לך.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div
            className="calendly-inline-widget min-w-[320px] h-[630px]"
            data-url={CALENDLY_URL}
          />
        </motion.div>
      </div>
    </section>
  )
}
