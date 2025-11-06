"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: 1 | 2;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { id: 1, label: "Business Information" },
    { id: 2, label: "Contact Info" },
  ];

  return (
    <div className='flex items-center mb-10'>
      {steps.map((step, index) => (
        <div key={step.id} className='flex items-center flex-1'>
          {/* Step Button */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              currentStep === step.id
                ? "bg-white border-2 border-primary shadow-sm"
                : currentStep > step.id
                ? "bg-white border-2 border-primary/30"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                currentStep > step.id
                  ? "bg-primary"
                  : currentStep === step.id
                  ? "bg-primary"
                  : "border-2 border-gray-300 bg-white"
              }`}
            >
              {currentStep > step.id ? (
                <Check className='w-3.5 h-3.5 text-white' strokeWidth={3} />
              ) : currentStep === step.id ? (
                <div className='w-2 h-2 bg-white rounded-full'></div>
              ) : null}
            </div>
            <span
              className={`font-medium text-sm whitespace-nowrap ${
                currentStep === step.id
                  ? "text-foreground"
                  : currentStep > step.id
                  ? "text-muted-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className='flex-1 h-px bg-gray-200 mx-2'></div>
          )}
        </div>
      ))}
    </div>
  );
}
