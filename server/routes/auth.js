import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { loginBodySchema, signupBodySchema, validateBody } from '../schemas.js';
import { getJwtSecret, JWT_EXPIRES } from '../config.js';
import { setAuthCookie, clearAuthCookie, safeError } from '../utils/http.js';

const router = express.Router();
const authLimiter = rateLimit({ windowMs: 15 * 60_000, max: 20 });

function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    getJwtSecret(),
    { expiresIn: JWT_EXPIRES }
  );
}

router.post('/signup', authLimiter, validateBody(signupBodySchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = signToken(user);
    setAuthCookie(res, token);
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    return safeError(res, 500, 'Signup failed', error);
  }
});

router.post('/login', authLimiter, validateBody(loginBodySchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    return safeError(res, 500, 'Login failed', error);
  }
});

router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ success: true });
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    return safeError(res, 500, 'Failed to load user', error);
  }
});

export default router;
