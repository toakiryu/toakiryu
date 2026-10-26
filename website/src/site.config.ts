import type { SiteConfigs } from '@/types/site.config.d.ts';

const siteConfigs: SiteConfigs = {
  url: 'https://ktoa.me',
  title: {
    default: 'Toakiryu',
    template: '%s | Toakiryu',
  },
  description:
    'A personal website of Toa Kiryu, a software engineer and open-source enthusiast.',
};

export default siteConfigs;
