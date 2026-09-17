import express from 'express';
import UserScheme from '../models/UserScheme.js';
import Profile from '../models/Profile.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getAllSchemes } from '../services/schemeCatalog.js';
import { evaluateRules } from '../services/matchingEngine.js';
import { statusBodySchema, validateBody } from '../schemas.js';
import { safeError } from '../utils/http.js';

const router = express.Router();

function profileToMatchInput(profileDoc) {
  const p = profileDoc.toObject ? profileDoc.toObject() : profileDoc;
  const { userId, _id, __v, ...rest } = p;
  if (rest.income !== undefined && rest.income !== null && rest.income !== '') {
    const n = Number(rest.income);
    if (!Number.isNaN(n)) rest.income = n;
  }
  return rest;
}

/** Server recomputes matches from stored profile — client cannot forge scores. */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(400).json({ error: 'Save a profile before matching schemes' });
    }

    const allSchemes = await getAllSchemes();
    const matchInput = profileToMatchInput(profile);
    const results = allSchemes.map((scheme) => evaluateRules(scheme, matchInput));

    // Recommend only rule-verified eligible schemes (not the entire unverified catalog)
    const eligible = results.filter((r) => r.matchStatus === 'eligible');

    const operations = eligible.map((m) => ({
      updateOne: {
        filter: { userId: req.user.id, schemeId: m.scheme.id },
        update: {
          $set: {
            userId: req.user.id,
            schemeId: m.scheme.id,
            eligibilityScore: 100,
            matchReason: (m.matchReasons || []).join('. '),
            status: 'matched',
            schemeData: {
              ...m.scheme,
              matchStatus: m.matchStatus,
              matchReason: (m.matchReasons || []).join('. '),
              unmetCriteria: m.unmetCriteria,
              missingFields: m.missingFields,
              eligibilityScore: 100,
            },
          },
        },
        upsert: true,
      },
    }));

    // Drop stale matched rows that are no longer eligible (keep saved/applied)
    const eligibleIds = new Set(eligible.map((m) => m.scheme.id));
    await UserScheme.deleteMany({
      userId: req.user.id,
      status: 'matched',
      schemeId: { $nin: [...eligibleIds] },
    });

    if (operations.length > 0) await UserScheme.bulkWrite(operations);

    res.json({
      success: true,
      matchedCount: eligible.length,
      schemes: eligible.map((m) => ({
        schemeId: m.scheme.id,
        matchStatus: m.matchStatus,
        matchReasons: m.matchReasons,
      })),
    });
  } catch (error) {
    return safeError(res, 500, 'Failed to save matched schemes', error);
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const schemes = await UserScheme.find({ userId: req.user.id });
    res.json(schemes);
  } catch (error) {
    return safeError(res, 500, 'Failed to load schemes', error);
  }
});

router.put('/:schemeId', authenticateToken, validateBody(statusBodySchema), async (req, res) => {
  try {
    const { status } = req.body;
    const schemeId = decodeURIComponent(req.params.schemeId || '').trim();
    if (!schemeId) return res.status(400).json({ error: 'Missing scheme id' });

    const userId = req.user.id;

    let scheme = await UserScheme.findOneAndUpdate(
      { userId, schemeId },
      { $set: { status } },
      { new: true, runValidators: true }
    );
    if (scheme) return res.json(scheme);

    const allSchemes = await getAllSchemes();
    const catalogScheme = allSchemes.find((s) => String(s?.id) === schemeId);
    if (!catalogScheme) {
      return res.status(404).json({ error: 'Scheme not found', schemeId });
    }

    try {
      scheme = await UserScheme.create({
        userId,
        schemeId,
        status,
        schemeData: catalogScheme,
      });
    } catch (err) {
      if (err?.code === 11000) {
        scheme = await UserScheme.findOneAndUpdate(
          { userId, schemeId },
          { $set: { status, schemeData: catalogScheme } },
          { new: true, runValidators: true }
        );
      } else {
        throw err;
      }
    }

    return res.json(scheme);
  } catch (error) {
    return safeError(res, 500, 'Failed to update status', error);
  }
});

export default router;
