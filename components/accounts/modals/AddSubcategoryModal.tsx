// components/accounts/modals/AddSubcategoryModal.tsx
"use client";

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

    toast.success("Subcategory added successfully!");
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-between">
          <DialogHeader>
            <DialogTitle>Add Expanse Subcategory</DialogTitle>
          </DialogHeader>
        </div>

        <p className="text-sm text-gray-600">
          Add a new subcategory to <strong>{categoryTitle}</strong>
        </p>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-gray-700">
              Title
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
              Create Package
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
