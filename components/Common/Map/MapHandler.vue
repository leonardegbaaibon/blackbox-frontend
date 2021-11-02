<template>
  <div>
    <div ref="googleMap" class="google-map"></div>
    <template v-if="Boolean(google) && Boolean(map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'

export default {
  /* eslint-disable vue/require-default-prop */

  props: {
    mapConfig: Object,
    apiKey: String,
    // center: String,
  },

  data() {
    return {
      google: null,
      map: null,
      loader: null,
    }
  },

  async mounted() {
    this.loader = await new Loader({
      apiKey: this.$config.mapsKey,
      version: 'quarterly',
    })
    this.initializeMap()
  },

  methods: {
    initializeMap() {
      //* using callback
      this.loader.loadCallback((e) => {
        if (e) {
          console.log('map error', e)
        } else {
          this.google = window.google
          this.map = new this.google.maps.Map(this.$refs.googleMap, {
            ...this.mapConfig,
            // center: this.center,
          })
        }
      })
      //* using promise
      // this.map = this.google
      // 	.load()
      // 	.then(() => {
      // 		new google.maps.Map(this.$refs.googleMap, this.mapConfig)
      // 	})
      // 	.catch((e) => {
      // 		// console.log(`map Error`, e)
      // 	})
    },
  },
}
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 100%;
}
</style>
