// components/modals/PermissionToggle.tsx
// ============================================

import React from "react";

interface PermissionToggleProps {
  checked: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}

const PermissionToggle: React.FC<PermissionToggleProps> = ({
  checked,
  onToggle,
  size = "md",
}) => {
  const sizeClasses = size === "sm" ? "h-5 w-9" : "h-6 w-11";

  const thumbClasses = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  const translateClasses =
    size === "sm"
      ? checked
        ? "translate-x-5"
        : "translate-x-1"
      : checked
      ? "translate-x-6"
      : "translate-x-1";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex ${sizeClasses} items-center rounded-full transition-colors ${
        checked ? "bg-[#7738F8]" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block ${thumbClasses} transform rounded-full bg-white transition-transform ${translateClasses}`}
      />
    </button>
  );
};

export default PermissionToggle;
