import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt: string;
  siteName: string;
  type: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string;
  jsonLd: object[];
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement('meta');
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node?.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let node = document.head.querySelector<HTMLLinkElement>(selector);
  if (!node) {
    node = document.createElement('link');
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node?.setAttribute(key, value);
  });
}

function setOptionalMeta(selector: string, attributes: Record<string, string> | null) {
  const node = document.head.querySelector(selector);
  if (!attributes) {
    node?.parentNode?.removeChild(node);
    return;
  }

  upsertMeta(selector, attributes);
}

export default function Seo({
  title,
  description,
  canonical,
  image,
  imageAlt,
  siteName,
  type,
  author,
  publishedTime,
  modifiedTime,
  keywords,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="author"]', { name: 'author', content: author ?? 'Brin Shadewater' });
    setOptionalMeta(
      'meta[name="keywords"]',
      keywords ? { name: 'keywords', content: keywords } : null,
    );
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_CA' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
    upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: imageAlt });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:site"]', { name: 'twitter:site', content: '@brinshadewater' });
    upsertMeta('meta[name="twitter:creator"]', { name: 'twitter:creator', content: '@brinshadewater' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: imageAlt });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large' });
    setOptionalMeta(
      'meta[property="article:published_time"]',
      type === 'article' && publishedTime
        ? { property: 'article:published_time', content: publishedTime }
        : null,
    );
    setOptionalMeta(
      'meta[property="article:modified_time"]',
      type === 'article' && modifiedTime
        ? { property: 'article:modified_time', content: modifiedTime }
        : null,
    );
    setOptionalMeta(
      'meta[property="article:author"]',
      type === 'article' && author ? { property: 'article:author', content: author } : null,
    );
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical });
    upsertLink('link[rel="alternate"][hreflang="en-CA"]', {
      rel: 'alternate',
      hrefLang: 'en-CA',
      href: canonical,
    });
    upsertLink('link[rel="alternate"][hreflang="en"]', {
      rel: 'alternate',
      hrefLang: 'en',
      href: canonical,
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hrefLang: 'x-default',
      href: canonical,
    });

    document.head
      .querySelectorAll('script[data-seo-jsonld="true"]')
      .forEach((node) => node.parentNode?.removeChild(node));

    jsonLd.forEach((entry) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'true';
      script.text = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }, [author, canonical, description, image, imageAlt, jsonLd, keywords, modifiedTime, publishedTime, siteName, title, type]);

  return null;
}
