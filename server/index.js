import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './db.js';
import { getAllowedOrigins, MAX_JSON_BODY, getJwtSecret } from './config.js';
import { rateLimit } from './middleware/rateLimit.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profiles.js';
import schemeRoutes from './routes/schemes.js';
import adminRoutes from './routes/admin.js';
import publicSchemesRoutes from './routes/public-schemes.js';
import chatRoutes from './routes/chat.js';

// Fail fast if production auth is misconfigured
try {
  getJwtSecret();
} catch (e) {
  console.error(e.message);
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    throw e;
  }
}

const app = express();

const allowedOrigins = getAllowedOrigins();
app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin / non-browser (no Origin header)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) {
        return callback(new Error('CORS not configured: set ALLOWED_ORIGINS'));
      }
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: MAX_JSON_BODY }));

app.use('/api/schemes', rateLimit({ windowMs: 60_000, max: 60 }), publicSchemesRoutes);
app.use('/api/chat', chatRoutes);

app.get('/api/health', (req, res) => {
  const state = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    status: 'ok',
    dbState: states[state] || state,
  });
});

app.use(async (req, res, next) => {
  const conn = await connectDB();
  if (!conn && !req.path.startsWith('/api/schemes') && !req.path.startsWith('/api/chat') && req.path !== '/api/health') {
    // Auth/profile routes need DB; return clear error instead of cryptic mongoose failures
    if (['/api/auth', '/api/profiles', '/api/user-schemes', '/api/admin'].some((p) => req.path.startsWith(p))) {
      return res.status(503).json({ error: 'Database unavailable' });
    }
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/user-schemes', schemeRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
