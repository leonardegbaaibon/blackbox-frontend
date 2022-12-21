<template>
  <div>
    <v-app>
      <v-main>
        <v-container fluid class="fill-height primary text-center">
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
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
