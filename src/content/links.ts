export interface QuickLink {
  id: string;
  label: string;
  description: string;
  url: string;
  isExternal: boolean;
  isPending?: boolean;
}

export const quickLinks: QuickLink[] = [
  {
    id: 'email',
    label: 'Email us',
    description: 'Direct inquiries, collaborations, and partnerships',
    url: 'mailto:amartyafinance@study.iitm.ac.in',
    isExternal: false,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    description: 'Visual updates, event announcements, and society life',
    url: 'https://www.instagram.com/amartya_iitmbs',
    isExternal: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp community',
    description: 'Student discussions, study circles, and event alerts',
    url: 'https://chat.whatsapp.com/LFjEpYoRepQ5TZbIe8NVdj',
    isExternal: true,
  },
  {
    id: 'bootcamp-schedule',
    label: 'Bootcamp schedule',
    description: 'Curriculum, timeline, and session resources archive',
    url: 'https://amartya-iitmbs.github.io/introductory-bootcamp/index.html',
    isExternal: true,
  },
  {
    id: 'resources-repo',
    label: 'Resources repository',
    description: 'Curated financial notes, sheets, and modeling notebooks',
    url: '#',
    isExternal: true,
    isPending: true, // [TODO: GitHub repo URL — owner to provide]
  },
  {
    id: 'iitm-bs',
    label: 'IITM BS Degree',
    description: 'Official academic program portal and student services',
    url: '#',
    isExternal: true,
    isPending: true, // [TODO: official program URL — confirm]
  },
];
