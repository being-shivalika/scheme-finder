import express from 'express';
import Profile from '../models/Profile.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { profileBodySchema, validateBody } from '../schemas.js';
import { safeError } from '../utils/http.js';

const router = express.Router();

router.post('/', authenticateToken, validateBody(profileBodySchema), async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { ...req.body, userId: req.user.id },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) {
    return safeError(res, 500, 'Failed to save profile', error);
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    res.json(profile);
  } catch (error) {
    return safeError(res, 500, 'Failed to load profile', error);
  }
});

export default router;
