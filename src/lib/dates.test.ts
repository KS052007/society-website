import { describe, it, expect } from 'vitest';
import { getEventStatus, formatDateRange } from './dates';
import type { AmartyaEvent } from '@/content/events';

describe('dates utility', () => {
  const sampleEvent: AmartyaEvent = {
    slug: 'winter-finance-bootcamp-2026',
    title: 'Winter Finance Bootcamp',
    kind: 'bootcamp',
    summary: 'A comprehensive introduction to finance for IITM BS students.',
    startDate: '2026-01-02',
    endDate: '2026-02-05',
    mode: 'online',
    links: [],
  };

  it('computes status as past for dates prior to current date', () => {
    // Current date is 2026-10-16
    const now = new Date(2026, 9, 16);
    expect(getEventStatus(sampleEvent, now)).toBe('past');
  });

  it('computes status as live when current date is within range', () => {
    const now = new Date(2026, 0, 15);
    expect(getEventStatus(sampleEvent, now)).toBe('live');
  });

  it('computes status as upcoming when current date is before start', () => {
    const now = new Date(2025, 11, 20);
    expect(getEventStatus(sampleEvent, now)).toBe('upcoming');
  });

  it('formats multi-month date ranges cleanly', () => {
    expect(formatDateRange('2026-01-02', '2026-02-05')).toBe('2 Jan – 5 Feb 2026');
  });

  it('formats single day events cleanly', () => {
    expect(formatDateRange('2026-03-15')).toBe('15 Mar 2026');
  });
});
