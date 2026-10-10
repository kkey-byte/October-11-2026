# A little sunshine for Dear

A small React + Vite digital love letter. The heart intro runs automatically, then the date opens a morning letter and a growing SVG sunflower. The provided date and message are preserved exactly.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```powershell
cd "C:\Game\Just a little gesture\Oct 11, 2026"
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://127.0.0.1:5173).

## Production build

```powershell
npm run build
npm run preview
```

The production website is generated in `dist/`. Fonts load from Google Fonts with local fallbacks; the interaction and illustrations do not require an API. Reduced-motion preferences disable decorative movement and immediately reveal the flower.
