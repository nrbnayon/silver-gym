// components/modals/SuccessModal.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkBadge01Icon } from "@hugeicons/core-free-icons/index";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onAction: () => void;
  title?: string;
  subtitle?: string;
  description?: string;
  actionButtonText?: string;
  autoRedirectSeconds?: number;
  showCountdown?: boolean;
}

export default function SuccessModal({
  isOpen,
  onClose,
  onAction,
  title = "Congratulations",
  subtitle = "Your gym profile has been successfully set up",
  description = "You're all set to start managing your members, tracking income and expenses, creating packages, and sending reminders — everything from one dashboard",
  actionButtonText = "Sign In now",
  autoRedirectSeconds = 5,
  showCountdown = true,
}: SuccessModalProps) {
  const [countdown, setCountdown] = useState(autoRedirectSeconds);
  const prevIsOpenRef = useRef(isOpen);

  // Reset countdown when modal opens (using setTimeout to avoid synchronous setState)
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current && autoRedirectSeconds) {
      // Use setTimeout to defer the state update
      const timeoutId = setTimeout(() => {
        setCountdown(autoRedirectSeconds);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, autoRedirectSeconds]);

  // Handle countdown timer
  useEffect(() => {
    if (!isOpen || !autoRedirectSeconds) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, autoRedirectSeconds]);

  // Handle redirect when countdown reaches 0
  useEffect(() => {
    if (isOpen && countdown === 0 && autoRedirectSeconds) {
      // Use setTimeout to ensure this runs after render
      const timeoutId = setTimeout(() => {
        onAction();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, countdown, autoRedirectSeconds, onAction]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-white rounded-2xl shadow-lg border-none">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-6">
              {/* Title */}
              <h2 className="font-semibold text-[#1F2937] text-2xl text-center">
                {title}
              </h2>

              {/* Subtitle */}
              <p className="text-[#6B7280] text-base text-center">{subtitle}</p>

              {/* Success Icon */}
              <div className="relative flex items-center justify-center w-24 h-24">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "#FF681699",
                    filter: "blur(39.27px)",
                  }}
                />
                <HugeiconsIcon
                  icon={CheckmarkBadge01Icon}
                  size={80}
                  color="#ed7a08"
                  strokeWidth={1.5}
                  fill="#ffffff"
                />
              </div>

              {/* Description */}
              <p className="text-[#6B7280] text-sm text-center px-4">
                {description}
              </p>

              {/* Action Button */}
              <Button
                onClick={onAction}
                className="w-full h-12 rounded-lg bg-[#E97451] hover:bg-[#d66542] text-white text-base font-medium transition-colors duration-300"
              >
                {actionButtonText}
              </Button>

              {/* Auto redirect text */}
              {showCountdown && autoRedirectSeconds > 0 && (
                <p className="text-[#9CA3AF] text-xs text-center">
                  Redirecting to sign in page in {countdown} seconds...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
