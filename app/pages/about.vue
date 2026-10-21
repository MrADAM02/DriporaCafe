<script setup lang="ts">
// TODO(client): replace with the real brand story when it arrives.
import { cafe } from '~~/data/cafe'

const { t } = useI18n()

usePageSeo('about')
</script>

<template>
  <div class="container-page pt-10 pb-16 md:pt-16 md:pb-24">
    <div class="grid gap-12 md:grid-cols-[3fr_2fr] md:items-start">
      <article class="max-w-prose">
        <h1 class="text-5xl font-bold md:text-6xl">{{ t('about.title') }}</h1>
        <p class="mt-4 font-display text-xl text-pistachio-deep">{{ t('about.lede') }}</p>
        <p class="mt-8 text-lg">{{ t('about.p1') }}</p>
        <p class="mt-5 text-lg">{{ t('about.p2') }}</p>
        <p class="mt-5 text-lg">{{ t('about.p3') }}</p>
        <div class="mt-10 flex flex-wrap gap-3">
          <NuxtLinkLocale to="/visit" class="btn btn-primary">{{ t('about.cta') }}</NuxtLinkLocale>
          <NuxtLinkLocale to="/menu" class="btn btn-outline">{{ t('home.ctaMenu') }}</NuxtLinkLocale>
        </div>
      </article>
      <div class="grid gap-6">
        <img
          src="/images/logo.webp"
          :alt="t('seo.siteName')"
          width="296"
          height="289"
          loading="lazy"
          class="mx-auto h-auto w-48 md:w-56"
        >
        <MediaFrame ratio="900 / 610" :photo="cafe.photos.brewing" :alt="t('about.photoAlt')" />
      </div>
    </div>
  </div>
</template>
