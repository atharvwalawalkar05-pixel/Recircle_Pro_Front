/*
 Automated screenshots for ReCircle frontend build.
 - Serves the build directory via a minimal static server
 - Uses Puppeteer to navigate to key routes and capture PNGs
 - Saves output to frontend/screenshots
*/

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

async function startStaticServer(rootDir, port = 5050) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      try {
        const parsedUrl = url.parse(req.url);
        let sanitizePath = path.normalize(parsedUrl.pathname).replace(/^\/+/, '');
        if (sanitizePath === '') sanitizePath = 'index.html';
        let pathname = path.join(rootDir, sanitizePath);

        // If path is a directory, serve index.html
        if (fs.existsSync(pathname) && fs.statSync(pathname).isDirectory()) {
          pathname = path.join(pathname, 'index.html');
        }

        const ext = path.parse(pathname).ext || '.html';
        const map = {
          '.ico': 'image/x-icon',
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.json': 'application/json',
          '.css': 'text/css',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.woff': 'font/woff',
          '.woff2': 'font/woff2',
          '.ttf': 'font/ttf',
        };

        fs.readFile(pathname, (err, data) => {
          if (err) {
            // SPA fallback to index.html
            const indexPath = path.join(rootDir, 'index.html');
            fs.readFile(indexPath, (fallbackErr, indexData) => {
              if (fallbackErr) {
                res.statusCode = 404;
                res.end(`File not found or error: ${fallbackErr?.message}`);
              } else {
                res.setHeader('Content-type', 'text/html');
                res.end(indexData);
              }
            });
          } else {
            res.setHeader('Content-type', map[ext] || 'text/plain');
            res.end(data);
          }
        });
      } catch (e) {
        res.statusCode = 500;
        res.end(`Server error: ${e.message}`);
      }
    });

    server.listen(port, () => resolve(server));
  });
}

async function captureScreenshots() {
  const puppeteer = require('puppeteer');
  const outDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Serve the build directory
  const buildDir = path.join(__dirname, '..', 'build');
  if (!fs.existsSync(buildDir)) {
    console.error('Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  const port = 5050;
  const server = await startStaticServer(buildDir, port);

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });

  // Avoid waiting on API requests; fast DOM screenshots
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('/api/')) {
      // Abort API calls to avoid timeouts when backend is not running
      return req.abort();
    }
    return req.continue();
  });

  const routes = [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about' },
    { path: '/login', name: 'login' },
    { path: '/register', name: 'register' },
    { path: '/ngos', name: 'ngos' },
    { path: '/create', name: 'create' },
    { path: '/profile', name: 'profile' },
  ];

  for (const r of routes) {
    const url = `http://localhost:${port}${r.path}`;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      // Give the UI a moment to paint
      await new Promise((res) => setTimeout(res, 1000));
      const outPath = path.join(outDir, `${r.name}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Captured: ${outPath}`);
    } catch (e) {
      console.warn(`Failed to capture ${r.path}: ${e.message}`);
    }
  }

  await browser.close();
  server.close();
}

captureScreenshots().catch((e) => {
  console.error('Screenshot task failed:', e);
  process.exit(1);
});
