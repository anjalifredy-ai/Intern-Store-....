import { NextResponse } from "next/server";
import appsConfig from "@/data/apps.json";
import { getAllStoreApps } from "@/lib/github";
import { AppConfig } from "@/lib/types";

export const revalidate = 21600; // 6 hours

export async function GET() {
  const apps = await getAllStoreApps(appsConfig as AppConfig[]);
  return NextResponse.json({ apps });
}
