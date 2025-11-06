"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthHero from "@/components/auth/AuthHero";
import GoogleButton from "@/components/auth/GoogleButton";

// ✅ Form data type
interface SignInFormValues {
  emailOrPhone: string;
  password: string;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  // ✅ Handle form submit
  const onSubmit = async (data: SignInFormValues) => {
    console.log("Sign in data:", data);
    // TODO: Replace with API call (e.g. axios.post("/api/login", data))
  };

  return (
    <div className='min-h-screen w-full flex'>
      {/* Left Side - Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12'>
        <div className='w-full max-w-[480px]'>
          {/* Heading */}
          <div className='mb-12'>
            <h1 className='text-[40px] lg:text-[48px] font-bold text-foreground mb-3 leading-tight'>
              Welcome Back
            </h1>
            <p className='text-secondary text-lg'>
              Sign in to manage your gym management system
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Email or Phone */}
            <div className='space-y-2'>
              <Label htmlFor='emailOrPhone' className='text-sm font-medium'>
                Email or phone
              </Label>
              <Input
                id='emailOrPhone'
                type='text'
                placeholder='Enter your email or phone number'
                className={`h-14 rounded-lg text-base ${
                  errors.emailOrPhone ? "border-red-500 focus:ring-red-500" : ""
                }`}
                {...register("emailOrPhone", {
                  required: "Email or phone number is required",
                  validate: (value) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^[0-9]{10,15}$/;
                    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
                      return "Enter a valid email or phone number";
                    }
                    return true;
                  },
                })}
              />
              {errors.emailOrPhone && (
                <p className='text-red-500 text-sm'>
                  {errors.emailOrPhone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password' className='text-sm font-medium'>
                  Password
                </Label>
                <Link
                  href='/forgot-password'
                  className='text-sm font-medium text-[#8b5cf6] hover:underline'
                >
                  Forget Password?
                </Link>
              </div>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='••••••••'
                  className={`h-14 rounded-lg text-base pr-12 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showPassword ? (
                    <Eye className='w-5 h-5' />
                  ) : (
                    <EyeOff className='w-5 h-5' />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <Button
              type='submit'
              disabled={isSubmitting}
              className='btn-primary h-14 text-base rounded-lg w-full'
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            {/* Divider */}
            <div className='relative flex items-center justify-center my-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-200'></div>
              </div>
              <div className='relative bg-background px-4'>
                <span className='text-sm text-secondary'>or</span>
              </div>
            </div>

            {/* Google Sign In */}
            <GoogleButton text='Log in with Google' />
          </form>

          {/* Sign Up Link */}
          <p className='mt-8 text-center text-base text-foreground'>
            Don&apos;t have an account?{" "}
            <Link
              href='/sign-up'
              className='text-[#8b5cf6] font-medium hover:underline'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Hero */}
      <AuthHero />
    </div>
  );
}
