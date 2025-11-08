// components/auth/SignUpForm.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthHero from "@/components/auth/AuthHero";
import GoogleButton from "@/components/auth/GoogleButton";
import VerificationModal from "@/components/auth/VerificationModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
  const [isLoading, setIsLoading] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [verificationType, setVerificationType] = useState<"email" | "phone">(
    "email"
  );
  const [contactInfo, setContactInfo] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  // Check for pending verification on mount
  useEffect(() => {
    const checkPendingVerification = () => {
      const verificationState = localStorage.getItem("verification_state");
      const verificationComplete = localStorage.getItem(
        "verification_complete"
      );

      if (verificationState && verificationComplete !== "true") {
        const { expiresAt, contact, type } = JSON.parse(verificationState);
        const now = Date.now();

        // Check if timer hasn't expired
        if (now < expiresAt) {
          // Re-open verification modal
          setContactInfo(contact);
          setVerificationType(type);
          setVerificationOpen(true);
        } else {
          // Timer expired, clear storage
          localStorage.removeItem("verification_state");
        }
      }
    };

    checkPendingVerification();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Determine if input is email or phone
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(data.emailOrPhone);

      setVerificationType(isEmail ? "email" : "phone");
      setContactInfo(data.emailOrPhone);

      // Store signup data in localStorage
      localStorage.setItem(
        "signupData",
        JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          emailOrPhone: data.emailOrPhone,
          password: data.password,
        })
      );

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Open verification modal
      setVerificationOpen(true);
    } catch (error) {
      console.error("Submission failed:", error);
      // Add toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    // Navigate to business info page
    router.push("/business-info");
  };

  return (
    <>
      <div className="min-h-screen w-full flex h-screen overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-5 lg:p-10 overflow-hidden">
          <div className="w-full max-w-2xl">
            <div className="mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
                Create Your Account
              </h1>
              <p className="text-secondary text-lg">
                Set up your account to start managing memberships, packages,
                billing, and analytics — all in one place.
              </p>
            </div>

            <div className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className="h-14 rounded-lg text-base"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <span className="text-sm text-red-500">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className="h-14 rounded-lg text-base"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <span className="text-sm text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Email or Phone */}
              <div className="space-y-2">
                <Label htmlFor="emailOrPhone" className="text-sm font-medium">
                  Email or phone
                </Label>
                <Input
                  id="emailOrPhone"
                  type="text"
                  placeholder="Enter your email or phone number"
                  className="h-14 rounded-lg text-base"
                  {...register("emailOrPhone")}
                />
                {errors.emailOrPhone && (
                  <span className="text-sm text-red-500">
                    {errors.emailOrPhone.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-14 rounded-lg text-base pr-12"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-6 ">
                    <Checkbox
                      id="terms"
                      checked={termsValue}
                      onCheckedChange={(checked) =>
                        setValue("terms", checked as boolean)
                      }
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground flex-1 leading-relaxed cursor-pointer mt-0.5"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-foreground font-medium underline"
                    >
                      Terms & Privacy
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <span className="text-sm text-red-500 block">
                    {errors.terms.message}
                  </span>
                )}
              </div>

              {/* Sign Up Button */}
              <Button
                onClick={handleSubmit(onSubmit)}
                className="btn-primary h-14 text-base rounded-lg w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative bg-background px-4">
                  <span className="text-sm text-secondary">or</span>
                </div>
              </div>

              {/* Google Sign Up */}
              <GoogleButton text="Sign Up with Google" />
            </div>

            {/* Sign In Link */}
            <p className="mt-8 text-center text-base text-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-in"
                className="text-[#8b5cf6] font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Hero */}
        <div className="hidden lg:flex lg:w-1/2 w-full bg-primary overflow-hidden">
          <AuthHero />
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        open={verificationOpen}
        onOpenChange={setVerificationOpen}
        type={verificationType}
        contact={contactInfo}
        onVerificationSuccess={handleVerificationSuccess}
      />
    </>
  );
}
