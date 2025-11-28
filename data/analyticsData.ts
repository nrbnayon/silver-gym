// data/analyticsData.ts
import {
  MemberStats,
  MonthlyFinancialData,
  CostAnalyticsData,
  PackagesAnalyticsData,
  FinancialsCompareData,
  ComparisonOption,
} from "@/types/analytics";

// Member Analytics Data
export const memberAnalyticsData: MemberStats = {
  totalMembers: 2364,
  totalMembersUnit: "/Person",
  totalMembersDescription: "Total overall number of registered members in your gym",
  newAdmissions: 2364,
  newAdmissionsUnit: "/Person",
  newAdmissionsDescription: "Members who joined during the current month",
  activeMembers: 2364,
  activeMembersUnit: "/Person",
  activeMembersDescription: "Members with valid packages and ongoing gym access",
  admissionChart: [
    { month: "May", value: 8458 },
    { month: "Jun", value: 5789 },
    { month: "Jul", value: 6234 },
    { month: "Aug", value: 7890 },
    { month: "Sep", value: 6543 },
    { month: "Oct", value: 5234 },
  ],
  admissionChartPeriod: "Last six month",
};

// Financial Analytics Data
const generateFinancialData = (
  startDate: string,
  days: number
): { period: string; income: number; expense: number }[] => {
  const data = [];
  const baseIncome = 5000000;
  const baseExpense = 2000000;

  for (let i = 1; i <= days; i++) {
    data.push({
      period: `${startDate.split(" ")[0]} ${i}`,
      income: baseIncome + Math.random() * 1000000,
      expense: baseExpense + Math.random() * 500000,
    });
  }
  return data;
};

export const financialAnalyticsData: Record<string, MonthlyFinancialData> = {
  "All Months": {
    month: "All Months",
    data: generateFinancialData("Jan 2025", 30),
    metrics: {
      totalIncome: "25,25,515 TK",
      totalExpense: "13,74,645 TK",
      totalNetIncome: "2,25,515 TK",
      incomeChange: "+12.3%",
      expenseChange: "-0.8%",
      netIncomeChange: "+12.7%",
    },
  },
  January: {
    month: "January",
    data: generateFinancialData("Jan 2025", 30),
    metrics: {
      totalIncome: "25,25,515 TK",
      totalExpense: "13,74,645 TK",
      totalNetIncome: "2,25,515 TK",
      incomeChange: "+12.3%",
      expenseChange: "-0.8%",
      netIncomeChange: "+12.7%",
    },
  },
  February: {
    month: "February",
    data: generateFinancialData("Feb 2025", 28),
    metrics: {
      totalIncome: "23,15,420 TK",
      totalExpense: "12,84,320 TK",
      totalNetIncome: "2,31,100 TK",
      incomeChange: "+10.5%",
      expenseChange: "-1.2%",
      netIncomeChange: "+11.8%",
    },
  },
  March: {
    month: "March",
    data: generateFinancialData("Mar 2025", 31),
    metrics: {
      totalIncome: "26,45,680 TK",
      totalExpense: "14,23,540 TK",
      totalNetIncome: "2,22,140 TK",
      incomeChange: "+14.2%",
      expenseChange: "+0.5%",
      netIncomeChange: "+13.4%",
    },
  },
  April: {
    month: "April",
    data: generateFinancialData("Apr 2025", 30),
    metrics: {
      totalIncome: "24,88,920 TK",
      totalExpense: "13,45,780 TK",
      totalNetIncome: "2,43,140 TK",
      incomeChange: "+9.8%",
      expenseChange: "-2.1%",
      netIncomeChange: "+15.2%",
    },
  },
  May: {
    month: "May",
    data: generateFinancialData("May 2025", 31),
    metrics: {
      totalIncome: "27,12,340 TK",
      totalExpense: "14,56,890 TK",
      totalNetIncome: "2,55,450 TK",
      incomeChange: "+15.6%",
      expenseChange: "+1.8%",
      netIncomeChange: "+16.8%",
    },
  },
  June: {
    month: "June",
    data: generateFinancialData("Jun 2025", 30),
    metrics: {
      totalIncome: "25,25,515 TK",
      totalExpense: "13,74,645 TK",
      totalNetIncome: "2,25,515 TK",
      incomeChange: "+12.3%",
      expenseChange: "-0.8%",
      netIncomeChange: "+12.7%",
    },
  },
  July: {
    month: "July",
    data: generateFinancialData("Jul 2025", 31),
    metrics: {
      totalIncome: "28,34,670 TK",
      totalExpense: "15,12,340 TK",
      totalNetIncome: "2,22,330 TK",
      incomeChange: "+18.2%",
      expenseChange: "+2.3%",
      netIncomeChange: "+14.5%",
    },
  },
  August: {
    month: "August",
    data: generateFinancialData("Aug 2025", 31),
    metrics: {
      totalIncome: "26,78,920 TK",
      totalExpense: "14,34,560 TK",
      totalNetIncome: "2,44,360 TK",
      incomeChange: "+13.7%",
      expenseChange: "+0.2%",
      netIncomeChange: "+17.3%",
    },
  },
  September: {
    month: "September",
    data: generateFinancialData("Sep 2025", 30),
    metrics: {
      totalIncome: "24,56,780 TK",
      totalExpense: "13,12,450 TK",
      totalNetIncome: "2,44,330 TK",
      incomeChange: "+8.9%",
      expenseChange: "-1.5%",
      netIncomeChange: "+18.1%",
    },
  },
  October: {
    month: "October",
    data: generateFinancialData("Oct 2025", 31),
    metrics: {
      totalIncome: "29,45,890 TK",
      totalExpense: "15,67,230 TK",
      totalNetIncome: "2,78,660 TK",
      incomeChange: "+21.4%",
      expenseChange: "+3.1%",
      netIncomeChange: "+22.8%",
    },
  },
  November: {
    month: "November",
    data: generateFinancialData("Nov 2025", 30),
    metrics: {
      totalIncome: "27,89,120 TK",
      totalExpense: "14,89,340 TK",
      totalNetIncome: "2,99,780 TK",
      incomeChange: "+16.8%",
      expenseChange: "+1.9%",
      netIncomeChange: "+24.6%",
    },
  },
  December: {
    month: "December",
    data: generateFinancialData("Dec 2025", 31),
    metrics: {
      totalIncome: "30,12,450 TK",
      totalExpense: "16,23,670 TK",
      totalNetIncome: "2,88,780 TK",
      incomeChange: "+23.5%",
      expenseChange: "+4.2%",
      netIncomeChange: "+21.9%",
    },
  },
};

// Cost Analytics Data
export const costAnalyticsData: CostAnalyticsData = {
  totalCost: "79,556,65.00/-",
  month: "All Months",
  year: "2025",
  categories: [
    {
      name: "Salary",
      value: 20,
      percentage: 20,
      color: "#EF4444",
      amount: "120,000.00",
    },
    {
      name: "Food",
      value: 12,
      percentage: 12,
      color: "#93C5FD",
      amount: "120,000.00",
    },
    {
      name: "Transport",
      value: 5,
      percentage: 5,
      color: "#3B82F6",
      amount: "120,000.00",
    },
    {
      name: "Equipment Purchase",
      value: 52,
      percentage: 52,
      color: "#86EFAC",
      amount: "120,000.00",
    },
    {
      name: "Rent",
      value: 20,
      percentage: 20,
      color: "#1D4ED8",
      amount: "120,000.00",
    },
    {
      name: "Others",
      value: 6,
      percentage: 6,
      color: "#FDE047",
      amount: "120,000.00",
    },
  ],
};

// Packages Analytics Data
export const packagesAnalyticsData: PackagesAnalyticsData = {
  year: "2025",
  chartData: [
    { month: "Feb", Weekly: 45, Monthly: 89, "Quarter Yearly": 34, "Half Yearly": 23, Yearly: 12 },
    { month: "Mar", Weekly: 52, Monthly: 95, "Quarter Yearly": 28, "Half Yearly": 18, Yearly: 15 },
    { month: "Apr", Weekly: 38, Monthly: 78, "Quarter Yearly": 42, "Half Yearly": 25, Yearly: 10 },
    { month: "May", Weekly: 48, Monthly: 112, "Quarter Yearly": 38, "Half Yearly": 30, Yearly: 18 },
    { month: "Jun", Weekly: 42, Monthly: 98, "Quarter Yearly": 32, "Half Yearly": 22, Yearly: 14 },
    { month: "Jul", Weekly: 55, Monthly: 125, "Quarter Yearly": 45, "Half Yearly": 28, Yearly: 20 },
    { month: "Aug", Weekly: 40, Monthly: 88, "Quarter Yearly": 30, "Half Yearly": 20, Yearly: 12 },
    { month: "Sep", Weekly: 50, Monthly: 105, "Quarter Yearly": 35, "Half Yearly": 26, Yearly: 16 },
    { month: "Oct", Weekly: 58, Monthly: 118, "Quarter Yearly": 40, "Half Yearly": 32, Yearly: 22 },
    { month: "Nov", Weekly: 45, Monthly: 92, "Quarter Yearly": 36, "Half Yearly": 24, Yearly: 14 },
    { month: "Dec", Weekly: 52, Monthly: 108, "Quarter Yearly": 38, "Half Yearly": 28, Yearly: 18 },
    { month: "Jan", Weekly: 48, Monthly: 102, "Quarter Yearly": 34, "Half Yearly": 26, Yearly: 16 },
  ],
  stats: [
    { label: "Total Members", count: 3251, unit: "/pers", percentage: "" },
    { label: "Monthly", count: 120, unit: "/per", percentage: "74%" },
    { label: "Half Yearly", count: 32, unit: "/per", percentage: "16%" },
    { label: "Quarter Yearly", count: 15, unit: "/per", percentage: "7%" },
    { label: "Yearly", count: 7, unit: "/per", percentage: "3%" },
    { label: "Weekly", count: 12, unit: "/per", percentage: "3%" },
  ],
};

// Comparison Options
export const comparisonOptions: ComparisonOption[] = [
  {
    id: "members",
    label: "Members",
    description: "Total number of registered members across the selected timeframe",
    icon: "users",
  },
  {
    id: "admissions",
    label: "Admissions",
    description: "Members who joined during the selected months or years",
    icon: "user-add",
  },
  {
    id: "income",
    label: "Income",
    description: "Total earnings from memberships, packages, and other income sources",
    icon: "money-receive",
  },
  {
    id: "expenses",
    label: "Expenses",
    description: "Total costs including rent, salaries, equipment, and operational expenses",
    icon: "money-send",
  },
  {
    id: "profit",
    label: "Profit",
    description: "Net earnings calculated as income minus expenses",
    icon: "chart",
  },
];

// Financials Compare Data
export const financialsCompareData: FinancialsCompareData = {
  years: ["2020", "2021", "2022", "2023", "2024"],
  chartData: [
    { month: "Feb", "2020": 150000, "2021": 180000, "2022": 210000, "2023": 250000, "2024": 280000 },
    { month: "Mar", "2020": 160000, "2021": 190000, "2022": 220000, "2023": 260000, "2024": 290000 },
    { month: "Apr", "2020": 155000, "2021": 185000, "2022": 215000, "2023": 255000, "2024": 285000 },
    { month: "May", "2020": 170000, "2021": 200000, "2022": 230000, "2023": 270000, "2024": 300000 },
    { month: "Jun", "2020": 165000, "2021": 195000, "2022": 225000, "2023": 265000, "2024": 295000 },
    { month: "Jul", "2020": 175000, "2021": 205000, "2022": 235000, "2023": 275000, "2024": 305000 },
    { month: "Aug", "2020": 160000, "2021": 190000, "2022": 220000, "2023": 260000, "2024": 290000 },
    { month: "Sep", "2020": 170000, "2021": 200000, "2022": 230000, "2023": 270000, "2024": 300000 },
    { month: "Oct", "2020": 180000, "2021": 210000, "2022": 240000, "2023": 280000, "2024": 310000 },
    { month: "Nov", "2020": 175000, "2021": 205000, "2022": 235000, "2023": 275000, "2024": 305000 },
    { month: "Dec", "2020": 185000, "2021": 215000, "2022": 245000, "2023": 285000, "2024": 315000 },
    { month: "Jan", "2020": 170000, "2021": 200000, "2022": 230000, "2023": 270000, "2024": 300000 },
  ],
  tableData: [
    { date: "8 Sep, 2020", income: "$589.99", expense: "$601.13", netIncome: "$275.43" },
    { date: "22 Oct, 2020", income: "$450.54", expense: "$398.84", netIncome: "$293.01" },
    { date: "8 Sep, 2020", income: "$351.02", expense: "$275.43", netIncome: "$739.85" },
    { date: "21 Sep, 2020", income: "$406.27", expense: "$928.41", netIncome: "$948.55" },
    { date: "24 May, 2020", income: "$739.65", expense: "$739.65", netIncome: "$782.01" },
    { date: "17 Oct, 2020", income: "$398.84", expense: "$106.58", netIncome: "$108.58" },
    { date: "8 Sep, 2020", income: "$219.78", expense: "$202.87", netIncome: "$943.65" },
    { date: "17 Oct, 2020", income: "$854.08", expense: "$710.68", netIncome: "$710.68" },
    { date: "1 Feb, 2020", income: "$106.58", expense: "$406.27", netIncome: "$490.51" },
    { date: "24 May, 2020", income: "$948.55", expense: "$351.02", netIncome: "$105.55" },
  ],
  balance: "25,00.00",
};

export const availableYears = [2020, 2021, 2022, 2023, 2024, 2025];
