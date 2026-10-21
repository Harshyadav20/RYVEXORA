import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { prefersReducedMotion } from '../lib/utils.js';

let lenisInstance = null;

export const getLenis = () => lenisInstance;

export function stopScroll() {
  if (lenisInstance) lenisInstance.stop();
  document.documentElement.classList.add('scroll-locked');
}

export function startScroll() {
  if (lenisInstance) lenisInstance.start();
  document.documentElement.classList.remove('scroll-locked');
}

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      syncTouch: false,
    });

    lenisInstance = lenis;

    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
