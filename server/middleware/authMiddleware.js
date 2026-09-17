import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getJwtSecret } from '../config.js';
import { getTokenFromRequest } from '../utils/http.js';

export const authenticateToken = (req, res, next) => {
  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  let secret;
  try {
    secret = getJwtSecret();
  } catch (e) {
    return res.status(500).json({ error: 'Server auth configuration error' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

/** Load role from DB so demotions take effect immediately (JWT claim alone is not enough). */
export const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('role');
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    req.user.role = user.role;
    next();
  } catch (error) {
    console.error('requireAdmin error:', error.message);
    return res.status(500).json({ error: 'Failed to verify admin access' });
  }
};
