export function evaluateRules(scheme, profile) {
  if (!scheme.eligibilityRules) {
    return {
      scheme,
      matchStatus: "needs_verification",
      matchReasons: ["Scheme has no structured rules. Please check official guidelines."],
      unmetCriteria: [],
      missingFields: [],
      confidence: "unknown",
      id: scheme.id
    };
  }

  const missingFields = new Set();
  const matchReasons = [];
  const unmetCriteria = [];

  function evaluateCondition(condition) {
    // If it's a RuleGroup
    if (condition.operator === "AND" || condition.operator === "OR") {
      let isMet = condition.operator === "AND" ? true : false;
      const groupReasons = [];
      const groupUnmet = [];
      
      for (const sub of condition.conditions) {
        const subResult = evaluateCondition(sub);
        if (condition.operator === "AND") {
          isMet = isMet && subResult.isMet;
        } else {
          isMet = isMet || subResult.isMet;
        }
        
        if (subResult.isMet) groupReasons.push(...subResult.reasons);
        else groupUnmet.push(...subResult.unmet);
      }
      
      if (isMet) matchReasons.push(...groupReasons);
      else unmetCriteria.push(...groupUnmet);
      
      return { isMet, reasons: groupReasons, unmet: groupUnmet };
    }

    // It's a RuleCondition
    const { field, operator, value } = condition;
    const profileValue = profile[field];

    if (profileValue === undefined || profileValue === null || profileValue === "") {
      missingFields.add(field);
      unmetCriteria.push(`Missing information: ${field}`);
      return { isMet: false, reasons: [], unmet: [`Missing information: ${field}`] };
    }

    let isMet = false;
    let reasonText = "";
    let unmetText = "";

    switch (operator) {
      case "=":
        if (typeof value === 'number' || typeof profileValue === 'number') {
          isMet = Number(profileValue) === Number(value);
        } else if (typeof value === 'boolean' || typeof profileValue === 'boolean') {
          isMet = profileValue === value;
        } else {
          isMet = String(profileValue).toLowerCase() === String(value).toLowerCase();
        }
        reasonText = `${field} is equal to ${value}`;
        unmetText = `${field} must be equal to ${value}`;
        break;
      case "!=":
        if (typeof value === 'number' || typeof profileValue === 'number') {
          isMet = Number(profileValue) !== Number(value);
        } else if (typeof value === 'boolean' || typeof profileValue === 'boolean') {
          isMet = profileValue !== value;
        } else {
          isMet = String(profileValue).toLowerCase() !== String(value).toLowerCase();
        }
        reasonText = `${field} is not equal to ${value}`;
        unmetText = `${field} must not be equal to ${value}`;
        break;
      case ">":
        isMet = Number(profileValue) > Number(value);
        reasonText = `${field} is greater than ${value}`;
        unmetText = `${field} must be greater than ${value}`;
        break;
      case ">=":
        isMet = Number(profileValue) >= Number(value);
        reasonText = `${field} is at least ${value}`;
        unmetText = `${field} must be at least ${value}`;
        break;
      case "<":
        isMet = Number(profileValue) < Number(value);
        reasonText = `${field} is less than ${value}`;
        unmetText = `${field} must be less than ${value}`;
        break;
      case "<=":
        isMet = Number(profileValue) <= Number(value);
        reasonText = `${field} is at most ${value}`;
        unmetText = `${field} must be at most ${value}`;
        break;
      case "IN":
        isMet = Array.isArray(value) && value.some(
          (v) => String(v).toLowerCase() === String(profileValue).toLowerCase()
        );
        reasonText = `${field} matches required criteria`;
        unmetText = `${field} must be one of: ${value.join(", ")}`;
        break;
      case "NOT_IN":
        isMet = Array.isArray(value) && !value.some(
          (v) => String(v).toLowerCase() === String(profileValue).toLowerCase()
        );
        reasonText = `${field} is not restricted`;
        unmetText = `${field} cannot be one of: ${value.join(", ")}`;
        break;
      case "TRUE":
        isMet = profileValue === true;
        reasonText = `${field} requirement satisfied`;
        unmetText = `${field} must be true`;
        break;
      case "FALSE":
        isMet = profileValue === false;
        reasonText = `${field} requirement satisfied`;
        unmetText = `${field} must be false`;
        break;
      default:
        break;
    }

    if (isMet) matchReasons.push(reasonText);
    else unmetCriteria.push(unmetText);

    return { isMet, reasons: [reasonText], unmet: [unmetText] };
  }

  const result = evaluateCondition(scheme.eligibilityRules);

  let matchStatus = "not_eligible";
  let confidence = scheme.eligibilityRulesVerified ? "verified" : "partial";

  if (result.isMet) {
    if (scheme.eligibilityRulesVerified) {
      matchStatus = "eligible";
    } else {
      matchStatus = "needs_verification";
      matchReasons.push("Matches based on partial rules. Verify official guidelines.");
    }
  } else if (missingFields.size > 0) {
    const hasHardUnmet = unmetCriteria.some(
      (u) => !String(u).startsWith("Missing information:")
    );
    // Hard rule failures win over missing fields (e.g. income too high + missing state)
    matchStatus = hasHardUnmet ? "not_eligible" : "needs_verification";
    confidence = "partial";
  } else {
    matchStatus = "not_eligible";
  }

  return {
    scheme,
    matchStatus,
    matchReasons: [...new Set(matchReasons)],
    unmetCriteria: [...new Set(unmetCriteria)],
    missingFields: Array.from(missingFields),
    confidence,
    id: scheme.id
  };
}
