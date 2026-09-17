/**
 * Simple in-memory rate limiter.
 * ponytail: per-process only — fine for single Node; use Redis on multi-instance Vercel at scale.
 */
export function rateLimit({ windowMs = 60_000, max = 30, keyFn } = {}) {
  const hits = new Map();

  return (req, res, next) => {
    const key = (keyFn ? keyFn(req) : null) || req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    let bucket = hits.get(key);
    if (!bucket || now > bucket.resetAt) {
      bucket = { count: 0, resetAt: now + windowMs };
      hits.set(key, bucket);
    }
    bucket.count += 1;
    res.setHeader('X-RateLimit-Limit', String(max));
    res.setHeader('X-RateLimit-Remaining', String(Math.max(0, max - bucket.count)));
    if (bucket.count > max) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    next();
  };
}
