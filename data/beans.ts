// The six bean products from the old site. All priced at 35 SAR.
// Images are the client's own product photos, downloaded from dripora-sa.com.

export type BeanType = 'filter' | 'espresso'

export type BeanProduct = {
  id: string
  name: { ar: string; en: string }
  type: BeanType
  price: number
  image: string
  weight: string | null // TODO(client): bag weight unknown
  notes: { ar: string; en: string } | null // TODO(client): tasting notes and roast level unknown
}

export const beans: BeanProduct[] = [
  { id: 'uganda', name: { ar: 'اوغندا', en: 'Uganda' }, type: 'filter', price: 35, image: '/images/beans/uganda.webp', weight: null, notes: null },
  { id: 'ethiopia', name: { ar: 'إثيوبيا', en: 'Ethiopia' }, type: 'filter', price: 35, image: '/images/beans/ethiopia.webp', weight: null, notes: null },
  { id: 'elite-blend', name: { ar: 'مزيج نخبة', en: 'Elite Blend' }, type: 'filter', price: 35, image: '/images/beans/elite-blend.webp', weight: null, notes: null },
  { id: 'brazil', name: { ar: 'البرازيل', en: 'Brazil' }, type: 'espresso', price: 35, image: '/images/beans/brazil.webp', weight: null, notes: null },
  { id: 'colombia', name: { ar: 'كولومبيا', en: 'Colombia' }, type: 'espresso', price: 35, image: '/images/beans/colombia.webp', weight: null, notes: null },
  { id: 'special-blend', name: { ar: 'المزيج الخاص', en: 'Special Blend' }, type: 'espresso', price: 35, image: '/images/beans/special-blend.webp', weight: null, notes: null }
]
