// components/accounts/modals/EditSubcategoryModal.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ExpenseSubcategory {
  id: string;
  title: string;
}

interface EditSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string }) => void;
  subcategory: ExpenseSubcategory;
  categoryTitle: string;
}

export const EditSubcategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  subcategory,
  categoryTitle,
}: EditSubcategoryModalProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: subcategory.title,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: subcategory.title,
      });
    }
  }, [isOpen, subcategory, reset]);

  const handleFormSubmit = (formData: Record<string, unknown>) => {
    const title = formData.title as string;

    if (!title.trim()) {
      toast.error("Subcategory name is required");
      return;
    }

    onSubmit({
      title,
    });

    onClose();
  };

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-white/30 backdrop-blur-sm" />
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-between">
          <DialogHeader>
            <DialogTitle>Edit Expanse Subcategory</DialogTitle>
          </DialogHeader>
        </div>

        <p className="text-sm text-gray-600">
          Update subcategory in <strong>{categoryTitle}</strong>
        </p>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-gray-700">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Type subcategory name"
              {...register("title")}
              className="mt-2"
            />
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
              Update Subcategory
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};