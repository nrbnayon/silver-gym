// components\utils\ImageIcon.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ImageIconProps {
  activeImage: string;
  inactiveImage?: string;
  alt?: string;
  isActive?: boolean;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const ImageIcon = React.forwardRef<HTMLButtonElement, ImageIconProps>(
  (
    {
      activeImage,
      inactiveImage,
      alt = "icon",
      isActive = true,
      size = 24,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // If no inactive image provided, always use active image
    const currentImage =
      inactiveImage && !isActive ? inactiveImage : activeImage;

    if (onClick) {
      return (
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          className={cn(
            "inline-flex items-center justify-center transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm",
            className
          )}
          aria-label={alt}
          {...props}
        >
          <Image
            src={currentImage}
            alt={alt}
            width={size}
            height={size}
            className="object-contain"
          />
        </button>
      );
    }

    return (
      <div className={cn("inline-flex items-center justify-center", className)}>
        <Image
          src={currentImage}
          alt={alt}
          width={size}
          height={size}
          className="object-contain"
        />
      </div>
    );
  }
);

ImageIcon.displayName = "ImageIcon";

export { ImageIcon };
