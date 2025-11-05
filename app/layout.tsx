import type React from "react";
import type { Metadata, Viewport } from "next";
import ClientLayout from "./ClientLayout";
import "./globals.css";
import { Inter } from "next/font/google";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Silver GYM",
  description:
    "Silver GYM — a powerful gym management platform to manage clients, trainers, and memberships in one place.",
  image: "/og-image.jpg",
  url: process.env.NEXT_PUBLIC_BASE_URL,
  tags: ["gym", "fitness", "workout", "management software"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning>
      <body className='antialiased'>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
