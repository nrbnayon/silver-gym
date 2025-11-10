import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/overview/", "/onboarding/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dashboard/", "/overview/", "/onboarding/"],
      },
    ],
    sitemap: `http://localhost:3000/sitemap.xml`,
  };
}
