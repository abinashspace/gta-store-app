# GTA Store

A calm, fast companion for every Grand Theft Auto title, powered entirely by live data from
[GTA Hub](https://abinashspace.github.io/gta-hub/) ([repo](https://github.com/abinashspace/gta-hub)).

The interface is its own: warm ink and brass, editorial type, plenty of space, and no neon or store-cloned wording.

**Live:** https://abinashspace.github.io/gta-store-app/

- Home: one featured title, recently opened, the main series, a quiet link to today’s contracts, and shortcuts to timeline, compare, cheats and top speed.
- Explore: all 17 games by universe, plus the same series-wide guides.
- Game page: cover and banner, progress, add to collection, and tabs for all 7 sections (characters, missions, vehicles, weapons, cheats, locations, collectibles) with filters. Long lists paginate.
- Cross-game views: timeline, compare board, all cheats, top-speed leaderboard, search over the GTA Hub search index.
- Optional play: XP and levels with GTA ranks, a quiet wanted-level, daily contracts, 23 achievements, login streaks, per-game progress, collections (Garage, Armory, Crew, Safehouses, Stash…), and Heists quiz rounds built from real records and art. Milestones use a small toast — nothing interrupts browsing.
- Every shelf, grid and list ends with a “Coming soon” / locked placeholder slot.

No build step and no backend: static HTML/CSS/JS that fetches GTA Hub JSON at runtime (GitHub Pages sends `Access-Control-Allow-Origin: *`). The app shell is cached by a service worker. Index and game JSON are stored in IndexedDB and refreshed in the background. Home paints from `data/index.json` only; each game bundle loads when you open that page.

Run locally: `python3 -m http.server` in this folder, then open http://localhost:8000.
Screenshots: `screenshots/v3/` (this version), plus `screenshots/v2/` and `screenshots/` for earlier designs, taken with `tools/shoot.js` (Playwright + Chrome, 390×844).

Display type is [Newsreader](https://fonts.google.com/specimen/Newsreader) (SIL Open Font License). Fan project, not affiliated with Rockstar Games.

## Android app

A Capacitor 8 Android wrapper ships in `android/`. The web UI is bundled into the APK so the shell works offline; live data and artwork still load from [GTA Hub](https://abinashspace.github.io/gta-hub/) at runtime.

- **Package:** `com.abinashspace.gtastore`
- **Min / target SDK:** 24 / 36
- **Release:** [v1.1.0](https://github.com/abinashspace/gta-store-app/releases/tag/v1.1.0) — download [GTA-Store-v1.1.0.apk](https://github.com/abinashspace/gta-store-app/releases/download/v1.1.0/GTA-Store-v1.1.0.apk)

To rebuild a signed release APK (requires JDK 21 and the Android SDK):

```bash
npm install
npm run build:apk
# APK: android/app/build/outputs/apk/release/app-release.apk
```

`npm run cap:sync` copies the GitHub Pages files into `www/` (without the service worker) and syncs them into the Android project. The Pages site at the repo root is unchanged.

The release keystore lives in `android-signing/` on the build machine and is gitignored. Keep a backup of that folder if you will publish updates signed with the same key.
