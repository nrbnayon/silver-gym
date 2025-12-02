// types/expense.ts
export interface Expense {
  id: string;
  dateTime: string;
  invoiceNo: string;
  categoryTitle: string;
  subcategory?: string;
  description: string;
  payment: "Cash" | "Bank" | "Bkash" | "Due";
  amount: number;
  date: Date;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  subcategories: ExpenseSubcategory[];
}

export interface ExpenseSubcategory {
  id: string;
  name: string;
  category: string;
  categoryId: string;
}
