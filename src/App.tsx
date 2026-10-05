import { Routes, Route, Navigate, Link, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductsIndex from './pages/ProductsIndex';
import AiDistribution from './pages/AiDistribution';
import AiAutomations from './pages/AiAutomations';
import PriceIntelligence from './pages/PriceIntelligence';
import B2bDistribution from './pages/B2bDistribution';
import TraceSight from './pages/TraceSight';
import RevenuePilot from './pages/RevenuePilot';
import DeepSeekAppliance from './pages/DeepSeekAppliance';
import Consulting from './pages/Consulting';
import Comparison from './pages/Comparison';
import DailyStory from './pages/DailyStory';
import DailyStoriesIndex from './pages/DailyStoriesIndex';
import DailyStoryDateAlias from './pages/DailyStoryDateAlias';
import About from './pages/About';
import Changelog from './pages/Changelog';
import PlatformIpRightsNotice from './pages/PlatformIpRightsNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import PaddlePay from './pages/PaddlePay';
import Demo from './pages/Demo';
import { dailyStories } from './data/dailyStories';
import { DistributionPlatforms, HotelDistributionGuide, Integrations, CaseStudies, SandboxVerificationGuide } from './pages/GrowthPages';
import { SolutionsIndex, DmcSolution, TravelAgencySolution } from './pages/SolutionPages';
import { basePath, isPublishedLocale, isSupportedLocale } from './i18n/locale';

function NotFound() {
  return (
    <main className="min-h-screen bg-paper px-6 py-32 text-center text-ink">
      <Helmet><title>Page not found | HotelByte</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <h1 className="mb-6 font-display text-4xl">Page not found</h1>
      <Link to="/" className="text-brass underline">HotelByte home</Link>
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
  <Route path="products/ai-distribution" element={<AiDistribution />} />
  <Route path="products/ai-automations" element={<AiAutomations />} />
  <Route path="products/price-intelligence" element={<PriceIntelligence />} />
  <Route path="products/b2b-distribution" element={<B2bDistribution />} />
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
  {dailyStories.map((story) => <Route key={story.date} path={story.date} element={<DailyStoryDateAlias date={story.date} />} />)}
</>;

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<Layout />}>{pages}</Route>
        <Route path="/:locale" element={<PublishedLocaleLayout />}>{pages}</Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MotionConfig>
  );
}

export default App;
