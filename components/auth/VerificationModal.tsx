// components/auth/VerificationModal.tsx
"use client";

import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ImageIcon } from "@/components/utils/ImageIcon";

interface VerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "email" | "phone";
  contact: string;
  onVerificationSuccess: () => void;
}

const COUNTDOWN_DURATION = 180; // 3 minutes in seconds
const STORAGE_KEY = "verification_state";

export default function VerificationModal({
  open,
  onOpenChange,
  type,
  contact,
  onVerificationSuccess,
}: VerificationModalProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load state from localStorage on mount or when modal opens
  useEffect(() => {
    if (open) {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const { expiresAt, contact: savedContact } = JSON.parse(savedState);
        const now = Date.now();

        if (now < expiresAt && savedContact === contact) {
          // Resume timer from saved state
          const remaining = Math.floor((expiresAt - now) / 1000);
          setTimeLeft(remaining);
        } else {
          // Start new timer and save with type
          initializeTimer();
        }
      } else {
        // Start new timer and save with type
        initializeTimer();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, contact]);

  // Initialize timer and save to localStorage
  const initializeTimer = () => {
    const expiresAt = Date.now() + COUNTDOWN_DURATION * 1000;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ expiresAt, contact, type })
    );
    setTimeLeft(COUNTDOWN_DURATION);
  };

  // Countdown timer
  useEffect(() => {
    if (open && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            // Clear storage when timer expires
            localStorage.removeItem(STORAGE_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [open, timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Mask contact info
  const maskContact = (contact: string) => {
    if (type === "email") {
      const [username, domain] = contact.split("@");
      const maskedUsername =
        username.slice(0, 2) + "......." + username.slice(-1);
      return `${maskedUsername}@${domain}`;
    } else {
      // Phone masking
      const cleaned = contact.replace(/\D/g, "");
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(
        3,
        5
      )}••••••${cleaned.slice(-2)}`;
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    pastedData.split("").forEach((char, idx) => {
      if (idx < 6 && /^\d$/.test(char)) {
        newCode[idx] = char;
      }
    });

    setCode(newCode);
    const nextEmptyIndex = newCode.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    setIsVerifying(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, accept any 6-digit code
      // In production, verify with backend
      console.log("Verification code:", verificationCode);

      // Clear timer and storage
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      localStorage.removeItem(STORAGE_KEY);

      // Mark verification as complete
      localStorage.setItem("verification_complete", "true");

      // Call success callback
      onVerificationSuccess();
    } catch (error) {
      console.error("Verification failed:", error);
      // Add toast notification here
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    console.log("Resending code...");
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();

    // Reset timer
    initializeTimer();
    setTimeLeft(COUNTDOWN_DURATION);

    // Add toast notification here
  };

  const handleManualClose = () => {
    // Clear all related localStorage
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("verification_complete");
    localStorage.removeItem("signupData");

    // Close modal
    onOpenChange(false);
  };

  const isComplete = code.every((digit) => digit !== "");

  // Prevent closing modal via overlay or ESC
  const handleOpenChange = (newOpen: boolean) => {
    // Only allow closing if verification is complete
    if (!newOpen) {
      const verificationComplete = localStorage.getItem(
        "verification_complete"
      );
      if (verificationComplete === "true") {
        onOpenChange(false);
      }
      // Otherwise, do nothing (prevent closing)
    } else {
      onOpenChange(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] p-0 gap-0 bg-transparent border-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        aria-describedby="verification-description"
      >
        <VisuallyHidden>
          <DialogTitle>Verification Code Entry</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription id="verification-description">
            Enter the 6-digit verification code sent to your{" "}
            {type === "email" ? "email" : "phone number"}
          </DialogDescription>
        </VisuallyHidden>

        {/* Glass effect border wrapper */}
        <div className="relative rounded-2xl p-3 bg-[#EEEEEE4D] backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center relative">
            {/* Manual Close Button */}
            <button
              onClick={handleManualClose}
              className="absolute top-0.5 right-0.5 w-5 h-5 z-10 bg-red-300 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors "
              aria-label="Close verification modal"
            >
              <X className="w-5 h-5 text-primary" />
            </button>

            {/* Icon */}
            <div className=" rounded-full flex items-center justify-center mb-4">
              <ImageIcon
                activeImage={
                  type === "email"
                    ? "/icons/verify-email.svg"
                    : "/icons/verify-phone.svg"
                }
                alt={
                  type === "email" ? "Email verification" : "Phone verification"
                }
                size={60}
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Enter Verification Code
            </h2>

            {/* Description */}
            <p className="text-muted-foreground mb-8">
              We sent a code to{" "}
              <span className="font-medium text-foreground">
                {maskContact(contact)}
              </span>
            </p>

            {/* Code Input */}
            <div
              className="flex gap-3 mb-4 justify-center"
              onPaste={handlePaste}
            >
              {code.map((digit, index) => (
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
                  className="w-14 h-14 text-center text-2xl font-semibold border-2 border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isVerifying}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            {/* Timer */}
            <p className="text-sm text-muted-foreground mb-6">
              {timeLeft > 0 ? (
                <>
                  Time remaining:{" "}
                  <span className="font-semibold text-primary">
                    {formatTime(timeLeft)}
                  </span>
                </>
              ) : (
                <span className="text-red-500">Code expired</span>
              )}
            </p>

            {/* Resend Link */}
            <p className="text-muted-foreground mb-6">
              Don&apos;t received the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0}
                className={`transition-colors underline ${
                  timeLeft > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:text-primary/80"
                }`}
              >
                Resend
              </button>
            </p>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              disabled={!isComplete || isVerifying || timeLeft === 0}
              className={`w-full h-14 rounded-lg text-base ${
                isComplete && !isVerifying && timeLeft > 0
                  ? "btn-primary"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
              }`}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
