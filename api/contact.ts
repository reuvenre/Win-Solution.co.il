const VALID_SERVICES = [
  'בניית אתרים',
  'אוטומציות No-Code',
  'אוטומציה WhatsApp',
  'Airtable CRM',
  'AI Chat Agent',
  'חבילת הכל-באחד',
  'ייעוץ ראשוני',
]

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const { name, phone, email, service, message } = req.body ?? {}

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'Invalid name' })
  }
  if (!phone || typeof phone !== 'string' || !/^0\d{8,9}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone' })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  if (!service || typeof service !== 'string' || !VALID_SERVICES.includes(service)) {
    return res.status(400).json({ error: 'Invalid service' })
  }
  if (message && (typeof message !== 'string' || message.length > 2000)) {
    return res.status(400).json({ error: 'Message too long' })
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        phone,
        email: email.trim().toLowerCase(),
        service,
        message: message?.trim() ?? '',
      }),
    })

    if (!upstream.ok) throw new Error(`Webhook responded with ${upstream.status}`)

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(500).json({ error: 'Failed to submit form' })
  }
}
