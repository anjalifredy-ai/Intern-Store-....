import { ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppIcon from "@/components/AppIcon";
import Rating from "@/components/Rating";
import InstallButton from "@/components/InstallButton";
import appsConfig from "@/data/apps.json";
import { getStoreApp, timeAgo, formatDownloads } from "@/lib/github";
import { AppConfig } from "@/lib/types";

export const revalidate = 21600;

function seededRating(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const n = Math.abs(hash) % 10;
  return 3.6 + n / 20;
}

function seededDownloads(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) * 31 + ((hash << 5) - hash);
  }
  return 500 + (Math.abs(hash) % 9500);
}

export async function generateStaticParams() {
  return (appsConfig as AppConfig[]).map((a) => ({
    repo: [a.owner, a.repo],
  }));
}

export default async function AppDetailPage({
  params,
}: {
  params: { repo: string[] };
}) {
  const [owner, repo] = params.repo || [];
  const config = (appsConfig as AppConfig[]).find(
    (a) => a.owner === owner && a.repo === repo
  );

  if (!config) return notFound();

  const app = await getStoreApp(config);
  const rating = seededRating(app.displayName);
  const downloads = seededDownloads(app.displayName);

  return (
    <main className="mx-auto min-h-screen max-w-md pb-10">
      {/* top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-surface px-2 py-2">
        <Link href="/" className="tap-scale rounded-full p-2">
          <ChevronLeft size={22} className="text-ink" />
        </Link>
        <button className="tap-scale rounded-full p-2">
          <Share2 size={19} className="text-ink" />
        </button>
      </div>

      {/* header */}
      <div className="flex items-start gap-4 px-4 pt-2">
        <AppIcon name={app.displayName} iconUrl={app.iconUrl} size={80} />
        <div className="min-w-0 flex-1 pt-1">
          <h1 className="font-display text-xl font-medium leading-tight text-ink">
            {app.displayName}
          </h1>
          <p className="text-sm text-link mt-0.5">{app.developer}</p>
        </div>
      </div>

      {/* stats row */}
      <div className="mt-4 flex divide-x divide-line px-4">
        <div className="flex flex-1 flex-col items-center gap-1 px-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-ink">
              {rating.toFixed(1)}
            </span>
            <Rating value={rating} showValue={false} size={12} />
          </div>
          <span className="text-[11px] text-subink">
            {formatDownloads(downloads)} ratings
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 px-2">
          <span className="text-sm font-medium text-ink">
            {formatDownloads(downloads)}
          </span>
          <span className="text-[11px] text-subink">Downloads</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 px-2">
          <span className="text-sm font-medium text-ink">
            {app.release?.tagName || "—"}
          </span>
          <span className="text-[11px] text-subink">Version</span>
        </div>
      </div>

      {/* install button */}
      <div className="px-4 pt-5">
        <InstallButton asset={app.release?.apkAsset ?? null} />
        {!app.release && (
          <p className="mt-2 text-center text-xs text-faintink">
            {app.error || "This app has no published release yet."}
          </p>
        )}
      </div>

      {/* about */}
      <div className="mt-6 px-4">
        <h2 className="font-display text-base font-medium text-ink mb-2">
          About this app
        </h2>
        <p className="text-sm leading-relaxed text-subink">
          {app.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-surfacedim px-3 py-1 text-xs text-subink">
            {app.category}
          </span>
          {app.release && (
            <span className="rounded-full bg-surfacedim px-3 py-1 text-xs text-subink">
              Updated {timeAgo(app.release.publishedAt)}
            </span>
          )}
        </div>
      </div>

      {/* release notes */}
      {app.release?.body && (
        <div className="mt-6 px-4">
          <h2 className="font-display text-base font-medium text-ink mb-2">
            What's new
          </h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-subink line-clamp-6">
            {app.release.body}
          </p>
        </div>
      )}

      {/* source link */}
      {app.release?.htmlUrl && (
        <div className="mt-6 px-4">
          <a
            href={app.release.htmlUrl}
            className="text-sm font-medium text-link"
          >
            View release on GitHub →
          </a>
        </div>
      )}
    </main>
  );
          }
