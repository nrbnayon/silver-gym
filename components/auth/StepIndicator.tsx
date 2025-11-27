"use client";

import { Check, Loader } from "lucide-react";

interface StepIndicatorProps {
  currentStep: 1 | 2;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { id: 1, label: "Business Information" },
    { id: 2, label: "Contact Info" },
  ];

  return (
    <div className="flex items-center justify-center min-w-full gap-0  border-2 border-red-500 ">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center"
          style={{ flex: "1 1 0" }}
        >
          {/* Step Button */}
          <div
            className={`flex items-center gap-3 px-3 py-3 rounded-2xl transition-all w-full ${
              currentStep === step.id
                ? "bg-white border border-gray-primary"
                : currentStep > step.id
                ? "bg-white border-2 border-purple"
                : "bg-white border-2 border-border-2"
            }`}
            style={
              currentStep === step.id
                ? {
                    boxShadow:
                      "4px 4px 12px 0px #DDDDDD26, -4px 0px 12px 0px #DDDDDD26, 4px 0px 12px 0px #DDDDDD26",
                  }
                : {}
            }
          >
            {/* Icon */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 ${
                currentStep > step.id
                  ? "bg-purple border-2 border-purple"
                  : currentStep === step.id
                  ? "bg-gray-primary"
                  : "bg-white border-2 border-border-2"
              }`}
              style={
                currentStep === step.id
                  ? {
                      boxShadow:
                        "4px 4px 12px 0px #DDDDDD26, -4px 0px 12px 0px #DDDDDD26, 4px 0px 12px 0px #DDDDDD26",
                    }
                  : {}
              }
            >
              {currentStep > step.id ? (
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              ) : currentStep === step.id ? (
                <Loader
                  className="w-4 h-4 text-[#6B7280] animate-spin"
                  strokeWidth={2.5}
                />
              ) : null}
            </div>

            {/* Label */}
            <span
              className={`font-medium text-sm whitespace-nowrap ${
                currentStep > step.id
                  ? "text-purple"
                  : currentStep === step.id
                  ? "text-gray-primary"
                  : "text-[#9CA3AF]"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-[2px] w-16 transition-all shrink-0 ${
                currentStep > step.id ? "bg-purple" : "bg-[#E5E7EB]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
