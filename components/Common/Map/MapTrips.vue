<template>
  <MapHandler
    :style="{ height: height }"
    :map-config="mapConfig"
    class="rounded-lg"
  >
    <template v-if="items.length !== 0" slot-scope="{ google, map, bounds }">
      <MapMarkers
        v-for="(marker, index) in items"
        :key="marker.id"
        :length="items.length"
        :index="index"
        :marker="marker"
        :google="google"
        :bounds="bounds"
        :map="map"
      />
      <MapPolygons :google="google" :map="map" :markers="items" />
      <!-- <MapWaypoint :markers="items" :google="google" :map="map" /> -->
    </template>
  </MapHandler>
</template>

<script>
import { mapState } from 'vuex'
import { mapSettings } from '@/utils/mapSettings'

export default {
  props: {
    height: {
      type: [Number, String],
      default: '100%',
    },

    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {}
  },

  computed: {
    ...mapState({
      trips: (state) => state.trips.all,
    }),
    mapConfig() {
      return {
        ...mapSettings,
        // center: this.mapCenter,
      }
    },
    mapCenter() {
      return { lat: 6.459295, lng: 3.335831 }
    },
  },

  // beforeUpdate() {
  //   console.log(`updated`)
  // },
}
</script>

<style lang="sass" scoped></style>
