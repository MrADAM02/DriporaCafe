<script setup lang="ts">
import { cafe } from '~~/data/cafe'

defineProps<{ onDark?: boolean }>()

const { t, locale } = useI18n()
const { open } = useCafeClock()

const openTime = computed(() => formatTime(cafe.hours.open, locale.value))
const closeTime = computed(() => formatTime(cafe.hours.close, locale.value))
</script>

<template>
  <p class="inline-flex min-h-8 items-center gap-2 text-sm">
    <!-- SSR / pre-mount: neutral hours text, so no stale status gets baked into the static HTML. -->
    <template v-if="open === null">
      <IconClock class="size-4 shrink-0" />
      <span>{{ t('status.pending', { open: openTime, close: closeTime }) }}</span>
    </template>
    <template v-else>
      <span
        class="size-2.5 shrink-0 rounded-full"
        :class="open ? (onDark ? 'bg-pistachio' : 'bg-pistachio-deep') : 'bg-cherry'"
        aria-hidden="true"
      />
      <span class="font-medium">{{ open ? t('status.open') : t('status.closed') }}</span>
      <span :class="onDark ? 'text-foam/75' : 'text-stone'">
        · {{ open ? t('status.closesAt', { time: closeTime }) : t('status.opensAt', { time: openTime }) }}
      </span>
    </template>
  </p>
</template>
