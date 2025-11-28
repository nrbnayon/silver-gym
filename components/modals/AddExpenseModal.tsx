// components/modals/AddExpenseModal.tsx
"use client";

import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface Category {
  id: string;
  name: string;
  type: string;
}

interface AddExpenseModalProps {
  onClose: () => void;
  categories: Category[];
}

export default function AddExpenseModal({
  onClose,
  categories,
}: AddExpenseModalProps) {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = () => {
    console.log({ selectedCategory, description, amount, paymentMethod });
    onClose();
  };

  return (
    <div>
      {!showCategories ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Subcategory
            </label>
            <Input
              type="text"
              placeholder="Type subcategory name"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              onFocus={() => setShowCategories(true)}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              placeholder="Type short your expense or occasion..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-x-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <Input
                type="number"
                placeholder="Ex:100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm f focus-visible:border-[#F05B23] focus-visible:shadow-[0_0_0_3px_#FCF0ED] transition-all text-base text-gray-medium"
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-medium"
            >
              Save Expense
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShowCategories(false)}
            className="text-sm text-primary mb-4 hover:underline"
          >
            ← Back to form
          </button>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setShowCategories(false);
                }}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-sm hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-sm font-medium text-gray-800">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500">{category.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
