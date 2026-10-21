<script setup lang="ts">
import { cafe } from '~~/data/cafe'
import { beans } from '~~/data/beans'
import { menu } from '~~/data/menu'

const { t } = useI18n()
const l = useLocalized()
const price = usePrice()
const { phase } = useCafeClock()

const mood = computed(() => phase.value ?? 'neutral')
const night = computed(() => phase.value === 'night')

const signatures = menu.flatMap(category =>
  category.items
    .filter(item => item.tags?.includes('signature'))
    .map(item => ({ ...item, category: category.name }))
)
const teaserBeans = beans.slice(0, 3)

usePageSeo('home')
useCafeJsonLd()
</script>

<template>
  <div>
    <!-- Hero: tone follows Riyadh time, computed on the client -->
    <section
      class="transition-colors duration-700"
      :class="night ? 'on-dark bg-night text-foam' : 'bg-crema text-roast'"
    >
      <div class="container-page grid items-center gap-8 py-14 md:grid-cols-[1.15fr_1fr] md:py-24">
        <div>
          <p class="font-display text-lg" :class="night ? 'text-pistachio' : 'text-pistachio-deep'">
            {{ t(`home.greeting.${mood}`) }}
          </p>
          <h1 class="mt-3 text-4xl font-bold md:text-6xl">{{ t(`home.headline.${mood}`) }}</h1>
          <p class="mt-5 max-w-prose text-lg" :class="night ? 'text-foam/80' : 'text-stone'">{{ t('home.lede') }}</p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLinkLocale
              to="/menu"
              class="btn"
              :class="night ? 'bg-foam text-night hover:bg-pistachio' : 'btn-primary'"
            >
              {{ t('home.ctaMenu') }}
            </NuxtLinkLocale>
            <a :href="cafe.mapsUrl" target="_blank" rel="noopener" class="btn btn-outline">
              <IconDirections class="size-5 rtl:-scale-x-100" />
              {{ t('contact.directions') }}
            </a>
          </div>

          <OpenStatus class="mt-6" :on-dark="night" />
        </div>

        <div class="mx-auto w-full max-w-sm md:max-w-none">
          <HeroHorizon :phase="phase" />
        </div>
      </div>
    </section>

    <!-- Signature drinks -->
    <section class="container-page py-16 md:py-24" aria-labelledby="signature-title">
      <div class="grid gap-10 md:grid-cols-[1fr_2fr] md:items-end">
        <div>
          <h2 id="signature-title" class="text-3xl font-bold md:text-4xl">{{ t('home.signatureTitle') }}</h2>
          <p class="mt-3 text-stone">{{ t('home.signatureLede') }}</p>
          <NuxtLinkLocale to="/menu" class="link mt-5 inline-flex min-h-11 items-center gap-2">
            {{ t('home.ctaMenu') }}
            <IconArrow class="size-4 rtl:-scale-x-100" />
          </NuxtLinkLocale>
        </div>
        <ul class="grid grid-cols-2 gap-4 md:gap-6">
          <li v-for="item in signatures" :key="item.id">
            <PhotoPlaceholder ratio="4 / 5" />
            <p class="mt-3 font-display text-lg font-medium">{{ l(item.name) }}</p>
            <p class="flex justify-between gap-2 text-sm text-stone">
              <span>{{ l(item.category) }}</span>
              <span class="text-roast">{{ item.price === null ? '' : price(item.price) }}</span>
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Beans teaser -->
    <section class="border-y border-line bg-white/60" aria-labelledby="beans-title">
      <div class="container-page grid gap-10 py-16 md:grid-cols-[1fr_2fr] md:items-center md:py-24">
        <div>
          <h2 id="beans-title" class="text-3xl font-bold md:text-4xl">{{ t('home.beansTitle') }}</h2>
          <p class="mt-3 text-stone">{{ t('home.beansLede') }}</p>
          <NuxtLinkLocale to="/beans" class="btn btn-primary mt-6">{{ t('home.beansCta') }}</NuxtLinkLocale>
        </div>
        <ul class="grid grid-cols-3 gap-3 md:gap-6">
          <li v-for="bean in teaserBeans" :key="bean.id">
            <img
              :src="bean.image"
              :alt="l(bean.name)"
              width="1000"
              height="1000"
              loading="lazy"
              decoding="async"
              class="aspect-square w-full rounded-sm bg-crema object-cover"
            >
            <p class="mt-2 text-sm font-medium">{{ l(bean.name) }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Visit us -->
    <section class="container-page py-16 md:py-24" aria-labelledby="visit-title">
      <div class="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 id="visit-title" class="text-3xl font-bold md:text-4xl">{{ t('home.visitTitle') }}</h2>
          <p class="mt-3 text-stone">{{ t('home.visitLede') }}</p>
          <VisitSummary class="mt-8" />
        </div>
        <PhotoPlaceholder ratio="4 / 3" />
      </div>
    </section>
  </div>
</template>
