import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

const BASE_URL = "https://trueride.org";
const DEFAULT_IMAGE = `${BASE_URL}/images/privat_car_service.png`;
const SEO_SCRIPT_ID = "seo-page-schema";

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.querySelector(selector) as HTMLMetaElement | null;
  if (el) el.setAttribute(attr, value);
};

const SEO = ({ title, description, canonical, image, type = "website", publishedTime }: SEOProps) => {
  useEffect(() => {
    const fullTitle = `${title} | TrueRide`;
    const canonicalUrl = `${BASE_URL}${canonical}`;
    const imageUrl = image ? `${BASE_URL}${image}` : DEFAULT_IMAGE;

    document.title = fullTitle;

    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", canonicalUrl);

    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", imageUrl);
    setMeta('meta[property="og:image:alt"]', "content", title);

    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", imageUrl);

    // Remove any existing page-level schema injected by previous route
    document.getElementById(SEO_SCRIPT_ID)?.remove();

    if (type === "article") {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": imageUrl,
        "url": canonicalUrl,
        "datePublished": publishedTime ?? "",
        "dateModified": publishedTime ?? "",
        "author": { "@type": "Organization", "name": "TrueRide", "url": BASE_URL },
        "publisher": {
          "@type": "Organization",
          "name": "TrueRide",
          "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.svg` }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL + "/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": BASE_URL + "/blog" },
            { "@type": "ListItem", "position": 3, "name": title, "item": canonicalUrl }
          ]
        }
      };
      const script = document.createElement("script");
      script.id = SEO_SCRIPT_ID;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(articleSchema);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, image, type, publishedTime]);

  return null;
};

export default SEO;
