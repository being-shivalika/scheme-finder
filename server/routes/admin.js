import express from 'express';
import User from '../models/User.js';
import UserScheme from '../models/UserScheme.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { safeError } from '../utils/http.js';

const router = express.Router();

router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalChecks = await UserScheme.countDocuments();
    const totalSaved = await UserScheme.countDocuments({ status: 'saved' });
    const totalApplied = await UserScheme.countDocuments({ status: 'applied' });

    const topSchemesRaw = await UserScheme.aggregate([
      { $group: { _id: '$schemeId', count: { $sum: 1 }, data: { $first: '$schemeData' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const topSchemes = topSchemesRaw.map((s) => ({
      name: s.data ? s.data.name : s._id,
      count: s.count,
    }));

    res.json({ totalUsers, totalChecks, totalSaved, totalApplied, topSchemes });
  } catch (error) {
    return safeError(res, 500, 'Failed to load admin stats', error);
  }
});

export default router;
