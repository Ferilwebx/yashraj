import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Infrastructure from './pages/Infrastructure';
import Quality from './pages/Quality';
import Contact from './pages/Contact';
import CapabilityDetail from './pages/CapabilityDetail';
import Capabilities from './pages/Capabilities';
import IndustryDetail from './pages/IndustryDetail';
import Industries from './pages/Industries';
import ProductDetail from './pages/ProductDetail';
import Exports from './pages/Exports';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import RFQ from './pages/RFQ';
import Downloads from './pages/Downloads';
import SitemapXml from './pages/SitemapXml';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminRFQs from './pages/admin/AdminRFQs';
import AdminCareers from './pages/admin/AdminCareers';
import AdminBlogList from './pages/admin/AdminBlogList';
import AdminBlogEdit from './pages/admin/AdminBlogEdit';
import AdminMedia from './pages/admin/AdminMedia';
import AdminSEO from './pages/admin/AdminSEO';
import AdminSiteSettings from './pages/admin/AdminSiteSettings';
import AdminHomepageSettings from './pages/admin/AdminHomepageSettings';
import AdminImages from './pages/admin/AdminImages';
import AdminDownloads from './pages/admin/AdminDownloads';
import { ImageProvider } from './contexts/ImageContext';
import MobileBottomBar from './components/MobileBottomBar';
import { useLocation } from 'react-router-dom';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-slate-800 border-t-rose-500 rounded-full animate-spin"></div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">LOADING YASHRAJ ENTERPRISES</span>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/infrastructure" element={<Infrastructure />} />
      <Route path="/quality" element={<Quality />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/capabilities" element={<Capabilities />} />
      <Route path="/capabilities/:slug" element={<CapabilityDetail />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/industries/:slug" element={<IndustryDetail />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/exports" element={<Exports />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/rfq" element={<RFQ />} />
      <Route path="/downloads" element={<Downloads />} />
      <Route path="/sitemap.xml" element={<SitemapXml />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        <Route path="/admin/rfqs" element={<AdminRFQs />} />
        <Route path="/admin/careers" element={<AdminCareers />} />
        <Route path="/admin/blog" element={<AdminBlogList />} />
        <Route path="/admin/blog/new" element={<AdminBlogEdit />} />
        <Route path="/admin/blog/:id" element={<AdminBlogEdit />} />
        <Route path="/admin/media" element={<AdminMedia />} />
        <Route path="/admin/images" element={<AdminImages />} />
        <Route path="/admin/downloads" element={<AdminDownloads />} />
        <Route path="/admin/seo" element={<AdminSEO />} />
        <Route path="/admin/settings" element={<AdminSiteSettings />} />
        <Route path="/admin/homepage" element={<AdminHomepageSettings />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
    {!isAdminRoute && <MobileBottomBar />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <ImageProvider>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </ImageProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App