export interface Founder {
  monogram: 'AD' | 'KR' | 'AK';
  name: string;
  roles: string[];
  quote: string;
  bio: string;
  photo?: string;
  linkedin?: string;
  email?: string;
  metrics?: { label: string; value: string }[];
  gradient: string;
}

// NOTE: Bios, metrics and links are placeholders — user has authorized shipping with
// currently-available details and will provide fuller data later.
export const founders: Founder[] = [
  {
    monogram: 'AD',
    name: 'Adarsh P Pradeep',
    roles: ['CEO', 'CTO'],
    quote:
      "Great software should feel invisible — it does its job, then gets out of the way. Every feature we ship gets measured by that one bar.",
    bio: 'Engineer and founder. Leads product architecture, engineering, and the technology roadmap at Adkrak.',
    photo: '/founder-adarsh.jpg',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    monogram: 'KR',
    name: 'Jayakrishna Jayan',
    roles: ['CEO', 'CFO'],
    quote:
      "Every rupee our customers spend with us should return ten-fold in time saved and productivity gained. That's the deal — and we hold ourselves to it.",
    bio: 'Finance and operations. Runs the numbers, the runway, and the promises we make to our customers.',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    monogram: 'AK',
    name: 'Akash Harikumar',
    roles: ['CEO', 'CMO'],
    quote:
      "We're building for the everyday industries — the restaurants, schools and roads that make real life happen. They deserve tools as good as their work.",
    bio: 'Brand, marketing and customer growth. Owns how the world hears about Adkrak.',
    gradient: 'from-orange-400 to-red-500',
  },
];
