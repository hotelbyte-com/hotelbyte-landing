// Schema.org JSON-LD constructors for SEO / GEO / AEO.
// Each function returns a plain object that can be embedded into
// <script type="application/ld+json">. Use Seo.tsx to inject.

import type { Product, ProductLine } from '../data/products';

export const SITE = {
  name: 'HotelByte',
  url: 'https://hotelbyte.com',
  logo: 'https://hotelbyte.com/apple-touch-icon.png',
  description: {
    en: 'HotelByte builds hotel distribution software and sells it under the Stai brand: Stai Retail for independent sellers, Stai API for B2B at scale, and Stai Counselor for travel advisors.',
    zh: 'HotelByte 打造酒店分销软件，以 Stai 品牌销售：面向独立卖家的 Stai Retail、面向规模化 B2B 的 Stai API、面向旅行顾问的 Stai Counselor。'
  },
  sameAs: [
    'https://github.com/hotelbyte-com',
    'https://blog.hotelbyte.com',
    'https://openapi.hotelbyte.com'
  ]
};

// Stai is the product brand HotelByte sells under; every product line and
// product names it, so answer engines connect "Stai" to HotelByte.
export const STAI_BRAND = {
  '@type': 'Brand',
  name: 'Stai',
  url: SITE.url + '/products',
  slogan: 'Stai by HotelByte'
};

export type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    alternateName: 'HotelByte.com',
    url: SITE.url + '/',
    logo: SITE.logo,
    description: SITE.description.en,
    sameAs: SITE.sameAs,
    brand: STAI_BRAND,
    knowsAbout: ['hotel distribution', 'hotel booking API', 'B2B travel distribution', 'hotel price intelligence', 'travel advisor tools'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'sales@hotelbyte.com',
        availableLanguage: ['en', 'zh']
      }
    ]
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url + '/',
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url + '/',
      logo: SITE.logo
    }
  };
}

export function webPageSchema(path: string, name: string, description: string, inLanguage: string = 'zh-CN'): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': SITE.url + path,
    url: SITE.url + path,
    name,
    description,
    inLanguage,
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url + '/' },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/', logo: SITE.logo }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: SITE.url + it.path
    }))
  };
}

export function softwareApplicationSchema(product: Product, path: string, locale: string = 'en'): JsonLd {
  const name = locale === 'en' ? product.nameEn : product.name;
  const description = locale === 'en' ? product.descriptionEn : product.description;
  const tagline = locale === 'en' ? product.taglineEn : product.tagline;
  const features = locale === 'en' ? product.techHighlightsEn : product.techHighlights;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    alternateName: product.slug,
    description,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Hotel Distribution Platform',
    operatingSystem: 'Web',
    url: SITE.url + path,
    featureList: features.join('; '),
    slogan: tagline,
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/', logo: SITE.logo },
    brand: STAI_BRAND
  };
}

// A Stai product line (/products/<line>) as a software product of the Stai brand.
export function productLineSchema(line: ProductLine, path: string, locale: string = 'en'): JsonLd {
  const en = locale === 'en';
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: line.name,
    description: en ? line.summaryEn : line.summary,
    slogan: en ? line.descriptorEn : line.descriptor,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Hotel Distribution Platform',
    operatingSystem: 'Web',
    url: SITE.url + path,
    featureList: line.highlights.map((item) => (en ? item.titleEn : item.title)).join('; '),
    audience: { '@type': 'BusinessAudience', audienceType: en ? line.audienceEn : line.audience },
    brand: STAI_BRAND,
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/', logo: SITE.logo }
  };
}

export function itemListSchema(name: string, description: string, items: Array<{ name: string; path: string; description?: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      url: SITE.url + it.path,
      description: it.description
    }))
  };
}

export function faqSchema(qa: Array<{ q: string; a: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a
      }
    }))
  };
}

export function howToSchema(name: string, description: string, steps: Array<{ name: string; text: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text
    }))
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  path: string;
  image: string;
  inLanguage: string;
  keywords?: string[];
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: opts.inLanguage,
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE.url + opts.path },
    url: SITE.url + opts.path,
    image: opts.image,
    keywords: opts.keywords?.join(', '),
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/', logo: SITE.logo },
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/' }
  };
}

export function collectionPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  hasPart: Array<{ name: string; path: string }>;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: SITE.url + opts.path,
    hasPart: opts.hasPart.map((it) => ({
      '@type': 'Article',
      name: it.name,
      url: SITE.url + it.path
    })),
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url + '/' },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/', logo: SITE.logo }
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  locale: 'en' | 'zh';
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.serviceType,
    name: opts.name,
    description: opts.description,
    url: SITE.url + opts.path,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url + '/',
      logo: SITE.logo
    },
    areaServed: 'Worldwide',
    inLanguage: opts.locale === 'en' ? 'en' : 'zh-CN',
    brand: { '@type': 'Brand', name: SITE.name }
  };
}
