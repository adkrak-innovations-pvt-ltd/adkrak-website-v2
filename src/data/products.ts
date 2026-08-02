export type ProductStatus = 'demo' | 'ready' | 'wip' | 'service';

export interface Product {
  code: string;
  name: string;
  tagline: string;
  status: ProductStatus;
  bullets: string[];
  href?: string;
  accent: string;
}

export const products: Product[] = [
  {
    code: 'EN',
    name: 'EduNova',
    tagline: 'Complete school & college management.',
    status: 'demo',
    bullets: [
      'Attendance, timetable, exams, auto report cards',
      'Fee collection with WhatsApp & email receipts',
      'Parent portal — real-time attendance, fees, marks',
      'Library, transport, staff & announcements',
    ],
    href: 'https://edunova-3pi.pages.dev',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    code: 'RP',
    name: 'RestoPOS',
    tagline: 'Restaurant management from KOT to bill.',
    status: 'demo',
    bullets: [
      'Multi-customer table billing with GST invoices',
      'Live Kitchen Display System with station routing',
      'Customer QR self-ordering (no app install)',
      'UPI, cash, card + role-based access',
    ],
    accent: 'from-orange-400 to-red-500',
  },
  {
    code: 'EP',
    name: 'Exam Portal',
    tagline: 'Secure online examination platform.',
    status: 'ready',
    bullets: [
      'MCQ, subjective & code question banks',
      'Timed tests with auto-submit and pause/resume',
      'AI-based proctoring — flags anomalies live',
      'Auto-grading + instant result publication',
    ],
    accent: 'from-violet-400 to-indigo-500',
  },
  {
    code: 'RG',
    name: 'Report Generation',
    tagline: 'Automated report engine for busy teams.',
    status: 'ready',
    bullets: [
      'Pull from spreadsheets, databases, APIs',
      'Design once with reusable templates + branding',
      'Scheduled auto-generation, daily/weekly/monthly',
      'Branded PDF & Excel output, emailed on schedule',
    ],
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    code: 'RD',
    name: 'Roadgenie',
    tagline: 'All-in-one travel & roadside assistance.',
    status: 'wip',
    bullets: [
      'Bus package comparison across operators',
      'Real-time GPS tracking shared with family',
      '24×7 roadside help — tow, fuel, mechanic',
      'One-tap SOS with nearest-help routing',
    ],
    accent: 'from-pink-400 to-fuchsia-500',
  },
  {
    code: 'CW',
    name: 'Custom Web Dev',
    tagline: 'Bespoke web apps for businesses that need one.',
    status: 'service',
    bullets: [
      'Marketing sites, dashboards, portals, e-commerce',
      'Modern stack — Next.js, React, Supabase, Cloudflare',
      'Payment, WhatsApp, SMS, Google & UPI integrations',
      'Fixed price, fixed timeline, code you own',
    ],
    accent: 'from-slate-400 to-slate-600',
  },
];

export const statusLabel: Record<ProductStatus, string> = {
  demo: 'Demo Ready',
  ready: 'Product Ready',
  wip: 'In Progress',
  service: 'Service',
};

export const statusColor: Record<ProductStatus, string> = {
  demo: 'text-[#00f2fe]',
  ready: 'text-[#7dd3fc]',
  wip: 'text-[#fbbf24]',
  service: 'text-[#c084fc]',
};
