import express from 'express';
import { getMySchemeData } from '../services/adapters/MySchemeAdapter.js';
import { getDataGovSupplementaryData } from '../services/adapters/DataGovAdapter.js';
import { evaluateRules } from '../services/matchingEngine.js';

const router = express.Router();

let cachedSchemes = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

async function getAllSchemes() {
  const now = Date.now();
  if (cachedSchemes && (now - lastCacheTime < CACHE_TTL_MS)) {
    return cachedSchemes;
  }

  try {
    const [mySchemeData, dataGovData] = await Promise.all([
      getMySchemeData(),
      getDataGovSupplementaryData()
    ]);
    
    // Normalize and combine
    const combined = [...mySchemeData, ...dataGovData];
    
    // De-duplicate by name if necessary
    const uniqueSchemesMap = new Map();
    combined.forEach(scheme => {
      const normalizedName = scheme.name.trim().toLowerCase();
      if (!uniqueSchemesMap.has(normalizedName)) {
        uniqueSchemesMap.set(normalizedName, scheme);
      }
    });

    cachedSchemes = Array.from(uniqueSchemesMap.values());
    lastCacheTime = now;
    return cachedSchemes;
  } catch (error) {
    console.error("Error fetching all schemes:", error);
    return cachedSchemes || []; // Graceful fallback to expired cache or empty array
  }
}

// GET /api/schemes
router.get('/', async (req, res) => {
  const schemes = await getAllSchemes();
  res.json(schemes);
});

// POST /api/schemes/match
router.post('/match', async (req, res) => {
  try {
    const profile = req.body;
    if (!profile) {
      return res.status(400).json({ error: "Profile is required for matching" });
    }

    const allSchemes = await getAllSchemes();
    const matchResults = allSchemes.map(scheme => evaluateRules(scheme, profile));
    
    // Sort logic: eligible first, needs_verification next, not_eligible last
    matchResults.sort((a, b) => {
      const statusRank = {
        "eligible": 1,
        "needs_verification": 2,
        "not_eligible": 3
      };
      
      const rankA = statusRank[a.matchStatus] || 4;
      const rankB = statusRank[b.matchStatus] || 4;
      
      return rankA - rankB;
    });

    res.json({
      schemes: matchResults,
      summary: `Found ${matchResults.filter(r => r.matchStatus !== 'not_eligible').length} potentially matching schemes.`
    });
  } catch (error) {
    console.error("Error in /match:", error);
    res.status(500).json({ error: "Failed to match schemes" });
  }
});

export default router;
