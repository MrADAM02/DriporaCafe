import tailwindcss from '@tailwindcss/vite'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || process.env.URL || 'https://dripora.netlify.app'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  runtimeConfig: {
    public: { siteUrl }
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [{ name: 'theme-color', content: '#4C2B12' }]
    }
  },

  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'ar',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'ar', language: 'ar-SA', dir: 'rtl', name: 'العربية', file: 'ar.json' },
      { code: 'en', language: 'en-US', dir: 'ltr', name: 'English', file: 'en.json' }
    ]
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      subsets: ['arabic', 'latin']
    },
    families: [
      { name: 'Alexandria', provider: 'google' },
      { name: 'IBM Plex Sans Arabic', provider: 'google' }
    ]
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en'],
      failOnError: true
    }
  }
})
