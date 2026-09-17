import fs from 'fs';
import path from 'path';
import { governmentSchemes as oldSchemes } from './oldSchemesData.js';

// A mock version of the seed data for the backend to use. 
// Ideally we would share this with the frontend, but Vite handles TS for frontend.
const seededSchemes = [
  {
    id: "pmay-urban",
    name: "Pradhan Mantri Awas Yojana (Urban)",
    description: "Housing scheme for the urban poor to help them build their own homes with financial assistance from the government.",
    category: "Housing",
    eligibility: [
      "Annual household income below ₹18 lakhs",
      "No pucca house in any family member's name",
      "First-time home buyers"
    ],
    eligibilityRules: {
      operator: "AND",
      conditions: [
        { field: "income", operator: "<=", value: 1800000 }
      ]
    },
    eligibilityRulesVerified: true,
    benefits: "Interest subsidy of up to ₹2.67 lakhs on home loans",
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Bank Account Details", "Property Documents"],
    applicationProcess: "Apply online at the official PMAY portal or through common service centres.",
    applicationLink: "https://pmaymis.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs",
    level: "Central",
    sourceName: "myScheme",
    sourceUrl: "https://www.myscheme.gov.in/schemes/pmay-u"
  },
  {
    id: "pmay-gramin",
    name: "Pradhan Mantri Awas Yojana (Gramin)",
    description: "Housing for all in rural areas by providing financial assistance to build pucca houses.",
    category: "Housing",
    eligibility: [
      "Houseless families or families in kutcha/dilapidated houses",
      "Listed in SECC 2011 data",
      "BPL families in rural areas"
    ],
    eligibilityRules: {
      operator: "AND",
      conditions: [
        { field: "isBPL", operator: "=", value: true }
      ]
    },
    eligibilityRulesVerified: false,
    benefits: "₹1.20 lakhs in plains and ₹1.30 lakhs in hilly areas for house construction",
    applicationLink: "https://pmayg.nic.in/",
    ministry: "Ministry of Rural Development",
    level: "Central",
    sourceName: "myScheme"
  },
  {
    id: "kisan-samman",
    name: "PM Kisan Samman Nidhi",
    description: "Income support to all landholding farmer families.",
    category: "Agriculture",
    eligibility: [
      "Must be a farmer",
      "Must hold cultivable land"
    ],
    eligibilityRules: {
      operator: "AND",
      conditions: [
        { field: "occupation", operator: "IN", value: ["farmer", "daily-wage"] }
      ]
    },
    eligibilityRulesVerified: true,
    benefits: "₹6,000 per year in three equal installments",
    applicationLink: "https://pmkisan.gov.in/",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    level: "Central",
    sourceName: "myScheme"
  },
  {
    id: "post-matric-sc",
    name: "Post Matric Scholarship for SC Students",
    description: "Financial assistance to SC students to pursue post-matriculation courses.",
    category: "Education",
    eligibility: [
      "Must belong to SC category",
      "Annual parental income should not exceed ₹2.5 Lakhs",
      "Must be studying at post-matriculation level"
    ],
    eligibilityRules: {
      operator: "AND",
      conditions: [
        { field: "category", operator: "IN", value: ["sc", "SC"] },
        { field: "income", operator: "<=", value: 250000 },
        { field: "occupation", operator: "IN", value: ["student"] }
      ]
    },
    eligibilityRulesVerified: true,
    benefits: "Covers tuition fees, maintenance allowance, and other educational expenses",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment",
    level: "Central",
    sourceName: "myScheme"
  }
];

// Combine seeded with old schemes, avoiding duplicates by ID
const seededIds = seededSchemes.map(s => s.id);
const mappedOldSchemes = oldSchemes
  .filter(s => !seededIds.includes(s.id))
  .map(s => ({
    ...s,
    eligibilityRulesVerified: false, // Old schemes don't have structured rules yet
    sourceName: 'myScheme',
    level: 'Central'
  }));

const allMySchemeData = [...seededSchemes, ...mappedOldSchemes];

export async function getMySchemeData() {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allMySchemeData);
    }, 100);
  });
}
