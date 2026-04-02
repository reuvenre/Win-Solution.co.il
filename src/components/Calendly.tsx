import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

// Replace with your actual Calendly URL
const CALENDLY_URL = 'https://calendly.com/win-solutions/meet-with-me-1'

export default function Calendly() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="scheduling" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">קביעת פגישה</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            קבע פגישת ייעוץ חינם
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            30 דקות שיכולות לשנות את העסק שלך. בחר זמן שנוח לך ונדבר על
            האפשרויות שמתאימות לך.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Calendly inline widget */}
          <div
            className="calendly-inline-widget min-w-[320px] h-[630px]"
            data-url={CALENDLY_URL}
          />
        </motion.div>
      </div>
    </section>
  )
}
