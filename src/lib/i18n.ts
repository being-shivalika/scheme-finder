export type Language = 'en' | 'hi';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.browse": "Browse Schemes",
    "nav.find": "Find Your Schemes",
    "nav.foryou": "For You",
    "nav.check": "Check Eligibility",
    
    // Landing Page
    "hero.powered": "Powered by Google Gemini AI",
    "hero.title1": "Discover Government Schemes",
    "hero.title2": "You Deserve",
    "hero.desc": "Millions of Indians miss out on government benefits simply because they don't know about them. Find schemes tailored to your profile in minutes.",
    "hero.cta.check": "Check Your Eligibility",
    "hero.cta.browse": "Browse All Schemes",
    
    // User Profile Form
    "form.title": "Tell Us About Yourself",
    "form.desc": "Enter your details to find government schemes you may be eligible for",
    "form.age": "Age (years)",
    "form.gender": "Gender",
    "form.state": "State / UT",
    "form.category": "Category",
    "form.income": "Annual Family Income (₹)",
    "form.occupation": "Occupation",
    "form.education": "Highest Education",
    "form.degree": "Career Degree / Course Pursuing (Optional)",
    "form.additional": "Additional Information",
    "form.disabled": "Person with Disability",
    "form.minority": "Minority Community",
    "form.bpl": "Below Poverty Line (BPL)",
    "form.submit": "Find Matching Schemes",
    "form.loading": "Finding Your Schemes...",
    
    // For You Dashboard
    "foryou.title": "For You Dashboard",
    "foryou.desc": "Your personalized collection of government schemes based on your profile.",
    "foryou.recommended": "Recommended",
    "foryou.saved": "Saved",
    "foryou.applied": "Applied",
  },
  hi: {
    // Header
    "nav.home": "मुख्य पृष्ठ",
    "nav.browse": "योजनाएं खोजें",
    "nav.find": "अपनी योजनाएं खोजें",
    "nav.foryou": "आपके लिए",
    "nav.check": "पात्रता जांचें",
    
    // Landing Page
    "hero.powered": "Google Gemini AI द्वारा संचालित",
    "hero.title1": "खोजें सरकारी योजनाएं",
    "hero.title2": "जिनके आप हकदार हैं",
    "hero.desc": "लाखों भारतीय सरकारी लाभों से वंचित रह जाते हैं क्योंकि उन्हें उनके बारे में पता नहीं होता। कुछ ही मिनटों में अपनी प्रोफाइल के अनुसार योजनाएं खोजें।",
    "hero.cta.check": "अपनी पात्रता जांचें",
    "hero.cta.browse": "सभी योजनाएं देखें",
    
    // User Profile Form
    "form.title": "अपने बारे में बताएं",
    "form.desc": "सरकारी योजनाएं खोजने के लिए अपना विवरण दर्ज करें",
    "form.age": "आयु (वर्ष)",
    "form.gender": "लिंग",
    "form.state": "राज्य / केंद्र शासित प्रदेश",
    "form.category": "श्रेणी",
    "form.income": "वार्षिक पारिवारिक आय (₹)",
    "form.occupation": "व्यवसाय",
    "form.education": "उच्चतम शिक्षा",
    "form.degree": "करियर डिग्री / कोर्स (वैकल्पिक)",
    "form.additional": "अतिरिक्त जानकारी",
    "form.disabled": "दिव्यांग व्यक्ति",
    "form.minority": "अल्पसंख्यक समुदाय",
    "form.bpl": "गरीबी रेखा से नीचे (BPL)",
    "form.submit": "मिलान वाली योजनाएं खोजें",
    "form.loading": "आपकी योजनाएं खोजी जा रही हैं...",
    
    // For You Dashboard
    "foryou.title": "आपके लिए डैशबोर्ड",
    "foryou.desc": "आपकी प्रोफाइल पर आधारित सरकारी योजनाओं का व्यक्तिगत संग्रह।",
    "foryou.recommended": "सुझाई गई",
    "foryou.saved": "सहेजी गई",
    "foryou.applied": "आवेदन की गई",
  }
};
