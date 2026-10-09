import type { MetadataRoute } from "next";
import { COURSES } from "@/lib/site-data";

const BASE = "https://rootsacademy.space-z.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/courses`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/founder`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/parent-portal`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = COURSES.map((c) => ({
    url: `${BASE}/courses/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes];
}
