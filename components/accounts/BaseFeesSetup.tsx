// components/accounts/BaseFeesSetup.tsx
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Settings03Icon } from "@hugeicons/core-free-icons";

interface FeeState {
  admission: {
    enabled: boolean;
    amount: number;
  };
  monthly: {
    enabled: boolean;
    amount: number;
  };
}

export const BaseFeesSetup = () => {
  const [fees, setFees] = useState<FeeState>({
    admission: {
      enabled: false,
      amount: 2500,
    },
    monthly: {
      enabled: true,
      amount: 2500,
    },
  });

  const handleFeeToggle = (type: "admission" | "monthly") => {
    setFees((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        enabled: !prev[type].enabled,
      },
    }));
  };

  const handleAmountChange = (type: "admission" | "monthly", value: string) => {
    const numValue = parseInt(value) || 0;
    setFees((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        amount: numValue,
      },
    }));
  };

  return (
    <Card className="p-5 shadow-none border-none">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Base Fees Setup
          </h2>
          <div className="bg-gray-primary rounded p-1">
            <HugeiconsIcon icon={Settings03Icon} size={20} />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Easily manage your gym&apos;s admission and monthly fees in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Admission Fee */}
        <div className="space-y-3 bg-gray-primary p-3 rounded-md">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="admission-toggle"
              className="text-gray-700 font-medium"
            >
              Admission Fee
            </Label>
            <Switch
              id="admission-toggle"
              checked={fees.admission.enabled}
              onCheckedChange={() => handleFeeToggle("admission")}
              className="data-[state=checked]:bg-purple"
            />
          </div>
          <p className="text-xs text-gray-500">
            This is a one-time fee for new member must pay
          </p>
          <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded font-semibold text-text-primary">
            <p className="text-sm">Amount</p>
            <div className="bg-gray-secondary rounded-lg">
              <Input
                type="number"
                value={fees.admission.amount}
                onChange={(e) =>
                  handleAmountChange("admission", e.target.value)
                }
                className="w-28 text-right"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Monthly Fee */}
        <div className="space-y-3 bg-gray-primary p-3 rounded-md">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="monthly-toggle"
              className="text-gray-700 font-medium"
            >
              Monthly Fee
            </Label>
            <Switch
              id="monthly-toggle"
              checked={fees.monthly.enabled}
              onCheckedChange={() => handleFeeToggle("monthly")}
              className="data-[state=checked]:bg-purple"
            />
          </div>
          <p className="text-xs text-gray-500">
            This fee will apply every month unless a package is selected
          </p>
          <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded font-semibold text-text-primary">
            <p className="text-sm">Amount</p>
            <div className="bg-gray-secondary rounded-lg">
              <Input
                type="number"
                value={fees.monthly.amount}
                onChange={(e) => handleAmountChange("monthly", e.target.value)}
                className="w-28 text-right"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
