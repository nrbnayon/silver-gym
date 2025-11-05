import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/onboarding/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dashboard/", "/onboarding/"],
      },
    ],
    sitemap: `${APP_CONFIG.url}/sitemap.xml`,
  };
}
