# Intern Store

Google Play Store jaisa app store, apps GitHub Releases se seedha fetch hote hain.

## Structure

```
app/
  page.tsx              → home page (Play Store style feed)
  layout.tsx            → root layout + metadata
  globals.css           → global styles
  app/[...repo]/page.tsx → app detail page (owner/repo se)
  api/apps/route.ts     → JSON API route (GET /api/apps)
components/
  Header.tsx            → top bar + search
  BottomNav.tsx          → bottom tab bar
  AppCard.tsx            → app row/grid/carousel card
  AppIcon.tsx            → app icon tile (gradient fallback)
  Rating.tsx             → star rating
  InstallButton.tsx      → download button (client component)
  FeaturedBanner.tsx      → hero banner
  Section.tsx             → titled section wrapper
lib/
  github.ts              → GitHub Releases API fetch logic
  types.ts                → shared TypeScript types
data/
  apps.json               → list of repos to show in the store
```

## Naya app add karna

`data/apps.json` mein ek entry add kar:

```json
{
  "owner": "Remon",
  "repo": "TeraRepoName",
  "displayName": "App ka naam",
  "shortDescription": "Ek line mein kya hai ye app",
  "category": "Games",
  "iconUrl": "",
  "developer": "Remon"
}
```

Repo mein ek GitHub Release hona chahiye jisme ek `.apk` file attached ho, wahi latest release automatically fetch ho jayega.

## Deploy (Vercel)

1. Ye poora folder GitHub repo mein push/upload kar (GitHub mobile app se bhi ho jayega)
2. Vercel pe "New Project" → is repo ko import kar
3. Framework auto-detect ho jayega (Next.js) — deploy kar de

Optional: agar GitHub API rate limit (60 req/hour unauthenticated) hit ho, to Vercel project settings mein
`GITHUB_TOKEN` naam ka environment variable add kar (personal access token, public_repo scope) — code already ise use karta hai agar available ho.
