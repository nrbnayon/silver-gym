// app/dashboard/expense/page.tsx
"use client";

import { useState } from "react";
import ExpenseList from "@/components/dashboard/Expense/ExpenseList";
import AddExpenseModal from "@/components/modals/AddExpenseModal";
import ExportReportModal from "@/components/modals/ExportReportModal";
import { expenseData } from "@/data/expenseData";
import { Expense } from "@/types/expense";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>(expenseData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = (newExpense: {
    subcategory: string;
    category: string;
    description: string;
    amount: number;
    paymentMethod: string;
  }) => {
    const expense: Expense = {
      id: `exp-${Date.now()}`,
      dateTime: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + " " + new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      invoiceNo: "#" + Math.floor(100000 + Math.random() * 900000),
      categoryTitle: newExpense.category,
      subcategory: newExpense.subcategory,
      description: newExpense.description,
      payment: newExpense.paymentMethod as "Cash" | "Bank" | "Bkash" | "Due",
      amount: newExpense.amount,
      date: new Date(),
    };

    setExpenses([expense, ...expenses]);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setShowAddModal(true);
  };

  return (
    <div className="p-6">
      <ExpenseList
        expenses={expenses}
        onAddExpense={() => setShowAddModal(true)}
        onEditExpense={handleEditExpense}
        onExport={() => setShowExportModal(true)}
      />

      <AddExpenseModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingExpense(null);
        }}
        onSave={handleAddExpense}
      />

      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}
