import colors from 'vuetify/es5/util/colors'
// eslint-disable-next-line nuxt/no-cjs-in-config
// const fs = require('fs')
// const isDev = process.env.NODE_ENV === 'development'
// const useEmulators = false
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | BlackBox Admin',
    // title: 'Blackbox',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '64x64',
        href: '/favicon-64x64.png',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
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
    '~/plugins/api.plugin',
    '~/plugins/axios.plugin',
    '~/plugins/vee-validate.plugin',
    '~/plugins/datetimepicker.plugin',
    '~/plugins/persistedState.plugin.js',
    // '~/plugins/firebase.plugin.js',
  ],

  // Auto import onents: https://go.nuxtjs.dev/config-components
  components: { dirs: ['~/components', '~/components/Common'] },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'faker-nuxt',
    // '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs',
    '@nuxtjs/toast',
    'vue-swatches/nuxt',
    // '@deepsource/nuxt-websocket',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDbBTLvWhFpBeu5eJuy1hx0BceEsJTI6qU',
          authDomain: 'tsaron-technologies.firebaseapp.com',
          projectId: 'tsaron-technologies',
          storageBucket: 'tsaron-technologies.appspot.com',
          messagingSenderId: '659212583390',
          appId: '1:659212583390:web:46360c0bdeb9db83729d4f',
          measurementId: 'G-B3SNNS6ZCT',
        },
        services: {
          storage: true, // Just as example. Can be any other service.
          database: true,
        },
      },
    ],
  ],

  // websocket: {
  //   url: 'ws://3.129.204.142:6060',
  //   reconnectInterval: 1000,
  // },

  toast: {
    position: 'top-right',
    theme: 'bubble',
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
    baseURL: 'https://api.blackboxservice.monster/v2',
  },

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/dashboard',
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
    defaultLocale: 'en',
    // defaultTimeZone: 'Africa/Lagos',
    plugins: [
      'customParseFormat', // import 'dayjs/plugin/customParseFormat'
      'advancedFormat', // import 'dayjs/plugin/advancedFormat'
      'duration', // import 'dayjs/plugin/duration'
      'relativeTime', // import 'dayjs/plugin/relativeTime'
      'timezone', // import 'dayjs/plugin/relativeTime'
      'utc', // import 'dayjs/plugin/relativeTime'
    ], // 'duration'
  },

  // Runtime Config
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    mapsKey:
      process.env.MAPS_API_KEY || 'AIzaSyDbBTLvWhFpBeu5eJuy1hx0BceEsJTI6qU',
    carsURL: process.env.CARS_API_KEY,
  },

  privateRuntimeConfig: {
    mapsKey:
      process.env.MAPS_API_KEY || 'AIzaSyDbBTLvWhFpBeu5eJuy1hx0BceEsJTI6qU',
    carsURL: process.env.CARS_API_KEY,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Blackbox Admin',
      short_name: 'Blackbox Admin',
      description: 'Fleet and Vehicle Management System',
      lang: 'en',
      useWebmanifestExtension: false,
      theme_color: '#0F084B',
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
