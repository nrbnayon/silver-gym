// components/accounts/modals/AddSubcategoryModal.tsx
"use client";

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

interface AddSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string }) => void;
  categoryTitle: string;
}

export const AddSubcategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  categoryTitle,
}: AddSubcategoryModalProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const handleFormSubmit = (formData: Record<string, unknown>) => {
    const title = formData.title as string;

    if (!title.trim()) {
      toast.error("Subcategory name is required");
      return;
    }

    onSubmit({
      title,
    });

    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-white/30 backdrop-blur-sm" />
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-between">
          <DialogHeader>
            <DialogTitle>Add Expense Subcategory</DialogTitle>
          </DialogHeader>
        </div>

        <p className="text-sm text-gray-600">
          Add a new subcategory to <strong>{categoryTitle}</strong>
        </p>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-gray-700">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Type package name"
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
              Create Subcategory
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
