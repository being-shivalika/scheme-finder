import { Scheme } from "@/types/scheme";

export const governmentSchemes: Scheme[] = [
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana (PMAY)",
    description: "Housing scheme for the urban and rural poor to help them build their own homes with financial assistance from the government.",
    category: "Housing",
    eligibility: [
      "Annual household income below ₹18 lakhs",
      "No pucca house in any family member's name",
      "First-time home buyers"
    ],
    benefits: "Interest subsidy of up to ₹2.67 lakhs on home loans",
    applicationLink: "https://pmaymis.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
  },
  {
    id: "pmjdy",
    name: "Pradhan Mantri Jan Dhan Yojana",
    description: "Financial inclusion program ensuring access to financial services like banking, remittance, and insurance.",
    category: "Financial Inclusion",
    eligibility: [
      "Any Indian citizen above 10 years of age",
      "No existing bank account"
    ],
    benefits: "Zero balance bank account, RuPay debit card, ₹2 lakh accident insurance, ₹30,000 life cover",
    applicationLink: "https://www.pmjdy.gov.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "pmkisan",
    name: "PM-KISAN Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to farmer families across India.",
    category: "Agriculture",
    eligibility: [
      "Small and marginal farmer families",
      "Cultivable land holding",
      "Not employed in government service"
    ],
    benefits: "₹6,000 per year in three equal installments of ₹2,000 each",
    applicationLink: "https://pmkisan.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat - PMJAY",
    description: "World's largest health insurance scheme providing coverage of ₹5 lakhs per family for secondary and tertiary hospitalization.",
    category: "Healthcare",
    eligibility: [
      "Families identified in SECC 2011 data",
      "Below Poverty Line (BPL) families",
      "Deprived rural and urban households"
    ],
    benefits: "Health coverage of ₹5 lakhs per family per year for hospitalization",
    applicationLink: "https://pmjay.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    description: "Loans for non-corporate, non-farm small/micro enterprises up to ₹10 lakhs.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Non-farm income generating activities",
      "Small business owners, vendors, artisans",
      "Manufacturing, trading, and service sector entities"
    ],
    benefits: "Loans up to ₹10 lakhs: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakhs), Tarun (₹5 lakhs to ₹10 lakhs)",
    applicationLink: "https://www.mudra.org.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "sukanya",
    name: "Sukanya Samriddhi Yojana",
    description: "Small savings scheme for the girl child with high interest rates and tax benefits.",
    category: "Women & Child Welfare",
    eligibility: [
      "Girl child below 10 years of age",
      "Only 2 accounts per family allowed",
      "Indian resident"
    ],
    benefits: "Interest rate of 8.2% (2024), tax-free returns, maturity after 21 years",
    applicationLink: "https://www.india.gov.in/sukanya-samriddhi-yojna",
    ministry: "Ministry of Finance"
  },
  {
    id: "pmsby",
    name: "Pradhan Mantri Suraksha Bima Yojana",
    description: "Accident insurance scheme offering coverage for death or disability due to accident.",
    category: "Insurance",
    eligibility: [
      "Age between 18-70 years",
      "Bank account with Aadhaar linked",
      "One account per person"
    ],
    benefits: "₹2 lakhs for accidental death, ₹1 lakh for partial disability at just ₹20/year premium",
    applicationLink: "https://www.jansuraksha.gov.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "pmjjby",
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
    description: "Life insurance scheme providing coverage for death due to any reason.",
    category: "Insurance",
    eligibility: [
      "Age between 18-50 years",
      "Bank account linked with Aadhaar",
      "Renewed annually"
    ],
    benefits: "₹2 lakhs life cover at just ₹436/year premium",
    applicationLink: "https://www.jansuraksha.gov.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "scholarship",
    name: "National Scholarship Portal Schemes",
    description: "Various scholarships for students from different communities and economic backgrounds.",
    category: "Education",
    eligibility: [
      "Students from SC/ST/OBC/Minority communities",
      "Family income criteria varies by scheme",
      "Regular students in recognized institutions"
    ],
    benefits: "Scholarships ranging from ₹1,000 to ₹50,000 per year based on course and category",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Education"
  },
  {
    id: "ujjwala",
    name: "Pradhan Mantri Ujjwala Yojana",
    description: "Scheme to provide LPG connections to women from BPL households.",
    category: "Energy & Welfare",
    eligibility: [
      "Women from BPL households",
      "No existing LPG connection in the household",
      "Age above 18 years"
    ],
    benefits: "Free LPG connection, first refill and stove provided free or on EMI",
    applicationLink: "https://www.pmuy.gov.in/",
    ministry: "Ministry of Petroleum and Natural Gas"
  },
  {
    id: "standup",
    name: "Stand Up India Scheme",
    description: "Loans between ₹10 lakhs to ₹1 crore for SC/ST and women entrepreneurs.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "SC/ST or Women entrepreneurs",
      "Above 18 years of age",
      "Setting up greenfield enterprise in manufacturing, trading, or services"
    ],
    benefits: "Loans from ₹10 lakhs to ₹1 crore with composite loan for working capital and term loan",
    applicationLink: "https://www.standupmitra.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "naps",
    name: "National Apprenticeship Promotion Scheme",
    description: "Skill development scheme promoting apprenticeship training in industries.",
    category: "Employment & Skills",
    eligibility: [
      "Youth between 14-21 years (up to 25 for graduates)",
      "Passed minimum Class 5",
      "Not employed elsewhere"
    ],
    benefits: "Stipend support of ₹1,500/month from government, industry exposure, certification",
    applicationLink: "https://apprenticeshipindia.gov.in/",
    ministry: "Ministry of Skill Development"
  },
  {
    id: "apy",
    name: "Atal Pension Yojana",
    description: "Pension scheme for unorganized sector workers guaranteeing minimum pension.",
    category: "Pension & Retirement",
    eligibility: [
      "Age between 18-40 years",
      "Bank account with Aadhaar linked",
      "Not income tax payer"
    ],
    benefits: "Guaranteed pension of ₹1,000 to ₹5,000 per month after age 60",
    applicationLink: "https://www.npscra.nsdl.co.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "disability",
    name: "ADIP Scheme (Assistance for Disabled Persons)",
    description: "Assistance for purchase/fitting of aids and appliances for persons with disabilities.",
    category: "Disability Welfare",
    eligibility: [
      "Person with 40% or more disability",
      "Monthly income not exceeding ₹20,000",
      "Indian citizen"
    ],
    benefits: "Free aids and appliances like hearing aids, wheelchairs, prosthetics, crutches",
    applicationLink: "https://www.disabilityaffairs.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme",
    description: "Credit-linked subsidy scheme for setting up new micro-enterprises.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Above 18 years of age",
      "At least 8th pass for projects above ₹10 lakhs in manufacturing",
      "No existing beneficiary of any government subsidy scheme"
    ],
    benefits: "Subsidy of 15-35% of project cost, maximum project cost ₹50 lakhs for manufacturing",
    applicationLink: "https://www.kviconline.gov.in/pmegp/",
    ministry: "Ministry of MSME"
  }
];

export const schemeCategories = [
  "All Categories",
  "Housing",
  "Healthcare",
  "Education",
  "Agriculture",
  "Business & Entrepreneurship",
  "Financial Inclusion",
  "Insurance",
  "Women & Child Welfare",
  "Energy & Welfare",
  "Employment & Skills",
  "Pension & Retirement",
  "Disability Welfare"
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
  "Andaman & Nicobar", "Chandigarh", "Dadra & Nagar Haveli", "Lakshadweep"
];
