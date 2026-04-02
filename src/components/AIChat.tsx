import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleGenAI } from '@google/genai'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string

const SYSTEM_PROMPT = `אתה עוזר וירטואלי של WIN SOLUTIONS — חברה ישראלית המתמחה באוטומציות No-Code, בניית אתרים, ופתרונות AI לעסקים קטנים ובינוניים.

תפקידך:
1. לענות על שאלות לגבי שירותי החברה
2. להסביר את יתרונות האוטומציה ובינה מלאכותית
3. לכוון משתמשים ליצירת קשר או קביעת פגישה

כללים:
- ענה תמיד בעברית
- היה ידידותי, מקצועי וקצר
- אם שאלה לא קשורה לשירותים, הסט בנימוס לנושא
- עודד יצירת קשר ב: קביעת פגישה בסעיף "קביעת פגישה" או טופס יצירת קשר`

interface Message {
  role: 'user' | 'assistant'
  text: string
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'שלום! אני העוזר הוירטואלי של WIN SOLUTIONS 👋 איך אני יכול לעזור לך היום?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      if (!GEMINI_API_KEY) throw new Error('Missing API key')

      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })
      const history = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }))

      const chat = ai.chats.create({
        model: 'gemini-2.0-flash',
        history,
        config: { systemInstruction: SYSTEM_PROMPT },
      })

      const response = await chat.sendMessage({ message: text })
      const reply = response.text ?? 'מצטער, לא הצלחתי לעבד את הבקשה.'
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'מצטער, אירעה שגיאה. נסה שוב מאוחר יותר.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 glass-dark rounded-2xl flex flex-col shadow-2xl overflow-hidden"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-accent/10 to-blue-600/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-sm">🤖</div>
                <div>
                  <p className="text-white text-sm font-bold">עוזר WIN SOLUTIONS</p>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    מחובר
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white text-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-white/10 text-white/90 rounded-tr-sm'
                        : 'bg-gradient-accent text-white rounded-tl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-end">
                  <div className="bg-gradient-accent rounded-2xl rounded-tl-sm px-4 py-3">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ delay: i * 0.15, repeat: Infinity, duration: 0.6 }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="הקלד שאלה..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-all"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center transition-all hover:glow-accent-sm disabled:opacity-40 shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="rotate-180">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-accent shadow-lg hover:glow-accent transition-all duration-300 flex items-center justify-center text-xl hover:-translate-y-1"
        aria-label="פתח צ'אט"
      >
        {open ? '✕' : '💬'}
      </motion.button>
    </>
  )
}
