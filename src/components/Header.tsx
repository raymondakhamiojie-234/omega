import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CalendarCheck, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { DemoNoticeBanner } from './DemoNoticeBanner';

const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Test Catalogue', to: '/test-catalogue' },
  { label: 'Health Resources', to: '/health-resources' },
  { label: 'Contact', to: '/contact' },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <DemoNoticeBanner />
      <div
        className={`transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E4EBEF]'
            : 'bg-white border-b border-[#E4EBEF]'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168C91] rounded-lg">
            <BrandLogo variant="dark" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main Navigation">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-[#168C91] ${
                    isActive ? 'text-[#168C91] font-semibold' : 'text-[#263746]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/health-packages"
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#123B56] transition-colors hover:bg-[#F3F7F9]"
            >
              Packages
            </Link>
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 rounded-xl bg-[#123B56] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#168C91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168C91] focus-visible:ring-offset-2"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book an Appointment
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#E4EBEF] text-[#123B56] transition-colors hover:bg-[#F3F7F9] lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#E4EBEF] bg-white px-4 pb-6 pt-4 lg:hidden">
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {[
                { label: 'Home', to: '/' },
                ...NAV_LINKS,
                { label: 'Health Packages', to: '/health-packages' },
                { label: 'Our Team', to: '/our-team' },
                { label: 'FAQ', to: '/faq' },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-lg px-3.5 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F3F7F9] text-[#168C91] font-semibold'
                        : 'text-[#263746] hover:bg-[#F3F7F9]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-3">
                <Link
                  to="/book-appointment"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B56] px-5 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#168C91]"
                >
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Book an Appointment
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
