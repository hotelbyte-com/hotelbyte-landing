/* eslint-disable react-refresh/only-export-components -- exports the route preloader next to <App> */
import { isValidElement, type ComponentType } from 'react';
import { Routes, Route, Navigate, Link, createRoutesFromChildren, matchRoutes, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import Layout from './components/Layout';
import { isLazyPage, lazyPage } from './lazyPage';
import { useI18n } from './i18n';
import { dailyStoryKeys } from './data/generated/dailyStoryKeys';
import { basePath, isPublishedLocale, isSupportedLocale } from './i18n/locale';

// Every page is its own chunk (see src/lazyPage.tsx). Layout, the router and
// i18n stay in the entry chunk because every route renders them.
const Home = lazyPage(() => import('./pages/Home'));
const ProductsIndex = lazyPage(() => import('./pages/ProductsIndex'));
const AiDistribution = lazyPage(() => import('./pages/AiDistribution'));
const AiAutomations = lazyPage(() => import('./pages/AiAutomations'));
const PriceIntelligence = lazyPage(() => import('./pages/PriceIntelligence'));
const TraceSight = lazyPage(() => import('./pages/TraceSight'));
const RevenuePilot = lazyPage(() => import('./pages/RevenuePilot'));
const DeepSeekAppliance = lazyPage(() => import('./pages/DeepSeekAppliance'));
const ProductLine = lazyPage(() => import('./pages/ProductLine'));
const Consulting = lazyPage(() => import('./pages/Consulting'));
const Comparison = lazyPage(() => import('./pages/Comparison'));
// A story page also needs its story body, loaded as a per-story chunk.
const loadStoryBody = (key: string | undefined) => import('./data/dailyStoryLoader').then((loader) => loader.loadStory(key));
const DailyStory = lazyPage(() => import('./pages/DailyStory'), ({ params }) => loadStoryBody(params.storyKey));
const DailyStoryDateAlias = lazyPage(() => import('./pages/DailyStoryDateAlias'), ({ props }) => loadStoryBody(props.date));
const DailyStoriesIndex = lazyPage(() => import('./pages/DailyStoriesIndex'));
const About = lazyPage(() => import('./pages/About'));
const Changelog = lazyPage(() => import('./pages/Changelog'));
const PlatformIpRightsNotice = lazyPage(() => import('./pages/PlatformIpRightsNotice'));
const PrivacyPolicy = lazyPage(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazyPage(() => import('./pages/TermsOfService'));
const PaddlePay = lazyPage(() => import('./pages/PaddlePay'));
const Demo = lazyPage(() => import('./pages/Demo'));
// GrowthPages and SolutionPages export several pages from one module; the
// pages of a module share one chunk.
const named = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) =>
  (): Promise<{ default: ComponentType<object> }> => load().then((module) => ({ default: module[name] }));
const growthPages = () => import('./pages/GrowthPages');
const solutionPages = () => import('./pages/SolutionPages');
const DistributionPlatforms = lazyPage(named(growthPages, 'DistributionPlatforms'));
const HotelDistributionGuide = lazyPage(named(growthPages, 'HotelDistributionGuide'));
const Integrations = lazyPage(named(growthPages, 'Integrations'));
const CaseStudies = lazyPage(named(growthPages, 'CaseStudies'));
const SandboxVerificationGuide = lazyPage(named(growthPages, 'SandboxVerificationGuide'));
const SolutionsIndex = lazyPage(named(solutionPages, 'SolutionsIndex'));
const DmcSolution = lazyPage(named(solutionPages, 'DmcSolution'));
const TravelAgencySolution = lazyPage(named(solutionPages, 'TravelAgencySolution'));

function NotFound() {
  // NotFound renders inside I18nProvider (main.tsx wraps <App />), so the
  // locale is available; the inline zh/en strings follow the repo's isZh
  // ternary style (see GrowthPages) without adding dictionary keys.
  const { locale } = useI18n();
  const isZh = locale === 'zh';
  return (
    <main className="min-h-screen bg-paper px-6 py-32 text-center text-ink">
      <Helmet><title>{isZh ? '页面不存在 | HotelByte' : 'Page not found | HotelByte'}</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <h1 className="mb-6 font-display text-4xl">{isZh ? '页面不存在' : 'Page not found'}</h1>
      <Link to="/" className="text-brass underline">{isZh ? 'HotelByte 首页' : 'HotelByte home'}</Link>
    </main>
  );
}

// Locale detection for unprefixed paths used to live only on the homepage
// (HomeLocaleEntry); deep links always rendered English. The redirect now
// lives in Layout and covers every locale-less route.
function PublishedLocaleLayout() {
  const { locale } = useParams();
  const location = useLocation();
  if (!locale || !isSupportedLocale(locale) || locale === 'en' || !isPublishedLocale(basePath(location.pathname), locale)) {
    return <NotFound />;
  }
  return <Layout />;
}

const pages = <>
  <Route index element={<Home />} />
  <Route path="stories" element={<DailyStoriesIndex />} />
  <Route path="stories/:storyKey" element={<DailyStory />} />
  <Route path="products" element={<ProductsIndex />} />
  <Route path="products/retail" element={<ProductLine lineKey="retail" />} />
  <Route path="products/api" element={<ProductLine lineKey="api" />} />
  <Route path="products/counselor" element={<ProductLine lineKey="counselor" />} />
  <Route path="products/ai-distribution" element={<AiDistribution />} />
  <Route path="products/ai-automations" element={<AiAutomations />} />
  <Route path="products/price-intelligence" element={<PriceIntelligence />} />
  <Route path="products/b2b-distribution" element={<Navigate to="../api" relative="path" replace />} />
  <Route path="products/tracesight" element={<TraceSight />} />
  <Route path="products/revenuepilot" element={<RevenuePilot />} />
  <Route path="products/deepseek-appliance" element={<DeepSeekAppliance />} />
  <Route path="services/consulting" element={<Consulting />} />
  <Route path="services/technology-consulting" element={<Navigate to="/services/consulting" replace />} />
  <Route path="products/margin-lift" element={<Navigate to="/services/consulting" replace />} />
  <Route path="products/profit-recovery" element={<Navigate to="/services/consulting" replace />} />
  <Route path="compare" element={<Comparison />} />
  <Route path="solutions" element={<SolutionsIndex />} />
  <Route path="solutions/distribution-platforms" element={<DistributionPlatforms />} />
  <Route path="solutions/dmc" element={<DmcSolution />} />
  <Route path="solutions/travel-agency" element={<TravelAgencySolution />} />
  <Route path="solutions/travel-sellers" element={<Navigate to="/solutions/travel-agency" replace />} />
  <Route path="guides/hotel-distribution" element={<HotelDistributionGuide />} />
  <Route path="guides/sandbox-verification" element={<SandboxVerificationGuide />} />
  <Route path="integrations" element={<Integrations />} />
  <Route path="case-studies" element={<CaseStudies />} />
  <Route path="about" element={<About />} />
  <Route path="demo" element={<Demo />} />
  <Route path="pay" element={<PaddlePay />} />
  <Route path="changelog" element={<Changelog />} />
  <Route path="privacy" element={<PrivacyPolicy />} />
  <Route path="terms" element={<TermsOfService />} />
  <Route path="notices/hotelbyte-platform-ip-rights" element={<PlatformIpRightsNotice />} />
  {dailyStoryKeys.map(([date]) => <Route key={date} path={date} element={<DailyStoryDateAlias date={date} />} />)}
</>;

const appRoutes = <>
  <Route path="/" element={<Layout />}>{pages}</Route>
  <Route path="/:locale" element={<PublishedLocaleLayout />}>{pages}</Route>
  <Route path="*" element={<NotFound />} />
</>;

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>{appRoutes}</Routes>
    </MotionConfig>
  );
}

// Loads the chunk (and any page data) a URL needs, using the very route tree
// <App> renders so the two cannot drift. Resolves with nothing to do for
// redirects and not-found paths. The client awaits it before its first render
// (src/main.tsx) and when a link signals intent (src/intentPreload.ts).
const routeObjects = createRoutesFromChildren(appRoutes);

export async function preloadRoute(pathname: string): Promise<void> {
  const matches = matchRoutes(routeObjects, pathname) ?? [];
  await Promise.all(matches.map(({ route, params }) => {
    const element = route.element;
    if (!isValidElement(element) || !isLazyPage(element.type)) return undefined;
    return Promise.all([element.type.preload(), element.type.preloadData?.({ params, props: element.props as object })]);
  }));
}

export default App;
