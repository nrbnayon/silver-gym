import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/dashboard/", "/onboarding/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dashboard/", "/dashboard/", "/onboarding/"],
      },
    ],
    sitemap: `http://localhost:3000/sitemap.xml`,
  };
}
