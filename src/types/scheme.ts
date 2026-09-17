export interface UserProfile {
  age?: number;
  gender?: string;
  state?: string;
  district?: string;
  category?: string; // e.g. General, SC, ST, OBC
  income?: number;
  occupation?: string;
  education?: string;
  degree?: string;
  isDisabled?: boolean;
  isMinority?: boolean;
  isBPL?: boolean;
  isStudent?: boolean;
  isFarmer?: boolean;
  isEntrepreneur?: boolean;
  areaType?: string; // Rural, Urban
}

export type Operator = "=" | "!=" | ">" | ">=" | "<" | "<=" | "IN" | "NOT_IN" | "TRUE" | "FALSE";

export interface RuleCondition {
  field: keyof UserProfile;
  operator: Operator;
  value?: any;
}

export interface RuleGroup {
  operator: "AND" | "OR";
  conditions: (RuleCondition | RuleGroup)[];
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  category: string;
  eligibility: string[]; // Natural language descriptions
  eligibilityRules?: RuleGroup; // Structured evaluation rules
  eligibilityRulesVerified?: boolean; // True if structured rules fully cover eligibility
  benefits: string;
  requiredDocuments?: string[];
  applicationProcess?: string;
  applicationLink?: string;
  ministry: string;
  department?: string;
  level?: "Central" | "State";
  state?: string; // if state specific
  sourceName?: string;
  sourceUrl?: string;
  lastUpdated?: string;
  
  // Backwards compatibility for UI
  eligibilityScore?: number;
  matchReason?: string;
  matchStatus?: "eligible" | "needs_verification" | "not_eligible";
  unmetCriteria?: string[];
  missingFields?: string[];
}

export type MatchStatus = "eligible" | "needs_verification" | "not_eligible";
export type MatchConfidence = "verified" | "partial" | "unknown";

export interface MatchResult {
  scheme: Scheme;
  matchStatus: MatchStatus;
  matchReasons: string[];
  unmetCriteria: string[];
  missingFields: string[]; // User profile fields needed to verify eligibility
  confidence: MatchConfidence;
  
  // For backwards compatibility
  id: string;
}

export interface AIMatchResult {
  schemes: MatchResult[];
  summary: string;
}
