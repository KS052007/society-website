import type { ReactNode } from 'react';
import type { EventStatus, EventKind } from '@/content/events';

export interface StatusBadgeProps {
  status: EventStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  let style = '';
  let label = '';

  switch (status) {
    case 'upcoming':
      style = 'bg-accent text-default';
      label = 'Upcoming';
      break;
    case 'live':
      style = 'bg-brand text-default font-semibold';
      label = 'Live now';
      break;
    case 'past':
      style = 'bg-section-alt text-muted';
      label = 'Past';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${style} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'live'
            ? 'bg-ink-900 animate-pulse'
            : status === 'upcoming'
            ? 'bg-ink-900'
            : 'bg-ink-600'
        }`}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

export interface KindBadgeProps {
  kind: EventKind | string;
  className?: string;
}

const kindLabels: Record<EventKind, string> = {
  bootcamp: 'Bootcamp',
  workshop: 'Workshop',
  competition: 'Competition',
  'speaker-session': 'Speaker Session',
  'case-study': 'Case Study',
};

export function KindBadge({ kind, className = '' }: KindBadgeProps) {
  const display = (kind in kindLabels ? kindLabels[kind as EventKind] : kind).toUpperCase();

  return (
    <span
      className={`inline-block border border-subtle bg-surface text-default text-[11px] font-semibold tracking-wider px-2 py-0.5 rounded ${className}`}
    >
      {display}
    </span>
  );
}

export interface GenericBadgeProps {
  children: ReactNode;
  variant?: 'subtle' | 'accent' | 'brand';
  className?: string;
}

export function Badge({
  children,
  variant = 'subtle',
  className = '',
}: GenericBadgeProps) {
  const variants = {
    subtle: 'bg-section-alt text-default border border-subtle',
    accent: 'bg-accent text-default',
    brand: 'bg-brand text-default font-medium',
  };

  return (
    <span
      className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
