export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export type ServiceCategory =
  | 'Laboratory Investigations'
  | 'Specialised Investigations'
  | 'Diagnostic Imaging';

export type AvailabilityStatus = 'Proposed — To Be Confirmed' | 'Available on Enquiry' | 'Temporarily Unavailable';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'staff' | 'viewer';
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  short_description: string;
  description: string;
  preparation_instructions: string;
  availability_status: AvailabilityStatus;
  indicative_price?: string;
  image_url?: string;
  icon_name: string;
  featured_on_home: boolean;
  is_active: boolean;
  created_at: string;
}

export interface TestCatalogueItem {
  id: string;
  name: string;
  code: string;
  category: ServiceCategory;
  description: string;
  preparation_instructions: string;
  availability_status: AvailabilityStatus;
  turnaround_time?: string;
  turnaround_approved: boolean;
  indicative_price?: string;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  reference_number: string;
  patient_name: string;
  phone: string;
  email: string;
  service_id: string;
  service_name: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: AppointmentStatus;
  is_demo_record: boolean;
  created_at: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  slug: string;
  audience: string;
  short_description: string;
  included_tests: string[];
  price_display: string;
  is_price_approved: boolean;
  featured_on_home: boolean;
  is_active: boolean;
  created_at: string;
}

export interface TeamMember {
  id: string;
  full_name: string;
  job_title: string;
  biography: string;
  verified_qualifications: string;
  professional_registration: string;
  registration_approved: boolean;
  photo_url?: string;
  is_placeholder: boolean;
  is_active: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  read_time: string;
  status: 'Published' | 'Draft' | 'Pending Review';
  published_at: string;
  created_at: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'Reviewed' | 'Archived';
  created_at: string;
}

export interface WebsiteSettings {
  id: string;
  brand_name: string;
  extended_name: string;
  tagline: string;
  hero_headline: string;
  logo_url?: string;
  provisional_address: string;
  address_verified: boolean;
  provisional_phone: string;
  phone_verified: boolean;
  official_email: string;
  whatsapp_number: string;
  working_hours: string;
  map_directions_url: string;
  map_embed_note: string;
  developer_credit: string;
  show_developer_credit: boolean;
  demo_notice_text: string;
  updated_at: string;
}
