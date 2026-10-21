<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const links = [
  { to: '/menu', key: 'menu' },
  { to: '/beans', key: 'beans' },
  { to: '/visit', key: 'visit' },
  { to: '/about', key: 'about' }
] as const

const open = ref(false)
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-foam/95 backdrop-blur supports-[backdrop-filter]:bg-foam/85">
    <div class="container-page flex h-16 items-center gap-2">
      <NuxtLinkLocale to="/" class="me-auto flex items-center gap-2.5" :aria-label="t('nav.logo')">
        <img src="/images/logo-mark.webp" alt="" width="180" height="162" class="h-9 w-auto">
        <span class="hidden font-display text-lg font-semibold tracking-wide text-roast min-[400px]:inline">{{ t('brand') }}</span>
      </NuxtLinkLocale>

      <nav :aria-label="t('nav.label')" class="hidden md:block">
        <ul class="flex items-center gap-1">
          <li v-for="link in links" :key="link.key">
            <NuxtLinkLocale
              :to="link.to"
              class="inline-flex min-h-11 items-center rounded-full px-4 text-roast hover:bg-crema aria-[current=page]:bg-crema aria-[current=page]:font-medium"
            >
              {{ t(`nav.${link.key}`) }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </nav>

      <LangSwitcher />

      <WhatsAppButton size="sm" :label="t('whatsapp.short')" :aria-label="t('whatsapp.chat')" />

      <button
        type="button"
        class="inline-flex size-11 items-center justify-center rounded-full text-roast hover:bg-crema md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        :aria-label="open ? t('nav.close') : t('nav.open')"
        @click="open = !open"
      >
        <IconClose v-if="open" class="size-6" />
        <IconMenu v-else class="size-6" />
      </button>
    </div>

    <nav
      v-show="open"
      id="mobile-nav"
      :aria-label="t('nav.label')"
      class="border-t border-line md:hidden"
    >
      <ul class="container-page py-2">
        <li v-for="link in links" :key="link.key">
          <NuxtLinkLocale
            :to="link.to"
            class="flex min-h-12 items-center border-b border-line/70 font-display text-lg text-roast last:border-0 aria-[current=page]:text-pistachio-deep"
          >
            {{ t(`nav.${link.key}`) }}
          </NuxtLinkLocale>
        </li>
      </ul>
    </nav>
  </header>
</template>
