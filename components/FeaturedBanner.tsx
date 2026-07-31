import Link from "next/link";
import AppIcon from "./AppIcon";
import { StoreApp } from "@/lib/types";

export default function FeaturedBanner({ app }: { app: StoreApp }) {
  return (
    <Link
      href={`/app/${app.owner}/${app.repo}`}
      className="tap-scale mx-4 flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-5"
    >
      <span className="w-fit rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-accent">
        New release
      </span>
      <div className="flex items-center gap-4">
        <AppIcon name={app.displayName} iconUrl={app.iconUrl} size={64} />
        <div className="min-w-0">
          <p className="line-clamp-1 font-display text-base font-medium text-ink">
            {app.displayName}
          </p>
          <p className="line-clamp-2 text-xs text-subink mt-0.5">
            {app.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}
