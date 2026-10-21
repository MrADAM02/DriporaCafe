<script setup lang="ts">
import { menu } from '~~/data/menu'

const { t } = useI18n()
const l = useLocalized()
const price = usePrice()
</script>

<template>
  <div>
    <div class="container-page pt-10 pb-6 md:pt-16">
      <h1 class="text-4xl font-bold md:text-5xl">{{ t('menu.title') }}</h1>
      <p class="mt-2 text-stone">{{ t('menu.lede') }}</p>
    </div>

    <!-- Category jump links, sticky under the header -->
    <nav :aria-label="t('menu.jump')" class="sticky top-16 z-30 border-y border-line bg-foam/95 backdrop-blur supports-[backdrop-filter]:bg-foam/85">
      <ul class="container-page flex gap-2 overflow-x-auto py-2">
        <li v-for="category in menu" :key="category.id" class="shrink-0">
          <a
            :href="`#${category.id}`"
            class="inline-flex min-h-11 items-center rounded-full border border-line bg-foam px-4 font-display text-sm font-medium hover:border-roast"
          >
            {{ l(category.name) }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="container-page max-w-3xl pb-16 md:pb-24">
      <section
        v-for="category in menu"
        :id="category.id"
        :key="category.id"
        class="scroll-mt-32 pt-10"
        :aria-labelledby="`${category.id}-title`"
      >
        <h2 :id="`${category.id}-title`" class="border-b-2 border-roast pb-2 text-2xl font-bold">
          {{ l(category.name) }}
        </h2>

        <ul>
          <li
            v-for="item in category.items"
            :key="item.id"
            class="flex min-h-14 items-baseline gap-3 border-b border-line py-3"
          >
            <span class="min-w-0 text-lg">
              {{ l(item.name) }}
              <span
                v-if="item.tags?.includes('signature')"
                class="ms-2 inline-flex items-center gap-1 align-middle text-xs font-medium text-pistachio-deep"
              >
                <IconStar class="size-3.5" />
                {{ t('menu.signature') }}
              </span>
            </span>
            <span class="flex-1 translate-y-[-0.3em] border-b border-dotted border-stone-soft/60" aria-hidden="true" />
            <span class="shrink-0 font-display font-medium tabular-nums">
              {{ item.price === null ? '' : price(item.price) }}
            </span>
          </li>
        </ul>

        <p v-if="category.id === 'drip'" class="mt-5 rounded-sm bg-crema px-4 py-3 text-sm">
          {{ t('menu.beansNote') }}
          <NuxtLinkLocale to="/beans" class="link ms-1 inline-flex items-center gap-1">
            {{ t('menu.beansLink') }}
            <IconArrow class="size-3.5 rtl:-scale-x-100" />
          </NuxtLinkLocale>
        </p>
      </section>
    </div>
  </div>
</template>
