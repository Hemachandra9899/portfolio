import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer, loadEnv } from 'vite';
import { projects } from '../src/data/portfolio.js';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const origin = new URL(env.SITE_URL || 'https://portfolio-omega-vert-ehkt9x89mo.vercel.app').origin;
if (!origin.startsWith('https://')) throw new Error('SITE_URL must use HTTPS');
const preview = env.VERCEL_ENV === 'preview';
const name = 'Hemachandra Reddy Pottingari';
const title = 'Hemachandra Reddy — AI & Data Engineer Portfolio in Hyderabad';
const description = 'AI & Data Engineer portfolio in Hyderabad. Explore Hemachandra Reddy’s AI agents, RAG systems, data engineering, FastAPI, Python, and React projects.';
const esc = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

const graph = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'Person', '@id': `${origin}/#person`, name, alternateName: 'Hemachandra Reddy', url: `${origin}/`, jobTitle: 'AI and Data Engineer', description,
    sameAs: ['https://github.com/Hemachandra9899', 'https://www.linkedin.com/in/hemachandra-reddy/', 'https://leetcode.com/u/Hemachandra9899/'],
    homeLocation: { '@type': 'Place', name: 'Hyderabad, India' }, alumniOf: { '@type': 'CollegeOrUniversity', name: 'Sreenidhi Institute of Science and Technology' },
    knowsAbout: ['AI Agents', 'Retrieval-Augmented Generation', 'Large Language Models', 'Data Engineering', 'FastAPI', 'Python', 'React', 'Vector Databases'] },
  { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: `${name} — AI Engineer Portfolio`, publisher: { '@id': `${origin}/#person` }, inLanguage: 'en' },
  { '@type': 'ProfilePage', '@id': `${origin}/#webpage`, url: `${origin}/`, name: title, description, mainEntity: { '@id': `${origin}/#person` }, isPartOf: { '@id': `${origin}/#website` } },
  ...projects.map(project => ({ '@type': 'SoftwareSourceCode', '@id': `${origin}/projects/${project.slug}#project`, name: project.title, description: project.description, url: `${origin}/projects/${project.slug}`, codeRepository: `https://github.com/Hemachandra9899/${project.repo}`, author: { '@id': `${origin}/#person` }, programmingLanguage: project.tags })),
] };

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
let render;
try { ({ render } = await server.ssrLoadModule('/src/entry-seo.jsx')); } finally { await server.close(); }
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
let template = await readFile('dist/index.html', 'utf8');
template = template.replace(/<link rel="canonical"[^>]*>/g, '').replace(/<title>[\s\S]*?<\/title>/g, '').replace(/<meta\s+(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

function withAssets(markup) {
  for (const [source, asset] of Object.entries(manifest)) markup = markup.replaceAll(`/${source}`, `/${asset.file}`);
  return markup;
}

function page({ path = '/', pageTitle = title, pageDescription = description, index = true, jsonLd = graph } = {}) {
  const url = `${origin}${path}`;
  const robots = preview || !index ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
  const head = `<title>${esc(pageTitle)}</title>
<link rel="canonical" href="${url}" />
<meta name="description" content="${esc(pageDescription)}" />
<meta name="robots" data-index-policy="${robots}" content="${robots}" />
<meta property="og:type" content="website" /><meta property="og:site_name" content="${name}" />
<meta property="og:title" content="${esc(pageTitle)}" /><meta property="og:description" content="${esc(pageDescription)}" /><meta property="og:url" content="${url}" />
<meta name="twitter:card" content="summary" /><meta name="twitter:title" content="${esc(pageTitle)}" /><meta name="twitter:description" content="${esc(pageDescription)}" />
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>` : ''}
<style id="static-content-visibility">#root:has(.portfolio) [data-reveal]{opacity:1;transform:none}</style>`;
  return template.replace('</head>', `${head}</head>`).replace('<div id="root"></div>', `<div id="root">${withAssets(render(path))}</div>`);
}

await writeFile('dist/index.html', page());
await mkdir('dist/ask', { recursive: true });
await writeFile('dist/ask/index.html', page({ path: '/ask', pageTitle: `Ask Hemachandra’s AI Assistant — ${name}`, index: false, jsonLd: null }));
for (const project of projects) {
  const path = `/projects/${project.slug}`;
  const pageDescription = `${project.description} Read this AI engineering project case study by Hemachandra Reddy in Hyderabad.`;
  const projectGraph = { '@context': 'https://schema.org', '@type': 'SoftwareSourceCode', name: project.title, description: project.description, url: `${origin}${path}`, codeRepository: `https://github.com/Hemachandra9899/${project.repo}`, author: { '@id': `${origin}/#person` }, programmingLanguage: project.tags };
  await mkdir(`dist${path}`, { recursive: true });
  await writeFile(`dist${path}/index.html`, page({ path, pageTitle: `${project.title} — AI Project by Hemachandra Reddy`, pageDescription, jsonLd: projectGraph }));
}
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);
const sitemapUrls = [`${origin}/`, ...projects.map(project => `${origin}/projects/${project.slug}`)];
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${preview ? '' : sitemapUrls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile('dist/llms.txt', `# ${name}\n\n> ${description}\n\n## Portfolio\n- [AI and Data Engineer portfolio](${origin}/): Biography, AI expertise, experience, skills, and contact links.\n\n## Projects\n${projects.map(project => `- [${project.title}](${origin}/projects/${project.slug}): ${project.description}`).join('\n')}\n\nThis is a public portfolio summary. For current facts, use the linked portfolio, case studies, and source repositories.\n`);
await writeFile('dist/404.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page not found</title></head><body><main><h1>Page not found</h1><p>This page does not exist.</p><a href="/">Return to Hemachandra’s portfolio</a></main></body></html>');
console.log(`Generated homepage and ${projects.length} crawlable project pages for ${origin}`);
