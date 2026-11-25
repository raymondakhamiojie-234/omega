import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_WEBSITE_SETTINGS,
  INITIAL_APPOINTMENTS,
  INITIAL_BLOG_POSTS,
  INITIAL_CONTACT_ENQUIRIES,
  INITIAL_PACKAGES,
  INITIAL_SERVICES,
  INITIAL_TEAM,
  INITIAL_TESTS,
} from '../data/mockData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type {
  Appointment,
  AppointmentStatus,
  BlogPost,
  ContactEnquiry,
  HealthPackage,
  Service,
  TeamMember,
  TestCatalogueItem,
  WebsiteSettings,
} from '../types/database';

const STORAGE_KEY = 'omega_demo_state_v1';

interface DemoState {
  services: Service[];
  tests: TestCatalogueItem[];
  packages: HealthPackage[];
  team: TeamMember[];
  blogPosts: BlogPost[];
  appointments: Appointment[];
  contactEnquiries: ContactEnquiry[];
  settings: WebsiteSettings;
}

interface AdminSession {
  authenticated: boolean;
  email: string;
  role: 'admin' | 'staff';
  mode: 'demo' | 'supabase';
}

interface DemoDataContextValue extends DemoState {
  adminSession: AdminSession | null;
  loginAdmin: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  addAppointment: (
    data: Omit<Appointment, 'id' | 'reference_number' | 'status' | 'is_demo_record' | 'created_at'>
  ) => { ok: boolean; appointment?: Appointment; error?: string };
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addContactEnquiry: (
    data: Omit<ContactEnquiry, 'id' | 'status' | 'created_at'>
  ) => { ok: boolean; error?: string };
  updateContactEnquiryStatus: (id: string, status: ContactEnquiry['status']) => void;
  toggleServiceActive: (id: string) => void;
  upsertService: (service: Service) => void;
  toggleTestActive: (id: string) => void;
  upsertTest: (test: TestCatalogueItem) => void;
  upsertPackage: (pkg: HealthPackage) => void;
  upsertTeamMember: (member: TeamMember) => void;
  upsertBlogPost: (post: BlogPost) => void;
  updateSettings: (settings: Partial<WebsiteSettings>) => void;
  resetDemoData: () => void;
}

const defaultState: DemoState = {
  services: INITIAL_SERVICES,
  tests: INITIAL_TESTS,
  packages: INITIAL_PACKAGES,
  team: INITIAL_TEAM,
  blogPosts: INITIAL_BLOG_POSTS,
  appointments: INITIAL_APPOINTMENTS,
  contactEnquiries: INITIAL_CONTACT_ENQUIRIES,
  settings: DEFAULT_WEBSITE_SETTINGS,
};

const DemoDataContext = createContext<DemoDataContextValue | undefined>(undefined);

function loadInitialState(): DemoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    return {
      services: parsed.services ?? INITIAL_SERVICES,
      tests: parsed.tests ?? INITIAL_TESTS,
      packages: parsed.packages ?? INITIAL_PACKAGES,
      team: parsed.team ?? INITIAL_TEAM,
      blogPosts: parsed.blogPosts ?? INITIAL_BLOG_POSTS,
      appointments: parsed.appointments ?? INITIAL_APPOINTMENTS,
      contactEnquiries: parsed.contactEnquiries ?? INITIAL_CONTACT_ENQUIRIES,
      settings: { ...DEFAULT_WEBSITE_SETTINGS, ...(parsed.settings ?? {}) },
    };
  } catch {
    return defaultState;
  }
}

export const DemoDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DemoState>(loadInitialState);
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => {
    try {
      const saved = sessionStorage.getItem('omega_admin_session');
      return saved ? (JSON.parse(saved) as AdminSession) : null;
    } catch {
      return null;
    }
  });
  const [lastSubmitAt, setLastSubmitAt] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in restricted browsers
    }
  }, [state]);

  const loginAdmin = async (
    email: string,
    password: string
  ): Promise<{ ok: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        return { ok: false, error: error?.message ?? 'Invalid credentials.' };
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
      if (!profile || (profile.role !== 'admin' && profile.role !== 'staff')) {
        await supabase.auth.signOut();
        return { ok: false, error: 'Account lacks authorised admin or staff role.' };
      }
      const session: AdminSession = {
        authenticated: true,
        email: data.user.email ?? email,
        role: profile.role,
        mode: 'supabase',
      };
      setAdminSession(session);
      sessionStorage.setItem('omega_admin_session', JSON.stringify(session));
      return { ok: true };
    }

    // Demonstration mode authentication (not for production use without Supabase backend)
    if (email.trim().toLowerCase() === 'admin@omega-demo.local' && password === 'OmegaDemo2026!') {
      const session: AdminSession = {
        authenticated: true,
        email: email.trim(),
        role: 'admin',
        mode: 'demo',
      };
      setAdminSession(session);
      sessionStorage.setItem('omega_admin_session', JSON.stringify(session));
      return { ok: true };
    }

    return {
      ok: false,
      error: 'Invalid demo credentials. Use the demonstration credentials shown below.',
    };
  };

  const logoutAdmin = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setAdminSession(null);
    sessionStorage.removeItem('omega_admin_session');
  };

  const addAppointment: DemoDataContextValue['addAppointment'] = (data) => {
    const now = Date.now();
    if (now - lastSubmitAt < 5000) {
      return { ok: false, error: 'Please wait a few seconds before submitting another request.' };
    }

    const duplicate = state.appointments.some(
      (a) =>
        a.email.toLowerCase() === data.email.toLowerCase() &&
        a.service_name === data.service_name &&
        a.preferred_date === data.preferred_date &&
        a.preferred_time === data.preferred_time &&
        a.status === 'Pending'
    );
    if (duplicate) {
      return {
        ok: false,
        error: 'A pending appointment enquiry with these exact details has already been submitted.',
      };
    }

    const refNum = `OMG-DEMO-${Math.floor(1050 + Math.random() * 8900)}`;
    const newApt: Appointment = {
      ...data,
      id: `apt-${now}`,
      reference_number: refNum,
      status: 'Pending',
      is_demo_record: true,
      created_at: new Date().toISOString(),
    };

    setLastSubmitAt(now);
    setState((prev) => ({
      ...prev,
      appointments: [newApt, ...prev.appointments],
    }));

    return { ok: true, appointment: newApt };
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setState((prev) => ({
      ...prev,
      appointments: prev.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
    }));
  };

  const addContactEnquiry: DemoDataContextValue['addContactEnquiry'] = (data) => {
    const now = Date.now();
    if (now - lastSubmitAt < 5000) {
      return { ok: false, error: 'Please wait a few seconds before sending another message.' };
    }
    const newEnquiry: ContactEnquiry = {
      ...data,
      id: `enq-${now}`,
      status: 'New',
      created_at: new Date().toISOString(),
    };
    setLastSubmitAt(now);
    setState((prev) => ({
      ...prev,
      contactEnquiries: [newEnquiry, ...prev.contactEnquiries],
    }));
    return { ok: true };
  };

  const updateContactEnquiryStatus = (id: string, status: ContactEnquiry['status']) => {
    setState((prev) => ({
      ...prev,
      contactEnquiries: prev.contactEnquiries.map((e) => (e.id === id ? { ...e, status } : e)),
    }));
  };

  const toggleServiceActive = (id: string) => {
    setState((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s)),
    }));
  };

  const upsertService = (service: Service) => {
    setState((prev) => {
      const exists = prev.services.some((s) => s.id === service.id);
      return {
        ...prev,
        services: exists
          ? prev.services.map((s) => (s.id === service.id ? service : s))
          : [service, ...prev.services],
      };
    });
  };

  const toggleTestActive = (id: string) => {
    setState((prev) => ({
      ...prev,
      tests: prev.tests.map((t) => (t.id === id ? { ...t, is_active: !t.is_active } : t)),
    }));
  };

  const upsertTest = (test: TestCatalogueItem) => {
    setState((prev) => {
      const exists = prev.tests.some((t) => t.id === test.id);
      return {
        ...prev,
        tests: exists ? prev.tests.map((t) => (t.id === test.id ? test : t)) : [test, ...prev.tests],
      };
    });
  };

  const upsertPackage = (pkg: HealthPackage) => {
    setState((prev) => {
      const exists = prev.packages.some((p) => p.id === pkg.id);
      return {
        ...prev,
        packages: exists
          ? prev.packages.map((p) => (p.id === pkg.id ? pkg : p))
          : [pkg, ...prev.packages],
      };
    });
  };

  const upsertTeamMember = (member: TeamMember) => {
    setState((prev) => {
      const exists = prev.team.some((m) => m.id === member.id);
      return {
        ...prev,
        team: exists
          ? prev.team.map((m) => (m.id === member.id ? member : m))
          : [member, ...prev.team],
      };
    });
  };

  const upsertBlogPost = (post: BlogPost) => {
    setState((prev) => {
      const exists = prev.blogPosts.some((p) => p.id === post.id);
      return {
        ...prev,
        blogPosts: exists
          ? prev.blogPosts.map((p) => (p.id === post.id ? post : p))
          : [post, ...prev.blogPosts],
      };
    });
  };

  const updateSettings = (partial: Partial<WebsiteSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...partial,
        updated_at: new Date().toISOString(),
      },
    }));
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  };

  return (
    <DemoDataContext.Provider
      value={{
        ...state,
        adminSession,
        loginAdmin,
        logoutAdmin,
        addAppointment,
        updateAppointmentStatus,
        addContactEnquiry,
        updateContactEnquiryStatus,
        toggleServiceActive,
        upsertService,
        toggleTestActive,
        upsertTest,
        upsertPackage,
        upsertTeamMember,
        upsertBlogPost,
        updateSettings,
        resetDemoData,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
};

export function useDemoData() {
  const ctx = useContext(DemoDataContext);
  if (!ctx) throw new Error('useDemoData must be used within DemoDataProvider');
  return ctx;
}
