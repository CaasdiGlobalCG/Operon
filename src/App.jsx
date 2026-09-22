import { useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import CorporateLayout from './layouts/CorporateLayout';
import Operon360Layout from './layouts/Operon360Layout';
import Home from './pages/Home';
import About from './pages/About';
import Approach from './pages/Approach';
import Platforms from './pages/Platforms';
import Industries from './pages/Industries';
import IndustryDetail from './pages/IndustryDetail';
import Insights from './pages/Insights';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import { Legal, LegalDoc } from './pages/Legal';
import Grow from './pages/Grow';
import O360Landing from './pages/o360/Landing';
import O360Features from './pages/o360/Features';
import O360Industries from './pages/o360/Industries';
import GetDemo from './pages/o360/GetDemo';
import Login from './pages/o360/Login';
import Process from './pages/o360/Process';
import WhyUs from './pages/o360/WhyUs';
import Ecosystem from './pages/o360/Ecosystem';
import NotFound from './pages/NotFound';
import { O360 } from './lib/site';

// Hash routing is used only for the static single-file preview build, where no
// server rewrite exists. Production uses clean paths.
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter;

/** Pages land at the top; in-page anchors still resolve. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'auto' : 'auto' });
  }, [pathname, hash]);
  return null;
}

export function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Routes>
        {/* ---------------------------------------- Operon Softwares (corporate) */}
        <Route element={<CorporateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/privacy-policy" element={<LegalDoc />} />
          <Route path="/legal/terms-of-service" element={<LegalDoc />} />
          <Route path="/legal/acceptable-use-policy" element={<LegalDoc />} />
          <Route path="/grow" element={<Grow />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* -------------------------------------------------- Operon 360 sub-site */}
        <Route path={O360} element={<Operon360Layout />}>
          <Route index element={<O360Landing />} />
          <Route path="features" element={<O360Features />} />
          <Route path="industries" element={<O360Industries />} />
          <Route path="get-demo" element={<GetDemo />} />
          <Route path="login" element={<Login />} />
          <Route path="process" element={<Process />} />
          <Route path="why-us" element={<WhyUs />} />
          <Route path="ecosystem" element={<Ecosystem />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
