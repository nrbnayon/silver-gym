// components/accounts/tabs/ExpanseTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2 } from "lucide-react";
import { CreateCategoryModal } from "../modals/CreateCategoryModal";
import { AddSubcategoryModal } from "../modals/AddSubcategoryModal";

interface ExpenseSubcategory {
  id: string;
  title: string;
}

interface ExpenseCategory {
  id: string;
  title: string;
  subcategories: ExpenseSubcategory[];
}

export const ExpanseTab = () => {
  const [categories, setCategories] = useState<ExpenseCategory[]>([
    {
      id: "1",
      title: "All Category's",
      subcategories: [
        { id: "s1", title: "Rent" },
        { id: "s2", title: "Utilities" },
        { id: "s3", title: "Salaries" },
        { id: "s4", title: "Maintenance" },
        { id: "s5", title: "Marketing" },
        { id: "s6", title: "Miscellaneous" },
      ],
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | null>(categories[0]);

  const handleCreateCategory = (data: {
    title: string;
    description: string;
    color: string;
  }) => {
    const newCategory: ExpenseCategory = {
      id: Date.now().toString(),
      title: data.title,
      subcategories: [],
    };
    setCategories([...categories, newCategory]);
    setIsCreateModalOpen(false);
  };

  const handleAddSubcategory = (data: { title: string }) => {
    if (!selectedCategory) return;

    const updatedCategories = categories.map((cat) => {
      if (cat.id === selectedCategory.id) {
        return {
          ...cat,
          subcategories: [
            ...cat.subcategories,
            {
              id: Date.now().toString(),
              title: data.title,
            },
          ],
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    const updated = updatedCategories.find(
      (cat) => cat.id === selectedCategory.id
    );
    if (updated) setSelectedCategory(updated);
    setIsSubcategoryModalOpen(false);
  };

  const handleDeleteSubcategory = (
    categoryId: string,
    subcategoryId: string
  ) => {
    const updatedCategories = categories.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subcategories: cat.subcategories.filter(
            (sub) => sub.id !== subcategoryId
          ),
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    const updated = updatedCategories.find((cat) => cat.id === categoryId);
    if (updated) setSelectedCategory(updated);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Categories Column */}
      <div className="space-y-4">
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left p-3 rounded border transition ${
                selectedCategory?.id === category.id
                  ? "bg-purple-50 border-purple-300"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="text-gray-700 font-medium">{category.title}</p>
              <p className="text-xs text-gray-500 mt-1">
                {category.subcategories.length} subcategories
              </p>
            </button>
          ))}
        </div>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Category
        </Button>
      </div>

      {/* Subcategories Column */}
      <div className="space-y-4">
        {selectedCategory && (
          <>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold text-gray-900 mb-4">
                Expanse Subcategory
              </h3>

              {selectedCategory.subcategories.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">
                  No subcategories yet
                </p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {selectedCategory.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between bg-white p-3 rounded border border-gray-200"
                    >
                      <span className="text-gray-700">{sub.title}</span>
                      <button
                        onClick={() =>
                          handleDeleteSubcategory(selectedCategory.id, sub.id)
                        }
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={() => setIsSubcategoryModalOpen(true)}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Subcategory
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCategory}
      />

      {selectedCategory && (
        <AddSubcategoryModal
          isOpen={isSubcategoryModalOpen}
          onClose={() => setIsSubcategoryModalOpen(false)}
          onSubmit={handleAddSubcategory}
          categoryTitle={selectedCategory.title}
        />
      )}
    </div>
  );
};
