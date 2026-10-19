export type EventKind =
  | 'bootcamp'
  | 'workshop'
  | 'competition'
  | 'speaker-session'
  | 'case-study';

export type EventStatus = 'upcoming' | 'live' | 'past';

export interface EventLink {
  label: string;
  url: string;
}

export interface EventBanner {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface AmartyaEvent {
  slug: string;
  title: string;
  kind: EventKind;
  summary: string;
  startDate: string; // ISO 'YYYY-MM-DD'
  endDate?: string; // defaults to startDate
  mode: 'online' | 'offline' | 'hybrid';
  banner?: EventBanner;
  links: EventLink[];
  registrationUrl?: string;
  featured?: boolean;
}

export const eventsData: AmartyaEvent[] = [
  {
    slug: 'winter-finance-bootcamp-2026',
    title: 'Winter Finance Bootcamp',
    kind: 'bootcamp',
    summary: 'A comprehensive introduction to finance for IITM BS students.',
    startDate: '2026-01-02',
    endDate: '2026-02-05',
    mode: 'online',
    banner: {
      src: '/assets/images/wfb_hero-section.png',
      alt: 'Winter Finance Bootcamp banner',
      width: 1200,
      height: 675,
    },
    links: [
      {
        label: 'View schedule',
        url: 'https://amartya-iitmbs.github.io/introductory-bootcamp/index.html',
      },
    ],
    featured: true,
  },
];
