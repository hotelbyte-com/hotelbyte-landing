import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomeWithDailyStoryRedirect from './pages/HomeWithDailyStoryRedirect';
import ProductsIndex from './pages/ProductsIndex';
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
import PaddlePay from './pages/PaddlePay';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeWithDailyStoryRedirect />} />
        <Route path="stories" element={<DailyStoriesIndex />} />
        <Route path="stories/:storyKey" element={<DailyStory />} />
        <Route path="products" element={<ProductsIndex />} />
        <Route path="products/ai-automations" element={<AiAutomations />} />
        <Route path="products/price-intelligence" element={<PriceIntelligence />} />
        <Route path="products/b2b-distribution" element={<B2bDistribution />} />
        <Route path="products/tracesight" element={<TraceSight />} />
        <Route path="products/revenuepilot" element={<RevenuePilot />} />
        <Route path="products/deepseek-appliance" element={<DeepSeekAppliance />} />
        <Route path="services/consulting" element={<Consulting />} />
        {/* Redirects from consolidated consulting pages → unified umbrella */}
        <Route path="services/technology-consulting" element={<Navigate to="/services/consulting" replace />} />
        <Route path="products/margin-lift" element={<Navigate to="/services/consulting" replace />} />
        <Route path="products/profit-recovery" element={<Navigate to="/services/consulting" replace />} />
        <Route path="compare" element={<Comparison />} />
        <Route path="about" element={<About />} />
        <Route path="pay" element={<PaddlePay />} />
        <Route path="changelog" element={<Changelog />} />
        <Route path="notices/hotelbyte-platform-ip-rights" element={<PlatformIpRightsNotice />} />
        <Route path=":storyDate" element={<DailyStoryDateAlias />} />
      </Route>
    </Routes>
  );
}

export default App;
