export async function getDataGovSupplementaryData() {
  try {
    const apiKey = process.env.DATA_GOV_API_KEY;
    const resourceId = process.env.DATA_GOV_RESOURCE_ID;
    
    if (!apiKey || !resourceId) {
      return [];
    }

    const apiUrl = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=50`;
    
    // Add simple abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn(`Data.gov API returned status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    if (data && data.records) {
      // Best-effort mapping for generic datasets (treating them as supplementary)
      return data.records.map((record, index) => {
        const name = record.scheme_name || record.scheme || record.title || record.name || `Supplementary Gov Data ${index + 1}`;
        const description = record.description || record.details || record.objective || `Supplementary info for ${name} from data.gov.in`;
        const ministry = record.ministry || record.department || record.sector || record.ministry_name || "Government of India";
        
        return {
          id: `datagov-${record.id || index}`,
          name: name,
          description: description,
          category: record.category || record.sector || "General Supplementary",
          eligibility: [record.eligibility || "Supplementary data without strict eligibility rules"],
          eligibilityRulesVerified: false,
          benefits: record.benefits || record.benefit || "Supplementary benefits",
          applicationLink: record.url || record.link || "https://data.gov.in/",
          ministry: ministry,
          sourceName: "data.gov.in (Supplementary)",
          sourceUrl: `https://data.gov.in/resource/${resourceId}`,
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching supplementary Data.gov.in data:", error.message);
    return []; // Graceful fallback
  }
}
