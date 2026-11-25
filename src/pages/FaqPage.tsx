import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';

const FAQS = [
  {
    q: 'Does submitting the online appointment form immediately confirm my booking?',
    a: 'No. Submitting the form sends an appointment enquiry. Authorised Omega Medical Laboratory staff will review your request and contact you to confirm service availability and your preferred time slot.',
  },
  {
    q: 'Are all tests and packages listed on this website currently confirmed?',
    a: 'This website is a demonstration showcase prepared for Omega Medical Laboratory & Scan Center. Specific test availability, turnaround times, and pricing are subject to official confirmation by management.',
  },
  {
    q: 'How do I know if I need to fast before my laboratory test?',
    a: 'Each entry in our Test Catalogue includes general preparation guidance. For example, Fasting Blood Glucose and Lipid Profile typically require 8–12 hours of fasting. Our team will confirm exact instructions when your enquiry is scheduled.',
  },
  {
    q: 'What should I bring when coming for a diagnostic scan or blood test?',
    a: 'If your investigation was requested by a physician, please bring your referral note or request form along with a valid form of identification.',
  },
  {
    q: 'Are my personal details and test results stored on this demonstration website?',
    a: 'No. This demonstration does not store clinical test results, diagnoses, or sensitive medical records. Enquiries submitted in demonstration mode are for showcase purposes only.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about appointment requests, test preparation, and diagnostic enquiries at Omega Medical Laboratory & Scan Center."
      />

      <section className="bg-[#123B56] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Patient Guidance
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Helpful information on requesting appointments, preparing for laboratory investigations,
            and using this demonstration platform.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F7F9] py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {FAQS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-2xl border border-[#E4EBEF] bg-white shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-heading text-base font-bold text-[#123B56] sm:text-lg">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#168C91] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#E4EBEF] px-6 py-4 text-sm leading-relaxed text-[#708090]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-[#E4EBEF] bg-white p-7 text-center">
            <h2 className="font-heading text-xl font-bold text-[#123B56]">
              Still have a question?
            </h2>
            <p className="mt-2 text-sm text-[#708090]">
              Reach out to our team for non-clinical enquiries or appointment assistance.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-xl bg-[#123B56] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#168C91]"
              >
                Contact Us
              </Link>
              <Link
                to="/book-appointment"
                className="rounded-xl border border-[#E4EBEF] px-5 py-2.5 text-sm font-semibold text-[#123B56] hover:bg-[#F3F7F9]"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
