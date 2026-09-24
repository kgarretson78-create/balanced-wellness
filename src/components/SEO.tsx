import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
}

const CANONICAL_ORIGIN = "https://www.balancedmedicalspa.com";
const DEFAULT_IMAGE = `${CANONICAL_ORIGIN}/opengraph.jpg`;

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => el?.setAttribute(key, value));
    document.head.appendChild(el);
  }
  return el;
}

function setMetaContent(selector: string, content: string, attributes: Record<string, string>) {
  ensureMeta(selector, attributes).setAttribute("content", content);
}

function setLinkHref(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    setMetaContent('meta[name="description"]', description, { name: "description" });
    if (keywords) setMetaContent('meta[name="keywords"]', keywords, { name: "keywords" });
    setMetaContent('meta[name="robots"]', robots, { name: "robots" });

    setMetaContent('meta[property="og:title"]', title, { property: "og:title" });
    setMetaContent('meta[property="og:description"]', description, { property: "og:description" });
    setMetaContent('meta[property="og:type"]', type, { property: "og:type" });
    setMetaContent('meta[property="og:site_name"]', "Balanced Wellness Medical Spa", { property: "og:site_name" });
    setMetaContent('meta[property="og:locale"]', "en_US", { property: "og:locale" });
    setMetaContent('meta[property="og:image"]', image, { property: "og:image" });
    setMetaContent('meta[property="og:image:alt"]', "Balanced Wellness Medical Spa in Kingsport and Jonesborough, Tennessee", { property: "og:image:alt" });

    setMetaContent('meta[name="twitter:card"]', "summary_large_image", { name: "twitter:card" });
    setMetaContent('meta[name="twitter:title"]', title, { name: "twitter:title" });
    setMetaContent('meta[name="twitter:description"]', description, { name: "twitter:description" });
    setMetaContent('meta[name="twitter:image"]', image, { name: "twitter:image" });

    const path = canonicalPath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
    const canonicalUrl = `${CANONICAL_ORIGIN}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
    setLinkHref("canonical", canonicalUrl);
    setMetaContent('meta[property="og:url"]', canonicalUrl, { property: "og:url" });

    return () => {
      document.title = "Balanced Wellness Medical Spa | Med Spa Kingsport TN & Jonesborough TN";
    };
  }, [title, description, keywords, canonicalPath, image, type, robots]);

  return null;
}
