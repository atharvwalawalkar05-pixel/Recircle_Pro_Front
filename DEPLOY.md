# Deployment Guide — Frontend (Vercel) and Backend (Render)

This document shows minimal, repeatable steps to deploy the ReCircle app with the frontend on Vercel and the backend on Render. Keep secrets out of the repository: set them in each provider's environment settings.

## Environment variable names used by the app
- MONGO_URI (mongodb connection string)
- JWT_SECRET
- JWT_EXPIRE (optional, default `30d`)
- JWT_COOKIE_EXPIRE (optional, default `30` days)
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- FIREBASE_PROJECT_ID (if used)
- FIREBASE_PRIVATE_KEY (if used)
- FIREBASE_CLIENT_EMAIL (if used)
- REACT_APP_API_URL (frontend only; points to backend base URL e.g. `https://your-backend.onrender.com`)

Do not put these in your repo. Use the dashboard for the host.

## Backend — Render (recommended)
1. Create a new Web Service on Render and connect your repository.
2. Set the 'Root' or 'Publish directory' to `/backend`.
3. Build Command: leave blank or use `npm install` (Render will run install automatically).
4. Start Command: `node server.js` (or `npm start` if package.json has start script).
5. Set environment variables in the Render dashboard (MONGO_URI, JWT_SECRET, CLOUDINARY_*, FIREBASE_* as needed).
6. Choose a plan and deploy. Verify logs for successful DB connection.

Recommended Render settings:
- Health check path: `/api/health` (if you add one) or `/`.
- Auto deploy from the main branch.
- Ensure TLS/HTTPS is enabled (default on Render).

## Frontend — Vercel (recommended)
1. Create a new project in Vercel and link the repository.
2. In the project settings, set the Root Directory to `/frontend`.
3. Framework Preset: Create React App (or use default).
4. Build Command: `npm run build`
5. Output Directory: `build`
6. Set environment variables under Settings > Environment Variables:
   - REACT_APP_API_URL = `https://your-backend.onrender.com`
   - Any public keys you need (do not expose secrets that should remain server-only).
7. Deploy and verify the frontend loads and can reach the backend.

Notes:
- Do not store secrets in the client build. Only non-sensitive variables (like API endpoints) should be set in Vercel.
- If you want a single repo approach, use Vercel's monorepo settings and point frontend and backend to the appropriate subfolders.

## Local testing
1. Create a `.env` file in `/backend` with the environment variables and `MONGO_URI` for local dev.
2. Start backend locally:
```powershell
cd backend
npm install
npm run dev
```
3. Start frontend locally:
```powershell
cd frontend
npm install
npm start
```

## Post-deploy checklist
- Rotate any keys that were leaked.
- Add monitoring/alerts for the backend (Render provides logs and integrations).
- Configure least-privileged DB user and restrict network access.

If you want, I can create a `server /health` route for a simple health check, add CI checks to block accidental commits of `.env`, or prepare a sample Render service creation script.
