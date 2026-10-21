<script setup lang="ts">
import { cafe } from '~~/data/cafe'

const { t, locale } = useI18n()
const open = computed(() => formatTime(cafe.hours.open, locale.value))
const close = computed(() => formatTime(cafe.hours.close, locale.value))
</script>

<template>
  <span>{{ t('hours.daily') }}, {{ t('hours.range', { open, close }) }}</span>
</template>
