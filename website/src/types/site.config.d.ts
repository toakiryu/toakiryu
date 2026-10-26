type Title = {
  default: string;
  template: string;
};

export interface SiteConfigs {
  url: string;
  title: Title;
  description: string;
}
