// Hide the sticky header while scrolling down, bring it back on scroll up.
export function initHeader(signal: AbortSignal) {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  // Read lazily: touching scrollY during page load forces an early layout.
  let lastY = -1;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = scrollY;
    if (lastY < 0) {
      lastY = y;
      return;
    }
    const delta = y - lastY;
    if (Math.abs(delta) < 6) return;
    // Never hide while focus is inside the header (keyboard users).
    const hide = delta > 0 && y > 120 && !header.contains(document.activeElement);
    header.style.transform = hide ? 'translateY(-100%)' : '';
    lastY = y;
  };

  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true, signal },
  );
  header.addEventListener('focusin', () => (header.style.transform = ''), { signal });
}
