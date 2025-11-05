import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  return [
    {
      url: 'http://localhost:3000',
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
