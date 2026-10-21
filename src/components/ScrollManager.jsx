import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsap.js';
import { getLenis } from '../hooks/useSmoothScroll.js';

/** Resets scroll position on navigation and keeps ScrollTrigger measurements fresh. */
export default function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 160);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }, []);

  return null;
}
