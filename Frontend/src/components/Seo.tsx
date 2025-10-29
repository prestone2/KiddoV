import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactNode;
};

const Seo: React.FC<Props> = ({ title, description, keywords, children }) => {
  const fullTitle = title ? `${title} | KiddoVase` : 'KiddoVase';

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>

        {/* Meta basics */}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={typeof window !== 'undefined' ? window.location.href : 'https://kiddovase.com'}
        />

        {/* Open Graph (for social preview) */}
        <meta property="og:title" content={fullTitle} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:site_name" content="KiddoVase" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kiddovase.com" />
        <meta property="og:image" content="https://kiddovase.com/og-image.png" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        {description && <meta name="twitter:description" content={description} />}
        <meta name="twitter:image" content="https://kiddovase.com/og-image.png" />

        {/* Structured Data for Google */}
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "KiddoVase",
          "url": "https://kiddovase.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://kiddovase.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }`}</script>
      </Helmet>
      {children}
    </>
  );
};

export default Seo;
