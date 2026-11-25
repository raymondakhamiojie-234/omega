import React from 'react';
import { SEO } from '../components/SEO';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms and Conditions"
        description="Placeholder terms and conditions for Omega Medical Laboratory & Scan Center website demonstration."
      />
      <section className="bg-[#123B56] py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Legal &amp; Compliance Placeholder
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
            Terms and Conditions
          </h1>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl space-y-6 px-4 text-sm leading-relaxed text-[#263746] sm:px-6 lg:px-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <strong>Review &amp; Approval Required:</strong> These Terms and Conditions are
            demonstration placeholders and require formal review and approval by Omega Medical
            Laboratory &amp; Scan Center prior to public launch.
          </div>

          <h2 className="font-heading text-xl font-bold text-[#123B56]">
            1. Informational Purpose Only
          </h2>
          <p className="text-[#708090]">
            Content on this website, including test descriptions, preparation instructions, and
            health education articles, is provided for general informational purposes only and does
            not constitute medical advice, diagnosis, or treatment.
          </p>

          <h2 className="font-heading text-xl font-bold text-[#123B56]">
            2. Appointment Requests
          </h2>
          <p className="text-[#708090]">
            Submitting an online appointment request does not guarantee or confirm an appointment
            slot. Bookings are confirmed only after authorised Omega staff contact you to verify
            availability.
          </p>

          <h2 className="font-heading text-xl font-bold text-[#123B56]">
            3. Service &amp; Pricing Confirmation
          </h2>
          <p className="text-[#708090]">
            All listed services, packages, turnaround times, and indicative prices in this
            demonstration are subject to confirmation by Omega Medical Laboratory &amp; Scan Center.
          </p>
        </div>
      </section>
    </>
  );
};
