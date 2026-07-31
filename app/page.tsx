import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Section from "@/components/Section";
import AppCard from "@/components/AppCard";
import FeaturedBanner from "@/components/FeaturedBanner";
import appsConfig from "@/data/apps.json";
import { getAllStoreApps } from "@/lib/github";
import { AppConfig } from "@/lib/types";

export const revalidate = 21600; // refresh release data every 6 hours

export default async function HomePage() {
  const apps = await getAllStoreApps(appsConfig as AppConfig[]);
  const featured = apps[0];
  const rest = apps.slice(1);

  return (
    <main className="mx-auto min-h-screen max-w-md pb-20">
      <Header />

      {apps.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-8 py-24 text-center">
          <p className="font-display text-base font-medium text-ink">
            No apps yet
          </p>
          <p className="text-sm text-subink">
            Add a repo to data/apps.json to see it here.
          </p>
        </div>
      ) : (
        <>
          {featured && (
            <div className="pt-2">
              <FeaturedBanner app={featured} />
            </div>
          )}

          <Section title="Top charts">
            {apps.map((app) => (
              <AppCard key={`${app.owner}/${app.repo}`} app={app} variant="carousel" />
            ))}
          </Section>

          <Section title="All apps" scroll={false}>
            <div className="divide-y divide-line">
              {rest.length > 0
                ? rest.map((app) => (
                    <AppCard
                      key={`${app.owner}/${app.repo}`}
                      app={app}
                      variant="list"
                    />
                  ))
                : apps.map((app) => (
                    <AppCard
                      key={`${app.owner}/${app.repo}`}
                      app={app}
                      variant="list"
                    />
                  ))}
            </div>
          </Section>
        </>
      )}

      <BottomNav />
    </main>
  );
}
