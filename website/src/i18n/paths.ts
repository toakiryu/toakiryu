import config from '../../redirect.config.ts';

/** Excluded URLs keep their original path and are never given a localized 404. */
export function isRedirectExcluded(pathname: string): boolean {
  const { paths, prefixes, filesWithExtension } = config.exclude;

  return (
    paths.includes(pathname) ||
    prefixes.some(
      (prefix) =>
        pathname.startsWith(prefix) ||
        (prefix.endsWith('/') && pathname === prefix.slice(0, -1)),
    ) ||
    (filesWithExtension && /\/[^/]+\.[^/]+\/?$/.test(pathname))
  );
}
