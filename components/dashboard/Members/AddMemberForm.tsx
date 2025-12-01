// components/dashboard/Members/AddMemberForm.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon } from "@hugeicons/core-free-icons";

const addMemberSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  contact: z.string().min(1, "Contact is required"),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  emergencyContact: z.string().optional(),
  nid: z.string().optional(),
  height: z.string().optional(),
  gender: z.string().optional(),
  weight: z.string().optional(),
  address: z.string().optional(),
  trainingGoals: z.array(z.string()).optional(),
});

type AddMemberFormData = z.infer<typeof addMemberSchema>;

interface AddMemberFormProps {
  onSubmit?: (data: AddMemberFormData) => void;
  onCancel?: () => void;
}

const trainingGoalsOptions = [
  { id: "yoga", label: "Yoga" },
  { id: "muscle-gain", label: "Muscle Gain" },
  { id: "cardio", label: "Cardio Endurance" },
  { id: "flexibility", label: "Flexibility & Mobility" },
  { id: "bodybuilding", label: "Bodybuilding" },
  { id: "general-fitness", label: "General Fitness" },
];

export default function AddMemberForm({
  onSubmit,
  onCancel,
}: AddMemberFormProps) {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddMemberFormData>({
    resolver: zodResolver(addMemberSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoalChange = (goalId: string, checked: boolean) => {
    if (checked) {
      setSelectedGoals([...selectedGoals, goalId]);
    } else {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId));
    }
  };

  const handleFormSubmit = (data: AddMemberFormData) => {
    const formData = {
      ...data,
      trainingGoals: selectedGoals,
    };
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Profile Picture Upload Section */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple to-pink-500 flex items-center justify-center overflow-hidden">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Profile"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-white text-2xl font-bold">M</div>
          )}
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <HugeiconsIcon icon={Upload01Icon} size={16} />
            <span className="text-sm font-medium text-gray-700">
              Upload Profile
            </span>
          </div>
        </label>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Mahdee Rashid"
              {...register("fullName")}
              className="h-11"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-sm font-medium">
              Contact
            </Label>
            <Input
              id="contact"
              placeholder="(239) 555-0108"
              {...register("contact")}
              className="h-11"
            />
            {errors.contact && (
              <p className="text-xs text-red-500">{errors.contact.message}</p>
            )}
          </div>

          {/* E-mail */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="michelle.rivera@example.com"
              {...register("email")}
              className="h-11"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-medium">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
              className="h-11"
            />
          </div>

          {/* Emergency Contact */}
          <div className="space-y-2">
            <Label htmlFor="emergencyContact" className="text-sm font-medium">
              Emergency Contact
            </Label>
            <Input
              id="emergencyContact"
              placeholder="(303) 555-0105"
              {...register("emergencyContact")}
              className="h-11"
            />
          </div>

          {/* NID */}
          <div className="space-y-2">
            <Label htmlFor="nid" className="text-sm font-medium">
              NID
            </Label>
            <Input
              id="nid"
              placeholder="895641759941"
              {...register("nid")}
              className="h-11"
            />
          </div>

          {/* Address */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Address
            </Label>
            <Input
              id="address"
              placeholder="Flat 38, House 12, Road 5, Dhanmondi Residential Area, Dhaka-1209, Bangladesh"
              {...register("address")}
              className="h-11"
            />
          </div>
        </div>
      </div>

      {/* Physical Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Physical Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Height */}
          <div className="space-y-2">
            <Label htmlFor="height" className="text-sm font-medium">
              Height
            </Label>
            <Input
              id="height"
              placeholder="5.8"
              {...register("height")}
              className="h-11"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm font-medium">
              Gender
            </Label>
            <Select onValueChange={(value) => setValue("gender", value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Male" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium">
              Weight
            </Label>
            <Input
              id="weight"
              placeholder="70"
              {...register("weight")}
              className="h-11"
            />
          </div>
        </div>
      </div>

      {/* Training Goals */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Training Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainingGoalsOptions.map((goal) => (
            <div key={goal.id} className="flex items-center gap-3">
              <Checkbox
                id={goal.id}
                checked={selectedGoals.includes(goal.id)}
                onCheckedChange={(checked) =>
                  handleGoalChange(goal.id, checked as boolean)
                }
              />
              <label
                htmlFor={goal.id}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {goal.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-6">
        <Button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border bg-white border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 px-4 py-3 bg-purple text-white rounded-lg hover:bg-[#6A3FE0] transition-colors font-medium"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
