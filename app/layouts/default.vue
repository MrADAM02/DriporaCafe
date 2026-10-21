<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a href="#main" class="sr-only z-50 rounded-full bg-roast px-4 py-2 text-foam focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-3">
      {{ t('skip') }}
    </a>
    <AppHeader />
    <main id="main" class="flex-1" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
