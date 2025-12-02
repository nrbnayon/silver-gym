// types/income.ts

export type IncomeCategory = "Admission" | "Monthly" | "Quarterly" | "Yearly";
export type PaymentMethod = "Cash" | "Bank" | "Bkash" | "Due";

export interface IncomeRecord {
  id: string;
  dateTime: string;
  invoiceNo: string;
  name: string;
  memberId: string;
  category: IncomeCategory;
  payment: PaymentMethod;
  amount: number;
}

export type DateFilterType = "today" | "thisMonth" | "custom";

export interface DateFilter {
  type: DateFilterType;
  startDate?: string;
  endDate?: string;
}

export interface IncomeStats {
  totalIncome: number;
  todayIncome: number;
  monthlyIncome: number;
}
