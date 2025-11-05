import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Silver GYM",
    short_name: "Law Firm Portfolio",
    description: "Silver GYM — a powerful gym management platform to manage clients, trainers, and memberships in one place.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7b0b4e",
    orientation: "portrait",
    categories: ["lifestyle", "productivity", "social"],
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
