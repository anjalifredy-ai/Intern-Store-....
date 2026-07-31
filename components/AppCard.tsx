import Link from "next/link";
import AppIcon from "./AppIcon";
import Rating from "./Rating";
import { StoreApp } from "@/lib/types";

// deterministic pseudo-rating so it looks like a real store, seeded by name
function seededRating(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const n = Math.abs(hash) % 10; // 0-9
  return 3.6 + n / 20; // 3.6 - 4.05 range, believable spread
}

export default function AppCard({
  app,
  variant = "list",
}: {
  app: StoreApp;
  variant?: "list" | "grid" | "carousel";
}) {
  const rating = seededRating(app.displayName);

  if (variant === "carousel") {
    return (
      <Link
        href={`/app/${app.owner}/${app.repo}`}
        className="tap-scale flex w-[104px] shrink-0 flex-col items-center gap-2 text-center"
      >
        <AppIcon name={app.displayName} iconUrl={app.iconUrl} size={72} />
        <span className="line-clamp-2 text-xs font-medium text-ink leading-tight">
          {app.displayName}
        </span>
        <Rating value={rating} size={10} />
      </Link>
    );
  }

  if (variant === "grid") {
    return (
      <Link
        href={`/app/${app.owner}/${app.repo}`}
        className="tap-scale flex flex-col gap-2"
      >
        <AppIcon name={app.displayName} iconUrl={app.iconUrl} size={64} />
        <div className="flex flex-col gap-0.5">
          <span className="line-clamp-1 text-sm font-medium text-ink">
            {app.displayName}
          </span>
          <span className="line-clamp-1 text-xs text-subink">
            {app.category}
          </span>
          <Rating value={rating} size={10} />
        </div>
      </Link>
    );
  }

  // list variant (default) - horizontal row like Play Store search/category lists
  return (
    <Link
      href={`/app/${app.owner}/${app.repo}`}
      className="tap-scale flex items-center gap-4 py-3"
    >
      <AppIcon name={app.displayName} iconUrl={app.iconUrl} size={56} />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-[15px] font-medium text-ink">
          {app.displayName}
        </p>
        <p className="line-clamp-1 text-xs text-subink mt-0.5">
          {app.shortDescription}
        </p>
        <div className="mt-1">
          <Rating value={rating} size={11} />
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-surfacedim px-4 py-1.5 text-xs font-semibold text-link">
        {app.release?.apkAsset ? "Install" : "View"}
      </span>
    </Link>
  );
}
