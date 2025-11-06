"use client";

import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

/**
 * ✅ Client layout with stable Suspense + Theme handling
 */
export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<div className='hidden' />}>
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem={false}
        forcedTheme='light'
        disableTransitionOnChange={true}
      >
        {children}
        <Toaster richColors position='top-center' />
      </ThemeProvider>
    </Suspense>
  );
}
