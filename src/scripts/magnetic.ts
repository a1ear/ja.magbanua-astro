import { finePointer, reducedMotion } from './motion';

// Buttons lean slightly toward the cursor. Mouse and trackpad only.
export function initMagnetic(signal: AbortSignal) {
  if (!finePointer() || reducedMotion()) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.7, 0.1, 1)';

    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        // Big targets (the contact headline) pull less than buttons.
        const strength = r.height > 120 ? 0.08 : 0.25;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      },
      { signal },
    );
    el.addEventListener('pointerleave', () => (el.style.transform = ''), { signal });
  });
}
