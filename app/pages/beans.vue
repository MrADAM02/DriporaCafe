<script setup lang="ts">
import { useLocalized, usePrice } from '~/composables/useLocalized'
import { usePageSeo } from '~/composables/usePageSeo'
import { beans, type BeanType } from '~~/data/beans'

const { t } = useI18n()
const l = useLocalized()
const price = usePrice()

const groups = (['filter', 'espresso'] as BeanType[]).map(type => ({
  type,
  items: beans.filter(bean => bean.type === type)
}))

usePageSeo('beans')
</script>

<template>
  <div class="container-page pt-10 pb-16 md:pt-16 md:pb-24">
    <h1 class="text-4xl font-bold md:text-5xl">{{ t('beans.title') }}</h1>
    <p class="mt-3 max-w-prose text-lg text-stone">{{ t('beans.lede') }}</p>

    <section
      v-for="group in groups"
      :key="group.type"
      class="mt-14"
      :aria-labelledby="`group-${group.type}`"
    >
      <h2 :id="`group-${group.type}`" class="border-b-2 border-roast pb-2 text-2xl font-bold">
        {{ t(`beans.group.${group.type}`) }}
      </h2>

      <ul class="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        <li v-for="bean in group.items" :key="bean.id" class="flex flex-col">
          <img
            :src="bean.image"
            :srcset="`${bean.image.replace('.webp', '-480.webp')} 480w, ${bean.image} 1000w`"
            sizes="(min-width: 48rem) 33vw, (min-width: 40rem) 50vw, 100vw"
            :alt="`${l(bean.name)}, ${t(`beans.type.${bean.type}`)}`"
            width="1000"
            height="1000"
            loading="lazy"
            decoding="async"
            class="aspect-square w-full rounded-sm bg-crema object-cover"
          >
          <div class="mt-4 flex items-baseline justify-between gap-3">
            <h3 class="text-xl font-semibold">{{ l(bean.name) }}</h3>
            <p class="shrink-0 font-display font-medium">{{ price(bean.price) }}</p>
          </div>
          <p class="text-sm text-stone">
            {{ t(`beans.type.${bean.type}`) }}
            <template v-if="bean.weight"> · <bdi>{{ bean.weight }}</bdi></template>
          </p>
          <p class="mt-1 text-sm text-stone">{{ bean.notes ? l(bean.notes) : t('beans.notesSoon') }}</p>
          <WhatsAppButton
            :product="bean"
            :label="t('whatsapp.order')"
            :aria-label="t('whatsapp.orderLabel', { name: l(bean.name) })"
            class="mt-5 self-start"
          />
        </li>
      </ul>
    </section>
  </div>
</template>
