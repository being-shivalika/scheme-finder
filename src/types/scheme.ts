export interface UserProfile {
  age: number;
  gender: string;
  state: string;
  category: string;
  income: number;
  occupation: string;
  education: string;
  isDisabled: boolean;
  isMinority: boolean;
  isBPL: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  category: string;
  eligibility: string[];
  benefits: string;
  applicationLink?: string;
  ministry: string;
  eligibilityScore?: number;
  matchReason?: string;
}

export interface AIMatchResult {
  schemes: Scheme[];
  summary: string;
}
