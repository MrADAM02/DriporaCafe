<script setup lang="ts">
import { cafe } from '~~/data/cafe'
import { useCafeClock } from '~/composables/useCafeClock'

const { t, locale } = useI18n()
const { now, open } = useCafeClock()

const stops = [
  { key: 'fajr', time: '05:00', icon: 'sun' },
  { key: 'noon', time: '12:00', icon: 'sun' },
  { key: 'evening', time: '18:00', icon: 'moon' },
  { key: 'midnight', time: '00:00', icon: 'moon' },
  { key: 'last', time: '03:00', icon: 'moon' }
] as const

const openAt = toMinutes(cafe.hours.open)
/** Minutes since opening, so the day reads 05:00 → 03:00 in order. */
const sinceOpen = (minutes: number) => (minutes - openAt + 1440) % 1440

// Client-only: which stop we're in right now (none while closed).
const current = computed(() => {
  if (!now.value || !open.value) return -1
  const elapsed = sinceOpen(minutesInZone(now.value, cafe.hours.timezone))
  return stops.findLastIndex(stop => sinceOpen(toMinutes(stop.time)) <= elapsed)
})
</script>

<template>
  <ol class="relative grid gap-8 md:grid-cols-5 md:gap-6">
    <!-- the line that runs through the day -->
    <span class="absolute inset-y-2 start-[11px] w-px bg-line md:inset-x-0 md:inset-y-auto md:top-[11px] md:h-px md:w-auto" aria-hidden="true" />

    <li
      v-for="(stop, i) in stops"
      :key="stop.key"
      class="relative grid grid-cols-[24px_1fr] gap-x-4 md:grid-cols-1 md:gap-y-4"
      :aria-current="i === current ? 'time' : undefined"
    >
      <span
        class="relative z-10 flex size-6 items-center justify-center rounded-full border-2"
        :class="i === current ? 'border-pistachio-deep bg-pistachio-deep text-white' : 'border-line bg-foam text-stone'"
        aria-hidden="true"
      >
        <svg v-if="stop.icon === 'sun'" viewBox="0 0 12 12" class="size-3"><circle cx="6" cy="6" r="3.2" fill="currentColor" /></svg>
        <svg v-else viewBox="0 0 12 12" class="size-3"><path d="M7 1.5a4.5 4.5 0 1 0 3.6 7.2A3.6 3.6 0 1 1 7 1.5Z" fill="currentColor" /></svg>
      </span>
      <div>
        <p class="flex items-baseline gap-2 text-sm text-stone">
          <span class="tabular-nums">{{ formatTime(stop.time, locale) }}</span>
          <span v-if="i === current" class="font-medium text-pistachio-deep">· {{ t('day.now') }}</span>
        </p>
        <h3 class="mt-1 text-lg font-semibold">{{ t(`day.stops.${stop.key}.title`) }}</h3>
        <p class="mt-1 text-stone">{{ t(`day.stops.${stop.key}.text`) }}</p>
      </div>
    </li>
  </ol>
</template>
