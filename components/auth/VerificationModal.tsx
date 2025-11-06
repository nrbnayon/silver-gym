"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "email" | "phone";
  contact: string;
}

export default function VerificationModal({
  open,
  onOpenChange,
  type,
  contact,
}: VerificationModalProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
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

  const handleVerify = () => {
    const verificationCode = code.join("");
    console.log("Verification code:", verificationCode);
    // Implement verification logic here
  };

  const handleResend = () => {
    console.log("Resending code...");
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const isComplete = code.every((digit) => digit !== "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px] p-0 gap-0 bg-transparent border-0'>
        <div className='bg-white rounded-lg p-8 flex flex-col items-center text-center'>
          {/* Icon */}
          <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6'>
            <Mail className='w-10 h-10 text-primary' />
          </div>

          {/* Title */}
          <h2 className='text-2xl font-bold text-foreground mb-2'>
            Enter Verification Code
          </h2>

          {/* Description */}
          <p className='text-muted-foreground mb-8'>
            We sent a code to{" "}
            <span className='font-medium text-foreground'>{contact}</span>
          </p>

          {/* Code Input */}
          <div className='flex gap-3 mb-4 justify-center' onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                inputMode='numeric'
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='w-14 h-14 text-center text-2xl font-semibold border-2 border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
              />
            ))}
          </div>

          {/* Resend Link */}
          <p className='text-muted-foreground mb-6'>
            Don&apos;t received the code?{" "}
            <button
              type='button'
              onClick={handleResend}
              className='text-muted-foreground hover:text-primary transition-colors underline'
            >
              Resend
            </button>
          </p>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={!isComplete}
            className={`w-full h-14 rounded-lg text-base ${
              isComplete
                ? "btn-primary"
                : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
            }`}
          >
            Verify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
