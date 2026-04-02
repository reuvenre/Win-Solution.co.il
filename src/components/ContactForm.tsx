import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2, 'שם חייב להכיל לפחות 2 תווים'),
  phone: z.string().regex(/^0\d{8,9}$/, 'מספר טלפון לא תקין'),
  email: z.email('כתובת אימייל לא תקינה'),
  service: z.string().min(1, 'אנא בחר שירות'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const services = [
  'בניית אתרים',
  'אוטומציות No-Code',
  'אוטומציה WhatsApp',
  'Airtable CRM',
  'AI Chat Agent',
  'חבילת הכל-באחד',
  'ייעוץ ראשוני',
]

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs text-white/40 font-bold tracking-[0.15em] uppercase">{label}</label>
      {children}
      {error && <p className="text-red-400/80 text-xs">{error}</p>}
    </div>
  )
}

export default function ContactForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setSubmitError(false)
    try {
      const res = await fetch('https://hook.eu2.make.com/66x69szyjxrbcw5ez4f26d2iknem51bw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      reset()
    } catch {
      setSubmitError(true)
    }
  }

  const inputClass =
    'w-full bg-white/[0.03] border border-white/8 px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all duration-200'

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-dark/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">03 — צור קשר</span>
          <div className="h-px flex-1 bg-white/8 max-w-xs" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
              נשמח לשמוע{' '}
              <span className="text-gradient">ממך</span>
            </h2>
            <p className="text-white/40 leading-relaxed mb-10 font-light">
              מלא את הטופס ונחזור אליך תוך 24 שעות עם הצעה מותאמת אישית.
            </p>

            <div className="space-y-5">
              {[
                { icon: '📍', label: 'ישראל' },
                { icon: '⏱', label: 'מענה תוך 24 שעות' },
                { icon: '💬', label: 'ייעוץ ראשוני חינם' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-white/8 flex items-center justify-center text-sm shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-white/50 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="border border-white/6 p-8 bg-white/[0.015]"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-14 h-14 border border-accent/40 flex items-center justify-center mx-auto mb-5">
                  <span className="text-accent text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">ההודעה נשלחה בהצלחה</h3>
                <p className="text-white/40 text-sm mb-6">ניצור איתך קשר בהקדם.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-accent text-xs font-bold tracking-widest uppercase hover:text-white transition-colors"
                >
                  שלח הודעה נוספת
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="שם מלא *" error={errors.name?.message}>
                    <input
                      {...register('name')}
                      placeholder="ישראל ישראלי"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="טלפון *" error={errors.phone?.message}>
                    <input
                      {...register('phone')}
                      placeholder="050-0000000"
                      type="tel"
                      dir="ltr"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="אימייל *" error={errors.email?.message}>
                  <input
                    {...register('email')}
                    placeholder="you@example.com"
                    type="email"
                    dir="ltr"
                    className={inputClass}
                  />
                </Field>

                <Field label="שירות מבוקש *" error={errors.service?.message}>
                  <select {...register('service')} className={inputClass}>
                    <option value="">-- בחר שירות --</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-[#05050a]">
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="הודעה (אופציונלי)">
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="ספר לנו על העסק שלך ומה אתה מחפש..."
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-black font-black text-xs py-4 tracking-[0.2em] uppercase transition-all duration-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                </button>

                {submitError && (
                  <p className="text-red-400/80 text-xs text-center">
                    שגיאה בשליחה — נסה שוב או פנה אלינו בוואטסאפ.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
