import type React from "react";
import type { Metadata, Viewport } from "next";
import ClientLayout from "./ClientLayout";
import "./globals.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { generateSEO } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* ✅ JSON-LD structured data for SEO */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Silver GYM",
              description:
                "A powerful gym management software to manage your gym, clients, trainers, and memberships all in one place.",
              applicationCategory: "GYM Management System",
              operatingSystem: "Web",
              url: process.env.NEXT_PUBLIC_BASE_URL,
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
