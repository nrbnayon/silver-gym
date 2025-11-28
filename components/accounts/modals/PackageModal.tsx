// components/accounts/modals/PackageModal.tsx
"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { colorPalette } from "@/lib/utils";

interface Package {
  id: string;
  title: string;
  duration: number;
  durationType: "Days" | "Months";
  amount: number;
  color: string;
  admissionFee: boolean;
}

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  package?: Package | null;
  onSubmit: (data: {
    title: string;
    duration: number;
    durationType: "Days" | "Months";
    amount: number;
    color: string;
    admissionFee: boolean;
  }) => void;
  onDelete?: () => void;
}

const durationOptions = [
  { label: "2 Month", value: 2, type: "Months" },
  { label: "3 Month", value: 3, type: "Months" },
  { label: "4 Month", value: 4, type: "Months" },
  { label: "5 Month", value: 5, type: "Months" },
  { label: "Yearly", value: 12, type: "Months" },
  { label: "Life Time", value: 99999, type: "Days" },
];

export const PackageModal = ({
  isOpen,
  onClose,
  package: pkg,
  onSubmit,
  onDelete,
}: PackageModalProps) => {
  const isEditMode = !!pkg;

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      duration: "",
      amount: "",
      color: "",
    },
  });

  const [formState, setFormState] = useState(() => ({
    selectedColor: "#7C3AED",
    durationType: "Months" as "Days" | "Months",
    selectedDuration: "",
    admissionFee: false,
  }));
  const [isColorSelectOpen, setIsColorSelectOpen] = useState(false);

  // Reset form when modal opens or package changes
  useEffect(() => {
    if (isOpen) {
      if (pkg) {
        // Edit mode - populate with existing data
        const matchingOption = durationOptions.find(
          (opt) => opt.value === pkg.duration && opt.type === pkg.durationType
        );

        reset({
          title: pkg.title,
          duration: pkg.duration.toString(),
          amount: pkg.amount.toString(),
          color: pkg.color,
        });

        setFormState({
          selectedColor: pkg.color,
          durationType: pkg.durationType,
          admissionFee: pkg.admissionFee,
          selectedDuration: matchingOption ? matchingOption.label : "",
        });
      } else {
        // Create mode - reset to defaults
        reset({
          title: "",
          duration: "",
          amount: "",
          color: "#7C3AED",
        });

        setFormState({
          selectedColor: "#7C3AED",
          durationType: "Months",
          selectedDuration: "",
          admissionFee: false,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, pkg]);

  const handleFormSubmit = (formData: Record<string, unknown>) => {
    const title = formData.title as string;
    const amount = formData.amount as string;

    if (!title.trim()) {
      toast.error("Package name is required");
      return;
    }

    let duration: number;
    let finalDurationType: "Days" | "Months";

    if (isEditMode) {
      // Edit mode - use manual input
      const durationInput = formData.duration as string;
      if (!durationInput || parseInt(durationInput) <= 0) {
        toast.error("Duration must be greater than 0");
        return;
      }
      duration = parseInt(durationInput);
      finalDurationType = formState.durationType;
    } else {
      // Create mode - use dropdown selection
      if (!formState.selectedDuration) {
        toast.error("Duration is required");
        return;
      }
      const selectedOption = durationOptions.find(
        (opt) => opt.label === formState.selectedDuration
      );
      if (!selectedOption) {
        toast.error("Invalid duration selected");
        return;
      }
      duration = selectedOption.value;
      finalDurationType = selectedOption.type as "Days" | "Months";
    }

    if (!amount || parseInt(amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    onSubmit({
      title,
      duration,
      durationType: finalDurationType,
      amount: parseInt(amount),
      color: formState.selectedColor,
      admissionFee: formState.admissionFee,
    });

    toast.success(
      isEditMode
        ? "Package updated successfully!"
        : "Package created successfully!"
    );
  };

  const handleColorSelect = (color: string) => {
    setFormState((prev) => ({
      ...prev,
      selectedColor: color,
    }));
    setValue("color", color);
    setIsColorSelectOpen(false);
  };

  const handleDurationTypeChange = (value: "Days" | "Months") => {
    setFormState((prev) => ({
      ...prev,
      durationType: value,
    }));
  };

  const handleDurationChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      selectedDuration: value,
    }));
    const option = durationOptions.find((opt) => opt.label === value);
    if (option) {
      setFormState((prev) => ({
        ...prev,
        durationType: option.type as "Days" | "Months",
      }));
      setValue("duration", option.value.toString());
    }
  };

  const handleAdmissionFeeChange = (checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      admissionFee: checked,
    }));
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-white/30 backdrop-blur-sm" />
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {isEditMode ? "Edit Package" : "Create Package"}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode
              ? "Update gym membership package details."
              : "Add and manage gym membership packages."}
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 mt-4"
        >
          {/* Title */}
          <div>
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-900"
            >
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Type package name"
              {...register("title")}
              className="mt-1.5"
            />
          </div>

          {/* Duration and Type */}
          {isEditMode ? (
            // Edit mode - manual input
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="duration"
                  className="text-sm font-medium text-gray-900"
                >
                  Duration <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Enter duration"
                  {...register("duration", { min: 1 })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label
                  htmlFor="durationType"
                  className="text-sm font-medium text-gray-900"
                >
                  Duration Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formState.durationType}
                  onValueChange={handleDurationTypeChange}
                >
                  <SelectTrigger className="mt-1.5 w-full h-10! shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Days">Days</SelectItem>
                    <SelectItem value="Months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            // Create mode - dropdown selection
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="duration"
                  className="text-sm font-medium text-gray-900"
                >
                  Duration <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formState.selectedDuration}
                  onValueChange={handleDurationChange}
                >
                  <SelectTrigger className="mt-1.5 w-full h-10! shadow-none">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.label} value={option.label}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="durationType"
                  className="text-sm font-medium text-gray-900"
                >
                  Duration Type <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1.5">
                  <div className="w-full h-10! px-3 py-2 rounded-md border border-input bg-gray-50 flex items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {formState.durationType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Amount */}
          <div>
            <Label
              htmlFor="amount"
              className="text-sm font-medium text-gray-900"
            >
              Amount <span className="text-red-500">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Type package amount"
              {...register("amount", { min: 1 })}
              className="mt-1.5"
            />
          </div>

          {/* Color Selection */}
          <div>
            <Label className="text-sm font-medium text-gray-900">
              Select Color
            </Label>

            {/* Hidden input to keep RHF happy */}
            <Input type="hidden" {...register("color")} />

            <div className="mt-1.5">
              <div className="relative">
                {/* Custom trigger that always shows the current color */}
                <button
                  type="button"
                  onClick={() => setIsColorSelectOpen(!isColorSelectOpen)}
                  className="w-full h-10! px-3 flex items-center gap-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <div
                    className="w-5 h-5 rounded border border-gray-300 shrink-0"
                    style={{ backgroundColor: formState.selectedColor }}
                  />
                  <span className="text-sm truncate">
                    {formState.selectedColor}
                  </span>
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
                            formState.selectedColor === color
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

          {/* Admission Fee Toggle */}
          <div className="flex items-start justify-between gap-3 pt-2">
            <div>
              <Label
                htmlFor="admissionFee"
                className="text-sm font-medium text-gray-900"
              >
                Admission Fee
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                Choose whether this package should include the admission fee
              </p>
            </div>
            <Switch
              id="admissionFee"
              checked={formState.admissionFee}
              onCheckedChange={handleAdmissionFeeChange}
            />
          </div>

          {/* Buttons */}
          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            {isEditMode && onDelete && (
              <Button
                type="button"
                onClick={onDelete}
                className="bg-red-50 text-red-600 hover:bg-red-100 sm:mr-auto"
              >
                Delete
              </Button>
            )}
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
              {isEditMode ? "Update" : "Create Package"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
