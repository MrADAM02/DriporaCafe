<script setup lang="ts">
import type { BeanProduct } from '~~/data/beans'

const props = withDefaults(defineProps<{
  product?: BeanProduct
  label?: string
  ariaLabel?: string
  size?: 'sm' | 'md'
  tone?: 'solid' | 'outline' | 'on-dark'
}>(), { size: 'md', tone: 'solid' })

const { t } = useI18n()
const href = useWhatsAppLink(() => props.product)
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    :aria-label="ariaLabel ? `${ariaLabel} ${t('external')}` : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors"
    :class="[
      size === 'sm' ? 'min-h-11 px-4 text-sm' : 'min-h-12 px-6',
      tone === 'solid' && 'bg-pistachio-deep text-white hover:bg-roast',
      tone === 'outline' && 'border border-roast/25 text-roast hover:border-roast',
      tone === 'on-dark' && 'on-dark bg-pistachio text-night hover:bg-foam'
    ]"
  >
    <IconWhatsapp class="size-5 shrink-0" />
    <span>{{ label ?? t('whatsapp.chat') }}</span>
  </a>
</template>
