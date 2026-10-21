import { cafe } from '~~/data/cafe'

/** schema.org CafeOrCoffeeShop markup for the café. */
export function useCafeJsonLd() {
  const { locale } = useI18n()
  const localePath = useLocalePath()
  const siteUrl = useRuntimeConfig().public.siteUrl
  const l = useLocalized()

  useHead(() => ({
    script: [{
      key: 'cafe-jsonld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CafeOrCoffeeShop',
        name: l(cafe.name),
        url: siteUrl + localePath('/'),
        logo: `${siteUrl}/images/logo.webp`,
        image: `${siteUrl}/og/og-${locale.value}.png`,
        telephone: cafe.phone,
        priceRange: '$',
        servesCuisine: 'Coffee',
        hasMenu: siteUrl + localePath('/menu'),
        address: {
          '@type': 'PostalAddress',
          streetAddress: l(cafe.address),
          addressLocality: locale.value === 'ar' ? 'الرياض' : 'Riyadh',
          postalCode: '12721',
          addressCountry: 'SA'
        },
        geo: { '@type': 'GeoCoordinates', latitude: cafe.geo.lat, longitude: cafe.geo.lng },
        openingHours: `Mo-Su ${cafe.hours.open}-${cafe.hours.close}`,
        hasMap: cafe.mapsUrl
      })
    }]
  }))
}
