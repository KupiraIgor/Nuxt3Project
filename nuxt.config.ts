// @ts-ignore
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/index.scss'],
  modules: ['@pinia/nuxt', '@nuxtjs/eslint-module'],
  pinia: {
    autoImports: ['defineStore'],
  },
  imports: {
    dirs: ['./store'],
  },
});
