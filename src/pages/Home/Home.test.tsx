import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import HomePage from './index';

describe('HomePage', () => {
  it('renders H1 and supporting description', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Amartya Finance Society');

    expect(
      screen.getByText(/A student community exploring markets, research, and real-world ideas/i)
    ).toBeInTheDocument();
  });



  it('renders What we do 4 pillars', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText('Research & Analysis')).toBeInTheDocument();
    expect(screen.getByText('Learning & Skill Building')).toBeInTheDocument();
    expect(screen.getByText('Events & Competitions')).toBeInTheDocument();
    expect(screen.getByText('Community & Collaboration')).toBeInTheDocument();
  });
});
