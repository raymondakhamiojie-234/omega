import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Droplets,
  FileSearch,
  FlaskConical,
  HeartPulse,
  Lock,
  Microscope,
  ScanLine,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useDemoData } from '../context/DemoDataContext';
import { SEO } from '../components/SEO';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  Droplets,
  ScanLine,
  Microscope,
  HeartPulse,
  Activity,
};

export const HomePage: React.FC = () => {
  const { services, packages, settings } = useDemoData();

  const homeServices = services.filter((s) => s.is_active && s.featured_on_home).slice(0, 6);
  const homePackages = packages.filter((p) => p.is_active && p.featured_on_home).slice(0, 3);

  return (
    <>
      <SEO
        title="Home"
        description="Omega Medical Laboratory & Scan Center – Proposed website demonstration for laboratory testing, blood investigations, ultrasound scanning, and health screening in Abuja, Nigeria."
      />

      {/* SECTION B: HERO */}
      <section className="relative overflow-hidden bg-[#123B56]">
        <div className="absolute inset-0">
          <img
            src="/images/hero-lab.jpg"
            alt="Medical laboratory scientist working with modern diagnostic equipment"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#123B56]/95 via-[#123B56]/80 to-[#123B56]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-[#168C91]/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-teal-200">
              {settings.tagline}
            </span>

            <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.12]">
              {settings.hero_headline}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Discover professional laboratory testing and diagnostic services designed around your
              health and wellbeing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 rounded-xl bg-[#168C91] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#168C91]/25 transition-all hover:bg-[#117175] sm:text-base"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Book an Appointment
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:text-base"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION C: INTRODUCTION */}
      <section className="border-b border-[#E4EBEF] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168C91]">
            Patient-Centred Diagnostics
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[#123B56] sm:text-4xl">
            Committed to Better Diagnostic Experiences.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#708090] sm:text-lg">
            At Omega Medical Laboratory, we believe that dependable diagnostic services play an
            important role in informed healthcare decisions. Our proposed digital experience brings
            information about laboratory investigations and diagnostic services closer to patients.
          </p>
        </div>
      </section>

      {/* SECTION D: SERVICES */}
      <section className="bg-[#F3F7F9] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168C91]">
                Diagnostic Capabilities
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#123B56] sm:text-4xl">
                Our Proposed Services
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#123B56] hover:text-[#168C91] transition-colors"
            >
              View Full Services Directory
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((service, idx) => {
              const IconComp = ICON_MAP[service.icon_name] ?? FlaskConical;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E4EBEF] bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F7F9] text-[#168C91] transition-colors group-hover:bg-[#123B56] group-hover:text-white">
                      <IconComp className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold text-[#123B56]">
                      {service.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#708090]">
                      {service.short_description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E4EBEF] flex items-center justify-between">
                    <span className="text-xs font-medium text-[#708090]">{service.category}</span>
                    <Link
                      to={`/services?category=${encodeURIComponent(service.category)}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#168C91] hover:text-[#123B56]"
                    >
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION E: WHY CHOOSE OMEGA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168C91]">
              Designed Around Care
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#123B56] sm:text-4xl">
              Why Choose Omega
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: UserCheck,
                title: 'Patient-focused service',
                desc: 'Clear communication, respectful reception, and structured guidance from enquiry to sample collection.',
              },
              {
                icon: CalendarCheck,
                title: 'Convenient appointment enquiries',
                desc: 'Request preferred dates and times online so our team can coordinate your visit efficiently.',
              },
              {
                icon: Lock,
                title: 'Confidentiality and privacy',
                desc: 'Patient enquiries and personal contact details are handled with strict confidentiality standards.',
              },
              {
                icon: FileSearch,
                title: 'Diagnostic service information',
                desc: 'Accessible test descriptions and preparation guidance to help patients prepare properly.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E4EBEF] bg-[#F3F7F9]/60 p-6 transition-colors hover:bg-[#F3F7F9]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123B56] text-white">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-[#123B56]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#708090]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F: HOW IT WORKS */}
      <section className="bg-[#123B56] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
              Simple Patient Journey
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Explore Services',
                desc: 'Browse our proposed laboratory investigations, imaging services, and screening options.',
              },
              {
                step: '02',
                title: 'Select Your Required Test',
                desc: 'Review test descriptions and preparation instructions in our searchable catalogue.',
              },
              {
                step: '03',
                title: 'Request an Appointment',
                desc: 'Submit your preferred date, time, and contact details through our enquiry form.',
              },
              {
                step: '04',
                title: 'Receive Confirmation from the Laboratory',
                desc: 'Our staff will reach out to confirm service availability and preparation details.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <span className="font-heading text-3xl font-extrabold text-[#168C91]">
                  {item.step}
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G: HEALTH PACKAGES */}
      <section className="bg-[#F3F7F9] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168C91]">
                Preventative Screening
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#123B56] sm:text-4xl">
                Health Packages
              </h2>
            </div>
            <Link
              to="/health-packages"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#123B56] hover:text-[#168C91]"
            >
              View All Screening Packages
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {homePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E4EBEF] bg-white p-7 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#F3F7F9] px-3 py-1 text-xs font-semibold text-[#168C91]">
                      {pkg.audience}
                    </span>
                    <ClipboardList className="h-5 w-5 text-[#123B56]/60" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-[#123B56]">{pkg.name}</h3>
                  <p className="mt-2 text-sm text-[#708090]">{pkg.short_description}</p>

                  <ul className="mt-5 space-y-2 border-t border-[#E4EBEF] pt-5">
                    {pkg.included_tests.slice(0, 4).map((test) => (
                      <li key={test} className="flex items-start gap-2 text-sm text-[#263746]">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]"
                          aria-hidden="true"
                        />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-4 border-t border-[#E4EBEF]">
                  <p className="mb-3 text-xs font-medium text-[#708090]">
                    {pkg.is_price_approved ? pkg.price_display : 'Pricing & test list subject to confirmation'}
                  </p>
                  <Link
                    to={`/book-appointment?service=${encodeURIComponent(pkg.name)}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B56] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#168C91]"
                  >
                    {pkg.is_price_approved ? 'Enquire About Package' : 'Request Package Information'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION H: CALL TO ACTION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#123B56] to-[#0D2B40] px-6 py-14 text-center text-white shadow-xl sm:px-12">
            <ShieldCheck className="mx-auto h-10 w-10 text-[#168C91]" aria-hidden="true" />
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Take the Next Step Towards Understanding Your Health.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
              Contact our team to enquire about available diagnostic services and appointments.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 rounded-xl bg-[#168C91] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#117175] sm:text-base"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Book an Appointment
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 sm:text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
