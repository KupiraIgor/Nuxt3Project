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
    provider: 'netlify',
    cloudinary: {
      baseURL: 'https://master--merry-pithivier-e56fe1.netlify.app/',
      modifiers: {
        effect: 'sharpen:100',
        quality: 'auto:best',
      },
    },
  },
});
