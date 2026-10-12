// Copy-to-clipboard with a toast, plus the live Manila clock.
export function initContact(signal: AbortSignal) {
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  let hideTimer = 0;

  const say = (msg: string) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      toast.classList.remove('is-on');
      toast.textContent = '';
    }, 2200);
  };

  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) =>
    btn.addEventListener(
      'click',
      async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy!);
          say('Email copied to clipboard');
        } catch {
          say('Could not copy. Select the address above instead.');
        }
      },
      { signal },
    ),
  );

  const clock = document.querySelector<HTMLTimeElement>('[data-clock]');
  let tick = 0;
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: clock.dataset.tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const update = () => {
      const now = new Date();
      clock.textContent = `${fmt.format(now)} in Manila (UTC+8)`;
      clock.dateTime = now.toISOString();
    };
    update();
    tick = window.setInterval(update, 30_000);
  }

  signal.addEventListener('abort', () => {
    clearInterval(tick);
    clearTimeout(hideTimer);
  });
}
