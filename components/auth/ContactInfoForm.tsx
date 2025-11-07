"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StepIndicator from "@/components/auth/StepIndicator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  country: z.string().min(1, "Please select a country"),
  businessAddress: z.string().min(1, "Business address is required"),
  businessPhone: z
    .string()
    .min(1, "Business phone number is required")
    .regex(/^\+?\d{10,15}$/, "Please enter a valid phone number"),
  businessEmail: z
    .string()
    .min(1, "Business email is required")
    .email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ContactInfoForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "",
      businessAddress: "",
      businessPhone: "",
      businessEmail: "",
    },
  });

  // Check if user has completed business info
  useEffect(() => {
    const businessInfo = localStorage.getItem("businessInfo");
    const verificationComplete = localStorage.getItem("verification_complete");

    if (!businessInfo || verificationComplete !== "true") {
      router.push("/sign-up");
    }

    // Load saved data if exists
    const savedData = localStorage.getItem("contactInfo");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setValue("country", parsed.country || "");
      setValue("businessAddress", parsed.businessAddress || "");
      setValue("businessPhone", parsed.businessPhone || "");
      setValue("businessEmail", parsed.businessEmail || "");
    }
  }, [router, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Save contact info to localStorage
      localStorage.setItem("contactInfo", JSON.stringify(data));

      // Combine all data
      const signupData = JSON.parse(localStorage.getItem("signupData") || "{}");
      const businessInfo = JSON.parse(
        localStorage.getItem("businessInfo") || "{}"
      );

      const completeData = {
        ...signupData,
        ...businessInfo,
        ...data,
      };

      console.log("Complete registration data:", completeData);

      // Here you would make API call to create account
      // await api.register(completeData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to success page
      router.push("/success");
    } catch (error) {
      console.error("Submission failed:", error);
      // Add toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-linear-to-br from-orange-50 via-white to-orange-50/50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-orange-100/50 p-6 sm:p-8 lg:p-10">
        {/* Step Indicator */}
        <StepIndicator currentStep={2} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Contact Info
            </h2>
            <span className="text-sm font-medium text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">
              2/2
            </span>
          </div>
          <p className="text-muted-foreground text-base">
            Provide your official phone number and email for communication
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              Country
            </Label>
            <select
              id="country"
              className="w-full h-14 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
              {...register("country")}
            >
              <option value="">Select Your Country</option>
              <option value="bd">Bangladesh</option>
              <option value="in">India</option>
              <option value="pk">Pakistan</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
            </select>
            {errors.country && (
              <span className="text-sm text-red-500">
                {errors.country.message}
              </span>
            )}
          </div>

          {/* Business Address */}
          <div className="space-y-2">
            <Label htmlFor="businessAddress" className="text-sm font-medium">
              Business Address
            </Label>
            <Input
              id="businessAddress"
              type="text"
              placeholder="Enter your business address"
              className="h-14 rounded-lg text-base"
              {...register("businessAddress")}
            />
            {errors.businessAddress && (
              <span className="text-sm text-red-500">
                {errors.businessAddress.message}
              </span>
            )}
          </div>

          {/* Business Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="businessPhone" className="text-sm font-medium">
              Business Phone Number
            </Label>
            <Input
              id="businessPhone"
              type="tel"
              placeholder="Enter your business phone number"
              className="h-14 rounded-lg text-base"
              {...register("businessPhone")}
            />
            {errors.businessPhone && (
              <span className="text-sm text-red-500">
                {errors.businessPhone.message}
              </span>
            )}
          </div>

          {/* Business Email Address */}
          <div className="space-y-2">
            <Label htmlFor="businessEmail" className="text-sm font-medium">
              Business Email Address
            </Label>
            <Input
              id="businessEmail"
              type="email"
              placeholder="Enter your business email address"
              className="h-14 rounded-lg text-base"
              {...register("businessEmail")}
            />
            {errors.businessEmail && (
              <span className="text-sm text-red-500">
                {errors.businessEmail.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="btn-primary w-full h-14 rounded-lg text-base"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Next"}
          </Button>
        </form>
      </div>
    </div>
  );
}
