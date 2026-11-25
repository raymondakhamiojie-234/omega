import React from 'react';
import { Award, BadgeCheck, Info, UserRound } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useDemoData } from '../context/DemoDataContext';

export const OurTeamPage: React.FC = () => {
  const { team } = useDemoData();
  const activeTeam = team.filter((m) => m.is_active);

  return (
    <>
      <SEO
        title="Our Team"
        description="Placeholder team profile structure for Omega Medical Laboratory & Scan Center, ready for confirmed staff biographies and verified qualifications."
      />

      <section className="bg-[#123B56] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Leadership &amp; Clinical Team
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">Our Team</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Professional profile cards prepared for Omega Medical Laboratory&apos;s confirmed staff
            members and leadership.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F7F9] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#E4EBEF] bg-white p-4 text-sm text-[#708090]">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#168C91]" aria-hidden="true" />
            <p>
              <strong>Staff Placeholders:</strong> All profiles below are editable placeholders. No
              fictional doctors, medical laboratory scientists, or unverified credentials are
              displayed. Staff details can be updated in the Admin Dashboard once approved.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activeTeam.map((member) => (
              <article
                key={member.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#E4EBEF] bg-white shadow-sm"
              >
                <div className="flex h-56 items-center justify-center bg-[#123B56]/5 border-b border-[#E4EBEF]">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.full_name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-[#708090]">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#123B56]/10 text-[#123B56]">
                        <UserRound className="h-10 w-10" aria-hidden="true" />
                      </div>
                      <span className="mt-2 text-xs font-medium">[APPROVED STAFF PHOTO]</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h2 className="font-heading text-lg font-bold text-[#123B56]">
                      {member.full_name}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-[#168C91]">{member.job_title}</p>
                    <p className="mt-4 text-sm leading-relaxed text-[#708090]">
                      {member.biography}
                    </p>
                  </div>

                  <div className="mt-6 space-y-2.5 border-t border-[#E4EBEF] pt-4 text-xs">
                    <div className="flex items-start gap-2 text-[#263746]">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]" aria-hidden="true" />
                      <span>{member.verified_qualifications}</span>
                    </div>
                    {member.registration_approved && (
                      <div className="flex items-start gap-2 text-[#263746]">
                        <BadgeCheck
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]"
                          aria-hidden="true"
                        />
                        <span>{member.professional_registration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
