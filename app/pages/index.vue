<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="container-page py-16">
    <h1 class="text-4xl font-bold">{{ t('home.title') }}</h1>
    <p class="mt-4 max-w-prose text-start text-stone">{{ t('home.lede') }}</p>
  </section>
</template>
