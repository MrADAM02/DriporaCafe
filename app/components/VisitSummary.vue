<script setup lang="ts">
import { cafe } from '~~/data/cafe'

const { t } = useI18n()
const l = useLocalized()
</script>

<template>
  <div>
    <OpenStatus />
    <dl class="mt-6 grid gap-5">
      <div class="flex gap-3">
        <IconPin class="mt-1 size-5 shrink-0 text-stone" />
        <div>
          <dt class="text-sm text-stone">{{ t('contact.address') }}</dt>
          <dd>{{ l(cafe.address) }}</dd>
        </div>
      </div>
      <div class="flex gap-3">
        <IconClock class="mt-1 size-5 shrink-0 text-stone" />
        <div>
          <dt class="text-sm text-stone">{{ t('hours.label') }}</dt>
          <dd><HoursLine /></dd>
        </div>
      </div>
      <div class="flex gap-3">
        <IconPhone class="mt-1 size-5 shrink-0 text-stone" />
        <div>
          <dt class="text-sm text-stone">{{ t('contact.phone') }}</dt>
          <dd><a :href="`tel:${cafe.phone}`" class="link"><bdi dir="ltr">{{ cafe.phone }}</bdi></a></dd>
        </div>
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
