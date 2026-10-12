import { finePointer, reducedMotion } from './motion';

// Floating screenshot that trails the cursor over the work list. It sits
// beside the cursor (flipping sides near the right edge) so it never covers
// the row being read. Transform-only, and the rAF loop stops itself once the
// preview has caught up.
export function initCursorPreview(signal: AbortSignal) {
  const list = document.querySelector<HTMLElement>('[data-work-list]');
  const preview = document.querySelector<HTMLElement>('[data-work-preview]');
  if (!list || !preview || !finePointer()) return;

  const imgs = preview.querySelectorAll<HTMLElement>('[data-preview-img]');
  const ease = reducedMotion() ? 1 : 0.16;
  const gap = 28;
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let raf = 0;
  let inside = false;
  let active: string | null = null;

  const target = (cx: number, cy: number) => {
    const w = preview.offsetWidth;
    tx = cx + gap + w > innerWidth ? cx - gap - w : cx + gap;
    ty = cy - preview.offsetHeight / 2;
  };

  const render = () => {
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(render) : 0;
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(render);
  };

  const show = (i: string | null) => {
    if (i === null) {
      preview.classList.remove('is-on');
      active = null;
      return;
    }
    if (i !== active) {
      imgs.forEach((img) => img.classList.toggle('is-active', img.dataset.previewImg === i));
      active = i;
    }
    preview.classList.add('is-on');
  };

  let cx = 0;
  let cy = 0;
  const rowAt = () =>
    document.elementFromPoint(cx, cy)?.closest<HTMLElement>('[data-work-row]')?.dataset.workRow ?? null;

  list.addEventListener(
    'pointerenter',
    (e) => {
      inside = true;
      cx = e.clientX;
      cy = e.clientY;
      // Start beside the cursor instead of flying in from the last position.
      target(cx, cy);
      x = tx;
      y = ty;
      render();
    },
    { signal },
  );
  list.addEventListener(
    'pointermove',
    (e) => {
      cx = e.clientX;
      cy = e.clientY;
      target(cx, cy);
      show(rowAt());
      kick();
    },
    { signal, passive: true },
  );
  list.addEventListener(
    'pointerleave',
    () => {
      inside = false;
      show(null);
    },
    { signal },
  );

  // Scrolling moves rows under a still cursor: swap to whichever row is
  // now underneath, or hide when the cursor has left the list.
  let scrollQueued = false;
  addEventListener(
    'scroll',
    () => {
      if (!inside || scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        show(rowAt());
      });
    },
    { signal, passive: true },
  );

  signal.addEventListener('abort', () => cancelAnimationFrame(raf));
}
