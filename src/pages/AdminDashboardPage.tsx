import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  CalendarCheck,
  FileText,
  FlaskConical,
  HeartPulse,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  Package,
  Plus,
  RotateCcw,
  Settings,
  TestTube2,
  Users,
  X,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { BrandLogo } from '../components/BrandLogo';
import { useDemoData } from '../context/DemoDataContext';
import { isSupabaseConfigured } from '../lib/supabase';
import type { AppointmentStatus, BlogPost, ServiceCategory } from '../types/database';

type AdminTab =
  | 'overview'
  | 'appointments'
  | 'services'
  | 'tests'
  | 'packages'
  | 'team'
  | 'blog'
  | 'settings'
  | 'enquiries';

const SIDEBAR_ITEMS: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: CalendarCheck },
  { id: 'services', label: 'Services', icon: FlaskConical },
  { id: 'tests', label: 'Test Catalogue', icon: TestTube2 },
  { id: 'packages', label: 'Health Packages', icon: Package },
  { id: 'team', label: 'Team Members', icon: Users },
  { id: 'blog', label: 'Blog Management', icon: FileText },
  { id: 'settings', label: 'Website Settings', icon: Settings },
  { id: 'enquiries', label: 'Contact Enquiries', icon: Mail },
];

export const AdminDashboardPage: React.FC = () => {
  const {
    adminSession,
    loginAdmin,
    logoutAdmin,
    appointments,
    updateAppointmentStatus,
    services,
    toggleServiceActive,
    upsertService,
    tests,
    toggleTestActive,
    upsertTest,
    packages,
    upsertPackage,
    team,
    upsertTeamMember,
    blogPosts,
    upsertBlogPost,
    contactEnquiries,
    updateContactEnquiryStatus,
    settings,
    updateSettings,
    resetDemoData,
  } = useDemoData();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login form state
  const [email, setEmail] = useState('admin@omega-demo.local');
  const [password, setPassword] = useState('OmegaDemo2026!');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Quick-add / edit states
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCat, setNewServiceCat] = useState<ServiceCategory>('Laboratory Investigations');
  const [newTestName, setNewTestName] = useState('');
  const [newTestCat, setNewTestCat] = useState<ServiceCategory>('Laboratory Investigations');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Laboratory Education');
  const [newPostExcerpt, setNewPostExcerpt] = useState('');

  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === 'Pending').length;
    const confirmed = appointments.filter((a) => a.status === 'Confirmed').length;
    const cancelled = appointments.filter((a) => a.status === 'Cancelled').length;
    const completed = appointments.filter((a) => a.status === 'Completed').length;
    return { total, pending, confirmed, cancelled, completed, enquiries: contactEnquiries.length };
  }, [appointments, contactEnquiries]);

  const chartData = useMemo(
    () => [
      { name: 'Pending', count: stats.pending },
      { name: 'Confirmed', count: stats.confirmed },
      { name: 'Completed', count: stats.completed },
      { name: 'Cancelled', count: stats.cancelled },
    ],
    [stats]
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoggingIn(true);
    const res = await loginAdmin(email, password);
    setLoggingIn(false);
    if (!res.ok) setAuthError(res.error ?? 'Authentication failed.');
  };

  if (!adminSession?.authenticated) {
    return (
      <>
        <SEO title="Admin Login" description="Protected Admin Portal for Omega Medical Laboratory." />
        <div className="flex min-h-screen items-center justify-center bg-[#F3F7F9] px-4 py-12">
          <div className="w-full max-w-md rounded-2xl border border-[#E4EBEF] bg-white p-8 shadow-sm">
            <div className="flex justify-center">
              <BrandLogo variant="dark" />
            </div>

            <div className="mt-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#123B56]/10 text-[#123B56]">
                <Lock className="h-6 w-6" aria-hidden="true" />
              </div>
              <h1 className="mt-4 font-heading text-2xl font-bold text-[#123B56]">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-xs text-[#708090]">
                {isSupabaseConfigured
                  ? 'Sign in with your authorised Supabase staff account.'
                  : 'Demonstration Mode — Protected by simulated session + Supabase RLS architecture.'}
              </p>
            </div>

            {!isSupabaseConfigured && (
              <div className="mt-5 rounded-xl border border-[#E4EBEF] bg-[#F3F7F9] p-3.5 text-xs text-[#263746]">
                <strong className="block text-[#123B56]">Demo Credentials:</strong>
                <span className="mt-1 block font-mono">Email: admin@omega-demo.local</span>
                <span className="block font-mono">Pass: OmegaDemo2026!</span>
              </div>
            )}

            {authError && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800"
              >
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-5 space-y-4">
              <div>
                <label htmlFor="admin-email" className="block text-xs font-semibold text-[#123B56]">
                  Email Address
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E4EBEF] px-3.5 py-2.5 text-sm focus:border-[#168C91] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="admin-pass" className="block text-xs font-semibold text-[#123B56]">
                  Password
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E4EBEF] px-3.5 py-2.5 text-sm focus:border-[#168C91] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full rounded-xl bg-[#123B56] py-3 text-sm font-semibold text-white hover:bg-[#168C91] disabled:opacity-60"
              >
                {loggingIn ? 'Signing in...' : 'Sign In to Dashboard'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-xs font-semibold text-[#168C91] hover:text-[#123B56]">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Admin Dashboard" />
      <div className="flex min-h-screen bg-[#F3F7F9] text-[#263746]">
        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#123B56] text-white transition-transform lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
            <BrandLogo variant="light" compact />
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1 text-white/70 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5" aria-label="Admin Sidebar">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#168C91] text-white'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4 space-y-2">
            <Link
              to="/"
              className="flex w-full items-center justify-center rounded-xl border border-white/15 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
            >
              View Public Site
            </Link>
            <button
              type="button"
              onClick={logoutAdmin}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-xs font-semibold text-white hover:bg-red-500/80"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col min-w-0">
          <header className="flex h-20 items-center justify-between border-b border-[#E4EBEF] bg-white px-4 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-[#E4EBEF] p-2 text-[#123B56] lg:hidden"
                aria-label="Open admin menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-heading text-lg font-bold text-[#123B56] sm:text-xl">
                  {SIDEBAR_ITEMS.find((i) => i.id === activeTab)?.label}
                </h1>
                <p className="text-xs text-[#708090]">
                  Demonstration Data Only • Role: {adminSession.role.toUpperCase()}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E4EBEF] px-3 py-2 text-xs font-semibold text-[#123B56] hover:bg-[#F3F7F9]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset Demo Data
            </button>
          </header>

          <main className="flex-1 p-4 sm:p-8">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    { label: 'Total Enquiries (Demo)', value: stats.total },
                    { label: 'Pending Enquiries', value: stats.pending },
                    { label: 'Confirmed Appointments', value: stats.confirmed },
                    { label: 'Cancelled Appointments', value: stats.cancelled },
                    { label: 'Contact Enquiries', value: stats.enquiries },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-2xl border border-[#E4EBEF] bg-white p-5 shadow-xs"
                    >
                      <p className="text-xs font-medium text-[#708090]">{card.label}</p>
                      <p className="mt-2 font-heading text-3xl font-extrabold text-[#123B56]">
                        {card.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 shadow-xs lg:col-span-5">
                    <h2 className="font-heading text-base font-bold text-[#123B56]">
                      Appointment Status Breakdown (Demo)
                    </h2>
                    <div className="mt-4 h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E4EBEF" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#168C91" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 shadow-xs lg:col-span-7 overflow-x-auto">
                    <h2 className="font-heading text-base font-bold text-[#123B56]">
                      Recent Appointment Enquiries (Mock Data)
                    </h2>
                    <table className="mt-4 w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#E4EBEF] text-xs text-[#708090]">
                          <th className="pb-3 font-semibold">Ref #</th>
                          <th className="pb-3 font-semibold">Patient (Demo)</th>
                          <th className="pb-3 font-semibold">Service</th>
                          <th className="pb-3 font-semibold">Date</th>
                          <th className="pb-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4EBEF]">
                        {appointments.slice(0, 6).map((apt) => (
                          <tr key={apt.id}>
                            <td className="py-3 font-mono text-xs text-[#123B56]">
                              {apt.reference_number}
                            </td>
                            <td className="py-3 font-medium">{apt.patient_name}</td>
                            <td className="py-3 text-[#708090]">{apt.service_name}</td>
                            <td className="py-3 text-[#708090]">{apt.preferred_date}</td>
                            <td className="py-3">
                              <select
                                value={apt.status}
                                onChange={(e) =>
                                  updateAppointmentStatus(
                                    apt.id,
                                    e.target.value as AppointmentStatus
                                  )
                                }
                                aria-label={`Status for ${apt.reference_number}`}
                                className="rounded-lg border border-[#E4EBEF] bg-[#F3F7F9] px-2 py-1 text-xs font-semibold text-[#123B56]"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 shadow-xs overflow-x-auto">
                <h2 className="font-heading text-lg font-bold text-[#123B56]">
                  All Appointment Enquiries (Demonstration Records)
                </h2>
                <table className="mt-5 w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E4EBEF] text-xs text-[#708090]">
                      <th className="pb-3 pr-4 font-semibold">Reference</th>
                      <th className="pb-3 pr-4 font-semibold">Patient Name</th>
                      <th className="pb-3 pr-4 font-semibold">Contact</th>
                      <th className="pb-3 pr-4 font-semibold">Service Requested</th>
                      <th className="pb-3 pr-4 font-semibold">Preferred Date/Time</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4EBEF]">
                    {appointments.map((apt) => (
                      <tr key={apt.id}>
                        <td className="py-3.5 pr-4 font-mono text-xs">{apt.reference_number}</td>
                        <td className="py-3.5 pr-4 font-semibold text-[#123B56]">{apt.patient_name}</td>
                        <td className="py-3.5 pr-4 text-xs text-[#708090]">
                          <div>{apt.phone}</div>
                          <div>{apt.email}</div>
                        </td>
                        <td className="py-3.5 pr-4">{apt.service_name}</td>
                        <td className="py-3.5 pr-4 text-xs text-[#708090] whitespace-nowrap">
                          {apt.preferred_date} • {apt.preferred_time}
                        </td>
                        <td className="py-3.5">
                          <select
                            value={apt.status}
                            onChange={(e) =>
                              updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)
                            }
                            aria-label={`Change status for ${apt.reference_number}`}
                            className="rounded-lg border border-[#E4EBEF] bg-[#F3F7F9] px-2.5 py-1.5 text-xs font-semibold text-[#123B56]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6">
                  <h2 className="font-heading text-base font-bold text-[#123B56]">
                    Add Proposed Service
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <input
                      type="text"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      placeholder="Service name..."
                      className="flex-1 min-w-[200px] rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    />
                    <select
                      value={newServiceCat}
                      onChange={(e) => setNewServiceCat(e.target.value as ServiceCategory)}
                      className="rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    >
                      <option value="Laboratory Investigations">Laboratory Investigations</option>
                      <option value="Specialised Investigations">Specialised Investigations</option>
                      <option value="Diagnostic Imaging">Diagnostic Imaging</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newServiceName.trim()) return;
                        upsertService({
                          id: `srv-${Date.now()}`,
                          name: newServiceName.trim(),
                          slug: newServiceName.trim().toLowerCase().replace(/\s+/g, '-'),
                          category: newServiceCat,
                          short_description: 'Proposed diagnostic service (editable).',
                          description: 'Proposed service added via Admin Dashboard.',
                          preparation_instructions: 'To be confirmed upon enquiry.',
                          availability_status: 'Proposed — To Be Confirmed',
                          icon_name: 'FlaskConical',
                          featured_on_home: false,
                          is_active: true,
                          created_at: new Date().toISOString(),
                        });
                        setNewServiceName('');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#123B56] px-4 py-2 text-sm font-semibold text-white hover:bg-[#168C91]"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      Add Service
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="flex items-center justify-between rounded-2xl border border-[#E4EBEF] bg-white p-5"
                    >
                      <div>
                        <span className="text-xs font-semibold text-[#168C91]">{srv.category}</span>
                        <h3 className="font-heading text-base font-bold text-[#123B56]">
                          {srv.name}
                        </h3>
                        <p className="text-xs text-[#708090]">{srv.availability_status}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleServiceActive(srv.id)}
                        className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold ${
                          srv.is_active
                            ? 'bg-teal-50 text-[#168C91] border border-teal-200'
                            : 'bg-slate-100 text-[#708090]'
                        }`}
                      >
                        {srv.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TEST CATALOGUE TAB */}
            {activeTab === 'tests' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6">
                  <h2 className="font-heading text-base font-bold text-[#123B56]">
                    Add Sample Test Entry
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <input
                      type="text"
                      value={newTestName}
                      onChange={(e) => setNewTestName(e.target.value)}
                      placeholder="Test name..."
                      className="flex-1 min-w-[200px] rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    />
                    <select
                      value={newTestCat}
                      onChange={(e) => setNewTestCat(e.target.value as ServiceCategory)}
                      className="rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    >
                      <option value="Laboratory Investigations">Laboratory Investigations</option>
                      <option value="Specialised Investigations">Specialised Investigations</option>
                      <option value="Diagnostic Imaging">Diagnostic Imaging</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newTestName.trim()) return;
                        upsertTest({
                          id: `tst-${Date.now()}`,
                          name: newTestName.trim(),
                          code: `DEMO-${Math.floor(100 + Math.random() * 899)}`,
                          category: newTestCat,
                          description: 'Demonstration test entry added via Admin Dashboard.',
                          preparation_instructions: 'To be confirmed upon enquiry.',
                          availability_status: 'Proposed — To Be Confirmed',
                          turnaround_approved: false,
                          is_active: true,
                          created_at: new Date().toISOString(),
                        });
                        setNewTestName('');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#123B56] px-4 py-2 text-sm font-semibold text-white hover:bg-[#168C91]"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      Add Test
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#E4EBEF] text-xs text-[#708090]">
                        <th className="pb-3 font-semibold">Code</th>
                        <th className="pb-3 font-semibold">Test Name</th>
                        <th className="pb-3 font-semibold">Category</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4EBEF]">
                      {tests.map((tst) => (
                        <tr key={tst.id}>
                          <td className="py-3 font-mono text-xs">{tst.code}</td>
                          <td className="py-3 font-semibold text-[#123B56]">{tst.name}</td>
                          <td className="py-3 text-xs text-[#708090]">{tst.category}</td>
                          <td className="py-3">
                            <button
                              type="button"
                              onClick={() => toggleTestActive(tst.id)}
                              className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                                tst.is_active
                                  ? 'bg-teal-50 text-[#168C91]'
                                  : 'bg-slate-100 text-[#708090]'
                              }`}
                            >
                              {tst.is_active ? 'Active' : 'Hidden'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* HEALTH PACKAGES TAB */}
            {activeTab === 'packages' && (
              <div className="grid gap-6 md:grid-cols-2">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="rounded-2xl border border-[#E4EBEF] bg-white p-6 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-bold text-[#123B56]">{pkg.name}</h3>
                      <HeartPulse className="h-5 w-5 text-[#168C91]" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-[#708090]">{pkg.short_description}</p>
                    <div>
                      <label className="block text-xs font-semibold text-[#123B56]">
                        Price Display Field
                      </label>
                      <input
                        type="text"
                        value={pkg.price_display}
                        onChange={(e) =>
                          upsertPackage({ ...pkg, price_display: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-[#E4EBEF] px-3 py-2 text-sm"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-xs text-[#263746]">
                      <input
                        type="checkbox"
                        checked={pkg.is_price_approved}
                        onChange={(e) =>
                          upsertPackage({ ...pkg, is_price_approved: e.target.checked })
                        }
                      />
                      Mark pricing as approved by Omega management
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* TEAM MEMBERS TAB */}
            {activeTab === 'team' && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-2xl border border-[#E4EBEF] bg-white p-6 space-y-3"
                  >
                    <label className="block text-xs font-semibold text-[#123B56]">Full Name</label>
                    <input
                      type="text"
                      value={member.full_name}
                      onChange={(e) =>
                        upsertTeamMember({ ...member, full_name: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#E4EBEF] px-3 py-2 text-sm"
                    />
                    <label className="block text-xs font-semibold text-[#123B56]">Job Title</label>
                    <input
                      type="text"
                      value={member.job_title}
                      onChange={(e) =>
                        upsertTeamMember({ ...member, job_title: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#E4EBEF] px-3 py-2 text-sm"
                    />
                    <label className="block text-xs font-semibold text-[#123B56]">
                      Verified Qualifications
                    </label>
                    <input
                      type="text"
                      value={member.verified_qualifications}
                      onChange={(e) =>
                        upsertTeamMember({
                          ...member,
                          verified_qualifications: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-[#E4EBEF] px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* BLOG MANAGEMENT TAB */}
            {activeTab === 'blog' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-[#E4EBEF] bg-white p-6 space-y-3">
                  <h2 className="font-heading text-base font-bold text-[#123B56]">
                    Create Educational Article
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder="Article title..."
                      className="rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      placeholder="Category..."
                      className="rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    value={newPostExcerpt}
                    onChange={(e) => setNewPostExcerpt(e.target.value)}
                    placeholder="Short excerpt..."
                    className="w-full rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newPostTitle.trim()) return;
                      const post: BlogPost = {
                        id: `post-${Date.now()}`,
                        title: newPostTitle.trim(),
                        slug: newPostTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        category: newPostCategory || 'Health Education',
                        excerpt:
                          newPostExcerpt.trim() ||
                          'Educational health resource pending clinical review.',
                        content:
                          'Educational article content. Subject to clinical review prior to publication.',
                        featured_image: '/images/hero-lab.jpg',
                        author: 'Omega Editorial Team (Demo)',
                        read_time: '3 min read',
                        status: 'Published',
                        published_at: new Date().toISOString(),
                        created_at: new Date().toISOString(),
                      };
                      upsertBlogPost(post);
                      setNewPostTitle('');
                      setNewPostExcerpt('');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#123B56] px-4 py-2 text-sm font-semibold text-white hover:bg-[#168C91]"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Publish Article
                  </button>
                </div>

                <div className="space-y-3">
                  {blogPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E4EBEF] bg-white p-5"
                    >
                      <div>
                        <span className="text-xs font-semibold text-[#168C91]">
                          {post.category}
                        </span>
                        <h3 className="font-heading text-base font-bold text-[#123B56]">
                          {post.title}
                        </h3>
                      </div>
                      <select
                        value={post.status}
                        onChange={(e) =>
                          upsertBlogPost({
                            ...post,
                            status: e.target.value as BlogPost['status'],
                          })
                        }
                        className="rounded-xl border border-[#E4EBEF] px-3 py-1.5 text-xs font-semibold"
                      >
                        <option value="Published">Published</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WEBSITE SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="max-w-3xl rounded-2xl border border-[#E4EBEF] bg-white p-6 space-y-5">
                <h2 className="font-heading text-lg font-bold text-[#123B56]">
                  Website Branding &amp; Contact Settings
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#123B56]">Brand Name</label>
                    <input
                      type="text"
                      value={settings.brand_name}
                      onChange={(e) => updateSettings({ brand_name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#123B56]">Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => updateSettings({ tagline: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#123B56]">
                    Provisional Address
                  </label>
                  <input
                    type="text"
                    value={settings.provisional_address}
                    onChange={(e) => updateSettings({ provisional_address: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#123B56]">
                      Provisional Phone
                    </label>
                    <input
                      type="text"
                      value={settings.provisional_phone}
                      onChange={(e) => updateSettings({ provisional_phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#123B56]">
                      Official Email Placeholder
                    </label>
                    <input
                      type="text"
                      value={settings.official_email}
                      onChange={(e) => updateSettings({ official_email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#123B56]">
                    Developer Credit (Configurable)
                  </label>
                  <input
                    type="text"
                    value={settings.developer_credit}
                    onChange={(e) => updateSettings({ developer_credit: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E4EBEF] px-3.5 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {/* CONTACT ENQUIRIES TAB */}
            {activeTab === 'enquiries' && (
              <div className="space-y-4">
                {contactEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-[#E4EBEF] bg-white p-6"
                  >
                    <div className="max-w-2xl">
                      <span className="text-xs font-semibold text-[#168C91]">{enq.subject}</span>
                      <h3 className="mt-1 font-heading text-base font-bold text-[#123B56]">
                        {enq.name}
                      </h3>
                      <p className="text-xs text-[#708090]">
                        {enq.email} • {enq.phone}
                      </p>
                      <p className="mt-2 text-sm text-[#263746]">{enq.message}</p>
                    </div>
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        updateContactEnquiryStatus(
                          enq.id,
                          e.target.value as 'New' | 'Reviewed' | 'Archived'
                        )
                      }
                      className="rounded-xl border border-[#E4EBEF] px-3 py-1.5 text-xs font-semibold"
                    >
                      <option value="New">New</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};
