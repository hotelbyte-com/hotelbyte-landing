import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeWithDailyStoryRedirect from './pages/HomeWithDailyStoryRedirect';
import ProductsIndex from './pages/ProductsIndex';
import AiAutomations from './pages/AiAutomations';
import PriceIntelligence from './pages/PriceIntelligence';
import B2bDistribution from './pages/B2bDistribution';
import TraceSight from './pages/TraceSight';
import RevenuePilot from './pages/RevenuePilot';
import ProfitRecovery from './pages/ProfitRecovery';
import DeepSeekAppliance from './pages/DeepSeekAppliance';
import Comparison from './pages/Comparison';
import DailyStory from './pages/DailyStory';
import DailyStoriesIndex from './pages/DailyStoriesIndex';
import DailyStoryDateAlias from './pages/DailyStoryDateAlias';
import About from './pages/About';
import Changelog from './pages/Changelog';

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
        <Route path="products/margin-lift" element={<ProfitRecovery />} />
        <Route path="products/profit-recovery" element={<ProfitRecovery />} />
        <Route path="products/deepseek-appliance" element={<DeepSeekAppliance />} />
        <Route path="compare" element={<Comparison />} />
        <Route path="about" element={<About />} />
        <Route path="changelog" element={<Changelog />} />
        <Route path=":storyDate" element={<DailyStoryDateAlias />} />
      </Route>
    </Routes>
  );
}

export default App;
