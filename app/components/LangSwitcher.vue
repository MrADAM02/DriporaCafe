<script setup lang="ts">
const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const target = computed(() => (locale.value === 'ar' ? 'en' : 'ar'))
</script>

<template>
  <NuxtLink
    :to="switchLocalePath(target)"
    :lang="target"
    :hreflang="target"
    :aria-label="t('lang.label')"
    class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 font-display text-sm font-medium text-roast hover:bg-crema"
  >
    <span class="md:hidden">{{ t('lang.short') }}</span>
    <span class="hidden md:inline">{{ t('lang.name') }}</span>
  </NuxtLink>
</template>
