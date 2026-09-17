import dotenv from 'dotenv';
dotenv.config();

const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (isProd) {
      throw new Error('JWT_SECRET environment variable is required in production');
    }
    console.warn('WARNING: JWT_SECRET is not set. Using ephemeral secret for local dev only.');
    if (!global.__devJwtSecret) {
      global.__devJwtSecret = `dev_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    }
    return global.__devJwtSecret;
  }
  if (secret === 'fallback_secret_for_development') {
    throw new Error('JWT_SECRET must not use the insecure default value');
  }
  return secret;
}

export function getAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '';
  const list = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (process.env.VERCEL_URL) {
    list.push(`https://${process.env.VERCEL_URL}`);
  }
  if (list.length > 0) return [...new Set(list)];
  if (!isProd) return ['http://localhost:5173', 'http://localhost:8080', 'http://127.0.0.1:5173'];
  return [];
}

export const COOKIE_NAME = 'scheme_setu_token';
export const JWT_EXPIRES = '7d';
export const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
export const MAX_JSON_BODY = '256kb';
export const MAX_CHAT_MESSAGE_LENGTH = 2000;
