<script setup lang="ts">
// Neutral tone block until the client's real photos arrive. No stock or AI imagery.
withDefaults(defineProps<{ ratio?: string }>(), { ratio: '4 / 5' })
const { t } = useI18n()
</script>

<template>
  <div class="relative overflow-hidden rounded-sm bg-crema" :style="{ aspectRatio: ratio }" role="img" :aria-label="t('photo')">
    <span class="absolute bottom-3 start-3 text-xs text-stone">{{ t('photo') }}</span>
  </div>
</template>
