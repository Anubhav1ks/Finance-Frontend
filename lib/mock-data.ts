export interface Internship {
  id: string
  title: string
  company: string
  location: string
  mode: "Remote" | "Onsite" | "Hybrid"
  stipend: number | null
  duration: string
  category: string
  description: string
  requirements: string[]
  skills: string[]
  software: string[]
  certifications: string[]
  isPaid: boolean
  postedDate: string
}

export const categories = [
  { name: "Audit", icon: "📊", count: 28 },
  { name: "Tax", icon: "💰", count: 22 },
  { name: "FP&A", icon: "📈", count: 19 },
  { name: "Risk & Compliance", icon: "🛡️", count: 15 },
  { name: "Corporate Finance", icon: "🏢", count: 18 },
  { name: "FinTech", icon: "💳", count: 18 },
]

export const mockInternships: Internship[] = [
  {
    id: "1",
    title: "Audit Intern",
    company: "Deloitte",
    location: "London, UK",
    mode: "Hybrid",
    stipend: 1200,
    duration: "3 months",
    category: "Audit",
    description:
      "Join our audit team to gain hands-on experience in financial statement audits, internal controls testing, and client engagement. You will work alongside experienced professionals on real client projects.",
    requirements: [
      "Currently pursuing a degree in Accounting, Finance, or related field",
      "Strong analytical and problem-solving skills",
      "Excellent attention to detail",
      "Good communication skills",
    ],
    skills: ["Financial Analysis", "Excel", "Attention to Detail", "Communication"],
    software: ["Excel", "SAP", "Audit Software"],
    certifications: ["ACCA (pursuing)", "ACA (pursuing)"],
    isPaid: true,
    postedDate: "2025-10-10",
  },
  {
    id: "2",
    title: "Tax Advisory Intern",
    company: "PwC",
    location: "Manchester, UK",
    mode: "Onsite",
    stipend: 1100,
    duration: "6 months",
    category: "Tax",
    description:
      "Support our tax advisory team in providing tax planning and compliance services to corporate clients. Gain exposure to UK tax regulations and international tax matters.",
    requirements: [
      "Studying towards ACCA, ACA, or CTA qualification",
      "Interest in taxation and tax law",
      "Strong numerical skills",
      "Ability to work in a team",
    ],
    skills: ["Tax Law", "Research", "Excel", "Client Service"],
    software: ["Excel", "Tax Software", "CCH"],
    certifications: ["CTA (pursuing)", "ACCA"],
    isPaid: true,
    postedDate: "2025-10-08",
  },
  {
    id: "3",
    title: "Financial Planning & Analysis Intern",
    company: "HSBC",
    location: "Birmingham, UK",
    mode: "Hybrid",
    stipend: 1000,
    duration: "4 months",
    category: "FP&A",
    description:
      "Work with our FP&A team to support budgeting, forecasting, and financial modeling activities. Develop skills in data analysis and financial reporting.",
    requirements: [
      "Undergraduate or postgraduate student in Finance or Accounting",
      "Proficiency in Excel and financial modeling",
      "Strong analytical mindset",
      "Interest in corporate finance",
    ],
    skills: ["Financial Modeling", "Excel", "Data Analysis", "Forecasting"],
    software: ["Excel", "Power BI", "SAP"],
    certifications: ["CFA (pursuing)", "CIMA"],
    isPaid: true,
    postedDate: "2025-10-12",
  },
  {
    id: "4",
    title: "Risk Management Intern",
    company: "Barclays",
    location: "London, UK",
    mode: "Onsite",
    stipend: 1300,
    duration: "3 months",
    category: "Risk & Compliance",
    description:
      "Join our risk management team to learn about credit risk, market risk, and operational risk frameworks. Assist in risk assessment and reporting activities.",
    requirements: [
      "Studying Finance, Economics, or related field",
      "Understanding of financial markets",
      "Analytical and quantitative skills",
      "Attention to detail",
    ],
    skills: ["Risk Analysis", "Excel", "Quantitative Analysis", "Reporting"],
    software: ["Excel", "Risk Management Systems", "Bloomberg"],
    certifications: ["FRM (pursuing)", "CFA"],
    isPaid: true,
    postedDate: "2025-10-09",
  },
  {
    id: "5",
    title: "Corporate Finance Intern",
    company: "Goldman Sachs",
    location: "London, UK",
    mode: "Onsite",
    stipend: 1500,
    duration: "10 weeks",
    category: "Corporate Finance",
    description:
      "Gain exposure to M&A transactions, financial modeling, and client presentations. Work on live deals and develop your understanding of corporate finance.",
    requirements: [
      "Top-tier university student in Finance or Economics",
      "Strong academic record",
      "Advanced Excel and PowerPoint skills",
      "Passion for investment banking",
    ],
    skills: ["Financial Modeling", "Valuation", "Excel", "PowerPoint"],
    software: ["Excel", "PowerPoint", "Bloomberg", "Capital IQ"],
    certifications: ["CFA (pursuing)"],
    isPaid: true,
    postedDate: "2025-10-11",
  },
  {
    id: "6",
    title: "FinTech Product Intern",
    company: "Revolut",
    location: "Remote",
    mode: "Remote",
    stipend: 900,
    duration: "6 months",
    category: "FinTech",
    description:
      "Work with our product team to develop innovative financial technology solutions. Gain experience in product management, user research, and agile development.",
    requirements: [
      "Interest in financial technology and innovation",
      "Basic understanding of financial products",
      "Strong communication skills",
      "Tech-savvy and adaptable",
    ],
    skills: ["Product Management", "User Research", "Agile", "Communication"],
    software: ["Jira", "Figma", "Excel", "SQL"],
    certifications: [],
    isPaid: true,
    postedDate: "2025-10-13",
  },
  {
    id: "7",
    title: "Internal Audit Intern",
    company: "EY",
    location: "Edinburgh, UK",
    mode: "Hybrid",
    stipend: 1050,
    duration: "3 months",
    category: "Audit",
    description:
      "Support internal audit engagements across various industries. Learn about risk assessment, control testing, and audit reporting.",
    requirements: [
      "Pursuing accounting or finance degree",
      "Strong analytical skills",
      "Good written and verbal communication",
      "Team player",
    ],
    skills: ["Audit", "Risk Assessment", "Excel", "Communication"],
    software: ["Excel", "ACL", "Audit Management Software"],
    certifications: ["ACCA", "CIA (pursuing)"],
    isPaid: true,
    postedDate: "2025-10-07",
  },
  {
    id: "8",
    title: "Transfer Pricing Intern",
    company: "KPMG",
    location: "London, UK",
    mode: "Onsite",
    stipend: 1150,
    duration: "4 months",
    category: "Tax",
    description:
      "Assist in transfer pricing documentation and analysis for multinational clients. Gain exposure to international tax and transfer pricing regulations.",
    requirements: [
      "Economics, Finance, or Accounting student",
      "Interest in international taxation",
      "Strong research and analytical skills",
      "Proficiency in Excel",
    ],
    skills: ["Transfer Pricing", "Research", "Excel", "Analysis"],
    software: ["Excel", "Transfer Pricing Software"],
    certifications: ["ACCA", "CTA"],
    isPaid: true,
    postedDate: "2025-10-06",
  },
]

export function getInternshipById(id: string): Internship | undefined {
  return mockInternships.find((internship) => internship.id === id)
}

export function getRelatedInternships(currentId: string, category: string, limit = 3): Internship[] {
  return mockInternships
    .filter((internship) => internship.id !== currentId && internship.category === category)
    .slice(0, limit)
}
