# GTA Store

A game-store PWA for every Grand Theft Auto title, powered entirely by live data from
[GTA Hub](https://abinashspace.github.io/gta-hub/) ([repo](https://github.com/abinashspace/gta-hub)).

The interface is modeled on Apple’s Games app and Apple Arcade: a dark iOS-native layout, large titles, full-bleed featured heroes, frosted buttons, circular Continue Playing icons, editorial rails, and a floating translucent tab bar.

**Live:** https://abinashspace.github.io/gta-store-app/

- Home: full-bleed “For You” hero, era chips, Continue Playing, daily missions, Games We Love, universe shelves, top speed, protagonists, armory and paydays.
- Arcade: featured / coming-soon hero, genre chips, New Release rail, and a cover grid of all 17 games.
- Game page: cover and banner, progress, Get / library, tabs for all 7 sections (characters, missions, vehicles, weapons, cheats, locations, collectibles) with filters.
- Cross-game views: timeline, compare board, all cheats, top-speed leaderboard, search over the GTA Hub search index.
- Gamification (saved in localStorage), presented in a Game Center style: XP and levels with GTA ranks, a progress ring on the profile avatar, wanted-level stars, daily missions, 23 achievement medallions, login streaks, per-game progress, collections (Garage, Armory, Crew, Safehouses, Stash…), and Heists quiz mini-games built from real records and art.
- Every shelf, grid and list ends with a “Coming soon” / locked placeholder slot.

No build step and no backend: static HTML/CSS/JS that fetches GTA Hub JSON at runtime (GitHub Pages sends `Access-Control-Allow-Origin: *`). A service worker caches the shell and data for offline use.

Run locally: `python3 -m http.server` in this folder, then open http://localhost:8000.
Screenshots: `screenshots/` (v1) and `screenshots/v2/` (Apple Games redesign), taken with `tools/shoot.js` (Playwright + Chrome, 390×844).

Fan project, not affiliated with Rockstar Games.
