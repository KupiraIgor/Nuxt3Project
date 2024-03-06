export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/index.scss'],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      },
    ],

    '@nuxtjs/eslint-module',
    '@nuxt/image',
  ],
  imports: {
    dirs: ['./stores'],
  },
  image: {
    provider: 'netlifyImageCdn',
  },
});
