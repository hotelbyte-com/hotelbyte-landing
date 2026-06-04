import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductsIndex from './pages/ProductsIndex';
import AiAutomations from './pages/AiAutomations';
import PriceIntelligence from './pages/PriceIntelligence';
import B2bDistribution from './pages/B2bDistribution';
import TraceSight from './pages/TraceSight';
import DeepSeekAppliance from './pages/DeepSeekAppliance';
import Comparison from './pages/Comparison';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsIndex />} />
        <Route path="products/ai-automations" element={<AiAutomations />} />
        <Route path="products/price-intelligence" element={<PriceIntelligence />} />
        <Route path="products/b2b-distribution" element={<B2bDistribution />} />
        <Route path="products/tracesight" element={<TraceSight />} />
        <Route path="products/deepseek-appliance" element={<DeepSeekAppliance />} />
        <Route path="compare" element={<Comparison />} />
      </Route>
    </Routes>
  );
}

export default App;
