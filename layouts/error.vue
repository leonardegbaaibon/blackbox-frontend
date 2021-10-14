<template>
  <v-row justify="center" align="center" class="white--text">
    <h1 v-if="error.statusCode === 404" class="text-h3">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <br />
    <NuxtLink class="white--text" to="/">Home page</NuxtLink>
  </v-row>
</template>

<script>
export default {
  layout: 'errorLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
