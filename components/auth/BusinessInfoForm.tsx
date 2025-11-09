"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        console.error("Please upload an image file");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4 relative w-full overflow-hidden bg-white'>
      {/* Background decoration */}
      <div className='absolute top-[-65px] left-[1236px] w-[501px] h-[234px] bg-white rounded-[250.46px/117.05px] -rotate-45 blur-[234px]' />

      {/* Partial border wrapper */}
      <div className='relative w-full max-w-2xl bg-[#EEEEEE4D] rounded-4xl overflow-visible'>
        {/* Top-right corner */}
        <div className='absolute top-0 right-0 w-full h-full rounded-4xl p-px z-0 backdrop-blur-sm opacity-90 bg-[linear-gradient(225deg,rgba(103,56,41,0.25)_0%,rgba(255,255,255,0)_65%,rgba(103,56,41,0.25)_100%)]'>
          <div className='w-full h-full rounded-4xl bg-[#EEEEEE4D]' />
        </div>

        {/* Bottom-left corner */}
        <div className='absolute bottom-0 left-0 w-full h-full rounded-4xl p-px z-0 backdrop-blur-sm opacity-90 bg-[linear-gradient(45deg,rgba(103,56,41,0.25)_0%,rgba(255,255,255,0)_65%,rgba(103,56,41,0.25)_100%)]'>
          <div className='w-full h-full rounded-4xl bg-[#EEEEEE4D]' />
        </div>

        {/* Main card */}
        <Card className='relative z-20 bg-white rounded-2xl shadow-[-76px_59px_212px_#ff73001a,-305px_235px_250px_#ff730017,-687px_529px_250px_#ff73000d,-1221px_940px_250px_#ff730003,-1908px_1469px_250px_transparent] border-none m-4'>
          <CardContent className='p-8'>
            <div className='flex flex-col gap-6'>
              {/* Step Indicator */}
              <StepIndicator currentStep={1} />

              {/* Title and Step Counter */}
              <div className='flex flex-col gap-6'>
                <div className='flex justify-between items-start'>
                  <div className='flex flex-col gap-1'>
                    <h1 className='font-semibold text-[#505050] text-2xl leading-9'>
                      Business Information
                    </h1>
                    <p className='font-normal text-[#505050] text-base leading-6'>
                      Enter your gym or company details to get started.
                    </p>
                  </div>
                  <span className='text-sm font-medium text-[#9CA3AF] bg-[#F3F4F6] px-3 py-1 rounded-full'>
                    1/2
                  </span>
                </div>
              </div>

              <div className='flex flex-col gap-6'>
                {/* Logo Upload */}
                <div className='flex flex-col gap-2'>
                  <Label className='text-sm font-medium text-[#505050]'>
                    Logo
                  </Label>
                  <label
                    htmlFor='logo-upload'
                    className='border-2 border-dashed border-[#E5E7EB] rounded-lg p-4 text-center hover:border-[#D1D5DB] hover:bg-[#F9FAFB] transition-all cursor-pointer flex flex-col items-center gap-3'
                  >
                    {logoPreview ? (
                      <Image
                        width={80}
                        height={80}
                        src={logoPreview}
                        alt='Logo preview'
                        className='object-cover rounded-lg'
                      />
                    ) : (
                      <div className='w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center'>
                        <Upload className='w-6 h-6 text-[#6B7280]' />
                      </div>
                    )}
                    <span className='text-sm font-medium text-[#505050]'>
                      {logo ? logo.name : "Upload"}
                    </span>
                    {!logo && (
                      <span className='text-xs text-[#9CA3AF]'>
                        PNG, JPG or JPEG (Max 2MB)
                      </span>
                    )}
                    <input
                      id='logo-upload'
                      type='file'
                      accept='image/png, image/jpeg, image/jpg'
                      onChange={handleLogoUpload}
                      className='hidden'
                    />
                  </label>
                </div>

                {/* Business Name */}
                <div className='flex flex-col gap-2'>
                  <Label
                    htmlFor='businessName'
                    className='text-sm font-medium text-[#505050]'
                  >
                    Business Name
                  </Label>
                  <Input
                    id='businessName'
                    type='text'
                    placeholder='Type your business name'
                    className='h-14 rounded-lg text-base border-[#E1E1E1] focus:border-[#E97451] focus:ring-[#E97451] focus:ring-2 focus:ring-opacity-50'
                    {...register("businessName")}
                  />
                  {errors.businessName && (
                    <span className='text-sm text-[#FC5555]'>
                      {errors.businessName.message}
                    </span>
                  )}
                </div>

                {/* Business Type */}
                <div className='flex flex-col gap-2'>
                  <Label
                    htmlFor='businessType'
                    className='text-sm font-medium text-[#505050]'
                  >
                    Business Type
                  </Label>
                  <select
                    id='businessType'
                    className='w-full h-14 px-4 py-3 rounded-lg border border-[#E1E1E1] bg-white focus-visible:border-[#F05B23] focus-visible:shadow-[0_0_0_3px_#FCF0ED] transition-all text-base text-[#505050]'
                    {...register("businessType")}
                  >
                    <option value=''>Select your business</option>
                    <option value='gym'>Gym</option>
                    <option value='fitness-center'>Fitness Center</option>
                    <option value='yoga-studio'>Yoga Studio</option>
                    <option value='crossfit'>CrossFit Box</option>
                    <option value='sports-club'>Sports Club</option>
                  </select>
                  {errors.businessType && (
                    <span className='text-sm text-[#FC5555]'>
                      {errors.businessType.message}
                    </span>
                  )}
                </div>

                {/* Registration Number */}
                <div className='flex flex-col gap-2'>
                  <Label
                    htmlFor='registrationNumber'
                    className='text-sm font-medium text-[#505050]'
                  >
                    Registration Number{" "}
                    <span className='text-[#9CA3AF] font-normal'>
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id='registrationNumber'
                    type='text'
                    placeholder='Business registration number / Trade Licence'
                    className='h-14 rounded-lg text-base border-[#E1E1E1] focus:border-[#E97451] focus:ring-[#E97451] focus:ring-2 focus:ring-opacity-50'
                    {...register("registrationNumber")}
                  />
                </div>

                {/* Next Button */}
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
                  {isLoading ? "Saving..." : "Next"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
