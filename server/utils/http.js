import { COOKIE_NAME } from '../config.js';

export function parseCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(val);
  }
  return out;
}

export function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return parseCookies(req)[COOKIE_NAME] || null;
}

export function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${Math.floor(7 * 24 * 60 * 60)}`,
  ];
  if (isProd) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function clearAuthCookie(res) {
  const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
  const parts = [`${COOKIE_NAME}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'];
  if (isProd) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function safeError(res, status, publicMessage, err) {
  if (err) console.error(publicMessage, err.message || err);
  return res.status(status).json({ error: publicMessage });
}
