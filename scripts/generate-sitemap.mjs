import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://amartya.iitmbs.org';
const launchRoutesEnv = process.env.VITE_LAUNCH_ROUTES || 'home,events';
const activeIds = launchRoutesEnv
  .split(',')
  .map((s) => s.trim().toLowerCase());

// Known route definitions
const routeDefinitions = [
  { id: 'home', path: '/', changefreq: 'weekly', priority: '1.0' },
  { id: 'events', path: '/events', changefreq: 'weekly', priority: '0.9' },
  { id: 'articles', path: '/articles', changefreq: 'weekly', priority: '0.8' },
  { id: 'resources', path: '/resources', changefreq: 'monthly', priority: '0.8' },
];

const liveRoutes = routeDefinitions.filter((r) => activeIds.includes(r.id));
const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${liveRoutes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const publicPath = path.resolve('public', 'sitemap.xml');
fs.writeFileSync(publicPath, xml, 'utf8');
console.log(`Generated sitemap with ${liveRoutes.length} live routes at: ${publicPath}`);

// If dist directory exists, sync it there as well
const distPath = path.resolve('dist', 'sitemap.xml');
if (fs.existsSync(path.resolve('dist'))) {
  fs.writeFileSync(distPath, xml, 'utf8');
  console.log(`Synced sitemap to dist at: ${distPath}`);
}
