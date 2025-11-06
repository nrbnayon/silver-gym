"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Finding account for:", email);
    // Implement account recovery logic
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-linear-to-br from-orange-50 via-white to-orange-50/50'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-sm border border-orange-100/50 p-8 sm:p-10'>
        <h2 className='text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center'>
          Find Your Account
        </h2>
        <p className='text-muted-foreground text-base mb-8 text-center leading-relaxed'>
          Please enter your email address or mobile number to search for your
          account.
        </p>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email or phone number'
            className='h-14 rounded-lg text-base'
          />

          <Button
            type='submit'
            disabled={!email}
            className={`w-full h-14 rounded-lg text-base ${
              email
                ? "btn-primary"
                : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
            }`}
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}
