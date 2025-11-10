// app\ClientLayout.tsx
"use client";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import AuthChecker from "@/components/auth/AuthChecker";
import { ReduxProvider } from "@/redux/providers/ReduxProvider";

/**
 * ✅ Client layout with stable Suspense + Theme handling
 */
export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<div className="hidden" />}>
      <ReduxProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange={true}
        >
          <AuthChecker>{children}</AuthChecker>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </ReduxProvider>
    </Suspense>
  );
}
