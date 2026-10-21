// Transcribed from the café's menu photo (Google Maps). Prices in SAR.
// TODO(client): confirm prices are current and the spellings flagged below.

export type MenuItem = {
  id: string
  name: { ar: string; en: string }
  description?: { ar: string; en: string }
  price: number | null
  image?: string
  tags?: ('signature' | 'iced' | 'hot' | 'new')[]
}

export type MenuCategory = {
  id: string
  name: { ar: string; en: string }
  items: MenuItem[]
}

export const menu: MenuCategory[] = [
  {
    id: 'hot',
    name: { ar: 'المشروبات الحارة', en: 'Hot drinks' },
    items: [
      { id: 'espresso', name: { ar: 'اسبريسو', en: 'Espresso' }, price: 8 },
      { id: 'americano', name: { ar: 'أمريكانو', en: 'Americano' }, price: 10 },
      // Menu says "MIKATO / ميكاتو". Assumed to be macchiato; confirm with client.
      { id: 'macchiato', name: { ar: 'ماكياتو', en: 'Macchiato' }, price: 10 },
      { id: 'cortado', name: { ar: 'كورتادو', en: 'Cortado' }, price: 10 },
      { id: 'flat-white', name: { ar: 'فلات وايت', en: 'Flat white' }, price: 10 },
      { id: 'cappuccino', name: { ar: 'كابتشينو', en: 'Cappuccino' }, price: 10 },
      { id: 'latte', name: { ar: 'لاتيه', en: 'Latte' }, price: 10 },
      { id: 'spanish-latte', name: { ar: 'سبانيش لاتيه', en: 'Spanish latte' }, price: 16 },
      // TODO(client): confirm rights to this photo, or replace it with the café's own before launch.
      { id: 'pistachio-latte', name: { ar: 'بستاشيو لاتيه', en: 'Pistachio latte' }, price: 18, tags: ['signature'], image: '/images/photos/pistachio-latte.webp' },
      { id: 'hot-chocolate', name: { ar: 'هوت شوكلت', en: 'Hot chocolate' }, price: 12 },
      // Listed under hot on the menu. Confirm whether it belongs under cold.
      { id: 'frappuccino', name: { ar: 'فرابتشينو', en: 'Frappuccino' }, price: 10 },
      { id: 'todays-coffee', name: { ar: 'قهوة اليوم', en: "Today's coffee" }, price: 7 },
      { id: 'turkish-coffee', name: { ar: 'قهوة تركية', en: 'Turkish coffee' }, price: 6 },
      { id: 'english-tea', name: { ar: 'شاي إنجليزي', en: 'English tea' }, price: 5 }
    ]
  },
  {
    id: 'cold',
    name: { ar: 'المشروبات الباردة', en: 'Cold drinks' },
    items: [
      { id: 'iced-latte', name: { ar: 'آيس لاتيه', en: 'Iced latte' }, price: 12, tags: ['iced'] },
      { id: 'iced-spanish-latte', name: { ar: 'آيس سبانيش لاتيه', en: 'Iced Spanish latte' }, price: 16, tags: ['iced'] },
      // TODO(client): confirm rights to this photo, or replace it with the café's own before launch.
      { id: 'iced-pistachio-latte', name: { ar: 'آيس بستاشيو لاتيه', en: 'Iced pistachio latte' }, price: 20, tags: ['iced', 'signature'], image: '/images/photos/iced-pistachio-latte.webp' },
      { id: 'peach-iced-tea', name: { ar: 'آيس تي خوخ', en: 'Peach iced tea' }, price: 18, tags: ['iced'] },
      { id: 'iced-americano', name: { ar: 'آيس أمريكانو', en: 'Iced americano' }, price: 12, tags: ['iced'] },
      { id: 'mojito', name: { ar: 'موهيتو', en: 'Mojito' }, price: 14, tags: ['iced'] },
      { id: 'water', name: { ar: 'ماء', en: 'Water' }, price: 1 }
    ]
  },
  {
    id: 'drip',
    name: { ar: 'القهوة المقطرة', en: 'Drip coffee' },
    items: [
      { id: 'v60', name: { ar: 'V60', en: 'V60' }, price: 16 },
      { id: 'iced-v60', name: { ar: 'آيس V60', en: 'Iced V60' }, price: 16, tags: ['iced'] },
      { id: 'chemex', name: { ar: 'كيمكس', en: 'Chemex' }, price: 16 },
      { id: 'cold-brew', name: { ar: 'كولد برو', en: 'Cold brew' }, price: 18, tags: ['iced'] }
    ]
  }
]
