<script setup lang="ts">
const { t } = useI18n()

// Copy from the client's own site (screenshot supplied 2026-10-21). Icons are line drawings in the brand stroke.
const points = ['flow', 'ratio', 'filter', 'timing'] as const
</script>

<template>
  <ol class="grid gap-x-10 gap-y-10 sm:grid-cols-2">
    <li v-for="(key, i) in points" :key="key" class="border-t border-line pt-6">
      <div class="flex items-center justify-between">
        <svg viewBox="0 0 32 32" class="size-9 text-pistachio-deep" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <!-- gooseneck kettle -->
          <g v-if="key === 'flow'"><path d="M8 13h12v11a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3Z" /><path d="M20 15c3 0 4 2 4 4" /><path d="M8 16c-3-1-5-4-5-8 2 0 3 1 4 3" /><path d="M11 13v-2h6v2" /></g>
          <!-- scale -->
          <g v-else-if="key === 'ratio'"><rect x="5" y="20" width="22" height="7" rx="2" /><path d="M9 20v-3h14v3" /><path d="M12 13a4 4 0 0 1 8 0Z" /><circle cx="16" cy="23.5" r="1" fill="currentColor" stroke="none" /></g>
          <!-- paper filter -->
          <g v-else-if="key === 'filter'"><path d="M6 8h20l-7 16h-6Z" /><path d="M12 8l3 16M20 8l-3 16" opacity="0.5" /></g>
          <!-- timer -->
          <g v-else><circle cx="16" cy="18" r="9" /><path d="M16 18v-5M13 5h6M16 5v4M23.5 10.5l1.5-1.5" /></g>
        </svg>
        <span class="font-display text-3xl font-bold text-line tabular-nums" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold">{{ t(`flavors.points.${key}.title`) }}</h3>
      <p class="mt-2 text-stone">{{ t(`flavors.points.${key}.text`) }}</p>
    </li>
  </ol>
</template>
