<template>
  <MapHandler :map-config="mapConfig">
    <template slot-scope="{ google }">
      <MapAddress :google="google" :lat="lat" :lon="lon" />
    </template>
  </MapHandler>
</template>

<script>
import { mapSettings } from '@/utils/mapSettings'

export default {
  props: {
    lat: {
      type: Number,
      default: 0,
    },
    lon: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        // center: this.mapCenter,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
