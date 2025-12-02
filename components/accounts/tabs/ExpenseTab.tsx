// components/accounts/tabs/ExpenseTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateCategoryModal } from "../modals/CreateCategoryModal";
import { AddSubcategoryModal } from "../modals/AddSubcategoryModal";
import { EditCategoryModal } from "../modals/EditCategoryModal";
import { EditSubcategoryModal } from "../modals/EditSubcategoryModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, PlusSignSquareIcon, Delete02Icon, ArchiveArrowDownIcon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { ExpenseCategory, ExpenseSubcategory } from "@/types/expense-category";

export const ExpenseTab = () => {
  const [categories, setCategories] = useState<ExpenseCategory[]>([
    {
      id: "1",
      title: "All Category's",
      description: "Default category for all expenses",
      color: "#7C3AED",
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
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isEditSubcategoryModalOpen, setIsEditSubcategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
  const [isDeleteSubcategoryModalOpen, setIsDeleteSubcategoryModalOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(categories[0]);
  const [categoryToEdit, setCategoryToEdit] = useState<ExpenseCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<ExpenseCategory | null>(null);
  const [subcategoryToEdit, setSubcategoryToEdit] = useState<ExpenseSubcategory | null>(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<{ categoryId: string; subcategory: ExpenseSubcategory } | null>(null);

  const handleCreateCategory = (data: {
    title: string;
    description: string;
    color: string;
  }) => {
    const newCategory: ExpenseCategory = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      color: data.color,
      subcategories: [],
    };
    setCategories([...categories, newCategory]);
    setIsCreateModalOpen(false);
    toast.success("Category created successfully!");
  };

  const handleEditCategory = (data: {
    title: string;
    description: string;
    color: string;
  }) => {
    if (!categoryToEdit) return;

    const updatedCategories = categories.map((cat) => {
      if (cat.id === categoryToEdit.id) {
        return {
          ...cat,
          title: data.title,
          description: data.description,
          color: data.color,
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    
    // Update selected category if it's the one being edited
    if (selectedCategory?.id === categoryToEdit.id) {
      const updated = updatedCategories.find((cat) => cat.id === categoryToEdit.id);
      if (updated) setSelectedCategory(updated);
    }
    
    setIsEditCategoryModalOpen(false);
    setCategoryToEdit(null);
    toast.success("Category updated successfully!");
  };

  const handleDeleteCategory = () => {
    if (!categoryToDelete) return;

    // Don't allow deleting if it's the last category
    if (categories.length === 1) {
      toast.error("Cannot delete the last category");
      return;
    }

    const updatedCategories = categories.filter((cat) => cat.id !== categoryToDelete.id);
    setCategories(updatedCategories);

    // If deleted category was selected, select the first remaining category
    if (selectedCategory?.id === categoryToDelete.id) {
      setSelectedCategory(updatedCategories[0] || null);
    }

    setIsDeleteCategoryModalOpen(false);
    setCategoryToDelete(null);
    toast.success("Category deleted successfully!");
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
    const updated = updatedCategories.find((cat) => cat.id === selectedCategory.id);
    if (updated) setSelectedCategory(updated);
    setIsSubcategoryModalOpen(false);
    toast.success("Subcategory added successfully!");
  };

  const handleEditSubcategory = (data: { title: string }) => {
    if (!subcategoryToEdit || !selectedCategory) return;

    const updatedCategories = categories.map((cat) => {
      if (cat.id === selectedCategory.id) {
        return {
          ...cat,
          subcategories: cat.subcategories.map((sub) =>
            sub.id === subcategoryToEdit.id
              ? { ...sub, title: data.title }
              : sub
          ),
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    const updated = updatedCategories.find((cat) => cat.id === selectedCategory.id);
    if (updated) setSelectedCategory(updated);
    
    setIsEditSubcategoryModalOpen(false);
    setSubcategoryToEdit(null);
    toast.success("Subcategory updated successfully!");
  };

  const handleDeleteSubcategory = () => {
    if (!subcategoryToDelete) return;

    const updatedCategories = categories.map((cat) => {
      if (cat.id === subcategoryToDelete.categoryId) {
        return {
          ...cat,
          subcategories: cat.subcategories.filter(
            (sub) => sub.id !== subcategoryToDelete.subcategory.id
          ),
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    const updated = updatedCategories.find((cat) => cat.id === subcategoryToDelete.categoryId);
    if (updated) setSelectedCategory(updated);
    
    setIsDeleteSubcategoryModalOpen(false);
    setSubcategoryToDelete(null);
    toast.success("Subcategory deleted successfully!");
  };

  const openEditCategoryModal = (category: ExpenseCategory) => {
    setCategoryToEdit(category);
    setIsEditCategoryModalOpen(true);
  };

  const openDeleteCategoryModal = (category: ExpenseCategory) => {
    setCategoryToDelete(category);
    setIsDeleteCategoryModalOpen(true);
  };

  const openEditSubcategoryModal = (subcategory: ExpenseSubcategory) => {
    setSubcategoryToEdit(subcategory);
    setIsEditSubcategoryModalOpen(true);
  };

  const openDeleteSubcategoryModal = (categoryId: string, subcategory: ExpenseSubcategory) => {
    setSubcategoryToDelete({ categoryId, subcategory });
    setIsDeleteSubcategoryModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Categories Column */}
      <div className="space-y-4 bg-gray-primary p-4 rounded-md h-full overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-text-secondary">All Category's</h2>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-white hover:bg-purple/10 text-text-primary rounded cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignSquareIcon} size={20} />
          </Button>
        </div>

        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`w-full p-3 rounded border transition hover:border-gray-300 ${
                selectedCategory?.id === category.id
                  ? "bg-purple-50 border-2 border-purple/10"
                  : "bg-white border-none"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="flex-1 text-left cursor-pointer"
                >
                  <p className={`font-medium ${
                    selectedCategory?.id === category.id
                      ? "text-text-primary"
                      : "text-text-secondary"
                  }`}>
                    {category.title}
                  </p>
                  <p className="text-xs mt-1 text-gray-500">
                    {category.subcategories.length} subcategories
                  </p>
                </button>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditCategoryModal(category)}
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    title="Edit category"
                  >
                    <HugeiconsIcon icon={Edit02Icon} size={18} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => openDeleteCategoryModal(category)}
                    className="p-1.5 hover:bg-red-50 rounded transition-colors"
                    title="Delete category"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full bg-[#E1E1E1] hover:bg-gray-200 text-text-primary rounded-sm mt-5"
        >
          <HugeiconsIcon icon={PlusSignSquareIcon} size={20} />
          Add New Category
        </Button>
      </div>

      {/* Subcategories Column */}
      <div className="space-y-4">
        {selectedCategory && (
          <div className="bg-gray-primary p-4 rounded-md h-full">
            <h3 className="text-xl font-semibold mb-4 text-text-secondary">
              Expense Subcategory
            </h3>

            {selectedCategory.subcategories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-1/2">
                <HugeiconsIcon icon={ArchiveArrowDownIcon} size={40} className="text-gray-600" />
                <p className="text-gray-500 text-sm py-4 text-center">
                  No subcategories yet
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedCategory.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between bg-white p-3 rounded"
                  >
                    <span className="text-gray-700">{sub.title}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditSubcategoryModal(sub)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        title="Edit subcategory"
                      >
                        <HugeiconsIcon icon={Edit02Icon} size={18} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => openDeleteSubcategoryModal(selectedCategory.id, sub)}
                        className="p-1.5 hover:bg-red-50 rounded transition-colors"
                        title="Delete subcategory"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() => setIsSubcategoryModalOpen(true)}
              className="w-full bg-[#E1E1E1] hover:bg-gray-200 text-text-primary rounded-sm mt-5"
            >
              <HugeiconsIcon icon={PlusSignSquareIcon} size={20} />
              Add New Subcategory
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCategory}
      />

      {categoryToEdit && (
        <EditCategoryModal
          isOpen={isEditCategoryModalOpen}
          onClose={() => {
            setIsEditCategoryModalOpen(false);
            setCategoryToEdit(null);
          }}
          onSubmit={handleEditCategory}
          category={categoryToEdit}
        />
      )}

      {selectedCategory && (
        <AddSubcategoryModal
          isOpen={isSubcategoryModalOpen}
          onClose={() => setIsSubcategoryModalOpen(false)}
          onSubmit={handleAddSubcategory}
          categoryTitle={selectedCategory.title}
        />
      )}

      {subcategoryToEdit && (
        <EditSubcategoryModal
          isOpen={isEditSubcategoryModalOpen}
          onClose={() => {
            setIsEditSubcategoryModalOpen(false);
            setSubcategoryToEdit(null);
          }}
          onSubmit={handleEditSubcategory}
          subcategory={subcategoryToEdit}
          categoryTitle={selectedCategory?.title || ""}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteCategoryModalOpen}
        onClose={() => {
          setIsDeleteCategoryModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        description="Are you sure you want to delete"
        itemName={categoryToDelete?.title || "this category"}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <DeleteConfirmationModal
        isOpen={isDeleteSubcategoryModalOpen}
        onClose={() => {
          setIsDeleteSubcategoryModalOpen(false);
          setSubcategoryToDelete(null);
        }}
        onConfirm={handleDeleteSubcategory}
        title="Delete Subcategory"
        description="Are you sure you want to delete"
        itemName={subcategoryToDelete?.subcategory.title || "this subcategory"}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};