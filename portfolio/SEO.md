# Search and AI crawling

`npm run build` renders the real Portfolio component into static HTML and generates metadata, linked Person/ProfilePage/WebSite/project JSON-LD, robots.txt, sitemap.xml, llms.txt, and the noindex chat document. Public content comes from the same components/data visitors see. There is no crawler-only alternate content.

## Domain setup required

Set `SITE_URL=https://your-owned-domain` in Vercel's production environment after connecting and verifying that domain, then redeploy. Until then the existing published URL remains the canonical; do not point it at an unowned suggested domain. Configure the previous hostname and www/non-www variant to permanently redirect to the chosen primary domain in Vercel. A Vercel deployment URL does not itself establish which production alias the project uses.

Preview builds (`VERCEL_ENV=preview`) are noindex. Consider Vercel deployment protection for previews as well. The sitemap contains only the canonical home page because work/about/contact/journal are sections of that same page. Legacy section paths permanently redirect to their anchors. Chat is noindex and is excluded; robots does not block it, so crawlers can read its noindex directive. Unknown URLs now return a genuine hosting 404 rather than the homepage.

## Verification after deployment

- Inspect `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/ask` over HTTP. Check `/does-not-exist` returns 404.
- View page source: biography and all six project descriptions should be present without JavaScript.
- Validate JSON-LD with Schema.org Validator and Google Rich Results Test. Person markup does not guarantee a knowledge panel.
- Verify domain ownership in Search Console, submit `/sitemap.xml`, and use URL Inspection to check the canonical and indexing.
- llms.txt is an optional summary, not a Google indexing requirement or ranking guarantee.
- The old social image URL pointed to a nonexistent PNG. Removed broken image claims; add a real 1200×630 preview image before enabling large-image cards.
- Further performance work: the Three.js bundle remains large and the journal photo is about 1.5 MB. Measure deployed Core Web Vitals before deciding the next optimization.
