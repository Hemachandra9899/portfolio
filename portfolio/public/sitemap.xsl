<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hemachandra Reddy — Sitemap</title>
        <style>
          :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
          body { margin: 0; background: #f3eeee; color: #302a2b; }
          main { width: min(760px, calc(100% - 40px)); margin: 10vh auto; }
          p { color: #74696b; line-height: 1.6; }
          table { width: 100%; margin-top: 32px; border-collapse: collapse; background: #fffaf8; border: 1px solid #d8cdcf; }
          th, td { padding: 18px 20px; border-bottom: 1px solid #e3dadd; text-align: left; }
          th { color: #865063; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; }
          a { color: #633b49; text-underline-offset: 3px; overflow-wrap: anywhere; }
        </style>
      </head>
      <body>
        <main>
          <h1>Portfolio sitemap</h1>
          <p>This sitemap helps search engines discover the public pages on Hemachandra Reddy Pottingari’s portfolio.</p>
          <table>
            <thead><tr><th>Public URL</th></tr></thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr><td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a></td></tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
