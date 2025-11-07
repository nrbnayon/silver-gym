"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface GoogleButtonProps {
  text: string;
}

export default function GoogleButton({ text }: GoogleButtonProps) {
  const handleGoogleSignIn = () => {
    // Implement Google OAuth logic here
    console.log("Google Sign In clicked");
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      className="w-full h-14 rounded-lg border-2 text-base font-medium hover:bg-accent transition-colors flex items-center justify-center gap-3"
    >
      <Image
        src="https://www.google.com/favicon.ico"
        alt="Google"
        width={20}
        height={20}
      />
      {text}
    </Button>
  );
}
