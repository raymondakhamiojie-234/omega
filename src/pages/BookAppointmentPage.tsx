import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, CalendarCheck, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useDemoData } from '../context/DemoDataContext';

const TIME_SLOTS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

function getTodayDateString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const appointmentSchema = z.object({
  patient_name: z.string().trim().min(2, 'Please enter your full name (at least 2 characters).'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{8,20}$/, 'Please enter a valid phone number (8–20 digits).'),
  email: z.string().trim().email('Please enter a valid email address.'),
  service_name: z.string().min(1, 'Please select a requested service or test.'),
  preferred_date: z
    .string()
    .min(1, 'Please select a preferred date.')
    .refine((val) => val >= getTodayDateString(), {
      message: 'Appointment date cannot be in the past.',
    }),
  preferred_time: z.string().min(1, 'Please select a preferred time.'),
  message: z.string().max(600, 'Enquiry note must be 600 characters or fewer.').optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export const BookAppointmentPage: React.FC = () => {
  const { services, tests, packages, addAppointment } = useDemoData();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') ?? '';

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const serviceOptions = useMemo(() => {
    const names = new Set<string>();
    services.filter((s) => s.is_active).forEach((s) => names.add(s.name));
    packages.filter((p) => p.is_active).forEach((p) => names.add(p.name));
    tests.filter((t) => t.is_active).forEach((t) => names.add(t.name));
    if (preselectedService) names.add(preselectedService);
    return Array.from(names);
  }, [services, packages, tests, preselectedService]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patient_name: '',
      phone: '',
      email: '',
      service_name: preselectedService || '',
      preferred_date: '',
      preferred_time: '',
      message: '',
    },
  });

  const onSubmit = (values: AppointmentFormValues) => {
    setSubmitError(null);
    const matchedService = services.find((s) => s.name === values.service_name);
    const result = addAppointment({
      patient_name: values.patient_name,
      phone: values.phone,
      email: values.email,
      service_id: matchedService?.id ?? 'custom-enquiry',
      service_name: values.service_name,
      preferred_date: values.preferred_date,
      preferred_time: values.preferred_time,
      message: values.message ?? '',
    });

    if (!result.ok) {
      setSubmitError(result.error ?? 'Unable to submit request.');
      return;
    }

    setSubmittedRef(result.appointment?.reference_number ?? 'OMG-DEMO');
    reset();
  };

  return (
    <>
      <SEO
        title="Book an Appointment"
        description="Submit a diagnostic appointment enquiry at Omega Medical Laboratory & Scan Center. Requests are subject to confirmation by authorised staff."
      />

      <section className="bg-[#123B56] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Appointment Request
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
            Book an Appointment
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Submit your preferred date, time, and diagnostic service enquiry. Our team will contact
            you to confirm availability.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F7F9] py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Form Column */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 shadow-sm sm:p-8">
              {submittedRef ? (
                <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#168C91]" aria-hidden="true" />
                  <h2 className="mt-4 font-heading text-2xl font-bold text-[#123B56]">
                    Appointment Request Received
                  </h2>
                  <p className="mt-3 text-base text-[#263746]">
                    Thank you. Your appointment request has been received. Our team will contact you
                    to confirm availability.
                  </p>
                  <p className="mt-4 inline-block rounded-lg bg-white px-4 py-2 font-mono text-sm font-semibold text-[#123B56] border border-[#E4EBEF]">
                    Demo Reference: {submittedRef}
                  </p>
                  <p className="mt-4 text-xs text-[#708090]">
                    Note: Submission in demonstration mode does not confirm a clinical appointment.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setSubmittedRef(null)}
                      className="rounded-xl bg-[#123B56] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#168C91]"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  <div className="border-b border-[#E4EBEF] pb-4">
                    <h2 className="font-heading text-xl font-bold text-[#123B56]">
                      Patient Enquiry Details
                    </h2>
                    <p className="mt-1 text-xs text-[#708090]">
                      Please do not enter sensitive clinical diagnoses or medical records in this
                      demonstration form.
                    </p>
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="patient_name"
                        className="block text-sm font-semibold text-[#123B56]"
                      >
                        Patient Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="patient_name"
                        type="text"
                        {...register('patient_name')}
                        placeholder="e.g. Amina Bello (Demo)"
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm text-[#263746] focus:border-[#168C91] focus:outline-none"
                      />
                      {errors.patient_name && (
                        <p className="mt-1 text-xs text-red-600">{errors.patient_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#123B56]">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="e.g. +234 800 000 0000"
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm text-[#263746] focus:border-[#168C91] focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#123B56]">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="you@example.com"
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm text-[#263746] focus:border-[#168C91] focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="service_name"
                        className="block text-sm font-semibold text-[#123B56]"
                      >
                        Requested Service <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="service_name"
                        {...register('service_name')}
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] bg-white px-4 py-2.5 text-sm text-[#263746] focus:border-[#168C91] focus:outline-none"
                      >
                        <option value="">Select a service or test...</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.service_name && (
                        <p className="mt-1 text-xs text-red-600">{errors.service_name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="preferred_date"
                        className="block text-sm font-semibold text-[#123B56]"
                      >
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="preferred_date"
                        type="date"
                        min={getTodayDateString()}
                        {...register('preferred_date')}
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm text-[#263746] focus:border-[#168C91] focus:outline-none"
                      />
                      {errors.preferred_date && (
                        <p className="mt-1 text-xs text-red-600">{errors.preferred_date.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="preferred_time"
                        className="block text-sm font-semibold text-[#123B56]"
                      >
                        Preferred Time <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="preferred_time"
                        {...register('preferred_time')}
                        className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] bg-white px-4 py-2.5 text-sm text-[#263746] focus:border-[#168C91] focus:outline-none"
                      >
                        <option value="">Select a preferred time...</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.preferred_time && (
                        <p className="mt-1 text-xs text-red-600">{errors.preferred_time.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#123B56]">
                      Additional Non-Clinical Enquiry (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register('message')}
                      placeholder="e.g. Questions about fasting preparation, corporate screening, or preferred callback time..."
                      className="mt-1.5 w-full rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm text-[#263746] focus:border-[#168C91] focus:outline-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B56] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#168C91] disabled:opacity-60 sm:w-auto"
                  >
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    Submit Appointment Request
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#123B56]">
                <ShieldAlert className="h-5 w-5 text-[#168C91]" aria-hidden="true" />
                <h3 className="font-heading text-lg font-bold">Important Notice</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[#708090]">
                <li>
                  • Submitting this form creates a <strong>demonstration enquiry</strong> in local
                  showcase storage.
                </li>
                <li>
                  • An appointment is <strong>not confirmed</strong> until authorised Omega staff
                  review and confirm availability.
                </li>
                <li>• Please do not submit real patient medical records or sensitive diagnoses.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};
