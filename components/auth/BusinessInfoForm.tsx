"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StepIndicator from "@/components/auth/StepIndicator";

export default function BusinessInfoForm() {
  const [logo, setLogo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    registrationNumber: "",
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Business Info:", formData, logo);
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-linear-to-br from-orange-50 via-white to-orange-50/50'>
      <div className='w-full max-w-2xl bg-white rounded-lg shadow-sm border border-orange-100/50 p-6 sm:p-8 lg:p-10'>
        {/* Step Indicator */}
        <StepIndicator currentStep={1} />

        {/* Header */}
        <div className='mb-8'>
          <div className='flex justify-between items-start mb-2'>
            <h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
              Business Information
            </h2>
            <span className='text-sm font-medium text-muted-foreground bg-gray-100 px-3 py-1 rounded-full'>
              1/2
            </span>
          </div>
          <p className='text-muted-foreground text-base'>
            Enter your gym or company details to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Logo Upload */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Logo</Label>
            <label
              htmlFor='logo-upload'
              className='border-2 border-dashed border-gray-200 rounded-lg p-10 text-center hover:border-gray-300 hover:bg-gray-50/50 transition-all cursor-pointer block group'
            >
              <div className='flex flex-col items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors'>
                  <Upload className='w-6 h-6 text-gray-500' />
                </div>
                <span className='text-sm font-medium text-foreground'>
                  {logo ? logo.name : "Upload"}
                </span>
                {!logo && (
                  <span className='text-xs text-muted-foreground'>
                    PNG, JPG or JPEG (Max 2MB)
                  </span>
                )}
              </div>
              <input
                id='logo-upload'
                type='file'
                accept='image/*'
                onChange={handleLogoUpload}
                className='hidden'
              />
            </label>
          </div>

          {/* Business Name */}
          <div className='space-y-2'>
            <Label htmlFor='businessName' className='text-sm font-medium'>
              Business Name
            </Label>
            <Input
              id='businessName'
              type='text'
              placeholder='Type your business name'
              className='h-14 rounded-lg text-base'
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
            />
          </div>

          {/* Business Type */}
          <div className='space-y-2'>
            <Label htmlFor='businessType' className='text-sm font-medium'>
              Business Type
            </Label>
            <select
              id='businessType'
              className='w-full h-14 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base'
              value={formData.businessType}
              onChange={(e) =>
                setFormData({ ...formData, businessType: e.target.value })
              }
            >
              <option value=''>Select your business</option>
              <option value='gym'>Gym</option>
              <option value='fitness-center'>Fitness Center</option>
              <option value='yoga-studio'>Yoga Studio</option>
              <option value='crossfit'>CrossFit Box</option>
              <option value='sports-club'>Sports Club</option>
            </select>
          </div>

          {/* Registration Number */}
          <div className='space-y-2'>
            <Label htmlFor='registrationNumber' className='text-sm font-medium'>
              Registration Number{" "}
              <span className='text-muted-foreground font-normal'>
                (Optional)
              </span>
            </Label>
            <Input
              id='registrationNumber'
              type='text'
              placeholder='Business registration number / Tread Licence'
              className='h-14 rounded-lg text-base'
              value={formData.registrationNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registrationNumber: e.target.value,
                })
              }
            />
          </div>

          {/* Next Button */}
          <Button
            type='submit'
            className='btn-primary w-full h-14 rounded-lg text-base'
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}
