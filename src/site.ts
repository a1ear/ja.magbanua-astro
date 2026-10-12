// Single source for facts that appear in more than one place (meta tags,
// JSON-LD, llms.txt, footer, contact). Change them here, not in components.
export const SITE = {
  name: 'Joshua Anton Magbanua',
  shortName: 'Joshua Magbanua',
  role: 'Full Stack Developer',
  title: 'Joshua Anton Magbanua, Full Stack Developer & CFO at NightPatch Dev',
  description:
    'Portfolio of Joshua Anton Magbanua, a Full Stack Developer and CFO & co-founder of NightPatch Dev, based in Kabankalan City, Philippines. Open to remote roles and freelance work.',
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
