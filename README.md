# SchemeSetu: Bridging Citizens to Benefits

> **Team QuantumBits** | *Hackathon Submission*

![Project Status](https://img.shields.io/badge/Status-Prototype-orange)
![AI Powered](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-blue)

## Abstract
**SchemeSetu** (Scheme Bridge) is an AI-powered platform designed to simplify the discovery of government schemes. In a country with thousands of welfare programs, finding the right one is often complicated by bureaucratic jargon and complex eligibility criteria. SchemeSetu uses **Google Gemini 2.5 Flash** to intelligently analyze user demographics and instantly match them with the schemes they deserve.

 **[View Live Prototype](https://schemesetu-quantumbits.lovable.app/)**

---

##  The Problem
- **Information Overload:** Citizens are overwhelmed by scattered information across multiple government portals.
- **Complex Eligibility:** Understanding criteria like "EWS," "BPL," or specific demographic mandates is difficult for the average user.
- **Low Discovery:** Many eligible citizens miss out on benefits simply because they don't know they qualify.

## The Solution
SchemeSetu acts as an intelligent intermediary. Instead of searching for schemes, the user tells us about themselves, and our AI agent finds the matches.

### Key Features
- **Personalized Matching:** Uses semantic reasoning to match users based on age, income, occupation, and location.
- **Instant Results:** Powered by Gemini 2.5 Flash for low-latency, real-time responses.
- **Simplified Explanations:** "Why am I eligible?" tags explain complex rules in simple English.
- **Responsive Design:** Mobile-first interface built for accessibility.

---

##  How It Works (AI Integration)
We utilize **Google Gemini 2.5 Flash** not just as a search engine, but as a **reasoning engine**.

1.  **Data Capture:** The frontend collects user attributes (e.g., *21-year-old female student, rural area, <2L income*).
2.  **Contextual Prompting:** This data is sent to Gemini with a system instruction to act as a "Government Scheme Expert."
3.  **Logical Inference:** The model analyzes the profile against known scheme criteria. It understands nuance—for example, that a "farming family" might qualify for *PM-KISAN* even if the user didn't explicitly search for "agriculture."
4.  **Structured Response:** The AI returns data in JSON format, allowing us to render clean, interactive UI cards.

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **UI Components:** Shadcn UI, Lucide React
- **AI Model:** Google Gemini 2.5 Flash
---

## Screenshots 

<img width="2842" height="1350" alt="image" src="https://github.com/user-attachments/assets/2959470b-632d-4f4a-ad83-cdda2617f327" />
<img width="2845" height="1341" alt="image" src="https://github.com/user-attachments/assets/da5c430d-3803-44e2-9d4f-5d3deae3704a" />
<img width="2845" height="1337" alt="image" src="https://github.com/user-attachments/assets/fa76cb04-7b76-4c0f-82ac-ad75d56961cc" />

---

##  Future Roadmap
- [ ] **Multilingual Support:** Voice-based interaction in regional languages (Hindi, Punjabi, Tamil).
- [ ] **Secure User Data Handling:** Maintains user privacy with secure authentication and storage.
- [ ] **Admin Management Panel:** Allows easy scheme management and system monitoring.
- [ ] **Application Assistant:** AI agent to help fill out the actual government forms.

---

##  Team QuantumBits
- **Navjot Singh** 
- **Sanyam Mehta**
- **Tarun Khurana**
- **Shagun**

---

*Built with ❤️ for a better India.*
