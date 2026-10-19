import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router';
import { RootLayout } from '@/components/layout/RootLayout';
import { PageSkeleton } from '@/components/ui/PageSkeleton';

// Lazy-loaded pages for code-splitting
const HomePage = lazy(() => import('@/pages/Home'));
const EventsPage = lazy(() => import('@/pages/Events'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

// Conditional imports for hidden pages to ensure dead-code elimination in production bundle
const ArticlesPage = __LAUNCH_ARTICLES__
  ? lazy(() => import('@/pages/Articles'))
  : null;

const ResourcesPage = __LAUNCH_RESOURCES__
  ? lazy(() => import('@/pages/Resources'))
  : null;

const DashboardPage = __LAUNCH_DASHBOARD__
  ? lazy(() => import('@/pages/Dashboard'))
  : null;

function ContactRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/#contact', { replace: true });
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navigate]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            {/* Live routes */}
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />

            {/* Legacy redirect for contact */}
            <Route path="contact" element={<ContactRedirect />} />

            {/* Launch-gated routes (render 404 if hidden) */}
            {ArticlesPage ? (
              <Route path="articles" element={<ArticlesPage />} />
            ) : (
              <Route path="articles" element={<NotFoundPage />} />
            )}

            {ResourcesPage ? (
              <Route path="resources" element={<ResourcesPage />} />
            ) : (
              <Route path="resources" element={<NotFoundPage />} />
            )}

            {DashboardPage ? (
              <Route path="dashboard/*" element={<DashboardPage />} />
            ) : (
              <Route path="dashboard/*" element={<NotFoundPage />} />
            )}

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
