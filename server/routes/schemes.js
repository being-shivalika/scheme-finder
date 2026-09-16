
import express from 'express';
import UserScheme from '../models/UserScheme.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { schemes } = req.body;
    const operations = schemes.map(scheme => ({
      updateOne: {
        filter: { userId: req.user.id, schemeId: scheme.schemeId },
        update: { $set: { ...scheme, userId: req.user.id } },
        upsert: true
      }
    }));
    if (operations.length > 0) await UserScheme.bulkWrite(operations);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const schemes = await UserScheme.find({ userId: req.user.id });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:schemeId', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const scheme = await UserScheme.findOneAndUpdate(
      { userId: req.user.id, schemeId: req.params.schemeId },
      { status },
      { new: true }
    );
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
