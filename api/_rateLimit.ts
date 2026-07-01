// Best-effort in-memory rate limiter for the serverless API routes.
//
// NOTE: serverless instances are ephemeral and can run in parallel, so this
// only limits bursts hitting the same warm instance — it is defense-in-depth,
// not a hard guarantee. For strict, cross-instance limits use a shared store
// (Vercel KV / Upstash Redis) keyed the same way.

type Bucket = { count: number; reset: number }

const buckets = new Map<string, Bucket>()

/** Returns true if the request is allowed, false if the limit is exceeded. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()

  // Opportunistic prune so the map can't grow unbounded on a long-lived instance.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (now > b.reset) buckets.delete(k)
    }
  }

  const bucket = buckets.get(key)
  if (!bucket || now > bucket.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    return true
  }
  if (bucket.count >= limit) return false
  bucket.count++
  return true
}

/** Best-effort client IP from Vercel's forwarding headers. */
export function clientIp(req: any): string {
  const xff = req.headers?.['x-forwarded-for']
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim()
  if (Array.isArray(xff) && xff.length) return String(xff[0]).trim()
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || 'unknown'
}
