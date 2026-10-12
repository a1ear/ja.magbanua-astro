// Full-screen mobile menu. A native modal <dialog> gives focus trapping,
// Escape to close and an inert background for free.
export function initMenu(signal: AbortSignal) {
  const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!menu || !openBtn) return;

  const close = () => menu.open && menu.close();

  openBtn.addEventListener('click', () => menu.showModal(), { signal });
  menu.querySelector('[data-menu-close]')?.addEventListener('click', close, { signal });
  menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', close, { signal }));
  menu.addEventListener('close', () => openBtn.focus(), { signal });

  // If the viewport grows past the mobile breakpoint, the dialog is hidden by
  // CSS; close it so the page is not left inert.
  const mq = matchMedia('(min-width: 64rem)');
  mq.addEventListener('change', (e) => e.matches && close(), { signal });

  // Never carry an open modal (and an inert page) across a navigation.
  signal.addEventListener('abort', close);
}
