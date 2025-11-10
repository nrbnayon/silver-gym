// components/auth/SigninForm.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthHero from "@/components/auth/AuthHero";
import GoogleButton from "@/components/auth/GoogleButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser, clearError } from "@/redux/features/auth/authSlice";

interface SignInFormValues {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful!");
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error && error !== "No valid authentication found") {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await dispatch(
        loginUser({
          email: data.emailOrPhone,
          password: data.password,
          rememberMe: data.rememberMe,
        })
      ).unwrap();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-x-hidden">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5 lg:p-10">
        <div className="w-full max-w-xl">
          <div className="mb-5 md:mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-3 leading-tight">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-[16px]">
              Sign in to manage your gym management system
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="emailOrPhone" className="text-sm font-medium">
                Email or phone
              </Label>
              <Input
                id="emailOrPhone"
                type="text"
                placeholder="Enter your email or phone number"
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
                <p className="text-red-500 text-sm">
                  {errors.emailOrPhone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#8b5cf6] hover:underline"
                >
                  Forget Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-14 rounded-lg text-base"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 rounded border-gray-300 mb-1"
                {...register("rememberMe")}
              />
              <Label
                htmlFor="rememberMe"
                className="text-sm font-medium cursor-pointer"
              >
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="btn-primary h-14 text-base rounded-lg w-full"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative bg-background px-4">
                <span className="text-sm text-muted-foreground">or</span>
              </div>
            </div>

            <GoogleButton text="Sign in with Google" />
          </form>

          <p className="mt-8 text-center text-base text-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#8b5cf6] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 w-full bg-primary overflow-hidden">
        <AuthHero />
      </div>
    </div>
  );
}
