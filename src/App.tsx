import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PublicLayout } from './components/PublicLayout';
import { DemoDataProvider } from './context/DemoDataContext';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { HealthPackagesPage } from './pages/HealthPackagesPage';
import { HealthResourcesPage } from './pages/HealthResourcesPage';
import { HomePage } from './pages/HomePage';
import { OurTeamPage } from './pages/OurTeamPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ServicesPage } from './pages/ServicesPage';
import { TermsPage } from './pages/TermsPage';
import { TestCataloguePage } from './pages/TestCataloguePage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <DemoDataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/test-catalogue" element={<TestCataloguePage />} />
            <Route path="/health-packages" element={<HealthPackagesPage />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/our-team" element={<OurTeamPage />} />
            <Route path="/health-resources" element={<HealthResourcesPage />} />
            <Route path="/health-resources/:slug" element={<ArticleDetailPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
          </Route>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoDataProvider>
  );
}

export default App;
