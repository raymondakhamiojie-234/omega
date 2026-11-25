import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Clock, FileText, Info, Search } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useDemoData } from '../context/DemoDataContext';
import type { AvailabilityStatus, ServiceCategory, TestCatalogueItem } from '../types/database';

export const TestCataloguePage: React.FC = () => {
  const { tests } = useDemoData();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | ServiceCategory>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | AvailabilityStatus>('All');
  const [selectedTest, setSelectedTest] = useState<TestCatalogueItem | null>(null);

  const filteredTests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tests.filter((t) => {
      if (!t.is_active) return false;
      if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
      if (availabilityFilter !== 'All' && t.availability_status !== availabilityFilter) return false;
      if (
        q &&
        !t.name.toLowerCase().includes(q) &&
        !t.code.toLowerCase().includes(q) &&
        !t.description.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [tests, searchQuery, categoryFilter, availabilityFilter]);

  return (
    <>
      <SEO
        title="Test Catalogue"
        description="Searchable demonstration test catalogue for Omega Medical Laboratory & Scan Center. Filter by category, availability, and view preparation instructions."
      />

      <section className="bg-[#123B56] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Demonstration Test Directory
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
            Test Catalogue
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Search sample laboratory investigations and diagnostic scans, review preparation
            guidance, and submit a test enquiry.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F7F9] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Demo Notice */}
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#E4EBEF] bg-white p-4 text-xs text-[#708090] sm:text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]" aria-hidden="true" />
            <p>
              <strong>Demonstration Data:</strong> Entries below are sample catalogue listings.
              Availability, indicative pricing, and turnaround times are displayed only when
              confirmed by Omega Medical Laboratory.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="grid gap-4 rounded-2xl border border-[#E4EBEF] bg-white p-5 shadow-sm md:grid-cols-12">
            <div className="relative md:col-span-5">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#708090]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by test name or demo code..."
                aria-label="Search by test name"
                className="w-full rounded-xl border border-[#E4EBEF] bg-[#F3F7F9]/50 py-2.5 pl-10 pr-4 text-sm text-[#263746] placeholder:text-[#708090] focus:border-[#168C91] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as 'All' | ServiceCategory)}
                aria-label="Filter by category"
                className="w-full rounded-xl border border-[#E4EBEF] bg-[#F3F7F9]/50 px-3.5 py-2.5 text-sm text-[#263746] focus:border-[#168C91] focus:bg-white focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Laboratory Investigations">Laboratory Investigations</option>
                <option value="Specialised Investigations">Specialised Investigations</option>
                <option value="Diagnostic Imaging">Diagnostic Imaging</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={availabilityFilter}
                onChange={(e) =>
                  setAvailabilityFilter(e.target.value as 'All' | AvailabilityStatus)
                }
                aria-label="Filter by availability"
                className="w-full rounded-xl border border-[#E4EBEF] bg-[#F3F7F9]/50 px-3.5 py-2.5 text-sm text-[#263746] focus:border-[#168C91] focus:bg-white focus:outline-none"
              >
                <option value="All">All Availability</option>
                <option value="Proposed — To Be Confirmed">Proposed — To Be Confirmed</option>
                <option value="Available on Enquiry">Available on Enquiry</option>
                <option value="Temporarily Unavailable">Temporarily Unavailable</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="mt-6 text-sm text-[#708090]">
            Showing <strong className="text-[#123B56]">{filteredTests.length}</strong> sample
            entries
          </p>

          {/* Cards Grid */}
          {filteredTests.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-[#E4EBEF] bg-white p-12 text-center">
              <p className="font-heading text-lg font-bold text-[#123B56]">
                No matching tests found
              </p>
              <p className="mt-2 text-sm text-[#708090]">
                Try clearing your search query or selecting a different category filter.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredTests.map((test) => (
                <article
                  key={test.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#E4EBEF] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-[#F3F7F9] px-2.5 py-1 font-mono text-xs font-semibold text-[#123B56]">
                        {test.code}
                      </span>
                      <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
                        {test.availability_status}
                      </span>
                    </div>

                    <h2 className="mt-4 font-heading text-lg font-bold text-[#123B56]">
                      {test.name}
                    </h2>
                    <p className="mt-1 text-xs font-semibold text-[#168C91]">{test.category}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#708090]">
                      {test.description}
                    </p>

                    <div className="mt-4 rounded-xl bg-[#F3F7F9] p-3 text-xs text-[#263746]">
                      <strong className="text-[#123B56]">Preparation: </strong>
                      <span className="text-[#708090]">{test.preparation_instructions}</span>
                    </div>

                    {test.turnaround_approved && test.turnaround_time && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-[#123B56]">
                        <Clock className="h-3.5 w-3.5 text-[#168C91]" aria-hidden="true" />
                        <span>Estimated Turnaround: {test.turnaround_time}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-[#E4EBEF] pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedTest(test)}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E4EBEF] px-3 py-2 text-xs font-semibold text-[#123B56] hover:bg-[#F3F7F9]"
                    >
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      Details
                    </button>
                    <Link
                      to={`/book-appointment?service=${encodeURIComponent(test.name)}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#123B56] px-3 py-2 text-xs font-semibold text-white hover:bg-[#168C91]"
                    >
                      <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      Request Enquiry
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Test Detail Modal */}
      {selectedTest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="test-modal-title"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-semibold text-[#168C91]">
                  {selectedTest.code} • {selectedTest.category}
                </span>
                <h2 id="test-modal-title" className="mt-1 font-heading text-2xl font-bold text-[#123B56]">
                  {selectedTest.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTest(null)}
                className="rounded-lg border border-[#E4EBEF] px-3 py-1 text-xs font-semibold text-[#708090] hover:bg-[#F3F7F9]"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm text-[#263746]">
              <div>
                <h3 className="font-semibold text-[#123B56]">Description</h3>
                <p className="mt-1 text-[#708090]">{selectedTest.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#123B56]">Preparation Instructions</h3>
                <p className="mt-1 text-[#708090]">{selectedTest.preparation_instructions}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-[#F3F7F9] p-4">
                <div>
                  <span className="block text-xs text-[#708090]">Availability</span>
                  <span className="font-semibold text-[#123B56]">
                    {selectedTest.availability_status}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[#708090]">Turnaround Time</span>
                  <span className="font-semibold text-[#123B56]">
                    {selectedTest.turnaround_approved && selectedTest.turnaround_time
                      ? selectedTest.turnaround_time
                      : 'To be confirmed upon approval'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedTest(null)}
                className="rounded-xl border border-[#E4EBEF] px-4 py-2.5 text-sm font-semibold text-[#263746]"
              >
                Close
              </button>
              <Link
                to={`/book-appointment?service=${encodeURIComponent(selectedTest.name)}`}
                className="rounded-xl bg-[#123B56] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#168C91]"
              >
                Request Test Enquiry
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
