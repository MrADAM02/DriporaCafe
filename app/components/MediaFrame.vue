<script setup lang="ts">
// Shows the real photo when one exists, otherwise the brand illustration passed in the slot.
// Illustrations are clearly drawn, never photo-like, so nothing pretends to be the café.
withDefaults(defineProps<{
  ratio?: string
  tone?: 'foam' | 'crema' | 'pistachio' | 'night'
  photo?: string
  alt: string
}>(), { ratio: '1 / 1', tone: 'crema' })
</script>

<template>
  <div
    class="relative overflow-hidden rounded-sm"
    :class="{
      'bg-foam': tone === 'foam',
      'bg-crema': tone === 'crema',
      'bg-pistachio-wash': tone === 'pistachio',
      'grain bg-night': tone === 'night'
    }"
    :style="{ aspectRatio: ratio }"
  >
    <img
      v-if="photo"
      :src="photo"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 size-full object-cover"
    >
    <div v-else role="img" :aria-label="alt" class="absolute inset-0 flex items-center justify-center p-[8%]">
      <slot />
    </div>
  </div>
</template>
