import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import ProductEvaluation from '../components/ProductEvaluation';
import { getProductLine, productLines, productsInLine, type ProductLineKey } from '../data/products';
import { useI18n } from '../i18n';
import { localizedPath } from '../i18n/locale';
import { SITE_ROUTES } from '../seo/routes';
import { breadcrumbSchema, itemListSchema, webPageSchema } from '../seo/schema';

const routeKeys: Record<ProductLineKey, string> = { retail: 'staiRetail', api: 'staiApi', counselor: 'staiCounselor' };

// Primary call to action per line, in the line's own commercial terms.
const primaryCta: Record<ProductLineKey, { zh: string; en: string; to?: string; href?: string }> = {
  retail: { zh: '联系我们开店', en: 'Talk to us about your store', href: 'mailto:sales@hotelbyte.com' },
  api: { zh: '查看在线演示', en: 'Open the online demo', to: '/demo' },
  counselor: { zh: '申请早期访问', en: 'Request early access', href: 'mailto:sales@hotelbyte.com' },
};

// One page per Stai product line (/products/retail, /products/api,
// /products/counselor). Content lives in src/data/products.ts.
export default function ProductLine({ lineKey }: { lineKey: ProductLineKey }) {
  const { locale } = useI18n();
  const en = locale !== 'zh'; // tier-2 locales render the English body
  const line = getProductLine(lineKey);
  const route = SITE_ROUTES[routeKeys[lineKey]];
  const lineProducts = productsInLine(lineKey);
  const otherLines = productLines.filter((item) => item.key !== lineKey);
  const to = (path: string) => localizedPath(path, locale);
  const cta = primaryCta[lineKey];

  const jsonLd = [
    webPageSchema(route.path, en ? route.title : route.titleZh, en ? route.description : route.descriptionZh, en ? 'en' : 'zh-CN'),
    breadcrumbSchema([
      { name: en ? 'Home' : '首页', path: '/' },
      { name: en ? 'Products' : '产品', path: '/products' },
      { name: line.name, path: route.path },
    ]),
    ...(lineProducts.length ? [itemListSchema(
      line.name,
      en ? line.summaryEn : line.summary,
      lineProducts.map((p) => ({ name: en ? p.nameEn : p.name, path: `/products/${p.slug}`, description: en ? p.taglineEn : p.tagline })),
    )] : []),
  ];

  return (
    <main className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <Seo
        path={route.path}
        title={en ? route.title : route.titleZh}
        description={en ? route.description : route.descriptionZh}
        locale={en ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />

      <header className="max-w-3xl mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-brass mb-4">
          <Link to={to('/products')} className="hover:underline">{en ? 'Products' : '产品'}</Link>
        </p>
        <h1 className="text-4xl lg:text-6xl font-display mb-4">
          {line.name}
          {line.earlyAccess && <span className="ml-4 align-middle inline-block px-2.5 py-1 border border-brass/50 text-brass text-xs font-sans font-medium tracking-normal rounded-sm">{en ? 'Early access' : '早期访问'}</span>}
        </h1>
        <p className="text-2xl text-ink/80 mb-6">{en ? line.descriptorEn : line.descriptor}</p>
        <p className="text-lg text-ink/65 leading-relaxed mb-4">{en ? line.summaryEn : line.summary}</p>
        <p className="text-ink/55 leading-relaxed">{en ? line.audienceEn : line.audience}</p>
        <div className="flex flex-wrap gap-4 mt-8">
          {cta.to ? (
            <Link to={to(cta.to)} className="px-7 py-4 bg-ink text-paper font-bold rounded-sm">{en ? cta.en : cta.zh}</Link>
          ) : (
            <a href={cta.href} className="px-7 py-4 bg-ink text-paper font-bold rounded-sm">{en ? cta.en : cta.zh}</a>
          )}
          {lineKey === 'api' && (
            <Link to={to('/guides/sandbox-verification')} className="px-7 py-4 border border-line rounded-sm">
              {en ? 'Sandbox verification guide' : '沙箱验证指南'}
            </Link>
          )}
        </div>
      </header>

      <section aria-labelledby="highlights-heading" className="mb-20">
        <h2 id="highlights-heading" className="text-3xl font-display mb-8">
          {en ? 'Key features' : '核心功能'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {line.highlights.map((item) => (
            <article key={item.id} id={item.id} className="scroll-mt-24 p-7 border border-line bg-paper-raised rounded-sm">
              <h3 className="font-bold text-xl mb-3">{en ? item.titleEn : item.title}</h3>
              <p className="text-ink/65 leading-relaxed">{en ? item.descEn : item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {line.technical && (
        <section aria-labelledby="technical-heading" className="mb-20">
          <h2 id="technical-heading" className="text-3xl font-display mb-3">{en ? 'Integration' : '技术接入'}</h2>
          <p className="text-ink/60 mb-8">
            <a href="https://openapi.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-brass hover:underline">
              {en ? 'OpenAPI documentation' : 'OpenAPI 文档'} ↗
            </a>
          </p>
          <dl className="border-t border-line">
            {line.technical.map((item) => (
              <div key={item.id} className="grid md:grid-cols-[14rem_1fr] gap-2 md:gap-8 border-b border-line py-5">
                <dt className="font-mono text-sm text-ink">{en ? item.titleEn : item.title}</dt>
                <dd className="text-ink/65 leading-relaxed">{en ? item.descEn : item.desc}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <ProductEvaluation
        rows={line.evaluation}
        rowsEn={line.evaluationEn}
        eyebrow="采购视角"
        eyebrowEn="Procurement view"
        title={`评估 ${line.name} 时看什么`}
        titleEn={`What to check when evaluating ${line.name}`}
        lead="每一项都附验证方法，用你自己的账号和数据当场核对。"
        leadEn="Each check comes with a way to verify it using your own accounts and data."
      />

      {lineProducts.length > 0 && (
        <section aria-labelledby="line-products-heading" className="mb-20">
          <h2 id="line-products-heading" className="text-3xl font-display mb-8">
            {en ? 'Add-on products' : '配套产品'}
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
            {lineProducts.map((p) => (
              <Link key={p.slug} to={to(`/products/${p.slug}`)} className="group block bg-paper-raised hover:bg-paper p-8 transition-colors">
                <h3 className="font-display text-2xl mb-3">{en ? p.nameEn : p.name}</h3>
                <p className="text-ink/65 leading-relaxed mb-5">{en ? p.taglineEn : p.tagline}</p>
                <span className="inline-flex items-center gap-1.5 text-brass font-medium text-sm group-hover:gap-2.5 transition-all">
                  {en ? 'Learn more' : '了解详情'} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="scope-heading" className="mb-20 max-w-4xl">
        <h2 id="scope-heading" className="text-3xl font-display mb-6">{en ? 'Before you start' : '开始之前请了解'}</h2>
        <ul className="space-y-3">
          {(en ? line.scopeNotesEn : line.scopeNotes).map((note) => (
            <li key={note} className="border-t border-line pt-3 text-ink/70 leading-relaxed">{note}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="other-lines-heading" className="border-t border-line pt-12">
        <h2 id="other-lines-heading" className="text-sm font-semibold text-ink/55 mb-6">{en ? 'Other Stai product lines' : '其他 Stai 产品线'}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {otherLines.map((item) => (
            <Link key={item.key} to={to(`/products/${item.slug}`)} className="group block p-6 border border-line rounded-sm hover:border-brass/40">
              <span className="block font-display text-2xl mb-1">{item.name}</span>
              <span className="block text-ink/60 mb-3">{en ? item.descriptorEn : item.descriptor}</span>
              <span className="text-sm text-ink/55">{en ? item.audienceEn : item.audience}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
