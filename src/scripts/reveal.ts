import { reducedMotion } from './motion';

// Fallback for browsers without scroll-driven animations (CSS handles the
// rest). Content is only hidden once this script is running, so a visitor
// without JavaScript never sees an empty section.
export function initReveal(signal: AbortSignal) {
  if (CSS.supports('animation-timeline: view()') || reducedMotion()) return;

  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-reveal');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  els.forEach((el) => io.observe(el));
  signal.addEventListener('abort', () => io.disconnect());
}
