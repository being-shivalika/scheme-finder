import { Scheme } from "@/types/scheme";

export const governmentSchemes: Scheme[] = [
  // =============== HOUSING SCHEMES ===============
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
    benefits: "Interest subsidy of up to ₹2.67 lakhs on home loans",
    applicationLink: "https://pmaymis.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
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
    benefits: "₹1.20 lakhs in plains and ₹1.30 lakhs in hilly areas for house construction",
    applicationLink: "https://pmayg.nic.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "ddugsy",
    name: "Deen Dayal Upadhyaya Grameen Awas Yojana",
    description: "Rural housing scheme to provide affordable housing to poor in villages.",
    category: "Housing",
    eligibility: [
      "Rural BPL families",
      "No existing pucca house",
      "Priority to SC/ST families"
    ],
    benefits: "Financial assistance for construction of new house",
    applicationLink: "https://pmayg.nic.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "rental-housing",
    name: "Affordable Rental Housing Complex Scheme",
    description: "Providing rental housing to urban migrants and poor in industrial areas.",
    category: "Housing",
    eligibility: [
      "Urban migrants and poor",
      "Working in industrial areas",
      "No own house in the city"
    ],
    benefits: "Affordable rental housing near workplaces",
    applicationLink: "https://pmaymis.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
  },
  {
    id: "slum-rehabilitation",
    name: "In-situ Slum Rehabilitation Scheme",
    description: "Rehabilitation of slum dwellers with participation of private developers using land as a resource.",
    category: "Housing",
    eligibility: [
      "Slum dwellers in notified slum areas",
      "Listed in slum survey",
      "Residing for minimum period"
    ],
    benefits: "Free housing in rehabilitated buildings",
    applicationLink: "https://pmaymis.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
  },
  {
    id: "credit-linked-subsidy",
    name: "Credit Linked Subsidy Scheme (CLSS)",
    description: "Interest subsidy on housing loans for EWS, LIG, MIG categories.",
    category: "Housing",
    eligibility: [
      "EWS: Income up to ₹3 lakhs",
      "LIG: Income ₹3-6 lakhs",
      "MIG-I: Income ₹6-12 lakhs",
      "MIG-II: Income ₹12-18 lakhs"
    ],
    benefits: "Interest subsidy of 3% to 6.5% on home loans",
    applicationLink: "https://pmaymis.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
  },
  {
    id: "jnnurm-housing",
    name: "JNNURM Basic Services for Urban Poor",
    description: "Integrated housing and slum development programme for urban poor.",
    category: "Housing",
    eligibility: [
      "Urban poor in selected cities",
      "EWS and LIG categories",
      "Slum dwellers"
    ],
    benefits: "Affordable housing and basic civic amenities",
    applicationLink: "https://mohua.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
  },
  {
    id: "ray-housing",
    name: "Rajiv Awas Yojana",
    description: "Slum-free India initiative providing housing to slum dwellers.",
    category: "Housing",
    eligibility: [
      "Slum dwellers in participating states",
      "BPL families",
      "No existing pucca house"
    ],
    benefits: "Housing units with basic amenities",
    applicationLink: "https://mohua.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
  },

  // =============== HEALTHCARE SCHEMES ===============
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
    id: "health-wellness-centers",
    name: "Ayushman Bharat Health & Wellness Centers",
    description: "Comprehensive primary healthcare services including maternal and child health, non-communicable diseases, free essential drugs.",
    category: "Healthcare",
    eligibility: [
      "All Indian citizens",
      "No income criteria",
      "Available at nearest wellness center"
    ],
    benefits: "Free primary healthcare services, essential medicines, diagnostics",
    applicationLink: "https://ab-hwc.nhp.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "janani-suraksha",
    name: "Janani Suraksha Yojana",
    description: "Safe motherhood intervention promoting institutional delivery among poor pregnant women.",
    category: "Healthcare",
    eligibility: [
      "Pregnant women from BPL families",
      "Women opting for institutional delivery",
      "All pregnant women in LPS states"
    ],
    benefits: "Cash assistance of ₹700-₹1,400 for rural and ₹600-₹1,000 for urban deliveries",
    applicationLink: "https://nhm.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "jssk",
    name: "Janani Shishu Suraksha Karyakram",
    description: "Free and cashless services to pregnant women and sick newborns in public health institutions.",
    category: "Healthcare",
    eligibility: [
      "All pregnant women delivering in public institutions",
      "Sick newborns up to 30 days after birth",
      "No income criteria"
    ],
    benefits: "Free delivery, C-section, drugs, diagnostics, diet, transport",
    applicationLink: "https://nhm.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "rashtriya-bal-swasthya",
    name: "Rashtriya Bal Swasthya Karyakram",
    description: "Child health screening and early intervention services for children 0-18 years.",
    category: "Healthcare",
    eligibility: [
      "Children 0-18 years",
      "Students in government and aided schools",
      "Children in AWCs and ASHAs areas"
    ],
    benefits: "Free health screening, treatment for defects, diseases, deficiencies, disabilities",
    applicationLink: "https://nhm.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "mission-indradhanush",
    name: "Mission Indradhanush",
    description: "Accelerated immunization coverage for children and pregnant women against 12 vaccine-preventable diseases.",
    category: "Healthcare",
    eligibility: [
      "Children up to 2 years of age",
      "Pregnant women",
      "Available across India"
    ],
    benefits: "Free vaccination against 12 diseases including TB, Hepatitis B, Polio, etc.",
    applicationLink: "https://nhm.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "nikshay-poshan",
    name: "Nikshay Poshan Yojana",
    description: "Direct benefit transfer for nutritional support to TB patients during treatment.",
    category: "Healthcare",
    eligibility: [
      "All TB patients notified on NIKSHAY portal",
      "On treatment for TB",
      "Indian citizens"
    ],
    benefits: "₹500 per month during entire treatment period",
    applicationLink: "https://nikshay.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "ayush-wellness",
    name: "National AYUSH Mission",
    description: "Promotion of AYUSH healthcare including Ayurveda, Yoga, Naturopathy, Unani, Siddha, Homeopathy.",
    category: "Healthcare",
    eligibility: [
      "All Indian citizens",
      "No income criteria",
      "Available at AYUSH centers"
    ],
    benefits: "Free AYUSH treatments, wellness programs, yoga training",
    applicationLink: "https://ayush.gov.in/",
    ministry: "Ministry of AYUSH"
  },
  {
    id: "cghs",
    name: "Central Government Health Scheme",
    description: "Comprehensive health care for central government employees and pensioners.",
    category: "Healthcare",
    eligibility: [
      "Central government employees",
      "Central government pensioners",
      "Dependent family members"
    ],
    benefits: "OPD, IPD treatment, medicines, specialist consultations in empanelled hospitals",
    applicationLink: "https://cghs.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "mental-health",
    name: "National Mental Health Programme",
    description: "Accessible and affordable mental health services at all levels of healthcare.",
    category: "Healthcare",
    eligibility: [
      "All citizens requiring mental health services",
      "No income criteria",
      "Available at district mental health units"
    ],
    benefits: "Free mental health services, counseling, medication at government facilities",
    applicationLink: "https://nhm.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "pradhan-mantri-dialysis",
    name: "Pradhan Mantri National Dialysis Programme",
    description: "Free dialysis services at district hospitals for poor patients with kidney failure.",
    category: "Healthcare",
    eligibility: [
      "Patients requiring dialysis",
      "BPL families",
      "Available at empanelled centers"
    ],
    benefits: "Free dialysis services at government and PPP mode centers",
    applicationLink: "https://nhm.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "free-medicine",
    name: "Pradhan Mantri Bhartiya Janaushadhi Pariyojana",
    description: "Quality generic medicines at affordable prices through Janaushadhi Kendras.",
    category: "Healthcare",
    eligibility: [
      "All citizens",
      "No prescription required for OTC medicines",
      "Available at 10,000+ Janaushadhi Kendras"
    ],
    benefits: "Medicines at 50-90% cheaper than branded alternatives",
    applicationLink: "https://janaushadhi.gov.in/",
    ministry: "Ministry of Chemicals and Fertilizers"
  },
  {
    id: "rashtriya-arogya-nidhi",
    name: "Rashtriya Arogya Nidhi",
    description: "Financial assistance for treatment of life-threatening diseases for BPL patients.",
    category: "Healthcare",
    eligibility: [
      "BPL patients",
      "Treatment at government hospitals",
      "For diseases like cancer, heart, renal failure"
    ],
    benefits: "Financial assistance up to ₹15 lakhs for treatment",
    applicationLink: "https://main.mohfw.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },
  {
    id: "amrit-pharmacy",
    name: "AMRIT Pharmacy Scheme",
    description: "Affordable Medicines and Reliable Implants for Treatment at discounted prices.",
    category: "Healthcare",
    eligibility: [
      "All citizens",
      "Prescription required for medicines",
      "Available at AMRIT pharmacies in hospitals"
    ],
    benefits: "Medicines and implants at 60-90% discount",
    applicationLink: "https://amritpharmacy.nhp.gov.in/",
    ministry: "Ministry of Health and Family Welfare"
  },

  // =============== EDUCATION SCHEMES ===============
  {
    id: "scholarship-portal",
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
    id: "pm-yasasvi",
    name: "PM YASASVI Scholarship",
    description: "Scholarship for OBC, EBC, DNT students from Class 9 to PhD level.",
    category: "Education",
    eligibility: [
      "OBC/EBC/DNT students",
      "Family income below ₹2.5 lakhs per annum",
      "Regular students in recognized institutions"
    ],
    benefits: "₹75,000 to ₹2 lakhs per year based on course level",
    applicationLink: "https://yet.nta.ac.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "pre-matric-sc",
    name: "Pre-Matric Scholarship for SC Students",
    description: "Financial support for SC students studying in Classes 9 and 10.",
    category: "Education",
    eligibility: [
      "SC students in Class 9-10",
      "Family income below ₹2.5 lakhs per annum",
      "Regular students"
    ],
    benefits: "₹3,500 to ₹5,000 per annum plus maintenance allowance",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "post-matric-sc",
    name: "Post-Matric Scholarship for SC Students",
    description: "Financial support for SC students pursuing post-matriculation courses.",
    category: "Education",
    eligibility: [
      "SC students in Class 11 and above",
      "Family income below ₹2.5 lakhs per annum",
      "Regular students"
    ],
    benefits: "Full tuition fees, maintenance allowance up to ₹1,200/month",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "pre-matric-st",
    name: "Pre-Matric Scholarship for ST Students",
    description: "Financial support for ST students studying in Classes 9 and 10.",
    category: "Education",
    eligibility: [
      "ST students in Class 9-10",
      "Family income below ₹2.5 lakhs per annum",
      "Regular attendance above 60%"
    ],
    benefits: "₹3,500 to ₹5,000 per annum plus ₹150-₹350 monthly maintenance",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Tribal Affairs"
  },
  {
    id: "post-matric-st",
    name: "Post-Matric Scholarship for ST Students",
    description: "Financial support for ST students pursuing post-matriculation courses.",
    category: "Education",
    eligibility: [
      "ST students in Class 11 and above",
      "Family income below ₹2.5 lakhs per annum",
      "Regular students"
    ],
    benefits: "Full tuition fees, book grant, maintenance allowance",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Tribal Affairs"
  },
  {
    id: "obc-scholarship",
    name: "Pre-Matric & Post-Matric Scholarship for OBC",
    description: "Financial support for OBC students from Class 1 to post-graduation.",
    category: "Education",
    eligibility: [
      "OBC students",
      "Family income below ₹1.5 lakhs (pre-matric) or ₹2.5 lakhs (post-matric)",
      "Regular students"
    ],
    benefits: "Tuition fees, maintenance allowance based on course level",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "minority-scholarship",
    name: "Merit-cum-Means Scholarship for Minorities",
    description: "Scholarship for meritorious minority students pursuing professional and technical courses.",
    category: "Education",
    eligibility: [
      "Students from minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)",
      "Family income below ₹2.5 lakhs per annum",
      "Minimum 50% marks in previous exam"
    ],
    benefits: "₹20,000 per annum for professional courses, ₹5,000 for others",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "pragati-scholarship",
    name: "PRAGATI Scholarship for Girls",
    description: "Scholarship for girl students pursuing technical education at degree/diploma level.",
    category: "Education",
    eligibility: [
      "Girl students in AICTE approved institutions",
      "Family income below ₹8 lakhs per annum",
      "One girl per family"
    ],
    benefits: "₹50,000 per annum for 4 years (degree) or 3 years (diploma)",
    applicationLink: "https://www.aicte-india.org/",
    ministry: "Ministry of Education"
  },
  {
    id: "saksham-scholarship",
    name: "SAKSHAM Scholarship for Differently Abled",
    description: "Scholarship for differently abled students pursuing technical education.",
    category: "Education",
    eligibility: [
      "Students with 40% or more disability",
      "Pursuing degree/diploma in AICTE approved institutions",
      "Family income below ₹8 lakhs per annum"
    ],
    benefits: "₹50,000 per annum plus tuition fee reimbursement",
    applicationLink: "https://www.aicte-india.org/",
    ministry: "Ministry of Education"
  },
  {
    id: "national-means-cum-merit",
    name: "National Means-cum-Merit Scholarship",
    description: "Scholarship for meritorious students from economically weaker sections to reduce dropouts.",
    category: "Education",
    eligibility: [
      "Students in Class 8 in government schools",
      "Family income below ₹3.5 lakhs per annum",
      "Minimum 55% marks in Class 7"
    ],
    benefits: "₹12,000 per annum from Class 9 to Class 12",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Education"
  },
  {
    id: "kishore-vaigyanik",
    name: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    description: "Fellowship program to attract talented students to pursue research in basic sciences. Note: Merged with INSPIRE program.",
    category: "Education",
    eligibility: [
      "Students in Class 11/12 or 1st year of B.Sc.",
      "Studying science subjects",
      "Indian citizens"
    ],
    benefits: "Monthly fellowship ₹5,000-₹7,000 plus annual contingency grant",
    applicationLink: "https://online-inspire.gov.in/",
    ministry: "Department of Science and Technology"
  },
  {
    id: "inspire-scholarship",
    name: "INSPIRE Scholarship",
    description: "Scholarship for talented students pursuing natural and basic sciences.",
    category: "Education",
    eligibility: [
      "Students pursuing B.Sc/M.Sc in natural/basic sciences",
      "Top 1% of Class 12 board exam",
      "Indian citizens"
    ],
    benefits: "₹80,000 per annum for 5 years",
    applicationLink: "https://online-inspire.gov.in/",
    ministry: "Department of Science and Technology"
  },
  {
    id: "ishan-uday",
    name: "Ishan Uday Scholarship for North East",
    description: "Special scholarship for students from North Eastern Region pursuing higher studies.",
    category: "Education",
    eligibility: [
      "Students from North Eastern States",
      "Family income below ₹4.5 lakhs per annum",
      "Pursuing regular courses in recognized institutions"
    ],
    benefits: "₹5,400 to ₹7,800 per month based on course",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Education"
  },
  {
    id: "central-sector-scheme",
    name: "Central Sector Scheme of Scholarships",
    description: "Scholarship for meritorious students from low income families pursuing higher education.",
    category: "Education",
    eligibility: [
      "Students in top 20 percentile of respective board",
      "Family income below ₹8 lakhs per annum",
      "Pursuing regular courses"
    ],
    benefits: "₹10,000-₹20,000 per annum for UG/PG courses",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Education"
  },
  {
    id: "pm-usp",
    name: "PM's Special Scholarship for J&K and Ladakh",
    description: "Scholarship for students from J&K and Ladakh pursuing studies outside the region.",
    category: "Education",
    eligibility: [
      "Domicile of J&K or Ladakh",
      "Family income below ₹8 lakhs per annum",
      "Pursuing engineering, medical, general degree courses"
    ],
    benefits: "Full tuition fees plus maintenance allowance",
    applicationLink: "https://www.aicte-india.org/",
    ministry: "Ministry of Education"
  },
  {
    id: "top-class-sc",
    name: "Top Class Education for SC Students",
    description: "Full tuition fees for SC students admitted to notified premier institutions.",
    category: "Education",
    eligibility: [
      "SC students in IITs, IIMs, NITs, AIIMS, etc.",
      "Family income below ₹6 lakhs per annum",
      "Fresh admission in notified institutions"
    ],
    benefits: "Full tuition fee, living expenses, computer, books allowance",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "begum-hazrat-mahal",
    name: "Begum Hazrat Mahal Scholarship for Minority Girls",
    description: "Scholarship for meritorious minority girls studying in Classes 9-12.",
    category: "Education",
    eligibility: [
      "Minority community girls in Class 9-12",
      "Family income below ₹2 lakhs per annum",
      "Minimum 50% marks"
    ],
    benefits: "₹5,000 for Class 9-10, ₹6,000 for Class 11-12 per annum",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "maulana-azad-fellowship",
    name: "Maulana Azad National Fellowship",
    description: "Fellowship for minority students pursuing M.Phil and Ph.D.",
    category: "Education",
    eligibility: [
      "Minority students pursuing M.Phil/Ph.D",
      "Qualified UGC-NET/JRF",
      "Family income below ₹6 lakhs per annum"
    ],
    benefits: "₹31,000/month (JRF) to ₹35,000/month (SRF) plus contingency",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "free-coaching-sc",
    name: "Free Coaching for SC and OBC Students",
    description: "Free coaching for competitive exams like UPSC, state PCS, banking, SSC, etc.",
    category: "Education",
    eligibility: [
      "SC/OBC students",
      "Family income below ₹8 lakhs per annum",
      "Age limit as per exam criteria"
    ],
    benefits: "Free coaching, study material, and stipend for stay",
    applicationLink: "https://socialjustice.gov.in/schemes/10",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "vidyasiri",
    name: "Vidyasiri Scholarship",
    description: "Scholarship for students from economically weaker sections for higher education.",
    category: "Education",
    eligibility: [
      "Family income below ₹6 lakhs per annum",
      "Pursuing graduation or post-graduation",
      "Regular students"
    ],
    benefits: "Tuition fees and maintenance allowance",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Education"
  },
  {
    id: "mid-day-meal",
    name: "PM POSHAN (Mid-Day Meal Scheme)",
    description: "Free lunch for students in government and aided schools to improve nutrition and enrollment.",
    category: "Education",
    eligibility: [
      "Students in government and government-aided schools",
      "Classes 1-8",
      "No income criteria"
    ],
    benefits: "Free hot cooked meal with nutritional content every school day",
    applicationLink: "https://pmposhan.education.gov.in/",
    ministry: "Ministry of Education"
  },
  {
    id: "beti-bachao-education",
    name: "Beti Bachao Beti Padhao - Education Component",
    description: "Ensuring education and survival of the girl child through various interventions.",
    category: "Education",
    eligibility: [
      "Girl children",
      "All districts of India",
      "No income criteria"
    ],
    benefits: "Scholarship support, awareness programs, infrastructure for girls' education",
    applicationLink: "https://wcd.nic.in/bbbp-schemes",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "samagra-shiksha",
    name: "Samagra Shiksha Abhiyan",
    description: "Integrated scheme for school education covering pre-school to Class 12.",
    category: "Education",
    eligibility: [
      "All students in government schools",
      "Classes from pre-primary to Class 12",
      "No income criteria"
    ],
    benefits: "Free textbooks, uniforms, digital education, infrastructure improvement",
    applicationLink: "https://samagra.education.gov.in/",
    ministry: "Ministry of Education"
  },

  // =============== AGRICULTURE SCHEMES ===============
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
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme to provide financial support in case of crop loss due to natural calamities.",
    category: "Agriculture",
    eligibility: [
      "All farmers growing notified crops",
      "Loanee and non-loanee farmers",
      "Sharecroppers and tenant farmers"
    ],
    benefits: "Premium subsidy, full crop value insurance, quick claim settlement",
    applicationLink: "https://pmfby.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "kisan-credit",
    name: "Kisan Credit Card Scheme",
    description: "Credit facility for farmers to meet their agricultural needs at low interest rates.",
    category: "Agriculture",
    eligibility: [
      "All farmers including tenant farmers",
      "Farmers, fishermen, animal husbandry farmers",
      "SHGs and Joint Liability Groups of farmers"
    ],
    benefits: "Credit up to ₹3 lakhs at 4% interest, personal accident insurance",
    applicationLink: "https://pmkisan.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "soil-health-card",
    name: "Soil Health Card Scheme",
    description: "Providing soil health cards to farmers with nutrient status and fertilizer recommendations.",
    category: "Agriculture",
    eligibility: [
      "All farmers with agricultural land",
      "No income criteria",
      "Both landowners and tenants"
    ],
    benefits: "Free soil testing, nutrient-based fertilizer recommendations, improved yield",
    applicationLink: "https://soilhealth.dac.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "per-drop-more-crop",
    name: "Per Drop More Crop (Micro Irrigation)",
    description: "Promoting micro irrigation for efficient water use and better crop yield.",
    category: "Agriculture",
    eligibility: [
      "All farmers with irrigation requirements",
      "Focus on water-stressed areas",
      "Both individual and community"
    ],
    benefits: "55% subsidy for small/marginal farmers, 45% for others on drip/sprinkler systems",
    applicationLink: "https://pmksy.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "organic-farming",
    name: "Paramparagat Krishi Vikas Yojana (Organic Farming)",
    description: "Supporting organic farming through cluster approach and certification.",
    category: "Agriculture",
    eligibility: [
      "Farmer groups in clusters of 50 acres",
      "Commitment to organic farming for 3 years",
      "All types of farmers"
    ],
    benefits: "₹50,000 per hectare over 3 years for inputs, certification, marketing",
    applicationLink: "https://pgsindia-ncof.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "e-nam",
    name: "National Agriculture Market (e-NAM)",
    description: "Online trading platform for agricultural commodities for better price discovery.",
    category: "Agriculture",
    eligibility: [
      "All farmers",
      "Traders, commission agents, FPOs",
      "Registered APMC market users"
    ],
    benefits: "Better price realization, transparent bidding, reduced marketing costs",
    applicationLink: "https://enam.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "rashtriya-krishi-vikas",
    name: "Rashtriya Krishi Vikas Yojana",
    description: "Additional central assistance for agriculture and allied sectors development.",
    category: "Agriculture",
    eligibility: [
      "State governments for agricultural development",
      "Farmers in participating states",
      "Focus on production and productivity"
    ],
    benefits: "100% central grant for approved projects, flexible funding",
    applicationLink: "https://rkvy.nic.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "nfsm",
    name: "National Food Security Mission",
    description: "Increasing production of rice, wheat, pulses, and coarse cereals through area expansion and productivity.",
    category: "Agriculture",
    eligibility: [
      "Farmers in identified districts",
      "Growing targeted crops",
      "Both individual and community"
    ],
    benefits: "Subsidies on seeds, farm machinery, inputs; demonstration support",
    applicationLink: "https://nfsm.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "sub-mission-seed",
    name: "Sub-Mission on Seed and Planting Material",
    description: "Providing quality seeds and planting materials to farmers.",
    category: "Agriculture",
    eligibility: [
      "All farmers",
      "Seed producing organizations",
      "State Seed Corporations"
    ],
    benefits: "Subsidized quality seeds, seed production infrastructure",
    applicationLink: "https://seednet.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "agri-infrastructure",
    name: "Agriculture Infrastructure Fund",
    description: "Medium to long term financing for post-harvest management and agriculture infrastructure.",
    category: "Agriculture",
    eligibility: [
      "Farmers, FPOs, PACS, Agri-entrepreneurs",
      "State agencies, APMCs",
      "Start-ups in agriculture"
    ],
    benefits: "3% interest subvention on loans up to ₹2 crores, credit guarantee",
    applicationLink: "https://agriinfra.dac.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "agriculture-mechanization",
    name: "Sub-Mission on Agricultural Mechanization",
    description: "Promoting farm mechanization to increase productivity and reduce drudgery.",
    category: "Agriculture",
    eligibility: [
      "All farmers",
      "Priority to SC/ST and small farmers",
      "Custom Hiring Centers, FPOs"
    ],
    benefits: "40-50% subsidy on farm machinery, equipment, and tractors",
    applicationLink: "https://farmech.dac.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "pradhan-mantri-annadata",
    name: "PM-AASHA (Annadata Aay Sanrakshan Abhiyan)",
    description: "Ensuring remunerative prices to farmers for their produce through procurement.",
    category: "Agriculture",
    eligibility: [
      "All farmers producing notified crops",
      "MSP applicable crops",
      "No land holding criteria"
    ],
    benefits: "MSP support, price deficiency payment, private procurement",
    applicationLink: "https://farmer.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "gobar-dhan",
    name: "GOBAR-DHAN Scheme",
    description: "Converting cattle dung and solid waste into compost, biogas, and bio-CNG.",
    category: "Agriculture",
    eligibility: [
      "Farmers, individual entrepreneurs",
      "Village panchayats, cooperatives",
      "Gaushalas and dairy cooperatives"
    ],
    benefits: "Additional income from waste, clean energy, organic fertilizer",
    applicationLink: "https://sbm.gov.in/gbdw20/",
    ministry: "Ministry of Jal Shakti"
  },
  {
    id: "animal-husbandry",
    name: "Animal Husbandry Infrastructure Development Fund",
    description: "Incentivizing investments in dairy processing, meat processing, and animal feed plants.",
    category: "Agriculture",
    eligibility: [
      "Farmer cooperatives, SHGs, FPOs",
      "Private companies in animal husbandry",
      "Individual entrepreneurs"
    ],
    benefits: "3% interest subvention on loans, credit guarantee",
    applicationLink: "https://dahd.nic.in/",
    ministry: "Ministry of Fisheries, Animal Husbandry and Dairying"
  },
  {
    id: "blue-revolution",
    name: "Blue Revolution (Fisheries Development)",
    description: "Integrated development of fisheries sector for food security and employment.",
    category: "Agriculture",
    eligibility: [
      "Fishermen, fish farmers, fishing communities",
      "Fish workers, entrepreneurs",
      "Women SHGs in fisheries"
    ],
    benefits: "Subsidies for fishing gear, boats, fish processing units",
    applicationLink: "https://dof.gov.in/",
    ministry: "Ministry of Fisheries, Animal Husbandry and Dairying"
  },
  {
    id: "national-horticulture",
    name: "Mission for Integrated Development of Horticulture",
    description: "Holistic development of horticulture sector including fruits, vegetables, spices, flowers.",
    category: "Agriculture",
    eligibility: [
      "All farmers involved in horticulture",
      "FPOs, SHGs, cooperatives",
      "Entrepreneurs in agri-business"
    ],
    benefits: "Subsidies for orchards, green houses, cold storage, processing units",
    applicationLink: "https://midh.gov.in/",
    ministry: "Ministry of Agriculture"
  },
  {
    id: "national-beekeeping",
    name: "National Beekeeping and Honey Mission",
    description: "Promoting beekeeping for additional income and improving crop productivity through pollination.",
    category: "Agriculture",
    eligibility: [
      "All farmers, landless rural people",
      "Women SHGs, unemployed youth",
      "Existing beekeepers"
    ],
    benefits: "Subsidies for bee colonies, hives, honey processing; training support",
    applicationLink: "https://nbb.gov.in/",
    ministry: "Ministry of Agriculture"
  },

  // =============== BUSINESS & ENTREPRENEURSHIP SCHEMES ===============
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
  },
  {
    id: "startup-india",
    name: "Startup India Initiative",
    description: "Building a robust ecosystem for startups with tax benefits, funding support, and compliance simplification.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Entity incorporated as private limited, LLP, or registered partnership",
      "Annual turnover below ₹100 crores",
      "Working on innovation/improvement of products/services"
    ],
    benefits: "3-year tax holiday, self-certification compliance, Startup India Seed Fund",
    applicationLink: "https://www.startupindia.gov.in/",
    ministry: "Department for Promotion of Industry and Internal Trade"
  },
  {
    id: "msme-cluster",
    name: "MSME Cluster Development Programme",
    description: "Support for development of clusters for increased productivity and competitiveness.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "MSMEs in identified clusters",
      "Industry associations, cooperatives",
      "SPVs for cluster development"
    ],
    benefits: "Grant up to ₹5 crores for Common Facility Centers, ₹10 crores for greenfield clusters",
    applicationLink: "https://msme.gov.in/",
    ministry: "Ministry of MSME"
  },
  {
    id: "credit-guarantee",
    name: "Credit Guarantee Fund Trust for MSEs (CGTMSE)",
    description: "Collateral-free credit for micro and small enterprises.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Micro and Small Enterprises",
      "Both existing and new units",
      "Manufacturing and service sector"
    ],
    benefits: "Collateral-free loans up to ₹2 crores, guarantee coverage 75-85%",
    applicationLink: "https://www.cgtmse.in/",
    ministry: "Ministry of MSME"
  },
  {
    id: "sfurti",
    name: "SFURTI (Traditional Industries Revival)",
    description: "Revival of traditional industries by organizing artisans into clusters.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Traditional industry artisans (khadi, coir, bamboo, etc.)",
      "Cluster size 500-5,000 artisans",
      "NGOs, state governments as implementing agencies"
    ],
    benefits: "Grants for skill training, infrastructure, marketing, brand building",
    applicationLink: "https://sfurti.msme.gov.in/",
    ministry: "Ministry of MSME"
  },
  {
    id: "aspire",
    name: "ASPIRE (Livelihood & Enterprise Promotion)",
    description: "Setting up Livelihood Business Incubators and Technology Business Incubators.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Young entrepreneurs and innovators",
      "Agri-tech startups",
      "Rural non-farm enterprises"
    ],
    benefits: "Incubation support, seed funding, mentorship, market access",
    applicationLink: "https://aspire.msme.gov.in/",
    ministry: "Ministry of MSME"
  },
  {
    id: "zero-defect",
    name: "Zero Defect Zero Effect (ZED) Certification",
    description: "Certification scheme for MSMEs to ensure quality and environmental sustainability.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "All registered MSMEs",
      "Manufacturing units",
      "Units seeking quality certification"
    ],
    benefits: "Financial assistance for certification, market preference, brand building",
    applicationLink: "https://zed.msme.gov.in/",
    ministry: "Ministry of MSME"
  },
  {
    id: "msme-samadhan",
    name: "MSME SAMADHAN (Delayed Payment Portal)",
    description: "Portal for MSEs to file applications for delayed payment from buyers.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Micro and Small Enterprises",
      "Registered on Udyam portal",
      "Having delayed payments from buyers"
    ],
    benefits: "Resolution of delayed payment issues within 90 days",
    applicationLink: "https://samadhaan.msme.gov.in/",
    ministry: "Ministry of MSME"
  },
  {
    id: "nsic-schemes",
    name: "NSIC Schemes for MSMEs",
    description: "Various support schemes through National Small Industries Corporation.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "MSMEs registered with NSIC",
      "Manufacturing and service sector",
      "Both new and existing units"
    ],
    benefits: "Raw material assistance, marketing support, technology support, credit facilitation",
    applicationLink: "https://www.nsic.co.in/",
    ministry: "Ministry of MSME"
  },
  {
    id: "atal-incubation",
    name: "Atal Incubation Centers",
    description: "World-class incubators to nurture innovative startups.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Startups and entrepreneurs with innovative ideas",
      "Technology-based ventures",
      "Social enterprises"
    ],
    benefits: "Physical infrastructure, mentorship, funding access, industry connects",
    applicationLink: "https://aim.gov.in/",
    ministry: "NITI Aayog"
  },
  {
    id: "sisfs",
    name: "Startup India Seed Fund Scheme",
    description: "Financial assistance to startups for proof of concept, prototype development.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "DPIIT recognized startups",
      "Incorporated within 2 years",
      "Not received more than ₹10 lakhs funding"
    ],
    benefits: "Grants up to ₹20 lakhs for validation, investment up to ₹50 lakhs",
    applicationLink: "https://www.startupindia.gov.in/",
    ministry: "Department for Promotion of Industry and Internal Trade"
  },
  {
    id: "food-processing",
    name: "PM Formalization of Micro Food Processing",
    description: "Upgrading micro food processing enterprises with credit-linked capital subsidy.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Existing micro food processing units",
      "SHGs, FPOs, Cooperatives",
      "Individual entrepreneurs"
    ],
    benefits: "35% capital subsidy up to ₹10 lakhs, support for One District One Product",
    applicationLink: "https://pmfme.mofpi.gov.in/",
    ministry: "Ministry of Food Processing Industries"
  },
  {
    id: "technology-upgradation",
    name: "Technology Upgradation Fund Scheme (TUFS)",
    description: "Support for technology upgradation in textile and jute industries.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Textile and jute manufacturing units",
      "New and existing units",
      "All segments of textile value chain"
    ],
    benefits: "Capital subsidy of 15-25%, interest subvention on term loans",
    applicationLink: "https://texmin.nic.in/",
    ministry: "Ministry of Textiles"
  },

  // =============== FINANCIAL INCLUSION SCHEMES ===============
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
    id: "nps",
    name: "National Pension System",
    description: "Voluntary contributory pension system for all citizens.",
    category: "Pension & Retirement",
    eligibility: [
      "All Indian citizens aged 18-70 years",
      "Voluntary enrollment",
      "OCI and NRIs also eligible"
    ],
    benefits: "Tax benefits under Section 80C and 80CCD, market-linked returns, pension on retirement",
    applicationLink: "https://www.npscra.nsdl.co.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "ppf",
    name: "Public Provident Fund (PPF)",
    description: "Long-term savings scheme with attractive interest and tax benefits.",
    category: "Financial Inclusion",
    eligibility: [
      "All Indian residents",
      "One account per person",
      "15-year maturity period"
    ],
    benefits: "7.1% interest rate (2024), tax-free returns, loan facility",
    applicationLink: "https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=89",
    ministry: "Ministry of Finance"
  },
  {
    id: "senior-citizen-savings",
    name: "Senior Citizens Savings Scheme (SCSS)",
    description: "Investment scheme for senior citizens with higher interest rates.",
    category: "Financial Inclusion",
    eligibility: [
      "Age 60 years and above",
      "Age 55-60 if retired from government/defense",
      "Maximum investment ₹30 lakhs"
    ],
    benefits: "8.2% interest rate (2024), quarterly payouts, tax benefits under 80C",
    applicationLink: "https://www.indiapost.gov.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "postal-savings",
    name: "Post Office Savings Schemes",
    description: "Various small savings schemes through India Post with guaranteed returns.",
    category: "Financial Inclusion",
    eligibility: [
      "All Indian residents",
      "Multiple schemes for different needs",
      "Accessible across India"
    ],
    benefits: "Government-backed, competitive interest rates, tax benefits",
    applicationLink: "https://www.indiapost.gov.in/",
    ministry: "Ministry of Communications"
  },
  {
    id: "kisan-vikas-patra",
    name: "Kisan Vikas Patra (KVP)",
    description: "Savings certificate that doubles your investment in 115 months.",
    category: "Financial Inclusion",
    eligibility: [
      "All Indian residents",
      "HUFs and trusts also eligible",
      "Minimum investment ₹1,000"
    ],
    benefits: "7.5% interest rate, doubles money in 115 months, no maximum limit",
    applicationLink: "https://www.indiapost.gov.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "nsc",
    name: "National Savings Certificate (NSC)",
    description: "Fixed income investment scheme with 5-year maturity.",
    category: "Financial Inclusion",
    eligibility: [
      "All Indian residents",
      "Single, joint, or minor accounts",
      "No maximum investment limit"
    ],
    benefits: "7.7% interest rate, tax deduction under 80C, nominee facility",
    applicationLink: "https://www.indiapost.gov.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "mahila-samman",
    name: "Mahila Samman Savings Certificate",
    description: "Special savings scheme for women with attractive interest rate.",
    category: "Financial Inclusion",
    eligibility: [
      "Women of any age",
      "Girl child (minor account)",
      "Maximum investment ₹2 lakhs"
    ],
    benefits: "7.5% interest rate, partial withdrawal allowed, 2-year maturity",
    applicationLink: "https://www.indiapost.gov.in/",
    ministry: "Ministry of Finance"
  },
  {
    id: "pm-jan-dhan-overdraft",
    name: "PMJDY Overdraft Facility",
    description: "Overdraft facility of up to ₹10,000 for Jan Dhan account holders.",
    category: "Financial Inclusion",
    eligibility: [
      "PMJDY account holders with satisfactory operation",
      "Aadhaar-linked account",
      "One per household"
    ],
    benefits: "Overdraft up to ₹10,000 without collateral",
    applicationLink: "https://www.pmjdy.gov.in/",
    ministry: "Ministry of Finance"
  },

  // =============== WOMEN & CHILD WELFARE SCHEMES ===============
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
    applicationLink: "https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=88",
    ministry: "Ministry of Finance"
  },
  {
    id: "beti-bachao",
    name: "Beti Bachao Beti Padhao",
    description: "Campaign to address declining child sex ratio and empower the girl child.",
    category: "Women & Child Welfare",
    eligibility: [
      "Girl children in all districts",
      "Focus on gender-critical districts",
      "All economic backgrounds"
    ],
    benefits: "Awareness programs, education support, health interventions",
    applicationLink: "https://wcd.nic.in/bbbp-schemes",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "mission-shakti",
    name: "Mission Shakti (Women Empowerment)",
    description: "Umbrella scheme for safety, security, and empowerment of women.",
    category: "Women & Child Welfare",
    eligibility: [
      "Women in distress",
      "Women seeking economic empowerment",
      "All age groups"
    ],
    benefits: "One-stop centers, helplines, shelter homes, economic support",
    applicationLink: "https://wcd.nic.in/schemes/mission-shakti",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "ujjwala-trafficking",
    name: "Ujjwala Scheme (Anti-Trafficking)",
    description: "Comprehensive scheme for prevention of trafficking and rescue/rehabilitation of victims.",
    category: "Women & Child Welfare",
    eligibility: [
      "Trafficked women and children",
      "Victims of commercial sexual exploitation",
      "Women in distress"
    ],
    benefits: "Rescue operations, safe shelter, rehabilitation, reintegration support",
    applicationLink: "https://wcd.nic.in/schemes/ujjwala-comprehensive-scheme-prevention-trafficking-and-rescue-rehabilitation-and-re",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "swadhar-greh",
    name: "Swadhar Greh (Shelter for Women)",
    description: "Shelter, food, clothing, and care for women in difficult circumstances.",
    category: "Women & Child Welfare",
    eligibility: [
      "Women victims of trafficking, domestic violence",
      "Destitute widows, women prisoners",
      "Natural disaster affected women"
    ],
    benefits: "Temporary shelter up to 3 years, skill training, rehabilitation",
    applicationLink: "https://wcd.nic.in/schemes/swadhar-greh",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "working-women-hostel",
    name: "Working Women Hostel Scheme",
    description: "Safe accommodation for working women with day care for children.",
    category: "Women & Child Welfare",
    eligibility: [
      "Working women, single women",
      "Women undergoing job training",
      "Monthly income up to ₹50,000"
    ],
    benefits: "Subsidized hostel accommodation, day care for children",
    applicationLink: "https://wcd.nic.in/schemes/working-women-hostel",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "support-training",
    name: "Support to Training and Employment (STEP)",
    description: "Skill training for women in traditional and non-traditional sectors.",
    category: "Women & Child Welfare",
    eligibility: [
      "Women above 16 years",
      "Focus on marginalized women",
      "No formal education required"
    ],
    benefits: "Free skill training, entrepreneurship development, placement support",
    applicationLink: "https://wcd.nic.in/schemes/step-support-training-and-employment-programme-women",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "one-stop-center",
    name: "One Stop Center (Sakhi)",
    description: "Support services to women affected by violence in private or public spaces.",
    category: "Women & Child Welfare",
    eligibility: [
      "Women affected by violence",
      "Victims of domestic violence, sexual assault",
      "Women in distress"
    ],
    benefits: "Medical, legal, psychological support, temporary shelter, police assistance",
    applicationLink: "https://wcd.nic.in/schemes/one-stop-centre-scheme-1",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "women-helpline",
    name: "Women Helpline (181)",
    description: "24/7 toll-free helpline for women affected by violence seeking help.",
    category: "Women & Child Welfare",
    eligibility: [
      "All women in distress",
      "Available 24x7",
      "Pan-India coverage"
    ],
    benefits: "Emergency response, counseling, police and medical referral",
    applicationLink: "https://wcd.nic.in/schemes/womens-helpline",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "icds",
    name: "Integrated Child Development Services (ICDS)",
    description: "Services for children below 6 years and pregnant/lactating mothers through Anganwadis.",
    category: "Women & Child Welfare",
    eligibility: [
      "Children 0-6 years",
      "Pregnant and lactating mothers",
      "Adolescent girls"
    ],
    benefits: "Supplementary nutrition, immunization, health checkup, pre-school education",
    applicationLink: "https://wcd.nic.in/schemes/icds-scheme",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "poshan-abhiyaan",
    name: "POSHAN Abhiyaan (National Nutrition Mission)",
    description: "Reduce stunting, under-nutrition, anemia in children, women, and adolescent girls.",
    category: "Women & Child Welfare",
    eligibility: [
      "Children 0-6 years",
      "Pregnant and lactating women",
      "Adolescent girls"
    ],
    benefits: "Nutrition support, growth monitoring, behavioral change",
    applicationLink: "https://poshanabhiyaan.gov.in/",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "maternity-benefit",
    name: "Pradhan Mantri Matru Vandana Yojana",
    description: "Cash incentive to pregnant and lactating mothers for first live birth.",
    category: "Women & Child Welfare",
    eligibility: [
      "Pregnant women and lactating mothers",
      "First live birth only",
      "Age 19 years and above"
    ],
    benefits: "₹5,000 in three installments for wage loss compensation and nutrition",
    applicationLink: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "child-protection",
    name: "Integrated Child Protection Scheme (Mission Vatsalya)",
    description: "Safe and secure environment for overall development of children in need of care.",
    category: "Women & Child Welfare",
    eligibility: [
      "Children in need of care and protection",
      "Children in conflict with law",
      "Orphaned, abandoned, trafficked children"
    ],
    benefits: "Shelter homes, institutional and non-institutional care, adoption services",
    applicationLink: "https://wcd.nic.in/schemes/mission-vatsalya",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "sabla",
    name: "Scheme for Adolescent Girls (SAG)",
    description: "Empowerment of adolescent girls (11-18 years) through nutrition and life skills. Previously known as SABLA/Rajiv Gandhi Scheme.",
    category: "Women & Child Welfare",
    eligibility: [
      "Adolescent girls 11-18 years",
      "Out-of-school girls prioritized",
      "All economic backgrounds"
    ],
    benefits: "Nutrition, health, hygiene education, life skills, vocational training",
    applicationLink: "https://wcd.nic.in/schemes/scheme-adolescent-girls",
    ministry: "Ministry of Women and Child Development"
  },
  {
    id: "free-sewing-machine",
    name: "Free Sewing Machine Scheme",
    description: "Providing free sewing machines to poor women for self-employment.",
    category: "Women & Child Welfare",
    eligibility: [
      "Women aged 20-40 years",
      "Annual family income below ₹12,000",
      "Widows and disabled women prioritized"
    ],
    benefits: "Free sewing machine for self-employment",
    applicationLink: "https://www.india.gov.in/",
    ministry: "Ministry of Textiles"
  },

  // =============== ENERGY & WELFARE SCHEMES ===============
  {
    id: "ujjwala-lpg",
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
    id: "saubhagya",
    name: "Saubhagya (Household Electrification)",
    description: "Free electricity connection to all willing households in rural and urban areas.",
    category: "Energy & Welfare",
    eligibility: [
      "All unelectrified households",
      "Both rural and urban areas",
      "No income criteria"
    ],
    benefits: "Free electricity connection, LED bulbs, metering",
    applicationLink: "https://saubhagya.gov.in/",
    ministry: "Ministry of Power"
  },
  {
    id: "kusum",
    name: "PM-KUSUM (Solar for Farmers)",
    description: "Solar energy for farmers for irrigation and extra income from selling power.",
    category: "Energy & Welfare",
    eligibility: [
      "All farmers with irrigation needs",
      "Farmer cooperatives",
      "Panchayats and Water User Associations"
    ],
    benefits: "90% subsidy for solar pumps, income from grid-connected solar plants",
    applicationLink: "https://pmkusum.mnre.gov.in/",
    ministry: "Ministry of New and Renewable Energy"
  },
  {
    id: "solar-rooftop",
    name: "PM Surya Ghar (Solar Rooftop)",
    description: "Rooftop solar installation scheme for households with subsidy support.",
    category: "Energy & Welfare",
    eligibility: [
      "Residential households",
      "Own roof or suitable space",
      "Grid-connected consumers"
    ],
    benefits: "Subsidy up to ₹78,000 for 3kW system, free electricity for 25+ years",
    applicationLink: "https://solarrooftop.gov.in/",
    ministry: "Ministry of New and Renewable Energy"
  },
  {
    id: "pahal",
    name: "PAHAL (LPG Subsidy Direct Transfer)",
    description: "Direct transfer of LPG subsidy to consumer bank accounts.",
    category: "Energy & Welfare",
    eligibility: [
      "All LPG consumers",
      "Bank account linked with Aadhaar",
      "Active LPG connection"
    ],
    benefits: "Direct subsidy transfer, timely delivery, no diversion",
    applicationLink: "https://www.mylpg.in/",
    ministry: "Ministry of Petroleum and Natural Gas"
  },
  {
    id: "uday",
    name: "UDAY (Power Distribution Reform)",
    description: "Scheme for operational and financial turnaround of power distribution companies.",
    category: "Energy & Welfare",
    eligibility: [
      "All power consumers",
      "States participating in UDAY",
      "Focus on improving power supply"
    ],
    benefits: "Improved power supply, reduced losses, better infrastructure",
    applicationLink: "https://powermin.nic.in/",
    ministry: "Ministry of Power"
  },
  {
    id: "street-lighting",
    name: "Street Lighting National Programme (SLNP)",
    description: "Replacement of conventional street lights with LED lights.",
    category: "Energy & Welfare",
    eligibility: [
      "Urban Local Bodies",
      "Municipal Corporations",
      "All cities and towns"
    ],
    benefits: "Energy savings, reduced electricity bills, better illumination",
    applicationLink: "https://www.eeslindia.org/",
    ministry: "Ministry of Power"
  },
  {
    id: "unnat-jyoti",
    name: "UJALA (LED Bulb Scheme)",
    description: "Distribution of LED bulbs at subsidized prices for energy efficiency.",
    category: "Energy & Welfare",
    eligibility: [
      "All domestic consumers",
      "No income criteria",
      "Available through distribution kiosks"
    ],
    benefits: "LED bulbs at ₹70 each, energy savings of 80%",
    applicationLink: "https://www.ujala.gov.in/",
    ministry: "Ministry of Power"
  },

  // =============== EMPLOYMENT & SKILLS SCHEMES ===============
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
    id: "pmkvy",
    name: "Pradhan Mantri Kaushal Vikas Yojana",
    description: "Flagship skill development scheme for youth with certification and placement support.",
    category: "Employment & Skills",
    eligibility: [
      "Indian nationals aged 15-45 years",
      "School/college dropouts or unemployed",
      "No formal education requirements"
    ],
    benefits: "Free skill training, ₹8,000 reward on certification, placement assistance",
    applicationLink: "https://www.pmkvyofficial.org/",
    ministry: "Ministry of Skill Development"
  },
  {
    id: "ddu-gky",
    name: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
    description: "Skill training for rural youth with guaranteed placement.",
    category: "Employment & Skills",
    eligibility: [
      "Rural youth aged 15-35 years",
      "SC/ST/Women up to 45 years",
      "Below Poverty Line families prioritized"
    ],
    benefits: "Free residential training, guaranteed placement with minimum ₹6,000/month",
    applicationLink: "https://ddugky.gov.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "nrlm",
    name: "National Rural Livelihood Mission (DAY-NRLM)",
    description: "Promoting self-employment through Self Help Groups for rural poor.",
    category: "Employment & Skills",
    eligibility: [
      "Rural poor households",
      "Women-focused (SHG formation)",
      "Priority to SC/ST/PwD/minorities"
    ],
    benefits: "SHG formation support, bank linkage, livelihood promotion, interest subvention",
    applicationLink: "https://nrlm.gov.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "mgnrega",
    name: "MGNREGA (100 Days Employment)",
    description: "100 days of guaranteed wage employment to rural households.",
    category: "Employment & Skills",
    eligibility: [
      "Adult members of rural households",
      "Willing to do unskilled manual work",
      "Job card holders"
    ],
    benefits: "100 days guaranteed employment, wages as per state rates, work near village",
    applicationLink: "https://nrega.nic.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "seekho-aur-kamao",
    name: "Seekho Aur Kamao (Learn and Earn)",
    description: "Skill development scheme for minority youth with placement support.",
    category: "Employment & Skills",
    eligibility: [
      "Minority community youth aged 14-35 years",
      "Minimum Class 5 passed",
      "Family income below ₹6 lakhs per annum"
    ],
    benefits: "Free skill training, stipend during training, 75% placement target",
    applicationLink: "https://www.minorityaffairs.gov.in/show_content.php?lang=1&level=2&ls_id=552&lid=505",
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "nai-roshni",
    name: "Nai Roshni (Leadership Development for Minority Women)",
    description: "Leadership development programme for women from minority communities.",
    category: "Employment & Skills",
    eligibility: [
      "Women aged 18-65 years from minority communities",
      "Rural and urban areas",
      "Priority to BPL families"
    ],
    benefits: "Leadership training, exposure visits, knowledge about rights and schemes",
    applicationLink: "https://www.minorityaffairs.gov.in/show_content.php?lang=1&level=2&ls_id=551&lid=504",
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "usttad",
    name: "USTTAD (Traditional Arts and Crafts)",
    description: "Upgrading skills and training in traditional arts and crafts for development.",
    category: "Employment & Skills",
    eligibility: [
      "Minority community artisans",
      "Traditional craft workers",
      "Youth interested in traditional crafts"
    ],
    benefits: "Skill training, market linkage, certification, toolkits",
    applicationLink: "https://www.minorityaffairs.gov.in/show_content.php?lang=1&level=2&ls_id=550&lid=503",
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "rozgar-mela",
    name: "Rozgar Mela (Employment Fairs)",
    description: "Job fairs organized to provide employment opportunities across sectors.",
    category: "Employment & Skills",
    eligibility: [
      "All job seekers",
      "Freshers and experienced candidates",
      "Various educational qualifications"
    ],
    benefits: "Direct recruitment opportunities, on-spot interviews, placement",
    applicationLink: "https://www.ncs.gov.in/",
    ministry: "Ministry of Labour and Employment"
  },
  {
    id: "national-career-service",
    name: "National Career Service Portal",
    description: "Online platform connecting job seekers with employers across India.",
    category: "Employment & Skills",
    eligibility: [
      "All job seekers",
      "Students and professionals",
      "Employers seeking candidates"
    ],
    benefits: "Free job matching, career counseling, skill assessment",
    applicationLink: "https://www.ncs.gov.in/",
    ministry: "Ministry of Labour and Employment"
  },
  {
    id: "jan-shikshan-sansthan",
    name: "Jan Shikshan Sansthan (Vocational Training)",
    description: "Vocational training for non-literates and school dropouts.",
    category: "Employment & Skills",
    eligibility: [
      "Non-literates and neo-literates aged 15-45 years",
      "School dropouts",
      "Priority to SC/ST/OBC/Minorities"
    ],
    benefits: "Free vocational training in 300+ trades, certification",
    applicationLink: "https://msde.gov.in/",
    ministry: "Ministry of Skill Development"
  },
  {
    id: "skill-hub",
    name: "Skill India Portal (Skill Hub Initiative)",
    description: "One-stop portal for all skill development information and registration.",
    category: "Employment & Skills",
    eligibility: [
      "All citizens seeking skill training",
      "Training providers",
      "Employers"
    ],
    benefits: "Access to training programs, certification, placement opportunities",
    applicationLink: "https://skillindia.gov.in/",
    ministry: "Ministry of Skill Development"
  },

  // =============== DISABILITY WELFARE SCHEMES ===============
  {
    id: "disability-adip",
    name: "ADIP Scheme (Assistance for Disabled Persons)",
    description: "Assistance for purchase/fitting of aids and appliances for persons with disabilities.",
    category: "Disability Welfare",
    eligibility: [
      "Person with 40% or more disability",
      "Monthly income not exceeding ₹20,000",
      "Indian citizen"
    ],
    benefits: "Free aids and appliances like hearing aids, wheelchairs, prosthetics, crutches",
    applicationLink: "https://disabilityaffairs.gov.in/content/page/adip.php",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "ddrs",
    name: "Deendayal Disabled Rehabilitation Scheme",
    description: "Support to NGOs for rehabilitation of persons with disabilities.",
    category: "Disability Welfare",
    eligibility: [
      "Persons with disabilities",
      "Through registered NGOs",
      "Various types of disabilities covered"
    ],
    benefits: "Special education, vocational training, therapy, day care centers",
    applicationLink: "https://disabilityaffairs.gov.in/content/page/ddrs.php",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "nhfdc-loans",
    name: "NHFDC Loans for Disabled",
    description: "Loans at concessional rates for self-employment and education of disabled persons.",
    category: "Disability Welfare",
    eligibility: [
      "Persons with 40% or more disability",
      "Age 18-60 years for self-employment loans",
      "Family income below ₹8 lakhs per annum"
    ],
    benefits: "Loans up to ₹25 lakhs for self-employment at 5-6% interest",
    applicationLink: "https://www.nhfdc.nic.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "disability-pension",
    name: "Indira Gandhi Disability Pension Scheme",
    description: "Pension for severely disabled persons from BPL families.",
    category: "Disability Welfare",
    eligibility: [
      "Persons with 80% or more disability",
      "Age 18-79 years",
      "BPL family"
    ],
    benefits: "₹300/month from Central Government + state contribution",
    applicationLink: "https://nsap.nic.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "accessible-india",
    name: "Accessible India Campaign (Sugamya Bharat)",
    description: "Making physical infrastructure, transport, and ICT accessible to disabled persons.",
    category: "Disability Welfare",
    eligibility: [
      "All persons with disabilities",
      "Focus on public buildings, transport",
      "Pan-India coverage"
    ],
    benefits: "Ramps, accessible toilets, sign boards, accessible websites",
    applicationLink: "https://disabilityaffairs.gov.in/content/page/accessible-india-campaign.php",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "disability-scholarship",
    name: "Pre-Matric and Post-Matric Scholarship for Disabled",
    description: "Scholarship for students with disabilities pursuing education.",
    category: "Disability Welfare",
    eligibility: [
      "Students with 40% or more disability",
      "Family income below ₹2.5 lakhs per annum",
      "Regular students in recognized institutions"
    ],
    benefits: "Scholarship of ₹500-₹1,200/month plus book grant",
    applicationLink: "https://scholarships.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "disability-udid",
    name: "Unique Disability ID (UDID) Card",
    description: "National database and unique ID for persons with disabilities.",
    category: "Disability Welfare",
    eligibility: [
      "All persons with disabilities",
      "Indian citizens",
      "Any level of disability"
    ],
    benefits: "Single document for availing benefits, easier access to schemes",
    applicationLink: "https://www.swavlambancard.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "early-intervention",
    name: "National Trust for Welfare of PwD - Early Intervention",
    description: "Early intervention and school readiness for children with autism, cerebral palsy, mental retardation.",
    category: "Disability Welfare",
    eligibility: [
      "Children aged 0-10 years with specified disabilities",
      "Family income below ₹2 lakhs per annum",
      "Through registered NGOs"
    ],
    benefits: "Therapy, special education, training for parents",
    applicationLink: "https://thenationaltrust.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "niramaya-health",
    name: "Niramaya Health Insurance for Disabled",
    description: "Affordable health insurance scheme for persons with autism, CP, MR, and multiple disabilities.",
    category: "Disability Welfare",
    eligibility: [
      "Persons with autism, cerebral palsy, mental retardation, multiple disabilities",
      "Registered with National Trust",
      "All age groups"
    ],
    benefits: "Health cover of ₹1 lakh at premium of ₹250-₹500",
    applicationLink: "https://thenationaltrust.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "vikaas-day-care",
    name: "Vikaas (Day Care)",
    description: "Day care services for persons with autism, CP, MR, and multiple disabilities.",
    category: "Disability Welfare",
    eligibility: [
      "Persons with autism, CP, MR, multiple disabilities",
      "Age above 10 years",
      "Family income below ₹2 lakhs per annum"
    ],
    benefits: "Day care, vocational training, therapeutic services",
    applicationLink: "https://thenationaltrust.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "samarth-residential",
    name: "Samarth (Residential Care)",
    description: "Residential care for persons with disabilities in need of family-like care.",
    category: "Disability Welfare",
    eligibility: [
      "Orphaned or abandoned PwD",
      "PwD with families unable to care",
      "Age above 18 years"
    ],
    benefits: "Residential accommodation, food, rehabilitation, recreation",
    applicationLink: "https://thenationaltrust.gov.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },

  // =============== SOCIAL SECURITY SCHEMES ===============
  {
    id: "nsap-old-age",
    name: "National Social Assistance Programme - Old Age Pension",
    description: "Monthly pension for destitute elderly persons.",
    category: "Pension & Retirement",
    eligibility: [
      "Age 60 years and above",
      "BPL household",
      "No regular means of subsistence"
    ],
    benefits: "₹200-₹500/month from Centre + state top-up (varies by state)",
    applicationLink: "https://nsap.nic.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "nsap-widow",
    name: "National Social Assistance Programme - Widow Pension",
    description: "Monthly pension for widows from BPL families.",
    category: "Women & Child Welfare",
    eligibility: [
      "Widows aged 40-79 years",
      "BPL household",
      "Not remarried"
    ],
    benefits: "₹300/month from Centre + state top-up",
    applicationLink: "https://nsap.nic.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "annapurna",
    name: "Annapurna Scheme",
    description: "Free foodgrains to destitute senior citizens who are not covered under NSAP.",
    category: "Energy & Welfare",
    eligibility: [
      "Senior citizens 65 years and above",
      "Destitute with no pension",
      "BPL families"
    ],
    benefits: "10 kg of foodgrains per month free of cost",
    applicationLink: "https://nsap.nic.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "pds",
    name: "Public Distribution System (Ration Card)",
    description: "Subsidized foodgrains through fair price shops for eligible families.",
    category: "Energy & Welfare",
    eligibility: [
      "All families based on income criteria",
      "Different categories: AAY, BPL, APL",
      "Linked with Aadhaar"
    ],
    benefits: "Subsidized rice, wheat, sugar, kerosene through ration shops",
    applicationLink: "https://nfsa.gov.in/",
    ministry: "Ministry of Consumer Affairs, Food and Public Distribution"
  },
  {
    id: "pm-garib-kalyan",
    name: "PM Garib Kalyan Anna Yojana",
    description: "Free foodgrains to all ration card holders during emergencies.",
    category: "Energy & Welfare",
    eligibility: [
      "All ration card holders under NFSA",
      "AAY and PHH families",
      "No additional registration"
    ],
    benefits: "Additional 5 kg free foodgrains per person per month",
    applicationLink: "https://nfsa.gov.in/",
    ministry: "Ministry of Consumer Affairs, Food and Public Distribution"
  },
  {
    id: "onorc",
    name: "One Nation One Ration Card",
    description: "Portability of ration card benefits across states for migrant workers.",
    category: "Energy & Welfare",
    eligibility: [
      "All NFSA beneficiaries",
      "Migrant workers",
      "Aadhaar-linked ration cards"
    ],
    benefits: "Access foodgrains from any Fair Price Shop in India",
    applicationLink: "https://impds.nic.in/",
    ministry: "Ministry of Consumer Affairs, Food and Public Distribution"
  },

  // =============== HOUSING & SANITATION SCHEMES ===============
  {
    id: "swachh-bharat-urban",
    name: "Swachh Bharat Mission (Urban)",
    description: "Achieving Open Defecation Free status and solid waste management in urban areas.",
    category: "Housing",
    eligibility: [
      "Urban areas and cities",
      "Households without toilets",
      "Urban Local Bodies"
    ],
    benefits: "₹12,000 for individual household toilet, waste management infrastructure",
    applicationLink: "https://swachhbharatmission.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
  },
  {
    id: "swachh-bharat-gramin",
    name: "Swachh Bharat Mission (Gramin)",
    description: "Achieving Open Defecation Free status and cleanliness in rural areas.",
    category: "Housing",
    eligibility: [
      "Rural households without toilets",
      "BPL and APL families",
      "All villages"
    ],
    benefits: "₹12,000 incentive for toilet construction",
    applicationLink: "https://swachhbharatmission.gov.in/sbmg/",
    ministry: "Ministry of Jal Shakti"
  },
  {
    id: "jal-jeevan",
    name: "Jal Jeevan Mission",
    description: "Providing tap water connection to every rural household by 2024.",
    category: "Energy & Welfare",
    eligibility: [
      "All rural households",
      "Priority to SC/ST hamlets, schools, Anganwadis",
      "No income criteria"
    ],
    benefits: "Functional Household Tap Connection (FHTC) with 55 litres per capita per day",
    applicationLink: "https://jaljeevanmission.gov.in/",
    ministry: "Ministry of Jal Shakti"
  },
  {
    id: "amrut",
    name: "AMRUT 2.0 (Urban Water and Sanitation)",
    description: "Water supply, sewerage, urban transport, and green spaces in cities.",
    category: "Housing",
    eligibility: [
      "500+ cities and towns",
      "All urban households",
      "Focus on water security"
    ],
    benefits: "Universal water supply coverage, sewerage in large cities",
    applicationLink: "https://mohua.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
  },
  {
    id: "smart-cities",
    name: "Smart Cities Mission",
    description: "Developing 100 smart cities with sustainable and inclusive infrastructure.",
    category: "Housing",
    eligibility: [
      "Selected 100 cities",
      "Citizens of smart cities",
      "Focus on technology and infrastructure"
    ],
    benefits: "Smart infrastructure, e-governance, sustainable development",
    applicationLink: "https://smartcities.gov.in/",
    ministry: "Ministry of Housing and Urban Affairs"
  },

  // =============== TRANSPORT & INFRASTRUCTURE SCHEMES ===============
  {
    id: "pm-gram-sadak",
    name: "Pradhan Mantri Gram Sadak Yojana",
    description: "Connecting rural habitations with all-weather roads.",
    category: "Housing",
    eligibility: [
      "Unconnected rural habitations",
      "Population above 500 (plains) or 250 (hills)",
      "No income criteria"
    ],
    benefits: "All-weather road connectivity to villages",
    applicationLink: "https://pmgsy.nic.in/",
    ministry: "Ministry of Rural Development"
  },
  {
    id: "bharatmala",
    name: "Bharatmala Pariyojana",
    description: "Development of National Highway corridors and expressways.",
    category: "Housing",
    eligibility: [
      "National and state highways",
      "Economic corridors",
      "Border and coastal roads"
    ],
    benefits: "Better connectivity, reduced travel time, economic development",
    applicationLink: "https://morth.nic.in/",
    ministry: "Ministry of Road Transport and Highways"
  },
  {
    id: "sagar-mala",
    name: "Sagarmala (Port-Led Development)",
    description: "Port modernization and port-linked industrial development.",
    category: "Housing",
    eligibility: [
      "Coastal communities",
      "Port cities",
      "Maritime sector businesses"
    ],
    benefits: "Port development, coastal employment, industrial zones",
    applicationLink: "https://sagarmala.gov.in/",
    ministry: "Ministry of Ports, Shipping and Waterways"
  },
  {
    id: "udan",
    name: "UDAN (Ude Desh Ka Aam Nagrik)",
    description: "Affordable air connectivity to smaller cities and towns.",
    category: "Housing",
    eligibility: [
      "All citizens",
      "Tier 2 and Tier 3 cities",
      "Underserved airports"
    ],
    benefits: "Air fares capped at ₹2,500 for 1-hour flights",
    applicationLink: "https://www.aa.gov.in/",
    ministry: "Ministry of Civil Aviation"
  },

  // =============== DIGITAL INDIA SCHEMES ===============
  {
    id: "digital-india",
    name: "Digital India Programme",
    description: "Transforming India into a digitally empowered society and knowledge economy.",
    category: "Employment & Skills",
    eligibility: [
      "All citizens",
      "Government departments",
      "Businesses and startups"
    ],
    benefits: "Digital infrastructure, e-governance, digital literacy",
    applicationLink: "https://www.digitalindia.gov.in/",
    ministry: "Ministry of Electronics and IT"
  },
  {
    id: "pmgdisha",
    name: "Pradhan Mantri Gramin Digital Saksharta Abhiyan",
    description: "Making 6 crore rural households digitally literate.",
    category: "Employment & Skills",
    eligibility: [
      "One person per rural household",
      "Age 14-60 years",
      "Not already digitally literate"
    ],
    benefits: "Free digital literacy training, certification",
    applicationLink: "https://www.pmgdisha.in/",
    ministry: "Ministry of Electronics and IT"
  },
  {
    id: "csc",
    name: "Common Service Centers (CSC)",
    description: "Access points for government services in rural and remote areas.",
    category: "Employment & Skills",
    eligibility: [
      "All citizens",
      "Rural and urban areas",
      "Entrepreneurs for running CSCs"
    ],
    benefits: "300+ government services at doorstep, banking, bill payment",
    applicationLink: "https://csc.gov.in/",
    ministry: "Ministry of Electronics and IT"
  },
  {
    id: "bhashini",
    name: "Bhashini (Language Translation)",
    description: "AI-based language translation for breaking language barriers.",
    category: "Employment & Skills",
    eligibility: [
      "All citizens",
      "Available in 22 Indian languages",
      "Free access"
    ],
    benefits: "Real-time translation, voice to text, text to voice",
    applicationLink: "https://bhashini.gov.in/",
    ministry: "Ministry of Electronics and IT"
  },
  {
    id: "digilocker",
    name: "DigiLocker",
    description: "Cloud-based platform for storage and sharing of documents.",
    category: "Employment & Skills",
    eligibility: [
      "All citizens with Aadhaar",
      "Free service",
      "Paperless governance"
    ],
    benefits: "Secure document storage, issued documents from govt, sharing",
    applicationLink: "https://www.digilocker.gov.in/",
    ministry: "Ministry of Electronics and IT"
  },
  {
    id: "umang",
    name: "UMANG App (Unified Mobile Application)",
    description: "Single platform for accessing multiple government services on mobile.",
    category: "Employment & Skills",
    eligibility: [
      "All citizens with smartphone",
      "Free download and use",
      "Available in 13 languages"
    ],
    benefits: "1,600+ services from 300+ departments in one app",
    applicationLink: "https://web.umang.gov.in/",
    ministry: "Ministry of Electronics and IT"
  },

  // =============== DEFENCE & VETERANS SCHEMES ===============
  {
    id: "agnipath",
    name: "Agnipath Scheme",
    description: "Short-term recruitment in Armed Forces for youth as Agniveers.",
    category: "Employment & Skills",
    eligibility: [
      "Indian citizens aged 17.5-21 years",
      "Unmarried males and females",
      "Educational qualification as per service"
    ],
    benefits: "4-year engagement, Seva Nidhi of ₹11.71 lakhs, preference in jobs after service",
    applicationLink: "https://www.joinindianarmy.nic.in/",
    ministry: "Ministry of Defence"
  },
  {
    id: "echs",
    name: "Ex-Servicemen Contributory Health Scheme (ECHS)",
    description: "Healthcare for ex-servicemen and their dependents.",
    category: "Healthcare",
    eligibility: [
      "Ex-servicemen of Armed Forces",
      "Dependent family members",
      "One-time contribution required"
    ],
    benefits: "Comprehensive healthcare at empanelled hospitals and polyclinics",
    applicationLink: "https://echs.gov.in/",
    ministry: "Ministry of Defence"
  },
  {
    id: "pmla-defence",
    name: "Prime Minister's Scholarship for Defence Personnel",
    description: "Scholarship for children and widows of ex-servicemen.",
    category: "Education",
    eligibility: [
      "Wards and widows of ex/serving defence personnel",
      "Professional degree courses",
      "Minimum 60% marks in qualifying exam"
    ],
    benefits: "₹2,500-₹3,000/month for professional courses",
    applicationLink: "https://ksb.gov.in/",
    ministry: "Ministry of Defence"
  },

  // =============== SC/ST WELFARE SCHEMES ===============
  {
    id: "venture-capital-sc",
    name: "Venture Capital Fund for SC Entrepreneurs",
    description: "Venture capital for SC entrepreneurs to start or expand businesses.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "SC entrepreneurs",
      "Startups and businesses",
      "Scalable business model"
    ],
    benefits: "Equity funding up to ₹15 crores, mentorship support",
    applicationLink: "https://ifci.nic.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "nsfdc-loans",
    name: "NSFDC Loans for Scheduled Castes",
    description: "Concessional loans for income-generating activities for SC families.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Scheduled Caste families",
      "Family income below poverty line",
      "For self-employment activities"
    ],
    benefits: "Loans up to ₹20 lakhs at 6% interest for various activities",
    applicationLink: "https://nsfdc.nic.in/",
    ministry: "Ministry of Social Justice and Empowerment"
  },
  {
    id: "nstfdc-loans",
    name: "NSTFDC Loans for Scheduled Tribes",
    description: "Financial assistance for income-generating schemes for ST families.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Scheduled Tribe families",
      "Below Double the Poverty Line",
      "For various livelihood activities"
    ],
    benefits: "Loans at 4-6% interest for agriculture, small business, education",
    applicationLink: "https://nstfdc.nic.in/",
    ministry: "Ministry of Tribal Affairs"
  },
  {
    id: "vanbandhu-kalyan",
    name: "Vanbandhu Kalyan Yojana",
    description: "Holistic development of tribal populations in forest and tribal areas.",
    category: "Employment & Skills",
    eligibility: [
      "Tribal populations",
      "Tribal areas",
      "Focus on forest dwellers"
    ],
    benefits: "Livelihood, health, education, connectivity, housing support",
    applicationLink: "https://tribal.nic.in/schemes.aspx",
    ministry: "Ministry of Tribal Affairs"
  },
  {
    id: "stand-up-india-sc",
    name: "Stand Up India for SC/ST",
    description: "Bank loans for SC/ST entrepreneurs to start greenfield enterprises.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "SC/ST entrepreneurs above 18 years",
      "First-time entrepreneurs",
      "Greenfield enterprise in manufacturing, services, or trading"
    ],
    benefits: "Composite loan of ₹10 lakhs to ₹1 crore",
    applicationLink: "https://www.standupmitra.in/",
    ministry: "Ministry of Finance"
  },

  // =============== MINORITY WELFARE SCHEMES ===============
  {
    id: "hunar-haat",
    name: "Hunar Haat (Skill Exhibition)",
    description: "Platform for minority artisans to showcase and sell their products.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Minority community artisans",
      "Traditional craft workers",
      "Small entrepreneurs"
    ],
    benefits: "Free stalls, marketing platform, direct customer access",
    applicationLink: "https://hunarhaat.org/",
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "nmdfc-loans",
    name: "NMDFC Loans for Minorities",
    description: "Concessional loans for economic activities of minorities.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Minority community members (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)",
      "Family income below poverty line",
      "For self-employment"
    ],
    benefits: "Loans up to ₹20 lakhs at low interest for various trades",
    applicationLink: "https://nmdfc.org/",
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "padho-pardesh",
    name: "Padho Pardesh (Study Abroad for Minorities)",
    description: "Interest subsidy on education loan for studying abroad.",
    category: "Education",
    eligibility: [
      "Minority students for masters/PhD abroad",
      "Family income below ₹6 lakhs per annum",
      "Secured admission in recognized institution"
    ],
    benefits: "100% interest subsidy during moratorium period",
    applicationLink: "https://www.minorityaffairs.gov.in/show_content.php?lang=1&level=2&ls_id=548&lid=501",
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "jiyo-parsi",
    name: "Jiyo Parsi Scheme",
    description: "Measures to increase the population of Parsi community in India.",
    category: "Healthcare",
    eligibility: [
      "Parsi couples",
      "Facing fertility issues",
      "Indian citizens"
    ],
    benefits: "Financial assistance for fertility treatments, medical support",
    applicationLink: "https://www.minorityaffairs.gov.in/show_content.php?lang=1&level=2&ls_id=564&lid=515",
    ministry: "Ministry of Minority Affairs"
  },

  // =============== SPORTS SCHEMES ===============
  {
    id: "khelo-india",
    name: "Khelo India (Sports Development)",
    description: "Reviving sports culture at grassroots level with scholarships for athletes.",
    category: "Education",
    eligibility: [
      "Young athletes aged 8-18 years",
      "Talent identified through competitions",
      "All sports disciplines"
    ],
    benefits: "Annual scholarship of ₹5 lakhs for 8 years, training, equipment",
    applicationLink: "https://kheloindia.gov.in/",
    ministry: "Ministry of Youth Affairs and Sports"
  },
  {
    id: "tops",
    name: "Target Olympic Podium Scheme (TOPS)",
    description: "Support to potential Olympic and Paralympic medal winners.",
    category: "Education",
    eligibility: [
      "Athletes with Olympic/Paralympic medal potential",
      "Top ranked in their sport",
      "Selection by committee"
    ],
    benefits: "Customized training, international exposure, equipment, coaching",
    applicationLink: "https://sportsauthorityofindia.gov.in/",
    ministry: "Ministry of Youth Affairs and Sports"
  },
  {
    id: "fit-india",
    name: "Fit India Movement",
    description: "Nationwide fitness movement encouraging physical activity.",
    category: "Healthcare",
    eligibility: [
      "All citizens",
      "Schools, colleges, organizations",
      "No registration required"
    ],
    benefits: "Fitness programs, awareness campaigns, Fit India certification",
    applicationLink: "https://fitindia.gov.in/",
    ministry: "Ministry of Youth Affairs and Sports"
  },

  // =============== SCIENCE & TECHNOLOGY SCHEMES ===============
  {
    id: "dst-inspire-faculty",
    name: "DST INSPIRE Faculty Scheme",
    description: "Contractual positions for young scientists with assured research funding.",
    category: "Education",
    eligibility: [
      "PhD holders below 32 years",
      "Research publications in international journals",
      "Indian citizens and OCI"
    ],
    benefits: "₹1.25 lakhs/month fellowship + ₹7 lakhs annual research grant for 5 years",
    applicationLink: "https://online-inspire.gov.in/",
    ministry: "Department of Science and Technology"
  },
  {
    id: "serb-grants",
    name: "SERB Research Grants",
    description: "Funding for research projects across science and engineering disciplines.",
    category: "Education",
    eligibility: [
      "Faculty members in recognized institutions",
      "PhD holders with research experience",
      "Indian citizens"
    ],
    benefits: "Research grants for core research, equipment, manpower",
    applicationLink: "https://serbonline.in/",
    ministry: "Department of Science and Technology"
  },
  {
    id: "atal-tinkering",
    name: "Atal Tinkering Labs",
    description: "Fostering curiosity and innovation in young minds through tinkering labs in schools.",
    category: "Education",
    eligibility: [
      "Schools (government and private)",
      "Classes 6-12",
      "Valid affiliation with education boards"
    ],
    benefits: "₹20 lakhs grant for establishing labs, equipment, training",
    applicationLink: "https://aim.gov.in/",
    ministry: "NITI Aayog"
  },
  {
    id: "innovation-startup",
    name: "Atal Innovation Mission",
    description: "Creating innovation and entrepreneurship ecosystem across the country.",
    category: "Business & Entrepreneurship",
    eligibility: [
      "Startups, innovators, students",
      "Educational institutions",
      "Corporate and government organizations"
    ],
    benefits: "Tinkering labs, incubation centers, challenges, mentorship",
    applicationLink: "https://aim.gov.in/",
    ministry: "NITI Aayog"
  },

  // =============== ENVIRONMENTAL SCHEMES ===============
  {
    id: "national-clean-air",
    name: "National Clean Air Programme",
    description: "Reducing air pollution levels in identified non-attainment cities.",
    category: "Energy & Welfare",
    eligibility: [
      "131 non-attainment cities",
      "Citizens of polluted cities",
      "Focus on PM10 and PM2.5 reduction"
    ],
    benefits: "Cleaner air, health benefits, monitoring infrastructure",
    applicationLink: "https://cpcb.nic.in/",
    ministry: "Ministry of Environment, Forest and Climate Change"
  },
  {
    id: "namami-gange",
    name: "Namami Gange (River Rejuvenation)",
    description: "Rejuvenation of River Ganga and its tributaries.",
    category: "Energy & Welfare",
    eligibility: [
      "Communities along Ganga and tributaries",
      "States in Ganga basin",
      "No individual eligibility"
    ],
    benefits: "Cleaner river, sewage treatment, ghats development, biodiversity conservation",
    applicationLink: "https://nmcg.nic.in/",
    ministry: "Ministry of Jal Shakti"
  },
  {
    id: "compensatory-afforestation",
    name: "Compensatory Afforestation Fund (CAMPA)",
    description: "Funds for afforestation and forest conservation activities.",
    category: "Agriculture",
    eligibility: [
      "State Forest Departments",
      "Forest-dependent communities",
      "Gram Sabhas in forest areas"
    ],
    benefits: "Afforestation, forest management, wildlife protection, employment for tribals",
    applicationLink: "https://campa.gov.in/",
    ministry: "Ministry of Environment, Forest and Climate Change"
  },
  {
    id: "green-india-mission",
    name: "National Mission for a Green India",
    description: "Increasing forest cover and improving ecosystem services.",
    category: "Agriculture",
    eligibility: [
      "Forest and tree cover areas",
      "Degraded forest lands",
      "Community participation"
    ],
    benefits: "Afforestation, restoration of degraded forests, agroforestry",
    applicationLink: "https://moef.gov.in/en/division/forest-divisions/green-india-mission/",
    ministry: "Ministry of Environment, Forest and Climate Change"
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
