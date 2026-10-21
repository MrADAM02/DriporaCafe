<script setup lang="ts">
import { cafe } from '~~/data/cafe'

const { t } = useI18n()
const hasSocials = Object.values(cafe.socials).some(Boolean)

usePageSeo('visit')
useCafeJsonLd()
</script>

<template>
  <div class="container-page pt-10 pb-16 md:pt-16 md:pb-24">
    <h1 class="text-5xl font-bold md:text-6xl">{{ t('visit.title') }}</h1>
    <p class="mt-3 max-w-prose text-lg text-stone">{{ t('visit.lede') }}</p>

    <div class="mt-10 grid gap-10 md:grid-cols-2">
      <div>
        <VisitSummary />

        <div v-if="hasSocials" class="mt-10">
          <h2 class="text-lg font-semibold">{{ t('contact.follow') }}</h2>
          <SocialLinks class="mt-3" />
        </div>

        <div v-if="cafe.deliveryApps.length" class="mt-10">
          <h2 class="text-lg font-semibold">{{ t('visit.delivery') }}</h2>
          <ul class="mt-3 flex flex-wrap gap-3">
            <li v-for="app in cafe.deliveryApps" :key="app.url">
              <a :href="app.url" target="_blank" rel="noopener" class="btn btn-outline">{{ app.name }}</a>
            </li>
          </ul>
        </div>
      </div>

      <section :aria-label="t('visit.map')">
        <MapEmbed />
        <a :href="cafe.mapsUrl" target="_blank" rel="noopener" class="link mt-3 inline-flex min-h-11 items-center gap-2">
          {{ t('visit.openInMaps') }}
          <IconArrow class="size-4 rtl:-scale-x-100" />
        </a>
      </section>
    </div>
  </div>
</template>
