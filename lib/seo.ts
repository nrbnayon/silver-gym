import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITE || "Silver GYM";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

/**
 * Generate dynamic SEO metadata for Next.js App Router
 * Compatible with Next.js 13/14 Metadata API
 */
export function generateSEO({
  title,
  description = "A powerful gym management software to manage your gym, clients, trainers, and memberships all in one place.",
  image = "/og-image.jpg",
  url = baseUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "nrbnayon",
  tags,
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | ${siteName}` : siteName;
  const seoImage = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    // Basic meta
    title: seoTitle,
    description,
    keywords: tags || ["Gym management system", "Fitness software", "Gym app"],
    metadataBase: new URL(baseUrl),

    // Author info (✅ correct key)
    authors: [{ name: author, url: baseUrl }],
    creator: author,
    publisher: author,

    // Canonical link
    alternates: {
      canonical: url,
    },

    // Open Graph
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: seoTitle,
      description,
      siteName,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description,
      images: [seoImage],
      creator: "@nrbnayon",
    },

    // Robots settings

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    generator: "nayon",
  };
}
