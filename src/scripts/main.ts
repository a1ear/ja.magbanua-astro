// Page behaviour. Module scripts run after the document is parsed, so every
// piece can set itself up straight away. Page-to-page transitions are native
// cross-document view transitions (CSS only), so there is no client router
// and no per-navigation setup or teardown to manage.
import { initHeader } from './header';
import { initMenu } from './menu';
import { initTheme } from './theme';
import { initReveal } from './reveal';
import { initCursorPreview } from './cursor-preview';
import { initMagnetic } from './magnetic';
import { initContact } from './contact';

const { signal } = new AbortController();

for (const init of [
  initHeader,
  initMenu,
  initTheme,
  initReveal,
  initCursorPreview,
  initMagnetic,
  initContact,
]) {
  init(signal);
}
