"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthHero from "@/components/auth/AuthHero";
import GoogleButton from "@/components/auth/GoogleButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define validation schema using Zod
const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  emailOrPhone: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{10,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      {
        message: "Please enter a valid email or phone number",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms & Privacy",
  }),
});

type FormData = z.infer<typeof schema>;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailOrPhone: "",
      password: "",
      terms: false,
    },
  });

  const termsValue = watch("terms");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log("Sign up:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex'>
      {/* Left Side - Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12'>
        <div className='w-full max-w-[480px]'>
          <div className='mb-12'>
            <h1 className='text-[40px] lg:text-[48px] font-bold text-foreground mb-3 leading-tight'>
              Create Your Account
            </h1>
            <p className='text-secondary text-lg'>
              Set up your account to start managing memberships, packages,
              billing, and analytics — all in one place.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            {/* Name Fields */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='firstName' className='text-sm font-medium'>
                  First name
                </Label>
                <Input
                  id='firstName'
                  type='text'
                  placeholder='First name'
                  className='h-14 rounded-lg text-base'
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <span className='text-sm text-red-500'>
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lastName' className='text-sm font-medium'>
                  Last name
                </Label>
                <Input
                  id='lastName'
                  type='text'
                  placeholder='Last name'
                  className='h-14 rounded-lg text-base'
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <span className='text-sm text-red-500'>
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Email or Phone */}
            <div className='space-y-2'>
              <Label htmlFor='emailOrPhone' className='text-sm font-medium'>
                Email or phone
              </Label>
              <Input
                id='emailOrPhone'
                type='text'
                placeholder='Enter your email or phone number'
                className='h-14 rounded-lg text-base'
                {...register("emailOrPhone")}
              />
              {errors.emailOrPhone && (
                <span className='text-sm text-red-500'>
                  {errors.emailOrPhone.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-sm font-medium'>
                Password
              </Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='••••••••'
                  className='h-14 rounded-lg text-base pr-12'
                  {...register("password")}
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
                <span className='text-sm text-red-500'>
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Terms & Password Strength */}
            <div className='flex items-start gap-3'>
              <div className='flex items-center h-6'>
                <Checkbox
                  id='terms'
                  checked={termsValue}
                  onCheckedChange={(checked) =>
                    setValue("terms", checked as boolean)
                  }
                />
              </div>
              <label
                htmlFor='terms'
                className='text-sm text-muted-foreground flex-1 leading-relaxed cursor-pointer'
              >
                I agree to the{" "}
                <Link
                  href='/terms'
                  className='text-foreground font-medium underline'
                >
                  Terms & Privacy
                </Link>
              </label>
              {errors.terms && (
                <span className='text-sm text-red-500 whitespace-nowrap'>
                  {errors.terms.message}
                </span>
              )}
            </div>

            {/* Sign Up Button */}
            <Button
              type='submit'
              className='btn-primary h-14 text-base rounded-lg w-full'
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
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

            {/* Google Sign Up */}
            <GoogleButton text='Sign Up with Google' />
          </form>

          {/* Sign In Link */}
          <p className='mt-8 text-center text-base text-foreground'>
            Don&apos;t have an account?{" "}
            <Link
              href='/sign-in'
              className='text-[#8b5cf6] font-medium hover:underline'
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Hero */}
      <AuthHero />
    </div>
  );
}
