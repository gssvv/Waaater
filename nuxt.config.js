module.exports = {
  mode: 'spa',
  // mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Waaater App | Vue.js PWA by Alexander Gusev',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `Mobile-oriented PWA app powered by Vue.js. If you want to try it, open this website on mobile device. On Android, you can also download it in Chrome browser ("Add to Home screen" function) and use offline (PWA). Made by Alexander Gesev. Or just open this site in a smaller window and reload the page.`
      }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  },
  pageTransition: {
    name: 'slide',
    mode: 'out-in'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/style/base.sass'],

  styleResources: {
    sass: ['assets/style/variables.sass']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
