import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
  success?: boolean;
}

function Textarea({ className, error, success, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Original classes without border-related classes
        "placeholder:text-muted-foreground focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

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

        // Additional className from props
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
