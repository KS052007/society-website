export interface StatItem {
  id: string;
  value: string;
  numericValue: number;
  suffix?: string;
  label: string;
}

export interface StatsData {
  asOf: string;
  verified: boolean;
  items: StatItem[];
}

export const statsData: StatsData = {
  asOf: '2026-10-16',
  verified: false, // [TODO: owner to confirm stats before public launch]
  items: [
    {
      id: 'members',
      value: '260+',
      numericValue: 260,
      suffix: '+',
      label: 'Active members',
    },
    {
      id: 'cohorts',
      value: '12',
      numericValue: 12,
      label: 'Bootcamp cohorts',
    },
    {
      id: 'case-studies',
      value: '10+',
      numericValue: 10,
      suffix: '+',
      label: 'Case studies completed',
    },
    {
      id: 'projects',
      value: '85+',
      numericValue: 85,
      suffix: '+',
      label: 'Student projects',
    },
  ],
};
