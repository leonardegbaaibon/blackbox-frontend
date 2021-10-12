<template>
  <div>
    <!-- Header -->
    <AppHeader />
    <Nuxt />
    <!-- Footer -->
    <AppFooter />
    <!-- Misc -->
    <LazyModalContact v-if="showContact" v-model="showContact" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContact: false,
    }
  },
  created() {
    this.$nuxt.$on('open:contactModal', (evt) => {
      this.showContact = evt
    })
  },
}
</script>

<style></style>
