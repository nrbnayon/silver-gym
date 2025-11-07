// components/auth/ResetPasswordForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { PasswordResetUser } from "@/types/auth";

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  special: boolean;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [userData, setUserData] = useState<PasswordResetUser | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [, setValidationErrors] = useState<PasswordValidation>({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    // Get user data from sessionStorage
    const storedData = sessionStorage.getItem("passwordResetUser");
    if (!storedData) {
      router.push("/forgot-password");
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as PasswordResetUser;
      if (!parsedData.otpVerified) {
        router.push("/verify-otp");
        return;
      }
      setUserData(parsedData);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      router.push("/forgot-password");
    }
  }, [router]);

  const validatePassword = (password: string): PasswordValidation => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setValidationErrors(validatePassword(value));
    setError("");
  };

  const handleSubmit = () => {
    // Validate new password
    const validation = validatePassword(newPassword);
    const isValid = Object.values(validation).every((v) => v);

    if (!isValid) {
      setError("Password does not meet requirements");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Confirm Password must be the same as New Password");
      return;
    }

    // Password reset successful
    console.log("Password reset successful for:", userData?.identifier);

    // Clear session data
    sessionStorage.removeItem("passwordResetUser");

    // In a real app, you would call an API to update the password
    // Then redirect to login or success page
    alert(
      "Password reset successful! You can now login with your new password."
    );
    router.push("/login"); // Adjust to your login route
  };

  if (!userData) return null;

  const isFormValid =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    Object.values(validatePassword(newPassword)).every((v) => v);

  const showMatchError =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative w-full overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-[-65px] left-[1236px] w-[501px] h-[234px] bg-white rounded-[250.46px/117.05px] -rotate-45 blur-[234px]" />

      {/* Partial border wrapper */}
      <div className="relative w-full max-w-2xl bg-[#EEEEEE4D] rounded-4xl overflow-visible">
        {/* Top-right corner */}
        <div className="absolute top-0 right-0 w-full h-full rounded-4xl p-px z-0 backdrop-blur-sm opacity-90 bg-[linear-gradient(225deg,rgba(103,56,41,0.25)_0%,rgba(255,255,255,0)_65%,rgba(103,56,41,0.25)_100%)]">
          <div className="w-full h-full rounded-4xl bg-[#EEEEEE4D]" />
        </div>

        {/* Bottom-left corner */}
        <div className="absolute bottom-0 left-0 w-full h-full rounded-4xl p-px z-0 backdrop-blur-sm opacity-90 bg-[linear-gradient(45deg,rgba(103,56,41,0.25)_0%,rgba(255,255,255,0)_65%,rgba(103,56,41,0.25)_100%)]">
          <div className="w-full h-full rounded-4xl bg-[#EEEEEE4D]" />
        </div>

        {/* Main card */}
        <Card className="relative z-20 bg-white rounded-2xl shadow-[-76px_59px_212px_#ff73001a,-305px_235px_250px_#ff730017,-687px_529px_250px_#ff73000d,-1221px_940px_250px_#ff730003,-1908px_1469px_250px_transparent] border-none m-4">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <KeyRound className="w-8 h-8 text-[#505050]" />
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="font-semibold text-[#505050] text-2xl text-center leading-9">
                  Reset Password
                </h1>
                <p className="text-[#9CA3AF] text-base text-center">
                  Reset your account password and access your personal account
                  again
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-[#505050] text-sm font-medium">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-3 pr-10 h-14 rounded-lg border border-solid border-[#E1E1E1] font-normal text-[#505050] text-base leading-5"
                      value={newPassword}
                      onChange={(e) => handleNewPasswordChange(e.target.value)}
                    />
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-2">
                  <label className="text-[#505050] text-sm font-medium">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="w-full px-3 pr-10 h-14 rounded-lg border border-solid border-[#E1E1E1] font-normal text-[#505050] text-base leading-5"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="text-[#9CA3AF] text-sm">
                  At least 8 characters with 1 uppercase, 1 number, and 1
                  special character.
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || showMatchError}
                className={`w-full h-14 rounded-lg text-xl font-medium transition-colors duration-300 
                  ${
                    isFormValid && !showMatchError
                      ? "bg-[#E97451] hover:bg-[#d66542] text-white"
                      : "bg-[#D9D9D9] text-[#9CA3AF] cursor-not-allowed hover:bg-[#D9D9D9]"
                  }`}
              >
                Next
              </Button>

              {/* Error Message */}
              {(error || showMatchError) && (
                <div className="flex items-center gap-2 text-[#FC5555] text-sm">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {showMatchError
                      ? "Confirm Password must be the same as New Password"
                      : error}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
