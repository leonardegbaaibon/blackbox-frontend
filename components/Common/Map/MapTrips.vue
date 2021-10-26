<template>
  <MapHandler :style="{ height: `${height}px` }" :map-config="mapConfig">
    <template slot-scope="{ google, map }">
      <MapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
    </template>
  </MapHandler>
</template>

<script>
import { mapSettings } from '@/utils/mapSettings'

export default {
  props: {
    height: {
      type: [Number, String],
      default: 800,
    },

    // markers: {
    //   type: Array,
    //   default: () => [],
    // },
  },

  // components: {
  // 	MapHandler: () => import('@/components/Common/Map/GoogleMapHandler'),
  // 	MapMarker: () => import('@/components/Common/Map/GoogleMapMarker'),
  // },

  data() {
    return {
      markers: [
        {
          id: 'a',
          title: 'freak',
          coordinates: { lat: 6.459295, lng: 3.335831 },
        },
        {
          id: 'b',
          coordinates: { lat: 5, lng: 99 },
        },
        {
          id: 'c',
          coordinates: { lat: 6, lng: 97 },
        },
      ],
    }
  },

  computed: {
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
}
</script>

<style lang="sass" scoped></style>
