export interface ExpenseSubcategory {
  id: string;
  title: string;
}

export interface ExpenseCategory {
  id: string;
  title: string;
  description?: string;
  color?: string;
  subcategories: ExpenseSubcategory[];
}