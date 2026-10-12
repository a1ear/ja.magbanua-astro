// Shared SEO settings, used by the <Seo> component and the sitemap so the
// image URLs they publish are the exact same generated files.

/** Social-share and sitemap image: 1200px wide JPEG (what most crawlers accept). */
export const OG_IMAGE = { width: 1200, format: 'jpg', quality: 80 } as const;

/** Stable JSON-LD @ids, so nodes on different pages describe the same entities. */
export function ids(site: URL) {
  const home = site.href.replace(/\/$/, '') + '/';
  return {
    home,
    website: `${home}#website`,
    person: `${home}#person`,
    org: `${home}#nightpatchdev`,
  };
}

/** Meta descriptions are cut off around 155 to 160 characters in results. */
export function clampDescription(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '.';
}
