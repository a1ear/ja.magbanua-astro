import { reducedMotion } from './motion';

type Theme = 'light' | 'dark';

const current = (): Theme => {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const label = (t: Theme) => (t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');

function apply(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* storage blocked: the choice simply lasts for this page */
  }
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-label', label(next)));
}

// Theme switch with a circular wipe that grows out of the button pressed.
export function initTheme(signal: AbortSignal) {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  buttons.forEach((b) => b.setAttribute('aria-label', label(current())));

  buttons.forEach((btn) =>
    btn.addEventListener(
      'click',
      () => {
        const next: Theme = current() === 'dark' ? 'light' : 'dark';
        if (!document.startViewTransition || reducedMotion()) return apply(next);

        const r = btn.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        const root = document.documentElement;
        root.style.setProperty('--wipe-x', `${x}px`);
        root.style.setProperty('--wipe-y', `${y}px`);
        root.style.setProperty('--wipe-r', `${radius}px`);
        root.classList.add('theme-wipe');

        const vt = document.startViewTransition(() => apply(next));
        vt.finished.finally(() => root.classList.remove('theme-wipe'));
      },
      { signal },
    ),
  );
}
