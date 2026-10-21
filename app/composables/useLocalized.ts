import type { Localized } from '~~/data/cafe'

/** Picks the current locale's side of an `{ ar, en }` pair from the data files. */
export function useLocalized() {
  const { locale } = useI18n()
  return (pair: Localized) => pair[locale.value as keyof Localized]
}

/** "35 ر.س" in Arabic, "SAR 35" in English, Western digits in both. */
export function usePrice() {
  const { t } = useI18n()
  return (amount: number) => t('price', { amount: String(amount) })
}
