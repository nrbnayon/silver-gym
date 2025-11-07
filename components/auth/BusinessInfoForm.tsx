"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StepIndicator from "@/components/auth/StepIndicator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessType: z.string().min(1, "Please select a business type"),
  registrationNumber: z.string().optional(),
  logo: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BusinessInfoForm() {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
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
      businessName: "",
      businessType: "",
      registrationNumber: "",
    },
  });

  // Check if user has completed verification
  useEffect(() => {
    const verificationComplete = localStorage.getItem("verification_complete");
    if (verificationComplete !== "true") {
      router.push("/sign-up");
    }

    // Load saved data if exists
    const savedData = localStorage.getItem("businessInfo");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setValue("businessName", parsed.businessName || "");
      setValue("businessType", parsed.businessType || "");
      setValue("registrationNumber", parsed.registrationNumber || "");
      if (parsed.logoPreview) {
        setLogoPreview(parsed.logoPreview);
      }
    }
  }, [router, setValue]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        console.error("File size exceeds 2MB");
        // Add toast notification here
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        console.error("Please upload an image file");
        // Add toast notification here
        return;
      }

      setLogo(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Save business info to localStorage
      const businessInfo = {
        businessName: data.businessName,
        businessType: data.businessType,
        registrationNumber: data.registrationNumber,
        logoPreview: logoPreview,
      };

      localStorage.setItem("businessInfo", JSON.stringify(businessInfo));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to contact info page
      router.push("/contact-info");
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
        <StepIndicator currentStep={1} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Business Information
            </h2>
            <span className="text-sm font-medium text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">
              1/2
            </span>
          </div>
          <p className="text-muted-foreground text-base">
            Enter your gym or company details to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Logo</Label>
            <label
              htmlFor="logo-upload"
              className="border-2 border-dashed border-gray-200 rounded-lg p-10 text-center hover:border-gray-300 hover:bg-gray-50/50 transition-all cursor-pointer block group"
            >
              <div className="flex flex-col items-center gap-3">
                {logoPreview ? (
                  <Image
                    width={80}
                    height={80}
                    src={logoPreview}
                    alt="Logo preview"
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Upload className="w-6 h-6 text-gray-500" />
                  </div>
                )}
                <span className="text-sm font-medium text-foreground">
                  {logo ? logo.name : "Upload"}
                </span>
                {!logo && (
                  <span className="text-xs text-muted-foreground">
                    PNG, JPG or JPEG (Max 2MB)
                  </span>
                )}
              </div>
              <input
                id="logo-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium">
              Business Name
            </Label>
            <Input
              id="businessName"
              type="text"
              placeholder="Type your business name"
              className="h-14 rounded-lg text-base"
              {...register("businessName")}
            />
            {errors.businessName && (
              <span className="text-sm text-red-500">
                {errors.businessName.message}
              </span>
            )}
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <Label htmlFor="businessType" className="text-sm font-medium">
              Business Type
            </Label>
            <select
              id="businessType"
              className="w-full h-14 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
              {...register("businessType")}
            >
              <option value="">Select your business</option>
              <option value="gym">Gym</option>
              <option value="fitness-center">Fitness Center</option>
              <option value="yoga-studio">Yoga Studio</option>
              <option value="crossfit">CrossFit Box</option>
              <option value="sports-club">Sports Club</option>
            </select>
            {errors.businessType && (
              <span className="text-sm text-red-500">
                {errors.businessType.message}
              </span>
            )}
          </div>

          {/* Registration Number */}
          <div className="space-y-2">
            <Label htmlFor="registrationNumber" className="text-sm font-medium">
              Registration Number{" "}
              <span className="text-muted-foreground font-normal">
                (Optional)
              </span>
            </Label>
            <Input
              id="registrationNumber"
              type="text"
              placeholder="Business registration number / Trade Licence"
              className="h-14 rounded-lg text-base"
              {...register("registrationNumber")}
            />
          </div>

          {/* Next Button */}
          <Button
            type="submit"
            className="btn-primary w-full h-14 rounded-lg text-base"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Next"}
          </Button>
        </form>
      </div>
    </div>
  );
}
