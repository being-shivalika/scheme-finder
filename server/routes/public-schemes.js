import express from 'express';
import { getAllSchemes } from '../services/schemeCatalog.js';
import { evaluateRules } from '../services/matchingEngine.js';
import { matchProfileSchema, validateBody } from '../schemas.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = express.Router();
const matchLimiter = rateLimit({ windowMs: 60_000, max: 30 });

router.get('/', async (req, res) => {
  const schemes = await getAllSchemes();
  res.json(schemes);
});

router.post('/match', matchLimiter, validateBody(matchProfileSchema), async (req, res) => {
  try {
    const profile = req.body;
    const allSchemes = await getAllSchemes();
    const matchResults = allSchemes.map((scheme) => evaluateRules(scheme, profile));

    matchResults.sort((a, b) => {
      const statusRank = { eligible: 1, needs_verification: 2, not_eligible: 3 };
      return (statusRank[a.matchStatus] || 4) - (statusRank[b.matchStatus] || 4);
    });

    const eligibleCount = matchResults.filter((r) => r.matchStatus === 'eligible').length;
    const needsInfoCount = matchResults.filter(
      (r) => r.matchStatus === 'needs_verification' && r.scheme?.eligibilityRules
    ).length;

    res.json({
      schemes: matchResults,
      summary: `Found ${eligibleCount} eligible scheme(s)` +
        (needsInfoCount ? ` and ${needsInfoCount} that need more profile details.` : '.'),
      counts: {
        eligible: eligibleCount,
        needs_verification: needsInfoCount,
        not_eligible: matchResults.filter((r) => r.matchStatus === 'not_eligible').length,
      },
    });
  } catch (error) {
    console.error('Error in /match:', error);
    res.status(500).json({ error: 'Failed to match schemes' });
  }
});

export default router;
