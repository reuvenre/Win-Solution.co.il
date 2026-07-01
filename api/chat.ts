import { GoogleGenAI } from '@google/genai'
import { rateLimit, clientIp } from './_rateLimit'

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

const MAX_MESSAGE_LENGTH = 1000
const MAX_HISTORY_ITEMS = 20

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!rateLimit(`chat:${clientIp(req)}`, 15, 60_000)) {
    return res.status(429).json({ error: 'Too many requests' })
  }

  const { messages, newMessage } = req.body ?? {}

  if (
    !newMessage ||
    typeof newMessage !== 'string' ||
    newMessage.trim().length === 0 ||
    newMessage.length > MAX_MESSAGE_LENGTH
  ) {
    return res.status(400).json({ error: 'Invalid message' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const ai = new GoogleGenAI({ apiKey })

    const history = (Array.isArray(messages) ? messages : [])
      .slice(-MAX_HISTORY_ITEMS)
      .map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(m.text ?? '').slice(0, MAX_MESSAGE_LENGTH) }],
      }))

    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      history,
      config: { systemInstruction: SYSTEM_PROMPT },
    })

    const response = await chat.sendMessage({ message: newMessage.trim() })
    const reply = response.text ?? 'מצטער, לא הצלחתי לעבד את הבקשה.'

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Gemini API error:', err)
    return res.status(500).json({ error: 'AI service error' })
  }
}
