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
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { colorPalette } from "@/lib/utils";

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
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      color: "#7C3AED",
    },
  });

  const [selectedColor, setSelectedColor] = useState("#7C3AED");
  const [isColorSelectOpen, setIsColorSelectOpen] = useState(false);

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

    reset();
    setSelectedColor("#7C3AED");
    setValue("color", "#7C3AED");
    onClose();
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setValue("color", color);
    setIsColorSelectOpen(false);
  };

  const handleClose = () => {
    reset();
    setSelectedColor("#7C3AED");
    setValue("color", "#7C3AED");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-white/30 backdrop-blur-sm" />
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add Expense Category</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Add a new expense transaction
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-900">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Type expense category"
              {...register("title")}
              className="mt-1.5"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-900">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write something about this expense..."
              {...register("description")}
              className="mt-1.5 resize-none border"
              rows={4}
            />
          </div>

          {/* Color Selection */}
          <div>
            <Label className="text-sm font-medium text-gray-900">Select Colour</Label>

            {/* Hidden input to keep RHF happy */}
            <Input type="hidden" {...register("color")} />

            <div className="mt-1.5">
              <div className="relative">
                {/* Custom trigger that always shows the current color */}
                <button
                  type="button"
                  onClick={() => setIsColorSelectOpen(!isColorSelectOpen)}
                  className="w-full h-10 px-3 flex items-center gap-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <div
                    className="w-5 h-5 rounded border border-gray-300 shrink-0"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="text-sm truncate">{selectedColor}</span>
                  <span className="ml-auto">▼</span>
                </button>

                {/* Dropdown palette */}
                {isColorSelectOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg p-3">
                    <div className="grid grid-cols-9 gap-2">
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            handleColorSelect(color);
                            setIsColorSelectOpen(false);
                          }}
                          className={`w-8 h-8 rounded transition-all hover:scale-110 ${
                            selectedColor === color
                              ? "ring-2 ring-gray-900 ring-offset-2"
                              : ""
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="sm:mr-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple hover:bg-[#6D28D9] text-white"
            >
              Create Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};