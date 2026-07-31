import { AppConfig, AppRelease, StoreApp, ReleaseAsset } from "./types";

const GITHUB_API = "https://api.github.com";

function pickApkAsset(assets: ReleaseAsset[]): ReleaseAsset | null {
  if (!assets || assets.length === 0) return null;
  const apk = assets.find((a) => a.name.toLowerCase().endsWith(".apk"));
  return apk ?? null;
}

async function fetchLatestRelease(
  owner: string,
  repo: string
): Promise<AppRelease | null> {
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/releases/latest`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      // cache on the server, refresh every 6 hours so we don't hammer the API
      next: { revalidate: 21600 },
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return {
    tagName: data.tag_name,
    name: data.name || data.tag_name,
    body: data.body || "",
    publishedAt: data.published_at,
    htmlUrl: data.html_url,
    assets: data.assets,
    apkAsset: pickApkAsset(data.assets),
  };
}

export async function getStoreApp(config: AppConfig): Promise<StoreApp> {
  try {
    const release = await fetchLatestRelease(config.owner, config.repo);
    if (!release) {
      return { ...config, release: null, error: "No release found" };
    }
    return { ...config, release };
  } catch (err) {
    return { ...config, release: null, error: "Failed to fetch release" };
  }
}

export async function getAllStoreApps(
  configs: AppConfig[]
): Promise<StoreApp[]> {
  const results = await Promise.all(configs.map(getStoreApp));
  return results;
}

export function formatBytes(bytes: number): string {
  if (!bytes) return "0 MB";
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${mb.toFixed(1)} MB`;
}

export function formatDownloads(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return `${count}+`;
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  const years = Math.floor(months / 12);
  return `${years} yr ago`;
}
