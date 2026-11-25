import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Placeholder privacy policy for Omega Medical Laboratory & Scan Center website demonstration, requiring legal and management review."
      />
      <section className="bg-[#123B56] py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Legal &amp; Compliance Placeholder
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Privacy Policy</h1>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl space-y-6 px-4 text-sm leading-relaxed text-[#263746] sm:px-6 lg:px-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <strong>Review &amp; Approval Required:</strong> This Privacy Policy is a structured
            placeholder prepared for the Omega Medical Laboratory &amp; Scan Center website
            demonstration. It must be reviewed and approved by Omega&apos;s management and legal
            advisors before live deployment.
          </div>

          <h2 className="font-heading text-xl font-bold text-[#123B56]">
            1. Demonstration Scope &amp; Non-Clinical Data
          </h2>
          <p className="text-[#708090]">
            This website demonstration is designed solely to showcase diagnostic service
            information and appointment enquiry workflows. It is not a certified medical records
            system and does not store laboratory test results, diagnoses, or sensitive clinical
            records.
          </p>

          <h2 className="font-heading text-xl font-bold text-[#123B56]">
            2. Information Collected in Enquiry Forms
          </h2>
          <p className="text-[#708090]">
            When deployed in production, appointment and contact forms collect basic contact details
            (name, phone number, email address, preferred date/time, and non-clinical enquiry notes)
            strictly to respond to patient enquiries and coordinate appointments.
          </p>

          <h2 className="font-heading text-xl font-bold text-[#123B56]">
            3. Data Protection &amp; Access Controls
          </h2>
          <p className="text-[#708090]">
            In production, enquiry records are protected using server-side authentication,
            role-based access control, and database Row Level Security (RLS) so that only
            authorised Omega staff can review submitted enquiries.
          </p>

          <h2 className="font-heading text-xl font-bold text-[#123B56]">
            4. Contact for Privacy Enquiries
          </h2>
          <p className="text-[#708090]">
            [OFFICIAL DATA PROTECTION / PRIVACY CONTACT EMAIL — To be inserted upon approval].
          </p>
        </div>
      </section>
    </>
  );
};
