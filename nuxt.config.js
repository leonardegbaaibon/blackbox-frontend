import colors from 'vuetify/es5/util/colors'
// console.log('process.env :>> ', process.env)
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Blackbox Admin',
    // title: 'Blackbox',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;600;800&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/app.scss'],

  pageTransition: 'fade',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.plugin',
    '~/plugins/vee-validate.plugin',
    '~/plugins/persistedState.plugin.js',
  ],

  // Auto import onents: https://go.nuxtjs.dev/config-components
  components: { dirs: ['~/components', '~/components/Common'] },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs',
    '@nuxtjs/toast',
  ],

  toast: {
    position: 'top-right',
    theme: 'outline',
    keepOnHover: true,
    iconPack: 'mdi',
    duration: 6000,
    register: [
      // Register custom toasts
      {
        name: 'showing',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
        },
      },
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://powerful-sea-54328.herokuapp.com/v1/',
  },

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/dashboard',
    },

    strategies: {
      local: {
        token: {
          property: 'data.access_token',
          global: true,
          maxAge: 86400,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          autoFetch: false,
        },
        endpoints: {
          login: { url: '/auth/sign.in', method: 'post' },
          logout: { url: '/auth/log.out', method: 'post' },
          user: false,
        },
      },
    },
  },

  // Optional
  dayjs: {
    // locales: ['en', 'ja'],
    // defaultLocale: 'en',
    // defaultTimeZone: 'Asia/Tokyo',
    plugins: [
      // 'utc', // import 'dayjs/plugin/utc'
      // 'timezone', // import 'dayjs/plugin/timezone'
    ], // Your Day.js plugin
  },

  // Runtime Config
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    mapsKey: process.env.MAPS_API_KEY,
  },

  privateRuntimeConfig: {
    mapsKey: process.env.MAPS_API_KEY,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    theme: {
      // dark: true,
      themes: {
        light: {
          primary: '#0F084B',
          secondary: '#0D0221',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  // Set up server
  server: {
    // port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
}
