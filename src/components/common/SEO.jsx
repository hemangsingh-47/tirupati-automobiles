import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '../../context/SettingsContext';

const SEO = ({ title, description, keywords, image, url }) => {
  const { settings } = useSettings();
  
  const siteTitle = settings?.businessName || 'Tirupati Automobiles';
  const siteDescription = settings?.tagline || 'Professional Car Care & Multi Brand Workshop';
  
  const currentTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const currentDescription = description || siteDescription;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{currentTitle}</title>
      <meta name="title" content={currentTitle} />
      <meta name="description" content={currentDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || window.location.href} />
      <meta property="twitter:title" content={currentTitle} />
      <meta property="twitter:description" content={currentDescription} />
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
