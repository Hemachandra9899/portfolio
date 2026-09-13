import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer, loadEnv } from 'vite';
import { projects } from '../src/data/portfolio.js';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const origin = new URL(env.SITE_URL || 'https://portfolio-omega-vert-ehkt9x89mo.vercel.app').origin;
if (!origin.startsWith('https://')) throw new Error('SITE_URL must use HTTPS');
const preview = env.VERCEL_ENV === 'preview';
const name = 'Hemachandra Reddy Pottingari';
const title = `${name} — Software Engineer & AI Projects`;
const description = 'Software engineer in Hyderabad building AI tools, backend systems, and React interfaces. Explore Scout, Second Brain, experience, skills, and contact Hemachandra.';
const esc = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const graph = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'Person', '@id': `${origin}/#person`, name, alternateName: 'Hemachandra Reddy', url: `${origin}/`, jobTitle: 'Software Engineer', description,
      sameAs: ['https://github.com/Hemachandra9899', 'https://www.linkedin.com/in/hemachandra-reddy/', 'https://leetcode.com/u/Hemachandra9899/'],
      homeLocation: { '@type': 'Place', name: 'Hyderabad, India' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Sreenidhi Institute of Science and Technology' },
      knowsAbout: ['Software Engineering', 'Artificial Intelligence', 'React', 'REST APIs', 'Python', 'Databases'] },
    { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: `${name} — Portfolio`, publisher: { '@id': `${origin}/#person` }, inLanguage: 'en' },
    { '@type': 'ProfilePage', '@id': `${origin}/#webpage`, url: `${origin}/`, name: title, description, mainEntity: { '@id': `${origin}/#person` }, isPartOf: { '@id': `${origin}/#website` } },
    ...projects.map(p => ({ '@type': 'SoftwareSourceCode', '@id': `${origin}/#project-${p.repo}`, name: p.title, description: p.description, codeRepository: `https://github.com/Hemachandra9899/${p.repo}`, author: { '@id': `${origin}/#person` } })),
  ],
};
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
let markup;
try {
  const { render } = await server.ssrLoadModule('/src/entry-seo.jsx');
  markup = render();
} finally { await server.close(); }
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
for (const [source, asset] of Object.entries(manifest)) markup = markup.replaceAll('/' + source, '/' + asset.file);
let template = await readFile('dist/index.html', 'utf8');
template = template.replace(/<link rel="canonical"[^>]*>/g, '').replace(/<title>[\s\S]*?<\/title>/g, '').replace(/<meta\s+(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
function page(ask = false) {
  const pageTitle = ask ? `Ask Hemachandra’s AI Assistant — ${name}` : title;
  const url = `${origin}/${ask ? 'ask' : ''}`;
  const head = `<title>${esc(pageTitle)}</title>
<link rel="canonical" href="${url}" />
<meta name="description" content="${esc(description)}" />
<meta name="robots" data-index-policy="${preview ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}" content="${ask || preview ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}" />
<meta property="og:type" content="website" /><meta property="og:site_name" content="${name}" />
<meta property="og:title" content="${esc(pageTitle)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${url}" />
<meta name="twitter:card" content="summary" /><meta name="twitter:title" content="${esc(pageTitle)}" /><meta name="twitter:description" content="${esc(description)}" />
${ask ? '' : `<script type="application/ld+json">${JSON.stringify(graph).replaceAll('<', '\\u003c')}</script>`}
<style id="static-content-visibility">#root:has(.portfolio) [data-reveal]{opacity:1;transform:none}</style>`;
  return template.replace('</head>', `${head}</head>`).replace('<div id="root"></div>', `<div id="root">${ask ? '' : markup}</div>`);
}
await writeFile('dist/index.html', page());
await mkdir('dist/ask', { recursive: true });
await writeFile('dist/ask/index.html', page(true));
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${preview ? '' : `  <url><loc>${origin}/</loc></url>\n`}</urlset>\n`);
await writeFile('dist/llms.txt', `# ${name}\n\n> ${description}\n\n## Portfolio\n- [Profile and experience](${origin}/): Biography, skills, experience, and contact links.\n\n## Projects\n${projects.map(p => `- [${p.title}](https://github.com/Hemachandra9899/${p.repo}): ${p.description}`).join('\n')}\n\nThis is a public portfolio summary. For current facts, use the linked portfolio and repositories.\n`);
console.log(`Generated crawlable portfolio, canonical, JSON-LD, sitemap and robots for ${origin}`);

await writeFile('dist/404.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page not found</title></head><body><main><h1>Page not found</h1><p>This page does not exist.</p><a href="/">Return to Hemachandra’s portfolio</a></main></body></html>');
