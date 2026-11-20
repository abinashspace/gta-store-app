# GTA Store

A gamified, game-store-style PWA for every Grand Theft Auto game, powered entirely by live data from
[GTA Hub](https://abinashspace.github.io/gta-hub/) ([repo](https://github.com/abinashspace/gta-hub)).

**Live:** https://abinashspace.github.io/gta-store-app/

- Store home: hero carousel of game banners, shelves for Featured, HD / 3D / 2D Universe, Upcoming, Top speed garage, Protagonists, Heavy armory, Biggest paydays.
- Game page per game: cover + banner, progress, "Get" into your library, tabs for all 7 sections (characters, missions, vehicles, weapons, cheats, locations, collectibles) with filters.
- Cross-game views: timeline, compare board, all cheats, top-speed leaderboard, search over the GTA Hub search index.
- Gamification (saved in localStorage): XP + levels with GTA ranks, wanted-level stars, daily missions, 23 achievements, login streaks, per-game progress, collectible inventory (Garage, Armory, Crew, Safehouses, Stash…), and "Heists" quiz mini-games built from real records and real images.
- Every shelf, grid and list ends with a "Coming soon" / locked placeholder slot.

No build step and no backend: static HTML/CSS/JS that fetches GTA Hub JSON at runtime (GitHub Pages sends `Access-Control-Allow-Origin: *`). A service worker caches the shell and data for offline use.

Run locally: `python3 -m http.server` in this folder, then open http://localhost:8000.
Screenshots: `screenshots/` (taken with `tools/shoot.js`, Playwright + Chrome, 390×844 mobile).

Fan project, not affiliated with Rockstar Games.
