import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useDemoData } from '../context/DemoDataContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { settings } = useDemoData();

  return (
    <footer className="bg-[#123B56] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <BrandLogo variant="light" />
            <p className="text-sm leading-relaxed text-slate-300">
              {settings.tagline} A proposed digital experience designed to showcase structured
              laboratory testing, diagnostic imaging, and patient-centred appointment enquiries in
              Abuja, Nigeria.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {['Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#social-placeholder"
                  onClick={(e) => e.preventDefault()}
                  title={`${social} (Placeholder — To be linked upon approval)`}
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/15"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-teal-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/test-catalogue" className="hover:text-white transition-colors">
                  Test Catalogue
                </Link>
              </li>
              <li>
                <Link to="/health-packages" className="hover:text-white transition-colors">
                  Health Packages
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/health-resources" className="hover:text-white transition-colors">
                  Health Resources
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-teal-300">
              Diagnostic Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Laboratory Investigations
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Blood Investigations
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Ultrasound &amp; Scanning
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Specialised Laboratory Tests
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Diagnostic Imaging
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="font-semibold text-teal-300 hover:text-teal-200">
                  Book an Appointment →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-teal-300">
              Contact Information
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]" aria-hidden="true" />
                <span>{settings.provisional_address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]" aria-hidden="true" />
                <span>
                  {settings.provisional_phone}{' '}
                  {!settings.phone_verified && (
                    <span className="text-xs text-amber-300">(For verification)</span>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]" aria-hidden="true" />
                <span>{settings.official_email}</span>
              </li>
            </ul>
            <div className="mt-5">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/15"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-teal-300" aria-hidden="true" />
                Demo Admin Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.extended_name}. All rights reserved (Demonstration
            Concept).
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms and Conditions
            </Link>
            {settings.show_developer_credit && (
              <span className="text-slate-300">{settings.developer_credit}</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
