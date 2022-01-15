<template>
  <p>{{ address }}</p>
</template>

<script>
// import { POINT_MARKER_ICON_CONFIG } from '@/utils/mapSettings'

export default {
  // inject: ['googleLoader'],

  props: {
    google: {
      type: Object,
      required: true,
      // default: () => {
      //   return this.googleLoader
      // },
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      address: '',
    }
  },

  mounted() {
    const { Geocoder } = this.google.maps
    // const { LatLngBounds } = this.google.maps
    // const { InfoWindow } = this.google.maps
    // const { Size } = this.google.maps
    const geocoder = new Geocoder()
    geocoder
      .geocode({ location: { lat: this.lat, lng: this.lat } })
      .then((response) => {
        this.address = response.results[0].formatted_address
      })
    // let icon

    // const bounds = new LatLngBounds()
  },
}
</script>

<style>
.rich-info-window {
  width: 250px;
  /* border: 2px solid #0d0221; */
}
</style>
