"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            // Base styles
            "flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",

            // Default border
            "border-input",

            // Remove default focus outline and ring
            "focus-visible:outline-none focus-visible:ring-0",

            // Focus state with custom border only
            "focus-visible:border-[#F05B23] focus-visible:shadow-[0_0_0_3px_#FCF0ED]",

            // Dark mode focus
            "dark:focus-visible:border-[#F05B23] dark:focus-visible:shadow-[0_0_0_3px_rgba(252,240,237,0.1)]",

            // Conditional states
            error &&
              "border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]",
            success &&
              "border-green-500 focus-visible:border-green-500 focus-visible:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]",

            // Password field padding
            isPassword && "pr-10",

            className
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
