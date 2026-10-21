type PageKey = 'home' | 'menu' | 'beans' | 'about' | 'visit' | 'returns' | 'privacy'

/** Per-page title, description and social cards in the current locale. */
export function usePageSeo(page: PageKey) {
  const { t, locale } = useI18n()
  const siteUrl = useRuntimeConfig().public.siteUrl

  // The home title already carries the brand; other pages get "<page> · <brand>".
  const title = () => page === 'home'
    ? t('seo.home.title')
    : `${t(`seo.${page}.title`)} · ${t('seo.siteName')}`
  const description = () => t(`seo.${page}.description`)
  const image = () => `${siteUrl}/og/og-${locale.value}.png`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: () => t('seo.siteName'),
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: () => t('seo.ogAlt'),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image
  })
}
