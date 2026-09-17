import { getMySchemeData } from './adapters/MySchemeAdapter.js';
import { getDataGovSupplementaryData } from './adapters/DataGovAdapter.js';

let cachedSchemes = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 1000 * 60 * 5;

export async function getAllSchemes() {
  const now = Date.now();
  if (cachedSchemes && now - lastCacheTime < CACHE_TTL_MS) {
    return cachedSchemes;
  }

  try {
    const [mySchemeData, dataGovData] = await Promise.all([
      getMySchemeData(),
      getDataGovSupplementaryData(),
    ]);

    const combined = [...mySchemeData, ...dataGovData];
    const uniqueSchemesMap = new Map();
    combined.forEach((scheme) => {
      const normalizedName = scheme.name.trim().toLowerCase();
      if (!uniqueSchemesMap.has(normalizedName)) {
        uniqueSchemesMap.set(normalizedName, scheme);
      }
    });

    cachedSchemes = Array.from(uniqueSchemesMap.values());
    lastCacheTime = now;
    return cachedSchemes;
  } catch (error) {
    console.error('Error fetching all schemes:', error);
    return cachedSchemes || [];
  }
}

export function schemeCatalogSummary(schemes, max = 40) {
  return schemes
    .slice(0, max)
    .map((s) => `- ${s.name} (${s.category || 'General'}): ${(s.description || '').slice(0, 120)}`)
    .join('\n');
}
