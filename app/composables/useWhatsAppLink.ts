import { cafe } from '~~/data/cafe'
import type { BeanProduct } from '~~/data/beans'

/**
 * wa.me link with a prefilled message in the current locale.
 * With a product: an order message naming the bean and its type. Without: a plain greeting.
 */
export function useWhatsAppLink(product?: MaybeRefOrGetter<BeanProduct | undefined>) {
  const { t } = useI18n()
  const l = useLocalized()

  return computed(() => {
    const p = toValue(product)
    const text = p
      ? t('whatsapp.orderBean', { name: l(p.name), type: t(`beans.type.${p.type}`) })
      : t('whatsapp.general')
    return `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(text)}`
  })
}
