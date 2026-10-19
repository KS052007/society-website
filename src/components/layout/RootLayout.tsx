import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { RadialBackground } from '@/components/ui/RadialBackground';
import { initSmoothScroll, initScrollReveal } from '@/lib/animations';

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    const cleanupScroll = initSmoothScroll();
    return cleanupScroll;
  }, []);

  useEffect(() => {
    // Re-initialize scroll reveal on page navigation
    const cleanupReveal = initScrollReveal();
    return cleanupReveal;
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col text-default antialiased selection:bg-brand selection:text-on-brand overflow-x-hidden">
      <RadialBackground />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
