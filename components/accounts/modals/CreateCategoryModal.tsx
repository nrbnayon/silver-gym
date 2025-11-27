// components/accounts/modals/CreateCategoryModal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X } from "lucide-react";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    color: string;
  }) => void;
}

export const CreateCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateCategoryModalProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      selectedColor: "#7C3AED",
    },
  });

  const [selectedColor, setSelectedColor] = useState("#7C3AED");

  const handleFormSubmit = (formData: Record<string, unknown>) => {
    const title = formData.title as string;
    const description = formData.description as string;

    if (!title.trim()) {
      toast.error("Category name is required");
      return;
    }

    onSubmit({
      title,
      description,
      color: selectedColor,
    });

    toast.success("Category created successfully!");
    reset();
    setSelectedColor("#7C3AED");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-between">
          <DialogHeader>
            <DialogTitle>Add Expanse Category</DialogTitle>
          </DialogHeader>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600">Add a new expense transaction</p>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-gray-700">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Type expense category"
              {...register("title")}
              className="mt-2"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write something about this expense..."
              {...register("description")}
              className="mt-2 resize-none"
              rows={4}
            />
          </div>

          {/* Color Selection */}
          <div>
            <Label className="text-gray-700">Select Colour</Label>
            <div className="flex gap-2 mt-2">
              {["#7C3AED", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"].map(
                (color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded border-2 transition ${
                      selectedColor === color
                        ? "border-gray-800"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
          </div>

          {/* Buttons */}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Create Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
