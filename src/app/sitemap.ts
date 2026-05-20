import type { MetadataRoute } from "next";

const SITE_URL = "https://paradaise.id";

const ROUTES_ES = ["", "manifesto", "inversionistas", "contacto", "privacy", "about"];
const ROUTES_EN = ["en", "en/manifesto", "en/inversionistas", "en/contacto", "en/privacy", "en/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [...ROUTES_ES, ...ROUTES_EN].map((path) => ({
    url: `${SITE_URL}/${path}`.replace(/\/$/, ""),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.7,
  }));
}
