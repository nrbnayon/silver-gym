// types/analytics.ts
export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface MemberStats {
  totalMembers: number;
  totalMembersUnit: string;
  totalMembersDescription: string;
  newAdmissions: number;
  newAdmissionsUnit: string;
  newAdmissionsDescription: string;
  activeMembers: number;
  activeMembersUnit: string;
  activeMembersDescription: string;
  admissionChart: ChartDataPoint[];
  admissionChartPeriod: string;
}

export interface FinancialDataPoint {
  period: string;
  income: number;
  expense: number;
}

export interface FinancialMetrics {
  totalIncome: string;
  totalExpense: string;
  totalNetIncome: string;
  incomeChange: string;
  expenseChange: string;
  netIncomeChange: string;
}

export interface MonthlyFinancialData {
  month: string;
  data: FinancialDataPoint[];
  metrics: FinancialMetrics;
}

export interface CostCategory {
  name: string;
  value: number;
  percentage: number;
  color: string;
  amount: string;
}

export interface CostAnalyticsData {
  totalCost: string;
  categories: CostCategory[];
  month: string;
  year: string;
}

export interface PackageTypeData {
  month: string;
  Weekly: number;
  Monthly: number;
  "Quarter Yearly": number;
  "Half Yearly": number;
  Yearly: number;
}

export interface PackageStats {
  label: string;
  count: number;
  unit: string;
  percentage: string;
}

export interface PackagesAnalyticsData {
  chartData: PackageTypeData[];
  stats: PackageStats[];
  year: string;
}

export interface ComparisonOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface ComparisonDataPoint {
  date: string;
  income: string;
  expense: string;
  netIncome: string;
}

export interface YearComparisonData {
  [key: string]: number; // year as key, value as number for chart
}

export interface CompareChartData {
  month: string;
  [year: string]: number | string; // dynamic years
}

export interface FinancialsCompareData {
  chartData: CompareChartData[];
  tableData: ComparisonDataPoint[];
  balance: string;
  years: string[];
}
