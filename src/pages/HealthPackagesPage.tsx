import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, CheckCircle2, Info } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useDemoData } from '../context/DemoDataContext';

export const HealthPackagesPage: React.FC = () => {
  const { packages } = useDemoData();
  const activePackages = packages.filter((p) => p.is_active);

  return (
    <>
      <SEO
        title="Health Packages"
        description="Explore configurable health screening packages including General, Women's Wellness, Men's Wellness, and Executive Health Screening."
      />

      <section className="bg-[#123B56] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Preventative Wellness Screening
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
            Health Screening Packages
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Structured diagnostic packages designed for individuals and organisations. Package
            contents and pricing are fully configurable via the Admin Dashboard.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F7F9] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#E4EBEF] bg-white p-4 text-sm text-[#708090]">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#168C91]" aria-hidden="true" />
            <p>
              <strong>Approval Notice:</strong> All included tests and package prices shown in this
              demonstration must be reviewed and approved by Omega Medical Laboratory before
              publication.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {activePackages.map((pkg) => (
              <article
                key={pkg.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E4EBEF] bg-white p-8 shadow-sm"
              >
                <div>
                  <span className="inline-block rounded-full bg-[#F3F7F9] px-3 py-1 text-xs font-semibold text-[#168C91]">
                    {pkg.audience}
                  </span>
                  <h2 className="mt-4 font-heading text-2xl font-bold text-[#123B56]">
                    {pkg.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#708090]">
                    {pkg.short_description}
                  </p>

                  <div className="mt-6 border-t border-[#E4EBEF] pt-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B56]">
                      Proposed Included Tests
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {pkg.included_tests.map((test) => (
                        <li key={test} className="flex items-start gap-2.5 text-sm text-[#263746]">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]"
                            aria-hidden="true"
                          />
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#E4EBEF] pt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="block text-xs text-[#708090]">Package Fee</span>
                    <span className="font-heading text-base font-bold text-[#123B56]">
                      {pkg.is_price_approved ? pkg.price_display : 'Request Package Information'}
                    </span>
                  </div>
                  <Link
                    to={`/book-appointment?service=${encodeURIComponent(pkg.name)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B56] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#168C91]"
                  >
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    Request Package Information
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
