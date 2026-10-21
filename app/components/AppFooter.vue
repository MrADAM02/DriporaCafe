<script setup lang="ts">
import { useLocalized } from '~/composables/useLocalized'
import { cafe } from '~~/data/cafe'

const { t } = useI18n()
const l = useLocalized()
const year = new Date().getFullYear()
const hasSocials = Object.values(cafe.socials).some(Boolean)
</script>

<template>
  <footer class="on-dark bg-roast text-foam">
    <div class="container-page grid gap-10 py-14 md:grid-cols-3">
      <div>
        <img src="/images/logo-mark-sm.webp" alt="" width="100" height="90" class="h-12 w-auto brightness-0 invert" loading="lazy">
        <p class="mt-4 font-display text-xl">{{ l(cafe.name) }}</p>
        <p class="mt-1 text-foam/75">{{ t('home.headline.neutral') }}</p>
      </div>

      <dl class="grid gap-5">
        <div>
          <dt class="text-sm text-foam/70">{{ t('hours.label') }}</dt>
          <dd><HoursLine /></dd>
        </div>
        <div>
          <dt class="text-sm text-foam/70">{{ t('contact.address') }}</dt>
          <dd>
            <a :href="cafe.mapsUrl" target="_blank" rel="noopener" class="underline decoration-foam/30 underline-offset-4 hover:decoration-foam">
              {{ l(cafe.address) }}
            </a>
          </dd>
        </div>
        <div>
          <dt class="text-sm text-foam/70">{{ t('contact.phone') }}</dt>
          <dd>
            <a :href="`tel:${cafe.phone}`" class="underline decoration-foam/30 underline-offset-4 hover:decoration-foam">
              <bdi dir="ltr">{{ cafe.phone }}</bdi>
            </a>
          </dd>
        </div>
      </dl>

      <div class="grid content-start gap-6">
        <WhatsAppButton tone="on-dark" class="justify-self-start" />
        <div v-if="hasSocials">
          <p class="mb-2 text-sm text-foam/70">{{ t('contact.follow') }}</p>
          <SocialLinks />
        </div>
        <nav :aria-label="t('footer.policies')">
          <ul class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li><NuxtLinkLocale to="/policies/returns" class="inline-flex min-h-11 items-center underline decoration-foam/30 underline-offset-4 hover:decoration-foam">{{ t('policies.returns') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/policies/privacy" class="inline-flex min-h-11 items-center underline decoration-foam/30 underline-offset-4 hover:decoration-foam">{{ t('policies.privacy') }}</NuxtLinkLocale></li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="border-t border-foam/15">
      <p class="container-page py-5 text-sm text-foam/70">{{ t('footer.rights', { year }) }}</p>
    </div>
  </footer>
</template>
