export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A real mouse or trackpad on a large screen: the only place hover effects run. */
export const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
