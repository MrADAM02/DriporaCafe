<script setup lang="ts">
// Click-to-load: nothing from Google is requested until the visitor asks for the map.
import { cafe } from '~~/data/cafe'

const { t, locale } = useI18n()
const loaded = ref(false)
const src = computed(() =>
  `https://maps.google.com/maps?q=${cafe.geo.lat},${cafe.geo.lng}&z=16&hl=${locale.value}&output=embed`
)
</script>

<template>
  <div class="relative aspect-[4/3] overflow-hidden rounded-sm bg-crema">
    <iframe
      v-if="loaded"
      :src="src"
      :title="t('visit.mapTitle')"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="absolute inset-0 size-full border-0"
    />
    <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
      <!-- Quiet map poster: a street grid and a pin, drawn not fetched -->
      <svg viewBox="0 0 200 120" class="absolute inset-0 size-full text-line" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="currentColor" stroke-width="3" fill="none">
          <path d="M-10 40h220M-10 86h220M48-10v140M128-10v140M-10 120 90-10" />
        </g>
      </svg>
      <IconPin class="relative size-10 text-cherry" />
      <button type="button" class="btn btn-primary relative" @click="loaded = true">{{ t('visit.showMap') }}</button>
      <p class="relative text-sm text-stone">{{ t('visit.mapNote') }}</p>
    </div>
  </div>
</template>
