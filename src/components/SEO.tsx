import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

const BASE_URL = "https://trueride.app";

const SEO = ({ title, description, canonical, image, type = "website", publishedTime }: SEOProps) => {
  const fullTitle = `${title} | TrueRide`;
  const canonicalUrl = `${BASE_URL}${canonical}`;
  const imageUrl = image ? `${BASE_URL}${image}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="TrueRide" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Helmet>
  );
};

export default SEO;
