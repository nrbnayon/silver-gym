// data/expenseCategories.ts
import { ExpenseCategory, ExpenseSubcategory } from "@/types/expense";

export const expenseSubcategories: ExpenseSubcategory[] = [
  // Staff Salaries & Wages
  { id: "sub-1", name: "Trainer Salary", category: "Salary", categoryId: "cat-1" },
  { id: "sub-2", name: "Receptionist Salary", category: "Salary", categoryId: "cat-1" },
  { id: "sub-3", name: "Cleaner Salary", category: "Salary", categoryId: "cat-1" },
  
  // Food
  { id: "sub-4", name: "Snack", category: "Food", categoryId: "cat-2" },
  
  // Transport
  { id: "sub-5", name: "Shop Transport", category: "Transport", categoryId: "cat-3" },
  
  // Utilities
  { id: "sub-6", name: "Electricity Bill", category: "Utilities", categoryId: "cat-4" },
  { id: "sub-7", name: "Water Bill", category: "Utilities", categoryId: "cat-4" },
  { id: "sub-8", name: "Internet Bill", category: "Utilities", categoryId: "cat-4" },
  
  // Equipment
  { id: "sub-9", name: "Gym Equipment", category: "Equipment", categoryId: "cat-5" },
  { id: "sub-10", name: "Fitness Machines", category: "Equipment", categoryId: "cat-5" },
  
  // Maintenance
  { id: "sub-11", name: "Equipment Repair", category: "Maintenance", categoryId: "cat-6" },
  { id: "sub-12", name: "Building Maintenance", category: "Maintenance", categoryId: "cat-6" },
  
  // Marketing
  { id: "sub-13", name: "Online Ads", category: "Marketing", categoryId: "cat-7" },
  { id: "sub-14", name: "Banners & Posters", category: "Marketing", categoryId: "cat-7" },
  
  // Software
  { id: "sub-15", name: "Management Software", category: "Software", categoryId: "cat-8" },
  { id: "sub-16", name: "Music Licensing", category: "Software", categoryId: "cat-8" },
  
  // Cleaning
  { id: "sub-17", name: "Cleaning Supplies", category: "Cleaning", categoryId: "cat-9" },
  { id: "sub-18", name: "Sanitizers", category: "Cleaning", categoryId: "cat-9" },
  
  // Insurance
  { id: "sub-19", name: "Liability Insurance", category: "Insurance", categoryId: "cat-10" },
  { id: "sub-20", name: "Business License", category: "Insurance", categoryId: "cat-10" },
  
  // Events
  { id: "sub-21", name: "Fitness Challenges", category: "Events", categoryId: "cat-11" },
  { id: "sub-22", name: "Member Events", category: "Events", categoryId: "cat-11" },
  
  // Office
  { id: "sub-23", name: "Printing & Paper", category: "Office", categoryId: "cat-12" },
  { id: "sub-24", name: "Pens & Registers", category: "Office", categoryId: "cat-12" },
];

export const expenseCategories: ExpenseCategory[] = [
  {
    id: "cat-1",
    name: "Staff Salaries & Wages",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-1"),
  },
  {
    id: "cat-2",
    name: "Food & Beverages",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-2"),
  },
  {
    id: "cat-3",
    name: "Transport",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-3"),
  },
  {
    id: "cat-4",
    name: "Rent & Utilities",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-4"),
  },
  {
    id: "cat-5",
    name: "Equipment Purchase",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-5"),
  },
  {
    id: "cat-6",
    name: "Equipment Maintenance",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-6"),
  },
  {
    id: "cat-7",
    name: "Marketing & Advertising",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-7"),
  },
  {
    id: "cat-8",
    name: "Software & Subscriptions",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-8"),
  },
  {
    id: "cat-9",
    name: "Cleaning",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-9"),
  },
  {
    id: "cat-10",
    name: "Insurance & Licenses",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-10"),
  },
  {
    id: "cat-11",
    name: "Events & Membe",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-11"),
  },
  {
    id: "cat-12",
    name: "Office Supplies",
    subcategories: expenseSubcategories.filter(s => s.categoryId === "cat-12"),
  },
];
