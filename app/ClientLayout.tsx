"use client";
import type React from "react";
import { Suspense } from "react";
import { Toaster } from "./components/ui/sonner";
// import { StructuredData } from "./components/seo/structured-data";
import { ThemeProvider } from "./components/ui/theme-provider";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <StructuredData /> */}
      <Suspense fallback={null}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          forcedTheme='light'
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </Suspense>
    </>
  );
}
