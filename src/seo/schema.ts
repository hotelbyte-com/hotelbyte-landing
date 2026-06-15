// Schema.org JSON-LD constructors for SEO / GEO / AEO.
// Each function returns a plain object that can be embedded into
// <script type="application/ld+json">. Use Seo.tsx to inject.

import type { Product } from '../data/products';

export const SITE = {
  name: 'HotelByte',
  url: 'https://hotelbyte.com',
  logo: 'https://hotelbyte.com/favicon.svg',
  description: {
    en: 'HotelByte is the AI-Native engineering operating system for hotel distribution: price intelligence, full-linkage diagnostics, AI revenue strategy, and B2B infrastructure with 27+ supplier integrations.',
    zh: 'HotelByte 是面向酒店分销的 AI-Native 工程化操作系统:价格情报、全链路智能诊断、AI 收益策略与 27+ 供应商 B2B 底座。'
  },
  sameAs: [
    'https://github.com/hotelbyte-com',
    'https://github.com/hotelbyte-com/hotelbyte-landing'
  ]
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
    foundingDate: '2024',
    sameAs: SITE.sameAs,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        url: SITE.url + '/compare',
        contactType: 'sales',
        name: 'Migration Advisor'
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
    inLanguage: ['zh-CN', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: SITE.url + '/stories?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url + '/',
      logo: SITE.logo
    }
  };
}

export function webPageSchema(path: string, name: string, description: string, inLanguage: 'zh-CN' | 'en' = 'zh-CN'): JsonLd {
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

export function softwareApplicationSchema(product: Product, path: string, locale: 'en' | 'zh' = 'en'): JsonLd {
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
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      price: '0',
      description: 'Custom pricing — contact sales'
    },
    featureList: features.join('; '),
    slogan: tagline,
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/', logo: SITE.logo },
    brand: { '@type': 'Brand', name: SITE.name }
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
  inLanguage: 'zh-CN' | 'en';
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

export function comparisonSchema(items: Array<{ name: string; path?: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'HotelByte vs competitors',
    description: 'Side-by-side comparison of HotelByte against SiteMinder, Cloudbeds, D-EDGE, Juniper, Gimmonix, ZentrumHub, and TravelgateX across pricing, integration speed, AI/automation, total cost of ownership, implementation, support, and B2B agency support.',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      ...(it.path ? { url: SITE.url + it.path } : {})
    }))
  };
}
