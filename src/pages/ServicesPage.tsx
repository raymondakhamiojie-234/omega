import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, CalendarCheck, ChevronRight, FlaskConical, Microscope, ScanLine } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useDemoData } from '../context/DemoDataContext';
import type { ServiceCategory } from '../types/database';

const CATEGORIES: ('All' | ServiceCategory)[] = [
  'All',
  'Laboratory Investigations',
  'Specialised Investigations',
  'Diagnostic Imaging',
];

const PROPOSED_DIRECTORY: { category: ServiceCategory; items: string[] }[] = [
  {
    category: 'Laboratory Investigations',
    items: [
      'Full Blood Count',
      'Liver Function Tests',
      'Kidney Function Tests',
      'Lipid Profile',
      'Blood Glucose',
      'Malaria Testing',
      'Hepatitis Screening',
      'Urinalysis',
      'Stool Examination',
    ],
  },
  {
    category: 'Specialised Investigations',
    items: ['Genotype', 'Blood Group', 'Hormonal Investigations', 'Other specialised tests'],
  },
  {
    category: 'Diagnostic Imaging',
    items: [
      'Ultrasound',
      'Abdominal Scan',
      'Pelvic Scan',
      'Obstetric Scan',
      'Other imaging services',
    ],
  },
];

export const ServicesPage: React.FC = () => {
  const { services } = useDemoData();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = (searchParams.get('category') as 'All' | ServiceCategory) || 'All';
  const [selectedCategory, setSelectedCategory] = useState<'All' | ServiceCategory>(
    CATEGORIES.includes(initialCat) ? initialCat : 'All'
  );

  const activeServices = useMemo(
    () =>
      services.filter(
        (s) => s.is_active && (selectedCategory === 'All' || s.category === selectedCategory)
      ),
    [services, selectedCategory]
  );

  const handleCategoryChange = (cat: 'All' | ServiceCategory) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <>
      <SEO
        title="Our Services"
        description="Explore proposed laboratory investigations, specialised tests, and diagnostic imaging services at Omega Medical Laboratory & Scan Center in Abuja."
      />

      <section className="bg-[#123B56] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Diagnostic Services Directory
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
            Our Proposed Services
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Structured laboratory testing and diagnostic imaging capabilities designed to support
            clinicians and patients.
          </p>
        </div>
      </section>

      {/* Availability Notice */}
      <section className="border-b border-[#E4EBEF] bg-amber-50/70">
        <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-4 text-sm text-amber-900 sm:px-6 lg:px-8">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p>
            <strong>Service availability to be confirmed:</strong> The services and catalogue
            examples listed below represent a proposed demonstration structure and are not a
            verified inventory. Services do not constitute medical diagnosis or treatment
            prescriptions.
          </p>
        </div>
      </section>

      {/* Category Filter & Active Service Cards */}
      <section className="bg-[#F3F7F9] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#123B56] text-white shadow-sm'
                    : 'bg-white text-[#263746] border border-[#E4EBEF] hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeServices.map((service) => (
              <article
                key={service.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E4EBEF] bg-white shadow-sm"
              >
                <div>
                  {service.image_url && (
                    <div className="h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={service.image_url}
                        alt={service.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#F3F7F9] px-3 py-1 text-xs font-semibold text-[#168C91]">
                        {service.category}
                      </span>
                      <span className="text-xs font-medium text-amber-700">
                        {service.availability_status}
                      </span>
                    </div>

                    <h2 className="mt-4 font-heading text-xl font-bold text-[#123B56]">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#708090]">
                      {service.description}
                    </p>

                    <div className="mt-4 rounded-xl bg-[#F3F7F9] p-3.5 text-xs text-[#263746]">
                      <strong className="block text-[#123B56]">Preparation Instructions:</strong>
                      <span className="mt-1 block text-[#708090]">
                        {service.preparation_instructions}
                      </span>
                    </div>

                    {service.indicative_price && (
                      <p className="mt-3 text-xs font-medium text-[#708090]">
                        Indicative Price: <span className="text-[#123B56]">{service.indicative_price}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#E4EBEF] px-6 py-4">
                  <Link
                    to={`/book-appointment?service=${encodeURIComponent(service.name)}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B56] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#168C91]"
                  >
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    Enquire / Request Appointment
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proposed Directory Overview (A, B, C) */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#123B56] sm:text-3xl">
                Proposed Investigation Categories
              </h2>
              <p className="mt-2 text-sm text-[#708090]">
                Example diagnostic categories configurable by Omega&apos;s administration team.
              </p>
            </div>
            <Link
              to="/test-catalogue"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#168C91] hover:text-[#123B56]"
            >
              Search Test Catalogue
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {PROPOSED_DIRECTORY.map((group, idx) => {
              const Icon =
                idx === 0 ? FlaskConical : idx === 1 ? Microscope : ScanLine;
              return (
                <div
                  key={group.category}
                  className="rounded-2xl border border-[#E4EBEF] bg-[#F3F7F9]/50 p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123B56] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#123B56]">
                      {group.category}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-[#263746]">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#168C91]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
