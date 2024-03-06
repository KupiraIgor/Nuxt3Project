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
    providers: {
      myProvider: {
        name: 'netlify', // optional value to overrider provider name
        provider: '~/providers/my-provider.ts', // Path to custom provider
        options: {
          // ... provider options
          baseURL: 'https://master--merry-pithivier-e56fe1.netlify.app/',
        },
      },
    },
  },
});
