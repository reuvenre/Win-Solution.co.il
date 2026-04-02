import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
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
      <label className="block text-sm text-white/70 font-medium">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
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
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/60 focus:bg-white/8 transition-all duration-200'

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0066ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">צור קשר</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            נשמח לשמוע ממך
          </h2>
          <p className="text-white/50">
            מלא את הטופס ונחזור אליך תוך 24 שעות עם הצעה מותאמת אישית.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl p-8"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">ההודעה נשלחה בהצלחה!</h3>
              <p className="text-white/60 mb-6">ניצור איתך קשר בהקדם.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-accent text-sm hover:underline"
              >
                שלח הודעה נוספת
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
                    <option key={s} value={s} className="bg-[#0a0a0f]">
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
                className="w-full bg-gradient-accent text-white font-bold py-3.5 rounded-lg transition-all duration-300 hover:glow-accent hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? 'שולח...' : 'שלח הודעה'}
              </button>
              {submitError && (
                <p className="text-red-400 text-sm text-center">
                  שגיאה בשליחה — נסה שוב או פנה אלינו בוואטסאפ.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
