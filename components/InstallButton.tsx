"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { ReleaseAsset } from "@/lib/types";
import { formatBytes } from "@/lib/github";

export default function InstallButton({ asset }: { asset: ReleaseAsset | null }) {
  const [downloading, setDownloading] = useState(false);

  if (!asset) {
    return (
      <button
        disabled
        className="tap-scale w-full rounded-full bg-surfacedim py-3 text-sm font-semibold text-faintink"
      >
        No APK available
      </button>
    );
  }

  return (
    <a
      href={asset.browser_download_url}
      onClick={() => setDownloading(true)}
      className="tap-scale flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-white"
    >
      <Download size={16} />
      {downloading ? "Downloading…" : `Install · ${formatBytes(asset.size)}`}
    </a>
  );
}
