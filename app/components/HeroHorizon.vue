<script setup lang="ts">
// The one moment on the site: a horizon that holds a rising sun (morning) or a crescent (night).
import type { DayPhase } from '~/utils/hours'

defineProps<{ phase: DayPhase | null }>()
</script>

<template>
  <svg viewBox="0 0 400 300" class="h-auto w-full" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="above-horizon">
        <rect x="0" y="0" width="400" height="210" />
      </clipPath>
    </defs>

    <!-- Morning: sun breaking the horizon -->
    <g class="transition-opacity duration-700" :class="phase === 'night' ? 'opacity-0' : 'opacity-100'">
      <circle cx="200" cy="214" r="62" fill="var(--cherry)" clip-path="url(#above-horizon)" />
      <g stroke="var(--cherry)" stroke-width="3" stroke-linecap="round" opacity="0.45">
        <line x1="150" y1="228" x2="250" y2="228" />
        <line x1="166" y1="242" x2="234" y2="242" />
        <line x1="184" y1="256" x2="216" y2="256" />
      </g>
    </g>

    <!-- Night: crescent and a few stars -->
    <g class="transition-opacity duration-700" :class="phase === 'night' ? 'opacity-100' : 'opacity-0'">
      <path d="M262 52a52 52 0 1 0 46 76 42 42 0 1 1-46-76Z" fill="var(--foam)" />
      <g fill="var(--stone-soft)">
        <circle cx="96" cy="70" r="2.5" />
        <circle cx="150" cy="128" r="2" />
        <circle cx="64" cy="160" r="1.5" />
        <circle cx="338" cy="176" r="2" />
        <circle cx="196" cy="40" r="1.5" />
      </g>
    </g>

    <line x1="0" y1="210" x2="400" y2="210" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
  </svg>
</template>
