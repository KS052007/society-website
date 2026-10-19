import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EventsPage from './index';

describe('EventsPage', () => {
  it('renders page heading and subtitle', () => {
    render(<EventsPage />);

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Events');
    expect(
      screen.getByText(/Workshops, bootcamps, competitions/i)
    ).toBeInTheDocument();
  });

  it('renders Upcoming empty state by default', () => {
    render(<EventsPage />);

    expect(screen.getByText('More events coming soon.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Join the community/i })).toBeInTheDocument();
  });

  it('displays Winter Finance Bootcamp when Past timeframe is selected from dropdown', () => {
    render(<EventsPage />);

    // Open dropdown
    const trigger = screen.getByRole('button', { name: /Show:/i });
    fireEvent.click(trigger);

    // Select Past option
    const pastOption = screen.getByRole('option', { name: /Past/i });
    fireEvent.click(pastOption);

    expect(screen.getByText('Winter Finance Bootcamp')).toBeInTheDocument();
    expect(screen.getByText(/A comprehensive introduction to finance for IITM BS students/i)).toBeInTheDocument();
    expect(screen.getByText('2 Jan – 5 Feb 2026')).toBeInTheDocument();
  });
});
