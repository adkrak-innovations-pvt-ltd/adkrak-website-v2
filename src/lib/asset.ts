/** Resolve a /public asset against Vite's configured base path.
 *  A bare "/foo.svg" ignores the base and 404s on GitHub Pages. */
export const asset = (p: string) =>
  `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;
