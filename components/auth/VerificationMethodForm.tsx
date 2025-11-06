"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerificationMethodForm() {
  const [selectedMethod, setSelectedMethod] = useState<"email" | "phone" | "">(
    ""
  );

  const handleSubmit = () => {
    console.log("Selected method:", selectedMethod);
    // Implement verification method selection logic
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-linear-to-br from-orange-50 via-white to-orange-50/50'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-sm border border-orange-100/50 p-8 sm:p-10'>
        <h2 className='text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center'>
          Verification Method
        </h2>
        <p className='text-muted-foreground text-base mb-8 text-center leading-relaxed'>
          We found your account. Choose how you&apos;d like to receive your
          reset code.
        </p>

        <div className='space-y-4 mb-8'>
          {/* Email Option */}
          <button
            type='button'
            onClick={() => setSelectedMethod("email")}
            className={`w-full p-5 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
              selectedMethod === "email"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors ${
                selectedMethod === "email" ? "bg-primary/10" : "bg-gray-100"
              }`}
            >
              <Mail
                className={`w-7 h-7 ${
                  selectedMethod === "email" ? "text-primary" : "text-gray-600"
                }`}
              />
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-foreground text-base mb-0.5'>
                Send Code to Email
              </div>
              <div className='text-sm text-muted-foreground'>
                sm.....m@gmail.com
              </div>
            </div>
          </button>

          {/* Phone Option */}
          <button
            type='button'
            onClick={() => setSelectedMethod("phone")}
            className={`w-full p-5 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
              selectedMethod === "phone"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors ${
                selectedMethod === "phone" ? "bg-primary/10" : "bg-gray-100"
              }`}
            >
              <Phone
                className={`w-7 h-7 ${
                  selectedMethod === "phone" ? "text-primary" : "text-gray-600"
                }`}
              />
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-foreground text-base mb-0.5'>
                Send Code to Phone
              </div>
              <div className='text-sm text-muted-foreground'>
                +880 16••••••56
              </div>
            </div>
          </button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!selectedMethod}
          className={`w-full h-14 rounded-lg text-base ${
            selectedMethod
              ? "btn-primary"
              : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
          }`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
