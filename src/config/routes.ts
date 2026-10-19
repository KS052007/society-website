export type RouteId = 'home' | 'events' | 'resources' | 'articles' | 'dashboard';
export type RouteStatus = 'live' | 'hidden';

export interface RouteConfig {
  path: string;
  id: RouteId;
  label: string;
  status: RouteStatus;
  inNav: boolean;
}

// Compute live status based on compile-time flags or runtime override
const isArticlesActive: boolean = typeof __LAUNCH_ARTICLES__ !== 'undefined' ? __LAUNCH_ARTICLES__ : false;
const isResourcesActive: boolean = typeof __LAUNCH_RESOURCES__ !== 'undefined' ? __LAUNCH_RESOURCES__ : false;
const isDashboardActive: boolean = typeof __LAUNCH_DASHBOARD__ !== 'undefined' ? __LAUNCH_DASHBOARD__ : false;

export const routes: readonly RouteConfig[] = [
  {
    path: '/',
    id: 'home',
    label: 'Home',
    status: 'live',
    inNav: true,
  },
  {
    path: '/events',
    id: 'events',
    label: 'Events',
    status: 'live',
    inNav: true,
  },
  {
    path: '/articles',
    id: 'articles',
    label: 'Articles',
    status: isArticlesActive ? 'live' : 'hidden',
    inNav: isArticlesActive,
  },
  {
    path: '/resources',
    id: 'resources',
    label: 'Resources',
    status: isResourcesActive ? 'live' : 'hidden',
    inNav: isResourcesActive,
  },
  {
    path: '/dashboard',
    id: 'dashboard',
    label: 'Dashboard',
    status: isDashboardActive ? 'live' : 'hidden',
    inNav: false, // Dashboard is team-only and not in primary public nav
  },
] as const;

export function isRouteLive(id: RouteId): boolean {
  const route = routes.find((r) => r.id === id);
  return route ? route.status === 'live' : false;
}

export function getLiveRoutes(): RouteConfig[] {
  return routes.filter((r) => r.status === 'live');
}

export function getNavRoutes(): RouteConfig[] {
  return routes.filter((r) => r.status === 'live' && r.inNav);
}
