<template>
  <v-app>
    <BaseHeader />
    <BaseSidebar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
