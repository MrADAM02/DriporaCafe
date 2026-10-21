<script setup lang="ts">
import { useLocalized } from '~/composables/useLocalized';
import { cafe } from '~~/data/cafe'

const { t } = useI18n()
const l = useLocalized()
</script>

<template>
  <div>
    <OpenStatus />
    <dl class="mt-6 grid gap-5">
      <div>
        <dt class="flex items-center gap-3 text-sm text-stone"><IconPin class="size-5 shrink-0" />{{ t('contact.address') }}</dt>
        <dd class="ps-8">{{ l(cafe.address) }}</dd>
      </div>
      <div>
        <dt class="flex items-center gap-3 text-sm text-stone"><IconClock class="size-5 shrink-0" />{{ t('hours.label') }}</dt>
        <dd class="ps-8"><HoursLine /></dd>
      </div>
      <div>
        <dt class="flex items-center gap-3 text-sm text-stone"><IconPhone class="size-5 shrink-0" />{{ t('contact.phone') }}</dt>
        <dd class="ps-8"><a :href="`tel:${cafe.phone}`" class="link"><bdi dir="ltr">{{ cafe.phone }}</bdi></a></dd>
      </div>
    </dl>
    <div class="mt-8 flex flex-wrap gap-3">
      <a :href="cafe.mapsUrl" target="_blank" rel="noopener" class="btn btn-primary">
        <IconDirections class="size-5 rtl:-scale-x-100" />
        {{ t('contact.directions') }}
      </a>
      <WhatsAppButton tone="outline" />
    </div>
  </div>
</template>
