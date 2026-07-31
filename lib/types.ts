export type AppConfig = {
  owner: string;
  repo: string;
  displayName: string;
  shortDescription: string;
  category: string;
  iconUrl: string;
  developer: string;
};

export type ReleaseAsset = {
  name: string;
  size: number;
  browser_download_url: string;
  download_count: number;
};

export type AppRelease = {
  tagName: string;
  name: string;
  body: string;
  publishedAt: string;
  htmlUrl: string;
  assets: ReleaseAsset[];
  apkAsset: ReleaseAsset | null;
};

export type StoreApp = AppConfig & {
  release: AppRelease | null;
  error?: string;
};
