// components/auth/ResetPasswordForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import SuccessModal from "../modals/SuccessModal";
import type { PasswordResetUser } from "@/types/auth";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PasswordValidationIcon,
  Alert02Icon,
} from "@hugeicons/core-free-icons";

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
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

    // Show success modal
    setShowSuccessModal(true);
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  if (!userData) return null;

  const isFormValid =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    Object.values(validatePassword(newPassword)).every((v) => v);

  const showMatchError =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 relative w-full overflow-hidden bg-white">
        {/* Background decoration */}
        <div className="absolute top-[-65px] left-[1236px] w-[501px] h-[234px] bg-white rounded-[250.46px/117.05px] -rotate-45 blur-[234px]" />

        {/* Partial border wrapper */}
        <div className="relative w-full max-w-2xl rounded-4xl overflow-visible">
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
            <CardContent className="px-8 py-6">
              <div className="flex flex-col gap-4">
                {/* Icon */}
                <div className="flex justify-center">
                  <HugeiconsIcon
                    icon={PasswordValidationIcon}
                    size={40}
                    color="#252525"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <div className="flex flex-col items-center justify-center gap-2 mb-4">
                  <h1 className="font-semibold text-[#252525] text-2xl text-center leading-9">
                    Reset Password
                  </h1>
                  <p className="text-[#878787] text-base text-center">
                    Reset your account password and access your personal account
                    again
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* New Password */}
                  <div className="space-y-2">
                    <Label className="text-[#505050] text-sm font-medium">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-3 pr-10 h-14 rounded-lg border border-solid border-[#E1E1E1] font-normal text-[#505050] text-base leading-5"
                        value={newPassword}
                        onChange={(e) =>
                          handleNewPasswordChange(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-2">
                    <Label className="text-[#505050] text-sm font-medium">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-3 pr-10 h-14 rounded-lg border border-solid border-[#E1E1E1] font-normal text-[#505050] text-base leading-5"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setError("");
                        }}
                      />
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="text-[#878787] text-sm">
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
                        : "bg-[#D9D9D9] text-[#878787] cursor-not-allowed hover:bg-[#D9D9D9]"
                    }`}
                >
                  Next
                </Button>

                {/* Error Message */}
                {(error || showMatchError) && (
                  <div className="w-full flex items-center justify-center gap-2 text-[#FC5555] text-sm py-2">
                    <HugeiconsIcon
                      icon={Alert02Icon}
                      size={24}
                      color="#FC5555"
                      strokeWidth={1.5}
                    />
                    <span className="text-center">
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

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onAction={handleSignIn}
        onClose={() => setShowSuccessModal(false)}
        title="Congratulations"
        subtitle="Successfully Reset Password"
        description="You can now sign in securely with your new password and continue managing your account without interruption."
        actionButtonText="Sign In Now"
        autoRedirectSeconds={10}
        showCountdown={true}
      />
    </>
  );
}
