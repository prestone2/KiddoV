import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  children?: React.ReactNode;
};

const Seo: React.FC<Props> = ({
  title,
  description,
  keywords,
  ogDescription,
  canonicalUrl,
  children,
}) => {
  const baseUrl = 'https://kiddovase.com';
  const defaultDescription =
    'Play, Learn, and Grow Safely on Kiddovase — a fun, educational, and child-safe gaming platform with chat and friends.';
  const ogImage = `${baseUrl}/assets/default-og-image.png`;

  // Construct full title
  const fullTitle = title ? `${title} | Kiddovase` : 'Kiddovase | Play, Learn, and Grow Safely';

  // Compute canonical & OG URL
  const currentUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : canonicalUrl || baseUrl;

  // Pick best description
  const metaDescription = description || defaultDescription;
  const openGraphDescription = ogDescription || metaDescription;

  return (
    <>
      <Helmet>
        {/* Page Title */}
        <title>{fullTitle}</title>

        {/* Meta Basics */}
        <meta name="description" content={metaDescription} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl || currentUrl} />

        {/* --- Open Graph (Facebook, LinkedIn, etc.) --- */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={openGraphDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl || currentUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Kiddovase" />

        {/* --- Twitter Cards --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={openGraphDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kiddovase",
          "url": "${baseUrl}",
          "description": "${defaultDescription}",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "${baseUrl}/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }`}</script>
      </Helmet>

      {/* Allow nested content */}
      {children}
    </>
  );
};

export default Seo;
