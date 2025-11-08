"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative w-full overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-[-65px] left-[1236px] w-[501px] h-[234px] bg-white rounded-[250.46px/117.05px] -rotate-45 blur-[234px]" />

      {/* Partial border wrapper */}
      <div className="relative w-full max-w-2xl bg-[#EEEEEE4D] rounded-4xl overflow-visible">
        {/* Top-right corner */}
        <div className="absolute top-0 right-0 w-full h-full rounded-4xl p-px z-0 backdrop-blur-sm opacity-90 bg-[linear-gradient(225deg,rgba(103,56,41,0.25)_0%,rgba(255,255,255,0)_65%,rgba(103,56,41,0.25)_100%)]">
          <div className="w-full h-full rounded-4xl bg-[#EEEEEE4D]" />
        </div>

        {/* Bottom-left corner */}
        <div className="absolute bottom-0 left-0 w-full h-full rounded-4xl p-px z-0 backdrop-blur-sm opacity-90 bg-[linear-gradient(45deg,rgba(103,56,41,0.25)_0%,rgba(255,255,255,0)_65%,rgba(103,56,41,0.25)_100%)]">
          <div className="w-full h-full rounded-4xl bg-[#EEEEEE4D]" />
        </div>

        {/* Main card */}
        <Card className="relative z-20 bg-white rounded-2xl shadow-[-76px_59px_212px_#ff73001a,-305px_235px_250px_#ff730017,-687px_529px_250px_#ff73000d,-1221px_940px_250px_#ff730003,-1908px_1469px_250px_transparent] border-none m-4">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              {/* Step Indicator */}
              <StepIndicator currentStep={2} />

              {/* Title and Step Counter */}
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-[#505050] text-2xl leading-9">
                      Contact Info
                    </h1>
                    <p className="font-normal text-[#505050] text-base leading-6">
                      Provide your official phone number and email for
                      communication
                    </p>
                  </div>
                  <span className="text-sm font-medium text-[#9CA3AF] bg-[#F3F4F6] px-3 py-1 rounded-full">
                    2/2
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {/* Country */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="country"
                    className="text-sm font-medium text-[#505050]"
                  >
                    Country
                  </Label>
                  <select
                    id="country"
                    className="w-full h-14 px-4 py-3 rounded-lg border-2 border-[#E1E1E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#E97451] focus:ring-opacity-50 focus:border-[#E97451] transition-all text-base text-[#505050]"
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
                    <span className="text-sm text-[#FC5555]">
                      {errors.country.message}
                    </span>
                  )}
                </div>

                {/* Business Address */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="businessAddress"
                    className="text-sm font-medium text-[#505050]"
                  >
                    Business Address
                  </Label>
                  <Input
                    id="businessAddress"
                    type="text"
                    placeholder="Enter your business address"
                    className="h-14 rounded-lg text-base border-[#E1E1E1] focus:border-[#E97451] focus:ring-[#E97451] focus:ring-2 focus:ring-opacity-50"
                    {...register("businessAddress")}
                  />
                  {errors.businessAddress && (
                    <span className="text-sm text-[#FC5555]">
                      {errors.businessAddress.message}
                    </span>
                  )}
                </div>

                {/* Business Phone Number */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="businessPhone"
                    className="text-sm font-medium text-[#505050]"
                  >
                    Business Phone Number
                  </Label>
                  <Input
                    id="businessPhone"
                    type="tel"
                    placeholder="Enter your business phone number"
                    className="h-14 rounded-lg text-base border-[#E1E1E1] focus:border-[#E97451] focus:ring-[#E97451] focus:ring-2 focus:ring-opacity-50"
                    {...register("businessPhone")}
                  />
                  {errors.businessPhone && (
                    <span className="text-sm text-[#FC5555]">
                      {errors.businessPhone.message}
                    </span>
                  )}
                </div>

                {/* Business Email Address */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="businessEmail"
                    className="text-sm font-medium text-[#505050]"
                  >
                    Business Email Address
                  </Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    placeholder="Enter your business email address"
                    className="h-14 rounded-lg text-base border-[#E1E1E1] focus:border-[#E97451] focus:ring-[#E97451] focus:ring-2 focus:ring-opacity-50"
                    {...register("businessEmail")}
                  />
                  {errors.businessEmail && (
                    <span className="text-sm text-[#FC5555]">
                      {errors.businessEmail.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                  className={`w-full h-14 rounded-lg text-xl font-medium transition-colors duration-300 
                    ${
                      isLoading
                        ? "bg-[#D9D9D9] text-[#9CA3AF] cursor-not-allowed hover:bg-[#D9D9D9]"
                        : "bg-[#E97451] hover:bg-[#d66542] text-white"
                    }`}
                >
                  {isLoading ? "Submitting..." : "Next"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
