import type { AmartyaEvent, EventStatus } from '@/content/events';

const TIMEZONE = 'Asia/Kolkata';

export function parseDate(isoDateStr: string): Date {
  const [year, month, day] = isoDateStr.split('-').map(Number);
  // Construct date in local/IST representation without UTC shift issues
  return new Date(year, (month || 1) - 1, day || 1);
}

export function getEventStatus(
  event: AmartyaEvent,
  now: Date = new Date()
): EventStatus {
  const start = parseDate(event.startDate);
  start.setHours(0, 0, 0, 0);

  const end = event.endDate ? parseDate(event.endDate) : new Date(start);
  end.setHours(23, 59, 59, 999);

  const current = new Date(now);

  if (current > end) {
    return 'past';
  }
  if (current >= start && current <= end) {
    return 'live';
  }
  return 'upcoming';
}

const monthFormatter = new Intl.DateTimeFormat('en-IN', {
  month: 'short',
  timeZone: TIMEZONE,
});

const dayFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  timeZone: TIMEZONE,
});

const yearFormatter = new Intl.DateTimeFormat('en-IN', {
  year: 'numeric',
  timeZone: TIMEZONE,
});

export function formatDate(isoDateStr: string): string {
  const date = parseDate(isoDateStr);
  const day = dayFormatter.format(date);
  const month = monthFormatter.format(date);
  const year = yearFormatter.format(date);
  return `${day} ${month} ${year}`;
}

export function formatDateRange(startDateStr: string, endDateStr?: string): string {
  if (!endDateStr || startDateStr === endDateStr) {
    return formatDate(startDateStr);
  }

  const start = parseDate(startDateStr);
  const end = parseDate(endDateStr);

  const startDay = dayFormatter.format(start);
  const startMonth = monthFormatter.format(start);
  const startYear = yearFormatter.format(start);

  const endDay = dayFormatter.format(end);
  const endMonth = monthFormatter.format(end);
  const endYear = yearFormatter.format(end);

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startDay} – ${endDay} ${startMonth} ${startYear}`;
    }
    return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
  }

  return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
}
