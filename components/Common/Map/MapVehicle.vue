<template>
  <MapHandler
    :style="{ height: `${height}px` }"
    :map-config="mapConfig"
    class="rounded-lg"
  >
    <template slot-scope="{ google, map }">
      <MapMarker
        :marker="trips[trips.length - 1]"
        :google="google"
        :map="map"
      />
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
      default: 500,
    },

    marker: {
      type: Object,
      default: () => {},
    },
  },

  // components: {
  // 	MapHandler: () => import('@/components/Common/Map/GoogleMapHandler'),
  // 	MapMarker: () => import('@/components/Common/Map/GoogleMapMarker'),
  // },

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
        center: this.mapCenter,
      }
    },

    mapCenter() {
      return { lat: 6.459295, lng: 3.335831 }
    },
  },

  beforeUpdate() {
    console.log(`updated`)
  },
}
</script>

<style lang="sass" scoped></style>
