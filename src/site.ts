// Single source for facts that appear in more than one place (meta tags,
// JSON-LD, llms.txt, footer, contact). Change them here, not in components.
export const SITE = {
  name: 'Joshua Anton Magbanua',
  shortName: 'Joshua Magbanua',
  role: 'Full Stack Developer',
  title: 'Joshua Anton Magbanua, Full Stack Developer & CFO at NightPatch Dev',
  // Leads with both forms of the name people search for. Kept under 160
  // characters so search results show it in full.
  description:
    'Joshua Anton Magbanua (Joshua Magbanua) is a Full Stack Developer and CFO of NightPatch Dev in the Philippines, building business systems and fast websites.',
  // Every way the name is written, for structured data.
  alternateNames: ['Joshua Magbanua', 'Joshua A. Magbanua', 'JA Magbanua'],
  pitch:
    'I build billing and operations software for local businesses, plus landing pages that load fast.',
  email: 'jshant.magbanua@gmail.com',
  location: 'Kabankalan City, Philippines',
  timeZone: 'Asia/Manila',
  availability: 'Open to remote roles and freelance',
  resume: '/resume.pdf',
  socials: [
    { label: 'LinkedIn', handle: '/in/joshantonmagbanua', href: 'https://www.linkedin.com/in/joshantonmagbanua/' },
    { label: 'GitHub', handle: '@a1ear', href: 'https://github.com/a1ear' },
  ],
  org: {
    name: 'NightPatch Dev',
    url: 'https://www.nightpatchdev.online',
    description:
      'A software development agency building custom enterprise systems: inventory, CRM, HR and payroll, and business automation.',
  },
} as const;

export const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
] as const;
