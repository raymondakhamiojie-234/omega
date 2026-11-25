import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Compass, Eye, HeartHandshake, ShieldCheck, Users } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useDemoData } from '../context/DemoDataContext';

export const AboutPage: React.FC = () => {
  const { settings } = useDemoData();

  return (
    <>
      <SEO
        title="About Us"
        description="Proposed company profile for Omega Medical Laboratory & Scan Center in Abuja, Nigeria. Includes editable placeholders for confirmed company history, mission, vision, and management."
      />

      {/* Page Header */}
      <section className="bg-[#123B56] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Company Profile (Demonstration)
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            About {settings.extended_name}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
            A structured corporate profile framework prepared for Omega Medical Laboratory &amp; Scan
            Center. All marked placeholders are ready to be replaced with confirmed company
            information.
          </p>
        </div>
      </section>

      {/* Company Introduction & Story */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-block rounded-full bg-[#F3F7F9] px-3 py-1 text-xs font-semibold text-[#168C91]">
              Established: [CONFIRMED YEAR ESTABLISHED]
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#123B56]">Our Story</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-[#263746]">
              <p className="rounded-xl border border-dashed border-[#168C91]/40 bg-[#F3F7F9] p-4 text-sm text-[#123B56]">
                <strong>Placeholder — [CONFIRMED COMPANY HISTORY]:</strong> Insert Omega Medical
                Laboratory &amp; Scan Center&apos;s verified founding background, milestones, and
                leadership narrative upon management approval.
              </p>
              <p className="text-[#708090]">
                This proposed digital platform is designed to present Omega&apos;s diagnostic
                services clearly, support patient enquiries, and reflect a calm, trustworthy
                clinical presence in Abuja, Federal Capital Territory.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#E4EBEF] shadow-sm">
            <img
              src="/images/facility-reception.jpg"
              alt="Modern private medical diagnostic reception and consultation environment"
              className="h-80 w-full object-cover sm:h-96"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#F3F7F9] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E4EBEF] bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#123B56] text-white">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-heading text-2xl font-bold text-[#123B56]">Our Mission</h2>
              <p className="mt-3 rounded-xl border border-dashed border-[#168C91]/40 bg-[#F3F7F9] p-4 text-sm leading-relaxed text-[#263746]">
                <strong>[APPROVED MISSION]:</strong> To be populated with Omega Medical
                Laboratory&apos;s officially approved mission statement.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E4EBEF] bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#168C91] text-white">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-heading text-2xl font-bold text-[#123B56]">Our Vision</h2>
              <p className="mt-3 rounded-xl border border-dashed border-[#168C91]/40 bg-[#F3F7F9] p-4 text-sm leading-relaxed text-[#263746]">
                <strong>[APPROVED VISION]:</strong> To be populated with Omega Medical
                Laboratory&apos;s officially approved vision statement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168C91]">
              Guiding Principles
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-[#123B56]">Core Values</h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Integrity & Confidentiality',
                desc: 'Respecting patient privacy and handling all enquiries with professional discretion.',
              },
              {
                icon: HeartHandshake,
                title: 'Patient-Centred Care',
                desc: 'Providing clear guidance, respectful reception, and supportive communication.',
              },
              {
                icon: Building2,
                title: 'Structured Excellence',
                desc: 'Organised diagnostic workflows designed to support clinicians and patients.',
              },
            ].map((val) => (
              <div key={val.title} className="rounded-2xl border border-[#E4EBEF] bg-[#F3F7F9]/50 p-6">
                <val.icon className="h-7 w-7 text-[#168C91]" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-bold text-[#123B56]">{val.title}</h3>
                <p className="mt-2 text-sm text-[#708090]">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach, Facilities & Management Placeholder */}
      <section className="border-t border-[#E4EBEF] bg-[#F3F7F9] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#E4EBEF] bg-white p-8">
              <h2 className="font-heading text-2xl font-bold text-[#123B56]">Our Approach</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#708090]">
                We aim to make diagnostic enquiries straightforward—helping patients understand test
                preparations, request convenient appointment slots, and receive timely confirmation
                from authorised laboratory staff before visiting.
              </p>
              <h3 className="mt-6 font-heading text-lg font-bold text-[#123B56]">Our Facilities</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#708090]">
                [CONFIRMED FACILITY OVERVIEW — Placeholder for verified descriptions of sample
                collection rooms, laboratory sections, and ultrasound scan suites.]
              </p>
            </div>

            <div className="rounded-2xl border border-[#E4EBEF] bg-white p-8">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-[#168C91]" aria-hidden="true" />
                <h2 className="font-heading text-2xl font-bold text-[#123B56]">
                  Management &amp; Governance
                </h2>
              </div>
              <p className="mt-4 rounded-xl border border-dashed border-[#168C91]/40 bg-[#F3F7F9] p-4 text-sm leading-relaxed text-[#263746]">
                <strong>[CONFIRMED MANAGEMENT INFORMATION]:</strong> Replace this section with
                confirmed leadership details, clinical governance structure, and verified
                regulatory registrations once approved by Omega Medical Laboratory.
              </p>
              <div className="mt-6">
                <Link
                  to="/our-team"
                  className="inline-flex items-center rounded-xl bg-[#123B56] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#168C91] transition-colors"
                >
                  View Team Profile Placeholders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
