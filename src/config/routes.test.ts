import { describe, it, expect } from 'vitest';
import { routes, isRouteLive, getLiveRoutes, getNavRoutes } from './routes';

describe('routes configuration', () => {
  it('has Home and Events as live by default', () => {
    expect(isRouteLive('home')).toBe(true);
    expect(isRouteLive('events')).toBe(true);
  });

  it('hides unlaunched routes from the public navigation', () => {
    const nav = getNavRoutes();
    const navIds = nav.map((r) => r.id);
    expect(navIds).toContain('home');
    expect(navIds).toContain('events');
    expect(navIds).not.toContain('dashboard');
  });

  it('returns all live routes in getLiveRoutes', () => {
    const live = getLiveRoutes();
    expect(live.length).toBeGreaterThanOrEqual(2);
    for (const r of live) {
      expect(r.status).toBe('live');
    }
  });

  it('contains expected route definitions', () => {
    expect(routes.find((r) => r.id === 'home')?.path).toBe('/');
    expect(routes.find((r) => r.id === 'events')?.path).toBe('/events');
    expect(routes.find((r) => r.id === 'articles')?.path).toBe('/articles');
    expect(routes.find((r) => r.id === 'resources')?.path).toBe('/resources');
    expect(routes.find((r) => r.id === 'dashboard')?.path).toBe('/dashboard');
  });
});
