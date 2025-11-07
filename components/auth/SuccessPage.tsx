"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const router = useRouter();

  // Check if user has completed all steps
  useEffect(() => {
    const contactInfo = localStorage.getItem("contactInfo");
    const businessInfo = localStorage.getItem("businessInfo");
    const verificationComplete = localStorage.getItem("verification_complete");

    if (!contactInfo || !businessInfo || verificationComplete !== "true") {
      router.push("/sign-up");
    }
  }, [router]);

  const handleGoToDashboard = () => {
    // Clear all temporary data
    localStorage.removeItem("signupData");
    localStorage.removeItem("businessInfo");
    localStorage.removeItem("contactInfo");
    localStorage.removeItem("verification_complete");
    localStorage.removeItem("verification_state");

    // Navigate to dashboard
    router.push("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-linear-to-br from-orange-50 via-white to-orange-50/50"
    >
      <div className="w-full max-w-xl bg-white rounded-lg shadow-sm border border-orange-100/50 p-10 sm:p-12 lg:p-16 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Congratulations
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Your gym profile has been successfully set up
        </p>

        {/* Animated Icon */}
        <div className="flex justify-center mb-10">
          <div className="relative w-36 h-36">
            {/* Outer Ping Ring */}
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>

            {/* Gradient Background */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-orange-100 via-orange-50 to-transparent flex items-center justify-center">
              {/* White Circle with Icon */}
              <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2
                    className="w-14 h-14 text-primary"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg mx-auto">
          You&apos;re all set to start managing your members, tracking income
          and expenses, creating packages, and sending reminders — everything
          from one dashboard
        </p>

        {/* Button */}
        <Button
          onClick={handleGoToDashboard}
          className="btn-primary h-14 px-10 rounded-lg text-base font-medium"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
