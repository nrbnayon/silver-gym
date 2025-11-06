"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StepIndicator from "@/components/auth/StepIndicator";

export default function ContactInfoForm() {
  const [formData, setFormData] = useState({
    country: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Info:", formData);
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-linear-to-br from-orange-50 via-white to-orange-50/50'>
      <div className='w-full max-w-2xl bg-white rounded-lg shadow-sm border border-orange-100/50 p-6 sm:p-8 lg:p-10'>
        {/* Step Indicator */}
        <StepIndicator currentStep={2} />

        {/* Header */}
        <div className='mb-8'>
          <div className='flex justify-between items-start mb-2'>
            <h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
              Contact Info
            </h2>
            <span className='text-sm font-medium text-muted-foreground bg-gray-100 px-3 py-1 rounded-full'>
              2/2
            </span>
          </div>
          <p className='text-muted-foreground text-base'>
            Provide your official phone number and email for communication
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Country */}
          <div className='space-y-2'>
            <Label htmlFor='country' className='text-sm font-medium'>
              Country
            </Label>
            <select
              id='country'
              className='w-full h-14 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base'
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            >
              <option value=''>Select You</option>
              <option value='bd'>Bangladesh</option>
              <option value='in'>India</option>
              <option value='pk'>Pakistan</option>
              <option value='us'>United States</option>
              <option value='uk'>United Kingdom</option>
              <option value='ca'>Canada</option>
              <option value='au'>Australia</option>
            </select>
          </div>

          {/* Business Address */}
          <div className='space-y-2'>
            <Label htmlFor='businessAddress' className='text-sm font-medium'>
              Business Address
            </Label>
            <Input
              id='businessAddress'
              type='text'
              placeholder='Enter your email or phone number'
              className='h-14 rounded-lg text-base'
              value={formData.businessAddress}
              onChange={(e) =>
                setFormData({ ...formData, businessAddress: e.target.value })
              }
            />
          </div>

          {/* Business Phone Number */}
          <div className='space-y-2'>
            <Label htmlFor='businessPhone' className='text-sm font-medium'>
              Business Phone Number
            </Label>
            <Input
              id='businessPhone'
              type='tel'
              placeholder='Enter your email or phone number'
              className='h-14 rounded-lg text-base'
              value={formData.businessPhone}
              onChange={(e) =>
                setFormData({ ...formData, businessPhone: e.target.value })
              }
            />
          </div>

          {/* Business Email Address */}
          <div className='space-y-2'>
            <Label htmlFor='businessEmail' className='text-sm font-medium'>
              Business Email Address
            </Label>
            <Input
              id='businessEmail'
              type='email'
              placeholder='Enter your email or phone number'
              className='h-14 rounded-lg text-base'
              value={formData.businessEmail}
              onChange={(e) =>
                setFormData({ ...formData, businessEmail: e.target.value })
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
