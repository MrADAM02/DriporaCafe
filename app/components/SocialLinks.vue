<script setup lang="ts">
import { cafe } from '~~/data/cafe'

const { t } = useI18n()

const networks = [
  { key: 'instagram', name: 'Instagram', base: 'https://www.instagram.com/', icon: resolveComponent('IconInstagram') },
  { key: 'tiktok', name: 'TikTok', base: 'https://www.tiktok.com/@', icon: resolveComponent('IconTiktok') },
  { key: 'x', name: 'X', base: 'https://x.com/', icon: resolveComponent('IconX') }
] as const

// Icons whose handle is still empty in cafe.ts are hidden.
const links = networks
  .filter(n => cafe.socials[n.key])
  .map(n => ({ ...n, href: n.base + cafe.socials[n.key] }))
</script>

<template>
  <ul v-if="links.length" class="flex gap-2" :aria-label="t('contact.follow')">
    <li v-for="link in links" :key="link.key">
      <a
        :href="link.href"
        target="_blank"
        rel="noopener"
        :aria-label="`${link.name} ${t('external')}`"
        class="inline-flex size-11 items-center justify-center rounded-full border border-current/25 hover:border-current"
      >
        <component :is="link.icon" class="size-5" />
      </a>
    </li>
  </ul>
</template>
