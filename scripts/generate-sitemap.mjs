// Generates sitemap.xml from the prerendered output.
//
// Runs as a postbuild step: it walks the prerendered browser output, turns
// every `<dir>/index.html` into a clean URL, and writes sitemap.xml. Because
// it reads the actual built pages, any NEW tutorial added to the registry is
// included automatically — no manual sitemap edits ever.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

// Must match SITE_URL in src/app/shared/site.config.ts
const BASE_URL = 'https://dotnet-zero-to-heroo.vercel.app';
const OUT_DIR = 'dist/learn-hub/browser';

// Don't index the legacy /dotnet/phase-N URLs — they 301 to the new slugs.
const EXCLUDE = [/^\/dotnet\/phase-\d+$/];

/** Recursively collect every directory that contains an index.html. */
function collectRoutes(dir, root = dir, routes = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectRoutes(full, root, routes);
    } else if (entry === 'index.html') {
      const rel = relative(root, dir).split(sep).join('/');
      routes.push(rel === '' ? '/' : `/${rel}`);
    }
  }
  return routes;
}

const today = new Date().toISOString().split('T')[0];

const routes = collectRoutes(OUT_DIR)
  .filter(route => !EXCLUDE.some(re => re.test(route)))
  .sort((a, b) => a.localeCompare(b));

const body = routes
  .map(route => {
    // Home gets top priority; topic pages slightly higher than utility pages.
    const priority = route === '/' ? '1.0' : route.startsWith('/dotnet/') ? '0.8' : '0.6';
    return `  <url>\n    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(join(OUT_DIR, 'sitemap.xml'), xml, 'utf8');
console.log(`✓ sitemap.xml written with ${routes.length} URLs`);
