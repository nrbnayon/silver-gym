// components/dashboard/UserAccess/RoleStatsCards.tsx
// ============================================

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Settings03Icon } from "@hugeicons/core-free-icons";

interface RoleStatsCardsProps {
  onCreateRole: () => void;
}

const RoleStatsCards: React.FC<RoleStatsCardsProps> = ({ onCreateRole }) => {
  const roleStats = [
    {
      title: "Total Admin",
      count: 2,
      description: "Monthly income of your company",
    },
    {
      title: "Total Manager",
      count: 4,
      description: "Monthly expense of your company",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {roleStats.map((stat, index) => (
        <Card key={index} className="bg-white border-none hover:shadow-md">
          <CardContent className="px-6">
            <h3 className="text-gray-900 font-semibold text-base mb-1">
              {stat.title}
            </h3>
            <p className="text-gray-500 text-xs mb-3">{stat.description}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">
                {stat.count}
              </span>
              <span className="text-gray-500 text-sm">/Person</span>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-white border-2 border-dashed border-gray-200 hover:border-purple transition-colors cursor-pointer">
        <CardContent className="px-6">
          <h3 className="text-gray-900 font-semibold text-base mb-1">
            Create Custom Role
          </h3>
          <p className="text-gray-500 text-xs mb-4">
            Customize the member registration form
          </p>
          <Button
            onClick={onCreateRole}
            variant="outline"
            className="w-full bg-gray-100 hover:bg-gray-50 font-semibold"
          >
            <HugeiconsIcon icon={Settings03Icon} size={24} strokeWidth={2} />{" "}
            Create
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleStatsCards;
