import Lenis from 'lenis';
import gsap from 'gsap';
import 'lenis/dist/lenis.css';

let lenisInstance: Lenis | null = null;

/**
 * Initializes Lenis smooth scrolling with optimal inertia and momentum
 */
export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return () => {};

  if (lenisInstance) {
    lenisInstance.destroy();
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.05,
    touchMultiplier: 1.5,
  });

  let rafId: number;
  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    lenisInstance?.destroy();
    lenisInstance = null;
  };
}

/**
 * GSAP Scroll Reveal for appearing elements with smooth easing
 */
export function initScrollReveal(): () => void {
  if (typeof window === 'undefined') return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return () => {};
  }

  const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (revealElements.length === 0) return () => {};

  // Initialize invisible starting states with subtle y-translation
  revealElements.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 28 });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const delay = parseFloat(target.dataset.revealDelay || '0');

          gsap.to(target, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay,
            ease: 'power3.out',
            clearProps: 'transform',
          });

          observer.unobserve(target);
        }
      });
    },
    {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
}
