"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import type { PasswordResetUser, VerificationMethod } from "@/types/auth";
import { ImageIcon } from "../utils/ImageIcon";

interface SelectionCardProps {
  activeImage: string;
  inactiveImage?: string;
  title: string;
  subtitle: string;
  value: VerificationMethod;
  selected: boolean;
  onSelect: (value: VerificationMethod) => void;
}

function SelectionCard({
  activeImage,
  inactiveImage,
  title,
  subtitle,
  value,
  selected,
  onSelect,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full p-5 rounded-lg border-2 transition-all text-left flex items-center gap-4 outline-none ${
        selected
          ? "border-[#E97451]  shadow-[0_0_0_3px_#FCF0ED]"
          : "border-border-2 hover:border-[#d1d1d1] hover:bg-gray-50/50"
      } focus-visible:border-[#E97451] focus-visible:shadow-[0_0_0_3px_#FCF0ED]`}
    >
      <div>
        <ImageIcon
          activeImage={activeImage}
          inactiveImage={inactiveImage}
          isActive={selected}
          size={24}
          alt={title}
        />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-gray-medium text-base mb-0.5">
          {title}
        </div>
        <div className="text-sm text-[#9CA3AF]">{subtitle}</div>
      </div>
    </button>
  );
}

// Helper function to get initial user data
function getInitialUserData(): PasswordResetUser | null {
  if (typeof window === "undefined") return null;

  const storedData = sessionStorage.getItem("passwordResetUser");
  if (!storedData) return null;

  try {
    return JSON.parse(storedData) as PasswordResetUser;
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return null;
  }
}

export default function VerificationMethodForm() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | "">(
    ""
  );
  const [userData] = useState<PasswordResetUser | null>(getInitialUserData);

  useEffect(() => {
    if (!userData) {
      router.push("/forgot-password");
    }
  }, [userData, router]);

  const handleSubmit = () => {
    if (!selectedMethod || !userData) return;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const updatedData: PasswordResetUser = {
      ...userData,
      verificationMethod: selectedMethod,
      otp,
      otpTimestamp: Date.now(),
    };

    sessionStorage.setItem("passwordResetUser", JSON.stringify(updatedData));

    console.log(
      `Sending OTP ${otp} to ${selectedMethod}: ${
        selectedMethod === "email" ? updatedData.email : updatedData.phone
      }`
    );

    router.push("/verify-otp");
  };

  if (!userData) return null;

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
                <h1 className="font-semibold text-gray-medium text-2xl text-center leading-9">
                  Verification Method
                </h1>
              </div>

              {/* Description */}
              <div className="flex flex-col items-center justify-center">
                <p className="w-full max-w-lg font-normal text-gray-medium text-xl text-center leading-7">
                  We found your account. Choose how you&apos;d like to receive
                  your reset code.
                </p>
              </div>

              {/* Method Selection */}
              <div className="space-y-4">
                <SelectionCard
                  activeImage="/icons/mail.svg"
                  inactiveImage="/icons/mail.svg"
                  title="Send Code to Email"
                  subtitle={userData.maskedEmail}
                  value="email"
                  selected={selectedMethod === "email"}
                  onSelect={setSelectedMethod}
                />

                <SelectionCard
                  activeImage="/icons/phone.svg"
                  inactiveImage="/icons/phone.svg"
                  title="Send Code to Phone"
                  subtitle={userData.maskedPhone}
                  value="phone"
                  selected={selectedMethod === "phone"}
                  onSelect={setSelectedMethod}
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!selectedMethod}
                className={`w-full h-14 rounded-lg text-xl font-medium transition-colors duration-300 
                  ${
                    selectedMethod
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
