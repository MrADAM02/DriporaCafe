// Prerendered to a static /sitemap.xml at generate time; there is no server at runtime.
const paths = ['/', '/menu', '/beans', '/visit', '/about', '/policies/returns', '/policies/privacy']

export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl
  const url = (locale: 'ar' | 'en', path: string) =>
    siteUrl + (locale === 'en' ? (path === '/' ? '/en' : `/en${path}`) : path)

  const entries = paths.flatMap(path =>
    (['ar', 'en'] as const).map(locale => `  <url>
    <loc>${url(locale, path)}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${url('ar', path)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${url('en', path)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('ar', path)}"/>
  </url>`)
  )

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
})
