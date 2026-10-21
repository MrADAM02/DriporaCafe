<script setup lang="ts">
import { cafe } from '~~/data/cafe'
import { beans } from '~~/data/beans'
import { menu } from '~~/data/menu'
import { useLocalized, usePrice } from '~/composables/useLocalized'
import { useCafeClock } from '~/composables/useCafeClock'
import { usePageSeo } from '~/composables/usePageSeo'
import { useCafeJsonLd } from '~/composables/useCafeJsonLd'

const { t } = useI18n()
const l = useLocalized()
const price = usePrice()
const { phase } = useCafeClock()

const mood = computed(() => phase.value ?? 'neutral')
const night = computed(() => phase.value === 'night')

// Illustration per signature drink, used until real photos are set on the menu item.
const illustrations: Record<string, { component: ReturnType<typeof resolveComponent>; alt: string }> = {
  'pistachio-latte': { component: resolveComponent('IlloLatte'), alt: 'illo.latte' },
  'iced-pistachio-latte': { component: resolveComponent('IlloIced'), alt: 'illo.iced' }
}

const signatures = menu.flatMap(category =>
  category.items
    .filter(item => item.tags?.includes('signature'))
    .map(item => ({ ...item, category: category.name, illo: illustrations[item.id] }))
)
const teaserBeans = beans.slice(0, 3)

usePageSeo('home')
useCafeJsonLd()
</script>

<template>
  <div>
    <!-- Hero: tone follows Riyadh time, computed on the client -->
    <section :class="night ? 'on-dark grain bg-night text-foam' : 'bg-crema text-roast'">
      <div class="container-page grid items-center gap-8 py-16 md:grid-cols-[1.15fr_1fr] md:py-28">
        <div>
          <p class="font-display text-lg md:text-xl" :class="night ? 'text-pistachio' : 'text-pistachio-deep'">
            {{ t(`home.greeting.${mood}`) }}
          </p>
          <!-- Reserve two lines so the client-side headline swap doesn't shift the layout -->
          <h1 class="mt-3 min-h-[2lh] text-5xl font-bold md:text-7xl">{{ t(`home.headline.${mood}`) }}</h1>
          <p class="mt-6 max-w-prose text-lg md:text-xl" :class="night ? 'text-foam/80' : 'text-stone'">{{ t('home.lede') }}</p>

          <div class="mt-9 flex flex-wrap gap-3">
            <NuxtLinkLocale
              to="/menu"
              class="btn"
              :class="night ? 'bg-foam text-night hover:bg-pistachio' : 'btn-primary'"
            >
              {{ t('home.ctaMenu') }}
            </NuxtLinkLocale>
            <a :href="cafe.mapsUrl" target="_blank" rel="noopener" class="btn btn-outline" :class="night ? 'text-foam' : 'text-roast'">
              <IconDirections class="size-5 rtl:-scale-x-100" />
              {{ t('contact.directions') }}
            </a>
          </div>

          <OpenStatus class="mt-6" :on-dark="night" />
        </div>

        <div class="mx-auto w-full max-w-60 md:max-w-none">
          <HeroHorizon :phase="phase" />
        </div>
      </div>
    </section>

    <!-- Signature drinks -->
    <section class="bg-pistachio-wash" aria-labelledby="signature-title">
      <div class="container-page grid gap-12 py-20 md:grid-cols-[1fr_2fr] md:items-center md:py-28">
        <div>
          <h2 id="signature-title" class="text-4xl font-bold md:text-5xl">{{ t('home.signatureTitle') }}</h2>
          <p class="mt-4 text-lg text-stone">{{ t('home.signatureLede') }}</p>
          <NuxtLinkLocale to="/menu" class="link mt-6 inline-flex min-h-11 items-center gap-2">
            {{ t('home.ctaMenu') }}
            <IconArrow class="size-4 rtl:-scale-x-100" />
          </NuxtLinkLocale>
        </div>
        <ul class="grid grid-cols-2 gap-4 md:gap-8">
          <li v-for="item in signatures" :key="item.id">
            <MediaFrame tone="foam" :photo="item.image" :alt="item.illo ? t(item.illo.alt) : l(item.name)">
              <component :is="item.illo.component" v-if="item.illo" class="size-full" />
            </MediaFrame>
            <p class="mt-4 font-display text-lg font-semibold md:text-xl">{{ l(item.name) }}</p>
            <p class="mt-1 flex justify-between gap-2 text-sm text-stone">
              <span>{{ l(item.category) }}</span>
              <span class="font-display font-medium text-roast">{{ item.price === null ? '' : price(item.price) }}</span>
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- A day at DRIPORA: the Fajr-to-Fajr idea, spelled out -->
    <section class="container-page py-20 md:py-28" aria-labelledby="day-title">
      <h2 id="day-title" class="text-4xl font-bold md:text-5xl">{{ t('day.title') }}</h2>
      <p class="mt-4 max-w-prose text-lg text-stone">{{ t('day.lede') }}</p>
      <DayStrip class="mt-12" />
    </section>

    <!-- Beans teaser -->
    <section class="on-dark grain bg-roast text-foam" aria-labelledby="beans-title">
      <div class="container-page grid gap-12 py-20 md:grid-cols-[1fr_2fr] md:items-center md:py-28">
        <div>
          <h2 id="beans-title" class="text-4xl font-bold md:text-5xl">{{ t('home.beansTitle') }}</h2>
          <p class="mt-4 text-lg text-foam/80">{{ t('home.beansLede') }}</p>
          <NuxtLinkLocale to="/beans" class="btn mt-7 bg-foam text-roast hover:bg-pistachio">{{ t('home.beansCta') }}</NuxtLinkLocale>
        </div>
        <ul class="grid grid-cols-3 gap-3 md:gap-6">
          <li v-for="bean in teaserBeans" :key="bean.id">
            <NuxtLinkLocale :to="{ path: '/beans', hash: `#${bean.id}` }" class="group block">
              <div class="overflow-hidden rounded-sm bg-night">
                <!-- Decorative: the name is the caption right below -->
                <img
                  :src="bean.image.replace('.webp', '-480.webp')"
                  alt=""
                  width="480"
                  height="480"
                  loading="lazy"
                  decoding="async"
                  class="aspect-square w-full object-cover transition duration-500 ease-out motion-safe:group-hover:scale-105 group-hover:brightness-105"
                >
              </div>
              <p class="mt-3 text-sm font-medium underline-offset-4 group-hover:underline">{{ l(bean.name) }}</p>
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
    </section>

    <!-- Visit us -->
    <section class="container-page py-20 md:py-28" aria-labelledby="visit-title">
      <div class="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 id="visit-title" class="text-4xl font-bold md:text-5xl">{{ t('home.visitTitle') }}</h2>
          <p class="mt-4 text-lg text-stone">{{ t('home.visitLede') }}</p>
          <VisitSummary class="mt-8" />
        </div>
        <MediaFrame ratio="4 / 3" tone="night" :photo="cafe.photos.storefront" :alt="t('illo.storefront')">
          <IlloStorefront class="size-full" />
        </MediaFrame>
      </div>
    </section>
  </div>
</template>
