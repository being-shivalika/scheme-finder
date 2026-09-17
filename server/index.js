
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profiles.js';
import schemeRoutes from './routes/schemes.js';
import adminRoutes from './routes/admin.js';
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes that don't need DB
import publicSchemesRoutes from './routes/public-schemes.js';
import chatRoutes from './routes/chat.js';
app.use('/api/schemes', publicSchemesRoutes);
app.use('/api/chat', chatRoutes);

app.get('/api/health', (req, res) => {
  const state = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({ 
    status: 'ok', 
    dbState: states[state] || state,
    message: state === 1 ? 'Successfully connected to MongoDB' : 'Database connection issues'
  });
});

// Ensure DB is connected before every other request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes that need DB
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/user-schemes', schemeRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
