/** Resolve a public asset path against the deploy base (works on Vercel and GitHub Pages). */
export function asset(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || /^(data|mailto|tel|blob):/i.test(path)) {
    return path;
  }
  return import.meta.env.BASE_URL + path.replace(/^\.?\//, '');
}

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
