
import express from 'express';
import Profile from '../models/Profile.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { ...req.body, userId: req.user.id },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
