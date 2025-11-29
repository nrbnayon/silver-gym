// data/analyticsData.ts
import {
  MemberStats,
  MonthlyFinancialData,
  CostAnalyticsData,
  PackagesAnalyticsData,
  FinancialsCompareData,
  ComparisonOption,
  CompareChartData,
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

// Generate data for "All Months" view - shows 12 months
const generateAllMonthsData = (year: number): { period: string; income: number; expense: number }[] => {
  const monthNames = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
  const yearMultiplier = (year - 2020) * 0.15;
  const baseIncome = 5000000 * (1 + yearMultiplier);
  const baseExpense = 2000000 * (1 + yearMultiplier);
  
  return monthNames.map((month, index) => ({
    period: month,
    income: baseIncome + Math.random() * 1000000 + (index * 50000),
    expense: baseExpense + Math.random() * 500000 + (index * 20000),
  }));
};

// Generate data for specific month view - shows daily data
const generateFinancialData = (
  startDate: string,
  days: number,
  year: number
): { period: string; income: number; expense: number }[] => {
  const data = [];
  const yearMultiplier = (year - 2020) * 0.15;
  const baseIncome = 5000000 * (1 + yearMultiplier);
  const baseExpense = 2000000 * (1 + yearMultiplier);

  for (let i = 1; i <= days; i++) {
    data.push({
      period: `${startDate.split(" ")[0]} ${i}`,
      income: baseIncome + Math.random() * 1000000,
      expense: baseExpense + Math.random() * 500000,
    });
  }
  return data;
};

// Helper function to get days in month
const getDaysInMonth = (monthName: string): number => {
  const daysMap: Record<string, number> = {
    "January": 31, "February": 28, "March": 31, "April": 30,
    "May": 31, "June": 30, "July": 31, "August": 31,
    "September": 30, "October": 31, "November": 30, "December": 31
  };
  return daysMap[monthName] || 30;
};

export const financialAnalyticsDataTemplate: Record<string, MonthlyFinancialData> = {
  "All Months": {
    month: "All Months",
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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
    data: [],
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

// Function to get financial data by year and month
export const getFinancialData = (month: string, year: number): MonthlyFinancialData => {
  const yearMultiplier = (year - 2020) * 0.15;
  const baseMetrics = financialAnalyticsDataTemplate[month].metrics;
  
  const parseAmount = (str: string) => parseFloat(str.replace(/,/g, '').replace(' TK', ''));
  const formatAmount = (num: number) => `${num.toFixed(2).replace(/\B(?=(\d{2})+(?!\d))/g, ",")} TK`;
  
  const adjustedIncome = parseAmount(baseMetrics.totalIncome) * (1 + yearMultiplier);
  const adjustedExpense = parseAmount(baseMetrics.totalExpense) * (1 + yearMultiplier);
  const adjustedNetIncome = adjustedIncome - adjustedExpense;
  
  return {
    month: month,
    data: month === "All Months" 
      ? generateAllMonthsData(year) 
      : generateFinancialData(month.substring(0, 3) + " " + year, getDaysInMonth(month), year),
    metrics: {
      totalIncome: formatAmount(adjustedIncome),
      totalExpense: formatAmount(adjustedExpense),
      totalNetIncome: formatAmount(adjustedNetIncome),
      incomeChange: baseMetrics.incomeChange,
      expenseChange: baseMetrics.expenseChange,
      netIncomeChange: baseMetrics.netIncomeChange,
    },
  };
};

// Cost Analytics Data Template
const costAnalyticsDataTemplate: CostAnalyticsData = {
  totalCost: "79,556,65.00/-",
  month: "All Months",
  year: "2025",
  categories: [
    {
      name: "Salary",
      value: 120000,
      percentage: 20,
      color: "#F75270",
      amount: "120,000.00",
    },
    {
      name: "Food",
      value: 72000,
      percentage: 12,
      color: "#BBDCE5",
      amount: "72,000.00",
    },
    {
      name: "Transport",
      value: 30000,
      percentage: 5,
      color: "#FFDBB6",
      amount: "30,000.00",
    },
    {
      name: "Equipment Purchase",
      value: 312000,
      percentage: 52,
      color: "#A8BBA3",
      amount: "312,000.00",
    },
    {
      name: "Rent",
      value: 120000,
      percentage: 20,
      color: "#0BA6DF",
      amount: "120,000.00",
    },
    {
      name: "Others",
      value: 36000,
      percentage: 6,
      color: "#67C090",
      amount: "36,000.00",
    },
  ],
};

// Function to get cost analytics data by year and month
export const getCostAnalyticsData = (month: string, year: number): CostAnalyticsData => {
  const monthsList = [
    "All Months", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  
  const yearMultiplier = (year - 2020) * 0.12;
  const monthMultiplier = month === "All Months" ? 12 : 1;
  
  const getMonthVariance = (categoryName: string, month: string): number => {
    if (month === "All Months") return 1;
    
    const monthIndex = monthsList.indexOf(month);
    const seed = monthIndex * 100 + year;
    
    switch(categoryName) {
      case "Salary":
        return 0.95 + (seed % 10) / 100;
      case "Food":
        return 0.85 + (seed % 30) / 100;
      case "Transport":
        return 0.75 + (seed % 50) / 100;
      case "Equipment Purchase":
        return 0.5 + (seed % 100) / 100;
      case "Rent":
        return 0.98 + (seed % 5) / 100;
      case "Others":
        return 0.7 + (seed % 60) / 100;
      default:
        return 0.8 + Math.random() * 0.4;
    }
  };
  
  const categories = costAnalyticsDataTemplate.categories.map(category => {
    const baseValue = category.value;
    const variance = getMonthVariance(category.name, month);
    const adjustedValue = baseValue * (1 + yearMultiplier) * monthMultiplier * variance;
    
    return {
      ...category,
      value: adjustedValue,
      amount: adjustedValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    };
  });

  const totalCost = categories.reduce((sum, cat) => sum + cat.value, 0);

  const categoriesWithPercentage = categories.map(category => ({
    ...category,
    percentage: Math.round((category.value / totalCost) * 100),
  }));

  return {
    totalCost: `${totalCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-`,
    month: month,
    year: year.toString(),
    categories: categoriesWithPercentage,
  };
};

export const costAnalyticsData: CostAnalyticsData = costAnalyticsDataTemplate;

// Packages Analytics Data
const packagesAnalyticsDataTemplate: PackagesAnalyticsData = {
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

// Function to get packages analytics data by year
export const getPackagesAnalyticsData = (year: number): PackagesAnalyticsData => {
  const yearMultiplier = (year - 2020) * 0.10;
  
  const chartData = packagesAnalyticsDataTemplate.chartData.map(month => {
    const variance = () => 0.9 + Math.random() * 0.2;
    
    return {
      month: month.month,
      Weekly: Math.round(month.Weekly * (1 + yearMultiplier) * variance()),
      Monthly: Math.round(month.Monthly * (1 + yearMultiplier) * variance()),
      "Quarter Yearly": Math.round(month["Quarter Yearly"] * (1 + yearMultiplier) * variance()),
      "Half Yearly": Math.round(month["Half Yearly"] * (1 + yearMultiplier) * variance()),
      Yearly: Math.round(month.Yearly * (1 + yearMultiplier) * variance()),
    };
  });

  const totals = {
    Weekly: 0,
    Monthly: 0,
    "Quarter Yearly": 0,
    "Half Yearly": 0,
    Yearly: 0,
  };

  chartData.forEach(month => {
    totals.Weekly += month.Weekly;
    totals.Monthly += month.Monthly;
    totals["Quarter Yearly"] += month["Quarter Yearly"];
    totals["Half Yearly"] += month["Half Yearly"];
    totals.Yearly += month.Yearly;
  });

  const totalMembers = totals.Weekly + totals.Monthly + totals["Quarter Yearly"] + totals["Half Yearly"] + totals.Yearly;

  const calculatePercentage = (value: number) => {
    return `${Math.round((value / totalMembers) * 100)}%`;
  };

  const stats = [
    { label: "Total Members", count: totalMembers, unit: "/pers", percentage: "" },
    { label: "Monthly", count: totals.Monthly, unit: "/per", percentage: calculatePercentage(totals.Monthly) },
    { label: "Half Yearly", count: totals["Half Yearly"], unit: "/per", percentage: calculatePercentage(totals["Half Yearly"]) },
    { label: "Quarter Yearly", count: totals["Quarter Yearly"], unit: "/per", percentage: calculatePercentage(totals["Quarter Yearly"]) },
    { label: "Yearly", count: totals.Yearly, unit: "/per", percentage: calculatePercentage(totals.Yearly) },
    { label: "Weekly", count: totals.Weekly, unit: "/per", percentage: calculatePercentage(totals.Weekly) },
  ];

  return {
    year: year.toString(),
    chartData: chartData,
    stats: stats,
  };
};

export const packagesAnalyticsData: PackagesAnalyticsData = packagesAnalyticsDataTemplate;

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
const financialsCompareDataTemplate: FinancialsCompareData = {
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

// Function to get financials compare data
export const getFinancialsCompareData = (
  compareType: string,
  startYear: number,
  endYear: number
): FinancialsCompareData => {
  const years: string[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString());
  }

  const chartData: CompareChartData[] = financialsCompareDataTemplate.chartData.map(month => {
    const monthData: CompareChartData = { month: month.month };
    
    years.forEach(year => {
      const yearNum = parseInt(year);
      const baseValue = 150000 + (yearNum - 2020) * 30000;
      const monthVariance = 0.9 + Math.random() * 0.2;
      monthData[year] = Math.round(baseValue * monthVariance);
    });
    
    return monthData;
  });

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const tableData = [];
  
  for (let year = startYear; year <= endYear; year++) {
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    
    const income = 100 + Math.random() * 800;
    const expense = 100 + Math.random() * 800;
    const netIncome = income - expense + Math.random() * 300;
    
    tableData.push({
      date: `${randomDay} ${randomMonth}, ${year}`,
      income: `${income.toFixed(2)}`,
      expense: `${expense.toFixed(2)}`,
      netIncome: `${Math.abs(netIncome).toFixed(2)}`,
    });
  }

  const totalIncome = tableData.reduce((sum, row) => 
    sum + parseFloat(row.income.replace(/\$/g, '')), 0
  );
  const totalExpense = tableData.reduce((sum, row) => 
    sum + parseFloat(row.expense.replace(/\$/g, '')), 0
  );
  const balance = totalIncome - totalExpense;

  return {
    years: years,
    chartData: chartData,
    tableData: tableData,
    balance: balance.toFixed(2),
  };
};

export const financialsCompareData: FinancialsCompareData = financialsCompareDataTemplate;

export const availableYears = [2020, 2021, 2022, 2023, 2024, 2025];