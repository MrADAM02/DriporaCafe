<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const head = useLocaleHead({ dir: true, lang: true, seo: false })

useHead(() => ({ htmlAttrs: head.value.htmlAttrs }))
useSeoMeta({
  title: () => t('seo.notFound.title'),
  description: () => t('seo.notFound.description'),
  robots: 'noindex'
})
</script>

<template>
  <NuxtLayout>
    <section class="container-page flex flex-col items-start py-20 md:py-32">
      <p class="font-display text-6xl font-bold text-cherry md:text-8xl">{{ props.error.statusCode || 404 }}</p>
      <h1 class="mt-4 text-3xl font-bold md:text-4xl">{{ t('notFound.title') }}</h1>
      <p class="mt-3 text-lg text-stone">{{ t('notFound.lede') }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <NuxtLinkLocale to="/" class="btn btn-primary">{{ t('notFound.home') }}</NuxtLinkLocale>
        <NuxtLinkLocale to="/menu" class="btn btn-outline">{{ t('notFound.menu') }}</NuxtLinkLocale>
      </div>
    </section>
  </NuxtLayout>
</template>
