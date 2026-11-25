import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { useDemoData } from '../context/DemoDataContext';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{8,20}$/, 'Please enter a valid phone number.'),
  subject: z.string().trim().min(3, 'Please enter a subject.'),
  message: z.string().trim().min(10, 'Please enter a message (at least 10 characters).'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const { settings, addContactEnquiry } = useDemoData();
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (values: ContactFormValues) => {
    setErrorMsg(null);
    const res = addContactEnquiry(values);
    if (!res.ok) {
      setErrorMsg(res.error ?? 'Unable to send enquiry.');
      return;
    }
    setSent(true);
    reset();
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact Omega Medical Laboratory & Scan Center in Abuja, Nigeria. Provisional contact details and online enquiry form."
      />

      <section className="bg-[#123B56] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Get in Touch
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Reach out for general enquiries, service availability questions, or corporate
            screening information.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F7F9] py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Contact Details Column */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-[#123B56]">
                Official Contact Details (Provisional)
              </h2>
              <p className="mt-1 text-xs text-amber-700">
                Marked items are provisional and require Omega management verification before
                publication.
              </p>

              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#168C91]" aria-hidden="true" />
                  <div>
                    <strong className="block text-[#123B56]">
                      Address {!settings.address_verified && '(Unverified Provisional)'}
                    </strong>
                    <span className="text-[#708090]">{settings.provisional_address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#168C91]" aria-hidden="true" />
                  <div>
                    <strong className="block text-[#123B56]">
                      Phone {!settings.phone_verified && '(For Verification)'}
                    </strong>
                    <span className="text-[#708090]">{settings.provisional_phone}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#168C91]" aria-hidden="true" />
                  <div>
                    <strong className="block text-[#123B56]">Official Email</strong>
                    <span className="text-[#708090]">{settings.official_email}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#168C91]" aria-hidden="true" />
                  <div>
                    <strong className="block text-[#123B56]">Working Hours</strong>
                    <span className="text-[#708090]">{settings.working_hours}</span>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-[#E4EBEF]">
                <a
                  href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#168C91] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#117175]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Enquiry (Provisional)
                </a>
              </div>
            </div>

            {/* Editable Map Configuration Card */}
            <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-[#123B56]">
                Location &amp; Directions (Configurable)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#708090]">
                {settings.map_embed_note}
              </p>
              {settings.map_directions_url && (
                <a
                  href={settings.map_directions_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#123B56] hover:text-[#168C91]"
                >
                  Open Provisional Directions Link
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-heading text-xl font-bold text-[#123B56]">Send an Enquiry</h2>
              <p className="mt-1 text-xs text-[#708090]">
                Non-clinical enquiries only. Submitted enquiries appear in the Demo Admin
                Dashboard.
              </p>

              {sent ? (
                <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50/70 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-[#168C91]" aria-hidden="true" />
                  <h3 className="mt-3 font-heading text-lg font-bold text-[#123B56]">
                    Enquiry Received (Demo)
                  </h3>
                  <p className="mt-2 text-sm text-[#263746]">
                    Thank you for your message. Our team will review and respond once confirmed.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-4 rounded-xl bg-[#123B56] px-5 py-2 text-xs font-semibold text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-5">
                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c_name" className="block text-sm font-semibold text-[#123B56]">
                        Full Name *
                      </label>
                      <input
                        id="c_name"
                        type="text"
                        {...register('name')}
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm focus:border-[#168C91] focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="c_phone"
                        className="block text-sm font-semibold text-[#123B56]"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="c_phone"
                        type="tel"
                        {...register('phone')}
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm focus:border-[#168C91] focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="c_email"
                        className="block text-sm font-semibold text-[#123B56]"
                      >
                        Email Address *
                      </label>
                      <input
                        id="c_email"
                        type="email"
                        {...register('email')}
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm focus:border-[#168C91] focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="c_subject"
                        className="block text-sm font-semibold text-[#123B56]"
                      >
                        Subject *
                      </label>
                      <input
                        id="c_subject"
                        type="text"
                        {...register('subject')}
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm focus:border-[#168C91] focus:outline-none"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="c_message"
                      className="block text-sm font-semibold text-[#123B56]"
                    >
                      Message *
                    </label>
                    <textarea
                      id="c_message"
                      rows={4}
                      {...register('message')}
                      className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm focus:border-[#168C91] focus:outline-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#123B56] px-6 py-3 text-sm font-semibold text-white hover:bg-[#168C91] disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
