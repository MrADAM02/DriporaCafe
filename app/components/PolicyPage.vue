<script setup lang="ts">
// Policy text lives in the locale files under `returns.*` / `privacy.*`.
// TODO(client): confirm final policy wording; both are drafts ported from the old LAK store.
defineProps<{ policy: 'returns' | 'privacy' }>()
const { t } = useI18n()
</script>

<template>
  <article class="container-page max-w-3xl pt-10 pb-16 md:pt-16 md:pb-24">
    <h1 class="text-4xl font-bold">{{ t(`policies.${policy}`) }}</h1>
    <p class="mt-4 rounded-sm bg-crema px-4 py-3 text-sm text-stone">{{ t('policies.draft') }}</p>
    <p class="mt-8 text-lg">{{ t(`${policy}.intro`) }}</p>
    <template v-for="n in 3" :key="n">
      <h2 class="mt-10 text-xl font-semibold">{{ t(`${policy}.h${n}`) }}</h2>
      <p class="mt-3">{{ t(`${policy}.p${n}`) }}</p>
    </template>
  </article>
</template>
