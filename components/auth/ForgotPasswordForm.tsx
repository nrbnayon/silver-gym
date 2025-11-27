// components/auth/ForgotPasswordForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!emailOrPhone.trim()) {
      setError("Please enter your email or phone number");
      return;
    }

    // Basic validation
    const isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);
    const isPhone = /^[+]?[\d\s-()]+$/.test(emailOrPhone);

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email or phone number");
      return;
    }

    // Store in memory (simulating account lookup)
    const userData = {
      identifier: emailOrPhone,
      email: isEmail ? emailOrPhone : "sm.....m@gmail.com",
      phone: isPhone ? emailOrPhone : "+880 16••••••56",
      maskedEmail: isEmail
        ? emailOrPhone.replace(/(.{2})(.*)(@.*)/, "$1.....$3")
        : "sm.....m@gmail.com",
      maskedPhone: "+880 16••••••56",
      timestamp: Date.now(),
    };

    // Store user data in sessionStorage (better than localStorage for sensitive flows)
    sessionStorage.setItem("passwordResetUser", JSON.stringify(userData));

    // Navigate to verification method selection
    router.push("/verification-method");
  };

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
                  Find Your Account
                </h1>
              </div>

              {/* Description + Input */}
              <div className="flex flex-col items-center justify-center gap-6">
                <p className="w-full max-w-lg font-normal text-[#505050] text-xl text-center leading-7">
                  Please enter your email address or mobile number to search for
                  your account.
                </p>

                <div className="flex flex-col items-start gap-1 w-full">
                  <Input
                    placeholder="Enter your email or phone number"
                    className="w-full px-3 h-14 rounded-lg border border-border-2 font-normal text-[#505050] text-base leading-5"
                    value={emailOrPhone}
                    onChange={(e) => {
                      setEmailOrPhone(e.target.value);
                      setError("");
                    }}
                  />
                  {error && (
                    <p className="text-[#FC5555] text-sm mt-1">{error}</p>
                  )}
                </div>
              </div>

              {/* Dynamic Button */}
              <Button
                onClick={handleSubmit}
                disabled={!emailOrPhone.trim()}
                className={`w-full h-14 rounded-lg text-xl font-medium transition-colors duration-300 
                  ${
                    emailOrPhone.trim()
                      ? "bg-[#E97451] hover:bg-[#d66542] text-white"
                      : "bg-[#D9D9D9] text-[#9CA3AF] cursor-not-allowed hover:bg-[#D9D9D9]"
                  }`}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
