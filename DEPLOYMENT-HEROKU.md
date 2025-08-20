# Deploying to Heroku via GitHub (Single Service)

This project is ready to deploy to Heroku as one app that serves both the API and the Vite client.

## What I added
- `Procfile` with `web: npm run start`
- `.npmrc` with `production=false` so devDependencies (vite, esbuild, tsx, etc.) are installed during build
- `package.json` lifecycle scripts:
  - `"heroku-prebuild": "npm config set production false"`
  - `"heroku-postbuild": "npm run build"`
- `engines` set to Node 20.x

## Steps
1. Push this repo to GitHub.
2. In Heroku Dashboard → Create New App.
3. Deploy tab → Deployment method: **GitHub** → Connect to your repo → Enable Automatic Deploys (optional).
4. **Config Vars** (Settings tab → Reveal Config Vars):
   - Add any runtime env vars your app needs (e.g. `DATABASE_URL`, `JWT_SECRET`, etc.).
   - You DO NOT need to set `NPM_CONFIG_PRODUCTION=false` because `.npmrc` forces devDependencies to be installed.
5. Back to Deploy tab → Click **Deploy Branch**.
6. Once built, open the app (the server binds to `$PORT` automatically).

## Build/Run under the hood
- Heroku installs dependencies (dev deps included via `.npmrc`).
- Runs `heroku-prebuild` (ensures production=false).
- Runs `heroku-postbuild` → `npm run build` which:
  - builds the Vite client
  - bundles the server to `dist/index.js`
- Starts with `web: npm run start` → `node dist/index.js`.

## Notes
- If you later move build-time tools to `dependencies`, you can remove `.npmrc` and the `heroku-prebuild` override.
- If you add environment-specific logic, ensure the server still binds to `process.env.PORT`.
