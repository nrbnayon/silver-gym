// components/auth/VerifyOTPForm.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import type { PasswordResetUser } from "@/types/auth";

export default function VerifyOTPForm() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [userData, setUserData] = useState<PasswordResetUser | null>(null);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Get user data from sessionStorage
    const storedData = sessionStorage.getItem("passwordResetUser");
    if (!storedData) {
      router.push("/forgot-password");
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as PasswordResetUser;
      if (!parsedData.verificationMethod) {
        router.push("/verification-method");
        return;
      }
      setUserData(parsedData);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      router.push("/forgot-password");
    }
  }, [router]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    setIsVerified(false);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResend = () => {
    if (!userData) return;

    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const updatedData: PasswordResetUser = {
      ...userData,
      otp: newOtp,
      otpTimestamp: Date.now(),
    };

    sessionStorage.setItem("passwordResetUser", JSON.stringify(updatedData));
    setUserData(updatedData);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setIsVerified(false);

    console.log(`Resending OTP ${newOtp} to ${userData.verificationMethod}`);
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter complete code");
      return;
    }

    if (!userData || !userData.otp) return;

    // Verify OTP
    if (enteredOtp === userData.otp) {
      setIsVerified(true);
      setError("");

      // Update verification status
      const updatedData: PasswordResetUser = {
        ...userData,
        otpVerified: true,
      };
      sessionStorage.setItem("passwordResetUser", JSON.stringify(updatedData));

      // Navigate to reset password
      setTimeout(() => {
        router.push("/reset-password");
      }, 500);
    } else {
      setError("Incorrect code. Please try again.");
      setIsVerified(false);
    }
  };

  if (!userData) return null;

  const isComplete = otp.every((digit) => digit !== "");
  const displayContact =
    userData.verificationMethod === "email"
      ? userData.maskedEmail
      : userData.maskedPhone;

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
              {/* Title */}
              <div className="flex flex-col items-center justify-center gap-1">
                <h1 className="font-semibold text-[#505050] text-2xl text-center leading-9">
                  Enter Verification Code
                </h1>
              </div>

              {/* Description */}
              <div className="flex flex-col items-center justify-center">
                <p className="w-full max-w-lg font-normal text-[#505050] text-base text-center leading-6">
                  We&apos;ve sent a reset link to your{" "}
                  <span className="font-semibold">{displayContact}</span> email.
                  Please check your inbox
                </p>
              </div>

              {/* OTP Input */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-semibold rounded-lg border-2 transition-colors
                      ${
                        error && !isVerified
                          ? "border-[#FC5555] text-[#FC5555] focus:border-[#FC5555] focus:ring-[#FC5555]"
                          : isVerified
                          ? "border-[#7738F8] text-[#7738F8] focus:border-[#7738F8] focus:ring-[#7738F8]"
                          : "border-[#E1E1E1] text-[#505050] focus:border-[#E97451] focus:ring-[#E97451]"
                      }
                      focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  />
                ))}
              </div>

              {/* Resend Link */}
              <div className="text-center">
                <p className="text-[#9CA3AF] text-sm">
                  Don&apos;t received the code?{" "}
                  <button
                    onClick={handleResend}
                    className="text-[#7738F8] hover:underline font-medium"
                  >
                    Resend
                  </button>
                </p>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                disabled={!isComplete}
                className={`w-full h-14 rounded-lg text-xl font-medium transition-colors duration-300 
                  ${
                    isComplete
                      ? "bg-[#E97451] hover:bg-[#d66542] text-white"
                      : "bg-[#D9D9D9] text-[#9CA3AF] cursor-not-allowed hover:bg-[#D9D9D9]"
                  }`}
              >
                Verify
              </Button>

              {/* Error Message */}
              {error && !isVerified && (
                <p className="text-[#FC5555] text-sm text-center">{error}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
