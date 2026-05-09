import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
}

const CANONICAL_ORIGIN = "https://balancedmedicalspa.com";

function setMetaContent(selector: string, content: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute("content", content);
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

export function SEO({ title, description, keywords, canonicalPath }: SEOProps) {
  useEffect(() => {
    document.title = title;

    setMetaContent('meta[name="description"]', description);
    if (keywords) setMetaContent('meta[name="keywords"]', keywords);

    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const path = canonicalPath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
    const canonicalUrl = `${CANONICAL_ORIGIN}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
    setLinkHref("canonical", canonicalUrl);
    setMetaContent('meta[property="og:url"]', canonicalUrl);

    return () => {
      document.title = "Balanced Wellness Medical Spa | Med Spa Kingsport TN & Jonesborough TN";
    };
  }, [title, description, keywords, canonicalPath]);

  return null;
}
