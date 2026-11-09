const sha = import.meta.env.PUBLIC_BUILD_SHA;
const release = import.meta.env.PUBLIC_BUILD_RELEASE;
const commit =
  typeof sha === 'string' && /^[a-f0-9]{40}$/i.test(sha) ? sha : undefined;
const tag =
  typeof release === 'string' &&
  /^v\d+\.\d+\.\d+(?:[-.][A-Za-z0-9.-]+)?$/.test(release)
    ? release
    : undefined;
const builtAt = new Date();
const repository = 'https://github.com/toakiryu/toakiryu';

export const buildInfo = {
  datetime: builtAt.toISOString(),
  date: new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Tokyo',
  }).format(builtAt),
  label: tag ?? commit?.slice(0, 7) ?? 'local',
  url: tag
    ? `${repository}/releases/tag/${encodeURIComponent(tag)}`
    : commit
      ? `${repository}/commit/${commit}`
      : undefined,
  commit,
};
