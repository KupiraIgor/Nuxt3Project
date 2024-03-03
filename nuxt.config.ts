export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/index.scss'],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],

    '@nuxtjs/eslint-module',
    '@nuxt/image',
  ],
  imports: {
    dirs: ['./store'],
  },
  image: {
    provider: 'netlify',
  },
});
